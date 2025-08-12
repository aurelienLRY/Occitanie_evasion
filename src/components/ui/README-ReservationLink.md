# Composant ReservationLink et Gestion des Paramètres d'URL

Ce composant permet de créer des liens typés vers la page de réservation avec des paramètres pré-remplis.

## 🎯 **Fonctionnalités**

- **Liens typés** : Création de liens avec des paramètres validés
- **Pré-remplissage automatique** : Le formulaire se remplit automatiquement selon les paramètres
- **URLs propres** : Génération automatique d'URLs avec paramètres
- **Type safety** : Validation TypeScript des paramètres

## 📋 **Paramètres disponibles**

### 1. **activity** (Type: `ActivityType`)
- `'escalade'` - Escalade
- `'canyoning'` - Canyoning  
- `'speleologie'` - Spéléologie
- `'via-corda'` - Via Corda

### 2. **lieux** (Type: `LieuxType`)
- `'toulouse'` - Toulouse
- `'pyrenees'` - Pyrénées
- `'occitanie'` - Occitanie
- `'autres'` - Autres lieux

### 3. **sessionType** (Type: `SessionType`)
- `'demi-journee'` - Demi-journée
- `'journee-complete'` - Journée complète

## 🚀 **Utilisation**

### Import du composant
```tsx
import { ReservationLink } from '@/components/ui';
```

### Exemples d'utilisation

#### Lien simple
```tsx
<ReservationLink className="btn btn-primary">
  Réserver une activité
</ReservationLink>
```

#### Lien avec activité spécifique
```tsx
<ReservationLink 
  activity="escalade"
  className="btn btn-blue"
>
  Réserver de l'escalade
</ReservationLink>
```

#### Lien avec activité et lieu
```tsx
<ReservationLink 
  activity="canyoning"
  lieux="toulouse"
  className="btn btn-green"
>
  Réserver du canyoning à Toulouse
</ReservationLink>
```

#### Lien complet avec tous les paramètres
```tsx
<ReservationLink 
  activity="speleologie"
  lieux="pyrenees"
  sessionType="demi-journee"
  className="btn btn-purple"
>
  Réserver de la spéléologie dans les Pyrénées (demi-journée)
</ReservationLink>
```

## 🔗 **URLs générées**

Le composant génère automatiquement les URLs suivantes :

- **Sans paramètres** : `/reservation`
- **Avec activité** : `/reservation?activity=escalade`
- **Avec activité et lieu** : `/reservation?activity=escalade&lieux=toulouse`
- **Complet** : `/reservation?activity=speleologie&lieux=pyrenees&sessionType=demi-journee`

## 📝 **Pré-remplissage automatique**

Quand un utilisateur arrive sur la page de réservation avec des paramètres :

1. **Activité** : Le champ activité est automatiquement sélectionné
2. **Lieu** : Le lieu est automatiquement sélectionné
3. **Type de session** : Le type de session est automatiquement défini

## 🎨 **Utilisation dans les composants existants**

### Carte d'activité
```tsx
<div className="activity-card">
  <h3>Escalade à Toulouse</h3>
  <div className="booking-buttons">
    <ReservationLink 
      activity="escalade"
      lieux="toulouse"
      sessionType="demi-journee"
      className="btn btn-sm btn-primary"
    >
      Demi-journée
    </ReservationLink>
    <ReservationLink 
      activity="escalade"
      lieux="toulouse"
      sessionType="journee-complete"
      className="btn btn-sm btn-secondary"
    >
      Journée complète
    </ReservationLink>
  </div>
</div>
```

### Bannière de promotion
```tsx
<div className="promo-banner">
  <h2>Offre spéciale canyoning !</h2>
  <ReservationLink 
    activity="canyoning"
    className="btn btn-large btn-accent"
  >
    Réserver maintenant
  </ReservationLink>
</div>
```

## ⚠️ **Remarques importantes**

1. **Validation des paramètres** : Les paramètres sont validés côté client
2. **Fallback** : Si un paramètre est invalide, il est ignoré
3. **Performance** : Le composant utilise `useMemo` pour optimiser les performances
4. **Accessibilité** : Les liens sont accessibles et SEO-friendly

## 🔧 **Développement**

### Ajouter un nouveau paramètre
1. Ajouter le type dans `src/types/reservation.types.ts`
2. Modifier le composant `ReservationLink`
3. Mettre à jour la logique de pré-remplissage dans `ReservationForm`

### Tests
Le composant peut être testé en naviguant directement vers les URLs :
- `/reservation?activity=escalade`
- `/reservation?lieux=toulouse&sessionType=demi-journee`
