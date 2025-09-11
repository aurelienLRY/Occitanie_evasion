import type { Metadata } from "next";
import { businessInformation } from "@/config/business-information";

export const metadata: Metadata = {
    // Base URL pour résoudre les images
    metadataBase: new URL("https://www.occitanie-evasion.com"),
    
    // Métadonnées de base
    title: {
        template: `%s | ${businessInformation.name}`,
        default: `Canyoning - ${businessInformation.name}`,
    },
    description: "Découvrez l'aventure du canyoning dans les plus beaux canyons de l'Aude et de l'Hérault. Des descentes spectaculaires en toute sécurité avec nos guides diplômés.",
    keywords: `${businessInformation.seo.keywords}, canyoning, canyons, descente, toboggans, sauts, rappels, Aude, Hérault, Pyrénées, aventure, eau vive`,
    authors: [{ 
        name: businessInformation.seo.author, 
        url: "https://www.occitanie-evasion.com" 
    }],
    creator: businessInformation.seo.author,
    publisher: businessInformation.name,
    
    // Informations de l'entreprise
    applicationName: businessInformation.name,
    category: "Canyoning - Sports et loisirs",
    
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
        "activity:type": "canyoning",
        "activity:difficulty": "tous niveaux",
        "activity:duration": "demi-journée, journée complète",
        "activity:equipment": "fourni",
    },
    
    // Open Graph
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://www.occitanie-evasion.com/activites/canyoning",
        siteName: businessInformation.name,
        title: `Canyoning - ${businessInformation.name}`,
        description: "Découvrez l'aventure du canyoning dans les plus beaux canyons de l'Aude et de l'Hérault. Des descentes spectaculaires en toute sécurité avec nos guides diplômés.",
        images: [
            {
                url: "/images/Og/Og-Canyoning.jpg",
                width: 1200,
                height: 630,
                alt: "Canyoning en Occitanie - Occitanie Évasion",
            }
        ],
    },
    
    // Twitter Card
    twitter: {
        card: "summary_large_image",
        site: "@occitanie_evasion",
        creator: "@occitanie_evasion",
        title: `Canyoning - ${businessInformation.name}`,
        description: "Découvrez l'aventure du canyoning dans les plus beaux canyons de l'Aude et de l'Hérault. Des descentes spectaculaires en toute sécurité avec nos guides diplômés.",
        images: ["/images/Og/Og-twitter-Canyoning.jpg"],
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
        canonical: "https://www.occitanie-evasion.com/activites/canyoning",
        languages: {
            "fr-FR": "https://www.occitanie-evasion.com/activites/canyoning",
        },
    },
    
  
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}