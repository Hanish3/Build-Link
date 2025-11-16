import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import UserPortal from './pages/UserPortal';
import ArchitectPortal from './pages/ArchitectPortal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { PageType, User, Conversation, PrivateMessage } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageType>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // --- Local Storage "Database" Management ---
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('buildlink_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('buildlink_conversations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('buildlink_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('buildlink_conversations', JSON.stringify(conversations));
  }, [conversations]);
  
  // Check for logged in user on initial load
  useEffect(() => {
    const loggedInUser = localStorage.getItem('buildlink_currentUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setCurrentUser(user);
      setActivePage(user.role === 'architect' ? 'architect_portal' : 'user_portal');
    }
  }, []);


  const handleLogin = (email: string, password: string): User | string => {
    const user = users.find(u => u.email === email);
    if (!user) {
      return "User not found. Please register.";
    }
    if (user.password !== password) {
      return "Incorrect password.";
    }
    setCurrentUser(user);
    localStorage.setItem('buildlink_currentUser', JSON.stringify(user));
    setActivePage(user.role === 'architect' ? 'architect_portal' : 'user_portal');
    return user;
  };
  
  const handleRegister = (user: User): User | string => {
    if (users.find(u => u.email === user.email)) {
      return "An account with this email already exists.";
    }
    let newUser: User = { ...user, name: user.email.split('@')[0] };
    if (user.role === 'architect') {
        newUser.verificationStatus = 'unverified';
    }
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('buildlink_currentUser', JSON.stringify(newUser));
    setActivePage(newUser.role === 'architect' ? 'architect_portal' : 'user_portal');
    return newUser;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('buildlink_currentUser');
    setActivePage('landing');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.email === updatedUser.email ? updatedUser : u));
    setCurrentUser(updatedUser);
    localStorage.setItem('buildlink_currentUser', JSON.stringify(updatedUser));
  };

  const handleVerificationSubmit = (email: string) => {
    const updatedUser = users.find(u => u.email === email);
    if(updatedUser && updatedUser.role === 'architect') {
      handleUpdateUser({ ...updatedUser, verificationStatus: 'pending' });
    }
  };
  
  const handleSendPrivateMessage = (message: Omit<PrivateMessage, 'id' | 'timestamp'>) => {
    setConversations(prev => {
      const newConversations = [...prev];
      const participants = [message.from, message.to].sort();
      let conversation = newConversations.find(c => 
        c.participants.length === 2 && 
        c.participants.includes(participants[0]) && 
        c.participants.includes(participants[1])
      );

      const newMessage: PrivateMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: Date.now()
      };

      if (conversation) {
        conversation.messages.push(newMessage);
      } else {
        conversation = {
          id: `conv_${Date.now()}`,
          participants,
          messages: [newMessage]
        };
        newConversations.push(conversation);
      }
      return newConversations;
    });
  }

  const renderPage = () => {
    if (!currentUser) {
      switch (activePage) {
        case 'login':
          return <LoginPage onLogin={handleLogin} setActivePage={setActivePage} />;
        case 'register':
          return <RegisterPage onRegister={handleRegister} setActivePage={setActivePage} />;
        case 'landing':
        default:
          return <LandingPage setActivePage={setActivePage} />;
      }
    }

    // User is authenticated
    const userConversations = conversations.filter(c => c.participants.includes(currentUser!.email));

    switch (activePage) {
      case 'user_portal':
        return <UserPortal 
          user={currentUser!} 
          onLogout={handleLogout} 
          allUsers={users}
          onUpdateUser={handleUpdateUser}
          onSendMessage={handleSendPrivateMessage}
          conversations={userConversations}
        />;
      case 'architect_portal':
        return <ArchitectPortal 
          user={currentUser!} 
          onLogout={handleLogout} 
          onUpdateUser={handleUpdateUser}
          conversations={userConversations}
          allUsers={users}
          onSendMessage={handleSendPrivateMessage}
          onVerificationSubmit={handleVerificationSubmit}
        />;
      default:
         const portal: PageType = currentUser?.role === 'architect' ? 'architect_portal' : 'user_portal';
         setActivePage(portal);
         return null; 
    }
  };

  return (
    <div className="cyber-background text-slate-200 min-h-screen">
      {renderPage()}
    </div>
  );
};

export default App;