import React from 'react';
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
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <FilterPanel
        filters={filters}
        onFiltersChange={onFiltersChange}
        uniqueStates={uniqueStates}
        uniqueIndustries={uniqueIndustries}
        jobCount={jobs.length}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            jobs.map(job => (
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