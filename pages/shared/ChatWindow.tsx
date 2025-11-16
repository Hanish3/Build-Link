import React, { useState, useEffect, useRef } from 'react';
import { Conversation, PrivateMessage, User } from '../../types';
import { PaperAirplaneIcon } from '../../components/icons';
import { defaultPfpUrl } from '../../defaultPfp';

interface ChatWindowProps {
    conversation: Conversation | undefined;
    currentUser: User;
    otherParticipant: User;
    onSendMessage: (message: Omit<PrivateMessage, 'id' | 'timestamp'>) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser, otherParticipant, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        
        onSendMessage({
            from: currentUser.email,
            to: otherParticipant.email,
            body: newMessage,
        });
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-brand-blue-dark/20">
            <header className="p-4 border-b border-brand-blue-light/50 flex items-center gap-3 flex-shrink-0">
                <img src={otherParticipant.imageUrl || defaultPfpUrl} alt={otherParticipant.name} className="w-10 h-10 rounded-full bg-brand-blue-light object-cover" />
                <div>
                    <h2 className="font-bold text-lg text-white">{otherParticipant.name}</h2>
                    <p className="text-sm text-slate-400 capitalize">{otherParticipant.role}</p>
                </div>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto space-y-4">
                {conversation?.messages.map(msg => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.from === currentUser.email ? 'justify-end' : ''}`}>
                        {msg.from !== currentUser.email && (
                             <img src={otherParticipant.imageUrl || defaultPfpUrl} alt="p" className="w-6 h-6 rounded-full mb-1 bg-brand-blue-light object-cover" />
                        )}
                        <div className={`max-w-md p-3 rounded-lg shadow-md ${msg.from === currentUser.email ? 'bg-brand-gold text-brand-blue-dark font-semibold rounded-br-none' : 'bg-brand-blue/80 text-slate-200 rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.body}</p>
                            <p className={`text-xs mt-1 opacity-70 ${msg.from === currentUser.email ? 'text-right' : 'text-left'}`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                    </div>
                ))}
                {!conversation?.messages && (
                     <div className="text-center text-slate-500 p-8">
                        <p>This is the beginning of your conversation with {otherParticipant.name}.</p>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 border-t border-brand-blue-light/50">
                <form onSubmit={handleSend}>
                    <div className="flex items-center bg-brand-blue-dark/50 rounded-lg">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={`Message ${otherParticipant.name}...`}
                            className="w-full bg-transparent p-3 focus:outline-none text-white ring-1 ring-inset ring-transparent focus:ring-brand-gold rounded-lg"
                        />
                        <button type="submit" className="p-3 text-slate-400 hover:text-brand-gold disabled:text-slate-600 transition-colors">
                            <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    );
};

export default ChatWindow;
