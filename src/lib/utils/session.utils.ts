import { ISession } from "@/types";

/**
 * Vérifie si la session est dans les 3 prochains jours
 * @param session - La session à vérifier
 * @returns true si la session est dans les 3 prochains jours, false sinon
 */
export const isReduced = (session: ISession) => {
    const now = new Date();
    const sessionDate = new Date(session.date);
    const diffInMs = sessionDate.getTime() - now.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays >= 0 && diffInDays <= 3;
  };
  