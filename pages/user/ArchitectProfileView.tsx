import React from 'react';
import { User } from '../../types';
import { BuildingOfficeIcon, CheckBadgeIcon, StarIcon, PaperAirplaneIcon, ArrowLeftIcon } from '../../components/icons';
import { defaultPfpUrl } from '../../defaultPfp';

interface ArchitectProfileViewProps {
  user: User;
  architect: User;
  onBack: () => void;
  onStartConversation: (architect: User) => void;
}

const ArchitectProfileView: React.FC<ArchitectProfileViewProps> = ({ user, architect, onBack, onStartConversation }) => {
  
  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-slate-400 hover:text-brand-gold">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-jura font-bold text-white">Architect Profile</h1>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <img src={architect.imageUrl || defaultPfpUrl} alt={architect.name} className="w-full rounded-lg border-4 border-brand-gold/30 aspect-square object-cover" />
                <button 
                  onClick={() => onStartConversation(architect)}
                  className="w-full mt-4 bg-brand-gold text-brand-blue-dark font-bold py-3 rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 flex items-center justify-center gap-2">
                    <PaperAirplaneIcon className="w-5 h-5"/>
                    Contact Architect
                </button>
            </div>
            <div className="lg:col-span-2">
                <h2 className="text-4xl font-jura text-white flex items-center gap-2">
                    {architect.name}
                    {architect.verificationStatus === 'verified' && <CheckBadgeIcon className="w-7 h-7 text-brand-gold" />}
                </h2>
                <div className="flex items-center gap-2 text-slate-300 text-lg mt-2">
                    <BuildingOfficeIcon className="w-5 h-5" />
                    <span>{architect.specialty || 'N/A'}</span>
                </div>
                 <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-6 h-6 ${i < Math.floor(architect.rating || 0) ? 'text-brand-gold fill-current' : 'text-brand-blue-light'}`} />
                    ))}
                    <span className="text-white ml-2 text-lg">{(architect.rating || 0).toFixed(1)}</span>
                </div>
                <div className="mt-8">
                    <h3 className="text-2xl font-jura text-brand-gold border-b-2 border-brand-gold/20 pb-2 mb-4">About Me</h3>
                    <p className="text-slate-300 whitespace-pre-wrap">{architect.bio || 'This architect has not provided a biography yet.'}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectProfileView;
