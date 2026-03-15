import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, Bookmark, BookmarkCheck, IndianRupee, ArrowUpRight } from 'lucide-react';
import { timeAgo, fmtSalary, initials, strColor, toggleSaved, isSaved } from '../utils/helpers';
import './JobCard.css';

export default function JobCard({ job, delay = 0 }) {
  const [saved, setSaved] = useState(() => isSaved(job.id));
  const color = strColor(job.company?.display_name);
  const init  = initials(job.company?.display_name);
  const tags  = job.tags || [];

  const handleSave = (e) => {
    e.preventDefault();
    toggleSaved(job);
    setSaved(s => !s);
  };

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
          <span><Building2 size={13}/>{job.company?.display_name}</span>
          <span><MapPin size={13}/>{job.location?.display_name}</span>
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
        <span className="jcard-salary"><IndianRupee size={13}/>{fmtSalary(job.salary_min, job.salary_max)}</span>
        <span className="jcard-time"><Clock size={13}/>{timeAgo(job.created)}</span>
      </div>
    </div>
  );
}
