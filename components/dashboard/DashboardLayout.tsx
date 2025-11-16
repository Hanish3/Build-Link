import React from 'react';
import { User, SidebarNavItem, UserDashboardView, ArchitectDashboardView } from '../../types';
import Header from '../Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  sidebarNavItems: SidebarNavItem[];
  activeView: UserDashboardView | ArchitectDashboardView;
  setActiveView: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  onLogout,
  sidebarNavItems,
  activeView,
  setActiveView,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-blue-dark">
      <Header 
        user={user}
        isAuthenticated={true} 
        onLogout={onLogout}
        onLogoClick={() => setActiveView('dashboard')}
      />
      <div className="flex-grow flex overflow-hidden">
        <Sidebar
          user={user}
          navItems={sidebarNavItems}
          activeView={activeView}
          setActiveView={setActiveView}
          onLogout={onLogout}
        />
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto bg-brand-blue-dark/50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;