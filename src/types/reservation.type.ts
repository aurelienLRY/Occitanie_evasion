/**
 * Interface for a customer session
 * @property {string} _id - The id of the customer session
 * @property {Date} createdAt - The date of creation of the customer session
 * @property {Date | null} validatedAt - The date of validation of the customer session
 * @property {Date | null} canceledAt - The date of cancellation of the customer session
 * @property {string} sessionId - The id of the session
 * @property {Date} date - The date of the session
 * @property {string} status - The status of the customer session
 * @property {string} typeOfReservation - The type of reservation of the customer session
 * @property {number} number_of_people - The number of people of the customer session
 */
export interface ICustomer {
    date: Date; // Date à la quel le client fait la demande de réservation
    status: "Waiting"; // Statut de la demande de réservation fixé à Waiting
    typeOfReservation: "by_website"; // Type de réservation fixé à by_website
    number_of_people: number; // Nombre de personne de la réservation
    last_name: string; // Nom du client
    first_names: string; // Prénom du client
    email: string; // Email du client
    phone: string; // Numéro de téléphone du client
    people_list: {
      size: string; // Taille du client
      weight: string; // Poids du client
      price_applicable: number // Prix applicable au client en fonction de l'activité et du type de session
      isReduced : false; // false obligatoirement , cette option n'est pas disponible pour le moment
    }[];
    tarification: "standard"; // Tarification du client
    price_applicable: number; // Prix applicable au client en fonction de l'activité et du type de session
    price_total: number; // Prix total de la réservation en fonction du nombre de personne et du prix applicable
  }

  export interface ISession {
    status: "Pending" ; // Statut de la session fixé à Pending
    date: Date; // Date de la session selectionnée par le client
    startTime: string; // Heure de début de la session selectionné par le client
    endTime: string; // Heure de fin de la session calculée en fonction de l'activité et du type de session
    activity: string; // id de l'activité selectionnée par le client
    spot: string; // id du spot selectionné par le client
    placesMax: number; // Nombre de places maximum de la session en fonction de l'activité 
    placesReserved: number; // Nombre de places réservées de la session par le client
    type_formule: "half_day" | "full_day"; // Type de session selectionné par le client
    duration?: string; // Durée  de la session calculée en fonction de l'activité et du type de session
  }

  export interface IBooking { 
    customer: ICustomer;
    session: ISession;
  }