# Complete Project Revision Guide: AcademicAI (AcadAssist)

This is your comprehensive guide for revising the entire project end-to-end. It is organized into logical sections to help you explain every technical layer of the application during interviews or presentations.

---

## SECTION 1: High-Level Architecture

### 1. What is the core architecture of the project?
The project uses a **Monolithic Architecture** built entirely on Node.js. 
* **Frontend**: React (Vite) for a fast, single-page application experience.
* **Backend (Node.js/Express)**: A single unified server that handles lightweight I/O tasks (user registration, database management, file uploads) AND heavy AI logic (chunking text, interacting with Gemini, and querying Pinecone).
* **Databases**: 
  * **MongoDB** for storing user data and document metadata.
  * **Pinecone (Vector DB)** for storing mathematical embeddings of uploaded documents to enable RAG (Retrieval-Augmented Generation).

### 2. Why did you choose a Monolithic Architecture instead of Microservices?
* **Simplicity & Deployment**: Having a single unified Node.js codebase makes deployment incredibly easy compared to managing multiple servers, load balancers, and complex CORS policies across different ports.
* **JavaScript Native AI**: With modern packages like `@google/genai` and `@pinecone-database/pinecone`, JavaScript is perfectly capable of handling advanced AI routing and embedding logic natively.
* **Reduced Latency**: Because file uploads and embeddings happen on the same exact server, I don't have to send massive multi-megabyte strings of text over HTTP to a separate microservice. It all happens instantly in the local memory.

---

## SECTION 2: Frontend Implementation

### 3. How is the Frontend structured and styled?
* **Framework**: React initialized with Vite for ultra-fast Hot Module Replacement (HMR) and optimized builds.
* **Styling**: Tailwind CSS is used for utility-first styling, enabling rapid UI development and easy implementation of Dark Mode.
* **State Management**: React's `Context API` (`AuthContext`) is used to globally manage the user's authentication state so any component knows if the user is logged in.

### 4. How did you implement real-time AI Chat on the frontend?
* Instead of waiting for the AI to generate a massive response and sending it all at once, the frontend uses the browser's native **Fetch API with Streams**.
* The Node.js backend uses `res.write()` to stream Server-Sent Events (SSE). The React frontend reads this stream chunk-by-chunk using a `TextDecoder` and continuously updates the state, giving the user the illusion that the AI is typing in real-time.

---

## SECTION 3: Backend Services & Database

### 5. What does the MongoDB Database schema look like?
* **User Model**: Stores the user's `name`, `email`, and securely hashed `password`.
* **Document Model**: Stores the metadata of uploaded files, including the `originalName`, `type` (PDF/TXT/DOCX), file `size`, the physical server `path` where it is saved, and a reference to the `userId` who owns it.

### 6. Explain the end-to-end flow when a user uploads a document.
1. The user uploads a file from the React frontend.
2. The Node.js server receives it using a middleware called **Multer** and saves it to the disk.
3. Node.js creates a record in MongoDB so the file shows up on the user's dashboard.
4. Node.js uses specific parsing libraries (`pdf-parse` for PDFs, `mammoth` for DOCX) to strip away all formatting, leaving only raw text.
5. The `fileController.js` delegates the raw text to my `ragService.js`.
6. `ragService.js` chunks the text, turns it into embeddings via `@google/genai`, and saves it to Pinecone. 

---

## SECTION 4: The AI Subsystem & RAG

### 7. What is RAG and how did you implement it?
* **RAG (Retrieval-Augmented Generation)** is a technique to give AI models external knowledge they weren't originally trained on.
* **Implementation**: 
  1. As explained above, document text is split into small chunks, converted to mathematical vectors by `gemini-embedding-2`, and saved to **Pinecone**.
  2. When the user asks a question in the chat, their question is embedded into a vector. 
  3. We query Pinecone for the "nearest neighbors" (the most mathematically similar chunks of text).
  4. We inject those specific text chunks into the prompt for the Gemini AI (`gemini-2.5-flash`), allowing it to answer the question using the user's personal notes.

### 8. How do the Quiz and Notes Generation features work?
* These do not use streaming. They use standard API requests.
* **Quiz**: The AI is strictly prompted to return its answer as a raw JSON array. My `aiController.js` parses this JSON and sends it back to the frontend, which maps over the array to render an interactive multiple-choice quiz.
* **Notes**: The AI is prompted to generate heavily formatted GitHub Markdown based on the user's chosen style (e.g., Bullet points, Summary). The frontend renders this using `react-markdown`.

---

## SECTION 5: Security, Auth & CORS

### 9. How did you implement Authentication and Security?
* **JWT (JSON Web Tokens)**: The Node.js server generates a JWT upon login.
* **Secure Cookies**: The token is stored in an `HttpOnly` cookie. This prevents Cross-Site Scripting (XSS) attacks because malicious JavaScript running in the browser cannot read or steal the cookie.
* **Middleware Protection**: Every protected API route (like `/api/ai/chat`) runs through my `protect` middleware which verifies the JWT token using `jsonwebtoken` before executing any controller logic.

### 10. How do you ensure users can't read each other's documents?
* **Multi-Tenancy Security**: In Pinecone, every single vector is saved with metadata containing the `userId`. 
* When a user searches the database, the query in `ragService.js` is strictly filtered by their `userId`. The database will only mathematically compare their question against vectors that belong to them. It is physically impossible for the query to return another user's document chunks.

### 11. How did you handle CORS (Cross-Origin Resource Sharing)?
* Since the application runs on two ports locally (React on 5173, Node on 5000), browsers naturally block requests between them due to security policies.
* I configured the Node.js Express server to explicitly allow requests from the React frontend origin. 
* Critically, I set `credentials: true` (or `'include'` for Fetch) on both the server and the frontend so that the browser is permitted to send the secure `HttpOnly` JWT cookies.

### 12. How would you implement OTP (One-Time Password) Authentication?
If I were to implement OTP to verify emails or phone numbers:
* I would integrate a third-party provider like **Twilio** (for SMS) or **Nodemailer** (for Emails).
* **Flow**: 
  1. User enters their email.
  2. The backend generates a random 6-digit code, hashes it (using bcrypt), and saves it to a temporary MongoDB collection with a 5-minute expiration (TTL index).
  3. The backend sends the unhashed code to the user via email.
  4. The user submits the code. The backend hashes their input and compares it to the database. If it matches, the JWT is issued.

---

## SECTION 6: Scaling & Deployment

### 13. How would you deploy this project?
* **Frontend**: Deployed on **Vercel** or **Netlify** (optimized for global CDN delivery of React static files).
* **Node.js Backend**: Deployed on **Render** or **Railway** (scalable Node.js web servers).
* **Databases**: MongoDB hosted on **MongoDB Atlas** (cloud managed), and Pinecone hosted on their native cloud platform.

### 14. If users increase significantly, how will you maintain and scale the databases?
* **MongoDB Scaling**:
  * *Vertical Scaling*: Upgrade the MongoDB Atlas tier for more RAM/CPU.
  * *Horizontal Scaling (Sharding)*: If data grows massive, we can shard the MongoDB clusters across multiple geographic regions based on user location.
  * *Indexing*: Ensure fields like `userId` are properly indexed (B-Trees) to keep file retrieval queries fast (O(log n) time) even with millions of documents.
* **Vector Database (Pinecone)**:
  * Pinecone is a managed, serverless vector database. It automatically handles scaling. We simply monitor our vector count and upgrade our index capacity as we embed more documents.

---

## SECTION 7: Challenges & Problem Solving

### 15. What major problems/challenges did you face, and how did you solve them?

* **Challenge 1: AI "Hallucinations" (Echoing the Question)**
  * *Problem*: When users asked a question in the chat, the AI would sometimes act confused and generate the *next user question* instead of actually answering the prompt. This happened because I was initially concatenating the AI's "Rules" and the user's "Question" into one massive string, which confused the AI into thinking it was reading a script of a conversation.
  * *Solution*: I refactored the Gemini API call in `aiController.js` to use the native `systemInstruction` configuration. This strictly isolated the AI's persona and rules away from the user's conversational input, completely eliminating the hallucinations.

* **Challenge 2: Deprecated Database Libraries (Pinecone)**
  * *Problem*: When trying to connect to the Vector Database to store text chunks, the Node.js application kept crashing with initialization errors.
  * *Solution*: I debugged the dependency tree and realized the `pinecone-client` NPM package was heavily deprecated and no longer supported by Pinecone. I uninstalled it, migrated to the modern `@pinecone-database/pinecone` library, and refactored the connection code (using `new Pinecone()`), which immediately restored the database connection.

* **Challenge 3: Security Vulnerability with JWTs (XSS Attacks)**
  * *Problem*: By default, many tutorials teach you to store JWT (JSON Web Tokens) in the browser's `localStorage`. However, this leaves the application highly vulnerable to XSS (Cross-Site Scripting) attacks, where a malicious browser extension or script could easily steal the user's token and hijack their account.
  * *Solution*: I overhauled the authentication flow in my auth controllers to use **HttpOnly Cookies**. When the Node.js server generates the JWT, it places it inside an HttpOnly cookie before sending it to the React frontend. Because it is "HttpOnly", it is physically impossible for frontend JavaScript to read or steal the token, making the app enterprise-grade secure.

* **Challenge 4: Processing Large Unstructured Data**
  * *Problem*: Pinecone and Gemini require raw text, but users upload complex binary files like PDFs and `.docx` Word Documents, which contain images, XML tags, and formatting that ruins the embedding math.
  * *Solution*: I built a robust parsing pipeline in `fileController.js`. I integrated `pdf-parse` to strip binary data from PDFs, and `mammoth` to cleanly extract raw UTF-8 text from Word files, ensuring the AI only receives pure text for mathematical embedding.
