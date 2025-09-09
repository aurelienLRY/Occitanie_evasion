import type { Metadata } from "next";
import { businessInformation } from "@/config/business-information";

export const metadata: Metadata = {
    // Base URL pour résoudre les images
    metadataBase: new URL("https://www.occitanie-evasion.com"),
    
    // Métadonnées de base
    title: {
        template: `%s | ${businessInformation.name}`,
        default: `Spéléologie - ${businessInformation.name}`,
    },
    description: "Explorez les grottes et cavités souterraines de l'Occitanie. Découvrez un monde souterrain fascinant avec nos guides spéléologues expérimentés.",
    keywords: `${businessInformation.seo.keywords}, spéléologie, grotte, cavité, souterrain, exploration, stalactites, stalagmites, Occitanie, Pyrénées, aventure`,
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
                url: "/images/speleo.jpg",
                width: 1200,
                height: 630,
                alt: "Spéléologie en Occitanie - Occitanie Évasion",
            },
            {
                url: "/images/Og/Home-OG-Twitter.png",
                width: 506,
                height: 254,
                alt: businessInformation.image.alt,
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
        images: ["/images/speleo.jpg"],
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
    
    // Métadonnées de vérification
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
        yahoo: "your-yahoo-verification-code",
    },
    
    // Métadonnées pour les applications mobiles
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: businessInformation.name,
    },
    
    // Métadonnées de format
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    
    // Métadonnées de sécurité
    referrer: "origin-when-cross-origin",
    
    // Métadonnées d'icônes
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
};

// Configuration du viewport avec themeColor
export const viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}