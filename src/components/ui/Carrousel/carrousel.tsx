"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { MarkerLineSvg } from '@/components/ui/svg/MarkerLine.svg';

interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showPlayPause?: boolean;
  showProgressBar?: boolean;
  slidesToShow?: number;
  infinite?: boolean;
  className?: string;
  slideClassName?: string;
  markerLineSvg?: boolean;
  markerLineSvgColor?: string;
}
/**
 * Carousel component
   
 * @param children : ReactNode
 * @param autoPlay : boolean - Lecture automatique (défaut: true)
 * @param autoPlayInterval : number - Intervalle de lecture automatique (défaut: 5000ms)
 * @param showDots : boolean - Afficher les points de navigation (défaut: true)
 * @param showArrows : boolean - Afficher les flèches de navigation (défaut: true)
 * @param showPlayPause : boolean - Afficher le bouton de lecture/pause (défaut: true)
 * @param showProgressBar : boolean - Afficher la barre de progression (défaut: false)
 * @param slidesToShow : number - Nombre de slides à afficher (défaut: 3)
 * @param infinite : boolean - Lecture infinie (défaut: true)
 * @param className : string - Classes CSS pour le conteneur (défaut: "")
 * @param slideClassName : string - Classes CSS pour les slides (défaut: "")
 * @param markerLineSvg : boolean - Afficher des marqueurs SVG en haut et en bas du carousel (défaut: false)
 * @param markerLineSvgColor : string - Couleur des marqueurs SVG (défaut: "currentColor")
 * 
 * @example
 * <Carousel 
   slidesToShow={2}
   autoPlay={false}
   showProgressBar={true}
   markerLineSvg={true}
   markerLineSvgColor="#3B82F6"
   className="my-custom-carousel">
   <img src="/image1.jpg" alt="Image 1" />
   <img src="/image2.jpg" alt="Image 2" />
   <img src="/image3.jpg" alt="Image 3" />
 </Carousel>
 */
const Carousel = ({
  children,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  showPlayPause = true,
  showProgressBar = false,
  slidesToShow = 3,
  infinite = true,
  className = "",
  slideClassName = "",
  markerLineSvg = false,
  markerLineSvgColor = "currentColor"
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Convertir les enfants en tableau
  const slides = Array.isArray(children) ? children : [children];
  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  // Fonction pour passer au slide suivant
  const nextSlide = useCallback(() => {
    if (infinite || currentIndex < maxIndex) {
      setCurrentIndex((prev) => 
        infinite 
          ? (prev + 1) % totalSlides
          : Math.min(prev + 1, maxIndex)
      );
    }
  }, [infinite, currentIndex, maxIndex, totalSlides]);

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
  }, [autoPlay, isPlaying, isHovered, autoPlayInterval, currentIndex, infinite, totalSlides, maxIndex, nextSlide]);

  // Pause sur hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Calcul des slides visibles
  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = 0; i < slidesToShow; i++) {
      const slideIndex = (currentIndex + i) % totalSlides;
      visibleSlides.push({
        slide: slides[slideIndex],
        index: slideIndex,
        originalIndex: i
      });
    }
    return visibleSlides;
  };

  const visibleSlides = getVisibleSlides();

  if (totalSlides === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-50 rounded-lg ${className}`}>
        <p className="text-gray-500">Aucun contenu disponible</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden py-6 overflow-x-clip ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Marqueur SVG en haut */}
      {markerLineSvg && (
        <MarkerLineSvg 
          color={markerLineSvgColor}
          className="w-[130vw] h-24 absolute -top-6 left-1/2 -translate-x-1/2  z-50"
          preserveAspectRatio="none"
        />
      )}
      
      {/* Marqueur SVG en bas */}
      {markerLineSvg && (
        <MarkerLineSvg 
          color={markerLineSvgColor}
          className="w-[130vw] h-24 absolute -bottom-1 left-1/2 -translate-x-1/2  rotate-180 z-50"
          preserveAspectRatio="none"
        />
      )}
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
            {visibleSlides.map(({ slide, index, originalIndex }) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                className={`relative ${slideClassName}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: originalIndex * 0.1,
                  ease: "easeOut"
                }}
              >
                {slide}
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

export default Carousel;
