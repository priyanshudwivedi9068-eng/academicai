# AcadAssist API Documentation

Base URL: `http://localhost:5000/api` (Local)

## Authentication (`/api/auth`)

### `POST /register`
Registers a new user.
- **Body**: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
- **Response**: `201 Created` - Returns user object. Sets `jwt` and `refreshToken` cookies.

### `POST /login`
Authenticates a user.
- **Body**: `{ "email": "john@example.com", "password": "password123" }`
- **Response**: `200 OK` - Returns user object. Sets HttpOnly cookies. Rate-limited to 10 requests / 15 min.

### `POST /refresh`
Generates a new access token using the HttpOnly refresh token cookie.
- **Response**: `200 OK` - Sets new `jwt` cookie.

### `GET /profile`
Returns the currently authenticated user's profile.
- **Headers**: Requires valid `jwt` cookie.
- **Response**: `200 OK` - `{ "_id": "...", "name": "...", "email": "..." }`

## Files (`/api/files`)

### `POST /upload`
Uploads a document (PDF, DOCX, TXT), parses it, and triggers semantic chunking and Pinecone embedding.
- **Headers**: `Content-Type: multipart/form-data`
- **Body**: FormData containing `file`.
- **Response**: `201 Created` - Returns metadata object.

### `GET /`
Fetches all uploaded documents for the authenticated user.
- **Response**: `200 OK` - Array of document objects.

### `DELETE /:id`
Deletes a document from MongoDB and the local filesystem.

### `PUT /:id/rename`
Renames a document.
- **Body**: `{ "name": "New Name.pdf" }`

## AI Engine (`/api/ai`)

### `POST /chat` (Server-Sent Events)
Streams a response from Gemini using RAG context.
- **Body**: `{ "message": "What is mitochondria?", "history": [] }`
- **Response**: `text/event-stream` - Streams chunks of markdown text.

### `POST /quiz`
Generates an interactive JSON quiz.
- **Body**: `{ "topic": "Biology", "difficulty": "Hard", "type": "MCQs" }`
- **Response**: `200 OK` - `[{ "question": "...", "options": [...], "answer": "...", "explanation": "..." }]`

### `POST /notes`
Generates structured markdown notes.
- **Body**: `{ "topic": "Biology", "style": "Summary" }`
- **Response**: `200 OK` - `{ "markdown": "# Biology Summary..." }`
