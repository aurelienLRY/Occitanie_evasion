import type { Metadata } from "next";
import { businessInformation } from "@/config/business-information";

export const metadata: Metadata = {
 
    
    title: {
        template: `%s | ${businessInformation.name}`,
        default: `Escalade en Occitanie - Aude et Hérault`,
    },
    description: "Initiation et perfectionnement à l'escalade en milieu naturel dans l'Aude et l'Hérault. Grimpez sur les plus belles falaises d'Occitanie avec un moniteur diplômé.",
    keywords: `${businessInformation.seo.keywords}, escalade Aude, escalade Hérault, cours escalade Occitanie, initiation escalade falaise, grimpe Languedoc, moniteur escalade Aude`,
    authors: [{ 
        name: businessInformation.seo.author, 
        url: "https://www.occitanie-evasion.com" 
    }],
    creator: businessInformation.seo.author,
    publisher: businessInformation.name,
    
    // Informations de l'entreprise
    applicationName: businessInformation.name,
    category: "Escalade - Sports et loisirs",
    
    // Métadonnées de contact
    other: {
        "contact:phone_number": businessInformation.contact.phone,
        "contact:email": businessInformation.contact.email,
        "contact:street_address": businessInformation.contact.address.street,
        "contact:locality": businessInformation.contact.address.city,
        "contact:postal_code": businessInformation.contact.address.postalCode,
        "contact:country_name": businessInformation.contact.address.country,
        "business:hours": businessInformation.businessHours.map(h => `${h.day}: ${h.open}-${h.close}`).join(", "),
        "business:foundation": businessInformation.additional.founded,
        "business:certifications": businessInformation.additional.certifications.join(", "),
        "business:activities": businessInformation.additional.activities.join(", "),
        "business:regions": businessInformation.additional.regions.join(", "),
        "activity:type": "escalade",
        "activity:difficulty": "débutant à expert",
        "activity:duration": "demi-journée, journée complète, stage",
        "activity:equipment": "fourni",
        "activity:techniques": "voie, bloc, initiation, perfectionnement",
    },
    
    // Open Graph
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://www.occitanie-evasion.com/activites/escalade",
        siteName: businessInformation.name,
        title: `Escalade - ${businessInformation.name}`,
        description: "Découvrez l'escalade en Occitanie sur les plus beaux sites naturels. Initiation, perfectionnement et escalade sportive avec nos moniteurs diplômés d'État.",
        images: [
            {
                url: "/images/Og/Og-Escalade.jpg",
                width: 1200,
                height: 630,
                alt: "Escalade en Occitanie - Occitanie Évasion",
            }
        ],
    },
    
    // Twitter Card
    twitter: {
        card: "summary_large_image",
        site: "@occitanie_evasion",
        creator: "@occitanie_evasion",
        title: `Escalade - ${businessInformation.name}`,
        description: "Découvrez l'escalade en Occitanie sur les plus beaux sites naturels. Initiation, perfectionnement et escalade sportive avec nos moniteurs diplômés d'État.",
        images: ["/images/Og/Og-twitter-Escalade.jpg"],
    },
    
    // Métadonnées pour les moteurs de recherche
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    
    // Métadonnées géographiques
    alternates: {
        canonical: "https://www.occitanie-evasion.com/activites/escalade",
        languages: {
            "fr-FR": "https://www.occitanie-evasion.com/activites/escalade",
        },
    },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}