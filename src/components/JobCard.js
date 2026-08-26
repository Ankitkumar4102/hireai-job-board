import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Bookmark, BookmarkCheck, IndianRupee } from 'lucide-react';
import { timeAgo, fmtSalary, initials, strColor, toggleSaved, isSaved } from '../utils/helpers';
import './JobCard.css';

export default function JobCard({ job, delay = 0 }) {
  const [saved, setSaved] = useState(() => isSaved(job.id));

  // Safely extract company name whether it's an object or a flat string
  const companyName = typeof job.company === 'object' 
    ? job.company?.display_name 
    : job.company || 'Top Company';

  // Safely extract location whether it's an object or a flat string
  const locationName = typeof job.location === 'object'
    ? job.location?.display_name
    : job.location || 'India';

  const color = strColor(companyName);
  const init = initials(companyName);
  const tags = job.tags || [];

  const handleSave = (e) => {
    e.preventDefault();
    toggleSaved(job);
    setSaved(s => !s);
  };

  // Handle salary display securely
  const displaySalary = job.salary && typeof job.salary === 'string' 
    ? job.salary 
    : fmtSalary(job.salary_min, job.salary_max);

  // Handle timestamp display securely
  const displayTime = job.timeAgo || timeAgo(job.created || job.postedAt);

  return (
    <div className="jcard fade-up" style={{ animationDelay: `${delay}ms` }}>
      {/* top row */}
      <div className="jcard-top">
        <div className="jcard-logo" style={{ background: color + '1a', color }}>
          {init}
        </div>
        <button className={`jcard-save${saved ? ' on' : ''}`} onClick={handleSave} title={saved ? 'Unsave' : 'Save'}>
          {saved ? <BookmarkCheck size={17}/> : <Bookmark size={17}/>}
        </button>
      </div>

      {/* body — entire card links to detail */}
      <Link to={`/job/${job.id}`} state={{ job }} className="jcard-body">
        <h3 className="jcard-title">{job.title}</h3>
        <div className="jcard-meta">
          <span><Building2 size={13}/>{companyName}</span>
          <span><MapPin size={13}/>{locationName}</span>
        </div>
        <p className="jcard-snippet">{job.description?.slice(0, 115)}…</p>
      </Link>

      {/* tags */}
      {tags.length > 0 && (
        <div className="jcard-tags">
          {tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      )}

      {/* footer */}
      <div className="jcard-foot">
        <span className="jcard-salary">
          <IndianRupee size={13}/>{displaySalary}
        </span>
        <span className="jcard-time">
          <Clock size={13}/>{displayTime}
        </span>
      </div>
    </div>
  );
}