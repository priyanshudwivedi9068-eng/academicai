# AcadAssist Deployment Guide

This guide details how to deploy the AcadAssist MERN stack application to production environments.

## 1. Backend Deployment (Render / Railway / Heroku)

### Prerequisites
- A MongoDB Atlas Cluster URI
- API Keys (Gemini, Pinecone)
- A registered domain or sub-domain for your frontend (to set CORS `FRONTEND_URL`)

### Steps
1. Push your code to a GitHub repository.
2. Connect your repository to a hosting provider like **Render** (Web Service).
3. Set the Root Directory to `backend`.
4. Set the Build Command to `npm install`.
5. Set the Start Command to `npm start`.
6. **Environment Variables**: Add all variables from `backend/.env.example` into your provider's dashboard.
   - *CRITICAL*: Set `NODE_ENV=production`.
   - *CRITICAL*: Ensure `FRONTEND_URL` matches your deployed React app's URL exactly (e.g., `https://acadassist.vercel.app`) to prevent CORS and Cookie errors.

## 2. Frontend Deployment (Vercel / Netlify)

### Steps
1. Connect your repository to Vercel or Netlify.
2. Set the Root Directory to `frontend`.
3. The Build Command will automatically be detected as `npm run build`, and the output directory as `dist`.
4. **Environment Variables**: Add variables from `frontend/.env.example`.
   - Update `VITE_API_URL` to point to your newly deployed backend URL (e.g., `https://acadassist-api.onrender.com/api`).
5. Click Deploy.

## 3. Production Security Checklist
- [ ] Change `JWT_SECRET` and `JWT_REFRESH_SECRET` to long, secure randomized strings.
- [ ] Ensure `secure: true` is enabled in `res.cookie` configurations inside `authController.js` (this happens automatically if `NODE_ENV === 'production'`).
- [ ] Verify your MongoDB Atlas Network Access is restricted to your backend server's IP (or `0.0.0.0/0` if on a dynamic host like Render).
- [ ] Verify rate-limiting is functioning on the `/api/auth/login` endpoints.
