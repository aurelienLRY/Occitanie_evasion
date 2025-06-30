export interface SocialMedia {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'website';
  url: string;
  icon?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country?: string;
  };
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface ProfileCardProps {
  // Informations de base
  name: string;
  title?: string;
  description?: string;
  
  // Photo/Logo
  image?: {
    src: string;
    alt: string;
  };
  
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