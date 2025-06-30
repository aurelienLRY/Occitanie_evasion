"use client";

import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import Image from 'next/image';

// Types pour les avis Google
interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated?: boolean;
  language?: string;
}

interface GoogleAvisCardProps {
  review: GoogleReview;
  index?: number;
  className?: string;
}

const GoogleAvisCard = ({ review, index = 0, className = "" }: GoogleAvisCardProps) => {
  // Fonction pour générer les étoiles
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  // Fonction pour tronquer le texte
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      {/* En-tête avec photo de profil et nom */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          {review.profile_photo_url ? (
            <Image
              src={review.profile_photo_url}
              alt={review.author_name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              width={48}
              height={48}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm ${review.profile_photo_url ? 'hidden' : ''}`}>
            <User className="w-6 h-6" />
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-gray-900 ">
            {review.author_name}
          </h4>
          <p className="text-gray-500 text-xs">
            {review.relative_time_description}
          </p>
        </div>
      </div>

      {/* Note avec étoiles */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {renderStars(review.rating)}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {review.rating}/5
        </span>
      </div>

      {/* Contenu de l'avis */}
      <div className="relative">
        <Quote className="absolute -top-2 -left-1 w-6 h-6 text-gray-300" />
        <blockquote className="text-gray-700 text-sm leading-relaxed pl-6">
          {truncateText(review.text)}
        </blockquote>
      </div>

      {/* Badge de langue si traduit */}
      {review.translated && (
        <div className="mt-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Traduit
          </span>
        </div>
      )}

      {/* Lien vers Google */}
      {review.author_url && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <a
            href={review.author_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            Voir sur Google
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </a>
        </div>
      )}
    </motion.div>
  );
};

// Composant pour afficher plusieurs avis
interface GoogleAvisListProps {
  reviews: GoogleReview[];
  maxReviews?: number;
  className?: string;
}

export const GoogleAvisList = ({ reviews, maxReviews = 6, className = "" }: GoogleAvisListProps) => {
  const displayedReviews = reviews.slice(0, maxReviews);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {displayedReviews.map((review, index) => (
        <GoogleAvisCard
          key={review.id}
          review={review}
          index={index}
        />
      ))}
    </div>
  );
};

export default GoogleAvisCard;
GoogleAvisCard.displayName = "GoogleAvisCard";
