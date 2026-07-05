import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, Moon, MessageSquare, FileText, Settings, Home as HomeIcon,
  BarChart2, HelpCircle, Flame, Target, BookOpen, Clock, 
  Users, CheckCircle2, PlayCircle, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform">
             {}
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
             </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 dark:text-white leading-none">AcadAssist</h1>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Intelligent Academic Assistant</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-primary-700 dark:text-primary-400 font-medium rounded-full text-sm">Home</a>
          {['Features', 'How It Works', 'Pricing', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '')}`} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <Link to="/login" className="px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full transition-all shadow-md shadow-primary-600/20">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

const HeroMockup = () => {
  return (
    <div className="relative w-full max-w-[600px] h-[500px]">
      {}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      {}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-12 top-20 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 border border-slate-100 z-20">
         <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
           <FileText className="w-5 h-5" />
         </div>
         <div>
           <div className="text-xs font-bold text-slate-900">Notes Uploaded</div>
           <div className="text-xs text-slate-500">24 Documents</div>
         </div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-8 top-52 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 border border-slate-100 z-20">
         <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600">
           <MessageSquare className="w-5 h-5" />
         </div>
         <div>
           <div className="text-xs font-bold text-slate-900">AI Chats</div>
           <div className="text-xs text-slate-500">128 Conversations</div>
         </div>
      </motion.div>

      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-4 top-16 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 border border-slate-100 z-20">
         <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
           <HelpCircle className="w-5 h-5" />
         </div>
         <div>
           <div className="text-xs font-bold text-slate-900">Quizzes Taken</div>
           <div className="text-xs text-slate-500">56 Quizzes</div>
         </div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-8 top-44 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 border border-slate-100 z-20">
         <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
           <Flame className="w-5 h-5" />
         </div>
         <div>
           <div className="text-xs font-bold text-slate-900">Study Streak</div>
           <div className="text-xs text-slate-500">12 Days</div>
         </div>
      </motion.div>

      {}
      <div className="absolute right-12 top-8 w-[400px] h-[480px] bg-white rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden flex flex-col z-10">
        
        {}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-6 gap-6 z-20">
          <Link to="/dashboard" className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/30 mb-4 hover:scale-105 transition-transform">
             <BookOpen className="w-5 h-5" />
          </Link>
          <Link to="/dashboard"><HomeIcon className="w-5 h-5 text-slate-400 hover:text-primary-600 transition-colors" /></Link>
          <Link to="/dashboard/chat"><MessageSquare className="w-5 h-5 text-slate-700 hover:text-primary-600 transition-colors" /></Link>
          <Link to="/dashboard/files"><FileText className="w-5 h-5 text-slate-400 hover:text-primary-600 transition-colors" /></Link>
          <Link to="/dashboard"><BarChart2 className="w-5 h-5 text-slate-400 hover:text-primary-600 transition-colors" /></Link>
          <div className="mt-auto">
             <Link to="/dashboard/settings"><Settings className="w-5 h-5 text-slate-400 hover:text-primary-600 transition-colors" /></Link>
          </div>
        </div>

        {}
        <div className="ml-16 flex-1 flex flex-col bg-white">
          <div className="p-6 pb-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">👋 Hi, Alex!</h2>
            <p className="text-xs text-slate-500">How can I help you today?</p>
          </div>

          <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
            {}
            <div className="self-end bg-primary-600 text-white p-4 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
              Explain Binary Search with an example.
            </div>

            {}
            <div className="self-start flex gap-3 max-w-[95%]">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-xl overflow-hidden border border-slate-200">
                👨‍🏫
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-700 space-y-3">
                <p><strong>Binary Search</strong> is an efficient algorithm used to find an item from a sorted list...</p>
                <p className="font-semibold text-slate-900 mt-2">Key Steps:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Find the middle element</li>
                  <li>Compare with target</li>
                  <li>Search in the appropriate half</li>
                  <li>Repeat until found</li>
                </ul>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary-600 bg-primary-50 px-3 py-2 rounded-lg border border-primary-100">
                  <FileText className="w-3.5 h-3.5" />
                  Source: Data Structures Notes.pdf (Page 45)
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="p-4 border-t border-slate-50">
            <div className="relative">
              <input type="text" placeholder="Ask anything about your notes..." className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-4 text-xs text-slate-700 outline-none" />
              <button className="absolute right-2 top-1.5 bottom-1.5 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {}
      <div className="absolute right-0 bottom-[-20px] z-30 transform translate-x-12">
        <div className="relative w-40 h-32">
           {}
           <div className="absolute bottom-0 w-32 h-6 bg-blue-400 rounded-lg shadow-md border-b-2 border-blue-500"></div>
           <div className="absolute bottom-5 left-2 w-28 h-5 bg-white rounded-lg shadow-md border-b-2 border-slate-200"></div>
           <div className="absolute bottom-9 left-4 w-24 h-5 bg-pink-300 rounded-lg shadow-md border-b-2 border-pink-400"></div>
           {}
           <div className="absolute bottom-14 left-10 w-12 h-10 bg-slate-200 rounded-b-xl border-t-4 border-slate-300 shadow-md"></div>
           {}
           <div className="absolute bottom-24 left-14 w-4 h-12 bg-green-400 rounded-full origin-bottom -rotate-45"></div>
           <div className="absolute bottom-24 left-14 w-4 h-16 bg-green-500 rounded-full origin-bottom rotate-12"></div>
           <div className="absolute bottom-24 left-14 w-4 h-10 bg-green-400 rounded-full origin-bottom rotate-45"></div>
        </div>
      </div>

    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {}
            <div className="flex-1 text-center lg:text-left z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-8 border border-primary-100 shadow-sm">
                <span className="text-base leading-none">✨</span> Your AI Study Companion
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Study Smarter with <br/>
                <span className="text-primary-600">AI. Achieve More.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Upload your notes, ask questions, generate quizzes, and get AI-powered insights to boost your academic performance.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 flex items-center justify-center gap-2">
                  Get Started for Free <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <PlayCircle className="w-5 h-5 text-slate-900" /> Watch Demo
                </button>
              </div>

              {}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=4" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                </div>
                <p className="text-sm text-slate-600 font-medium">
                  Join <span className="text-primary-600 font-bold">10,000+</span> students already learning smarter
                </p>
              </div>
            </div>

            {}
            <div className="flex-1 flex justify-center lg:justify-end">
               <HeroMockup />
            </div>

          </div>
        </div>

        {}
        <div id="features" className="max-w-7xl mx-auto px-6 mt-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to master your curriculum, housed in one beautiful, lightning-fast workspace.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            
            <Link to="/dashboard/chat" className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 border border-purple-100 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">AI Chat & Doubt Solver</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Get instant answers to your academic questions from your notes.</p>
            </Link>

            <Link to="/dashboard/study-room" className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block group">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 border border-green-100 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">Notes Summarizer</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Summarize long notes into key points and important concepts.</p>
            </Link>

            <Link to="/dashboard/study-room" className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block group">
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-6 border border-yellow-100 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">Quiz Generator</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Generate MCQs, True/False, and more quizzes automatically.</p>
            </Link>

            <Link to="/dashboard/study-room" className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block group">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 mb-6 border border-pink-100 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">Flashcards</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Create smart flashcards from your notes for quick revision.</p>
            </Link>

            <Link to="/dashboard/calendar" className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 border border-blue-100 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">Study Planner</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Get personalized study plans to stay organized and consistent.</p>
            </Link>

            <Link to="/dashboard" className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer block group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6 border border-indigo-100 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">Analytics</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Track your progress and improve your learning efficiency.</p>
            </Link>

          </div>
        </div>

        {}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row flex-wrap justify-between items-center gap-8">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                <Users className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">10K+</div>
                <div className="text-sm text-slate-500 font-medium">Happy Students</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <FileText className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">50K+</div>
                <div className="text-sm text-slate-500 font-medium">Notes Uploaded</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">100K+</div>
                <div className="text-sm text-slate-500 font-medium">AI Conversations</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                <div className="text-sm text-slate-500 font-medium">Student Rating</div>
              </div>
            </div>

          </div>
        </div>

        {}
        <div id="howitworks" className="max-w-7xl mx-auto px-6 mt-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Three simple steps to transform your academic workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl mx-auto mb-6">1</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Upload Notes</h3>
              <p className="text-slate-500 text-sm">Upload your PDFs, Word documents, or PPT slides securely to your private workspace.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center relative">
              <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-0.5 bg-slate-200"></div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200"></div>
              <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl mx-auto mb-6">2</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">AI Analyzes Content</h3>
              <p className="text-slate-500 text-sm">Our advanced Gemini AI reads and understands your entire curriculum in seconds.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl mx-auto mb-6">3</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Generate & Learn</h3>
              <p className="text-slate-500 text-sm">Instantly generate quizzes, summaries, and ask complex questions about your material.</p>
            </div>
          </div>
        </div>

        {}
        <div id="pricing" className="max-w-7xl mx-auto px-6 mt-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4">Simple, transparent pricing.</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
              <p className="text-slate-500 mb-6">Perfect for getting started.</p>
              <div className="mb-8"><span className="text-5xl font-extrabold text-slate-900">$0</span><span className="text-slate-500">/forever</span></div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="w-5 h-5 text-slate-400" /> 3 documents per month</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="w-5 h-5 text-slate-400" /> Basic AI Chat</li>
              </ul>
              <Link to="/dashboard" className="w-full block text-center py-3 rounded-xl border border-slate-300 font-medium text-slate-700 hover:bg-slate-50">Start Free</Link>
            </div>
            <div className="bg-white rounded-3xl p-10 border-2 border-primary-500 shadow-xl shadow-primary-500/10 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">Most Popular</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
              <p className="text-slate-500 mb-6">For serious academic performance.</p>
              <div className="mb-8"><span className="text-5xl font-extrabold text-slate-900">$12</span><span className="text-slate-500">/month</span></div>
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="w-5 h-5 text-primary-600" /> Unlimited documents</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="w-5 h-5 text-primary-600" /> Advanced Quiz & Flashcards</li>
                <li className="flex items-center gap-3 text-slate-700"><CheckCircle2 className="w-5 h-5 text-primary-600" /> Priority Gemini 1.5 Pro access</li>
              </ul>
              <Link to="/dashboard" className="w-full block text-center py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-md shadow-primary-600/20">Upgrade to Pro</Link>
            </div>
          </div>
        </div>

        {}
        <div id="about" className="max-w-7xl mx-auto px-6 mt-32 pt-16 mb-20 text-center">
          <div className="bg-primary-600 rounded-[40px] p-12 md:p-20 text-white shadow-2xl shadow-primary-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10">Ready to transform your grades?</h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-10 text-lg relative z-10">Join thousands of students who have already stopped studying harder and started studying smarter with AcadAssist.</p>
            <Link to="/dashboard" className="inline-flex px-8 py-4 bg-white text-primary-700 rounded-full font-bold hover:bg-slate-50 transition-all shadow-lg relative z-10 items-center gap-2">
              Open Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
