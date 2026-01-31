import { businessInformation } from "@/config/business-information";

export const Schema = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessInformation.name,
    "image": "https://www.occitanie-evasion.com/images/Og/Home-OG.jpg",
    "@id": "https://www.occitanie-evasion.com/#organization",
    "url": "https://www.occitanie-evasion.com",
    "telephone": businessInformation.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessInformation.contact.address.street,
      "addressLocality": businessInformation.contact.address.city,
      "postalCode": businessInformation.contact.address.postalCode,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.2847, // Coordonnées approximatives pour La Redorte
      "longitude": 2.6534
    },
    "openingHoursSpecification": businessInformation.businessHours.map(h => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": h.open,
      "closes": h.close
    })),
    "sameAs": businessInformation.socialMedia.map(s => s.url)
  };

  const servicesSchema = businessInformation.additional.activities.map(activity => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": activity,
    "provider": {
      "@type": "LocalBusiness",
      "name": businessInformation.name
    },
    "areaServed": businessInformation.additional.regions.map(region => ({
      "@type": "State",
      "name": region
    })),
    "description": `Activité de ${activity} proposée par Occitanie Évasion en région Occitanie.`
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, ...servicesSchema]) }}
    />
  );
};
