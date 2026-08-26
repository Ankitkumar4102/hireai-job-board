import { useState, useEffect, useCallback } from 'react';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    keyword: 'developer',
    location: 'india'
  });

  const fetchJobs = useCallback(async (currentFilters) => {
    try {
      setLoading(true);
      setError(null);

      const appId = process.env.REACT_APP_ADZUNA_APP_ID;
      const appKey = process.env.REACT_APP_ADZUNA_API_KEY;

      const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(currentFilters.keyword)}&where=${encodeURIComponent(currentFilters.location)}&results_per_page=20`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch live jobs from Adzuna');

      const data = await response.json();

      const formattedJobs = data.results.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        salary: job.salary_min ? `₹${(job.salary_min / 100000).toFixed(1)}L/yr` : 'Salary not listed',
        description: job.description,
        tags: [currentFilters.keyword],
        postedAt: job.created
      }));

      setJobs(formattedJobs);
      setTotal(data.count || formattedJobs.length);
    } catch (err) {
      console.error("Adzuna Fetch Error:", err);
      setError("Could not load live jobs. Please check your network or API keys.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(filters);
  }, [filters, fetchJobs]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return { jobs, loading, error, total, updateFilters };
}