import React from 'react';
import { User, SidebarNavItem, UserDashboardView, ArchitectDashboardView } from '../../types';
import { PaperAirplaneIcon } from '../icons';
import { defaultPfpUrl } from '../../defaultPfp';

interface SidebarProps {
  user: User;
  navItems: SidebarNavItem[];
  activeView: UserDashboardView | ArchitectDashboardView;
  setActiveView: (view: UserDashboardView | ArchitectDashboardView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, navItems, activeView, setActiveView, onLogout }) => {
  return (
    <aside className="w-64 bg-brand-blue-dark/60 backdrop-blur-lg border-r border-brand-gold/20 flex-col flex-shrink-0 hidden md:flex">
      <div className="p-4 border-b border-brand-gold/20">
        <div className="flex items-center gap-3">
          <img 
            src={user.imageUrl || defaultPfpUrl} 
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-brand-gold bg-brand-blue-light object-cover"
          />
          <div>
            <p className="font-bold text-white truncate">{user.name || user.email}</p>
            <p className="text-sm text-slate-400 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
              activeView === item.id
                ? 'bg-brand-gold/10 text-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'text-slate-300 hover:bg-brand-blue-light/50 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-brand-gold/20">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <PaperAirplaneIcon className="w-6 h-6 transform rotate-[270deg]" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
