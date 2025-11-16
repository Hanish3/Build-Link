import React from 'react';
import { Conversation, User } from '../../types';
import { defaultPfpUrl } from '../../defaultPfp';

interface ConversationListProps {
    conversations: Conversation[];
    currentUser: User;
    users: User[];
    activeConversationId: string | null;
    setActiveConversationId: (id: string | null) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, currentUser, users, activeConversationId, setActiveConversationId }) => {
    
     const sortedConversations = [...conversations].sort((a, b) => {
        const lastMsgA = a.messages[a.messages.length - 1]?.timestamp || 0;
        const lastMsgB = b.messages[b.messages.length - 1]?.timestamp || 0;
        return lastMsgB - lastMsgA;
    });

    return (
        <aside className="w-full md:w-80 bg-brand-blue-dark/20 border-r border-brand-blue-light/50 flex flex-col flex-shrink-0">
            <div className="p-2 border-b border-brand-blue-light/50">
                <input type="text" placeholder="Search conversations..." className="w-full bg-brand-blue-dark/50 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold text-sm text-white"/>
            </div>
            <div className="flex-grow overflow-y-auto">
                {sortedConversations.length > 0 ? (
                    <ul className="space-y-1 p-2">
                        {sortedConversations.map(conv => {
                            const otherUserEmail = conv.participants.find(p => p !== currentUser.email);
                            const otherUser = users.find(u => u.email === otherUserEmail);
                            const lastMessage = conv.messages[conv.messages.length - 1];
                            const isActive = activeConversationId === conv.id;

                            if (!otherUser) return null; // Should not happen with valid data

                            return (
                                <li key={conv.id}>
                                    <button 
                                        onClick={() => setActiveConversationId(conv.id)}
                                        className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${isActive ? 'bg-brand-gold/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'hover:bg-brand-blue-light/50'}`}
                                    >
                                        <img src={otherUser.imageUrl || defaultPfpUrl} alt={otherUser.name} className="w-12 h-12 rounded-full flex-shrink-0 bg-brand-blue-light object-cover" />
                                        <div className="flex-grow overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className={`font-bold truncate ${isActive ? 'text-brand-gold' : 'text-white'}`}>{otherUser.name || otherUser.email}</p>
                                                {lastMessage && <p className="text-xs text-slate-500 flex-shrink-0">{new Date(lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>}
                                            </div>
                                            {lastMessage && <p className="text-sm text-slate-400 truncate">{lastMessage.body}</p>}
                                        </div>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p className="text-center text-slate-500 p-4">No conversations yet.</p>
                )}
            </div>
        </aside>
    );
};

export default ConversationList;
