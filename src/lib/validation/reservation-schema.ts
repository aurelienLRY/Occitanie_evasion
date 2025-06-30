import * as yup from 'yup';

// Schéma pour un participant (sans nom/prénom)
const participantSchema = yup.object({
  height: yup.number()
    .required('La taille est requise')
    .min(100, 'La taille doit être d\'au moins 100 cm')
    .max(250, 'La taille ne peut pas dépasser 250 cm'),
  weight: yup.number()
    .required('Le poids est requis')
    .min(20, 'Le poids doit être d\'au moins 20 kg')
    .max(200, 'Le poids ne peut pas dépasser 200 kg'),
});

// Schéma principal pour la réservation
export const reservationSchema = yup.object({
  // Sélection de l'activité et du lieu
  activityId: yup.string().required('Veuillez sélectionner une activité'),
  spotId: yup.string().required('Veuillez sélectionner un lieu'),
  
  // Type de session
  sessionType: yup.string()
    .oneOf(['full-day', 'half-day'], 'Type de session invalide')
    .required('Veuillez sélectionner un type de session'),
  
  // Date et horaires
  date: yup.string().required('Veuillez sélectionner une date'),
  startTime: yup.string().required('Veuillez sélectionner une heure de départ'),
  endTime: yup.string().nullable().optional(),
  
  // Informations du client principal
  clientFirstName: yup.string()
    .required('Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères'),
  clientLastName: yup.string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  clientPhone: yup.string()
    .required('Le téléphone est requis')
    .matches(/^(\+33|0)[1-9](\d{8})$/, 'Format de téléphone invalide'),
  clientEmail: yup.string()
    .required('L\'email est requis')
    .email('Format d\'email invalide'),
  
  // Participants
  participants: yup.array()
    .of(participantSchema)
    .min(1, 'Au moins un participant est requis')
    .max(10, 'Maximum 10 participants')
    .required('Les participants sont requis'),
  
  // Informations supplémentaires
  specialRequests: yup.string().nullable().optional(),
});

export type ReservationFormData = yup.InferType<typeof reservationSchema>; 