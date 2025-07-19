import { SVGProps } from 'react';

// Types pour les boutons
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonWithSvgProps extends ButtonProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Types pour les cartes
export interface GoogleReview {
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

export interface GoogleAvisCardProps {
  review: GoogleReview;
  className?: string;
}

export interface GoogleAvisListProps {
  reviews: GoogleReview[];
  maxReviews?: number;
  className?: string;
}

// Types pour les carrousels
export interface GoogleAvisCarouselProps {
  reviews: GoogleReview[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

// Types pour les activités dans les carrousels
export interface ActivityLink {
  href: string;
  label: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
  links: ActivityLink[];
}

// Types pour les barres de navigation
export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavItemsProps {
  children: React.ReactNode;
  className?: string;
}

export interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

export interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
}

// Types pour les sections
export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// Types pour les SVG
export interface MarkerLineSvgProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

// Types pour les switches
export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

// Types pour les textes rotatifs
export interface RotatingTextRef {
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

export interface RotatingTextProps {
  words: string[];
  duration?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

// Types pour les bannières
export interface BannerServicesProps {
  activities: Activity[];
  className?: string;
}

// Types pour les providers
export interface QueryProviderProps {
  children: React.ReactNode;
} 