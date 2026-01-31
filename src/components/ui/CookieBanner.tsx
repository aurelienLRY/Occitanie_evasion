"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getStoredConsent,
  setStoredConsent,
  isLikelyCrawler,
  type CookieConsentState,
} from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";

const defaultConsent = (analytics: boolean, preferences: boolean): CookieConsentState => ({
  necessary: true,
  analytics: analytics,
  preferences: preferences,
  timestamp: Date.now(),
});

export function CookieBanner() {
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = getStoredConsent();
    const crawler = isLikelyCrawler();
    setVisible(consent === null && !crawler);
  }, []);

  useEffect(() => {
    if (visible !== true) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const save = (state: CookieConsentState) => {
    setStoredConsent(state);
    setVisible(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: state }));
    }
  };

  const acceptAll = () => save(defaultConsent(true, true));
  const rejectAll = () => save(defaultConsent(false, false));

  if (visible !== true) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choix des cookies"
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-2xl bg-white shadow-xl rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 mx-4 mb-0 sm:mb-0 flex flex-col sm:flex-row sm:items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image : déposer votre fichier dans public/images/cookies/cookie-banner.webp (sinon le 🍪 s'affiche) */}
            <span
              className="absolute w-24 h-24 sm:w-28 sm:h-28 -top-15 left-10 text-6xl sm:text-8xl"
              aria-hidden
            >
              🍪
            </span>
    
         
      
        <div className="flex-1 min-w-0">
          <span className="!text-4xl font-title text-gray-900 mb-2">
            Un petit cookie avant l&apos;aventure ?
          </span>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            Comme en pleine nature, on a besoin de repères : nos cookies permettent au site de bien tourner,
            de mesurer les visites (sans vous pister) et de retenir vos préférences. Choisissez en un clic,
            puis on part explorer&nbsp;!
            <Link
              href="/politique-de-confidentialite"
              className="text-primary font-semibold hover:underline ml-1"
            >
              En savoir plus
            </Link>
          </p>
          <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={rejectAll}
            className="text-gray-600 hover:text-white hover:bg-secondary"
          >
            Tout refuser
          </Button>
          <Button
            type="button"
            variant="primary"
            size="default"
            onClick={acceptAll}
          >
            Tout accepter
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

CookieBanner.displayName = "CookieBanner";
