import { useState, useMemo } from 'react';
import { Job, FilterState } from '../types/Job';
import { jobsData } from '../data/jobs';

export const useJobs = () => {
  const [filters, setFilters] = useState<FilterState>({
    state: '',
    industry: '',
    searchTerm: ''
  });
  
  const [contactedJobs, setContactedJobs] = useState<Set<string>>(new Set());
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesState = !filters.state || job.state === filters.state;
      const matchesIndustry = !filters.industry || job.industry === filters.industry;
      const matchesSearch = !filters.searchTerm || 
        job.companyName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        `${job.firstName} ${job.lastName}`.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesState && matchesIndustry && matchesSearch;
    });
  }, [filters]);

  const uniqueStates = useMemo(() => {
    return Array.from(new Set(jobsData.map(job => job.state))).sort();
  }, []);

  const uniqueIndustries = useMemo(() => {
    return Array.from(new Set(jobsData.map(job => job.industry))).sort();
  }, []);

  const toggleContactedJob = (jobId: string) => {
    setContactedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const selectedJob = selectedJobId ? jobsData.find(job => job.companyId === selectedJobId) : null;

  return {
    jobs: filteredJobs,
    filters,
    setFilters,
    contactedJobs,
    toggleContactedJob,
    selectedJob,
    setSelectedJobId,
    uniqueStates,
    uniqueIndustries
  };
};