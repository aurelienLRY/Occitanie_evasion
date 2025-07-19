# Composant InputPhone

Le composant `InputPhone` est un champ de saisie de numéro de téléphone international basé sur `react-international-phone` et intégré avec `react-hook-form`.

## Fonctionnalités

- ✅ **Sélection de pays** : Liste déroulante avec drapeaux
- ✅ **Format automatique** : Formatage automatique selon le pays
- ✅ **Validation** : Intégration avec Yup et react-hook-form
- ✅ **Accessibilité** : Support des attributs ARIA
- ✅ **Gestion d'erreurs** : Affichage des messages d'erreur
- ✅ **Pays préférés** : Liste de pays européens en priorité

## Utilisation

### Dans un formulaire avec react-hook-form

```tsx
import { useForm, FormProvider } from 'react-hook-form';
import { InputPhone } from '@/components/input';

const MyForm = () => {
  const methods = useForm({
    defaultValues: {
      phone: ''
    }
  });

  return (
    <FormProvider {...methods}>
      <form>
        <InputPhone
          name="phone"
          label="Numéro de téléphone *"
        />
      </form>
    </FormProvider>
  );
};
```

### Avec validation Yup

```tsx
import * as yup from 'yup';

const schema = yup.object({
  phone: yup.string()
    .required('Le téléphone est requis')
    .matches(/^\+[1-9]\d{1,14}$/, 'Format de téléphone international invalide'),
});
```

## Props

Le composant accepte toutes les props de `InputProps` :

- `name`: Nom du champ (requis)
- `label`: Label du champ (optionnel)
- `className`: Classes CSS personnalisées (optionnel)
- `errorsName`: Nom alternatif pour les erreurs (optionnel, par défaut: `name`)
- `wIsRaw`: Afficher sans wrapper (optionnel, par défaut: `false`)
- `disabled`: Désactiver le champ (optionnel, par défaut: `false`)

## Configuration

### Pays préférés

Les pays suivants apparaissent en premier dans la liste :
- France (fr)
- Angleterre (en)
- Belgique (be)
- Italie (it)
- Allemagne (de)
- Espagne (es)
- Portugal (pt)
- Pays-Bas (nl)
- Pologne (pl)
- Roumanie (ro)
- Slovaquie (sk)
- Turquie (tr)

### Pays par défaut

Le pays par défaut est la France (`fr`).

### Format forcé

Le composant force l'affichage du code pays (`forceDialCode={true}`).

## Validation

### Format attendu

Le numéro de téléphone doit être au format international :
- Commence par `+`
- Suivi du code pays (1-3 chiffres)
- Suivi du numéro local (jusqu'à 15 chiffres au total)

**Exemples valides :**
- `+33123456789` (France)
- `+447911123456` (Royaume-Uni)
- `+1234567890` (États-Unis)

### Regex de validation

```javascript
/^\+[1-9]\d{1,14}$/
```

## Intégration avec le formulaire de réservation

Le composant est utilisé dans `ReservationForm.tsx` pour le champ `clientPhone` :

```tsx
<InputPhone
  name="clientPhone"
  label="Téléphone *"
/>
```

## Gestion des erreurs

Le composant affiche automatiquement les erreurs de validation :
- Messages d'erreur en rouge sous le champ
- Bordure rouge en cas d'erreur
- Attributs ARIA pour l'accessibilité

## Styles

Le composant utilise les classes Tailwind CSS définies dans `utils.tsx` :
- `ClassNameForInput()` pour les styles de base
- Support des états d'erreur
- Responsive design

## Dépendances

- `react-international-phone`: ^4.5.0
- `react-hook-form`: Pour l'intégration avec les formulaires
- `yup`: Pour la validation (optionnel)

## Exemple complet

```tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputPhone } from '@/components/input';

const schema = yup.object({
  phone: yup.string()
    .required('Le téléphone est requis')
    .matches(/^\+[1-9]\d{1,14}$/, 'Format de téléphone international invalide'),
});

export default function ContactForm() {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { phone: '' }
  });

  const onSubmit = (data) => {
    console.log('Téléphone:', data.phone);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputPhone
          name="phone"
          label="Votre numéro de téléphone *"
        />
        <button type="submit">Envoyer</button>
      </form>
    </FormProvider>
  );
}
``` 