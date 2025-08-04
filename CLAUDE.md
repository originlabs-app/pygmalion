# CLAUDE.md - Documentation de contexte pour PYGMALION

## Vue d'ensemble du projet

PYGMALION est une plateforme de formation aéronautique complète avec :
- **Backend** : NestJS + Prisma + PostgreSQL (Supabase)
- **Frontend** : React + TypeScript + Vite + Tailwind CSS
- **Stockage** : Supabase Storage pour les fichiers multimédia
- **Authentification** : JWT avec rôles (admin, training_org, student)

## Architecture et structure

### Backend (/backend)
```
src/
├── auth/          # Authentification JWT et gestion des utilisateurs
├── courses/       # Gestion des formations
├── modules/       # Modules de cours avec contenu et ressources
├── quizzes/       # Système de quiz avec tentatives et résultats
├── exams/         # Système d'examens avec sécurité anti-fraude
├── enrollments/   # Inscriptions des étudiants aux formations
├── sessions/      # Sessions de formation (dates, lieux, prix)
├── security/      # Paramètres de sécurité anti-fraude
├── common/        # Services partagés (upload, guards, etc.)
└── prisma/        # Schéma de base de données et migrations
```

### Frontend (/frontend)
```
src/
├── components/
│   ├── courses/      # Composants de gestion des cours
│   ├── dashboard/    # Tableaux de bord par rôle
│   ├── lms/          # Learning Management System (côté étudiant)
│   └── ui/           # Composants UI réutilisables
├── services/         # Services API
├── contexts/         # Contextes React globaux
└── types/            # Types TypeScript
```

## État actuel du développement

### ✅ Fonctionnalités complètes

1. **Authentification et autorisation**
   - Login/logout avec JWT
   - Rôles : admin, training_org (OF), student
   - Guards de protection des routes

2. **Gestion des organismes de formation (OF)**
   - Profil d'organisme avec validation
   - Dashboard complet avec 9 onglets
   - Création et gestion des formations
   - Gestion des sessions (dates, prix, places)

3. **Système de cours modulaire**
   - Création de cours avec modules
   - Types de contenu : vidéo, PDF, quiz, examen
   - Upload sécurisé des fichiers
   - Vérification des droits d'accès

4. **Système de quiz**
   - Création de quiz avec questions/réponses
   - Tentatives multiples autorisées
   - Calcul automatique des scores
   - API complète pour OF (résultats, détails)
   - Interface d'édition complète

5. **Système d'examens sécurisé**
   - Configuration de sécurité avancée
   - Détection de fraude (tab switch, copier/coller, etc.)
   - Proctoring, webcam, lockdown browser
   - Timeline des événements de sécurité
   - API complète pour OF (résultats, alertes)
   - Interface d'édition avec paramètres de sécurité

6. **Interface de résultats pour OF**
   - Vue d'ensemble avec statistiques et graphiques
   - Tableaux détaillés quiz/examens
   - Visualisation des tentatives individuelles
   - Analyse de sécurité des examens
   - Export CSV/PDF des résultats
   - Accès rapide depuis la liste des étudiants

7. **Côté étudiant (LMS)**
   - Navigation dans les modules
   - Lecture vidéo (YouTube/Vimeo/local)
   - Téléchargement PDF sécurisé
   - Passage de quiz et examens

8. **Gestion des évaluations (OF)**
   - Onglet dédié "Évaluations" dans le dashboard
   - Édition complète des quiz/examens après création
   - Duplication et suppression
   - Recherche et filtrage

### 🔄 En cours / À faire

1. **Sessions hybrides (présentiel + e-learning)**
   - ✅ Table sessions existe (lieu, capacité, dates)
   - ✅ API backend fonctionnelle
   - ✅ Frontend création/gestion sessions
   - ❌ Support modalités hybrides avancées

2. **Marketplace public**
   - ❌ Page d'accueil publique
   - ❌ Catalogue filtrable des formations
   - ❌ Détails formation sans authentification
   - ❌ Processus d'inscription public

3. **Tracking progression temps réel**
   - ✅ Table course_progress existe
   - ⚠️ API backend partielle
   - ❌ WebSocket/SSE pour temps réel
   - ❌ Dashboard OF temps réel

4. **Certificats**
   - ❌ Table certificates
   - ❌ Génération PDF automatique
   - ❌ Templates personnalisables
   - ❌ QR code vérification

5. **Analytics et reporting**
   - ✅ Données disponibles
   - ✅ Export CSV/PDF basique
   - ❌ Tableaux de bord avancés
   - ❌ Rapports personnalisables

6. **Notifications**
   - ❌ Service email (SendGrid/Resend)
   - ❌ Templates emails
   - ❌ Notifications in-app
   - ❌ Préférences utilisateur

7. **Paiement**
   - ❌ Intégration Stripe
   - ❌ Gestion abonnements
   - ❌ Factures automatiques
   - ❌ Commission plateforme

8. **Compliance et alertes**
   - ❌ Suivi dates limites formations
   - ❌ Alertes renouvellement
   - ❌ Dashboard compliance entreprise
   - ❌ Rapports réglementaires

## Commandes importantes

### Backend
```bash
cd backend
npm run dev          # Développement
npm run build        # Build production
npm run test         # Tests
npm run lint         # Linting
npx prisma migrate dev  # Migrations DB
npx prisma generate     # Générer client Prisma
```

### Frontend
```bash
cd frontend
npm run dev          # Développement (port 8080)
npm run build        # Build production
npm run lint         # Linting
npm run type-check   # Vérification TypeScript
```

## Variables d'environnement importantes

### Backend (.env)
- `DATABASE_URL` : URL PostgreSQL Supabase
- `SUPABASE_URL` : URL du projet Supabase
- `SUPABASE_SERVICE_KEY` : Clé service Supabase
- `JWT_SECRET` : Secret pour les tokens JWT
- `CORS_ORIGINS` : Origins autorisées

### Frontend (.env)
- `VITE_API_BASE_URL` : URL de l'API backend
- `VITE_SUPABASE_URL` : URL Supabase
- `VITE_SUPABASE_ANON_KEY` : Clé publique Supabase

## Points d'attention

1. **Sécurité**
   - Toujours vérifier les droits d'accès aux ressources
   - Valider les enrollments avant accès au contenu
   - Utiliser les signed URLs pour les fichiers

2. **Performance**
   - Pagination des listes longues
   - Lazy loading des modules de cours
   - Optimisation des requêtes Prisma (include)

3. **UX**
   - États de chargement (skeletons)
   - Messages d'erreur clairs
   - Feedback visuel des actions

## Prochaines étapes logiques

### 1. **Marketplace Public** (Priorité HAUTE) 🛒
**Objectif** : Permettre aux apprenants de découvrir et s'inscrire aux formations

#### Backend :
- [ ] Endpoints publics pour catalogue formations
- [ ] Filtres par catégorie, modalité, prix, dates
- [ ] API inscription sans compte (création à la volée)
- [ ] Gestion du processus de paiement

#### Frontend :
- [ ] Page d'accueil publique avec hero et formations vedettes
- [ ] Page catalogue avec filtres avancés
- [ ] Page détail formation publique
- [ ] Processus inscription/paiement fluide

#### Base de données :
- [ ] Index pour performances recherche
- [ ] Table featured_courses pour mise en avant
- [ ] Statistiques vues/clics

### 2. **Certificats** (Priorité HAUTE) 🎓
**Objectif** : Génération automatique et vérification des certificats

#### Backend :
- [ ] Table certificates avec métadonnées
- [ ] Service génération PDF (Puppeteer/PDFKit)
- [ ] API vérification QR code
- [ ] Stockage sécurisé Supabase Storage

#### Frontend :
- [ ] Interface création templates (OF)
- [ ] Visualisation certificats (apprenants)
- [ ] Page publique vérification QR
- [ ] Téléchargement et partage

### 3. **Tracking Progression Temps Réel** (Priorité MOYENNE) 📊
**Objectif** : Suivi en direct de la progression des apprenants

#### Backend :
- [ ] WebSocket avec Socket.io
- [ ] Events progression (vidéo, lecture, quiz)
- [ ] Agrégation données temps réel
- [ ] Cache Redis pour performances

#### Frontend :
- [ ] Dashboard temps réel OF
- [ ] Indicateurs progression live
- [ ] Notifications activité
- [ ] Graphiques animés

### 4. **Notifications & Communications** (Priorité MOYENNE) 📧
**Objectif** : Système complet de notifications

#### Backend :
- [ ] Intégration SendGrid/Resend
- [ ] Queue jobs (Bull/BullMQ)
- [ ] Templates emails transactionnels
- [ ] Préférences notifications user

#### Frontend :
- [ ] Centre de notifications in-app
- [ ] Paramètres préférences
- [ ] Badge non-lus
- [ ] Historique notifications

### 5. **Paiement & Facturation** (Priorité HAUTE) 💳
**Objectif** : Monétisation de la plateforme

#### Backend :
- [ ] Intégration Stripe Connect
- [ ] Webhooks paiements
- [ ] Génération factures PDF
- [ ] Gestion commissions

#### Frontend :
- [ ] Checkout Stripe intégré
- [ ] Dashboard revenus OF
- [ ] Historique transactions
- [ ] Téléchargement factures

### 6. **Analytics Avancés** (Priorité BASSE) 📈
**Objectif** : Tableaux de bord détaillés

#### Backend :
- [ ] Agrégation données complexes
- [ ] Scheduled jobs analytics
- [ ] Export rapports personnalisés
- [ ] API analytics temps réel

#### Frontend :
- [ ] Dashboard analytics OF
- [ ] Graphiques interactifs (Chart.js)
- [ ] Rapports téléchargeables
- [ ] Comparaisons périodes

## Ordre de développement recommandé

1. **Sprint 1** : Marketplace Public (2 semaines)
   - Essentiel pour acquisition utilisateurs
   - Génère des revenus
   - Visibilité formations

2. **Sprint 2** : Certificats (1 semaine)
   - Valeur ajoutée importante
   - Différenciateur concurrentiel
   - Demandé par les OF

3. **Sprint 3** : Paiement Stripe (2 semaines)
   - Monétisation plateforme
   - Automatisation revenus
   - Gestion commissions

4. **Sprint 4** : Notifications (1 semaine)
   - Engagement utilisateurs
   - Communication automatisée
   - Réduction support

5. **Sprint 5** : Tracking temps réel (1 semaine)
   - Valeur pour les OF
   - Meilleur suivi apprenants
   - Différenciateur

6. **Sprint 6** : Analytics avancés (1 semaine)
   - Insights business
   - Optimisation formations
   - Reporting compliance

## État actuel par rapport aux exigences

### ACTE 1 : ORGANISME DE FORMATION
- ✅ **1. CRÉATION** : Profil OF avec validation
- ✅ **2. CRÉATION PROGRAMME** : Modules avec contenus mixtes
- ✅ **3. AJOUT CONTENU** : Upload vidéos/PDF
- ✅ **4. CRÉATION ÉVALUATIONS** : Quiz et examens sécurisés
- ⚠️ **5. PARAMÉTRAGE** : Sessions OK, hybride basique
- ❌ **6. PUBLICATION** : Pas de marketplace public
- ⚠️ **7. GESTION** : Dashboard OK, pas temps réel
- ✅ **8. MONITORING** : Dashboard progression OK
- ❌ **9. CERTIFICATION** : Pas de génération auto

### ACTE 2 : APPRENANT
- ❌ **1. DÉCOUVERTE** : Pas de catalogue public
- ⚠️ **2. INSCRIPTION** : OK si déjà compte, pas public
- ✅ **3. ACCÈS LMS** : Interface sécurisée OK
- ✅ **4. FORMATION** : Progression et tracking OK
- ✅ **5. ÉVALUATION** : Quiz avec feedback OK
- ✅ **6. EXAMEN** : Système anti-fraude OK
- ❌ **7. CERTIFICATION** : Pas de génération
- ⚠️ **8. SUIVI** : Dashboard OK, pas compliance

## Contacts et ressources

- Supabase Dashboard : https://app.supabase.io
- Documentation NestJS : https://docs.nestjs.com
- Documentation Prisma : https://www.prisma.io/docs
- Stripe Docs : https://stripe.com/docs
- SendGrid Docs : https://docs.sendgrid.com

---

Dernière mise à jour : 2025-01-24