import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import SavedJobs from './pages/SavedJobs';
import CoverLetter from './pages/CoverLetter';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/job/:id"      element={<JobDetail />} />
        <Route path="/saved"        element={<SavedJobs />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
      </Routes>
    </Router>
  );
}
