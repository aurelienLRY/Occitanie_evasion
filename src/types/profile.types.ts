import { SocialMedia, ContactInfo, BusinessHours, ImageInfo } from './common.types';

// Types pour les cartes de profil
export interface ProfileCardProps {
  // Informations de base
  name: string;
  title?: string;
  description?: string;
  
  // Photo/Logo
  image?: ImageInfo;
  
  // Informations de contact
  contact: ContactInfo;
  
  // Réseaux sociaux
  socialMedia?: SocialMedia[];
  
  // Horaires d'ouverture
  businessHours?: BusinessHours[];
  
  // Options d'affichage
  showContact?: boolean;
  showSocialMedia?: boolean;
  showBusinessHours?: boolean;
  
  // Styles
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

// Types pour les profils utilisateur
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: ImageInfo;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: 'fr' | 'en';
  };
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les profils d'entreprise
export interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  logo?: ImageInfo;
  contact: ContactInfo;
  socialMedia?: SocialMedia[];
  businessHours?: BusinessHours[];
  website?: string;
  category: string;
  tags: string[];
  rating?: number;
  reviewCount?: number;
} 