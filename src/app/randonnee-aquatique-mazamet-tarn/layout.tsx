import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata-helpers';
import { businessInformation } from '@/config/business-information';

const PAGE_PATH = '/randonnee-aquatique-mazamet-tarn';
const PAGE_URL = `https://www.occitanie-evasion.com${PAGE_PATH}`;

export const metadata: Metadata = pageMetadata({
  title: 'Randonnee aquatique Mazamet | Canyoning gorges du Banquet (Tarn)',
  description:
    'Randonnee aquatique et canyoning dans les gorges du Banquet, a 10 min de Mazamet (Tarn). Sauts, toboggans, eau vive : guide diplome Occitanie Evasion.',
  path: PAGE_PATH,
  keywords: [
    businessInformation.seo.keywords,
    'randonnee aquatique mazamet',
    'randonnee aquatique tarn',
    'canyoning mazamet',
    'canyoning gorges du banquet',
    'gorges du banquet saint-amans-valtoret',
    'canyon de l arn',
    'activite eau vive tarn',
    'canyoning haut languedoc',
  ].join(', '),
  ogImage: '/images/Og/Og-Canyoning.jpg',
});

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Randonnee aquatique a Mazamet : canyoning dans les gorges du Banquet',
  description:
    'Guide complet pour decouvrir le canyoning et la randonnee aquatique dans les gorges du Banquet, entre Mazamet et Saint-Amans-Valtoret, dans le Tarn.',
  author: {
    '@type': 'Person',
    name: 'Florent Soum',
  },
  publisher: {
    '@type': 'Organization',
    name: businessInformation.name,
    url: 'https://www.occitanie-evasion.com',
  },
  mainEntityOfPage: PAGE_URL,
  image: 'https://www.occitanie-evasion.com/images/Og/Og-Canyoning.jpg',
};

const touristSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristDestination',
  name: 'Gorges du Banquet',
  description:
    'Canyon de l\'Arn pour la randonnee aquatique et le canyoning, a proximite de Mazamet dans le Tarn.',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.492,
    longitude: 2.52,
  },
  containedInPlace: {
    '@type': 'AdministrativeArea',
    name: 'Tarn',
  },
};

export default function RandonneeAquatiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristSchema) }}
      />
      {children}
    </>
  );
}
