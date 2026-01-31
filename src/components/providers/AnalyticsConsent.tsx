"use client";

import { useState, useEffect } from "react";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";

const GTM_ID = "GTM-593SZBKS";
const GA_ID = "G-F55FK2K74W";

/**
 * Charge GTM et Google Analytics uniquement si l'utilisateur a accepté les cookies analytiques (RGPD).
 */
export function AnalyticsConsent() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(hasAnalyticsConsent());

    const onConsentUpdate = (e: CustomEvent<{ analytics: boolean }>) => {
      if (e.detail?.analytics) setAllowed(true);
    };

    window.addEventListener(
      "cookie-consent-updated",
      onConsentUpdate as EventListener
    );
    return () =>
      window.removeEventListener(
        "cookie-consent-updated",
        onConsentUpdate as EventListener
      );
  }, []);

  // Éviter le flash : ne pas charger avant d'avoir lu le consentement (après premier rendu)
  const [hasChecked, setHasChecked] = useState(false);
  useEffect(() => {
    setHasChecked(true);
  }, []);

  if (!hasChecked || !allowed) return null;

  return (
    <>
      <GoogleTagManager gtmId={GTM_ID} />
      <GoogleAnalytics gaId={GA_ID} />
    </>
  );
}

AnalyticsConsent.displayName = "AnalyticsConsent";
