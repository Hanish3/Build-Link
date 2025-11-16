import React from 'react';
import { User, UserDashboardView } from '../../types';
import { SparklesIcon, WandSparklesIcon, ImageIcon, BuildingOfficeIcon } from '../icons';

interface UserDashboardProps {
  user: User;
  setActiveView: (view: UserDashboardView) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, setActiveView }) => {
  const quickAccessItems = [
    {
      id: 'chat',
      title: 'Chat with Archigen AI',
      description: 'Get design ideas, ask questions, and explore possibilities.',
      icon: <SparklesIcon className="w-8 h-8" />,
    },
    {
      id: 'editor',
      title: 'AI Image Editor',
      description: 'Upload an image and use AI to make magical edits.',
      icon: <WandSparklesIcon className="w-8 h-8" />,
    },
    {
      id: 'generator',
      title: 'AI Image Generator',
      description: 'Create stunning architectural visuals from text prompts.',
      icon: <ImageIcon className="w-8 h-8" />,
    },
    {
      id: 'architects',
      title: 'Find an Architect',
      description: 'Browse our network of licensed and verified professionals.',
      icon: <BuildingOfficeIcon className="w-8 h-8" />,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-jura font-bold text-white mb-2">Welcome, Client!</h1>
      <p className="text-slate-400 mb-8">This is your project hub. Access all your tools from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickAccessItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as UserDashboardView)}
            className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl p-6 text-left hover:border-brand-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="text-brand-gold mt-1">{item.icon}</div>
              <div>
                <h3 className="text-xl font-jura font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 mt-1">{item.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;