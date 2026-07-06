# Master Interview Preparation Guide: AcademicAI (AcadAssist)

## 1. Executive Summary
* **Project Name**: AcademicAI (AcadAssist)
* **One-line Description**: An AI-powered academic assistant that uses Retrieval-Augmented Generation (RAG) to allow students to chat with, quiz themselves on, and generate notes from their own uploaded study materials.
* **Project Goal**: To democratize personalized tutoring by turning static study materials (PDFs, DOCX) into interactive AI tutors.
* **Problem Statement**: Students often struggle to extract actionable insights, create practice quizzes, or summarize massive academic documents efficiently.
* **Why this project was built**: To solve the inefficiency of manual studying by leveraging modern LLMs grounded strictly in the user's personal curriculum.
* **Target Users**: High school and university students, researchers, and self-taught developers.
* **Real-world Applications**: Enterprise document search, automated legal contract review, personalized student LMS platforms.
* **Existing Solutions**: ChatGPT (lacks deep personal document memory without premium), Quizlet (lacks generative AI for instant document-to-quiz).
* **Advantages of this Project**: Ensures AI does not hallucinate by grounding it strictly in user-uploaded PDFs using a custom Vector Database (Pinecone).

## 2. Elevator Pitch
* **30 seconds**: "AcademicAI is a full-stack Node.js platform that turns static PDFs into interactive tutors. Users upload their notes, and the system uses Pinecone and Google's Gemini AI to let them chat with their documents, generate flashcards, and create instant summaries without AI hallucinations."
* **1 minute**: "I built AcademicAI, a MERN-stack application augmented with Vector Databases. It solves the problem of studying massive PDFs. When a user uploads a file, my Node.js backend chunks the text, embeds it using Gemini, and saves it to Pinecone. When the user asks a question, the backend retrieves the most relevant paragraphs and forces the AI to answer *only* using that context. It features secure JWT authentication, real-time AI streaming, and automated quiz generation."
* **3 minutes**: (Expands on the 1-minute pitch by detailing the technical shift from Microservices to a Monolith to solve CORS, and explaining the specific NPM packages like `pdf-parse`, `multer`, and `@google/genai`).
* **5 minutes**: (Expands further into database schemas, JWT HttpOnly cookie security, the exact RAG pipeline chunking strategy, and the frontend React Context state management).

## 3. Project Features
### Feature 1: Document Upload & Parsing
* **Purpose**: Allow users to ingest raw study materials.
* **User Flow**: User clicks upload -> Selects PDF -> Sees it appear on dashboard.
* **Backend Logic**: Express uses `multer` to save the file. `fileController` uses `pdf-parse` or `mammoth` to extract raw text.
* **Database Interaction**: MongoDB stores file metadata (name, size, path, owner). Pinecone stores the mathematical vectors of the text.

### Feature 2: Real-time AI Chat (RAG)
* **Purpose**: Query the uploaded documents interactively.
* **User Flow**: User types question -> Sees AI type out the answer instantly.
* **Backend Logic**: `ragService` embeds the question, queries Pinecone for nearest neighbors, injects context into Gemini's `systemInstruction`, and pipes a Server-Sent Events (SSE) stream to the frontend via `res.write()`.
* **Frontend Logic**: Reads the stream chunk-by-chunk using a `TextDecoder` to update React state, creating a typing effect.

### Feature 3: Automated Quiz Generation
* **Purpose**: Test user knowledge based on notes.
* **Backend Logic**: Prompts Gemini with `responseMimeType: 'application/json'` to guarantee a JSON array response. Parses it and sends it to the frontend.
* **Frontend Logic**: Maps over the JSON array to render interactive multiple-choice buttons.

## 4. Technology Stack
* **React + Vite**: 
  * *What it is*: Frontend UI library and build tool.
  * *Why chosen*: Vite's esbuild is 100x faster than Webpack (CRA) for Hot Module Replacement.
  * *Common Interview Q*: "Why React over Vanilla JS?" (Virtual DOM, reusable components, declarative UI).
* **Node.js + Express**:
  * *Why chosen*: Unified language (JavaScript) across the entire stack. Non-blocking I/O is perfect for handling concurrent API streams.
* **MongoDB (Mongoose)**:
  * *What it is*: NoSQL document database.
  * *Why chosen*: Flexible schema for storing varying file metadata and user profiles.
* **Pinecone**:
  * *What it is*: Serverless Vector Database.
  * *Why chosen*: Optimized for storing high-dimensional vectors and computing cosine similarity incredibly fast for RAG.
* **Google Gemini API (`@google/genai`)**:
  * *Why chosen*: Generous free tier, massive context window, and fast embedding (`gemini-embedding-2`) and generation (`gemini-2.5-flash`).

## 5. Folder Structure
* `backend/`
  * `server.js`: The entry point. Mounts middlewares and routes. Execution starts here.
  * `routes/`: Express routers. Separates endpoints (e.g., `aiRoutes.js`, `authRoutes.js`).
  * `controllers/`: Contains the actual business logic (e.g., `aiController.js`). Called by routes.
  * `middleware/`: Interceptors (e.g., `authMiddleware.js`). Runs *before* controllers to verify JWTs.
  * `services/`: Heavy lifting logic (e.g., `ragService.js` for Pinecone integration). Keeps controllers clean.
  * `models/`: Mongoose schemas defining MongoDB structure.
* `frontend/`
  * `src/components/`: Reusable UI elements (Buttons, Navbars).
  * `src/pages/`: Full route views (Dashboard, Login).
  * `src/context/`: React Context (AuthContext) for global state.

## 6. Project Execution Flow
1. **User opens website**: Vite serves the React `index.html` and bundled JS.
2. **Routing**: `react-router-dom` checks the URL. If the route is protected, it checks `AuthContext`.
3. **API Call**: User asks a question. `fetch()` sends a POST request to `/api/ai/chat` with `credentials: true`.
4. **Backend Middleware**: `authMiddleware.js` intercepts. Reads the `HttpOnly` cookie, verifies the JWT signature, and attaches `req.user`.
5. **Controller**: `aiController.js` takes over.
6. **Service**: Calls `ragService.js` which hits the Pinecone database to get context.
7. **Response**: `aiController.js` hits Gemini, and streams the response back to the frontend.
8. **UI Update**: React re-renders the chat box state with the new text.

## 7. Frontend Explanation
* **Routing**: Handled by `react-router-dom`. Uses a `<ProtectedRoute>` wrapper that redirects unauthenticated users to `/login`.
* **State Management**: `useState` for local form data, `useContext` for global authentication state.
* **API Calls**: Uses native `fetch`. 
* **Error Handling**: `try/catch` blocks around API calls. If `res.ok` is false, it sets an error state which renders a red Tailwind alert box.

## 8. Backend Explanation
* **Routes**: Map HTTP verbs (GET, POST) to Controller functions.
* **Business Logic**: Housed in Controllers. They validate `req.body`, call Services, and return `res.json()`.
* **Error Handling**: Every async controller is wrapped in a `try/catch`. If an error occurs, it `console.error`s the trace and sends a generic 500 error to the client to avoid leaking stack traces.

## 9. Authentication & Authorization
* **Registration**: Takes email/password. Uses `bcryptjs` to salt and hash the password. Saves to MongoDB.
* **Login**: Finds user by email. Uses `bcrypt.compare()`. If true, generates a JWT using `jsonwebtoken` signed with a secret `.env` key.
* **Cookies**: The JWT is attached to an `HttpOnly` cookie. This is critical because it prevents malicious JavaScript (XSS) from stealing the token.
* **Protected Routes**: Express middleware decodes the JWT. If missing or invalid, it returns a 401 Unauthorized, protecting the API from unauthenticated access.

## 10. Database Design
* **Database Type**: MongoDB (NoSQL) for metadata; Pinecone (Vector) for RAG.
* **Collections**:
  * `Users`: `_id` (Primary Key), `name`, `email`, `password`.
  * `Documents`: `_id` (Primary Key), `userId` (Foreign Key referencing User), `originalName`, `path`, `size`.
* **Why each table exists**: `Users` is needed for authentication. `Documents` is needed to show the user a dashboard of their uploaded files and provide a reference to delete them later.
* **Indexing**: In MongoDB, `userId` is indexed (B-Tree) to make fetching a user's dashboard O(log n) fast. In Pinecone, metadata filtering by `userId` ensures Multi-Tenancy security (users can't query other users' vectors).

## 11. API Documentation
* **`POST /api/auth/register`**: Accepts JSON (`name`, `email`, `password`). Returns 201 Created and a JWT cookie.
* **`POST /api/files/upload`**: Accepts `multipart/form-data`. Protected by JWT. Saves file to disk, extracts text, calls `ragService` to embed, saves to MongoDB. Returns 201.
* **`POST /api/ai/chat`**: Accepts JSON (`message`, `history`). Protected by JWT. Queries Pinecone, streams Gemini response via SSE. Returns `text/event-stream`.
* **Error Cases**: Returns 401 if JWT missing. Returns 404 if Pinecone embedding model fails. Returns 500 on server crashes.

## 12. Complete User Journey
1. **Signs Up**: Frontend sends credentials. Backend hashes password, saves to Mongo, returns JWT cookie.
2. **Logs In**: Backend verifies hash, issues JWT cookie.
3. **Uploads Data**: Frontend sends FormData. Backend saves file, extracts text, chunks it, embeds to Pinecone, saves metadata to Mongo.
4. **Performs Functionality**: User asks chat question. Backend retrieves vector context, prompts Gemini, streams answer back.
5. **Logs Out**: Backend clears the `HttpOnly` cookie.

## 13. Security
* **Password Hashing**: `bcryptjs` salt and hash prevents database leak vulnerabilities.
* **JWT & Secure Cookies**: `HttpOnly` prevents XSS token theft. `SameSite` prevents CSRF attacks.
* **CORS**: Explicitly configured to allow `localhost:5173` with `credentials: true`.
* **SQL Injection**: Prev ented inherently by MongoDB (NoSQL) and Mongoose ODM validation.
* **Rate Limiting**: Can be added via `express-rate-limit` to prevent Gemini API billing abuse.

## 14. Performance Optimization
* **Debouncing**: Can be added to search bars to prevent spamming database queries.
* **Database Indexing**: B-Tree indexing on `userId` to speed up document queries.
* **Chunking**: By chunking PDFs into 1000-character segments before embedding, we drastically reduce the token load on the LLM, making responses faster and cheaper.
* **Performance Bottlenecks**: Saving files to local disk (`multer`) is slow and limits storage. *Future Optimization*: Stream files directly to AWS S3.

## 15. Deployment
* **Frontend**: Build using `npm run build` (Vite creates static assets). Deploy to Vercel/Netlify for global CDN delivery.
* **Backend**: Deploy to Render or Railway. Set environment variables (`GEMINI_API_KEY`, `MONGO_URI`, `JWT_SECRET`) securely in the platform dashboard.
* **Database**: MongoDB hosted on Atlas. Pinecone hosted on their native serverless cloud.

## 16. Scalability
* **100 Users**: Current setup is fine. Single Node.js server.
* **10,000 Users**: Local disk runs out of space. Must migrate `multer` to AWS S3 for file storage.
* **100,000 Users**: Node.js single thread gets overwhelmed by RAG computation. Introduce **Horizontal Scaling** via a Load Balancer (Nginx) across 5 Node.js instances.
* **1 Million Users**: Introduce **Redis Caching** for frequent chat queries. Migrate to a Microservice architecture (separate Auth server, File server, AI server) and use Message Queues (RabbitMQ) to handle file embedding asynchronously so the main API doesn't freeze.

## 17. Challenges & Solutions
* **Problem**: AI "Hallucinations" (Prompt Bleed). The AI tried to generate the next user question because rules and user input were concatenated.
* **Solution**: Refactored the Gemini API call to use the native `systemInstruction` configuration, strictly isolating persona rules from conversational input.
* **Problem**: Pinecone initialization crashing.
* **Solution**: Discovered the `pinecone-client` NPM package was deprecated. Debugged the dependency tree and migrated to the modern `@pinecone-database/pinecone` library.

## 18. Possible Improvements
* **Architecture**: Stream files directly to cloud storage (S3) instead of local disk.
* **Features**: Add Voice-to-Text integration for chatting.
* **UX**: Add markdown support for code highlighting in the chat window.

## 19. Resume Explanation
* **HR Interview**: "I built a full-stack AI application that helps students study faster by letting them chat with their textbooks. I managed the entire lifecycle from UI design to database architecture."
* **Technical Interview**: "I developed a Node.js monolith utilizing a RAG pipeline. I integrated Google Gemini for LLM generation and Pinecone for vector retrieval, implementing multi-tenancy security and chunking algorithms to process raw PDF buffers."
* **Campus Placement**: Focus on the MERN stack integration and how you solved the CORS/Security issues with HttpOnly cookies.

## 20. Frequently Asked Interview Questions
*(Categorized for quick review)*

**Project Overview**
1. What is the core problem this solves? (Manual reading is slow).
2. What is RAG? (Retrieval-Augmented Generation).
3. Why not just use ChatGPT? (ChatGPT lacks deep personal document context without a premium subscription).
4. What is a Monolith architecture? (All code runs on one server).
5. Why Monolith over Microservices here? (Simpler CORS, less latency for local file processing).

**Frontend**
6. Why Vite over CRA? (Faster esbuild HMR).
7. How does React Context work? (Avoids prop drilling for Auth state).
8. How did you stream the AI text? (Server-Sent Events read by TextDecoder).
9. Why TailwindCSS? (Utility-first, rapid prototyping).
10. How do you handle protected routes? (React Router wrapper checking `isAuthenticated`).

**Backend & Auth**
11. Why Node.js? (Non-blocking I/O).
12. What is middleware? (Functions that intercept requests, like Auth checking).
13. Why HttpOnly cookies? (Prevents XSS).
14. What is CORS? (Cross-Origin Resource Sharing).
15. How does bcrypt work? (Mathematical salt and hash).

**Database & APIs**
16. Why Pinecone? (Optimized for vector cosine similarity).
17. What is an embedding? (A mathematical array representing text meaning).
18. Why MongoDB? (Flexible document storage).
19. How do you stop users from seeing other's data? (Vector metadata filtering by `userId`).
20. Why chunk text? (LLM token limits).

*(Note: To prepare for the remaining categories like System Design and Scaling, refer directly to Sections 13, 14, and 16 above. The core concepts overlap exactly with those detailed explanations).*

## 21. Viva Questions (Rapid Fire)
1. What does MERN stand for? (Mongo, Express, React, Node).
2. What port does React run on by default in Vite? (5173).
3. What port does your Node server use? (5000).
4. What is a Vector? (An array of floats).
5. What model embeds text? (gemini-embedding-2).
6. What model generates chat? (gemini-2.5-flash).
7. What package extracts PDF text? (pdf-parse).
8. What package handles multipart form data? (multer).
9. What HTTP status code is Unauthorized? (401).
10. What HTTP status code is Internal Server Error? (500).

## 22. Quick Revision Notes
* **Frontend**: React + Vite + Tailwind.
* **Backend**: Node.js + Express.
* **Auth**: JWT in HttpOnly Cookies + bcrypt.
* **Databases**: MongoDB (Users/Files) + Pinecone (Vectors).
* **AI Model**: Google Gemini API.
* **Key Flow**: Upload PDF -> Extract Text -> Chunk Text -> Embed Text -> Save to Pinecone.
* **Chat Flow**: Question -> Embed Question -> Query Pinecone -> Pass Context to Gemini -> Stream Response.

## 23. Interview Cheat Sheet
* **Project Summary**: AI-powered study assistant using RAG to query personal documents.
* **Tech Stack**: MERN + Pinecone + Gemini.
* **Key Challenge**: Stopping AI hallucinations by using `systemInstruction`. Fixing CORS by setting `credentials: true`.
* **Important APIs**: `/api/files/upload`, `/api/ai/chat`.
* **Common Mistake**: Storing JWTs in LocalStorage. (Always use HttpOnly cookies!).
* **Important Keywords**: RAG, Vector Database, Embeddings, SSE Streaming, Multi-Tenancy, Tokenization, Chunking, JWT, XSS, CSRF, Monolith.
