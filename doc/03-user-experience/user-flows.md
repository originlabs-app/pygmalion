# Parcours Utilisateur (User Flows) – MVP MBAVIATION

## 🎯 1. Apprenant Externe – Inscription et Achat de Formation
1. Arrivée sur la homepage (`/`)
2. Recherche formation → `/courses` (avec filtres)
3. Sélection formation → `/courses/:courseId`
4. Consultation sessions disponibles
5. Clic « S'inscrire » → Vérification connexion
6. Si non connecté → `/login` ou `/register`
7. Création compte apprenant
8. Retour sur `/courses/:courseId`
9. Sélection session + paiement → `/payment/:sessionId`
10. Paiement Stripe → `/payment/success`
11. Accès formation → `/lms-redirect/:sessionId` → `/lms/course/:courseSlug`
12. Suivi progression → `/student-dashboard`
13. Certificat obtenu → `/certificates`

---

## 🏢 2. Organisme de Formation – Création et Gestion
1. Découverte → `/become-partner`
2. Inscription → `/become-partner/register` (formulaire spécialisé OF)
3. Soumission dossier → `/registration-pending`
4. Validation admin → notification par email
5. Première connexion → `/training-org-dashboard`
6. Configuration profil → onglet « Profil »
7. Création formation → `/courses/create`
8. Ajout sessions → `/courses/:courseId/add-session`
9. Gestion inscriptions → onglet « Apprenants »
10. Suivi ventes → onglet « Ventes »
11. Gestion planning → `/training-org/sessions`

---

## 👔 3. Manager d'Entreprise – Gestion Équipe
1. Inscription → `/register` (rôle manager)
2. Validation KYB → `/verification/kyc`
3. Accès dashboard → `/manager-dashboard`
4. Import équipe → interface upload Excel (à développer)
5. Consultation conformité équipe → alertes visuelles
6. Assignation formation → `/manager/assign-training`
7. Validation demandes → `/manager/pending-requests`
8. Suivi progression équipe → tableaux de bord
9. Génération rapports conformité

---

## 🛫 4. Gestionnaire d'Aéroport – Supervision Globale
1. Inscription → `/register` (rôle airport-manager)
2. Configuration site exploitation
3. Affiliation entreprises présentes
4. Accès dashboard → `/airport-manager-dashboard`
5. Supervision conformité globale
6. Alertes manquements formation
7. Génération rapports aéroport
8. Contrôle personnel autorisé

---

## 🔧 5. Administrateur – Gestion Plateforme
1. Connexion → `/login` (compte admin)
2. Dashboard général → `/admin-dashboard`
3. Validation OF → `/admin/organizations-approvals`
4. Gestion utilisateurs → `/admin/users`
5. Modération formations → `/admin/courses`
6. Gestion inscriptions → `/admin/enrollments`
7. Configuration plateforme → `/admin/settings`
8. Support utilisateurs

---

## 📱 6. Apprenant Interne – Formation Assignée
1. Réception notification (email/dashboard)
2. Connexion → `/student-dashboard`
3. Consultation formation assignée
4. Demande validation manager → `/manager/pending-requests`
5. Approbation manager
6. Accès formation → `/lms-redirect/:sessionId`
7. Completion formation → certificat automatique
8. Mise à jour conformité équipe

---

## 💳 7. Processus de Paiement (Détaillé)
1. Sélection session payante → `/courses/:courseId`
2. Clic « S'inscrire » → vérification places disponibles
3. Récapitulatif commande → `/payment/:sessionId`
4. Interface Stripe → saisie CB
5. Validation paiement → déclenchement inscriptions
6. Confirmation → `/payment/success`
7. Email confirmation + accès LMS
8. Si échec → `/payment/cancel` avec options retry

---

## 🏆 8. Gestion des Certificats
1. Completion formation → génération automatique certificat
2. Notification apprenant → `/certificates`
3. Consultation certificat → `/certificate/:id`
4. Option tokenisation → `/certificates/tokenize/:id`
5. Partage certificat → QR code généré
6. Vérification publique → `/verify-certificate/:id`
7. Scan QR → `/qr-scan` → validation blockchain

---

## 🔐 9. Vérification d'Identité (KYC/KYB)
1. Première connexion → redirection `/verification/kyc`
2. Upload documents identité
3. Vérification biométrique (selfie + ID)
4. Validation automatique/manuelle
5. Déblocage accès complet plateforme
6. Notification statut validation

---

## 🚨 10. Gestion des Alertes de Conformité
1. Système détecte échéance proche (30 j, 15 j, 7 j)
2. Génération alerte automatique
3. Notification manager + apprenant
4. Affichage dashboard avec priorité
5. Lien direct vers formations de renouvellement
6. Suivi jusqu'à completion
7. Mise à jour statut conformité

---

Ces parcours couvrent l'ensemble des cas d'usage principaux du MVP et montrent l'interconnexion entre les rôles et fonctionnalités de la plateforme. 