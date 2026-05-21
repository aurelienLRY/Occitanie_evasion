"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import JSZip from "jszip";
import { Check, Download, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import CustomSection from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { useSessionPhotos } from "@/hooks/useQuery";
import type { ISessionPhoto } from "@/types/api.types";

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CTH5G0zEDlSyEBM/review" as const;

type RememberPhotosClientProps = {
  sessionId: string;
  token: string;
};

function guessExtension(blob: Blob, url: string): string {
  const t = blob.type.toLowerCase();
  if (t.includes("png")) return "png";
  if (t.includes("jpeg") || t.includes("jpg")) return "jpg";
  if (t.includes("webp")) return "webp";
  if (t.includes("gif")) return "gif";
  const m = url.match(/\.([a-z0-9]{2,4})(?:\?|$)/i);
  return m ? m[1].toLowerCase() : "jpg";
}

function sanitizeBaseName(name: string, fallback: string): string {
  const base = (name?.trim() || fallback).replace(/[/\\?*:"<>|]/g, "_").slice(0, 160);
  return base || fallback;
}

function filenameForPhoto(photo: ISessionPhoto, blob: Blob): string {
  const fallback = `photo-${photo._id}`;
  let base = sanitizeBaseName(photo.fileName, fallback);
  if (!/\.\w{2,5}$/i.test(base)) {
    base += `.${guessExtension(blob, photo.fileUrl)}`;
  }
  return base.slice(0, 180);
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function rememberPhotoDownloadUrl(
  sessionId: string,
  token: string,
  photoId: string
): string {
  const u = new URL("/api/remember/photos/download", window.location.origin);
  u.searchParams.set("sessionId", sessionId);
  u.searchParams.set("token", token);
  u.searchParams.set("photoId", photoId);
  return u.toString();
}

async function fetchPhotoBlob(
  sessionId: string,
  token: string,
  photoId: string
): Promise<Blob> {
  const res = await fetch(rememberPhotoDownloadUrl(sessionId, token, photoId));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.blob();
}

function uniqueZipNames(photos: ISessionPhoto[], blobs: Blob[]): string[] {
  const used = new Map<string, number>();
  return photos.map((p, i) => {
    let name = filenameForPhoto(p, blobs[i]);
    const lower = name.toLowerCase();
    const n = used.get(lower) ?? 0;
    used.set(lower, n + 1);
    if (n > 0) {
      const dot = name.lastIndexOf(".");
      if (dot > 0) {
        name = `${name.slice(0, dot)}-${n}${name.slice(dot)}`;
      } else {
        name = `${name}-${n}`;
      }
    }
    return name;
  });
}

const RememberPhotosClient = ({ sessionId, token }: RememberPhotosClientProps) => {
  const { data, isPending, isError, error } = useSessionPhotos(sessionId, token);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [downloading, setDownloading] = useState(false);
  const downloadBusyRef = useRef(false);

  const photos = useMemo(() => data?.data ?? [], [data]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected(new Set(photos.map((p) => p._id)));
  }, [photos]);

  const clearSelection = useCallback(() => {
    setSelected(new Set());
  }, []);

  const selectedPhotos = useMemo(
    () => photos.filter((p) => selected.has(p._id)),
    [photos, selected]
  );

  const handleDownload = useCallback(async () => {
    if (selectedPhotos.length === 0 || downloadBusyRef.current) return;
    downloadBusyRef.current = true;
    setDownloading(true);
    try {
      if (selectedPhotos.length === 1) {
        const p = selectedPhotos[0];
        const blob = await fetchPhotoBlob(sessionId, token, p._id);
        triggerBlobDownload(blob, filenameForPhoto(p, blob));
        toast.success("Photo téléchargée.");
      } else {
        const results = await Promise.all(
          selectedPhotos.map(async (p) => {
            const blob = await fetchPhotoBlob(sessionId, token, p._id);
            return { photo: p, blob };
          })
        );
        const zip = new JSZip();
        const names = uniqueZipNames(
          results.map((r) => r.photo),
          results.map((r) => r.blob)
        );
        results.forEach((r, i) => {
          zip.file(names[i], r.blob);
        });
        const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
        triggerBlobDownload(zipBlob, `photos-occitanie-evasion-${Date.now()}.zip`);
        toast.success(`${selectedPhotos.length} photos dans le fichier ZIP.`);
      }
    } catch (e) {
      console.error(e);
      toast.error(
        "Téléchargement impossible (réseau ou sécurité du navigateur). Essayez d'ouvrir chaque photo dans un nouvel onglet."
      );
    } finally {
      downloadBusyRef.current = false;
      setDownloading(false);
    }
  }, [selectedPhotos, sessionId, token]);

  if (isPending) {
    return (
      <CustomSection className="min-h-[50vh] w-full mx-auto max-w-2xl mt-20 px-2 pb-24 flex items-center justify-center">
        <p className="font-paragraphe text-lg opacity-80 flex items-center gap-2">
          <Loader2 className="size-5 animate-spin" />
          Chargement des photos en cours...
        </p>
      </CustomSection>
    );
  }

  if (isError) {
    return (
      <CustomSection className="min-h-[70vh] w-full mx-auto max-w-4xl mt-24 px-4 py-12">
        <h1 className="!text-3xl md:!text-5xl font-bold mb-4 text-center">
          Photos indisponibles pour le moment
        </h1>
        <p className="font-paragraphe text-center text-lg opacity-85 max-w-xl mx-auto">
          {error instanceof Error
            ? error.message
            : "Une erreur est survenue. Veuillez réessayer plus tard."}
        </p>
      </CustomSection>
    );
  }

  if (!data) {
    return null;
  }

  const { meta } = data;

  return (
    <div className="min-h-[70vh] w-full flex justify-center items-center">
      <CustomSection className="w-full max-w-lg md:max-w-2xl mx-auto mt-16 md:mt-20 px-1 md:px-2">
        <header className="text-center mb-4 md:mb-6 px-2">
          <h1 className="!text-4xl md:!text-6xl font-bold">
            Vos souvenirs en <span className="text-secondary">photos</span>
          </h1>
          {meta.count > 0 && (
            <p className="font-paragraphe text-sm opacity-70 mt-4">
              {meta.count} photo{meta.count > 1 ? "s" : ""}
              {" touchez pour sélectionner, puis télécharger"}
            </p>
          )}
        </header>

        <div
          className="  max-w-4xl mx-auto mb-6 md:mb-8 space-y-3 leading-relaxed text-left rounded-xl p-4"
          role="region"
          aria-label="Message de remerciement et informations"
        >
          <p>
            {
              "Un grand merci d'avoir partagé ce moment avec moi et j'espère que ces images vous replongeront avec le sourire dans l'aventure."
            }
          </p>
          <p>
            {"Si vous en avez envie, un petit "}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-medium underline underline-offset-2 hover:opacity-90"
            >
              avis sur Google
            </a>
            {
              " m'aide vraiment pour le référencement, et surtout à permettre aux autres personnes de mieux savoir à quoi s'attendre : c'est de la transparence pour tout le monde, et je vous en serait très reconnaissant."
            }
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 text-xs md:text-sm">
            <strong className="text-neutral-700 dark:text-neutral-300">A savoir :</strong>
            {
              " ces photos restent accessibles sur cette page pendant environ trois mois (politique de conservation). Pensez à les télécharger avant qu'elles ne disparaissent."
            }
          </p>
        </div>
        {photos.length === 0 ? (
          <p className="font-paragraphe text-center text-neutral-600 max-w-md mx-auto px-4">Aucune photo pour le moment. Revenez plus tard ou réutilisez le lien reçu par e-mail.</p>
        ) : (
          <div
            className="grid grid-cols-3 gap-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-sm overflow-hidden border border-neutral-200 dark:border-neutral-800"
            role="list"
          >
            {photos.map((photo) => {
              const isSel = selected.has(photo._id);
              return (
                <div
                  key={photo._id}
                  className="relative aspect-square bg-neutral-100"
                  role="listitem"
                >
                  <button
                    type="button"
                    onClick={() => toggle(photo._id)}
                    aria-pressed={isSel}
                    className={cn(
                      "absolute inset-0 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ring-offset-background",
                      isSel && "ring-2 ring-inset ring-white"
                    )}
                    aria-label={isSel ? "Désélectionner la photo" : "Sélectionner la photo"}
                  />
                  <Image
                    src={photo.fileUrl}
                    alt={photo.fileName}
                    fill
                    sizes="(max-width: 768px) 33vw, 240px"
                    className="object-cover pointer-events-none select-none"
                    unoptimized
                  />
                  {isSel && (
                    <div
                      className="absolute inset-0 z-[5] bg-black/20 pointer-events-none"
                      aria-hidden
                    />
                  )}
                  {isSel && (
                    <div className="absolute top-1.5 right-1.5 z-[6] size-6 rounded-full bg-secondary flex items-center justify-center pointer-events-none shadow-md">
                      <Check className="size-3.5 text-white stroke-[3]" aria-hidden />
                    </div>
                  )}
                  <a
                    href={photo.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-1.5 right-1.5 z-20 size-8 rounded-full bg-black/55 text-white flex items-center justify-center hover:bg-black/75 transition-colors"
                    aria-label="Ouvrir la photo en grand"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </CustomSection>

      {photos.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 dark:border-neutral-800 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 px-3 py-[max(12px,env(safe-area-inset-bottom))] pt-3">
          <div className="mx-auto max-w-lg md:max-w-2xl flex flex-wrap items-center justify-between gap-2">
            <div className="font-paragraphe text-sm min-w-0">
              <span className="font-semibold text-primary">{selected.size}</span>
              <span className="opacity-80"> sélectionnée(s)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-end">
              <button
                type="button"
                onClick={selectAll}
                disabled={downloading || photos.length === 0}
                className="text-xs md:text-sm px-2.5 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50"
              >
                Tout sélectionner
              </button>
              <button
                type="button"
                onClick={clearSelection}
                disabled={downloading || selected.size === 0}
                className="text-xs md:text-sm px-2.5 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50"
              >
                Effacer
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading || selected.size === 0}
                className="inline-flex items-center gap-2 rounded-md bg-secondary text-white px-3 py-2 text-sm font-medium hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {downloading ? (
                  <Loader2 className="size-4 animate-spin shrink-0" />
                ) : (
                  <Download className="size-4 shrink-0" />
                )}
                {downloading
                  ? "Préparation en cours..."
                  : selected.size <= 1
                    ? "Télécharger"
                    : "Télécharger en ZIP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RememberPhotosClient;
RememberPhotosClient.displayName = "RememberPhotosClient";
