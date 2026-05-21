import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata-helpers';

export const metadata: Metadata = pageMetadata({
  title: 'Politique de confidentialite',
  description:
    'Politique de confidentialite et protection des donnees personnelles - Occitanie Evasion.',
  path: '/politique-de-confidentialite',
});

export default function PolitiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
