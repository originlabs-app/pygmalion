# Documentation Backend – MVP MBAVIATION

> ⚠️ **Note :** Le contenu présenté ci-dessous constitue une première version pour le MVP. Il pourra évoluer au gré des besoins fonctionnels, des optimisations de performance ou des contraintes règlementaires.

---

## 1. Architecture Technique Cible

*   **Backend Applicatif :** **NestJS (TypeScript)**. Déployé sur **Render** ou **Heroku**. C'est le cœur de l'application qui gère toute la logique métier.
*   **Base de Données :** **PostgreSQL** via le service managé de **Supabase**. Le backend NestJS communique avec la BDD via un ORM (ex: Prisma).
*   **Authentification :** **Supabase Auth**. Le frontend interagit avec Supabase Auth pour le login/MFA, et envoie le JWT obtenu au backend NestJS. Le backend valide ce JWT en utilisant le SDK Admin de Supabase.
*   **Stockage de Fichiers (Storage) :** **Supabase Storage**. Le backend NestJS génère des URLs signées pour permettre au client d'uploader/downloader des fichiers de manière sécurisée (documents KYC, images de cours, etc.).
*   **Fonctions Serverless (Edge Functions) :** Utilisation minimale et stratégique pour des webhooks ou des tâches simples et découplées qui ne nécessitent pas le contexte complet de l'application NestJS.

---

## 2. API Endpoints (Implémentés dans NestJS)

### 2.1 Authentication & User Management
```http
POST /auth/register
POST /auth/verify-kyc
GET  /users/profile/:userId
PUT  /users/profile/:userId
```

Payloads :
```jsonc
// POST /auth/register
{
  "email": "string",
  "password": "string",
  "name": "string",
  "role": "student | training-org | manager | airport-manager",
  "organization": "string?",
  "metadata": { /* objet libre */ }
}
```

### 2.2 Course Management
```http
POST /courses/create
GET  /courses/search          # Requêtes par query params (q, category…)
POST /courses/:courseId/sessions
```

### 2.3 Enrollment & Payment
```http
POST /enrollments/create
POST /payments/create-checkout # Interagit avec l'API Stripe
POST /payments/verify
```

### 2.4 Certificate Management
```http
POST /certificates/generate
POST /certificates/tokenize
GET  /certificates/verify/:certificateNumber
POST /certificates/revoke
```

### 2.5 Compliance & Alerts
```http
GET  /compliance/alerts/:userId
GET  /compliance/team-status/:managerId
GET  /compliance/airport-status/:airportId
POST /compliance/alerts/acknowledge
```

### 2.6 LMS Intégré
```http
POST /lms/create-user
POST /lms/enroll-user
GET  /lms/progress/:enrollmentId
PUT  /lms/progress/:enrollmentId
```

---

## 3. Fonctionnalités Backend Avancées (Localisation)

*   **Système d'Alertes Automatiques :** Géré par un ordonnanceur de tâches (cron job) au sein de l'application **NestJS** (ex: via `nest-schedule`).
*   **Audit Trail & Logging :** Logique implémentée dans **NestJS** via des intercepteurs ou des décorateurs pour tracer les actions dans la table `audit_logs`.
*   **Génération de Rapports :** Endpoint dans **NestJS** qui interroge la base de données et formate les données en PDF/CSV.
*   **Cache & Performance :** Géré au niveau de **NestJS**, en utilisant Redis ou un cache in-memory pour les requêtes fréquentes.
*   **Sécurité & Rate Limiting :** Implémenté dans **NestJS** (via `helmet`, `express-rate-limit`, etc.).
*   **Notifications Temps Réel :** Le backend **NestJS** peut déclencher des notifications en envoyant des messages aux channels **Supabase Realtime**.
*   **File Storage & CDN :** Orchestré par **NestJS** qui communique avec le service **Supabase Storage**.

---

## 4. Routes Frontend (Référence)

Cette section liste les URLs côté client pour référence et n'impacte pas directement l'API backend.

### 4.1 Routes Publiques
```http
GET /                          # Homepage avec recherche formations
GET /courses                   # Catalogue formations avec filtres
GET /courses/:courseId         # Détail formation + sessions
GET /login                     # Connexion utilisateur
GET /register                  # Inscription (wizard multi-rôles)
GET /become-partner            # Landing page partenaires OF
GET /become-partner/register   # Inscription OF spécialisée
GET /contact                   # Formulaire contact
GET /verify-certificate/:id/:tokenId? # Vérification publique certificats
GET /qr-scan                   # Scanner QR certificats
```

### 4.2 Routes Authentifiées – Étudiant
```http
GET /student-dashboard         # Dashboard principal étudiant
GET /certificates              # Liste certificats personnels
GET /certificate/:id           # Visualisation certificat
GET /certificates/tokenize/:id # Tokenisation blockchain
GET /lms-redirect/:sessionId   # Redirection sécurisée LMS
GET /lms/course/:courseSlug    # Interface LMS intégrée
GET /profile                   # Profil utilisateur
GET /verification/kyc          # Processus KYC/vérification identité
```

### 4.3 Routes Authentifiées – Organisme de Formation
```http
GET /training-org-dashboard           # Dashboard OF principal
GET /courses/create                   # Création nouvelle formation
GET /courses/:courseId/add-session    # Ajout session à formation
GET /training-org/sessions            # Gestion planning sessions
```

### 4.4 Routes Authentifiées – Manager
```http
GET /manager-dashboard        # Dashboard manager entreprise
GET /manager/pending-requests # Demandes inscription équipe
GET /manager/assign-training  # Attribution formations équipe
```

### 4.5 Routes Authentifiées – Gestionnaire Aéroport
```http
GET /airport-manager-dashboard # Dashboard gestionnaire aéroport
```

### 4.6 Routes Authentifiées – Admin
```http
GET /admin-dashboard                 # Dashboard admin principal
GET /admin/users                     # Gestion utilisateurs
GET /admin/organizations             # Gestion organisations
GET /admin/organizations-approvals   # Validation OF
GET /admin/courses                   # Modération formations
GET /admin/enrollments               # Gestion inscriptions
GET /admin/settings                  # Configuration plateforme
```

### 4.7 Routes Paiement
```http
GET /payment/:sessionId  # Interface paiement Stripe
GET /payment/success     # Confirmation paiement réussi
GET /payment/cancel      # Annulation paiement
```

---

Ce document sert de référence technique pour l'équipe backend et les intégrations front. Toute modification majeure devra suivre un processus de revue, documentation et versionning adéquat. 