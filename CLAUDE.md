# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 RÈGLES CRITIQUES - À LIRE EN PREMIER

### 1. SSOT - Single Source of Truth (OBLIGATOIRE)
**TOUJOURS vérifier si le code existe déjà avant de créer quoi que ce soit**
- 📖 **CLAUDE.md EST le SSOT** - Ce fichier contient toutes les règles et principes
- ✅ Une seule source de vérité par fonctionnalité
- ❌ JAMAIS de duplication de code/config/schémas

### 2. Avant CHAQUE ajout de code
```bash
# OBLIGATOIRE - Faire ces vérifications :

# 1. Est-ce que ça existe déjà ?
grep -r "NomDeLaFonction" . --exclude-dir=node_modules
find . -name "*nom-fichier*" -type f | grep -v node_modules

# 2. Où est la bonne place ? (RÈGLES PYGmalion)
# - Composants → frontend/src/components/
# - Services → frontend/src/services/
# - Config → frontend/src/config/
# - Hooks → frontend/src/hooks/
# - Utils → frontend/src/lib/
# - API routes → backend/src/
# - Database → backend/prisma (Prisma uniquement)
# - Auth → backend/src/auth (NestJS auth uniquement)

# 3. Y a-t-il déjà un service similaire ?
ls frontend/src/services/
```

### 3. Architecture actuelle (NE PAS DUPLIQUER)
- **Prisma** : `backend/prisma` uniquement (PAS de schema local)
- **Supabase** : Centralisé dans `backend/src/auth` 
- **APIs** : Tout dans NestJS `/app/api/` (PAS de serveur Express séparé)
- **Composants** : `frontend/src/components/` ()
- **Services** : `frontend/src/services/` ()
- **Config** : `frontend/src/config/` ()
- **Hooks** : `frontend/src/hooks/` ()
- **Utils** : `frontend/src/lib/` ()

### 4. Quality Gates (OBLIGATOIRE)
**Avant chaque commit, vérifier :**
- [ ] Code coverage minimum : 80% (quand tests configurés)
- [ ] Complexité cyclomatique max : 10 par fonction
- [ ] Nombre de paramètres max : 4 par fonction
- [ ] Pas de duplication de code détectée
- [ ] Gestion d'erreurs appropriée
- [ ] Documentation mise à jour

### 5. Vérification des dépendances
**Avant chaque ajout de package :**
- [ ] Impact sur le bundle size évalué
- [ ] Raison de la dépendance documentée
- [ ] Alternative existante vérifiée
- [ ] Version stable et maintenue
- [ ] Licence compatible avec le projet

## 🔴 CRITICAL REMINDERS - READ FIRST

### Workflow de développement OBLIGATOIRE

**🚨 RÈGLE ABSOLUE : TOUJOURS commencer par `/ssot`**

1. **CONSULTER CLAUDE.md** - `/ssot` OBLIGATOIRE avant toute action
2. **Les fichiers sprint dictent la progression** - Suivre le fichier sprint en cours étape par étape
3. **Progression tâche par tâche** - Une seule tâche à la fois selon le sprint
4. **Checkmark APRÈS test validé** - Ne JAMAIS checkmarker sans validation utilisateur
5. **Scénario de test OBLIGATOIRE** - Fournir un scénario détaillé avant checkmark
6. **Validation avant progression** - Si test échoue, on reste sur la tâche
7. **Pour chaque nouvelle tâche** :
   a. Poser des questions sur l'implémentation souhaitée
   b. Proposer un userflow logique basé sur l'existant
   c. Pour le front : TOUJOURS référencer le design de la landing page
8. **Documentation après achèvement** - Ajouter contexte et décisions dans le fichier sprint en cours

### Commandes et environnement
- **cd backend && npm run start:dev** : L'utilisateur gère dans des terminaux séparés (front + API)
- **Autres commandes** : Claude exécute via Bash (db:push, db:generate, build, lint)
- **Si erreur** : L'utilisateur copie/colle les logs du terminal

### Slash Commands

#### 📋 Commandes de workflow
- `/ssot` : **OBLIGATOIRE** - Vérifie et applique les règles SSOT de CLAUDE.md
- `/questions` : Pose 5-10+ questions sur la tâche actuelle avant développement
- `/userflow` : Propose un userflow détaillé pour la fonctionnalité
- `/test` : Génère un scénario de test complet pour validation (curl ou de preference en run dev webview)
- `/clean` : Améliore le maintien du code, l'organisation des fichiers/dossiers et évite le code spaghetti
- `/pasta` Fais une analyse du SPAGHETTI CODE et autres problèmes
- `/debug` : Débogage en respectant les principes SSOT (/pasta & /clean) de CLAUDE.md
- `/design` : Utilise les références design et les styles validés de la landing page

#### 📝 Implémentation des commandes
Les commandes sont des raccourcis pour le workflow. Quand vous tapez une commande, Claude :
- **OBLIGATOIRE** : Lit CLAUDE.md en premier
- Lit les fichiers nécessaires (le fichier sprint en cours, CLAUDE.md, etc.)
- Analyse l'état actuel
- Exécute l'action demandée
- Affiche le résultat formaté

**🚨 RÈGLE ABSOLUE** : 
- **TOUJOURS** commencer par `/ssot` avant toute action
- **TOUJOURS** vérifier CLAUDE.md avant de coder
- **TOUJOURS** appliquer les quality gates
- **TOUJOURS** respecter l'architecture SSOT

**Note** : Ces commandes sont spécifiques à ce projet et respectent le workflow défini ci-dessus.

### 🌟 INTENTIONS DU CTO - ALIGNEMENT STRATÉGIQUE
**Objectif global** : Développer comme un CTO de 45 ans d'expérience – prioriser la qualité, éviter le "spaghetti code", et utiliser l'IA pour du "vibecoding" professionnel sans hallucinations ni désorganisation.

**Intentions clés** :
- **Qualité > Vélocité** : Toujours propre dès le début, même si ça prend plus de temps (ex. : quality gates obligatoires).
- **SSOT absolu** : CLAUDE.md est la référence unique – tout écart doit être justifié par une ADR.
- **Anti-spaghetti** : Zéro tolérance pour les duplications, mocks géants, console.log, types any, ou imports relatifs.
- **Workflow IA** : L'IA doit poser des questions, proposer des userflows, et valider par tests avant progression.
- ** pragmatique** : Garder tout dans `apps/landing/` pour la vitesse, refactoriser post-lancement.

Ces intentions guident TOUTES les décisions – l'IA doit s'y référer via `/ssot` pour s'aligner.

### 📘 EXEMPLES D'UTILISATION DE /ssot
**Exemple 1 : Avant une nouvelle feature**
- Utilisateur : "/ssot puis ajoute une page de login"
- Réponse IA attendue :
  1. Lecture de CLAUDE.md confirmée.
  2. Vérification SSOT : "Le login existe déjà dans backend/src/auth – pas de duplication."
  3. Proposition alignée : "Voici le code, placé dans frontend/src/pages/login/index.tsx, avec imports absolus et types stricts."

**Exemple 2 : Détection de problème**
- Si déviation détectée : "🚨 Alerte SSOT : Cette implémentation utiliserait console.log – interdit. Proposition corrigée : Utiliser logger.info()."

Ça rend /ssot plus concret et force l'alignement sur tes intentions.

## 📋 MARCHE À SUIVRE DÉTAILLÉE

### 1️⃣ Lecture du sprint
- Ouvrir le fichier sprint en cours
- Identifier la prochaine tâche non checkmarkée de priorité haute
- Lire TOUS les critères d'acceptation
- Comprendre le contexte et les dépendances

### 2️⃣ Phase de questions (OBLIGATOIRE)
Poser MINIMUM 5 questions avant de coder :
- "Comment veux-tu que [fonctionnalité] se comporte quand [cas d'usage] ?"
- "Quel design/style préfères-tu pour [élément UI] ?"
- "Où doit se situer [fonctionnalité] dans le flow utilisateur ?"
- "Quelles sont les erreurs à gérer pour [action] ?"
- "As-tu des préférences pour [choix technique] ?"

### 3️⃣ Proposition de userflow
Présenter un flow détaillé :
```
📱 Userflow proposé :
1. L'utilisateur arrive sur [page]
2. Il voit [éléments visibles]
3. Il peut [actions possibles]
4. Si [action], alors [résultat]
5. En cas d'erreur : [gestion]
```

### 4️⃣ Développement
- Référencer TOUJOURS le design de la landing page
- Utiliser les composants/patterns existants
- Commiter régulièrement (si demandé)
- Documenter les décisions importantes

### 5️⃣ Scénario de test
Format OBLIGATOIRE :
```
📋 Scénario de test - [Nom fonctionnalité]

Prérequis :
- [ ] Serveur frontend lancé (port 3000)
- [ ] Serveur API lancé (port 8000)
- [ ] Utilisateur connecté comme admin (si nécessaire)

Test :
1. Aller sur http://localhost:3000/[page]
2. Vérifier que [élément] est visible
3. Cliquer sur [bouton/lien]
4. Remplir [formulaire] avec :
   - Champ 1 : "valeur test"
   - Champ 2 : "valeur test"
5. Soumettre le formulaire
6. Vérifier que :
   - [ ] Message de succès apparaît
   - [ ] Redirection vers [page]
   - [ ] Données visibles dans [endroit]

Cas d'erreur à tester :
- Formulaire vide
- Données invalides
- Serveur API éteint
```

### 6️⃣ Validation et checkmark
- Attendre confirmation : "Test validé ✅" 
- Si échec : corriger et reproposer test
- Si succès : checkmarker dans le fichier sprint en cours
- Ajouter section "✅ Complété" avec détails

### 7️⃣ Documentation
Ajouter dans le fichier sprint en cours :
```markdown
### ✅ Complété : [Nom tâche]

**Actions effectuées :**
- ✅ [Action 1 réalisée]
- ✅ [Action 2 réalisée]

**Décisions prises :**
- [Décision technique] : [Raison]
- [Choix UX] : [Justification]

**Notes :**
- [Contexte important]
- [Points d'attention pour le futur]
```

## 🏗️ ARCHITECTURE DECISION RECORDS (ADR)

### Format ADR
Chaque décision technique majeure doit être documentée dans `/docs/architecture/adr/` :

```markdown
# ADR-XXX: [Titre de la décision]

**Date :** YYYY-MM-DD
**Statut :** [Proposé | Accepté | Rejeté | Déprécié]

**Contexte :**
[Pourquoi cette décision est nécessaire]

**Décision :**
[Nous avons décidé de...]

**Conséquences :**
- [Conséquence positive]
- [Conséquence négative]
- [Impact sur l'architecture]

**Alternatives considérées :**
- [Alternative 1] : [Pourquoi rejetée]
- [Alternative 2] : [Pourquoi rejetée]
```

### ADR existantes à créer :
- ADR-001: Utilisation de Prisma vs TypeORM
- ADR-002: Architecture monorepo avec Turborepo
- ADR-003: NestJS App Router vs Pages Router
- ADR-004: Clerk vs Auth0 pour l'authentification

## 🔍 CODE REVIEW CHECKLIST (IA)

**Avant chaque modification, vérifier :**

### Architecture
- [ ] Respect du SSOT (pas de duplication)
- [ ] Code placé dans le bon package
- [ ] Dépendances appropriées
- [ ] Pas de couplage fort entre modules

### Qualité du code
- [ ] Nommage clair et cohérent
- [ ] Fonctions courtes et focalisées
- [ ] Gestion d'erreurs appropriée
- [ ] Pas de code mort ou commenté

### Tests et documentation
- [ ] Tests inclus (quand framework configuré)
- [ ] Documentation mise à jour
- [ ] Exemples d'utilisation fournis
- [ ] API publique documentée

### Performance
- [ ] Pas de requêtes N+1
- [ ] Bundle size optimisé
- [ ] Lazy loading approprié
- [ ] Cache utilisé quand pertinent

### Sécurité
- [ ] Validation des inputs
- [ ] Pas de secrets en dur
- [ ] Permissions appropriées
- [ ] Sanitisation des données

## 📊 MÉTRIQUES DE QUALITÉ

### Objectifs à maintenir
- **Code coverage** : 80% minimum (quand tests configurés)
- **Complexité cyclomatique** : Max 10 par fonction
- **Nombre de paramètres** : Max 4 par fonction
- **Longueur de fonction** : Max 50 lignes
- **Duplication de code** : 0% (utilisation de composants partagés)

### Outils de vérification
```bash
# Vérification de la qualité
cd backend && npm run lint && cd ../frontend && npm run lint                    # ESLint + Prettier
cd backend && npm run type-check && cd ../frontend && npm run type-check             # TypeScript
cd backend && npm run test && cd ../frontend && npm run test                   # Tests unitaires
cd backend && npm run build && cd ../frontend && npm run build                  # Build verification
```

## 🚨 PRINCIPES DE DÉVELOPPEMENT - ÉVITER LE SPAGHETTI CODE

### 🎯 PHILOSOPHIE : "QUALITÉ DÈS LE DÉBUT"

**PRINCIPE FONDAMENTAL :** Mieux vaut prendre 1h de plus pour faire propre que 1 jour pour nettoyer après.

### 📋 RÈGLES ABSOLUES - JAMAIS D'EXCEPTION

#### **1. JAMais de logging non structuré**
```typescript
// ❌ INTERDIT - Ne jamais faire
console.log('Debug endpoint appelé');
console.error('Erreur API contact:', error);

// ✅ OBLIGATOIRE - Toujours faire
logger.info('Debug endpoint appelé');
logger.error('Erreur API contact:', error);
```

#### **2. JAMais de types non stricts**
```typescript
// ❌ INTERDIT - Ne jamais faire
const data: any = response;
} catch (err: any) {

// ✅ OBLIGATOIRE - Toujours faire
interface ApiResponse {
  data: User[];
  status: number;
}
const data: ApiResponse = response;
} catch (err: Error) {
```

#### **3. JAMais d'imports fragiles**
```typescript
// ❌ INTERDIT - Ne jamais faire
import { useCurrentLocale } from '../hooks/useCurrentLocale';
import BusinessPlanModal from '../BusinessPlanModal';

// ✅ OBLIGATOIRE - Toujours faire
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import BusinessPlanModal from '@/components/BusinessPlanModal';
```

#### **4. JAMais de données hardcodées massives**
```typescript
// ❌ INTERDIT - Ne jamais faire
const mockData = { /* 1000+ lignes de contenu hardcodé */ };

// ✅ OBLIGATOIRE - Toujours faire
const loadData = async () => {
  return await readFromFile();
};
```

### 🔧 QUALITY GATES OBLIGATOIRES

#### **Avant chaque commit, vérifier :**
```bash
# Checklist automatique pour TypeScript/Node.js
- [ ] Types stricts (pas de any/unknown)
- [ ] Logger professionnel (pas de console.log)
- [ ] Imports absolus (pas de ../)
- [ ] Pas de duplication de code
- [ ] Pas de données hardcodées massives
- [ ] Tests passent (Jest/Vitest)
- [ ] Lint clean (ESLint)
- [ ] Type check clean (TypeScript)
- [ ] Build clean (NestJS/NestJS)
```

#### **Scripts de vérification spécialisés**
```bash
# quality-check.sh
#!/bin/bash
echo "🔍 Vérification qualité TypeScript/Node.js..."

# Compter les types non stricts
any_count=$(grep -r "any\|unknown" src/ | wc -l)
echo "Types non stricts: $any_count"

# Compter les logs non structurés
console_count=$(grep -r "console\." src/ | wc -l)
echo "Logs non structurés: $console_count"

# Compter les imports fragiles
relative_count=$(grep -r "from '\.\./" src/ | wc -l)
echo "Imports fragiles: $relative_count"

# Alert si > 0
if [ $any_count -gt 0 ] || [ $console_count -gt 0 ] || [ $relative_count -gt 0 ]; then
  echo " PROBLÈMES DÉTECTÉS - NETTOYAGE REQUIS"
  exit 1
fi
```

### 🏗️ ARCHITECTURE DECISION RECORDS (ADR)

#### **Documenter chaque décision technique**
```markdown
# ADR-XXX: [Titre de la décision]

**Date :** YYYY-MM-DD
**Statut :** [Proposé | Accepté | Rejeté | Déprécié]

**Contexte :**
[Pourquoi cette décision est nécessaire]

**Décision :**
[Nous avons décidé de...]

**Conséquences :**
- [Conséquence positive]
- [Conséquence négative]
- [Impact sur l'architecture]

**Alternatives considérées :**
- [Alternative 1] : [Pourquoi rejetée]
- [Alternative 2] : [Pourquoi rejetée]
```

### 📊 MÉTRIQUES DE QUALITÉ SPÉCIALISÉES

#### **Objectifs à maintenir**
```typescript
// quality-metrics.ts
export const qualityMetrics = {
  nonStrictTypes: 0,    // Objectif : 0
  unstructuredLogs: 0,   // Objectif : 0
  fragileImports: 0,     // Objectif : 0
  codeDuplication: 0,    // Objectif : 0
  testCoverage: 80,      // Objectif : 80%+
  bundleSize: 500,       // Objectif : < 500KB (NestJS)
  cyclomaticComplexity: 10, // Objectif : < 10
  functionLength: 50,    // Objectif : < 50 lignes
};
```

###️ OUTILS DE DÉVELOPPEMENT SPÉCIALISÉS

#### **ESLint Rules Strictes**
```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "no-console": "error",
    "import/no-relative-parent-imports": "error",
    "no-duplicate-imports": "error",
    "complexity": ["error", 10],
    "max-lines-per-function": ["error", 50]
  }
}
```

#### **TypeScript Strict**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

#### **NestJS Config**
```javascript
// next.config.js
module.exports = {
  experimental: {
    strictMode: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}
```

#### **NestJS Config**
```typescript
// nest-cli.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### 🔄 WORKFLOW DE DÉVELOPPEMENT SPÉCIALISÉ

#### **Étape 1 : Planification**
```bash
# Avant de coder
1. Définir l'architecture (NestJS/NestJS)
2. Créer les types stricts (TypeScript)
3. Planifier les composants/services
4. Identifier les dépendances (Node.js)
5. Choisir le logger approprié
```

#### **Étape 2 : Développement**
```bash
# Pendant le développement
1. Types stricts d'abord (TypeScript)
2. Logger professionnel (Winston/Pino)
3. Tests en parallèle (Jest/Vitest)
4. Code review continue
5. Documentation en temps réel
```

#### **Étape 3 : Validation**
```bash
# Avant commit
1. Quality gates
2. Tests passent (Jest/Vitest)
3. Lint clean (ESLint)
4. Type check (TypeScript)
5. Build clean (NestJS/NestJS)
```

### 🚨 RÈGLES ABSOLUES POUR L'IA

#### **Règle 1 : "Clean Code First"**
```typescript
// Priorité : Qualité > Vélocité
// Mieux vaut prendre 1h de plus pour faire propre
// Que 1 jour pour nettoyer après
```

#### **Règle 2 : "No Technical Debt"**
```typescript
// Interdit de laisser des TODO
// Interdit de commenter "// TODO: nettoyer plus tard"
// Interdit de faire "quick & dirty"
```

#### **Règle 3 : "Architecture Over Speed"**
```typescript
// Mieux vaut une architecture propre
// Qu'un code qui marche vite mais sale
```

### MONITORING CONTINU

#### **Code Review Checklist**
```markdown
## Code Review - Checklist TypeScript/Node.js

### Architecture
- [ ] Types stricts utilisés (TypeScript)
- [ ] Pas de duplication
- [ ] Imports absolus (@/)
- [ ] Logger professionnel (Winston/Pino)

### Performance
- [ ] Pas de données hardcodées massives
- [ ] Bundle size acceptable (NestJS)
- [ ] Lazy loading approprié
- [ ] API optimisée (NestJS)

### Tests
- [ ] Tests unitaires (Jest/Vitest)
- [ ] Tests d'intégration
- [ ] Coverage > 80%

### Documentation
- [ ] README mis à jour
- [ ] Types documentés
- [ ] API documentée (Swagger)
```

### 🎯 LEÇONS APPRISES

#### **Erreurs spécifiques à éviter :**
1. ❌ **Mock géant** : 1600 lignes de contenu hardcodé
2. ❌ **Console.log** : 50+ occurrences polluées
3. ❌ **Types any** : 30+ occurrences non sécurisées
4. ❌ **Imports relatifs** : ../ qui se cassent facilement
5. ❌ **Structure imbriquée** : Builds NestJS cassés

#### **Solutions spécialisées :**
1. ✅ **Logger professionnel** : Winston/Pino dès le premier log
2. ✅ **Types stricts** : Jamais de any/unknown
3. ✅ **Imports absolus** : Toujours @/
4. ✅ **Architecture propre** : Structure NestJS/NestJS claire
5. ✅ **Quality gates** : ESLint + TypeScript + Jest

### IMPLÉMENTATION IMMÉDIATE

#### **Actions concrètes pour chaque nouveau projet :**
1. ✅ **Installer ESLint strict** : Bloquer any et console.log
2. ✅ **Configurer Husky** : Pre-commit hooks
3. ✅ **Créer quality-metrics** : Monitoring continu
4. ✅ **Documenter les règles** : ADR pour chaque décision
5. ✅ **Configurer logger** : Winston/Pino dès le début

### 💡 CONCLUSION

**La clé : QUALITÉ DÈS LE DÉBUT**

**Au lieu de :**
```typescript
// "On nettoiera plus tard"
console.log('Debug');
const data: any = response;
```

**Faire :**
```typescript
// "Propre dès le début"
logger.info('Debug');
interface ApiResponse { data: User[]; }
const data: ApiResponse = response;
```

**Résultat :** **Plus jamais de spaghetti code !** 🚀

**Cette approche coûte 10% de temps en plus au début, mais économise 90% de temps de nettoyage !** 💪

## Project Overview

Pygmalion est une plateforme innovante de marketplace de formation aéronautique, conçue pour connecter les organisations de formation (OF) avec les entreprises et les apprenants dans le secteur aéronautique. Le projet est structuré en backend NestJS et frontend React avec une architecture traditionnelle séparée.

## Key Commands

### Development
```bash
# Backend (NestJS)
./start.sh

# Backend (NestJS)
cd backend && npm run start:dev    # Backend API (port 8000)
cd frontend && npm run dev         # Frontend (port 3000)

```

### Build & Production
```bash
cd backend && npm run build && cd ../frontend && npm run build              # Build backend and frontend
cd backend && npm run start:prod && cd ../frontend && npm run preview              # Start production servers (backend + frontend)
cd backend && npm run lint && cd ../frontend && npm run lint               # Run linting (backend + frontend)
cd backend && npm run type-check && cd ../frontend && npm run type-check         # TypeScript type checking (backend + frontend)
```

### Database Operations (Prisma)
```bash
cd backend && npm run db:generate        # Generate Prisma client
cd backend && npm run db:push           # Push schema to database
cd backend && npm run db:migrate        # Run database migrations
cd backend && npm run db:studio         # Open Prisma Studio GUI
```

## Architecture Overview

This is a traditional backend/frontend architecture:

1. **Backend** (`backend/`): NestJS application
   - `src/`: Source code with modules
   - `prisma/`: Database schema and migrations
   - Port 8000

2. **Frontend** (`frontend/`): React + Vite application
   - `src/components/`: Reusable UI components
   - `src/pages/`: Page components
   - `src/services/`: API service layer
   - Port 3000
   

3. **Shared** (`doc/`):
   - `CLAUDE.md`: Development guidelines (this file)


## Key Technical Decisions

- **Monorepo Tool**: Traditional backend/frontend architecture
- **Frontend**: React 18 with Vite, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with NestJS Passport
- **AI Models**: React Context + Custom Hooks
- **Payments**: Axios for HTTP requests

## Important Notes

- No test framework is currently configured - ask user for testing approach before writing tests
- The project uses traditional npm/yarn for package management
- Brand colors and design tokens are defined in Tailwind config
- Database schema is managed through Prisma in `backend/prisma/`

