# AcadAssist

An intelligent, AI-powered academic assistant and study platform. AcadAssist allows users to upload course materials (PDF, DOCX, TXT), which are processed through a cutting-edge Retrieval-Augmented Generation (RAG) pipeline powered by Google's Gemini 1.5 Pro and Pinecone. Users can then chat directly with their documents, generate interactive quizzes, and create structured markdown notes instantly.

## 🚀 Key Features
- **Secure Authentication**: JWT-based auth with HttpOnly cookies, Google OAuth, and automatic token refresh.
- **Intelligent RAG Pipeline**: Semantic document chunking and vector embedding via Pinecone to power highly accurate, context-aware AI chat.
- **Generative Study Tools**: Automatically generate customizable MCQs, Flashcards, and detailed Markdown notes directly from uploaded documents.
- **Modern Dashboard**: Responsive UI built with React, Tailwind CSS, Framer Motion, and comprehensive Dark/Light mode support.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Framer Motion, Recharts.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer, pdf-parse.
- **AI & Data**: `@google/genai` (Gemini 1.5 Flash/Pro), `@pinecone-database/pinecone`.

## 💻 Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/academicai.git
cd academicai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in both the `frontend` and `backend` directories using the provided `.env.example` templates. You will need:
- MongoDB URI
- Google Gemini API Key
- Pinecone API Key (Create an index named `academicai-index` with dimension `768`)

### 3. Run the Servers
Open two terminal windows:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```
Navigate to `http://localhost:5173` to view the application!
