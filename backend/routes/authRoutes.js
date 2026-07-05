import express from 'express';
import { register, login, logout, refresh, getProfile, googleLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/refresh', refresh);
router.post('/google', googleLogin);

router.get('/profile', protect, getProfile);

export default router;
