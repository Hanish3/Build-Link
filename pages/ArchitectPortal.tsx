
import React, { useState } from 'react';
import { SidebarNavItem, ArchitectDashboardView, User, Conversation, PrivateMessage } from '../types';
import { BriefcaseIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, DocumentTextIcon, Squares2X2Icon, UserIcon, IdCardIcon } from '../components/icons';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ArchitectDashboard from '../components/dashboard/ArchitectDashboard';
import ArchitectProfile from '../components/dashboard/ArchitectProfile';
import ProjectListings from '../components/dashboard/ProjectListings';
import ActiveProjects from '../components/dashboard/ActiveProjects';
import ArchitectSettings from './architect/ArchitectSettings';
import MessagingCenter from './shared/MessagingCenter';
import ArchitectVerification from './architect/ArchitectVerification';

interface ArchitectPortalProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  conversations: Conversation[];
  allUsers: User[];
  onSendMessage: (message: Omit<PrivateMessage, 'id' | 'timestamp'>) => void;
  onVerificationSubmit: (email: string) => void;
}

const ArchitectPortal: React.FC<ArchitectPortalProps> = ({ user, onLogout, onUpdateUser, conversations, allUsers, onSendMessage, onVerificationSubmit }) => {
  const [activeView, setActiveView] = useState<ArchitectDashboardView>('dashboard');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const handleViewConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setActiveView('messages');
  }

  const navItems: SidebarNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Squares2X2Icon className="w-6 h-6" /> },
    { id: 'messages', label: 'Messages', icon: <ChatBubbleLeftRightIcon className="w-6 h-6" /> },
    { id: 'profile', label: 'My Profile', icon: <UserIcon className="w-6 h-6" /> },
    { id: 'verification', label: 'Verification', icon: <IdCardIcon className="w-6 h-6" /> },
    { id: 'listings', label: 'Project Listings', icon: <DocumentTextIcon className="w-6 h-6" /> },
    { id: 'projects', label: 'Active Projects', icon: <BriefcaseIcon className="w-6 h-6" /> },
    { id: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="w-6 h-6" /> },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <ArchitectDashboard user={user} conversations={conversations} onViewConversation={handleViewConversation} onVerifyClick={() => setActiveView('verification')} />;
      case 'messages':
        return <MessagingCenter
          conversations={conversations}
          currentUser={user}
          users={allUsers}
          onSendMessage={onSendMessage}
          initialActiveConversationId={activeConversationId}
        />;
      case 'profile':
        return <ArchitectProfile user={user} onUpdateUser={onUpdateUser} />;
      case 'verification':
        return <ArchitectVerification user={user} onSubmit={() => onVerificationSubmit(user.email)} />;
      case 'listings':
        return <ProjectListings />;
      case 'projects':
        return <ActiveProjects />;
      case 'settings':
        return <ArchitectSettings user={user} onUpdateUser={onUpdateUser} />;
      default:
        return <ArchitectDashboard user={user} conversations={conversations} onViewConversation={handleViewConversation} onVerifyClick={() => setActiveView('verification')} />;
    }
  };

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

export default ArchitectPortal;