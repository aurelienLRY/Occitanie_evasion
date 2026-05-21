import API_ROUTES from '@/config/Api-Routing';
import type { IActivity } from '@/types/api.types';

function apiAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function unwrapActivities(raw: unknown): IActivity[] {
  if (!raw || typeof raw !== 'object') return [];
  const obj = raw as Record<string, unknown>;
  if (obj.data && typeof obj.data === 'object' && obj.data !== null && 'data' in (obj.data as object)) {
    const nested = (obj.data as Record<string, unknown>).data;
    return Array.isArray(nested) ? (nested as IActivity[]) : [];
  }
  if (Array.isArray(obj.data)) return obj.data as IActivity[];
  return Array.isArray(raw) ? (raw as IActivity[]) : [];
}

export async function fetchActivities(): Promise<IActivity[]> {
  const res = await fetch(API_ROUTES.ACTIVITIES, {
    method: 'GET',
    headers: apiAuthHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Activities API: HTTP ${res.status}`);
  }

  const raw: unknown = await res.json();
  return unwrapActivities(raw);
}

export function findActivityByName(
  activities: IActivity[],
  activityName: string
): IActivity | undefined {
  const needle = activityName.toLowerCase();
  return activities.find((act) => act.name.toLowerCase().includes(needle));
}
