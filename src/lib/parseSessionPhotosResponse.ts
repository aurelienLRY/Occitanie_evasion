import type { ISessionPhoto, ISessionPhotosApiSuccess } from '@/types/api.types';

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

/**
 * De-enveloppe si la passerelle renvoie { data: { success, data, meta } } ou { body: { ... } }.
 */
function unwrapEnvelope(raw: unknown): unknown {
  if (!isRecord(raw)) return raw;

  if (isRecord(raw.body) && 'success' in raw.body) {
    return raw.body;
  }

  const nested = raw.data;
  if (
    isRecord(nested) &&
    !Array.isArray(nested) &&
    nested.success !== undefined
  ) {
    return nested;
  }

  return raw;
}

function normalizePhoto(item: unknown, index: number): ISessionPhoto {
  if (!isRecord(item)) {
    return {
      _id: String(index),
      fileUrl: '',
      fileName: '',
      uploadedAt: '',
    };
  }

  return {
    _id: String(item._id ?? item.id ?? index),
    fileUrl: String(item.fileUrl ?? item.file_url ?? ''),
    fileName: String(item.fileName ?? item.file_name ?? ''),
    uploadedAt:
      typeof item.uploadedAt === 'string'
        ? item.uploadedAt
        : String(item.uploadedAt ?? ''),
  };
}

/**
 * JSON Easylis session-photos : success true, data tableau, meta { sessionId, count }.
 */
export function parseSessionPhotosResponse(
  raw: unknown,
  fallbackSessionId: string
): ISessionPhotosApiSuccess {
  const envelope = unwrapEnvelope(raw);

  if (!isRecord(envelope)) {
    throw new Error('Reponse du service photos invalide.');
  }

  const success =
    envelope.success === true ||
    envelope.success === 'true' ||
    envelope.success === 1;

  if (!success) {
    const err =
      typeof envelope.error === 'string'
        ? envelope.error
        : 'Les photos ne sont pas disponibles pour le moment.';
    throw new Error(err);
  }

  const rawList = envelope.data;
  const list = Array.isArray(rawList) ? rawList : [];

  const data: ISessionPhoto[] = list.map((item, i) => normalizePhoto(item, i));

  const metaRaw = envelope.meta;
  const countFromMeta =
    isRecord(metaRaw) && metaRaw.count !== undefined
      ? Number(metaRaw.count)
      : NaN;
  const meta =
    isRecord(metaRaw) && Number.isFinite(countFromMeta)
      ? {
          sessionId: String(metaRaw.sessionId ?? fallbackSessionId),
          count: countFromMeta,
        }
      : {
          sessionId: fallbackSessionId,
          count: data.length,
        };

  return { success: true, data, meta };
}
