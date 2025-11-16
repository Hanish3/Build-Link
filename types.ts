
import React, { Dispatch, SetStateAction } from 'react';

export type PageType = 'landing' | 'login' | 'register' | 'user_portal' | 'architect_portal';
export type UserRole = 'user' | 'architect';

export type UserDashboardView = 'dashboard' | 'chat' | 'editor' | 'generator' | 'architects' | 'settings' | 'architect_profile' | 'messages';
export type ArchitectDashboardView = 'dashboard' | 'profile' | 'listings' | 'projects' | 'messages' | 'settings' | 'verification';


export interface User {
  email: string;
  role: UserRole;
  password?: string;
  name?: string;
  // Architect specific fields
  specialty?: string;
  bio?: string;
  rating?: number;
  imageUrl?: string;
  verificationStatus?: 'unverified' | 'pending' | 'verified';
}

export interface PrivateMessage {
  id: string;
  from: string; // user email
  to: string; // recipient email
  body: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  participants: string[]; // array of user emails
  messages: PrivateMessage[];
}

export interface PageProps {
  setActivePage: Dispatch<SetStateAction<PageType>>;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface SidebarNavItem {
  id: UserDashboardView | ArchitectDashboardView;
  label: string;
  icon: React.ReactNode;
}