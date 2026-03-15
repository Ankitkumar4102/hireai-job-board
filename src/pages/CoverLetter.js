import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Zap, FileText, Copy, CheckCheck, RefreshCw, Sparkles } from 'lucide-react';
import { generateCoverLetter } from '../utils/openai';
import './CoverLetter.css';

const FIELD = ({ label, name, value, onChange, placeholder, textarea, rows = 4 }) => (
  <div className="cl-field">
    <label htmlFor={name}>{label}</label>
    {textarea ? (
      <textarea id={name} name={name} value={value} onChange={onChange}
        placeholder={placeholder} rows={rows}/>
    ) : (
      <input id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}/>
    )}
  </div>
);

export default function CoverLetter() {
  const { state } = useLocation();
  const prefill   = state?.job;

  const [form, setForm] = useState({
    userName:       'Ankit Kumar',
    userSkills:     'React, Node.js, JavaScript, MySQL, MongoDB, Python',
    jobTitle:       prefill?.title                        || '',
    company:        prefill?.company?.display_name        || '',
    jobDescription: prefill?.description                  || '',
  });
  const [letter,  setLetter]  = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [copied,  setCopied]  = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const generate = async () => {
    if (!form.jobTitle.trim() || !form.company.trim()) {
      setError('Please fill in Job Title and Company Name.');
      return;
    }
    setError(''); setLetter(''); setLoading(true);
    try {
      const result = await generateCoverLetter(form);
      setLetter(result);
    } catch {
      setError('Generation failed. Check your OpenAI key in .env, or use demo mode.');
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="cl-page">
      <div className="cl-inner">

        {/* Hero */}
        <div className="cl-hero fade-up">
          <span className="cl-badge"><Zap size={13}/> AI Cover Letter Generator</span>
          <h1 className="cl-h1">Land the Interview<br/><span className="cl-grad">in 30 Seconds</span></h1>
          <p className="cl-sub">Paste the job details, click Generate — done.</p>
        </div>

        {/* Two-col layout */}
        <div className="cl-layout fade-up" style={{ animationDelay:'80ms' }}>

          {/* Form */}
          <div className="cl-form">
            <div className="cl-form-head"><FileText size={17}/> Your Details</div>

            <FIELD label="Your Name"   name="userName"       value={form.userName}       onChange={onChange} placeholder="Ankit Kumar"/>
            <FIELD label="Your Skills" name="userSkills"     value={form.userSkills}     onChange={onChange} placeholder="React, Node.js, MySQL…"/>
            <FIELD label="Job Title ✱" name="jobTitle"       value={form.jobTitle}       onChange={onChange} placeholder="Senior React Developer"/>
            <FIELD label="Company ✱"   name="company"        value={form.company}        onChange={onChange} placeholder="Razorpay"/>
            <FIELD label="Job Description (optional — paste for best results)"
                   name="jobDescription" value={form.jobDescription} onChange={onChange}
                   placeholder="Paste the job description here…"
                   textarea rows={5}/>

            {error && <p className="cl-error">{error}</p>}

            <button className="cl-generate" onClick={generate} disabled={loading}>
              {loading
                ? <><RefreshCw size={16} className="spinning"/> Writing…</>
                : <><Sparkles size={16}/> Generate Cover Letter</>}
            </button>
          </div>

          {/* Output */}
          <div className="cl-output">
            <div className="cl-out-head">
              <span>Generated Letter</span>
              {letter && (
                <button className="cl-copy" onClick={copy}>
                  {copied ? <><CheckCheck size={14}/> Copied!</> : <><Copy size={14}/> Copy</>}
                </button>
              )}
            </div>

            {loading ? (
              <div className="cl-loading">
                <div className="cl-dots">
                  {[0,1,2].map(i => <span key={i} className="cl-dot" style={{ animationDelay:`${i*.18}s` }}/>)}
                </div>
                <p>Writing your cover letter…</p>
              </div>
            ) : letter ? (
              <pre className="cl-text">{letter}</pre>
            ) : (
              <div className="cl-placeholder">
                <FileText size={44}/>
                <p>Your AI cover letter will appear here</p>
                <span>Fill the form and click Generate</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
