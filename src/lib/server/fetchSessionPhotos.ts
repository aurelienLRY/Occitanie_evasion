import API_ROUTES from '@/config/Api-Routing';
import { parseSessionPhotosResponse } from '@/lib/parseSessionPhotosResponse';
import type { ISessionPhoto, ISessionPhotosApiSuccess } from '@/types/api.types';

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

export async function fetchSessionPhotos(
  sessionId: string,
  token: string
): Promise<ISessionPhotosApiSuccess> {
  const u = new URL(API_ROUTES.SESSION_PHOTOS);
  u.searchParams.set('sessionId', sessionId.trim());
  u.searchParams.set('token', token.trim());

  const res = await fetch(u.toString(), {
    method: 'GET',
    headers: apiAuthHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Session photos API: HTTP ${res.status}`);
  }

  const raw: unknown = await res.json();
  return parseSessionPhotosResponse(raw, sessionId.trim());
}

export async function findSessionPhoto(
  sessionId: string,
  token: string,
  photoId: string
): Promise<ISessionPhoto | null> {
  const { data } = await fetchSessionPhotos(sessionId, token);
  return data.find((p) => p._id === photoId) ?? null;
}
