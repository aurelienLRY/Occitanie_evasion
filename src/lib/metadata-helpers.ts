import type { Metadata } from 'next';
import { businessInformation } from '@/config/business-information';

const SITE_URL = 'https://www.occitanie-evasion.com';

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${options.path}`;
  const ogImage = options.ogImage ?? businessInformation.seo.ogImage;

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords ?? businessInformation.seo.keywords,
    alternates: {
      canonical: url,
      languages: { 'fr-FR': url },
    },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      siteName: businessInformation.name,
      title: options.title,
      description: options.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: businessInformation.image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@occitanie_evasion',
      creator: '@occitanie_evasion',
      title: options.title,
      description: options.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
