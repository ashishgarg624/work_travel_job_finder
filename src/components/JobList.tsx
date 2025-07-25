import React, { useState } from 'react';
import { JobCard } from './JobCard';
import { FilterPanel } from './FilterPanel';
import { Job, FilterState } from '../types/Job';

interface JobListProps {
  jobs: Job[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  uniqueStates: string[];
  uniqueIndustries: string[];
  contactedJobs: Set<string>;
  selectedJobId: string | null;
  onJobSelect: (jobId: string) => void;
  onToggleContacted: (jobId: string) => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  filters,
  onFiltersChange,
  uniqueStates,
  uniqueIndustries,
  contactedJobs,
  selectedJobId,
  onJobSelect,
  onToggleContacted
}) => {
  const [contactFilter, setContactFilter] = useState<'all' | 'contacted' | 'uncontacted'>('all');

  const filteredJobs = jobs.filter(job => {
    if (contactFilter === 'contacted') return contactedJobs.has(job.companyId);
    if (contactFilter === 'uncontacted') return !contactedJobs.has(job.companyId);
    return true;
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-gray-50 max-md:overflow-y-auto">
      <div className=" bg-gray-50">
        <FilterPanel
          filters={filters}
          onFiltersChange={onFiltersChange}
          uniqueStates={uniqueStates}
          uniqueIndustries={uniqueIndustries}
          jobCount={jobs.length}
        />
      </div>
        <div className=" sticky top-0 z-10 px-4 pt-2 pb-0 flex gap-2 bg-white pb-2">
          <button
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${contactFilter === 'all' ? 'bg-primary text-black border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
            onClick={() => setContactFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${contactFilter === 'contacted' ? 'bg-primary text-black border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
            onClick={() => setContactFilter('contacted')}
          >
            Contacted
          </button>
        </div>
      <div className="flex-1 min-h-0 md:overflow-y-auto">
        <div className="p-4 space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <JobCard
                key={job.companyId}
                job={job}
                isSelected={selectedJobId === job.companyId}
                isContacted={contactedJobs.has(job.companyId)}
                onSelect={() => onJobSelect(job.companyId)}
                onToggleContacted={() => onToggleContacted(job.companyId)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};