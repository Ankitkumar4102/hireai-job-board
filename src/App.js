import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import SavedJobs from './pages/SavedJobs';
import CoverLetter from './pages/CoverLetter';

export default function App() {
  // 1. Initialize theme from local storage, default to 'system'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

  // 2. Effect to apply the theme to the DOM whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'dark' || (theme === 'system' && systemPrefersDark)) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* 3. Pass the state down to the Navbar so we can toggle it */}
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/job/:id"      element={<JobDetail />} />
        <Route path="/saved"        element={<SavedJobs />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
      </Routes>
    </Router>
  );
}