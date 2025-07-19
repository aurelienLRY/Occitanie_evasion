import { Metadata } from "next";
import CustomSection from "@/components/layout/Section";
import { FAQ } from "@/components/ui/FAQ";

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | Occitanie Évasion",
  description: "Trouvez rapidement les réponses à vos questions sur nos activités de plein air : canyoning, escalade, spéléologie et via corda en Occitanie.",
  keywords: "FAQ, questions fréquentes, canyoning, escalade, spéléologie, via corda, Occitanie, réservation, tarifs, sécurité",
};

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <CustomSection className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 dark:from-primary/10 dark:via-secondary/10 dark:to-primary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Questions{" "}
            <span className="text-secondary ">
              Fréquentes
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trouvez rapidement les réponses à toutes vos questions sur nos activités de plein air. 
            De la réservation à la sécurité, nous avons tout prévu pour vous accompagner.
          </p>
        </div>
      </CustomSection>

      {/* FAQ Content */}
      <CustomSection className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <FAQ className="max-w-4xl mx-auto" />
        </div>
      </CustomSection>

      {/* Contact CTA */}
      <CustomSection className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour vous aider. N&apos;hésitez pas à nous contacter pour toute question spécifique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Nous Contacter
            </a>
            <a
              href="tel:06XXXXXXXX"
              className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Appeler Maintenant
            </a>
          </div>
        </div>
      </CustomSection>
    </>
  );
}
