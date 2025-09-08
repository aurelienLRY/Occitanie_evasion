import { useState, useRef, useCallback, useEffect } from 'react';

interface TooltipPosition {
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  className: string;
}

export const useTooltipPosition = () => {
  const [tooltipPositions, setTooltipPositions] = useState<Record<string, TooltipPosition>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isCalculating = useRef<Set<string>>(new Set());

  const calculatePosition = useCallback((buttonId: string, buttonElement: HTMLButtonElement): TooltipPosition => {
    if (!buttonElement) {
      return {
        position: 'top-center',
        className: 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-blue-900 text-white text-xs rounded-lg shadow-lg z-10 max-w-[200px] sm:max-w-[250px] break-words'
      };
    }

    const rect = buttonElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Espace disponible de chaque côté
    const spaceLeft = rect.left;
    const spaceRight = viewportWidth - rect.right;
    const spaceTop = rect.top;
    
    // Largeur estimée du tooltip (en fonction de la longueur du texte)
    const estimatedTooltipWidth = Math.min(200, Math.max(120, rect.width * 2));
    const estimatedTooltipHeight = 60; // Hauteur estimée
    
    let position: TooltipPosition['position'] = 'top-center';
    let className = 'absolute px-3 py-2 bg-blue-900 text-white text-xs rounded-lg shadow-lg z-10 break-words';
    
    // Déterminer la position verticale
    if (spaceTop >= estimatedTooltipHeight + 10) {
      // Position au-dessus
      className += ' bottom-full mb-2';
      
      // Déterminer la position horizontale
      if (spaceLeft >= estimatedTooltipWidth / 2 && spaceRight >= estimatedTooltipWidth / 2) {
        // Centré
        position = 'top-center';
        className += ' left-1/2 transform -translate-x-1/2';
      } else if (spaceRight >= estimatedTooltipWidth) {
        // Aligné à droite
        position = 'top-right';
        className += ' right-0';
      } else {
        // Aligné à gauche
        position = 'top-left';
        className += ' left-0';
      }
    } else {
      // Position en dessous
      className += ' top-full mt-2';
      
      // Déterminer la position horizontale
      if (spaceLeft >= estimatedTooltipWidth / 2 && spaceRight >= estimatedTooltipWidth / 2) {
        // Centré
        position = 'bottom-center';
        className += ' left-1/2 transform -translate-x-1/2';
      } else if (spaceRight >= estimatedTooltipWidth) {
        // Aligné à droite
        position = 'bottom-right';
        className += ' right-0';
      } else {
        // Aligné à gauche
        position = 'bottom-left';
        className += ' left-0';
      }
    }
    
    // Ajuster la largeur maximale selon l'espace disponible
    const maxWidth = Math.min(estimatedTooltipWidth, Math.max(spaceLeft, spaceRight) * 2);
    className += ` max-w-[${Math.floor(maxWidth)}px]`;
    
    // Classes responsive pour desktop
    className += ' sm:max-w-[250px]';
    
    return { position, className };
  }, []);

  const updateTooltipPosition = useCallback((buttonId: string) => {
    // Éviter les calculs multiples simultanés pour le même bouton
    if (isCalculating.current.has(buttonId)) {
      return;
    }

    const buttonElement = buttonRefs.current[buttonId];
    if (buttonElement) {
      isCalculating.current.add(buttonId);
      
      // Utiliser requestAnimationFrame pour éviter les mises à jour synchrones
      requestAnimationFrame(() => {
        const newPosition = calculatePosition(buttonId, buttonElement);
        setTooltipPositions(prev => {
          // Vérifier si la position a vraiment changé pour éviter les re-renders inutiles
          const currentPosition = prev[buttonId];
          if (currentPosition && currentPosition.className === newPosition.className) {
            isCalculating.current.delete(buttonId);
            return prev;
          }
          
          isCalculating.current.delete(buttonId);
          return {
            ...prev,
            [buttonId]: newPosition
          };
        });
      });
    }
  }, [calculatePosition]);

  const registerButton = useCallback((buttonId: string, buttonElement: HTMLButtonElement | null) => {
    buttonRefs.current[buttonId] = buttonElement;
    // Ne pas appeler updateTooltipPosition immédiatement dans registerButton
    // pour éviter la boucle infinie
  }, []);

  // Recalculer les positions lors du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      Object.keys(buttonRefs.current).forEach(buttonId => {
        updateTooltipPosition(buttonId);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateTooltipPosition]);

  // Calculer les positions après le montage des boutons
  useEffect(() => {
    Object.keys(buttonRefs.current).forEach(buttonId => {
      if (buttonRefs.current[buttonId]) {
        updateTooltipPosition(buttonId);
      }
    });
  }, [updateTooltipPosition]);

  const getTooltipClassName = useCallback((buttonId: string): string => {
    return tooltipPositions[buttonId]?.className || 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-blue-900 text-white text-xs rounded-lg shadow-lg z-10 max-w-[200px] sm:max-w-[250px] break-words';
  }, [tooltipPositions]);

  return {
    registerButton,
    getTooltipClassName,
    updateTooltipPosition
  };
};
