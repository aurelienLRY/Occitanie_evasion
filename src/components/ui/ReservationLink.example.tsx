// Exemple d'utilisation du composant ReservationLink
// Ce fichier montre comment utiliser le composant dans différentes situations

import { ReservationLink } from '@/components/ui';

// Exemple 1 : Lien simple vers la réservation
export const SimpleReservationExample = () => (
  <ReservationLink className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
    Réserver une activité
  </ReservationLink>
);

// Exemple 2 : Lien avec activité spécifique
export const ActivityReservationExample = () => (
  <ReservationLink 
    activity="escalade"
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
  >
    Réserver de l'escalade
  </ReservationLink>
);

// Exemple 3 : Lien avec activité et lieu
export const ActivityAndLocationExample = () => (
  <ReservationLink 
    activity="canyoning"
    lieux="toulouse"
    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
  >
    Réserver du canyoning à Toulouse
  </ReservationLink>
);

// Exemple 4 : Lien complet avec tous les paramètres
export const CompleteReservationExample = () => (
  <ReservationLink 
    activity="speleologie"
    lieux="pyrenees"
    sessionType="demi-journee"
    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
  >
    Réserver de la spéléologie dans les Pyrénées (demi-journée)
  </ReservationLink>
);

// Exemple 5 : Utilisation dans une carte d'activité
export const ActivityCardExample = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-bold mb-2">Escalade à Toulouse</h3>
    <p className="text-gray-600 mb-4">Découvrez l'escalade en milieu naturel</p>
    <div className="flex gap-2">
      <ReservationLink 
        activity="escalade"
        lieux="toulouse"
        sessionType="demi-journee"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors text-sm"
      >
        Demi-journée
      </ReservationLink>
      <ReservationLink 
        activity="escalade"
        lieux="toulouse"
        sessionType="journee-complete"
        className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors text-sm"
      >
        Journée complète
      </ReservationLink>
    </div>
  </div>
);
