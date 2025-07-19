// Types pour les activités pratiquées
export interface PracticedActivity {
  activityName: string;
  activityId: string;
  _id: string;
}

// Types pour les points de rendez-vous
export interface IMeetingPoint {
  half_day: string | null;
  full_day: string | null;
}

// Types pour les informations de prix
export interface IPriceInfo {
  standard: number;
  reduced: number;
  ACM: number;
}

// Types pour les informations de durée
export interface IDurationInfo {
  half: string | null;
  full: string | null;
}

// Types pour les détails d'activité
export interface IActivityDetails {
  _id: string;
  name: string;
  description: string;
  price_half_day: IPriceInfo;
  price_full_day: IPriceInfo;
  duration: IDurationInfo;
  half_day: boolean;
  full_day: boolean;
  min_age: number;
  max_OfPeople: number;
  min_OfPeople: number;
  required_equipment: string | null;
  __v: number;
}

// Types pour les spots/lieux
export interface ISpot {
  _id: string;
  name: string;
  description: string;
  practicedActivities: PracticedActivity[];
  photo: string;
  gpsCoordinates: string;
  meetingPoint: IMeetingPoint;
  __v: number;
}

// Types pour les activités
export interface IActivity {
  _id: string;
  name: string;
  description: string;
  price_half_day: IPriceInfo;
  price_full_day: IPriceInfo;
  duration: IDurationInfo;
  half_day: boolean;
  full_day: boolean;
  min_age: number;
  max_OfPeople: number;
  min_OfPeople: number;
  required_equipment: string | null;
  __v: number;
}

// Types pour les sessions
export interface ISession {
  _id: string;
  status: string;
  date: string;
  startTime: string;
  endTime: string;
  activity: IActivityDetails;
  spot: ISpot;
  placesMax: number;
  placesReserved: number;
  type_formule: string;
  duration: string;
  __v: number;
} 