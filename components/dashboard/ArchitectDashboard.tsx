import React from 'react';
import { UserIcon, CheckBadgeIcon } from '../icons';
import { Conversation, User } from '../../types';

interface ArchitectDashboardProps {
  user: User;
  conversations: Conversation[];
  onViewConversation: (conversationId: string) => void;
  onVerifyClick: () => void;
}

const ArchitectDashboard: React.FC<ArchitectDashboardProps> = ({ user, conversations, onViewConversation, onVerifyClick }) => {
  const stats = [
    { label: 'Active Projects', value: '4' },
    { label: 'Pending Bids', value: '2' },
    { label: 'New Conversations', value: conversations.length },
    { label: 'Overall Rating', value: '4.9/5.0' },
  ];

  const recentConversations = conversations
    .filter(c => c.messages.length > 0)
    .sort((a, b) => b.messages[b.messages.length - 1].timestamp - a.messages[a.messages.length - 1].timestamp)
    .slice(0, 3);
    
  const VerificationBanner = () => {
    switch (user.verificationStatus) {
      case 'unverified':
        return (
          <div className="bg-amber-700/10 backdrop-blur-lg border border-amber-600 text-amber-300 rounded-xl p-4 mb-8 flex items-center justify-between">
            <div>
              <p className="font-bold">Your account is unverified.</p>
              <p className="text-sm">Please complete the verification process to access all features and appear in client searches.</p>
            </div>
            <button onClick={onVerifyClick} className="bg-amber-500 text-amber-950 font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors">
              Verify Now
            </button>
          </div>
        );
      case 'pending':
        return (
          <div className="bg-brand-blue-light/20 backdrop-blur-lg border border-brand-blue-light text-slate-200 rounded-xl p-4 mb-8">
            <p><span className="font-bold">Verification Pending:</span> Your documents have been submitted and are currently under review. This may take 2-3 business days.</p>
          </div>
        );
      case 'verified':
         return (
          <div className="bg-brand-gold/10 backdrop-blur-lg border border-brand-gold text-brand-gold-light rounded-xl p-4 mb-8 flex items-center gap-2">
            <CheckBadgeIcon className="w-6 h-6"/>
            <p><span className="font-bold">Your account is verified!</span> You are now listed and can be contacted by clients.</p>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <VerificationBanner />

      <h1 className="text-3xl md:text-4xl font-jura font-bold text-white mb-2">Architect Dashboard</h1>
      <p className="text-slate-400 mb-8">Your professional command center at a glance.</p>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl p-4 text-center">
            <p className="text-3xl font-bold font-jura text-brand-gold">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl p-6">
        <h2 className="text-2xl font-jura font-bold text-white mb-4">Recent Messages</h2>
        <div className="space-y-4">
          {recentConversations.length > 0 ? (
            recentConversations.map((conv) => {
              const lastMessage = conv.messages[conv.messages.length - 1];
              return (
              <div key={conv.id} onClick={() => onViewConversation(conv.id)} className="flex items-center gap-4 p-3 bg-brand-blue/30 rounded-md hover:bg-brand-blue/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-6 h-6 text-white"/>
                </div>
                <div className="flex-grow overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white truncate">{lastMessage.from}</p>
                    <p className="text-xs text-slate-500 flex-shrink-0">{new Date(lastMessage.timestamp).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm text-slate-300 truncate">{lastMessage.body}</p>
                </div>
              </div>
            )})
          ) : (
            <p className="text-slate-400 text-center py-4">You have no new messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchitectDashboard;