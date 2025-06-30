import { ProfileCardProps, SocialMedia } from "@/types/profile";

// Informations de base de l'entreprise
export const businessInformation = {
  // Informations de base
  name: "Occitanie Évasion",
  title: "Activités de plein air en Occitanie",
  description: "Spécialiste en canyoning, escalade, spéléologie et via corda dans la région Occitanie. Découvrez nos activités d'aventure en pleine nature.",
  
  // Image/Logo
  image: {
    src: "/logo.svg",
    alt: "Occitanie Évasion - Activités de plein air"
  },
  
  // Informations de contact
  contact: {
    phone: "0620562507",
    email: "contact@occitanie-evasion.com",
    address: {
      street: "123 Rue de l'Aventure",
      city: "Toulouse",
      postalCode: "31000",
      country: "France"
    }
  },
  
  // Réseaux sociaux
  socialMedia: [
    { platform: "facebook" as const, url: "https://facebook.com/occitanie-evasion" },
    { platform: "instagram" as const, url: "https://instagram.com/occitanie_evasion" }
  ] as SocialMedia[],
  
  // Horaires d'ouverture
  businessHours: [
    { day: "Tous les jours", open: "09:00", close: "20:00" }
  ],
  
  // Informations pour les meta tags
  seo: {
    title: "Occitanie Évasion - Activités de plein air en Occitanie",
    description: "Découvrez nos activités de plein air en Occitanie : canyoning, escalade, spéléologie et via corda. Réservez votre aventure en pleine nature.",
    keywords: "canyoning, escalade, spéléologie, via corda, plein air, Occitanie, activités nature, aventure",
    author: "Occitanie Évasion",
    ogImage: "/images/Canyoning_Home.jpg",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  
  // Informations légales
  legal: {
    siret: "12345678901234",
    tva: "FR12345678901",
    adresse: "123 Rue de l'Aventure, 31000 Toulouse, France"
  },
  
  // Informations supplémentaires
  additional: {
    founded: "2020",
    activities: ["canyoning", "escalade", "spéléologie", "via corda"],
    regions: ["Occitanie", "Pyrénées", "Toulouse"],
    certifications: ["Moniteur diplômé", "Sécurité certifiée"]
  }
};

// Fonction pour obtenir les données formatées pour ProfileCard
export const getProfileCardData = (): ProfileCardProps => {
  return {
    name: businessInformation.name,
    title: businessInformation.title,
    image: businessInformation.image,
    contact: businessInformation.contact,
    socialMedia: businessInformation.socialMedia,
    businessHours: businessInformation.businessHours
  };
};

// Fonction pour obtenir les meta tags
export const getMetaTags = () => {
  return {
    title: businessInformation.seo.title,
    description: businessInformation.seo.description,
    keywords: businessInformation.seo.keywords,
    author: businessInformation.seo.author,
    openGraph: {
      title: businessInformation.seo.title,
      description: businessInformation.seo.description,
      image: businessInformation.seo.ogImage,
      type: businessInformation.seo.ogType,
      url: "https://occitanie-evasion.com"
    },
    twitter: {
      card: businessInformation.seo.twitterCard,
      title: businessInformation.seo.title,
      description: businessInformation.seo.description,
      image: businessInformation.seo.ogImage
    }
  };
};

// Fonction pour obtenir les informations de contact formatées
export const getContactInfo = () => {
  return {
    phone: businessInformation.contact.phone,
    email: businessInformation.contact.email,
    address: businessInformation.contact.address,
    formattedPhone: businessInformation.contact.phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
  };
};

// Fonction pour obtenir les réseaux sociaux
export const getSocialMedia = () => {
  return businessInformation.socialMedia;
};

// Fonction pour obtenir les horaires
export const getBusinessHours = () => {
  return businessInformation.businessHours;
};