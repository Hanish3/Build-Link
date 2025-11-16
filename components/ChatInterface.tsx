import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { PaperAirplaneIcon, SparklesIcon, UserIcon } from './icons';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I'm Archigen AI. How can I help you with your architectural vision today? Feel free to ask about design ideas, materials, or even generate images." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(input, 'gemini-flash-lite-latest');
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-blue-dark/50 backdrop-blur-lg border border-brand-blue-light rounded-xl shadow-2xl flex flex-col h-full">
      <div className="p-4 border-b border-brand-blue-light/50 flex items-center gap-2">
        <SparklesIcon className="w-6 h-6 text-brand-gold" />
        <h3 className="text-xl font-jura text-white">Archigen AI Assistant</h3>
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold-light to-brand-gold flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-brand-blue-dark" />
              </div>
            )}
            <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-gold text-brand-blue-dark font-semibold rounded-br-none' : 'bg-brand-blue/80 text-slate-200 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold-light to-brand-gold flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-5 h-5 text-brand-blue-dark" />
              </div>
            <div className="max-w-md p-3 rounded-lg bg-brand-blue/80 text-slate-200 rounded-bl-none">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-brand-blue-light/50">
        <div className="flex items-center bg-brand-blue-dark/50 rounded-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Archigen AI..."
            className="w-full bg-transparent p-3 focus:outline-none text-white ring-1 ring-inset ring-transparent focus:ring-brand-gold rounded-lg"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="p-3 text-slate-400 hover:text-brand-gold disabled:text-slate-600 transition-colors">
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;