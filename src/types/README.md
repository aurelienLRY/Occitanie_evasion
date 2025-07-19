# Organisation des Types TypeScript

Ce dossier contient tous les types TypeScript utilisés dans l'application, organisés de manière modulaire et logique.

## Structure des fichiers

### 📁 Types principaux

- **`api.types.ts`** - Types liés aux API et données externes
  - `PracticedActivity` - Activité pratiquée
  - `IMeetingPoint` - Point de rendez-vous
  - `IPriceInfo` - Informations de prix
  - `IDurationInfo` - Informations de durée
  - `IActivityDetails` - Détails d'activité
  - `ISpot` - Lieu d'activité
  - `IActivity` - Activité complète
  - `ISession` - Session d'activité

- **`common.types.ts`** - Types communs et utilitaires
  - `SocialMedia` - Réseaux sociaux
  - `ContactInfo` - Informations de contact
  - `BusinessHours` - Horaires d'ouverture
  - `SelectOption` - Option de sélection
  - `ApiResponse<T>` - Réponse d'API générique
  - `LoadingState` - État de chargement
  - `Coordinates` - Coordonnées géographiques
  - `ImageInfo` - Informations d'image

- **`profile.types.ts`** - Types liés aux profils utilisateur
  - `ProfileCardProps` - Props pour les cartes de profil
  - `UserProfile` - Profil utilisateur
  - `BusinessProfile` - Profil entreprise

- **`reservation.types.ts`** - Types liés aux réservations
  - `IParticipant` - Participant à une activité
  - `ICustomer` - Client
  - `IReservationSession` - Session de réservation
  - `IBooking` - Réservation complète
  - `ReservationFormData` - Données du formulaire de réservation
  - `ReservationStatus` - Statut de réservation
  - `ReservationType` - Type de réservation

### 📁 Types spécialisés

- **`ui.types.ts`** - Types pour les composants UI
  - `ButtonProps`, `ButtonWithSvgProps` - Boutons
  - `GoogleReview`, `GoogleAvisCardProps` - Avis Google
  - `ActivityLink`, `Activity` - Activités dans les carrousels
  - `NavbarProps`, `MobileNavProps` - Navigation
  - `SectionProps` - Sections
  - `SwitchProps`, `RotatingTextProps` - Composants divers

- **`input.types.ts`** - Types pour les composants d'input
  - `TInputBase` - Type de base pour tous les inputs
  - `InputProps` - Input texte
  - `SelectInputProps` - Input de sélection
  - `TextareaProps` - Zone de texte
  - `DateInputProps` - Input de date
  - `TimeInputProps` - Input d'heure
  - `NumberInputProps` - Input numérique

- **`hooks.types.ts`** - Types pour les hooks personnalisés
  - `GooglePlaceData`, `UseGoogleReviewsProps` - Hook Google Reviews
  - `ScreenSize`, `ScreenInfo` - Hook taille d'écran
  - `UseQueryOptions`, `UseMutationOptions` - Hooks de requête

- **`form.types.ts`** - Types pour les formulaires
  - `ContactFormData` - Formulaire de contact
  - `ActivityFormData`, `SpotFormData` - Données transformées
  - `ValidationError`, `FormErrors` - Erreurs de validation
  - `FormState`, `FormCallbacks` - États et callbacks

### 📁 Fichier d'index

- **`index.ts`** - Point d'entrée centralisé
  - Exporte tous les types organisés par catégorie
  - Maintient la compatibilité avec l'ancienne structure
  - Permet l'import depuis `@/types`

## Utilisation

### Import depuis le point d'entrée
```typescript
import { 
  IActivity, 
  ButtonProps, 
  InputProps,
  ScreenSize 
} from '@/types';
```

### Import direct depuis un fichier spécifique
```typescript
import { IActivity } from '@/types/api.types';
import { ButtonProps } from '@/types/ui.types';
```

## Migration depuis l'ancienne structure

Les types sont maintenant organisés de manière plus logique et modulaire. L'ancienne structure est maintenue via des ré-exports dans `index.ts` pour assurer la compatibilité.

### Avant
```typescript
// Types dispersés dans différents fichiers
interface ButtonProps { ... } // dans Button.tsx
type ScreenSize = ... // dans useScreenSize.ts
```

### Après
```typescript
// Types centralisés et organisés
import { ButtonProps, ScreenSize } from '@/types';
```

## Bonnes pratiques

1. **Organisation logique** : Les types sont regroupés par domaine fonctionnel
2. **Réutilisabilité** : Les types communs sont dans `common.types.ts`
3. **Spécialisation** : Les types spécifiques ont leurs propres fichiers
4. **Compatibilité** : L'ancienne structure est maintenue via des ré-exports
5. **Documentation** : Chaque type est documenté avec des commentaires JSDoc

## Ajout de nouveaux types

1. Identifier le domaine fonctionnel du type
2. Ajouter le type dans le fichier approprié
3. Exporter le type dans `index.ts`
4. Documenter le type avec des commentaires JSDoc
5. Mettre à jour ce README si nécessaire 