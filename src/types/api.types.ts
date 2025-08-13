


// Types pour les spots/lieux
export interface ISpot {
  _id: string;
  name: string;
  description: string;
  gpsCoordinates: string;
  practicedActivities: {
    activityId: string;
    activityName: string;
    _id: string;
  }[];
  photo: string;
  meetingPoint: {
    half_day: string | null;
    full_day: string | null;
  };
  estimatedDuration: string;
  __v: number;
}

// Types pour les activités
export interface IActivity {
  _id?: string;
  name: string;
  description: string | null;
  half_day: boolean;
  full_day: boolean;
  price_half_day: {
    standard: number;
    reduced: number;
    ACM: number;
  };
  price_full_day: {
    standard: number;
    reduced: number;
    ACM: number;
  };
  min_age: number;
  max_OfPeople: number;
  min_OfPeople: number;
  duration: {
    half: string | null;
    full: string | null;
  };
  required_equipment: string | null;
  __v: number;
}

// Types pour les détails d'activité
export interface IActivityDetails extends IActivity {
  _id?: string;
}

 
// Types pour les sessions
export interface ISession {
  _id: string;
  status: "Actif"| "Pending" | "Archived";
  date: Date;
  startTime: string;
  endTime: string;
  activity: IActivity;
  spot: ISpot;
  placesMax: number;
  placesReserved: number;
  type_formule: "half_day" | "full_day";
  duration?: string;
  __v: number;
} 
