import React from 'react';
import { Building, MapPin, Users, CheckCircle } from 'lucide-react';

interface StatsPanelProps {
  totalJobs: number;
  filteredJobs: number;
  contactedCount: number;
  uniqueStates: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  totalJobs,
  filteredJobs,
  contactedCount,
  uniqueStates
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-sky-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredJobs}</span> of {totalJobs} opportunities
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{uniqueStates}</span> states
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{contactedCount}</span> contacted
            </span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};