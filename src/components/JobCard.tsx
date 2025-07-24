import React from "react";
import { Mail, Phone, MapPin, User, CheckCircle, Circle } from "lucide-react";
import { Job } from "../types/Job";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  isContacted: boolean;
  onSelect: () => void;
  onToggleContacted: () => void;
}

const industryColors: Record<string, string> = {
  Hospitality: "bg-blue-100 text-blue-800",
  "Retail & Tourism": "bg-green-100 text-green-800",
  Tourism: "bg-purple-100 text-purple-800",
  Agriculture: "bg-yellow-100 text-yellow-800",
};

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSelected,
  isContacted,
  onSelect,
  onToggleContacted,
}) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "border-sky-500 bg-sky-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300"
      } ${isContacted ? "opacity-75" : ""}`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              {job.companyName}
            </h3>
            {isContacted && <CheckCircle className="w-5 h-5 text-green-500" />}
          </div>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              industryColors[job.industry] || "bg-gray-100 text-gray-800"
            }`}
          >
            {job.industry}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleContacted();
          }}
          className={`p-1 rounded-full transition-colors ${
            isContacted
              ? "text-green-600 hover:text-green-700"
              : "text-gray-400 hover:text-gray-600"
          }`}
          title={isContacted ? "Mark as not contacted" : "Mark as contacted"}
        >
          {isContacted ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-700">
          <User className="w-4 h-4 text-gray-400" />
          <span>
            {job.firstName} {job.lastName}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="truncate">{job.address}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-700">
          <Mail className="w-4 h-4 text-gray-400" />
          <a
            href={`mailto:${job.email}`}
            className="text-sky-600 hover:text-sky-800 truncate"
            onClick={(e) => e.stopPropagation()}
          >
            {job.email}
          </a>
        </div>

        <div className="flex items-center space-x-2 text-gray-700">
          <Phone className="w-4 h-4 text-gray-400" />
          <a
            href={`tel:${job.phoneNumber}`}
            className="text-sky-600 hover:text-sky-800"
            onClick={(e) => e.stopPropagation()}
          >
            {job.phoneNumber}
          </a>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">{job.state}</span>
          <span className="text-xs text-gray-500">ID: {job.companyId}</span>
        </div>
      </div>
    </div>
  );
};
