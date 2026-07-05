import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { BookOpen, Clock, Target, Zap } from 'lucide-react';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.8 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4.2 },
  { name: 'Fri', hours: 2.0 },
  { name: 'Sat', hours: 5.5 },
  { name: 'Sun', hours: 3.0 },
];

const Overview = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {user?.name}!</h1>
        <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your studies today.</p>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Study Hours', value: '22.5h', icon: <Clock className="w-5 h-5 text-blue-500" />, trend: '+12%' },
          { label: 'Documents Analyzed', value: '14', icon: <BookOpen className="w-5 h-5 text-purple-500" />, trend: '+3' },
          { label: 'Quizzes Mastered', value: '8', icon: <Target className="w-5 h-5 text-green-500" />, trend: '+2' },
          { label: 'Current Streak', value: '5 days', icon: <Zap className="w-5 h-5 text-orange-500" />, trend: 'Keep it up!' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Study Progress</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { title: 'Uploaded Biology_Ch4.pdf', time: '2 hours ago', type: 'file' },
              { title: 'Completed Cell Structure Quiz', time: '5 hours ago', type: 'quiz' },
              { title: 'Generated Notes for History', time: 'Yesterday', type: 'notes' },
              { title: 'Reviewed 20 Flashcards', time: 'Yesterday', type: 'flashcard' }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 3 && <div className="absolute top-8 left-4 w-[1px] h-full bg-slate-200 dark:bg-slate-800"></div>}
                <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 border-2 border-white dark:border-slate-900 flex items-center justify-center flex-shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
