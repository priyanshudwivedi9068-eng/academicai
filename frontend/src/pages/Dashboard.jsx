import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Settings, FileText, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-display font-bold text-lg">AcadAssist</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Hello, {user?.name}</span>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {}
          <div className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" /> User Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                <div className="mt-1 text-slate-900 font-medium">{user?.name}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="mt-1 text-slate-900 font-medium">{user?.email}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account ID</label>
                <div className="mt-1 text-slate-500 text-sm font-mono">{user?._id}</div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium text-sm hover:bg-primary-100 transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors">
                Change Password
              </button>
            </div>
          </div>

          {}
          <div className="col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-primary-300 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">My Documents</h3>
              <p className="text-sm text-slate-500">View and analyze your uploaded study materials.</p>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-primary-300 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Preferences</h3>
              <p className="text-sm text-slate-500">Manage your study AI model settings.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
