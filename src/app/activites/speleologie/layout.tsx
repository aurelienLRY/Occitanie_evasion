import type { Metadata } from "next";
import { businessInformation } from "@/config/business-information";

export const metadata: Metadata = { 
    title: {
        template: `%s | ${businessInformation.name}`,
        default: `Spéléologie dans l'Aude`,
    },
    description: "Explorez les grottes et cavités souterraines de l'Occitanie. Découvrez un monde souterrain fascinant avec nos guides spéléologues expérimentés.",
    keywords: `${businessInformation.seo.keywords},initiation spéléologie, pratiquer la spéléologie, visitez Gouffre Géant de Cabrespine , spéléo, spéléo Occitanie, sortie spéléologie aude, spéléo Pyrénées, exploration, aventure sous terre`,
    authors: [{ 
        name: businessInformation.seo.author, 
        url: "https://www.occitanie-evasion.com" 
    }],
    creator: businessInformation.seo.author,
    publisher: businessInformation.name,
    
    // Informations de l'entreprise
    applicationName: businessInformation.name,
    category: "Spéléologie - Sports et loisirs",
    
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
        "activity:type": "spéléologie",
        "activity:difficulty": "débutant à confirmé",
        "activity:duration": "demi-journée, journée complète",
        "activity:equipment": "fourni",
        "activity:techniques": "exploration, rappel, progression, observation",
    },
    
    // Open Graph
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://www.occitanie-evasion.com/activites/speleologie",
        siteName: businessInformation.name,
        title: `Spéléologie - ${businessInformation.name}`,
        description: "Explorez les grottes et cavités souterraines de l'Occitanie. Découvrez un monde souterrain fascinant avec nos guides spéléologues expérimentés.",
        images: [
            {
                url: "/images/Og/Og-Speleologie.jpg",
                width: 1200,
                height: 630,
                alt: "Spéléologie en Occitanie - Occitanie Évasion",
            }
        ],
    },
    
    // Twitter Card
    twitter: {
        card: "summary_large_image",
        site: "@occitanie_evasion",
        creator: "@occitanie_evasion",
        title: `Spéléologie - ${businessInformation.name}`,
        description: "Explorez les grottes et cavités souterraines de l'Occitanie. Découvrez un monde souterrain fascinant avec nos guides spéléologues expérimentés.",
        images: ["/images/Og/Og-twitter-Speleologie.jpg"],
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
        canonical: "https://www.occitanie-evasion.com/activites/speleologie",
        languages: {
            "fr-FR": "https://www.occitanie-evasion.com/activites/speleologie",
        },
    },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}