import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata-helpers';

export const metadata: Metadata = pageMetadata({
  title: 'Mentions legales',
  description: 'Mentions legales du site Occitanie Evasion - activites de plein air en Occitanie.',
  path: '/mention-legal',
});

export default function MentionLegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
