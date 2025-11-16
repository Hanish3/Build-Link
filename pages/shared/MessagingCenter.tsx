import React, { useState, useEffect } from 'react';
import { Conversation, PrivateMessage, User } from '../../types';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import { ChatBubbleLeftRightIcon } from '../../components/icons';

interface MessagingCenterProps {
    conversations: Conversation[];
    currentUser: User;
    users: User[];
    onSendMessage: (message: Omit<PrivateMessage, 'id' | 'timestamp'>) => void;
    initialActiveConversationId?: string | null;
}

const MessagingCenter: React.FC<MessagingCenterProps> = ({ conversations, currentUser, users, onSendMessage, initialActiveConversationId }) => {
    const [activeConversationId, setActiveConversationId] = useState<string | null>(initialActiveConversationId || null);

    useEffect(() => {
        if (initialActiveConversationId) {
            setActiveConversationId(initialActiveConversationId);
        } else if (conversations.length > 0) {
            // Default to the most recent conversation
            const sortedConversations = [...conversations].sort((a, b) => {
                const lastMsgA = a.messages[a.messages.length - 1]?.timestamp || 0;
                const lastMsgB = b.messages[b.messages.length - 1]?.timestamp || 0;
                return lastMsgB - lastMsgA;
            });
            setActiveConversationId(sortedConversations[0].id);
        }
    }, [conversations, initialActiveConversationId]);
    
    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const getOtherParticipantEmail = () => {
        if (activeConversationId?.startsWith('new_')) {
            return activeConversationId.substring(4);
        }
        if (activeConversation) {
            return activeConversation.participants.find(p => p !== currentUser.email) || null;
        }
        return null;
    }

    const otherParticipantEmail = getOtherParticipantEmail();
    const otherParticipant = users.find(u => u.email === otherParticipantEmail);
    
    return (
         <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl h-full flex flex-col overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-brand-blue-light/50 flex-shrink-0">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-brand-gold" />
                <h1 className="text-3xl font-jura font-bold text-white">Messages</h1>
            </div>
            <div className="flex flex-grow overflow-hidden">
                <ConversationList
                    conversations={conversations}
                    currentUser={currentUser}
                    users={users}
                    activeConversationId={activeConversationId}
                    setActiveConversationId={setActiveConversationId}
                />
                <div className="flex-grow flex flex-col">
                    {otherParticipant ? (
                        <ChatWindow
                            key={activeConversationId} // Force re-mount on conversation change
                            conversation={activeConversation}
                            currentUser={currentUser}
                            otherParticipant={otherParticipant}
                            onSendMessage={onSendMessage}
                        />
                    ) : (
                        <div className="flex-grow flex items-center justify-center text-center text-slate-400">
                            <div>
                                <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto mb-4"/>
                                <p>Select a conversation to start messaging.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagingCenter;