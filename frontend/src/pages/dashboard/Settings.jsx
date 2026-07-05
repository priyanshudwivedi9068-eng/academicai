import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { User, Bell, Shield, Moon, Sun } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and application settings.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-500" /> Profile Information
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="space-y-4 flex-1 w-full">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.name}
                  className="w-full max-w-md px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email}
                  disabled
                  className="w-full max-w-md px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-sm">
            Save Changes
          </button>
        </div>

        {}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Sun className="w-5 h-5 text-orange-500" /> Appearance
          </h2>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toggle dark mode interface.</p>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        {}
        <div className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-500" /> Notifications
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Email Summaries', desc: 'Receive weekly summaries of your study progress.' },
              { title: 'Study Reminders', desc: 'Get notified when you have flashcards due.' },
              { title: 'New Features', desc: 'Updates about AcadAssist improvements.' },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{pref.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{pref.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
