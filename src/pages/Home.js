import React, { useState } from 'react';
import { Search, MapPin, Zap, Briefcase, TrendingUp, X, Calendar } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/JobCard';
import { SkeletonGrid } from '../components/Skeleton';
import './Home.css';

const FILTERS = [
  { label:'All',       value:'' },
  { label:'React',     value:'react' },
  { label:'MERN',      value:'mern full stack' },
  { label:'Next.js',   value:'nextjs' },
  { label:'Node.js',   value:'nodejs' },
  { label:'Python',    value:'python developer' },
  { label:'Android',   value:'android developer' },
  { label:'ML / AI',   value:'machine learning' },
  { label:'DevOps',    value:'devops' },
];

export default function Home() {
  const { jobs, loading, error, total, page, updateFilters, nextPage, prevPage } = useJobs();
  const [keyword,  setKeyword]  = useState('');
  const [location, setLocation] = useState('');
  const [chip,     setChip]     = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ keyword: keyword || 'developer', location: location || 'india' });
  };

  const handleChip = (v) => {
    setChip(v);
    updateFilters({ keyword: v || 'react developer' });
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    setDateFilter(val);
    updateFilters({ dateFilter: val });
  };

  return (
    <main className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-badge fade-up"><Zap size={13}/> AI-Powered · Real-Time Listings</div>

        <h1 className="hero-h1 fade-up" style={{animationDelay:'60ms'}}>
          Find Your Next<br/>
          <span className="hero-grad">Dev Role</span> in India
        </h1>

        <p className="hero-sub fade-up" style={{animationDelay:'120ms'}}>
          Live jobs from top tech companies.<br/>Generate AI cover letters in 10 seconds.
        </p>

        {/* Search bar */}
        <form className="search-bar fade-up" style={{animationDelay:'180ms'}} onSubmit={handleSearch}>
          <div className="sb-field">
            <Search size={17} className="sb-icon"/>
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Role, skill or keyword…"
            />
            {keyword && <button type="button" onClick={() => setKeyword('')}><X size={13}/></button>}
          </div>
          <div className="sb-div"/>
          <div className="sb-field">
            <MapPin size={17} className="sb-icon"/>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City (e.g. Bangalore)"
            />
            {location && <button type="button" onClick={() => setLocation('')}><X size={13}/></button>}
          </div>
          <button type="submit" className="sb-btn">Search</button>
        </form>

        {/* Stats */}
        <div className="hero-stats fade-up" style={{animationDelay:'240ms'}}>
          {[
            { icon:<Briefcase size={18}/>,  label:'Live Jobs',   val: total > 0 ? `${total.toLocaleString()}+` : '50,000+' },
            { icon:<TrendingUp size={18}/>, label:'New Today',   val:'300+'  },
            { icon:<Zap size={18}/>,        label:'AI Assisted', val:'100%'  },
          ].map(s => (
            <div key={s.label} className="hs-item">
              <span className="hs-icon">{s.icon}</span>
              <span className="hs-val">{s.val}</span>
              <span className="hs-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Results ── */}
      <section className="results">
        <div className="results-inner">

          {/* Filter chips */}
          <div className="chips-row">
            {FILTERS.map(f => (
              <button
                key={f.value}
                className={`chip${chip === f.value ? ' active' : ''}`}
                onClick={() => handleChip(f.value)}
              >{f.label}</button>
            ))}
          </div>

          {/* Header row with Date Filter dropdown */}
          <div className="results-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h2 className="results-title">
                {chip ? FILTERS.find(f=>f.value===chip)?.label : 'Developer'} Jobs
              </h2>
              {!loading && <p className="results-count">{jobs.length} results shown on this page</p>}
            </div>

            {/* Date Filter Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#111827', padding: '6px 12px', borderRadius: '8px', border: '1px solid #374151' }}>
              <Calendar size={15} style={{ color: '#9ca3af', marginRight: '8px' }} />
              <select 
                value={dateFilter} 
                onChange={handleDateChange}
                style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '14px' }}
              >
                <option value="all" style={{ background: '#1f2937' }}>All Time</option>
                <option value="today" style={{ background: '#1f2937' }}>Last 24 Hours</option>
                <option value="week" style={{ background: '#1f2937' }}>Past Week</option>
                <option value="month" style={{ background: '#1f2937' }}>Past Month</option>
              </select>
            </div>
          </div>

          {/* Error */}
          {error && <div className="err-bar">⚠ {error}</div>}

          {/* Grid */}
          {loading ? <SkeletonGrid/> : jobs.length > 0 ? (
            <div className="jobs-grid">
              {jobs.map((j, i) => <JobCard key={j.id} job={j} delay={i * 45}/>)}
            </div>
          ) : (
            <div className="empty">
              <Briefcase size={52}/>
              <h3>No jobs found</h3>
              <p>Try a different keyword, location, or date filter</p>
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && jobs.length > 0 && (
            <div className="pagination-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
              <button 
                onClick={prevPage} 
                disabled={page === 1}
                className="sb-btn"
                style={{ opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous Page
              </button>
              <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>Page {page}</span>
              <button 
                onClick={nextPage}
                className="sb-btn"
              >
                Next Page
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}