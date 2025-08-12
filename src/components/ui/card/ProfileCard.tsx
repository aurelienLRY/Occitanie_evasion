"use client";

import { cn } from "@/lib/utils";
import { ProfileCardProps } from "@/types";
import { getProfileCardData } from "@/config/business-information";
import Image from "next/image";
import Link from "next/link";
import {
    Phone,
    Mail,
    Globe,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    ExternalLink
} from "lucide-react";

// Icônes pour les réseaux sociaux
const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    tiktok: ExternalLink,
    website: Globe
};

// Labels d'accessibilité pour les plateformes sociales
const socialLabels = {
    facebook: "Facebook",
    instagram: "Instagram", 
    twitter: "Twitter",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    tiktok: "TikTok",
    website: "Site web"
};

const ProfileCard = (props: Partial<ProfileCardProps> = {}) => {
    // Récupérer les données par défaut depuis la configuration centralisée
    const defaultData = getProfileCardData();

    const {
        image = defaultData.image,
        contact = defaultData.contact,
        socialMedia = defaultData.socialMedia,
        businessHours = defaultData.businessHours,
        showContact = true,
        showSocialMedia = true,
        showBusinessHours = true,
        className,
    } = props;

    const formatPhone = (phone: string) => {
        // Formatage basique du téléphone
        return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    };

    return (
        <article 
            className={cn("bg-white rounded-lg shadow-lg border border-gray-200 pt-20 relative mt-12 flex-1", className)}
            role="complementary"
            aria-labelledby="profile-card-title"
        >
            {image && (
                <div className="absolute -top-1 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={150}
                        height={150}
                        className="object-cover rounded-full overflow-hidden bg-white border-2 border-white shadow-lg"
                        aria-hidden="true"
                    />
                </div>
            )}
            
            <div className="flex flex-col gap-2 px-6 py-2">
                <h2 id="profile-card-title" className="sr-only">
                    Informations de contact et horaires
                </h2>

                {/* Informations de contact */}
                {showContact && contact && (
                    <section aria-labelledby="contact-section-title">
                        <h3 id="contact-section-title" className="sr-only">
                            Coordonnées de contact
                        </h3>
                        
                        {contact.phone && (
                            <Link 
                                href={`tel:${contact.phone}`} 
                                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
                                aria-label={`Appeler le ${formatPhone(contact.phone)}`}
                            >
                                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                                <span>{formatPhone(contact.phone)}</span>
                            </Link>
                        )}

                        {contact.email && (
                            <Link 
                                href={`mailto:${contact.email}`} 
                                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1"
                                aria-label={`Envoyer un email à ${contact.email}`}
                            >
                                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                                <span>{contact.email}</span>
                            </Link>
                        )}
                    </section>
                )}

                {/* Réseaux sociaux */}
                {showSocialMedia && socialMedia && socialMedia.length > 0 && (
                    <section aria-labelledby="social-media-section-title">
                        <h3 id="social-media-section-title" className="sr-only">
                            Réseaux sociaux
                        </h3>
                        <nav aria-label="Réseaux sociaux" className="flex gap-3">
                            {socialMedia.map((social, index) => {
                                const IconComponent = socialIcons[social.platform];
                                const platformLabel = socialLabels[social.platform] || social.platform;
                                
                                return (
                                    <Link
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                                            "hover:bg-gray-50 border border-gray-200",
                                            social.platform === 'facebook' && "hover:border-blue-500 hover:text-blue-600 focus:ring-blue-500",
                                            social.platform === 'instagram' && "hover:border-pink-500 hover:text-pink-600 focus:ring-pink-500",
                                            social.platform === 'twitter' && "hover:border-blue-400 hover:text-blue-500 focus:ring-blue-400",
                                            social.platform === 'linkedin' && "hover:border-blue-700 hover:text-blue-700 focus:ring-blue-700",
                                            social.platform === 'youtube' && "hover:border-red-500 hover:text-red-600 focus:ring-red-500",
                                            social.platform === 'tiktok' && "hover:border-black hover:text-black focus:ring-black",
                                            social.platform === 'website' && "hover:border-green-500 hover:text-green-600 focus:ring-green-500"
                                        )}
                                        aria-label={`Visiter notre page ${platformLabel} (s'ouvre dans un nouvel onglet)`}
                                    >
                                        <IconComponent className="w-4 h-4" aria-hidden="true" />
                                        <span className="text-sm font-medium capitalize">
                                            {social.platform}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </section>
                )}

                {/* Horaires d'ouverture */}
                {showBusinessHours && businessHours && businessHours.length > 0 && (
                    <section aria-labelledby="business-hours-section-title">
                        <hr className="min-w-[150px] text-secondary border-secondary border-1 mx-auto my-1" />
                        
                        <h3 id="business-hours-section-title" className="!text-2xl font-semibold text-gray-800">
                            Horaires d&apos;ouverture
                        </h3>
                        
                        <div className="space-y-1" role="table" aria-label="Horaires d'ouverture">
                            {businessHours.map((hours, index) => (
                                <div 
                                    key={index} 
                                    className="flex justify-between items-center py-1"
                                    role="row"
                                >
                                    <span 
                                        className="text-gray-700 font-medium"
                                        role="cell"
                                    >
                                        {hours.day}
                                    </span>
                                    <span 
                                        className="text-gray-600"
                                        role="cell"
                                    >
                                        {hours.isClosed ? (
                                            <span className="text-red-500" aria-label="Fermé">Fermé</span>
                                        ) : (
                                            <span aria-label={`Ouvert de ${hours.open} à ${hours.close}`}>
                                                {hours.open} - {hours.close}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
};

export default ProfileCard;
ProfileCard.displayName = "ProfileCard";