/**
 * Clé et types pour le consentement cookies (RGPD).
 * Utiliser getCookieConsent() pour conditionner le chargement de GTM/Analytics.
 */

/** User-Agent des robots connus : on n'affiche pas la bannière bloquante pour eux (référencement). */
const CRAWLER_PATTERNS = [
  "Googlebot",
  "bingbot",
  "Slurp",        // Yahoo
  "DuckDuckBot",
  "Baiduspider",
  "YandexBot",
  "facebookexternalhit",
  "Twitterbot",
  "rogerbot",     // Moz
  "LinkedInBot",
  "Embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest",
  "slackbot",
  "vkshare",
  "W3C_Validator",
  "redditbot",
  "Applebot",
  "WhatsApp",
  "flipboard",
  "tumblr",
  "bitlybot",
  "SkypeUriPreview",
  "nuzzel",
  "Discordbot",
  "Qwantify",
  "Pinterestbot",
  "Bitrix link preview",
  "XING-contenttabreceiver",
  "Chrome-Lighthouse",
  "PTST",         // Pinterest
];

/**
 * Détecte si la requête vient probablement d'un robot d'indexation.
 * Si oui, on ne bloque pas la navigation (pas de bannière cookies) pour préserver le référencement.
 */
export function isLikelyCrawler(): boolean {
  if (typeof window === "undefined" || !window.navigator?.userAgent) return false;
  const ua = window.navigator.userAgent;
  return CRAWLER_PATTERNS.some((bot) => ua.toLowerCase().includes(bot.toLowerCase()));
}

export const COOKIE_CONSENT_KEY = "cookie-consent";

export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  timestamp: number;
}

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (
      typeof parsed.necessary !== "boolean" ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.preferences !== "boolean" ||
      typeof parsed.timestamp !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  const consent = getStoredConsent();
  return consent?.analytics === true;
}

export function setStoredConsent(state: CookieConsentState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
