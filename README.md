<div align="center">
  <img src="https://raw.githubusercontent.com/priyanshudwivedi9068-eng/academicai/main/frontend/public/vite.svg" alt="AcademicAI Logo" width="100" />
  <h1>AcadAssist (AcademicAI)</h1>
  <p>An intelligent, AI-powered study companion that helps students learn faster through document analysis and personalized quizzing.</p>
  
  [![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://academicai-seven.vercel.app/)
  [![Render Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://academicai-emzn.onrender.com)
  [![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=black)](https://react.dev)
  [![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-339933?logo=node.js&logoColor=white)](https://nodejs.org)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://mongodb.com)
  [![Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

<br />

## 🌟 Overview

**AcadAssist** is a state-of-the-art intelligent learning platform designed to revolutionize how students study. By combining Google's powerful **Gemini AI** with **Retrieval-Augmented Generation (RAG)**, AcadAssist allows users to upload their academic documents (PDFs, DOCX, TXT) and instantly generate context-aware study materials, quizzes, and summaries.

### ✨ Key Features

- 🔐 **Secure Authentication**: Robust JWT-based authentication with Google OAuth integration and manual email/password registration.
- 📁 **Smart Document Upload**: Upload your course materials safely. Documents are parsed and securely stored.
- 🧠 **Retrieval-Augmented Generation (RAG)**: Automatically chunks and embeds your documents into a Pinecone Vector Database using `gemini-embedding-2`.
- 🤖 **AI Study Companion**: Chat seamlessly with your documents! The AI fetches exact paragraphs from your uploaded texts to answer questions contextually.
- 📝 **Automated Quizzing**: Dynamically generate multiple-choice quizzes based on your uploaded lectures or notes to test your knowledge.
- 🎨 **Beautiful UI/UX**: A stunning, modern, responsive interface built with Tailwind CSS, featuring smooth Framer Motion animations and Dark Mode support.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Auth**: Google Identity Services (`@react-oauth/google`)

### Backend
- **Server**: Node.js & Express.js
- **Database**: MongoDB (Mongoose)
- **Vector DB**: Pinecone
- **AI Models**: Google GenAI SDK (`gemini-2.5-flash`, `gemini-embedding-2`)
- **Security**: Helmet, Express Rate Limit, JWT, bcryptjs
- **Document Parsing**: `pdf-parse`, `mammoth`, `multer`

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/priyanshudwivedi9068-eng/academicai.git
cd academicai
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
GEMINI_API_KEY=your_google_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=academicai
GOOGLE_CLIENT_ID=your_google_oauth_client_id
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```
Start the Vite development server:
```bash
npm run dev
```

---

## 📂 Project Structure

```text
academicai/
├── backend/                  # Express.js REST API
│   ├── controllers/          # Route logic (auth, files, AI)
│   ├── middleware/           # JWT, Error Handling, Rate Limiting
│   ├── models/               # MongoDB Mongoose Schemas
│   ├── routes/               # Express Routes
│   └── services/             # RAG Engine, Pinecone Embeddings
├── frontend/                 # React UI
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (Auth, Theme)
│   │   ├── layouts/          # Dashboard & Page Layouts
│   │   ├── pages/            # Main application views
│   │   └── styles/           # Tailwind / CSS configuration
│   └── public/               # Static assets
└── docs/                     # Project documentation & Architecture notes
```

---

## ☁️ Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com).
- **Backend**: Deployed on [Render](https://render.com).

*(Note for production: The frontend uses a reverse proxy in `vercel.json` to route `/api/*` to the Render backend to bypass cross-domain strict cookie policies on modern browsers).*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
