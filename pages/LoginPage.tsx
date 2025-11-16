import React, { useState } from 'react';
import { PageProps, User } from '../types';
import Header from '../components/Header';
import { LogoIcon } from '../components/icons';

interface LoginProps extends PageProps {
  onLogin: (email: string, password: string) => User | string;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin, setActivePage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    
    const result = onLogin(email, password);
    if (typeof result === 'string') {
      setError(result);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
       <Header setActivePage={setActivePage} isAuthenticated={false} user={null} onLogout={() => {}} />
       <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md">
              <form 
                onSubmit={handleSubmit}
                className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-8 space-y-6"
              >
                  <div className="text-center mb-6">
                    <LogoIcon className="w-16 h-16 text-brand-gold mx-auto mb-4"/>
                    <h1 className="text-3xl font-jura font-bold text-white">Welcome Back</h1>
                    <p className="text-slate-400">Sign in to continue to BuildLink</p>
                  </div>
                  
                  {error && <p className="text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">{error}</p>}
                  
                  <div>
                      <label className="block text-slate-300 font-bold mb-2" htmlFor="email">
                          Email Address
                      </label>
                      <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
                          placeholder="you@example.com"
                          required
                      />
                  </div>
                   <div>
                      <label className="block text-slate-300 font-bold mb-2" htmlFor="password">
                          Password
                      </label>
                      <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
                          placeholder="••••••••"
                          required
                      />
                  </div>
                  
                  <button
                      type="submit"
                      className="w-full bg-brand-gold text-brand-blue-dark font-bold py-3 rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 text-lg"
                  >
                      Login
                  </button>
                  <p className="text-center text-slate-400">
                      Don't have an account?{' '}
                      <button type="button" onClick={() => setActivePage('register')} className="font-bold text-brand-gold hover:underline">
                          Register
                      </button>
                  </p>
              </form>
          </div>
       </main>
    </div>
  );
};

export default LoginPage;