import express from 'express';
import { streamChat, generateQuiz, generateNotes } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All AI routes are protected
router.use(protect);

router.post('/chat', streamChat);
router.post('/quiz', generateQuiz);
router.post('/notes', generateNotes);

export default router;
