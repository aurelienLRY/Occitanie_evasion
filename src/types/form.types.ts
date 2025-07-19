// Types pour les formulaires de contact
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Types pour les données transformées des formulaires
export interface ActivityFormData {
  id: string;
  name: string;
  description: string;
  durationHalf: number; // durée demi-journée en heures décimales (ex: 5.5 pour 5h30)
  durationFull: number; // durée journée complète en heures décimales (ex: 8.0 pour 8h00)
  maxParticipants: number;
  minParticipants: number;
  minAge?: number;
  priceHalf: number; // prix demi-journée
  priceFull: number; // prix journée complète
  halfDayAvailable: boolean;
  fullDayAvailable: boolean;
}

export interface SpotFormData {
  id: string;
  name: string;
  description: string;
  location: string;
  activities: string[]; // IDs des activités disponibles
  photo?: string;
  practicedActivities? : {
    activityName: string;
    activityId: string;
    _id: string;
  }[];
}

// Types pour les erreurs de validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Types pour les états de formulaire
export interface FormState<T> {
  data: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
}

// Types pour les callbacks de formulaire
export interface FormCallbacks<T> {
  onSubmit?: (data: T) => void | Promise<void>;
  onError?: (errors: FormErrors) => void;
  onSuccess?: (data: T) => void;
  onReset?: () => void;
} 