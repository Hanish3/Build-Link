import React, { useState } from 'react';
import { SidebarNavItem, UserDashboardView, User, Conversation, PrivateMessage } from '../types';
import ChatInterface from '../components/ChatInterface';
import ImageEditor from '../components/ImageEditor';
import ImageGenerator from '../components/ImageGenerator';
import ArchitectCard from '../components/ArchitectCard';
import { BuildingOfficeIcon, Cog6ToothIcon, ImageIcon, SparklesIcon, Squares2X2Icon, WandSparklesIcon, ChatBubbleLeftRightIcon } from '../components/icons';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import UserDashboard from '../components/dashboard/UserDashboard';
import ArchitectProfileView from './user/ArchitectProfileView';
import UserSettings from './user/UserSettings';
import MessagingCenter from './shared/MessagingCenter';

interface UserPortalProps {
  user: User;
  onLogout: () => void;
  allUsers: User[];
  onUpdateUser: (user: User) => void;
  onSendMessage: (message: Omit<PrivateMessage, 'id' | 'timestamp'>) => void;
  conversations: Conversation[];
}

const UserPortal: React.FC<UserPortalProps> = ({ user, onLogout, allUsers, onUpdateUser, onSendMessage, conversations }) => {
  const [activeView, setActiveView] = useState<UserDashboardView>('dashboard');
  const [selectedArchitect, setSelectedArchitect] = useState<User | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const architects = allUsers.filter(u => u.role === 'architect');

  const handleViewProfile = (architect: User) => {
    setSelectedArchitect(architect);
    setActiveView('architect_profile');
  };

  const handleStartConversation = (architect: User) => {
    const participants = [user.email, architect.email].sort();
    let conversation = conversations.find(c => 
        c.participants.length === 2 && 
        c.participants.includes(participants[0]) && 
        c.participants.includes(participants[1])
    );
    
    if (conversation) {
        setActiveConversationId(conversation.id);
    } else {
        // Create a temporary ID for a new conversation that doesn't exist yet
        const tempNewConvId = `new_${architect.email}`;
        setActiveConversationId(tempNewConvId);
    }
    setActiveView('messages');
  };

  const navItems: SidebarNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Squares2X2Icon className="w-6 h-6" /> },
    { id: 'messages', label: 'Messages', icon: <ChatBubbleLeftRightIcon className="w-6 h-6" /> },
    { id: 'chat', label: 'Archigen AI', icon: <SparklesIcon className="w-6 h-6" /> },
    { id: 'editor', label: 'AI Image Editor', icon: <WandSparklesIcon className="w-6 h-6" /> },
    { id: 'generator', label: 'AI Image Generator', icon: <ImageIcon className="w-6 h-6" /> },
    { id: 'architects', label: 'Find Architects', icon: <BuildingOfficeIcon className="w-6 h-6" /> },
    { id: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="w-6 h-6" /> },
  ];

  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return <UserDashboard user={user} setActiveView={setActiveView} />;
      case 'messages':
        return <MessagingCenter 
            conversations={conversations}
            currentUser={user}
            users={allUsers}
            onSendMessage={onSendMessage}
            initialActiveConversationId={activeConversationId}
            />;
      case 'chat':
        return <div className="h-full"><ChatInterface /></div>;
      case 'editor':
        return <ImageEditor />;
      case 'generator':
        return <ImageGenerator />;
      case 'architects':
        return (
           <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl p-6 h-full flex flex-col">
             <div className="flex items-center gap-2 mb-6">
                <BuildingOfficeIcon className="w-8 h-8 text-brand-gold" />
                <h3 className="text-2xl font-jura text-white">Find a Licensed Architect</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto flex-grow pr-2">
                {architects.map(arch => <ArchitectCard key={arch.email} architect={arch} onViewProfile={handleViewProfile} />)}
            </div>
           </div>
        );
      case 'architect_profile':
        if (selectedArchitect) {
          return <ArchitectProfileView user={user} architect={selectedArchitect} onBack={() => setActiveView('architects')} onStartConversation={handleStartConversation} />;
        }
        return null;
       case 'settings':
        return <UserSettings user={user} onUpdateUser={onUpdateUser} />;
      default:
        return <UserDashboard user={user} setActiveView={setActiveView} />;
    }
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={onLogout}
      sidebarNavItems={navItems}
      activeView={activeView}
      setActiveView={setActiveView}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default UserPortal;