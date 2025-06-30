import { useState, useEffect } from 'react';

/**
 * Types pour les tailles d'écran basés sur les breakpoints Tailwind CSS
 */
export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Breakpoints en pixels selon la convention Tailwind CSS
 * - xs: < 640px (mobile très petit)
 * - sm: 640px - 767px (mobile)
 * - md: 768px - 1023px (tablette)
 * - lg: 1024px - 1279px (desktop petit)
 * - xl: 1280px - 1535px (desktop)
 * - 2xl: ≥ 1536px (desktop large)
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

/**
 * Hook React pour détecter la taille d'écran actuelle selon les breakpoints Tailwind
 * 
 * @returns {ScreenSize} Le type d'écran actuel ('xs', 'sm', 'md', 'lg', 'xl', '2xl')
 * 
 * @example
 * ```tsx
 * function MonComposant() {
 *   const screenSize = useScreenSize();
 *   
 *   return (
 *     <div>
 *       {screenSize === 'xs' && <MobileTinyLayout />}
 *       {screenSize === 'sm' && <MobileLayout />}
 *       {screenSize === 'md' && <TabletLayout />}
 *       {screenSize === 'lg' && <DesktopSmallLayout />}
 *       {screenSize === 'xl' && <DesktopLayout />}
 *       {screenSize === '2xl' && <DesktopLargeLayout />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>('xl');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.sm) {
        setScreenSize('xs');
      } else if (width < BREAKPOINTS.md) {
        setScreenSize('sm');
      } else if (width < BREAKPOINTS.lg) {
        setScreenSize('md');
      } else if (width < BREAKPOINTS.xl) {
        setScreenSize('lg');
      } else if (width < BREAKPOINTS['2xl']) {
        setScreenSize('xl');
      } else {
        setScreenSize('2xl');
      }
    };

    // Initialisation
    updateScreenSize();

    // Écouter les changements de taille d'écran
    window.addEventListener('resize', updateScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

/**
 * Hook pour obtenir la largeur actuelle de l'écran en pixels
 * 
 * @returns {number} La largeur de l'écran en pixels
 * 
 * @example
 * ```tsx
 * function MonComposant() {
 *   const width = useScreenWidth();
 *   
 *   return <div>Largeur de l'écran: {width}px</div>;
 * }
 * ```
 */
export function useScreenWidth(): number {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
}

/**
 * Hook pour obtenir toutes les informations sur l'écran en une fois
 * 
 * @returns {Object} Objet contenant toutes les informations d'écran
 * @returns {ScreenSize} returns.screenSize - Le type d'écran actuel
 * @returns {number} returns.width - La largeur de l'écran en pixels
 * @returns {boolean} returns.isXs - True si l'écran est très petit (< 640px)
 * @returns {boolean} returns.isSm - True si l'écran est petit (640px - 767px)
 * @returns {boolean} returns.isMd - True si l'écran est moyen (768px - 1023px)
 * @returns {boolean} returns.isLg - True si l'écran est grand (1024px - 1279px)
 * @returns {boolean} returns.isXl - True si l'écran est très grand (1280px - 1535px)
 * @returns {boolean} returns.is2xl - True si l'écran est extra large (≥ 1536px)
 * @returns {boolean} returns.isMobile - True si l'écran est mobile (xs ou sm)
 * @returns {boolean} returns.isTablet - True si l'écran est tablette (md)
 * @returns {boolean} returns.isDesktop - True si l'écran est desktop (lg, xl, 2xl)
 * 
 * @example
 * ```tsx
 * function MonComposant() {
 *   const { screenSize, width, isMobile, isTablet, isDesktop } = useScreenInfo();
 *   
 *   return (
 *     <div>
 *       <p>Type: {screenSize}</p>
 *       <p>Largeur: {width}px</p>
 *       <p>Est mobile: {isMobile ? 'Oui' : 'Non'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useScreenInfo() {
  const screenSize = useScreenSize();
  const width = useScreenWidth();

  return {
    screenSize,
    width,
    isXs: screenSize === 'xs',
    isSm: screenSize === 'sm',
    isMd: screenSize === 'md',
    isLg: screenSize === 'lg',
    isXl: screenSize === 'xl',
    is2xl: screenSize === '2xl',
    isMobile: screenSize === 'xs' || screenSize === 'sm',
    isTablet: screenSize === 'md',
    isDesktop: screenSize === 'lg' || screenSize === 'xl' || screenSize === '2xl'
  };
}

/**
 * Fonction utilitaire pour détecter le type d'écran de manière synchrone
 * ⚠️ Fonctionne uniquement côté client (retourne 'xl' côté serveur)
 * 
 * @returns {ScreenSize} Le type d'écran actuel selon les breakpoints Tailwind
 * 
 * @example
 * ```tsx
 * const screenType = getScreenSize(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 * ```
 */
export function getScreenSize(): ScreenSize {
  if (typeof window === 'undefined') {
    return 'xl'; // Fallback pour SSR
  }

  const width = window.innerWidth;
  
  if (width < BREAKPOINTS.sm) {
    return 'xs';
  } else if (width < BREAKPOINTS.md) {
    return 'sm';
  } else if (width < BREAKPOINTS.lg) {
    return 'md';
  } else if (width < BREAKPOINTS.xl) {
    return 'lg';
  } else if (width < BREAKPOINTS['2xl']) {
    return 'xl';
  } else {
    return '2xl';
  }
}

/**
 * Vérifie si l'écran actuel est très petit (xs)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est très petit (< 640px)
 * 
 * @example
 * ```tsx
 * if (isXs()) {
 *   // Logique pour très petits écrans
 * }
 * ```
 */
export function isXs(): boolean {
  return getScreenSize() === 'xs';
}

/**
 * Vérifie si l'écran actuel est petit (sm)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est petit (640px - 767px)
 * 
 * @example
 * ```tsx
 * if (isSm()) {
 *   // Logique pour petits écrans
 * }
 * ```
 */
export function isSm(): boolean {
  return getScreenSize() === 'sm';
}

/**
 * Vérifie si l'écran actuel est moyen (md)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est moyen (768px - 1023px)
 * 
 * @example
 * ```tsx
 * if (isMd()) {
 *   // Logique pour écrans moyens
 * }
 * ```
 */
export function isMd(): boolean {
  return getScreenSize() === 'md';
}

/**
 * Vérifie si l'écran actuel est grand (lg)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est grand (1024px - 1279px)
 * 
 * @example
 * ```tsx
 * if (isLg()) {
 *   // Logique pour grands écrans
 * }
 * ```
 */
export function isLg(): boolean {
  return getScreenSize() === 'lg';
}

/**
 * Vérifie si l'écran actuel est très grand (xl)
 * ⚠️ Fonctionne uniquement côté client (retourne true côté serveur)
 * 
 * @returns {boolean} True si l'écran est très grand (1280px - 1535px)
 * 
 * @example
 * ```tsx
 * if (isXl()) {
 *   // Logique pour très grands écrans
 * }
 * ```
 */
export function isXl(): boolean {
  return getScreenSize() === 'xl';
}

/**
 * Vérifie si l'écran actuel est extra large (2xl)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est extra large (≥ 1536px)
 * 
 * @example
 * ```tsx
 * if (is2xl()) {
 *   // Logique pour écrans extra larges
 * }
 * ```
 */
export function is2xl(): boolean {
  return getScreenSize() === '2xl';
}

/**
 * Vérifie si l'écran actuel est mobile (xs ou sm)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est mobile (< 768px)
 * 
 * @example
 * ```tsx
 * if (isMobile()) {
 *   // Logique pour mobile
 * }
 * ```
 */
export function isMobile(): boolean {
  const size = getScreenSize();
  return size === 'xs' || size === 'sm';
}

/**
 * Vérifie si l'écran actuel est tablette (md)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est tablette (768px - 1023px)
 * 
 * @example
 * ```tsx
 * if (isTablet()) {
 *   // Logique pour tablette
 * }
 * ```
 */
export function isTablet(): boolean {
  return getScreenSize() === 'md';
}

/**
 * Vérifie si l'écran actuel est desktop (lg, xl, 2xl)
 * ⚠️ Fonctionne uniquement côté client (retourne true côté serveur)
 * 
 * @returns {boolean} True si l'écran est desktop (≥ 1024px)
 * 
 * @example
 * ```tsx
 * if (isDesktop()) {
 *   // Logique pour desktop
 * }
 * ```
 */
export function isDesktop(): boolean {
  const size = getScreenSize();
  return size === 'lg' || size === 'xl' || size === '2xl';
}

/**
 * Vérifie si l'écran actuel est mobile ou tablette
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est mobile ou tablette (< 1024px)
 * 
 * @example
 * ```tsx
 * if (isMobileOrTablet()) {
 *   // Logique pour mobile et tablette
 *   // Par exemple, masquer certains éléments sur petits écrans
 * }
 * ```
 */
export function isMobileOrTablet(): boolean {
  const size = getScreenSize();
  return size === 'xs' || size === 'sm' || size === 'md';
} 