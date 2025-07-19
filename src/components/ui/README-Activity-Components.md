# Composants d'Activité

Ce document décrit les composants créés pour afficher les détails des activités, leurs formules et leurs lieux de pratique.

## Composants Disponibles

### 1. ActivityDetails
Composant wrapper principal qui combine `ActivityFormulas` et `ActivitySpots`.

**Props:**
- `activityName: string` - Nom de l'activité à afficher

**Utilisation:**
```tsx
import { ActivityFormulas, ActivitySpots } from '@/components/ui';

// Avec conditions de tarif réduit
<ActivityFormulas 
    activityName="Canyoning" 
    reducedPriceConditions="Tarif réduit applicable pour les enfants de moins de 12 ans, les étudiants et les groupes de plus de 6 personnes."
/>

// Spots de pratique
<ActivitySpots activityName="Canyoning" />
```

### 2. ActivityFormulas
Affiche les formules disponibles pour une activité (demi-journée et/ou journée complète) avec un design moderne et attractif.

**Props:**
- `activityName: string` - Nom de l'activité
- `reducedPriceConditions?: string` - Conditions pour le tarif réduit (optionnel)

**Fonctionnalités:**
- Récupération automatique des données via `useActivities`
- Design moderne avec icônes et cartes stylisées
- Affichage des prix (standard et réduit), durées, âge minimum et nombre de participants
- Badge "Populaire" pour la formule journée complète
- Section d'information pour les conditions de tarif réduit
- Boutons de réservation avec liens vers le formulaire
- Gestion des états de chargement et d'erreur
- Animations et effets de survol

### 3. ActivitySpots
Affiche les lieux où une activité est pratiquée.

**Props:**
- `activityName: string` - Nom de l'activité
- `activities?: IActivity[]` - Liste des activités (optionnel, utilisé pour trouver l'ID de l'activité)

**Fonctionnalités:**
- Récupération automatique des données via `useSpots`
- Filtrage des spots selon l'activité
- Affichage des photos, descriptions et points de rendez-vous
- Boutons d'action (voir sur la carte, réserver)

## Hooks Utilisés

### useActivities
Hook pour récupérer toutes les activités depuis l'API.

```tsx
const { data: activities, isLoading, error } = useActivities();
```

### useSpots
Hook pour récupérer tous les spots depuis l'API.

```tsx
const { data: spots, isLoading, error } = useSpots();
```

## Structure des Données

### IActivity
```typescript
interface IActivity {
  _id: string;
  name: string;
  description: string;
  price_half_day: IPriceInfo;
  price_full_day: IPriceInfo;
  duration: IDurationInfo;
  half_day: boolean;
  full_day: boolean;
  min_age: number;
  max_OfPeople: number;
  min_OfPeople: number;
  required_equipment: string | null;
}
```

### ISpot
```typescript
interface ISpot {
  _id: string;
  name: string;
  description: string;
  practicedActivities: PracticedActivity[];
  photo: string;
  gpsCoordinates: string;
  meetingPoint: IMeetingPoint;
}
```

## Utilisation dans les Pages d'Activité

Chaque page d'activité peut maintenant utiliser les composants `ActivityFormulas` et `ActivitySpots` pour afficher :

1. **Les formules disponibles** avec leurs prix, conditions et détails
2. **Les lieux de pratique** avec leurs informations

### Exemple d'implémentation

```tsx
import { ActivityFormulas, ActivitySpots } from '@/components/ui';

const CanyoningPage = () => {
  return (
    <section className="flex flex-col gap-16 items-center">
      {/* Hero section */}
      <aside className="relative w-full h-full min-h-[800px] overflow-x-clip mb-16">
        {/* ... contenu hero ... */}
      </aside>

      {/* Description */}
      <article className="w-full flex flex-col gap-6 px-16 items-center">
        {/* ... contenu description ... */}
      </article>

      {/* Carrousel */}
      <div className="w-full flex flex-col gap-6 items-center min-h-[500px] relative">
        {/* ... contenu carrousel ... */}
      </div>

      {/* Formules avec conditions de tarif réduit */}
      <div className="w-full flex flex-col gap-6 px-16 items-center">
        <h2>Deux formules selon ton envie</h2>
        <ActivityFormulas 
            activityName="Canyoning" 
            reducedPriceConditions="Tarif réduit applicable pour les enfants de moins de 12 ans, les étudiants et les groupes de plus de 6 personnes."
        />
      </div>

      {/* Spots de pratique */}
      <ActivitySpots activityName="Canyoning" />

      {/* Informations complémentaires */}
      <article className="w-full flex flex-col gap-6 px-16">
        {/* ... contenu informations ... */}
      </article>
    </section>
  );
};
```

## Gestion des Erreurs

Tous les composants gèrent automatiquement :
- **État de chargement** : Affichage d'un spinner
- **Erreurs API** : Affichage du message d'erreur
- **Données manquantes** : Affichage d'un message approprié

## Personnalisation

Les composants utilisent les classes Tailwind CSS et peuvent être personnalisés en modifiant :
- Les classes CSS dans les composants
- Les styles via les variants des composants Button
- Les messages d'erreur et de chargement 