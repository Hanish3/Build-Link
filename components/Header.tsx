import React from 'react';
import { PageType, User } from '../types';
import { LogoIcon } from './icons';

interface HeaderProps {
  setActivePage?: (page: PageType) => void;
  onLogoClick?: () => void;
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ setActivePage, onLogoClick, isAuthenticated, user, onLogout }) => {
  
  const handleLogoClick = () => {
    if (isAuthenticated && onLogoClick) {
      onLogoClick();
    } else if (!isAuthenticated && setActivePage) {
      setActivePage('landing');
    }
  }

  return (
    <header className="bg-brand-blue-dark/70 backdrop-blur-lg p-4 border-b border-brand-gold/20 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
        <LogoIcon className="w-8 h-8 text-brand-gold" />
        <h1 className="text-2xl font-bold font-jura text-white">
          Build<span className="text-brand-gold">Link</span>
        </h1>
      </div>
      <div className="flex items-center gap-6">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <span className="text-slate-300 hidden sm:inline">Welcome, {user.name || user.email}!</span>
            <button
              onClick={onLogout}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setActivePage && setActivePage('login')}
              className="text-slate-300 hover:text-brand-gold font-bold transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => setActivePage && setActivePage('register')}
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;