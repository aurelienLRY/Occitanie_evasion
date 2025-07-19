import { IActivity, ISpot, ActivityFormData, SpotFormData } from '@/types';

/**
 * Parse une durée au format string (ex: "5h", "5h30", "5h00") en heures décimales
 * @param durationString - La durée au format string
 * @returns Le nombre d'heures en décimal (ex: 5.5 pour "5h30")
 */
export const parseDurationString = (durationString: string): number => {
  if (!durationString) return 0;
  
  // Nettoyer la chaîne et convertir en minuscules
  const cleanString = durationString.toLowerCase().trim();
  
  // Pattern pour matcher "5h", "5h30", "5h00", etc.
  const pattern = /^(\d+)(?:h(\d{2})?)?$/;
  const match = cleanString.match(pattern);
  
  if (!match) {
    console.warn(`Format de durée non reconnu: ${durationString}`);
    return 0;
  }
  
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  
  // Convertir en heures décimales
  return hours + (minutes / 60);
};

/**
 * Formate une durée en heures décimales vers un format lisible (ex: 5.5 -> "5h30")
 * @param durationHours - La durée en heures décimales
 * @returns La durée formatée en string
 */
export const formatDurationString = (durationHours: number): string => {
  if (durationHours <= 0) return '0h';
  
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - hours) * 60);
  
  if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }
};

// Transformer une activité de l'API vers le format du formulaire
export const transformActivityToFormData = (activity: IActivity): ActivityFormData => {
  // Calculer les durées en heures décimales
  const durationHalfString = activity.duration.half || '0';
  const durationFullString = activity.duration.full || '0';
  const durationHalf = parseDurationString(durationHalfString);
  const durationFull = parseDurationString(durationFullString);
  
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
    minAge: activity.min_age,
  };
};

// Transformer un spot de l'API vers le format du formulaire
export const transformSpotToFormData = (spot: ISpot): SpotFormData => {
  return {
    id: spot._id,
    name: spot.name,
    description: spot.description,
    location: spot.gpsCoordinates, // Utiliser les coordonnées GPS comme localisation
    activities: spot.practicedActivities.map(pa => pa.activityId ),
    practicedActivities: spot.practicedActivities,
    photo: spot.photo,
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