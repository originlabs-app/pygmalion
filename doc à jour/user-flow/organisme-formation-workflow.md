---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# WORKFLOW ORGANISME DE FORMATION
## Spécifications Fonctionnelles Détaillées

**Projet :** Pygmalion - Marketplace de Formation Aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## **Organisme de Formation — Flow détaillé**

### **A. Création & Authentification**

1. **Connexion** → choix : “Déjà inscrit” ou “Nouveau compte”.
2. **Création compte** via **Page Inscription KYB** : saisie infos + justificatifs (voir §D).
3. **1re connexion** :

   * Création mot de passe
   * Paramétrage Authenticator
   * Identification OTP via Authenticator
     **Branches** :

     * Succès → étape suivante
     * Échec → retour auth, possible alerte équipe SUPPORT après plusieurs échecs.
4. **Paramétrage du compte** :

   * Ajout équipes/formateurs
   * Configuration des rôles
   * Création d’accès upload pour formateurs affiliés (invitation email)
   * Paramétrage alertes & notifications
   * Consentement RGPD
   * Paramétrage dashboard (présentation, favoris, épingles)

---

### **B. Validation & Accords**

5. **Accès Espace Signature** :

   * Contrat d’engagement
   * Respect CDC
   * CGV
   * CGU
   * Contrat de moralité (optionnel)
6. **Envoi documents pour validation** (voir §D).
7. **Validation création du compte** par modérateur PGM
   → Accès restreint tant que non validé.

---

### **C. Dashboard Marketplace**

8. Modules :

   1. Tableau de Bord / Vente
   2. Gestion des formations
   3. Rapports et Analyses
   4. Paramètres compte/dashboard
9. **Gestion annonces** :

   * Création / modification formations
   * Création articles sur MP
   * Mise en ligne / suppression

---

### **D. Informations & justificatifs obligatoires**

10. **Entreprise** :

    * Raison sociale, forme juridique, SIREN/SIRET, adresse, TVA intracom, domaine d’activité, N° déclaration d’activité.
11. **Documents justificatifs** :

    * Extrait Kbis (<3 mois)
    * Statuts société
    * Pièce ID représentant légal
    * Justificatif identité + domicile bénéficiaires effectifs (>25 % parts)
    * RIB société
    * Justificatif exonération TVA
    * Justificatifs sociaux et fiscaux
    * Certification Qualiopi
12. **Autres selon vigilance** :

    * Attestation non-condamnation dirigeant
    * Déclaration UBO
    * Preuve activité (facture client, site web…)

---

### **E. Création / modification formation**

13. **Champs formation** :

    * Titre, langue, n° classification, description, info métier
    * Objectif, % réussite historique, durée, durée validité
    * Validation visée
    * Programme officiel (PDF)
    * Conditions admission
    * Modalités pédagogiques
    * Infos financement possible
    * Modalité diffusion
14. **Contenu pédagogique** :

    * Création/modification avec outils multimédia (Genially, H5P, iSpring…)
    * Création/modif questionnaires, quiz, QCM
15. **Espace relecture/validation** contenu formation
    → Messages alerte : obligations légales, responsabilité, Qualiopi
16. **Renseignement documents admin/réglementaires** associés.
17. **Restrictions** :

    * Accès aux intitulés conditionné par agréments OF
    * Certaines formations nécessitent habilitation OF

---

### **F. Espace Formation (LMS)**

18. Modules :

    1. Catalogue formation
    2. Créer nouvelle formation
    3. Documents : trames vierges (émargement, attestation…)
    4. Rapports et Analyses
19. Modes création :

    * Import contenu existant (tout type de fichier)
    * Conception A→Z
20. Affectation documents :

    * Sélection sur liste déjà importée
    * Import nouvelles trames
21. Visualisation état formations :

    * En ligne / Brouillon / En attente validation / À mettre à jour
22. Suivi performance :

    * Résultats éval apprenants
    * Taux réussite par session et global
    * Résultats enquêtes à chaud/froid
    * Notation formation, assiduité
23. Lien MP ↔ LMS :

    * Rapprochement article MP et formation LMS
    * Infos session : tarif, durée, dates, lieux, prérequis, min/max apprenants
    * Visibilité online/offline
    * Rôle & accessibilité formateurs affiliés

---

### **G. Qualité & modération**

24. Si mauvaise note :

    * Envoi mail + notification
    * Mise en demeure mise offline
    * Accès modification depuis tableau

---

### **H. Tokenisation (Post-MVP 2026)**

25. Après validation réussite formation :

    * Génération documents (émargement, attestation, certificat, facture)
    * Tokenisation certificat
    * Émission certificat tokenisé

---

## **Notes de mise en œuvre**

Ce document constitue la référence exhaustive du parcours Organisme de Formation pour la plateforme Pygmalion. Il servira de base pour :
- Le développement des interfaces utilisateur
- L'implémentation des workflows backend
- Les tests d'acceptance et validation
- La formation des équipes support

---

**© 2025 MB Aviation - Tous droits réservés**

**Société porteuse du projet :** MB Aviation  
**Société éditrice :** Kepler Aviation  
**Rédacteurs :** Robin Navarro, Aurélien Francio, Pierre Beunardeau

*Ce document est la propriété exclusive de MB Aviation. Toute reproduction ou distribution non autorisée est strictement interdite.*

---
