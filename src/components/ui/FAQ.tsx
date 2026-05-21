"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FAQCategory, FAQItem, faqData } from "@/data/faq";

const cgvLink = (anchor: string, label: string) => (
  <Link
    href={`/cgv#${anchor}`}
    className="text-secondary hover:underline font-medium"
  >
    {label}
  </Link>
);

const faqAnswersWithLinks: Partial<Record<string, ReactNode>> = {
  "reservation-4": (
    <>
      Les conditions d&apos;annulation et de remboursement sont détaillées dans nos{" "}
      {cgvLink("annulation", "conditions générales de vente")}. En résumé : annulation signalée
      dans les 48 h avant le début de la prestation — montant dû ; force majeure sur justificatif
      — remboursement possible ; annulation météo par le guide — report ou remboursement intégral.
      Contactez-moi pour toute modification de réservation.
    </>
  ),
  "securite-3": (
    <>
      La sécurité est ma priorité. En cas de conditions météorologiques ou niveaux d&apos;eau
      dangereux, le guide peut annuler la prestation (voir{" "}
      {cgvLink("annulation", "annulation et remboursement")}). Je propose un report ou un
      remboursement intégral selon les cas définis dans nos CGV. Je surveille les conditions et
      vous contacte si nécessaire.
    </>
  ),
  "securite-4": (
    <>
      Oui, je suis entièrement assuré en Responsabilité Civile Professionnelle. Chaque participant
      doit disposer d&apos;une assurance responsabilité civile individuelle couvrant le canyoning —
      voir la section{" "}
      {cgvLink("assurances", "assurances")} de nos conditions. En cas de réservation avec un
      moniteur partenaire, c&apos;est son assurance qui s&apos;applique.
    </>
  ),
  "securite-5": (
    <>
      Consultez les{" "}
      {cgvLink("contre-indications", "contre-indications")} dans nos CGV : pas de contre-indication
      médicale, poids maximum 115 kg, pas d&apos;alcool ni de drogue, femmes enceintes informées
      des risques. Pour le canyoning, être à l&apos;aise dans l&apos;eau (sorties famille) et
      signaler les enfants les moins à l&apos;aise au guide.
    </>
  ),
  "saison-3": (
    <>
      Non, j&apos;adapte les activités aux conditions météo. La décision d&apos;annuler pour
      danger météo ou niveaux d&apos;eau appartient au guide et ne peut être contestée (
      {cgvLink("annulation", "voir CGV")}). Report ou remboursement selon les conditions prévues.
    </>
  ),
  "activites-1": (
    <>
      Le canyoning est accessible à partir de 10 ans. La nage est obligatoire (savoir nager 25 m et
      s&apos;immerger). Les sauts sont optionnels. Bonne forme physique requise. Voir aussi les{" "}
      {cgvLink("contre-indications", "contre-indications")} et la gestion des{" "}
      {cgvLink("risques", "risques")}.
    </>
  ),
};

interface FAQProps {
  className?: string;
}

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItemComponent = ({ item, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-4 px-0 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
          {item.question}
        </h3>
        <svg
          className={cn(
            "w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pb-4 px-0">
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {faqAnswersWithLinks[item.id] ?? item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQCategoryComponent = ({ category }: { category: FAQCategory }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-secondary/80 px-6 py-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          {category.title}
        </h2>
        <p className="text-white/80">
          {category.description}
        </p>
      </div>
      <div className="p-6">
        {category.items.map((item) => (
          <FAQItemComponent
            key={item.id}
            item={item}
            isOpen={openItems.has(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export const FAQ = ({ className }: FAQProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-8 md:gap-12">
        {faqData.map((category: FAQCategory) => (
          <FAQCategoryComponent key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}; 