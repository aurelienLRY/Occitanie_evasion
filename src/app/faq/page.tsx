import { Metadata } from "next";
import CustomSection from "@/components/layout/Section";
import { FAQ } from "@/components/ui/FAQ";
import ContactForm from "@/components/form/contact";
import { ProfileCard } from "@/components/ui/card";

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
      <CustomSection className="py-16 px-4 text-center container mx-auto">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Vous ne trouvez pas votre réponse <span className="text-secondary">?</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 ">
            Je suis là pour vous aider. N&apos;hésite pas à me contacter pour toute question spécifique.
          </p>

          <div className="flex flex-col items-center lg:flex-row gap-6 w-full ">
            <div className=" lg:flex-1/3">
              <ProfileCard />
            </div>
            <ContactForm className="w-full " />
          </div>


      </CustomSection>
    </>
  );
}
