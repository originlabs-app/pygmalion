---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# WORKFLOW PARCOURS ENTREPRISE & GESTIONNAIRE D'AÉROPORT
## Spécifications Fonctionnelles Détaillées

**Projet :** Pygmalion - Marketplace de Formation Aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## **1. Parcours Entreprise** *(à parcourir avec CMA)*

### A. Création et configuration du compte

1. **Connexion** → Choix : “Déjà inscrit” ou “Nouveau compte”.
2. **Création compte** via **Page inscription KYB** :

   * Informations entreprise (raison sociale, forme juridique, SIREN/SIRET, adresse, TVA intracom, code APE/NAF, domaine d’activité).
   * Documents justificatifs : extrait Kbis (<3 mois), statuts société, pièce d’identité représentant légal, justificatifs des bénéficiaires effectifs (>25% parts), RIB, justificatifs sociaux/fiscaux, attestation non-condamnation, déclaration UBO, preuve activité.
3. **1re connexion** :

   * Création mot de passe.
   * Paramétrage Authenticator.
   * Identification OTP (SMS/mail/app).
4. **Paramétrage du compte** :

   * Ajout des équipes.
   * Configuration des rôles (menu déroulant, personnalisation).
   * Import des certifications antérieures (manuel ou fichier du personnel).
   * Aliénation entre entreprises exploitantes et site(s) d’exploitation.
   * Paramétrage alertes et notifications.
   * Consentement RGPD.
   * Paramétrage Dashboard (présentation, favoris, épingles).
5. **Validation du compte** par modérateur PGM (accès restreint tant que non validé).
6. **A chaque connexion** : authentification MFA.

---

### B. Dashboard Entreprise

7. Modules :

   1. **Tableau de bord** (voir requirements).
   2. **Wallet** : documents de validation (attestations tokenisées, certificats).
   3. **Rapports et analyses**.
   4. **Paramètres**.
   5. **Documents contractuels** : devis, conventions, factures, feuilles de présence.
   6. **Notifications**.

---

### C. Parcours standard (formations obligatoires)

8. Depuis **Gestion des formations** :

   * Sélection d’une ou plusieurs formations.
   * Choix des participants (case à cocher/liste déroulante).
   * Rédaction automatique de la convention.
   * Signature par l’entreprise.
   * Envoi automatique par l’OF.
   * Paiement via Stripe.
   * Convention signée → formation disponible dans “Gestion des formations”.
   * Emission facture + notifications.

---

### D. Parcours sur-mesure

9. Étapes :

   * Demande de renseignement (devis + programme) → ouverture d’une interface sécurisée avec revendeur.
   * Retour OF avec proposition (devis + programme).
   * Recueil des besoins et/ou tests de positionnement.
   * Modification/adaptation du programme.
   * Rédaction/envoi du devis.
   * Validation/refus client.
   * Si validation → rédaction/envoi convention.
   * Signature convention.
   * Paiement via Stripe.
   * Formation disponible.
   * Émission facture + notifications.

---

## **2. Parcours Gestionnaire d’Aéroport** *(à parcourir avec ARU/GTE)*

### A. Dashboard Gestionnaire

1. **Tableau de bord** : suivi conformité des entreprises affiliées.
2. **Indicateurs de conformité** :

   * Formations à venir.
   * Formations en cours.
   * Formations passées.
3. **Accès entreprise** : vue détaillée des équipes et formations suivies.

---

### B. Workflow contrôle/validation

4. **Vérification du registre des formations** (entreprise → personnel).
5. **Identification des manquants / formations expirées**.
6. **Communication avec entreprise** pour régularisation :

   * Demande d’inscription.
   * Suivi statut.
7. **Validation de la conformité** après formation.

---

## **Notes de mise en œuvre**

Ce document constitue la référence exhaustive des parcours Entreprise et Gestionnaire d'Aéroport pour la plateforme Pygmalion. Il servira de base pour :
- Le développement des interfaces utilisateur
- L'implémentation des workflows backend
- Les tests d'acceptance et validation
- La formation des équipes support

### **Points critiques d'implémentation**

- **KYB Entreprise** : validation stricte des documents légaux et fiscaux
- **Gestion d'équipes** : système de rôles et permissions granulaire
- **Parcours sur-mesure** : workflow adaptatif avec tests de positionnement
- **Conformité aéroportuaire** : tracking temps réel des certifications obligatoires
- **Intégration Stripe** : gestion des paiements groupés et conventions

---

**© 2025 MB Aviation - Tous droits réservés**

**Société porteuse du projet :** MB Aviation  
**Société éditrice :** Kepler Aviation  
**Rédacteurs :** Robin Navarro, Aurélien Francio, Pierre Beunardeau

*Ce document est la propriété exclusive de MB Aviation. Toute reproduction ou distribution non autorisée est strictement interdite.*

---
