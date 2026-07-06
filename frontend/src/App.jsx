import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import AIChat from './pages/dashboard/AIChat';
import FileManager from './pages/dashboard/FileManager';
import StudyRoom from './pages/dashboard/StudyRoom';
import CalendarView from './pages/dashboard/CalendarView';
import Settings from './pages/dashboard/Settings';
import Billing from './pages/dashboard/Billing';

import './App.css';

function App() {
  return (
    <Routes>
      {}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="chat" element={<AIChat />} />
        <Route path="files" element={<FileManager />} />
        <Route path="study" element={<StudyRoom />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
