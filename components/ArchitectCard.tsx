import React from 'react';
import { User } from '../types';
import { BuildingOfficeIcon, CheckBadgeIcon, StarIcon } from './icons';
import { defaultPfpUrl } from '../defaultPfp';

interface ArchitectCardProps {
  architect: User;
  onViewProfile: (architect: User) => void;
}

const ArchitectCard: React.FC<ArchitectCardProps> = ({ architect, onViewProfile }) => {
  const filledStars = Math.floor(architect.rating || 0);
  const hasHalfStar = (architect.rating || 0) % 1 !== 0;

  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light/50 rounded-xl overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-300">
      <img src={architect.imageUrl || defaultPfpUrl} alt={architect.name || 'Architect'} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-bold text-white font-jura flex items-center gap-2">
          {architect.name}
          {architect.verificationStatus === 'verified' && <CheckBadgeIcon className="w-5 h-5 text-brand-gold" />}
        </h4>
        <div className="flex items-center gap-2 text-slate-300 text-sm mt-1">
          <BuildingOfficeIcon className="w-4 h-4" />
          <span>{architect.specialty || 'Specialty not listed'}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-5 h-5 ${i < filledStars ? 'text-brand-gold fill-current' : 'text-brand-blue-light'}`} />
          ))}
           <span className="text-white ml-2">{(architect.rating || 0).toFixed(1)}</span>
        </div>
        <button 
          onClick={() => onViewProfile(architect)}
          className="w-full mt-4 bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-2 rounded-lg transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ArchitectCard;
