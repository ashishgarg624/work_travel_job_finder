import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
          <a href="https://workandtravelguide.org/">
          <img
            width={150}
            height={50}
            src="https://workandtravelguide.org/wp-content/uploads/2022/10/logo-2.png"
            className="attachment-large size-large wp-image-21368"
            alt="Work and Travel Guide Logo"
            sizes="(max-width: 800px) 100vw, 800px"
          />								</a>
            {/* <div className="flex items-center justify-center w-10 h-10 bg-sky-500 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Work & Travel Guide</h1>
              <p className="text-sm text-gray-500">Find your next opportunity in Australia</p>
            </div> */}
          </div>
          <div className="flex items-center space-x-2 text-md font-semibold text-primary">
            <MapPin className="w-4 h-4" />
            <span>Australia Wide</span>
          </div>
        </div>
      </div>
    </header>
  );
};