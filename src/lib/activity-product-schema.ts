import type { IActivity } from '@/types/api.types';

const BASE_URL = 'https://www.occitanie-evasion.com';

function slugFromActivityName(activityName: string): string {
  return activityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function ogImageSlug(activityName: string): string {
  const s = activityName.charAt(0).toUpperCase() + activityName.slice(1).toLowerCase();
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function buildActivityProductSchemas(activity: IActivity, activityName: string) {
  const activityUrl = `${BASE_URL}/activites/${slugFromActivityName(activityName)}`;

  const offers: Record<string, unknown>[] = [];

  if (activity.half_day) {
    offers.push({
      '@type': 'Offer',
      name: 'Formule Demi-journee',
      price: activity.price_half_day.standard,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: activityUrl,
      category: 'Demi-journee',
    });
  }

  if (activity.full_day) {
    offers.push({
      '@type': 'Offer',
      name: 'Formule Journee complete',
      price: activity.price_full_day.standard,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: activityUrl,
      category: 'Journee',
    });
  }

  const halfPrice = activity.half_day ? activity.price_half_day.standard : Infinity;
  const fullPrice = activity.full_day ? activity.price_full_day.standard : Infinity;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: activity.name,
    description:
      activity.description || `Activite de ${activity.name} en Occitanie avec Occitanie Evasion.`,
    image: `${BASE_URL}/images/Og/Og-${ogImageSlug(activityName)}.jpg`,
    brand: {
      '@type': 'Brand',
      name: 'Occitanie Evasion',
    },
    category: 'Sports & Loisirs',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: Math.min(halfPrice, fullPrice),
      highPrice: Math.max(
        activity.half_day ? activity.price_half_day.standard : 0,
        activity.full_day ? activity.price_full_day.standard : 0
      ),
      priceCurrency: 'EUR',
      offerCount: offers.length,
      offers,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: activity.name,
        item: activityUrl,
      },
    ],
  };

  return [productSchema, breadcrumbSchema];
}
