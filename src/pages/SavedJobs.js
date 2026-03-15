import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import JobCard from '../components/JobCard';
import { getSavedJobs } from '../utils/helpers';
import './SavedJobs.css';

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => { setJobs(getSavedJobs()); }, []);

  const clearAll = () => {
    localStorage.removeItem('hireai_saved');
    setJobs([]);
  };

  return (
    <div className="saved-page">
      <div className="saved-inner">

        <div className="saved-head fade-up">
          <div>
            <h1 className="saved-title">Saved Jobs</h1>
            <p className="saved-sub">{jobs.length} job{jobs.length !== 1 ? 's' : ''} bookmarked</p>
          </div>
          {jobs.length > 0 && (
            <button className="btn-clear" onClick={clearAll}>
              <Trash2 size={14}/> Clear all
            </button>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="saved-empty fade-up" style={{ animationDelay:'60ms' }}>
            <div className="empty-icon"><Bookmark size={40}/></div>
            <h2>Nothing saved yet</h2>
            <p>Bookmark jobs you like and they'll appear here.</p>
            <Link to="/" className="btn-browse">
              Browse Jobs <ArrowRight size={16}/>
            </Link>
          </div>
        ) : (
          <div className="jobs-grid fade-up" style={{ animationDelay:'60ms' }}>
            {jobs.map((j, i) => <JobCard key={j.id} job={j} delay={i * 45}/>)}
          </div>
        )}
      </div>
    </div>
  );
}
