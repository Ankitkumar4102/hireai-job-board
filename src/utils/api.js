import axios from 'axios';

const APP_ID  = process.env.REACT_APP_ADZUNA_APP_ID;
const APP_KEY = process.env.REACT_APP_ADZUNA_API_KEY;
const hasKeys = () => APP_ID && APP_KEY &&
  APP_ID !== 'your_adzuna_app_id_here' &&
  APP_KEY !== 'your_adzuna_api_key_here';

/* ── Fetch jobs from Adzuna ── */
export const fetchJobs = async ({ keyword = 'react developer', location = 'india', page = 1 } = {}) => {
  if (!hasKeys()) return getMockJobs();
  try {
    const { data } = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/${page}`,
      { params: { app_id: APP_ID, app_key: APP_KEY, what: keyword, where: location, results_per_page: 12 } }
    );
    return { results: data.results || [], count: data.count || 0 };
  } catch {
    return getMockJobs();
  }
};

/* ── City autocomplete ── */
export const suggestCities = (q) =>
  ['Bangalore','Mumbai','Delhi','Pune','Hyderabad','Chennai','Kolkata','Noida','Gurgaon','Remote']
    .filter(c => c.toLowerCase().includes(q.toLowerCase()));

/* ══════════════════════════════════
   MOCK DATA  – used without API key
══════════════════════════════════ */
export const getMockJobs = () => ({
  count: 8,
  results: [
    {
      id:'1', title:'Senior React Developer',
      company:{ display_name:'Razorpay' },
      location:{ display_name:'Bangalore, India' },
      salary_min:1400000, salary_max:2400000,
      description:'We are hiring a Senior React Developer to build world-class payment UIs. You will architect scalable frontend systems, mentor junior developers, and work closely with product and design teams. Strong expertise in React, TypeScript, Redux, and REST APIs required. Experience with performance optimisation and micro-frontends is a big plus.',
      created: new Date(Date.now()-3600000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['React','TypeScript','Redux'],
    },
    {
      id:'2', title:'Full Stack MERN Developer',
      company:{ display_name:'Zepto' },
      location:{ display_name:'Mumbai, India' },
      salary_min:900000, salary_max:1600000,
      description:'Join our fast-growing quick-commerce startup as a MERN stack engineer. You will ship full-stack features across MongoDB, Express, React, and Node.js. Ownership mindset is a must — you will own features from design to production. Experience with Docker, CI/CD, and AWS is a plus.',
      created: new Date(Date.now()-86400000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['MongoDB','Express','React','Node.js'],
    },
    {
      id:'3', title:'Frontend Engineer (React Native)',
      company:{ display_name:'Meesho' },
      location:{ display_name:'Bangalore, India' },
      salary_min:1000000, salary_max:1800000,
      description:'Build the Meesho mobile app used by 150M+ users across India. You will work in React Native, optimise app performance, and collaborate with product designers. Strong JavaScript fundamentals and understanding of the React Native bridge is required.',
      created: new Date(Date.now()-172800000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['React Native','JavaScript','Mobile'],
    },
    {
      id:'4', title:'Junior Frontend Developer',
      company:{ display_name:'Infosys' },
      location:{ display_name:'Pune, India' },
      salary_min:450000, salary_max:750000,
      description:'Entry-level frontend developer role open to 2024 graduates. You will build responsive web applications using HTML, CSS, JavaScript, and React. Training on Angular and TypeScript provided. Good understanding of REST APIs and Git is required.',
      created: new Date(Date.now()-259200000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['HTML','CSS','JavaScript','React'],
    },
    {
      id:'5', title:'UI Engineer — Design Systems',
      company:{ display_name:'Zomato' },
      location:{ display_name:'Gurgaon, India' },
      salary_min:1200000, salary_max:2000000,
      description:'Own Zomato\'s design system used across web and mobile. You will build accessible, themeable React components with Storybook, write tests with Vitest, and work closely with designers. Figma-to-code proficiency and eye for detail required.',
      created: new Date(Date.now()-345600000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['React','Storybook','Figma','CSS'],
    },
    {
      id:'6', title:'Node.js Backend Developer',
      company:{ display_name:'Groww' },
      location:{ display_name:'Bangalore, India' },
      salary_min:1100000, salary_max:1900000,
      description:'Join our fintech backend team building APIs that power millions of investor journeys. You will work with Node.js, Express, PostgreSQL, and Redis at scale. Strong understanding of system design, API security, and performance is required.',
      created: new Date(Date.now()-432000000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['Node.js','PostgreSQL','Redis','Express'],
    },
    {
      id:'7', title:'React + Next.js Developer',
      company:{ display_name:'Urban Company' },
      location:{ display_name:'Remote, India' },
      salary_min:800000, salary_max:1400000,
      description:'We need a Next.js developer to build SEO-optimised, server-rendered web pages for our home services platform. You will work with React, Next.js App Router, Tailwind CSS, and REST APIs. Experience with ISR and image optimisation is a bonus.',
      created: new Date(Date.now()-518400000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['Next.js','React','Tailwind','SSR'],
    },
    {
      id:'8', title:'Frontend Performance Engineer',
      company:{ display_name:'PhonePe' },
      location:{ display_name:'Bangalore, India' },
      salary_min:1600000, salary_max:2800000,
      description:'Specialised role focused on Core Web Vitals, bundle analysis, and runtime optimisation for PhonePe\'s web platforms. You will audit pages, implement lazy loading, code splitting, and caching strategies. Deep knowledge of browser internals and Lighthouse required.',
      created: new Date(Date.now()-604800000).toISOString(),
      redirect_url:'#', category:{ label:'IT Jobs' }, tags:['Performance','React','Webpack','Web Vitals'],
    },
  ],
});
