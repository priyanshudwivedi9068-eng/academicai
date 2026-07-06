# Code Implementation Summary

This document explains exactly *how* the core features of AcademicAI were coded, focusing on the AI controllers, RAG logic, file uploads, and Vector indexing. Everything runs in Node.js.

---

## 1. AI Logic (`aiController.js`)

This file is our Express.js controller that handles all requests from the React frontend to Google's Gemini AI using the `@google/genai` package.

* **Streaming Chat (`/chat`)**:
  * We use Node's `res.write()` to send text back to the frontend chunk-by-chunk (Server-Sent Events), exactly like ChatGPT. 
  * We pull the user's `userId` from the decoded JWT token.
  * We retrieve context from Pinecone (using `ragService.js`) based on the user's question.
  * We pass the context into Gemini's `systemInstruction` config to prevent the AI from getting confused.
  * We use `ai.models.generateContentStream()` to stream the generated chunks back.

* **Quiz Generation (`/quiz`)**:
  * We use a highly strict prompt demanding the AI return raw JSON format.
  * We use `responseMimeType: 'application/json'` in the Gemini configuration to enforce this.
  * Once Gemini generates the JSON array of questions/options, `aiController.js` parses it using `JSON.parse()` and sends it to the frontend to be rendered as an interactive UI.

* **Notes Generation (`/notes`)**:
  * We prompt the AI to generate structured GitHub-flavored markdown based on the context.
  * The frontend receives this markdown and uses `react-markdown` to render beautiful formatted text.

---

## 2. RAG & Embeddings (`ragService.js`)

This file bridges the gap between text, Gemini Embeddings, and the Pinecone Vector Database using `@pinecone-database/pinecone`.

* **Text Chunking (`chunkText` function)**:
  * AI models have token limits, and vectors can only hold so much data. I wrote a custom JavaScript function to split massive extracted PDF text into smaller ~1000 character chunks.
  * I ensure chunks don't cut off in the middle of sentences by splitting based on paragraph line breaks (`\n\n`).

* **Vector Retrieval (`retrieveContext` function)**:
  * When a user asks a question, this function turns their text question into a vector using `gemini-embedding-2`.
  * It then queries the Pinecone Index for the top 5 most mathematically similar vectors.
  * Crucially, we pass a `filter: { userId: userId.toString() }` to Pinecone to guarantee we only search through chunks that belong to the current user.
  * The text from those 5 matching vectors is joined together and returned to be injected into the AI's prompt.

---

## 3. File Upload Code (`fileController.js`)

This Node.js controller manages the lifecycle of a document uploaded by the user.

* **Receiving the File**:
  * We use the `multer` middleware to handle the `multipart/form-data` upload from the browser and save the physical file to a local `/uploads` directory.
  * We save a record of this file (size, name, path, owner) into our MongoDB database.

* **Text Extraction**:
  * Because Pinecone only understands raw text, we use specialized parsers:
    * `pdf-parse`: Reads binary PDF buffers and extracts readable strings.
    * `mammoth`: Reads `.docx` files and strips away Word formatting to get raw text.
    * `fs.readFileSync`: Reads raw `.txt` files directly.

* **Triggering the AI**:
  * Once the raw text is extracted, `fileController.js` imports `processDocumentAndEmbed` directly from `ragService.js` and executes it.
  * Node.js immediately responds `201 Created` to the user so the frontend feels incredibly fast, while the heavy embedding logic happens locally in the background.

---

## 4. Index Assignment & Multi-Tenancy

When `ragService.js` receives the text from the file controller, it needs to save it to Pinecone safely.

* **Vector ID Assignment**:
  * Every chunk of text needs a unique ID in Pinecone.
  * We generate this ID by combining the MongoDB Document ID and the chunk index: `${documentId}-${i}`. E.g., `64f1a2b3-0`, `64f1a2b3-1`.
  * This allows us to easily find and delete all chunks associated with a specific file if the user deletes that file from their dashboard.

* **Metadata Assignment (Multi-Tenancy)**:
  * Along with the vector numbers, we store a `metadata` object in Pinecone.
  * The metadata contains three things:
    1. `userId`: Used to lock down searches so users only search their own data.
    2. `documentId`: Used if we want the user to chat with one specific file instead of all their files.
    3. `text`: The actual string of English text. This is what we return to Gemini when a vector match is found.
