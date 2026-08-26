import { useState, useEffect, useCallback } from 'react';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    keyword: 'developer',
    location: 'india',
    sortBy: 'date' // Sort by newest date by default
  });

  const fetchJobs = useCallback(async (currentFilters) => {
    try {
      setLoading(true);
      setError(null);

      const appId = process.env.REACT_APP_ADZUNA_APP_ID;
      const appKey = process.env.REACT_APP_ADZUNA_API_KEY;

      const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(currentFilters.keyword)}&where=${encodeURIComponent(currentFilters.location)}&results_per_page=30`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch live jobs from Adzuna');

      const data = await response.json();

      let formattedJobs = data.results.map(job => {
        // Fix company name extraction safely
        const companyName = job.company?.display_name || job.company || 'Top Company';
        
        // Fix salary display
        let salaryText = 'Salary not listed';
        if (job.salary_min && job.salary_max) {
          salaryText = `₹${Math.round(job.salary_min / 100000)}L - ₹${Math.round(job.salary_max / 100000)}L/yr`;
        } else if (job.salary_min) {
          salaryText = `₹${Math.round(job.salary_min / 100000)}L+/yr`;
        }

        // Fix date formatting calculation
        const postedDate = job.created ? new Date(job.created) : new Date();
        const diffDays = Math.floor((new Date() - postedDate) / (1000 * 60 * 60 * 24));
        const timeAgo = diffDays === 0 ? 'Today' : `${diffDays}d ago`;

        return {
          id: job.id,
          title: job.title,
          company: companyName,
          location: job.location?.display_name || 'India',
          salary: salaryText,
          description: job.description,
          tags: [currentFilters.keyword],
          postedAt: postedDate,
          timeAgo: timeAgo
        };
      });

      // Sort by newest date by default
      formattedJobs.sort((a, b) => b.postedAt - a.postedAt);

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