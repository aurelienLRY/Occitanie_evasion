"use client";

import { useActivities } from "@/hooks/useQuery";
import { IActivity } from "@/types";

interface ActivityProductSchemaProps {
  activityName: string;
}

export const ActivityProductSchema = ({ activityName }: ActivityProductSchemaProps) => {
  const { data: activities } = useActivities();

  // Trouver l'activité correspondante
  const activity = activities?.find((act: IActivity) =>
    act.name.toLowerCase().includes(activityName.toLowerCase())
  );

  if (!activity) return null;

  const baseUrl = "https://www.occitanie-evasion.com";
  const activityUrl = `${baseUrl}/activites/${activityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;

  const offers = [];

  if (activity.half_day) {
    offers.push({
      "@type": "Offer",
      "name": "Formule Demi-journée",
      "price": activity.price_half_day.standard,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": activityUrl,
      "category": "Demi-journée"
    });
  }

  if (activity.full_day) {
    offers.push({
      "@type": "Offer",
      "name": "Formule Journée complète",
      "price": activity.price_full_day.standard,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": activityUrl,
      "category": "Journée"
    });
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": activity.name,
    "description": activity.description || `Activité de ${activity.name} en Occitanie avec Occitanie Évasion.`,
    "image": `${baseUrl}/images/Og/Og-${activityName.charAt(0).toUpperCase() + activityName.slice(1).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.jpg`,
    "brand": {
      "@type": "Brand",
      "name": "Occitanie Évasion"
    },
    "category": "Sports & Loisirs",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": Math.min(
        activity.half_day ? activity.price_half_day.standard : Infinity,
        activity.full_day ? activity.price_full_day.standard : Infinity
      ),
      "highPrice": Math.max(
        activity.half_day ? activity.price_half_day.standard : 0,
        activity.full_day ? activity.price_full_day.standard : 0
      ),
      "priceCurrency": "EUR",
      "offerCount": offers.length,
      "offers": offers
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": activity.name,
        "item": activityUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};
