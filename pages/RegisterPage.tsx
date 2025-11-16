import React, { useState } from 'react';
import { PageProps, User, UserRole } from '../types';
import Header from '../components/Header';
import { UserPlusIcon, CheckCircleIcon, XCircleIcon } from '../components/icons';

interface RegisterProps extends PageProps {
  onRegister: (user: User) => User | string;
}

const PasswordRequirement: React.FC<{ isValid: boolean; text: string }> = ({ isValid, text }) => (
  <li className={`flex items-center gap-2 transition-colors ${isValid ? 'text-green-400' : 'text-slate-400'}`}>
    {isValid ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
    <span className="text-sm">{text}</span>
  </li>
);

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const requirements = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return (
    <div className="mt-4 p-3 bg-brand-blue-dark/30 rounded-lg">
      <ul className="space-y-2">
        <PasswordRequirement isValid={requirements.length} text="At least 6 characters" />
        <PasswordRequirement isValid={requirements.uppercase} text="Contain at least one uppercase letter" />
        <PasswordRequirement isValid={requirements.number} text="Contain at least one number" />
        <PasswordRequirement isValid={requirements.special} text="Contain at least one special character" />
      </ul>
    </div>
  );
};


const RegisterPage: React.FC<RegisterProps> = ({ onRegister, setActivePage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  const validatePassword = (pwd: string) => {
    const hasLength = pwd.length >= 6;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return hasLength && hasUppercase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Please ensure your password meets all the requirements.');
      return;
    }
    
    const result = onRegister({ email, password, role });
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
                    <UserPlusIcon className="w-16 h-16 text-brand-gold mx-auto mb-4"/>
                    <h1 className="text-3xl font-jura font-bold text-white">Create Your Account</h1>
                    <p className="text-slate-400">Join BuildLink today</p>
                  </div>
                  
                  {error && (
                     <p className="text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">{error}</p>
                  )}
                  
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
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                          className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
                          placeholder="••••••••"
                          required
                      />
                      {(isPasswordFocused || password.length > 0) && <PasswordStrengthIndicator password={password} />}
                  </div>
                  <div>
                      <label className="block text-slate-300 font-bold mb-2" htmlFor="confirm-password">
                          Confirm Password
                      </label>
                      <input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-brand-blue-dark/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-white"
                          placeholder="••••••••"
                          required
                      />
                  </div>
                  <div>
                      <label className="block text-slate-300 font-bold mb-2">I want to register as a...</label>
                      <div className="flex gap-4">
                          <button type="button" onClick={() => setRole('user')} className={`flex-1 p-3 rounded-lg border-2 transition-colors ${role === 'user' ? 'bg-brand-gold/10 border-brand-gold text-white' : 'border-brand-blue-light hover:border-brand-gold/50 text-slate-300'}`}>Client</button>
                          <button type="button" onClick={() => setRole('architect')} className={`flex-1 p-3 rounded-lg border-2 transition-colors ${role === 'architect' ? 'bg-brand-gold/10 border-brand-gold text-white' : 'border-brand-blue-light hover:border-brand-gold/50 text-slate-300'}`}>Architect</button>
                      </div>
                  </div>
                  <button
                      type="submit"
                      className="w-full bg-brand-gold text-brand-blue-dark font-bold py-3 rounded-lg hover:bg-brand-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 text-lg"
                  >
                      Create Account
                  </button>
                  <p className="text-center text-slate-400">
                      Already have an account?{' '}
                      <button type="button" onClick={() => setActivePage('login')} className="font-bold text-brand-gold hover:underline">
                          Login
                      </button>
                  </p>
              </form>
          </div>
       </main>
    </div>
  );
};

export default RegisterPage;
