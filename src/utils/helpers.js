export const timeAgo = (iso) => {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600)    return `${Math.floor(s/60)}m ago`;
  if (s < 86400)   return `${Math.floor(s/3600)}h ago`;
  if (s < 604800)  return `${Math.floor(s/86400)}d ago`;
  return `${Math.floor(s/604800)}w ago`;
};

export const fmtSalary = (min, max) => {
  const lakh = (n) => `₹${(n/100000).toFixed(1)}L`;
  if (!min && !max) return 'Salary not listed';
  if (min && max)   return `${lakh(min)} – ${lakh(max)}/yr`;
  if (min)          return `From ${lakh(min)}/yr`;
  return `Up to ${lakh(max)}/yr`;
};

export const initials = (name = '') =>
  name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase() || 'CO';

/* Deterministic colour from string */
const PALETTE = ['#7c6aff','#22d3ee','#4ade80','#fbbf24','#fb7185','#818cf8','#f472b6','#34d399'];
export const strColor = (s = '') => PALETTE[s.charCodeAt(0) % PALETTE.length];

export const getSavedJobs = () => {
  try { return JSON.parse(localStorage.getItem('hireai_saved') || '[]'); }
  catch { return []; }
};

export const toggleSaved = (job) => {
  const saved = getSavedJobs();
  const exists = saved.find(j => j.id === job.id);
  const next = exists ? saved.filter(j => j.id !== job.id) : [...saved, job];
  localStorage.setItem('hireai_saved', JSON.stringify(next));
  return next;
};

export const isSaved = (id) => getSavedJobs().some(j => j.id === id);
