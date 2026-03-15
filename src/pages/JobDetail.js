import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Building2, Clock, IndianRupee,
  ExternalLink, FileText, Bookmark, BookmarkCheck,
  Briefcase, Users, Globe
} from 'lucide-react';
import { timeAgo, fmtSalary, initials, strColor, toggleSaved, isSaved } from '../utils/helpers';
import './JobDetail.css';

export default function JobDetail() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const job       = state?.job;
  const [saved, setSaved] = useState(() => job ? isSaved(job.id) : false);

  if (!job) return (
    <div className="detail-page">
      <div className="detail-inner not-found">
        <Briefcase size={52} />
        <h2>Job not found</h2>
        <p>Go back and click on a job listing.</p>
        <button className="btn-back" onClick={() => navigate('/')}>← Back to Jobs</button>
      </div>
    </div>
  );

  const color = strColor(job.company?.display_name);
  const init  = initials(job.company?.display_name);
  const tags  = job.tags || [];

  const handleSave = () => {
    toggleSaved(job);
    setSaved(s => !s);
  };

  return (
    <div className="detail-page">
      <div className="detail-inner">

        {/* Back */}
        <button className="btn-back fade-up" onClick={() => navigate(-1)}>
          <ArrowLeft size={16}/> Back to Jobs
        </button>

        <div className="detail-grid">
          {/* Main card */}
          <div className="detail-card fade-up" style={{ animationDelay:'60ms' }}>

            {/* Header */}
            <div className="dc-header">
              <div className="dc-logo" style={{ background: color + '1a', color }}>{init}</div>
              <div className="dc-title-block">
                <h1 className="dc-title">{job.title}</h1>
                <div className="dc-meta">
                  <span><Building2 size={14}/>{job.company?.display_name}</span>
                  <span><MapPin    size={14}/>{job.location?.display_name}</span>
                  <span><Clock     size={14}/>{timeAgo(job.created)}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="dc-tags">
                {tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            )}

            {/* Stats row */}
            <div className="dc-stats">
              <div className="dc-stat">
                <IndianRupee size={17}/>
                <div>
                  <p className="dcs-label">Salary</p>
                  <p className="dcs-val">{fmtSalary(job.salary_min, job.salary_max)}</p>
                </div>
              </div>
              <div className="dc-stat">
                <Globe size={17}/>
                <div>
                  <p className="dcs-label">Work Mode</p>
                  <p className="dcs-val">{job.location?.display_name?.toLowerCase().includes('remote') ? 'Remote' : 'On-site'}</p>
                </div>
              </div>
              <div className="dc-stat">
                <Users size={17}/>
                <div>
                  <p className="dcs-label">Category</p>
                  <p className="dcs-val">{job.category?.label || 'IT Jobs'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="dc-section">
              <h2>About the Role</h2>
              <p className="dc-desc">{job.description}</p>
            </div>

            {/* Actions */}
            <div className="dc-actions">
              <a href={job.redirect_url === '#' ? undefined : job.redirect_url}
                 target="_blank" rel="noopener noreferrer"
                 className="btn-apply">
                Apply Now <ExternalLink size={15}/>
              </a>
              <Link to="/cover-letter" state={{ job }} className="btn-cl">
                <FileText size={15}/> AI Cover Letter
              </Link>
              <button className={`btn-save${saved ? ' on' : ''}`} onClick={handleSave}>
                {saved ? <><BookmarkCheck size={15}/> Saved</> : <><Bookmark size={15}/> Save</>}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="detail-aside fade-up" style={{ animationDelay:'120ms' }}>
            <div className="aside-card">
              <h3>Quick Info</h3>
              <ul className="aside-list">
                <li><span>Company</span><strong>{job.company?.display_name}</strong></li>
                <li><span>Location</span><strong>{job.location?.display_name}</strong></li>
                <li><span>Posted</span><strong>{timeAgo(job.created)}</strong></li>
                <li><span>Salary</span><strong>{fmtSalary(job.salary_min, job.salary_max)}</strong></li>
              </ul>
            </div>
            <div className="aside-card aside-cta">
              <FileText size={28} className="aside-cta-icon"/>
              <h3>Need a cover letter?</h3>
              <p>Let AI write a personalised one for this job in seconds.</p>
              <Link to="/cover-letter" state={{ job }} className="btn-apply" style={{ justifyContent:'center' }}>
                Generate Free
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
