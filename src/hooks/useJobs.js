import { useState, useEffect, useCallback } from 'react';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    keyword: 'developer',
    location: 'india',
    dateFilter: 'all'
  });

  const fetchJobs = useCallback(async (currentFilters, currentPage) => {
    try {
      setLoading(true);
      setError(null);

      const appId = process.env.REACT_APP_ADZUNA_APP_ID;
      const appKey = process.env.REACT_APP_ADZUNA_API_KEY;

      const url = `https://api.adzuna.com/v1/api/jobs/in/search/${currentPage}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(currentFilters.keyword)}&where=${encodeURIComponent(currentFilters.location)}&results_per_page=15`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch live jobs from Adzuna');

      const data = await response.json();

      let formattedJobs = data.results.map(job => {
        const companyName = job.company?.display_name || 'Top Company';
        
        let salaryText = 'Salary not listed';
        if (job.salary_min && job.salary_max) {
          salaryText = `₹${(job.salary_min / 100000).toFixed(1)}L - ₹${(job.salary_max / 100000).toFixed(1)}L/yr`;
        } else if (job.salary_min) {
          salaryText = `₹${(job.salary_min / 100000).toFixed(1)}L+/yr`;
        } else if (job.salary_max) {
          salaryText = `Up to ₹${(job.salary_max / 100000).toFixed(1)}L/yr`;
        }

        // Smart experience extraction from description or title
        let experienceText = 'Not specified';
        const desc = job.description || '';
        const titleText = job.title || '';
        const combinedText = `${titleText} ${desc}`;
        
        const expMatch = combinedText.match(/(\d+[\s\-]*(?:to|\-)?[\s\d]*)\s*(?:years?|yrs?)\s*(?:of)?\s*experience/i) ||
                         combinedText.match(/experience\s*(?:required|of)?\s*:?\s*(\d+[\s\-]*(?:to|\-)?[\s\d]*)\s*(?:years?|yrs?)/i) ||
                         combinedText.match(/(\d+)\+?\s*years?/i);

        if (expMatch && expMatch[1]) {
          experienceText = `${expMatch[1].trim()} yrs exp`;
        }

        const postedDate = job.created ? new Date(job.created) : new Date();
        const diffDays = Math.floor((new Date() - postedDate) / (1000 * 60 * 60 * 24));
        const timeAgo = diffDays === 0 ? 'Today' : `${diffDays}d ago`;

        return {
          id: job.id,
          title: job.title,
          company: companyName,
          location: job.location?.display_name || 'India',
          salary: salaryText,
          experience: experienceText,
          description: job.description,
          tags: [currentFilters.keyword],
          postedAt: postedDate,
          timeAgo: timeAgo,
          diffDays: diffDays,
          redirect_url: job.redirect_url
        };
      });

      if (currentFilters.dateFilter === 'today') {
        formattedJobs = formattedJobs.filter(j => j.diffDays === 0);
      } else if (currentFilters.dateFilter === 'week') {
        formattedJobs = formattedJobs.filter(j => j.diffDays <= 7);
      } else if (currentFilters.dateFilter === 'month') {
        formattedJobs = formattedJobs.filter(j => j.diffDays <= 30);
      }

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
    fetchJobs(filters, page);
  }, [filters, page, fetchJobs]);

  const updateFilters = (newFilters) => {
    setPage(1);
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const nextPage = () => setPage(p => p + 1);
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  return { jobs, loading, error, total, page, updateFilters, nextPage, prevPage };
}