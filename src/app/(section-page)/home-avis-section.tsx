"use client";

import dynamic from "next/dynamic";

const AvisSection = dynamic(() => import("./avis-section"), {
  ssr: false,
  loading: () => (
    <section
      className="min-h-[40vh] w-full mx-auto flex items-center justify-center px-4"
      aria-label="Chargement des avis clients"
    >
      <p className="font-paragraphe text-lg opacity-70">Chargement des avis...</p>
    </section>
  ),
});

export default function HomeAvisSection({ className }: { className?: string }) {
  return <AvisSection className={className} />;
}
