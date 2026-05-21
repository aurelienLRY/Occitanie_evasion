import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata-helpers';

export const metadata: Metadata = pageMetadata({
  title: 'Reservation - Occitanie Evasion',
  description:
    'Reservez votre sortie canyoning, escalade ou speleologie en Occitanie. Rejoignez une session existante ou creez la votre.',
  path: '/reservation',
  keywords:
    'reservation, canyoning, escalade, speleologie, Occitanie, session, booking',
});

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
