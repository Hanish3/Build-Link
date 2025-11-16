import React, { useState } from 'react';
import { User } from '../../types';
import { Cog6ToothIcon } from '../../components/icons';

interface ArchitectSettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const ArchitectSettings: React.FC<ArchitectSettingsProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, name, email });
    setMessage('Settings updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <Cog6ToothIcon className="w-8 h-8 text-brand-gold" />
        <h1 className="text-3xl font-jura font-bold text-white">Account Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label className="block text-slate-300 font-bold mb-2" htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-bold mb-2" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
            disabled
          />
           <p className="text-xs text-slate-500 mt-1">Email cannot be changed in this demo.</p>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            className="bg-brand-gold text-brand-blue-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
          >
            Save Settings
          </button>
          {message && <p className="text-green-400">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default ArchitectSettings;