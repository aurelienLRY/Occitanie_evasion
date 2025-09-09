import type { Metadata } from "next";
/*import "./globals.css";*/
import { Permanent_Marker , Slackside_One , Nunito} from "next/font/google";
import "@/styles/globals.css"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
/*import ThemeProvider from "../components/providers/ThemeProvider";*/
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from 'sonner';
import { businessInformation } from "@/config/business-information";

export const metadata: Metadata = {
  // Base URL pour résoudre les images
  metadataBase: new URL("https://www.occitanie-evasion.com"),
  
  // Métadonnées de base
  title: {
    default: businessInformation.seo.title,
    template: `%s | ${businessInformation.name}`
  },
  description: businessInformation.seo.description,
  keywords: businessInformation.seo.keywords,
  authors: [{ 
    name: businessInformation.seo.author, 
    url: "https://www.occitanie-evasion.com" 
  }],
  creator: businessInformation.seo.author,
  publisher: businessInformation.name,
  
  // Informations de l'entreprise
  applicationName: businessInformation.name,
  category: "Sports et loisirs",
  
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
  },
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.occitanie-evasion.com",
    siteName: businessInformation.name,
    title: businessInformation.seo.title,
    description: businessInformation.seo.description,
    images: [
      {
        url: businessInformation.seo.ogImage,
        width: 1200,
        height: 630,
        alt: businessInformation.image.alt,
      },
      {
        url: "/images/Og/Home-OG-Twitter.png",
        width: 506,
        height: 254 ,
        alt: businessInformation.image.alt,
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@occitanie_evasion",
    creator: "@occitanie_evasion",
    title: businessInformation.seo.title,
    description: businessInformation.seo.description,
    images: ["/images/Og/Home-OG-Twitter.png"],
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
    canonical: "https://www.occitanie-evasion.com",
    languages: {
      "fr-FR": "https://www.occitanie-evasion.com",
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

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-permanent-marker",
});

const slacksideOne = Slackside_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-slackside-one",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preload des ressources critiques pour le LCP */}
        <link
          rel="preload"
          href="/images/Home/Canyoning_Home.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/logo.svg"
          as="image"
          type="image/svg+xml"
        />
        {/* Preload des polices critiques */}
        <link
          rel="preload"
          href="/font/Heaters.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`  ${permanentMarker.variable} ${slacksideOne.variable} ${nunito.variable} antialiased `}
      >
        <QueryProvider>
         {/* <ThemeProvider> */}
            <Header  className="absolute top-0 left-0 w-full"/>
            <main className=" flex flex-col  min-h-[calc(100vh-187px)] relative " >{children}</main>
            <Footer />
            <Toaster 
              position="bottom-right"
              richColors
              closeButton
              duration={4000}
            />
          {/* </ThemeProvider> */}
        </QueryProvider>
      </body>
    </html>
  );
}
