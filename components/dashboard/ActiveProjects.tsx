
import React from 'react';
import { BriefcaseIcon } from '../icons';

const ActiveProjects: React.FC = () => {
  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <BriefcaseIcon className="w-8 h-8 text-brand-gold" />
        <h1 className="text-3xl font-jura font-bold text-white">Active Projects</h1>
      </div>
       <div className="text-center py-20 border-2 border-dashed border-brand-blue-light rounded-lg">
        <p className="text-slate-400">This is your collaboration hub for all ongoing projects.</p>
        <p className="text-slate-500 text-sm mt-2">The collaboration workspace is under construction.</p>
      </div>
    </div>
  );
};

export default ActiveProjects;