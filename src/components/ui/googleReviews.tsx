"use client";

import { ReactGoogleReviews, ReactGoogleReview } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import { motion } from 'framer-motion';
import { Star, Quote, User, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

// Interface d'adaptation pour nos cartes personnalisées
interface CustomReviewCard {
  reviewId: string | null;
  reviewer: {
    profilePhotoUrl: string;
    displayName: string;
    isAnonymous: boolean;
  };
  starRating: number;
  comment: string;
  createTime: string | null;
  updateTime: string | null;
  reviewReply?: {
    comment: string;
    updateTime: string;
  } | null;
}

interface GoogleReviewsProps {
  featurableId?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showPlayPause?: boolean;
  slidesToShow?: number;
  infinite?: boolean;
}

const GoogleReviews = ({
  featurableId = "example",
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  showPlayPause = true,
  slidesToShow = 3,
  infinite = true
}: GoogleReviewsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [reviews, setReviews] = useState<CustomReviewCard[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour calculer la note moyenne
  const calculateAverageRating = (reviews: CustomReviewCard[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.starRating, 0);
    return totalRating / reviews.length;
  };

  // Fonction pour générer les étoiles
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating
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

  // Fonction pour formater la date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Récemment";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
    return `Il y a ${Math.floor(diffDays / 365)} ans`;
  };

  // Fonction pour passer au slide suivant
  const nextSlide = useCallback(() => {
    if (infinite || currentIndex < Math.max(0, reviews.length - slidesToShow)) {
      setCurrentIndex((prev) =>
        infinite
          ? (prev + slidesToShow) % reviews.length
          : Math.min(prev + slidesToShow, Math.max(0, reviews.length - slidesToShow))
      );
    }
  }, [infinite, currentIndex, reviews.length, slidesToShow]);

  // Fonction pour passer au slide précédent
  const prevSlide = () => {
    if (infinite || currentIndex > 0) {
      setCurrentIndex((prev) =>
        infinite
          ? (prev - slidesToShow + reviews.length) % reviews.length
          : Math.max(prev - slidesToShow, 0)
      );
    }
  };

  // Fonction pour aller à un slide spécifique
  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, Math.max(0, reviews.length - slidesToShow)));
  };

  // Fonction pour basculer play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Gestion de l'autoplay
  useEffect(() => {
    if (autoPlay && isPlaying && reviews.length > 0) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPlaying, autoPlayInterval, currentIndex, infinite, reviews.length, slidesToShow, nextSlide]);

  // Calcul des slides visibles
  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < slidesToShow; i++) {
      const slideIndex = (currentIndex + i) % reviews.length;
      slides.push({
        review: reviews[slideIndex],
        index: slideIndex,
        originalIndex: i
      });
    }
    return slides;
  };

  // Composant de carte personnalisée
  const CustomReviewCard = ({ review, index = 0 }: { review: CustomReviewCard; index?: number }) => {
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
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        layout
      >
        {/* En-tête avec photo de profil et nom */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            {review.reviewer.profilePhotoUrl ? (
              <Image
                src={review.reviewer.profilePhotoUrl}
                alt={review.reviewer.displayName}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                width={48}
                height={48}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) :
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm ${review.reviewer.profilePhotoUrl ? 'hidden' : ''}`}>
                <User className="w-6 h-6" />
              </div> }
          </div>

          <div className="flex-1">
            <h4 className="text-xl font-semibold text-gray-900">
              {review.reviewer.displayName}
            </h4>
            <p className="text-gray-500 text-xs">
              {formatDate(review.createTime)}
            </p>
          </div>
        </div>

        {/* Note avec étoiles */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {renderStars(review.starRating)}
          </div>
          <span className="text-sm font-medium text-gray-500">
            {review.starRating}/5
          </span>
        </div>

        {/* Contenu de l'avis */}
        <div className="relative">
          <Quote className="absolute -top-2 -left-1 w-6 h-6 text-gray-300" />
          <blockquote className="text-gray-700 text-sm leading-relaxed pl-6">
            {truncateText(review.comment)}
          </blockquote>
        </div>

      </motion.div>
    );
  };

  // Gestionnaire pour les avis reçus de l'API
  const handleReviewsReceived = (apiReviews: ReactGoogleReview[]) => {
    // Convertir les avis de l'API au format local
    const convertedReviews: CustomReviewCard[] = apiReviews.map((apiReview) => ({
      reviewId: apiReview.reviewId,
      reviewer: {
        profilePhotoUrl: apiReview.reviewer?.profilePhotoUrl || '',
        displayName: apiReview.reviewer?.displayName || 'Anonyme',
        isAnonymous: apiReview.reviewer?.isAnonymous || false
      },
      starRating: apiReview.starRating || 5,
      comment: apiReview.comment || '',
      createTime: apiReview.createTime || null,
      updateTime: apiReview.updateTime || null,
      reviewReply: apiReview.reviewReply || null
    }));

    setReviews(convertedReviews);
  };

  if (reviews.length === 0) {
    return (
      <div className={className}>
        <ReactGoogleReviews
          layout="custom"
          featurableId={featurableId}
          renderer={(apiReviews: ReactGoogleReview[]) => {
            handleReviewsReceived(apiReviews);
            return null; // Le renderer doit retourner un ReactNode
          }}
          errorMessage={
            <div className="text-center text-red-600 p-8">
              <p>Erreur lors du chargement des avis Google</p>
            </div>
          }
          loadingMessage={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }
          structuredData={true}
          brandName="Occitanie Évasion"
          productName="Activités de plein air"
          productDescription="Escalade, canyoning et spéléologie en Occitanie"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <ReactGoogleReviews layout="badge"
        featurableId={featurableId}

      />
      {/* Affichage de la note moyenne 
      <div className="text-center mb-8 max-w-[350px] mx-auto">
        <div className="bg-gradient-to-r from-secondary/60 to-secondary p-6 rounded-2xl shadow-lg">
          <div className="text-4xl font-bold text-white mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center items-center gap-1 ">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < Math.floor(averageRating)
                    ? 'fill-white text-white' 
                    : i < averageRating
                    ? 'fill-white/70 text-white/70'
                    : 'fill-white/30 text-white/30'
                }`}
              />
            ))}
          </div>
          <span className="text-white/90 font-semibold text-lg">Note moyenne / </span>
          <span className="text-white/70 text-sm">
            Basée sur {reviews.length} avis
          </span>
        </div>
      </div>*/}

      {/* Carrousel */}
      <div
        className="relative  p-6"
      >
        {/* Contrôles de lecture */}
        {showPlayPause && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={togglePlayPause}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-gray-700" />
              ) : (
                <Play className="w-4 h-4 text-gray-700" />
              )}
            </button>
          </div>
        )}

        {/* Flèches de navigation */}
        {showArrows && reviews.length > slidesToShow && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!infinite && currentIndex === 0}
              aria-label="Slide précédent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!infinite && currentIndex >= Math.max(0, reviews.length - slidesToShow)}
              aria-label="Slide suivant"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Conteneur des slides */}
        <div className="relative">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${slidesToShow}, 1fr)`
            }}
          >
            {getVisibleSlides().map(({ review, index, originalIndex }) => (
              <motion.div
                key={`${review.reviewId || index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: originalIndex * 0.1,
                  ease: "easeOut"
                }}
              >
                <CustomReviewCard
                  review={review}
                  index={originalIndex}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indicateurs de navigation (dots) */}
        {showDots && reviews.length > slidesToShow && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: Math.max(1, reviews.length - slidesToShow + 1) }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Aller au slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleReviews;
GoogleReviews.displayName = "GoogleReviews";
