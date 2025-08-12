# Composant Google Reviews

Ce composant utilise la bibliothèque `react-google-reviews` pour afficher les avis Google de votre entreprise sur votre site web avec un carrousel interactif.

## Installation

La dépendance est déjà installée dans le projet :
```bash
npm install react-google-reviews
```

## Configuration

### 1. Créer un compte Featurable

1. Allez sur [https://featurable.com](https://featurable.com)
2. Créez un compte gratuit
3. Créez un nouveau widget Google Reviews
4. Cliquez sur "Embed" > "API" et copiez l'ID du widget

### 2. Configurer la variable d'environnement

Ajoutez votre Featurable Widget ID dans le fichier `.env.local` :

```env
NEXT_PUBLIC_GOOGLE_REVIEWS=votre_widget_id_ici
```

### 3. Utilisation du composant

```tsx
import GoogleReviews from "@/components/ui/googleReviews";

// Utilisation simple
<GoogleReviews />

// Avec toutes les options du carrousel
<GoogleReviews 
  featurableId="votre_id"
  className="w-full max-w-4xl"
  autoPlay={true}
  autoPlayInterval={4000}
  showDots={true}
  showArrows={true}
  showPlayPause={true}
  slidesToShow={3}
  infinite={true}
/>
```

## Fonctionnalités

- **Carrousel interactif** : Navigation avec flèches, points et contrôles play/pause
- **Note moyenne calculée** : Affichage automatique de la note moyenne des avis
- **Layout personnalisé** : Utilise un layout "custom" pour maintenir le style de vos cartes existantes
- **Animations** : Intégration avec Framer Motion pour des animations fluides
- **Responsive** : Grille responsive qui s'adapte à tous les écrans
- **Gestion d'erreurs** : Messages d'erreur et de chargement personnalisés
- **SEO** : Données structurées JSON-LD pour le référencement
- **Accessibilité** : Compatible avec les standards d'accessibilité

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `featurableId` | `string` | `"example"` | ID du widget Featurable |
| `className` | `string` | `""` | Classes CSS personnalisées |
| `autoPlay` | `boolean` | `true` | Active/désactive l'autoplay |
| `autoPlayInterval` | `number` | `5000` | Intervalle entre les slides en ms |
| `showDots` | `boolean` | `true` | Affiche/masque les points de navigation |
| `showArrows` | `boolean` | `true` | Affiche/masque les flèches de navigation |
| `showPlayPause` | `boolean` | `true` | Affiche/masque le bouton play/pause |
| `slidesToShow` | `number` | `3` | Nombre de slides visibles simultanément |
| `infinite` | `boolean` | `true` | Active/désactive la navigation infinie |

## Fonctionnalités du carrousel

### Navigation
- **Flèches** : Navigation manuelle entre les slides
- **Points** : Navigation directe vers un slide spécifique
- **Play/Pause** : Contrôle de l'autoplay
- **Hover** : Pause automatique au survol

### Autoplay
- Défilement automatique des avis
- Pause au survol de la souris
- Intervalle configurable
- Bouton play/pause pour contrôler manuellement

### Responsive
- Adaptation automatique du nombre de slides selon la taille d'écran
- Grille CSS flexible
- Animations fluides sur tous les appareils

## Style

Le composant utilise le même style que vos cartes `GoogleAvisCard` existantes :
- Cartes blanches avec ombres et bordures
- Photos de profil circulaires
- Système d'étoiles jaunes
- Animations au survol
- Design responsive
- Note moyenne affichée en haut

## Remarques importantes

1. **ID par défaut** : L'ID "example" est utilisé pour les tests. Remplacez-le par votre véritable ID en production.
2. **Limites de l'API** : L'API Featurable gratuite a des limites de taux. Consultez leur documentation pour plus de détails.
3. **Mise à jour** : Les avis sont automatiquement mis à jour toutes les 48 heures via l'API Featurable.
4. **Fallback** : Si l'API échoue, un message d'erreur approprié s'affiche.
5. **Note moyenne** : Calculée automatiquement à partir des avis reçus de l'API.

## Support

Pour toute question sur l'utilisation de l'API Featurable, consultez leur documentation officielle ou contactez leur support via votre tableau de bord Featurable.
