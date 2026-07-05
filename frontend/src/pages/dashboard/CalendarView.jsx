import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const CalendarView = () => {
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2); 

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary-500" /> October 2026
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Track your exam dates and study milestones.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Today
          </button>
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          {days.map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        
        {}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-slate-200 dark:bg-slate-800 gap-[1px]">
          {dates.map((date, i) => (
            <div key={i} className={`bg-white dark:bg-slate-900 p-2 min-h-[100px] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${date <= 0 || date > 31 ? 'text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-900/50' : 'text-slate-700 dark:text-slate-300'}`}>
              <span className={`text-sm font-medium ${date === 14 ? 'w-6 h-6 flex items-center justify-center rounded-full bg-primary-600 text-white' : ''}`}>
                {date > 0 && date <= 31 ? date : (date <= 0 ? 30 + date : date - 31)}
              </span>
              
              {}
              {date === 15 && (
                <div className="mt-2 text-xs p-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium truncate">
                  Biology Midterm
                </div>
              )}
              {date === 22 && (
                <div className="mt-2 text-xs p-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium truncate">
                  Essay Draft Due
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
