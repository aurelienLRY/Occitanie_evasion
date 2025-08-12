// Types pour les réservations et sessions

// Types pour les participants
export interface IParticipant {
  size: string; // Taille du participant
  weight: string; // Poids du participant
  price_applicable: number; // Prix applicable au participant
  isReduced: false; // false obligatoirement, cette option n'est pas disponible pour le moment
}

// Types pour les clients
export interface ICustomer {
  date: Date; // Date à laquelle le client fait la demande de réservation
  status: "Waiting"; // Statut de la demande de réservation fixé à Waiting
  typeOfReservation: "ByWeb"; // Type de réservation fixé à by_website
  number_of_people: number; // Nombre de personnes de la réservation
  last_name: string; // Nom du client
  first_names: string; // Prénom du client
  email: string; // Email du client
  phone: string; // Numéro de téléphone du client
  people_list: IParticipant[]; // Liste des participants
  tarification: "standard"; // Tarification du client
  price_applicable: number; // Prix applicable au client en fonction de l'activité et du type de session
  price_total: number; // Prix total de la réservation en fonction du nombre de personnes et du prix applicable
}

// Types pour les sessions de réservation
export interface IReservationSession {
  status: "Pending"; // Statut de la session fixé à Pending
  date: Date; // Date de la session sélectionnée par le client
  startTime: string; // Heure de début de la session sélectionnée par le client
  endTime: string; // Heure de fin de la session calculée en fonction de l'activité et du type de session
  activity: string; // id de l'activité sélectionnée par le client
  activityName: string; // nom de l'activité sélectionnée par le client
  spot: string; // id du spot sélectionné par le client
  spotName: string; // nom du spot sélectionné par le client
  placesMax: number; // Nombre de places maximum de la session en fonction de l'activité
  placesReserved: number; // Nombre de places réservées de la session par le client
  type_formule: "half_day" | "full_day"; // Type de session sélectionné par le client
  duration?: string; // Durée de la session calculée en fonction de l'activité et du type de session
}

// Types pour les réservations complètes
export interface IBooking {
  message: string;
  customer: ICustomer;
  session: IReservationSession;
}

// Types pour les formulaires de réservation
export interface ReservationFormData {
  activityId: string;
  spotId: string;
  sessionType: 'full-day' | 'half-day';
  date: string;
  startTime: string;
  endTime?: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhone: string;
  clientEmail: string;
  participants: Array<{
    height: number;
    weight: number;
  }>;
  specialRequests?: string;
}

// Types pour les statuts de réservation
export type ReservationStatus = 'Waiting' | 'Confirmed' | 'Cancelled' | 'Completed';

// Types pour les types de réservation
export type ReservationType = 'by_website' | 'by_phone' | 'by_email' | 'in_person';

// Types pour les paramètres de réservation via URL
export interface ReservationUrlParams {
  activity?: string;
  lieux?: string;
  sessionType?: string;
}

// Types pour les valeurs possibles
export type ActivityType = string;

export type SessionType = 'full-day' | 'half-day';

export type LieuxType = string;

// Interface pour le composant ReservationLink
export interface ReservationLinkProps {
  children: React.ReactNode;
  activity?: ActivityType;
  lieux?: LieuxType;
  sessionType?: SessionType;
  className?: string;
  onClick?: () => void;
} 