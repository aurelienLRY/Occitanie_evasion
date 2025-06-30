"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import GoogleAvisCard from '@/components/ui/card/googleAvis.Card';
import { GoogleReview } from '@/hooks/useGoogleReviews';

interface GoogleAvisCarouselProps {
  reviews: GoogleReview[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showPlayPause?: boolean;
  showProgressBar?: boolean;
  slidesToShow?: number;
  infinite?: boolean;
  className?: string;
  cardClassName?: string;
}

const GoogleAvisCarousel = ({
  reviews,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  showPlayPause = true,
  showProgressBar = false,
  slidesToShow = 3,
  infinite = true,
  className = "",
  cardClassName = ""
}: GoogleAvisCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = reviews.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  // Fonction pour passer au slide suivant
  const nextSlide = () => {
    if (infinite || currentIndex < maxIndex) {
      setCurrentIndex((prev) => 
        infinite 
          ? (prev + 1) % totalSlides
          : Math.min(prev + 1, maxIndex)
      );
    }
  };

  // Fonction pour passer au slide précédent
  const prevSlide = () => {
    if (infinite || currentIndex > 0) {
      setCurrentIndex((prev) => 
        infinite 
          ? (prev - 1 + totalSlides) % totalSlides
          : Math.max(prev - 1, 0)
      );
    }
  };

  // Fonction pour aller à un slide spécifique
  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Fonction pour basculer play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Gestion de l'autoplay
  useEffect(() => {
    if (autoPlay && isPlaying && !isHovered) {
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
  }, [autoPlay, isPlaying, isHovered, autoPlayInterval, currentIndex, infinite, totalSlides, maxIndex]);

  // Pause sur hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Calcul des slides visibles
  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < slidesToShow; i++) {
      const slideIndex = (currentIndex + i) % totalSlides;
      slides.push({
        review: reviews[slideIndex],
        index: slideIndex,
        originalIndex: i
      });
    }
    return slides;
  };

  const visibleSlides = getVisibleSlides();

  if (totalSlides === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-50 rounded-lg ${className}`}>
        <p className="text-gray-500">Aucun avis disponible</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden py-6 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      {showArrows && totalSlides > slidesToShow && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!infinite && currentIndex === 0}
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!infinite && currentIndex >= maxIndex}
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Conteneur des slides */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${slidesToShow}, 1fr)`
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {visibleSlides.map(({ review, index, originalIndex }) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: originalIndex * 0.1,
                  ease: "easeOut"
                }}
              >
                <GoogleAvisCard
                  review={review}
                  index={originalIndex}
                  className={cardClassName}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateurs de navigation (dots) */}
      {showDots && totalSlides > slidesToShow && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Indicateur de progression */}
      {showProgressBar && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <motion.div
              className="bg-primary h-1 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: isPlaying && !isHovered ? "100%" : "0%" }}
              transition={{ 
                duration: autoPlayInterval / 1000, 
                ease: "linear",
                repeat: isPlaying && !isHovered ? Infinity : 0
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleAvisCarousel;
