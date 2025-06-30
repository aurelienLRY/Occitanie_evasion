import { IActivity, ISpot } from '@/types';

// Interface pour les données transformées utilisées dans le formulaire
export interface ActivityFormData {
  id: string;
  name: string;
  description: string;
  durationHalf: number; // durée demi-journée en heures
  durationFull: number; // durée journée complète en heures
  maxParticipants: number;
  minParticipants: number;
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
  difficulty: 'easy' | 'medium' | 'hard';
  activities: string[]; // IDs des activités disponibles
}

// Transformer une activité de l'API vers le format du formulaire
export const transformActivityToFormData = (activity: IActivity): ActivityFormData => {
  // Calculer les durées en heures
  const durationHalfString = activity.duration.half || '0';
  const durationFullString = activity.duration.full || '0';
  const durationHalf = parseFloat(durationHalfString.replace('h', '')) || 0;
  const durationFull = parseFloat(durationFullString.replace('h', '')) || 0;
  
  // Calculer les prix (prix standard)
  const priceHalf = activity.price_half_day?.standard || 0;
  const priceFull = activity.price_full_day?.standard || 0;
  
  return {
    id: activity._id,
    name: activity.name,
    description: activity.description,
    durationHalf,
    durationFull,
    maxParticipants: activity.max_OfPeople,
    minParticipants: activity.min_OfPeople,
    priceHalf,
    priceFull,
    halfDayAvailable: activity.half_day || false,
    fullDayAvailable: activity.full_day || false,
  };
};

// Transformer un spot de l'API vers le format du formulaire
export const transformSpotToFormData = (spot: ISpot): SpotFormData => {
  return {
    id: spot._id,
    name: spot.name,
    description: spot.description,
    location: spot.gpsCoordinates, // Utiliser les coordonnées GPS comme localisation
    difficulty: 'medium', // Par défaut, à adapter selon vos besoins
    activities: spot.practicedActivities.map(pa => pa.activityId),
  };
};

// Calculer l'heure de fin basée sur l'heure de début et la durée
export const calculateEndTime = (startTime: string, durationHalf: number, durationFull: number, sessionType: 'full-day' | 'half-day'): string => {
  const startDate = new Date(`2000-01-01T${startTime}`);
  const actualDuration = sessionType === 'half-day' ? durationHalf : durationFull;
  const endDate = new Date(startDate.getTime() + actualDuration * 60 * 60 * 1000);
  return endDate.toTimeString().slice(0, 5);
};

// Formater un numéro de téléphone français
export const formatPhoneNumber = (phone: string): string => {
  // Supprimer tous les caractères non numériques
  const cleaned = phone.replace(/\D/g, '');
  
  // Si c'est un numéro français (commence par 33 ou 0)
  if (cleaned.startsWith('33')) {
    return `+33 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
  } else if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)}`;
  }
  
  return phone;
}; 