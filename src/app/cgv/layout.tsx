import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata-helpers';

export const metadata: Metadata = pageMetadata({
  title: 'Conditions generales de vente',
  description:
    'Conditions generales de vente, assurance et responsabilite - Occitanie Evasion, activites de plein air en Occitanie.',
  path: '/cgv',
  keywords:
    'CGV, conditions generales de vente, annulation, remboursement, assurance, responsabilite, canyoning, Occitanie Evasion',
});

export default function CgvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
