const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/services/external';

const API_ROUTES = {
    ACTIVITIES: `${API_BASE_URL}/activities`,
    SPOTS: `${API_BASE_URL}/spots`,
    ACTIVE_SESSIONS: `${API_BASE_URL}/sessions`,
    BOOKING: `${API_BASE_URL}/booking`,
} as const;

export type ApiRoute = typeof API_ROUTES[keyof typeof API_ROUTES];

export default API_ROUTES;


