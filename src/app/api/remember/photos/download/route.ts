import { NextRequest, NextResponse } from 'next/server';
import { findSessionPhoto } from '@/lib/server/fetchSessionPhotos';

export const dynamic = 'force-dynamic';

function safeFilename(name: string, fallback: string): string {
  const base = (name?.trim() || fallback).replace(/[/\\?*:"<>|]/g, '_').slice(0, 180);
  return base || fallback;
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId')?.trim() ?? '';
  const token = request.nextUrl.searchParams.get('token')?.trim() ?? '';
  const photoId = request.nextUrl.searchParams.get('photoId')?.trim() ?? '';

  if (!sessionId || !token || !photoId) {
    return NextResponse.json({ error: 'Parametres manquants.' }, { status: 400 });
  }

  try {
    const photo = await findSessionPhoto(sessionId, token, photoId);
    if (!photo?.fileUrl) {
      return NextResponse.json({ error: 'Photo introuvable.' }, { status: 404 });
    }

    const upstream = await fetch(photo.fileUrl, { cache: 'no-store' });
    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'Impossible de recuperer le fichier image.' },
        { status: 502 }
      );
    }

    const blob = await upstream.blob();
    const contentType =
      blob.type || upstream.headers.get('content-type') || 'application/octet-stream';
    const filename = safeFilename(photo.fileName, `photo-${photo._id}`);

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (e) {
    console.error('[remember/photos/download]', e);
    return NextResponse.json(
      { error: 'Erreur lors du telechargement.' },
      { status: 500 }
    );
  }
}
