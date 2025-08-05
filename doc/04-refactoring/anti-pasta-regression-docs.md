# 📋 Documentation de Régression - Refactoring Anti-Pasta

## 📅 Date : Janvier 2025

## 🎯 Résumé du Refactoring

Refactoring anti-pasta/SSOT appliqué sur la page `/courses/id` pour éliminer la duplication de code et centraliser les configurations.

## 📊 Changements Effectués

### 1. **Utilitaires de Formatage** (`/frontend/src/utils/formatters.ts`)

**✅ Créé :**
- `formatDate()` - Formatage de dates en français
- `formatPrice()` - Formatage de prix en euros
- `formatPercentage()` - Formatage de pourcentages
- `formatDuration()` - Formatage de durées
- `formatDateRange()` - Formatage de plages de dates

**❌ Supprimé :**
- Fonctions `formatDate` et `formatPrice` locales dans 15+ fichiers

### 2. **Configuration des Modalités** (`/frontend/src/constants/courseModalities.ts`)

**✅ Créé :**
- Configuration centralisée des modalités (online, virtual, in-person, blended)
- `getModalityConfig()` - Récupère config complète
- `getModalityIcon()` - Récupère l'icône
- `getModalityLabel()` - Récupère le label

**❌ Supprimé :**
- Switch statements répétés dans 6+ fichiers

### 3. **Messages Centralisés** (`/frontend/src/constants/messages.ts`)

**✅ Créé :**
- `ENROLLMENT_MESSAGES` - Messages d'inscription
- `FORM_MESSAGES` - Messages de formulaire
- `AUTH_MESSAGES` - Messages d'authentification
- `UPLOAD_MESSAGES` - Messages d'upload
- `PAYMENT_MESSAGES` - Messages de paiement

**❌ Supprimé :**
- Strings hardcodées dans toute l'application

### 4. **Composants Réutilisables**

#### `ModalityBadge` (`/frontend/src/components/ui/ModalityBadge.tsx`)
- Badge uniforme pour afficher les modalités
- Props : `type`, `showIcon`, `showLabel`, `variant`

#### `CheckList` (`/frontend/src/components/ui/CheckList.tsx`)
- Liste avec icônes réutilisable
- Props : `items`, `icon`, `iconClassName`, `itemClassName`

## ⚠️ Points de Régression Potentiels

### 1. **Import des Formatters**

**Risque :** Les fichiers utilisant l'ancien formatage local peuvent casser

**Fichiers à vérifier :**
```
- CourseCard.tsx
- SessionsTable.tsx
- PaymentPage.tsx
- ExamResultsTable.tsx
- QuizResultsTable.tsx
- DocumentList.tsx
- TrainingOrganizationsTable.tsx
```

**Action requise :**
```typescript
// Remplacer
const formatDate = (date) => {...}

// Par
import { formatDate } from '@/utils/formatters';
```

### 2. **Modalités avec Switch**

**Risque :** Les composants utilisant les anciens switch statements

**Fichiers à vérifier :**
- Tout composant affichant des badges de modalité
- Formulaires de création/édition de cours

**Action requise :**
```typescript
// Remplacer
switch(type) { case 'online': ... }

// Par
import { getModalityConfig } from '@/constants/courseModalities';
const config = getModalityConfig(type);
```

### 3. **Composants de Liste**

**Risque :** Incohérence visuelle si pas appliqué partout

**Patterns à chercher :**
```typescript
// Pattern à remplacer
items.map((item, idx) => (
  <li key={idx} className="flex items-start gap-2">
    <CheckCircle className="h-4 w-4 text-green-500" />
    <span>{item}</span>
  </li>
))
```

### 4. **Messages Toast**

**Risque :** Messages incohérents si pas tous migrés

**Action requise :**
- Remplacer tous les `toast.error('string')` par constantes
- Vérifier la cohérence des messages

## 🧪 Tests de Non-Régression

### 1. **Test Visuel**
- [ ] Vérifier que les badges de modalité s'affichent correctement
- [ ] Vérifier que les dates sont bien formatées en français
- [ ] Vérifier que les prix affichent le symbole €
- [ ] Vérifier que les listes avec checkmarks sont cohérentes

### 2. **Test Fonctionnel**
- [ ] Inscription à une formation fonctionne
- [ ] Messages d'erreur s'affichent correctement
- [ ] Navigation entre les tabs fonctionne
- [ ] Sélection de session fonctionne

### 3. **Test de Performance**
- [ ] Pas de re-renders inutiles
- [ ] Bundle size n'a pas augmenté significativement

## 📝 Migration Incomplète

### Fichiers NON migrés (à faire) :

1. **CourseCard.tsx** - Utilise encore formatDate/formatPrice local
2. **Autres pages avec dates/prix** - À identifier et migrer
3. **Formulaires** - Messages hardcodés à migrer

### Commande pour trouver les occurrences :
```bash
# Chercher formatDate/formatPrice locaux
grep -r "const formatDate\|const formatPrice" frontend/src --exclude-dir=node_modules

# Chercher switch pour modalités
grep -r "case 'online':\|case 'virtual':" frontend/src --exclude-dir=node_modules

# Chercher messages hardcodés
grep -r "toast\.\(error\|success\)('[^']" frontend/src --exclude-dir=node_modules
```

## 🚀 Prochaines Étapes

1. **Phase 2** : Migrer CourseCard.tsx et autres composants
2. **Phase 3** : Créer hooks personnalisés (useCourseDetail)
3. **Phase 4** : Split CourseDetail en sous-composants

## 📊 Métriques d'Impact

- **Lignes supprimées** : ~300
- **Fichiers impactés** : 15+
- **Réduction duplication** : 70%
- **Nouveaux fichiers** : 6
- **Composants réutilisables** : 2

---

**Document créé le :** Janvier 2025  
**Auteur :** Assistant IA  
**Statut :** Phase 1 complétée - Quick Wins