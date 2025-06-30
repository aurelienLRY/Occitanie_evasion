"use client";

import { cn } from "@/lib/utils";
import { ProfileCardProps } from "@/types/profile";
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
import { hr } from "motion/react-client";

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
        <div className={cn("bg-white rounded-lg shadow-lg  border border-gray-200 pt-20 relative mt-12 flex-1", className)}>
            {image && (
                <div className=" absolute -top-1 -translate-y-1/2 left-1/2 -translate-x-1/2  flex items-center justify-center  ">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={150}
                        height={150}
                        className="object-cover rounded-full overflow-hidden bg-white border-2 border-white shadow-lg "
                    />
                </div>
            )}
            <div className="flex flex-col gap-2 px-6 py-2">
                {/* Informations de contact */}
                {showContact && contact && (

                        <>
                            {contact.phone && (
                                <Link href={`tel:${contact.phone}`} className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    {formatPhone(contact.phone)}
                                </Link>
                            )}

                            {contact.email && (
                                <Link href={`mailto:${contact.email}`} className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2">
                               <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                {contact.email}
                            </Link>
                            )}

                        </>
           
                )}

                {/* Réseaux sociaux */}
                {showSocialMedia && socialMedia && socialMedia.length > 0 && (
                        <div className="flex  gap-3  ">
                            {socialMedia.map((social, index) => {
                                const IconComponent = socialIcons[social.platform];
                                return (
                                    <Link
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                                            "hover:bg-gray-50 border border-gray-200",
                                            social.platform === 'facebook' && "hover:border-blue-500 hover:text-blue-600",
                                            social.platform === 'instagram' && "hover:border-pink-500 hover:text-pink-600",
                                            social.platform === 'twitter' && "hover:border-blue-400 hover:text-blue-500",
                                            social.platform === 'linkedin' && "hover:border-blue-700 hover:text-blue-700",
                                            social.platform === 'youtube' && "hover:border-red-500 hover:text-red-600",
                                            social.platform === 'tiktok' && "hover:border-black hover:text-black",
                                            social.platform === 'website' && "hover:border-green-500 hover:text-green-600"
                                        )}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span className="text-sm font-medium capitalize">
                                            {social.platform}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                )}

                {/* Horaires d&apos;ouverture */}
                {showBusinessHours && businessHours && businessHours.length > 0 && (
                    <>
                    <hr className=" min-w-[150px]  text-secondary border-secondary border-1 mx-auto my-1 " />
               
                        <h3 className="text-2xl font-semibold  text-gray-800">Horaires d&apos;ouverture : </h3>
                        <div className="space-y-1">
                            {businessHours.map((hours, index) => (
                                <div key={index} className="flex justify-between items-center py-1">
                                    <span className="text-gray-700 font-medium">{hours.day}</span>
                                    <span className="text-gray-600">
                                        {hours.isClosed ? (
                                            <span className="text-red-500">Fermé</span>
                                        ) : (
                                            `${hours.open} - ${hours.close}`
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                  
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
ProfileCard.displayName = "ProfileCard";