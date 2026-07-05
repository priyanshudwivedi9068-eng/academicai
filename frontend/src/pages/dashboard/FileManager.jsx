import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { UploadCloud, FileText, MoreVertical, Search, Filter, Trash2, Edit2 } from 'lucide-react';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchFiles = async () => {
    try {
      const res = await api.get('/files');
      setFiles(res.data);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    setUploading(true);
    setProgress(0);
    
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      fetchFiles();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/plain': ['.txt']
    },
    maxSize: 50 * 1024 * 1024 
  });

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await api.delete(`/files/${id}`);
      setFiles(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }, []);

  const handleRename = useCallback(async (id, currentName) => {
    const newName = window.prompt('Enter new name:', currentName);
    if (!newName || newName === currentName) return;
    try {
      await api.put(`/files/${id}/rename`, { name: newName });
      fetchFiles();
    } catch (err) {
      console.error('Rename failed:', err);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">File Manager</h1>
          <p className="text-slate-500 dark:text-slate-400">Upload and manage your study materials.</p>
        </div>
      </div>

      {}
      <div 
        {...getRootProps()} 
        className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer group
          ${isDragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
        `}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
          {isDragActive ? 'Drop file here' : 'Click or drag files to upload'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Supports PDF, DOCX, TXT, PPTX (Max 50MB)</p>
        
        {uploading && (
          <div className="w-full max-w-xs mt-6">
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-center mt-2 text-slate-500 font-medium">Uploading... {progress}%</p>
          </div>
        )}
      </div>

      {}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">File Name</th>
                <th className="px-6 py-4 font-medium hidden sm:table-cell">Type</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Size</th>
                <th className="px-6 py-4 font-medium hidden sm:table-cell">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {Array.isArray(files) && files.map((file) => (
                <tr key={file._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-[300px]">
                      {file.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{file.type}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 hidden md:table-cell">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {file.isProcessed ? (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">Ready for AI</span>
                    ) : (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">Processing...</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button aria-label="Rename file" onClick={() => handleRename(file._id, file.name)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button aria-label="Delete file" onClick={() => handleDelete(file._id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!Array.isArray(files) || files.length === 0) && !uploading && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No files uploaded yet. Drag and drop a document to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
