import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, 
  },
  size: {
    type: Number,
    required: true, 
  },
  path: {
    type: String,
    required: true, 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  isProcessed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);
