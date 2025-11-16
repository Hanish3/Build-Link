import React, { useState } from 'react';
import { User } from '../../types';
import { UserIcon } from '../icons';

interface ArchitectProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const ArchitectProfile: React.FC<ArchitectProfileProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name || '');
  const [specialty, setSpecialty] = useState(user.specialty || '');
  const [bio, setBio] = useState(user.bio || '');
  const [imageUrl, setImageUrl] = useState(user.imageUrl || '');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, name, specialty, bio, imageUrl });
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <UserIcon className="w-8 h-8 text-brand-gold" />
        <h1 className="text-3xl font-jura font-bold text-white">My Professional Profile</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
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
          <label className="block text-slate-300 font-bold mb-2" htmlFor="specialty">Specialty</label>
          <input
            id="specialty"
            type="text"
            placeholder="e.g., Modern Residential, Sustainable Design"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-bold mb-2" htmlFor="imageUrl">Profile Image URL</label>
          <input
            id="imageUrl"
            type="text"
            placeholder="https://example.com/your-photo.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-bold mb-2" htmlFor="bio">Professional Bio</label>
          <textarea
            id="bio"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
            placeholder="Tell clients about your experience, design philosophy, and achievements."
          ></textarea>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-brand-gold text-brand-blue-dark font-bold py-3 px-6 rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20"
          >
            Save Changes
          </button>
          {message && <p className="text-green-400">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default ArchitectProfile;