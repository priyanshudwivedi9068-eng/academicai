import fs from 'fs';
import path from 'path';
import Document from '../models/Document.js';
import { processDocumentAndEmbed } from '../services/ragService.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, size, filename } = req.file;
    const ext = path.extname(originalname).toUpperCase().replace('.', '');
    
    const newDoc = await Document.create({
      name: originalname,
      originalName: originalname,
      type: ext,
      size: size,
      path: req.file.path,
      user: req.user._id,
    });

    res.status(201).json(newDoc);

    // Run text extraction and RAG embedding asynchronously in the background
    processFileAsync(newDoc, req.user._id);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
};

const processFileAsync = async (doc, userId) => {
  try {
    let extractedText = "";
    
    if (doc.type === 'PDF') {
      const dataBuffer = fs.readFileSync(doc.path);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    } else if (doc.type === 'DOCX') {
      const result = await mammoth.extractRawText({ path: doc.path });
      extractedText = result.value;
    } else if (doc.type === 'TXT') {
      extractedText = fs.readFileSync(doc.path, 'utf8');
    }

    if (extractedText.trim()) {
      try {
        await processDocumentAndEmbed(extractedText, doc._id, userId);
      } catch (embedError) {
        console.error('Failed to embed document:', embedError);
      }
    }

    doc.isProcessed = true;
    await doc.save();
    console.log(`Document ${doc._id} processed and embedded successfully.`);
  } catch (err) {
    console.error(`Error processing document ${doc._id}:`, err);
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files' });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });
    if (!doc) return res.status(404).json({ message: 'File not found' });

    if (fs.existsSync(doc.path)) {
      fs.unlinkSync(doc.path);
    }
    
    await doc.deleteOne();

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file' });
  }
};

export const renameFile = async (req, res) => {
  try {
    const { name } = req.body;
    const doc = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'File not found' });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Error renaming file' });
  }
};
