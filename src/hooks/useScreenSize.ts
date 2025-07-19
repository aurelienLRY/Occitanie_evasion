"use client"
import { useState, useEffect } from 'react';
import { ScreenSize, ScreenInfo } from '@/types';

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
export function useScreenInfo(): ScreenInfo {
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
 *   // Logique pour écran très petit
 * }
 * ```
 */
export function isXs(): boolean {
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  return window.innerWidth < BREAKPOINTS.sm;
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
 *   // Logique pour écran petit
 * }
 * ```
 */
export function isSm(): boolean {
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  const width = window.innerWidth;
  return width >= BREAKPOINTS.sm && width < BREAKPOINTS.md;
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
 *   // Logique pour écran moyen
 * }
 * ```
 */
export function isMd(): boolean {
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  const width = window.innerWidth;
  return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
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
 *   // Logique pour écran grand
 * }
 * ```
 */
export function isLg(): boolean {
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  const width = window.innerWidth;
  return width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl;
}

/**
 * Vérifie si l'écran actuel est très grand (xl)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est très grand (1280px - 1535px)
 * 
 * @example
 * ```tsx
 * if (isXl()) {
 *   // Logique pour écran très grand
 * }
 * ```
 */
export function isXl(): boolean {
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  const width = window.innerWidth;
  return width >= BREAKPOINTS.xl && width < BREAKPOINTS['2xl'];
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
 *   // Logique pour écran extra large
 * }
 * ```
 */
export function is2xl(): boolean {
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  return window.innerWidth >= BREAKPOINTS['2xl'];
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
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  return window.innerWidth < BREAKPOINTS.md;
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
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  const width = window.innerWidth;
  return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
}

/**
 * Vérifie si l'écran actuel est desktop (lg, xl, 2xl)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
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
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  return window.innerWidth >= BREAKPOINTS.lg;
}

/**
 * Vérifie si l'écran actuel est mobile ou tablette (xs, sm, md)
 * ⚠️ Fonctionne uniquement côté client (retourne false côté serveur)
 * 
 * @returns {boolean} True si l'écran est mobile ou tablette (< 1024px)
 * 
 * @example
 * ```tsx
 * if (isMobileOrTablet()) {
 *   // Logique pour mobile ou tablette
 * }
 * ```
 */
export function isMobileOrTablet(): boolean {
  if (typeof window === 'undefined') {
    return false; // Fallback pour SSR
  }
  return window.innerWidth < BREAKPOINTS.lg;
} 