// Point d'entrée pour tous les types de l'application
// Exporte tous les types organisés par catégorie

// Types API (activités, spots, sessions)
export * from './api.types';

// Types de réservation
export * from './reservation.types';

// Types de profil
export * from './profile.types';

// Types communs
export * from './common.types';

// Ré-exports pour compatibilité (anciens noms)
// Ces exports seront supprimés une fois que tous les imports auront été mis à jour
export type {
  // API Types
  PracticedActivity,
  IMeetingPoint,
  IPriceInfo,
  IDurationInfo,
  IActivityDetails,
  ISpot,
  IActivity,
  ISession,
} from './api.types';

export type {
  // Common Types
  SocialMedia,
  ContactInfo,
  BusinessHours,
  SelectOption,
  ApiResponse,
  LoadingState,
  Coordinates,
  ImageInfo,
} from './common.types';

export type {
  // Profile Types
  ProfileCardProps,
  UserProfile,
  BusinessProfile,
} from './profile.types';

export type {
  // Reservation Types
  IParticipant,
  ICustomer,
  IReservationSession,
  IBooking,
  ReservationFormData,
  ReservationStatus,
  ReservationType,
} from './reservation.types';

// Nouveaux types organisés
export type {
  // UI Types
  ButtonProps,
  ButtonWithSvgProps,
  GoogleReview,
  GoogleAvisCardProps,
  GoogleAvisListProps,
  GoogleAvisCarouselProps,
  ActivityLink,
  Activity,
  NavbarProps,
  NavBodyProps,
  NavItemsProps,
  MobileNavProps,
  MobileNavHeaderProps,
  MobileNavMenuProps,
  SectionProps,
  MarkerLineSvgProps,
  SwitchProps,
  RotatingTextRef,
  RotatingTextProps,
  BannerServicesProps,
  QueryProviderProps,
} from './ui.types';

export type {
  // Input Types
  TInputBase,
  InputProps,
  SelectInputProps,
  TextareaProps,
  DateInputProps,
  TimeInputProps,
  NumberInputProps,
} from './input.types';

export type {
  // Hook Types
  GooglePlaceData,
  UseGoogleReviewsProps,
  UseGoogleReviewsReturn,
  ScreenSize,
  ScreenInfo,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationResult,
} from './hooks.types';

export type {
  // Form Types
  ContactFormData,
  ActivityFormData,
  SpotFormData,
  ValidationError,
  FormErrors,
  FormState,
  FormCallbacks,
} from './form.types';
  