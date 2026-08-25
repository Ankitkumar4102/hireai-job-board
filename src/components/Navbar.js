import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Hexagon, Bookmark, FileText, Search, X, Menu, Sun, Moon, Monitor } from 'lucide-react';
import { suggestCities } from '../utils/api';
import './Navbar.css';

export default function Navbar({ theme, setTheme }) {
  const loc    = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [query,    setQuery]    = useState('');
  const [sugs,     setSugs]     = useState([]);
  const [open,     setOpen]     = useState(false);   // mobile menu
  const inputRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleInput = (e) => {
    const v = e.target.value;
    setQuery(v);
    setSugs(v.length >= 1 ? suggestCities(v) : []);
  };

  const links = [
    { to:'/',             icon:<Briefcase size={15}/>, label:'Jobs'         },
    { to:'/saved',        icon:<Bookmark  size={15}/>, label:'Saved'        },
    { to:'/cover-letter', icon:<FileText  size={15}/>, label:'Cover Letter' },
  ];

  // Theme Toggle Logic
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nb-inner">

        {/* Logo */}
        <Link to="/" className="nb-logo">
         <Hexagon className="nb-logo-icon" size={28} strokeWidth={2.5} />
         <span className="nb-logo-text">HireAI</span>
        </Link>

        {/* Desktop links */}
        <nav className="nb-links">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`nb-link${loc.pathname === l.to ? ' active' : ''}`}>
              {l.icon}{l.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="nb-search-wrap" onBlur={() => setTimeout(() => setSugs([]), 160)}>
          <div className="nb-search">
            <Search size={15} className="nb-si"/>
            <input
              ref={inputRef}
              value={query}
              onChange={handleInput}
              placeholder="Search city or role…"
              onKeyDown={e => e.key === 'Escape' && (setQuery(''), setSugs([]))}
            />
            {query && <button onClick={() => { setQuery(''); setSugs([]); }}><X size={13}/></button>}
          </div>
          {sugs.length > 0 && (
            <ul className="nb-sugs">
              {sugs.map(s => (
                <li key={s} onMouseDown={() => { setQuery(s); setSugs([]); }}>
                  <Search size={12}/>{s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button onClick={cycleTheme} className="nb-theme-btn" title={`Current Theme: ${theme}`}>
          <ThemeIcon size={18} />
        </button>

        {/* Mobile toggle */}
        <button className="nb-menu-btn" onClick={() => setOpen(o => !o)}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="nb-mobile">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`nb-link${loc.pathname === l.to ? ' active' : ''}`}
              onClick={() => setOpen(false)}>
              {l.icon}{l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}