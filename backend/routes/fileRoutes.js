import express from 'express';
import multer from 'multer';
import { uploadFile, getFiles, deleteFile, renameFile } from '../controllers/fileController.js';
import { protect } from '../middleware/authMiddleware.js';
import path from 'path';

import fs from 'fs';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.pptx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, PPTX, and TXT are allowed.'));
    }
  }
});

router.post('/upload', protect, function (req, res, next) {
  upload.single('file')(req, res, function (err) {
    if (err) {
      console.error('Multer upload error:', err);
      return res.status(500).json({ message: 'File upload middleware error', error: err.message });
    }
    next();
  });
}, uploadFile);
router.get('/', protect, getFiles);
router.delete('/:id', protect, deleteFile);
router.put('/:id/rename', protect, renameFile);

export default router;
