
import React from 'react';
import { DocumentTextIcon } from '../icons';

const ProjectListings: React.FC = () => {
  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <DocumentTextIcon className="w-8 h-8 text-brand-gold" />
        <h1 className="text-3xl font-jura font-bold text-white">Project Listings</h1>
      </div>
       <div className="text-center py-20 border-2 border-dashed border-brand-blue-light rounded-lg">
        <p className="text-slate-400">Browse new project opportunities from clients around the world.</p>
        <p className="text-slate-500 text-sm mt-2">The project board feature is coming soon.</p>
      </div>
    </div>
  );
};

export default ProjectListings;