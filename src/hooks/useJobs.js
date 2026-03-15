import { useState, useEffect, useCallback } from 'react';
import { fetchJobs } from '../utils/api';

export const useJobs = () => {
  const [jobs,    setJobs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [total,   setTotal]   = useState(0);
  const [filters, setFilters] = useState({ keyword: 'react developer', location: 'india', page: 1 });

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await fetchJobs(filters);
      setJobs(data.results || []);
      setTotal(data.count   || 0);
    } catch {
      setError('Could not load jobs. Showing demo listings.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const updateFilters = (patch) =>
    setFilters(prev => ({ ...prev, ...patch, page: 1 }));

  return { jobs, loading, error, total, filters, updateFilters };
};
