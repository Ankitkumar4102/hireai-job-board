import { useState, useEffect } from 'react';

export function useJobs() {
  const [allJobs, setAllJobs] = useState([]); // Stores all jobs from database
  const [jobs, setJobs] = useState([]);       // Stores filtered jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  // 1. Fetch real jobs from your new Node.js backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Call your backend API
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch live jobs from server');
        
        const data = await response.json();

        // MongoDB uses '_id', but React usually expects 'id'. 
        // This maps it so your JobCard component doesn't break!
        const formattedData = data.map(job => ({
          ...job,
          id: job._id 
        }));

        setAllJobs(formattedData);
        setJobs(formattedData);
        setTotal(formattedData.length);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Could not connect to the live job database.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 2. Keep your frontend search/filtering working
  const updateFilters = ({ keyword = '', location = '' }) => {
    let filtered = allJobs;

    if (keyword) {
      const lowerKey = keyword.toLowerCase();
      filtered = filtered.filter(job => 
        job.title?.toLowerCase().includes(lowerKey) || 
        job.company?.toLowerCase().includes(lowerKey) ||
        job.tags?.some(tag => tag.toLowerCase().includes(lowerKey))
      );
    }

    if (location) {
      const lowerLoc = location.toLowerCase();
      filtered = filtered.filter(job => 
        job.location?.toLowerCase().includes(lowerLoc)
      );
    }

    setJobs(filtered);
  };

  return { jobs, loading, error, total, updateFilters };
}