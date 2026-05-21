import { Suspense } from 'react';
import ReservationPageClient from './reservation-page-client';

export default function ReservationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center mt-20 font-paragraphe opacity-80">
          Chargement...
        </div>
      }
    >
      <ReservationPageClient />
    </Suspense>
  );
}
