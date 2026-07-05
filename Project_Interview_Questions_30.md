/# 30+ Ultimate Project Interview Questions & Answers

This document contains 30 comprehensive interview questions and answers specifically tailored to the **AcademicAI (AcadAssist)** project. It is structured to help you defend every architectural, security, and design decision you made.

---

## Part 1: Core Architecture & Setup

**1. What is the overarching architecture of your project?**  
My project is built as a Monolithic Node.js architecture. The frontend is a React Single Page Application (SPA) built with Vite. The backend is a single unified Node.js/Express server that handles everything from user authentication and file uploads to heavy AI logic and Vector Database interactions.

**2. Why did you choose a Node.js Monolith over Microservices?**  
A Node.js Monolith simplifies the deployment pipeline, reduces infrastructure costs, and eliminates cross-server HTTP latency. Using modern Node.js packages like `@google/genai` allowed me to achieve extremely fast AI capabilities in pure JavaScript. By doing this, file uploads and embeddings happen in the same local memory space, avoiding complex multi-server data transfers.

**3. What databases did you use and why?**  
I used two databases. First, **MongoDB (Mongoose)** as a NoSQL database because its document-based structure is highly flexible for storing user data and file metadata. Second, **Pinecone**, a specialized Vector Database, to store the mathematical embeddings of the text so that the AI can perform semantic similarity searches (RAG).

**4. What is the MERN stack, and did you strictly follow it?**  
MERN stands for MongoDB, Express, React, and Node.js. My project is a heavily augmented MERN stack. I used the core MERN technologies, but I also integrated external APIs (Google Gemini) and a secondary database (Pinecone) which moves it beyond a traditional MERN CRUD app into an AI-powered platform.

**5. How did you handle environment variables and secrets?**  
I used the `dotenv` package to load variables from a `.env` file that is strictly ignored by Git (`.gitignore`). This ensures that API keys (Gemini, Pinecone), database URIs, and JWT Secrets are never exposed in source control.

---

## Part 2: Security & Authentication

**6. Explain how your Authentication system works.**  
I implemented a JWT (JSON Web Token) based authentication system. When a user logs in, the backend verifies the password using `bcryptjs`, generates a JWT, and sends it back to the client inside an `HttpOnly` cookie.

**7. Why use HttpOnly cookies instead of storing JWTs in LocalStorage?**  
Storing JWTs in LocalStorage makes them vulnerable to Cross-Site Scripting (XSS) attacks, where malicious JavaScript could read the token. An `HttpOnly` cookie cannot be accessed via JavaScript (`document.cookie`), completely mitigating XSS token theft.

**8. How do you protect your API routes from unauthenticated users?**  
I created an Express middleware called `protect`. It intercepts incoming requests, checks the cookies for the `access_token`, verifies the token using the `jsonwebtoken` library, and attaches the decoded `userId` to the `req` object. If the token is missing or invalid, the middleware blocks the request and returns a 401 Unauthorized status.

**9. How do you prevent Cross-Site Request Forgery (CSRF)?**  
Because I use cookies, the application is technically vulnerable to CSRF. To mitigate this, I configured the cookies with `SameSite: 'strict'` (or `'lax'`), which prevents the browser from sending the cookie if the request originates from a different domain.

**10. How do you securely store passwords?**  
Passwords are never stored in plain text. I use `bcryptjs` to hash the passwords with a generated "salt" before saving them to MongoDB. When a user logs in, `bcryptjs.compare()` mathematically hashes their input and compares it to the stored hash.

**11. How would you implement OTP (One-Time Password) for password resets?**  
I would generate a random 6-digit code, hash it, and save it in MongoDB with a TTL (Time-To-Live) index set to 5 minutes. Then, I would use an email service like Nodemailer to send the raw code to the user. When the user submits the code, the backend hashes it and compares it to the database.

---

## Part 3: The AI & RAG Subsystem

**12. What is RAG (Retrieval-Augmented Generation)?**  
RAG is a technique used to ground Large Language Models (LLMs) with external, private data. Instead of relying on the model's training data, we retrieve relevant context from a database and inject it into the prompt so the AI can answer based on user-specific documents.

**13. Walk me through how you convert a PDF into AI knowledge.**  
1. The user uploads a PDF. 
2. `fileController.js` uses `pdf-parse` to extract raw text.
3. My chunking algorithm in `ragService.js` splits the text into small 1000-character segments.
4. The `@google/genai` embedding model converts each chunk into a mathematical vector.
5. These vectors are saved in Pinecone alongside the `userId` and the raw text string.

**14. Why do you need to chunk the text before embedding?**  
LLMs have strict token limits and context windows. If a user uploads a 500-page book, we cannot embed the entire book into a single vector, nor can we pass the entire book to the AI in one prompt. Chunking ensures high-precision search and fits within API limits.

**15. How do you prevent AI "Hallucinations" (making things up)?**  
I strictly configure the Gemini API using the `systemInstruction` parameter. I explicitly command the AI to *only* use the provided context to answer the question, and if the context is insufficient, it must admit that it does not know or that the answer isn't in the uploaded notes.

**16. How did you solve the issue of the AI "echoing" the user's question?**  
Initially, I concatenated the system rules and the user's prompt into a single string. This confused the AI into thinking it was reading a script, so it tried to generate the next "User Question". I fixed this by properly passing the rules into the native `systemInstruction` config object in `aiController.js`, completely separating instructions from conversational input.

**17. How does the Quiz Generation feature work?**  
I send a prompt to Gemini asking for a quiz based on the Pinecone context, but I critically pass `responseMimeType: 'application/json'` in the config. This forces the AI to return a strict, parsable JSON array instead of conversational text. `aiController.js` parses this JSON and sends it to the frontend to render the UI.

**18. How did you implement streaming for the AI chat?**  
Instead of waiting 10 seconds for a full answer, the Node.js server uses `generateContentStream`. It uses `res.write()` to send data chunks (Server-Sent Events) down to the React frontend as soon as they are generated. The frontend uses a `TextDecoder` to read the stream and instantly updates the UI, creating a real-time typing effect.

---

## Part 4: File Handling & Multi-Tenancy

**19. How does your backend handle file uploads?**  
I use an Express middleware called `multer`. It parses `multipart/form-data` from the frontend and safely writes the binary file to the server's local disk before passing control to my controller logic.

**20. What happens if two users upload files with the exact same name?**  
To prevent overwrites, my `multer` configuration generates a unique filename by appending a timestamp (`Date.now()`) or a UUID to the original filename before saving it to disk.

**21. How do you ensure users can't read or query someone else's uploaded files?**  
This is called Multi-Tenancy security. When saving vectors to Pinecone, I attach a `userId` in the vector's metadata. When a user asks a question, my Pinecone search query in `ragService.js` includes a strict filter (`filter: { userId: currentUserId }`). Pinecone will only mathematically compare the question against vectors owned by that exact user.

**22. How do you extract text from Word Documents (.docx)?**  
Word documents are complex XML structures wrapped in zip files. I used the `mammoth` npm package, which strips away all the XML formatting, images, and tables, returning only the raw, readable UTF-8 text needed for the AI embeddings.

---

## Part 5: Frontend (React & Vite)

**23. Why did you use Vite instead of Create React App (CRA)?**  
Create React App uses Webpack, which is notoriously slow for large projects. Vite uses native ES modules (esbuild), which makes local server startup almost instantaneous and Hot Module Replacement (HMR) incredibly fast, significantly speeding up my development workflow.

**24. How did you handle global state, such as knowing if a user is logged in?**  
I used React's `Context API`. I created an `AuthContext` that wraps the entire application. It maintains the current `user` object and `isAuthenticated` boolean. Any component deeply nested in the app can access this state without needing to pass props down multiple levels (Prop Drilling).

**25. How do you handle routing on the frontend?**  
I used `react-router-dom`. I created an array of routes and used a `ProtectedRoute` wrapper component. If a user tries to access `/dashboard` but `isAuthenticated` is false, the wrapper intercepts the render and redirects them back to the `/login` page using the `Navigate` component.

**26. How did you style the application?**  
I used **Tailwind CSS**. It is a utility-first CSS framework that allowed me to style components directly in the JSX classes without switching between CSS files. It also made implementing fully responsive designs and Dark Mode incredibly easy using the `dark:` prefix.

---

## Part 6: Scalability, Performance & Deployment

**27. What is CORS and how did you configure it?**  
CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks frontend code (e.g., Port 5173) from making requests to a backend on a different port/domain (e.g., Port 5000). I used the `cors` npm package on Node.js, explicitly allowing requests from the React origin, and critically setting `credentials: true` so the browser would transmit the secure `HttpOnly` JWT cookies.

**28. How do you handle API Rate Limiting to prevent abuse?**  
I implemented the `express-rate-limit` package. It tracks incoming IP addresses and blocks requests if they exceed a certain threshold (e.g., 100 requests per 15 minutes). This prevents malicious users from spamming the AI endpoints and running up my Google API billing.

**29. If your user base grows to 100,000 users, what is the first thing that will break, and how will you fix it?**  
The first bottleneck would be saving files to the local disk via `multer`, as servers have limited storage space. I would fix this by replacing local storage with an AWS S3 Bucket (or Cloudinary). Multer would stream the file directly to cloud storage, completely removing the disk space limitation from my Node.js server.

**30. How would you scale the MongoDB database?**  
Right now, MongoDB is running on a single replica set in MongoDB Atlas. If reads/writes become too slow, I would first ensure my schemas are properly indexed (e.g., creating a B-Tree index on `userId` in the Documents collection). If that isn't enough, I would use MongoDB Sharding to distribute the database across multiple physical servers.

**31. How is the application deployed?**  
The frontend SPA is built into static HTML/JS/CSS files and hosted on a CDN (Content Delivery Network) like **Vercel** or **Netlify** for instant global access. The Node.js backend is hosted on a platform like **Render**, **Railway**, or **Heroku**, which provides a runtime environment for the server and automatically restarts it if it crashes.

---

## Part 7: Testing & Error Handling

**32. How did you test your application?**  
I used a combination of manual testing and API testing. I used **Postman** to manually hit the Node.js API endpoints (`/api/auth/register`, `/api/ai/chat`) to verify that the backend returned the correct HTTP status codes and JSON data. On the frontend, I performed extensive manual UI testing by simulating user flows (registering, uploading documents, chatting, and triggering error states like entering wrong passwords). 

**33. What happens if the MongoDB storage capacity is exceeded?**  
If the MongoDB database reaches 100% capacity, it will reject any new write operations (like registering a new user or saving file metadata), throwing a Database Error to the Node.js server. I configured MongoDB Atlas to send automated email alerts when the storage reaches 80% capacity, giving me time to log into the cloud console and either auto-scale the cluster to a higher tier or manually delete old, inactive user accounts.

**34. What happens if Pinecone vector storage exceeds its limit?**  
Pinecone limits storage based on the number of vectors (chunks) allowed in the chosen index tier. If the limit is exceeded, any new `index.upsert()` call inside `ragService.js` will throw an HTTP 4xx or 5xx error. To handle this gracefully, the code is wrapped in a `try/catch` block. If an embedding fails due to Pinecone limits, Node.js catches the error and can return a friendly error message to the frontend, letting the user know that document processing is temporarily paused while we upgrade our server capacity.

---

## Part 8: Deep Dive - Challenges & Problem Solving

**35. What was the single most difficult problem you faced while creating this project, and how did you solve it?**  
The most difficult problem I faced was **AI "Hallucinations" (Prompt Bleed)** combined with **Deprecated Dependencies**. 
When I first built the AI chat, users would ask a question, and the AI would occasionally generate the *next user question* instead of actually providing an answer. This was incredibly frustrating to debug. I eventually realized that because I was concatenating the AI's core "Rules" and the user's "Question" into one massive text string, the AI thought it was reading a script of a conversation and tried to continue the script. 
*How I solved it:* I tore down the prompt logic and researched the `@google/genai` documentation deeply. I discovered the native `systemInstruction` configuration parameter. I refactored `aiController.js` to strictly pass the persona rules into `systemInstruction`, completely isolating it from the user's conversational input. This immediately stopped the hallucinations. 
Simultaneously, my Pinecone connection began crashing. I had to debug my dependency tree to realize `pinecone-client` was deprecated. I uninstalled it, migrated to the modern `@pinecone-database/pinecone` library, and rewrote the initialization code (`new Pinecone()`), completely stabilizing the backend.

**36. Tell me about a time you had to debug a tricky network or security error.**  
A major roadblock was getting authentication to work between the frontend and backend. I implemented JWTs, but every time the React frontend (running on Port 5173) tried to hit the Node.js backend (Port 5000) to fetch AI data, the browser blocked it with a CORS (Cross-Origin Resource Sharing) error, and the `HttpOnly` cookie was completely stripped from the request.
*How I solved it:* I opened the Chrome Network tab and analyzed the headers. I realized that by default, browsers refuse to send secure cookies across different ports to prevent CSRF attacks. I had to configure the `cors` middleware on Node.js to explicitly whitelist `http://localhost:5173`. Most importantly, I had to configure both the Express server AND the frontend Fetch API to use `credentials: true` (or `'include'`). Once the browser saw this handshake, it allowed the secure cookie to pass through, fixing the auth flow instantly.

**37. How did you overcome the challenge of processing unstructured, messy data from users?**  
AI embedding models (`gemini-embedding-2`) and Vector Databases require pure, raw text. However, users upload PDFs and `.docx` Word documents. These are binary files filled with XML tags, image data, and styling metadata. When I first tried to embed a raw file buffer, the math crashed completely.
*How I solved it:* I built a robust data-cleaning pipeline inside `fileController.js`. I integrated specialized libraries: `pdf-parse` to strip away PDF binary layers and `mammoth` to cleanly extract raw UTF-8 text from Word files. By scrubbing the data clean *before* passing it to `ragService.js`, I ensured the AI only received pure textual data, which resulted in highly accurate semantic search queries.

**38. If you had to start this project over from scratch, what architectural decision would you change to avoid early problems?**  
If I were to start over, I would immediately begin with a **Node.js Monolith**, which is the architecture I ultimately settled on. Early in the project, it is tempting to jump straight into complex Microservices (e.g., using a separate Python server just for AI). However, that introduced unnecessary complexity—managing two deployment pipelines, handling cross-server HTTP latency, and dealing with complex cookie sharing. By pivoting to `@google/genai` and handling the embeddings natively in JavaScript, I learned that keeping the architecture unified and simple is often vastly superior to over-engineering prematurely.
