import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, Zap, PlayCircle, Plus, BookOpen, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../context/AuthContext';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const aiApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const StudyRoom = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [quizType, setQuizType] = useState('MCQs');
  const [notesStyle, setNotesStyle] = useState('Summary');
  
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState('');

  const { user } = useAuth();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (user) {
      api.get('/files')
        .then(res => setFiles(res.data))
        .catch(err => console.error("Error fetching files", err));
    }
  }, [user]);

  const handleGenerateQuiz = async () => {
    if (!topic) return alert('Please enter a topic');
    setLoadingQuiz(true);
    try {
      const res = await aiApi.post('/ai/quiz', { topic, difficulty, type: quizType });
      setGeneratedQuiz(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate quiz.');
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleGenerateNotes = async () => {
    if (!topic) return alert('Please enter a topic');
    setLoadingNotes(true);
    try {
      const res = await aiApi.post('/ai/notes', { topic, style: notesStyle });
      setGeneratedNotes(res.data.markdown);
    } catch (err) {
      console.error(err);
      alert('Failed to generate notes.');
    } finally {
      setLoadingNotes(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Study Room</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate Quizzes and Notes powered by Gemini 1.5 Pro.</p>
      </div>

      {}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Target Topic</label>
            <input 
              type="text" 
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g., Photosynthesis, Chapter 4 Biology" 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white"
            />
            
            {user && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Or select an uploaded note to summarize:</label>
                <select 
                  onChange={e => setTopic(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white"
                >
                  <option value="">-- Choose a document --</option>
                  {Array.isArray(files) && files.map(f => (
                    <option key={f._id} value={f.name}>{f.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Quiz Settings</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <select value={quizType} onChange={e => setQuizType(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white">
                <option>MCQs</option>
                <option>True False</option>
                <option>Fill in the blanks</option>
                <option>Short Answer</option>
                <option>Long Answer</option>
              </select>
              <button onClick={handleGenerateQuiz} disabled={loadingQuiz} className="w-full flex items-center justify-center gap-2 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50">
                {loadingQuiz ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
                Generate Quiz
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes Settings</label>
              <select value={notesStyle} onChange={e => setNotesStyle(e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white">
                <option>Detailed Notes</option>
                <option>Summary</option>
                <option>Bullet Notes</option>
                <option>Revision Notes</option>
                <option>Important Questions</option>
                <option>Key Concepts</option>
                <option>Mind Maps</option>
              </select>
              <div className="h-10"></div> {}
              <button onClick={handleGenerateNotes} disabled={loadingNotes} className="w-full flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50">
                {loadingNotes ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />}
                Generate Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {}
        {generatedQuiz && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-h-[800px] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-500" /> Generated Quiz
            </h2>
            
            {Array.isArray(generatedQuiz) ? generatedQuiz.map((q, i) => (
              <div key={i} className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="font-medium text-slate-900 dark:text-white mb-3">{i + 1}. {q.question}</p>
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {q.options.map((opt, j) => (
                      <div key={j} className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
                <details className="mt-2 group">
                  <summary className="text-sm font-medium text-primary-600 dark:text-primary-400 cursor-pointer select-none">Show Answer & Explanation</summary>
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg">
                    <p className="font-bold text-green-700 dark:text-green-400 text-sm mb-1">Answer: {q.answer}</p>
                    <p className="text-sm text-green-600 dark:text-green-500">{q.explanation}</p>
                  </div>
                </details>
              </div>
            )) : <p className="text-slate-500">Invalid quiz format returned.</p>}
          </div>
        )}

        {}
        {generatedNotes && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-h-[800px] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-green-500" /> Generated Notes
            </h2>
            <div className="prose dark:prose-invert max-w-none text-sm">
              <ReactMarkdown>{generatedNotes}</ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudyRoom;
