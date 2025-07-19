// Types communs réutilisables dans l'application

// Types pour les réseaux sociaux
export interface SocialMedia {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'website';
  url: string;
  icon?: string;
}

// Types pour les informations de contact
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

// Types pour les horaires d'ouverture
export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

// Types pour les options de formulaire
export interface SelectOption {
  id: string;
  name: string;
  disabled?: boolean;
}

// Types pour les réponses API génériques
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

// Types pour les états de chargement
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  data: unknown | null;
}

// Types pour les coordonnées GPS
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Types pour les images
export interface ImageInfo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
} 