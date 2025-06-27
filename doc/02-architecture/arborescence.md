# Arborescence des pages du MVP Front-end MBAVIATION

## 🏠 Pages Principales
- `/` ­– Page d'accueil
  - Hero section avec recherche
  - Sections : formations populaires, catégories, témoignages, statistiques
  - Navigation vers toutes les autres sections
- `/courses` – Catalogue des formations
  - Moteur de recherche avec filtres (catégorie, modalité, dates)
  - Grille des formations avec pagination
  - Lien vers détail de chaque formation
- `/courses/:courseId` – Détail d'une formation
  - Informations complètes (objectifs, programme, sessions)
  - Onglets : Détails / Sessions / Mon inscription
  - Processus d'inscription et paiement

## 👥 Authentification & Inscription
- `/login` – Connexion
- `/register` – Inscription multi-rôles
  - Wizard d'inscription selon le type d'utilisateur
  - Formulaires spécialisés par rôle
- **`/register/learner`** – **Inscription apprenants spécialisée**
  - **Wizard adaptatif 3 parcours :** Libre, Invitation, Affiliation
  - **Validation conditionnelle** selon le type choisi
  - **Redirection intelligente** selon le statut
- `/registration-pending` – Attente validation
- `/verification/kyc` – Vérification d'identité

## 🎯 Tableaux de Bord par Rôle
- **Apprenant** – `/student-dashboard`
  - Mes formations (actives, à venir, terminées)
  - Mes certificats et renouvellements
  - Accès LMS et progression
- **Organisme de formation** – `/training-org-dashboard`
  - Aperçu : graphiques, statistiques
  - Formations : gestion du catalogue
  - Sessions : planning et inscriptions
  - Apprenants : liste des inscrits
  - Ventes : revenus et transactions
  - Profil : informations OF et statut validation
- **Manager d'entreprise** – `/manager-dashboard`
  - Mon équipe : liste des collaborateurs
  - Formations : assignations et suivi
  - Conformité : alertes et échéances
  - Sous-pages :
    - `/manager/pending-requests` – Demandes en attente
    - `/manager/assign-training` – Assigner formations
- **Gestionnaire d'aéroport** – `/airport-manager-dashboard`
  - Vue globale du personnel sur le site
  - Conformité et alertes par entreprise
  - Rapports et statistiques
- **Administrateur** – `/admin-dashboard`
  - Tableau de bord général
  - Sous-sections d'administration :
    - `/admin/users` – Gestion utilisateurs
    - `/admin/organizations` – Gestion organisations
    - `/admin/organizations-approvals` – Validations OF
    - `/admin/courses` – Modération formations
    - `/admin/enrollments` – Gestion inscriptions
    - `/admin/settings` – Configuration plateforme

## 📚 Gestion des Formations
- `/courses/create` – Création de formation (OF)
- `/courses/:courseId/add-session` – Ajout de session
- `/training-org/sessions` – Gestion sessions (OF)

## 💳 Processus de Paiement
- `/payment/:sessionId` – Page de paiement Stripe
- `/payment/success` – Confirmation paiement
- `/payment/cancel` – Paiement annulé

## 🏆 Certificats
- `/certificates` – Mes certificats
- `/certificate/:id` – Visualisation certificat
- `/certificates/tokenize/:id` – Tokenisation blockchain
- `/verify-certificate/:id/:tokenId?` – Vérification publique
- `/qr-scan` – Scanner QR de certificat

## 🎓 LMS (Learning Management System)
- `/lms-redirect/:sessionId` – Redirection sécurisée
- `/lms/course/:courseSlug` – Interface de cours
  - Contenu multimodal (vidéo, PDF, quiz)
  - Vérification identité et anti-fraude
  - Mode examen sécurisé

## 📄 Pages Utilitaires
- `/profile` – Profil utilisateur
- `/contact` – Contact
- `/become-partner` – Devenir partenaire
- `/become-partner/register` – Inscription OF

## 🚫 Pages d'Erreur
- `*` – Page 404 pour routes non trouvées

## 📱 Navigation Principale
- **Header (Navbar)** :
  - Logo MBAVIATION
  - Recherche globale
  - Menu : Courses, Become Partner, Dashboard
  - Profil utilisateur avec dropdown
- **Footer** :
  - Liens légaux et réseaux sociaux
  - Informations entreprise

## 🔐 Contrôle d'Accès par Rôle
- **Public** : `/`, `/courses`, `/contact`, `/become-partner`, `/login`, `/register`
- **Apprenant** : `/student-dashboard`, `/certificates`, `/lms/*`, `/profile`
- **OF** : `/training-org-dashboard`, `/courses/create`, `/training-org/*`
- **Manager** : `/manager-dashboard`, `/manager/*`
- **Airport Manager** : `/airport-manager-dashboard`
- **Admin** : `/admin-dashboard`, `/admin/*`

---
Cette arborescence couvre tous les besoins du MVP selon le cahier des charges, avec une navigation claire et des accès sécurisés par rôle. 