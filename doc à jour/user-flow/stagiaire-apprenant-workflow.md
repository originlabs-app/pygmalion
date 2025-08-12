---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# WORKFLOW STAGIAIRE-APPRENANT
## Spécifications Fonctionnelles Détaillées

**Projet :** Pygmalion - Marketplace de Formation Aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## **1. Création et configuration du compte**

1. **Connexion** → choix : “Déjà inscrit” ou “Nouveau compte”.
2. **Création compte** via **Page inscription KYC** :

   * **Informations personnelles** : nom, prénom, date et lieu de naissance, nationalité, adresse postale complète, email, téléphone.
   * **Documents justificatifs** : pièce d’identité valide (passeport, carte ID, permis), justificatif de domicile (< 3 mois), selfie biométrique.
3. **1re connexion** :

   * Création mot de passe.
   * Paramétrage Authenticator.
   * Authentification OTP via Authenticator (SMS/mail/app).
   * **Cas particuliers** :

     * Si IP identique, pas de 2ᵉ identification MFA.
     * En cas d’échec (authentification ou KYC refusé), message d’erreur + formulaire de contact.
4. **Paramétrage du compte** :

   * Import attestations / certificats antérieurs (LMS ou OF).
   * Affiliation avec une entreprise (avec notification envoyée à celle-ci pour validation).
   * Paramétrage alertes et notifications.
   * Consentement RGPD.
   * Paramétrage Dashboard (présentation, favoris, épingles).

---

## **2. Validation et accès**

5. **Validation création du compte** par modérateur PGM (accès restreint tant que non validé).
6. Accès au **DASHBOARD** (modules selon rôle) :

   * “Mes documents” (attestations, certificats).
   * Paramètres compte/dashboard.

---

## **3. Choix et inscription à une formation**

### Apprenant indépendant :

7. Sélection d’une formation sur la marketplace.
8. Paiement via Stripe.
9. Accès à la formation via espace formation / LMS.
10. À la fin → facture + attestation + éventuels autres documents (feuille de présence…).
11. Génération automatique des documents.

---

## **4. Types de formations**

* **Présentiel** : en salle et/ou en situation.
* **Semi-présentiel** : mix distanciel et présentiel.
* **E-learning asynchrone**.
* **Distanciel synchrone** (visioconférence).

---

## **5. Espace Formation (LMS)**

12. **Mes cours à suivre**.
13. **Formations passées** + historique (mon parcours).
14. **Statistiques** : progression, taux de réussite, parcours personnalisé.
15. **Formations en cours** : accès direct.
16. **Certificats des cours inscrits** (et évolution professionnelle liée).
17. **Ressources pédagogiques** : bibliothèque en ligne (accès uniquement aux formations suivies).
18. Accès direct au **cours** : contenus, modules, activités, QCM, ressources PWP/vidéo.

---

## **6. Fin de formation**

19. **Questionnaire qualité** (Qualiopi & PGM).
20. **Fourniture éléments** pour génération certificat (par l’OF).
21. **Envoi par l’OF** des données nécessaires.
22. **Import certificats** par l’OF dans l’espace formation.
23. **Résultats** :

    * Évaluations de satisfaction.
    * Résultats certification officielle.
24. **Certificat délivré** (autorité ou certificateur) + **attestation conforme tokenisée** (post-MVP).
25. Attestations conformes incluent : logo OF + validateur AHM, liste modules, scores, dates, compétences acquises, durée validité.

---

## **7. Tokenisation** *(Post-MVP 2026)*

26. Certificat → tokenisation → certificat tokenisé consultable.
27. Métadonnées : type de formation, date fin validité, document officiel.

---

## **Notes de mise en œuvre**

Ce document constitue la référence exhaustive du parcours Stagiaire-Apprenant pour la plateforme Pygmalion. Il servira de base pour :
- Le développement des interfaces utilisateur
- L'implémentation des workflows backend
- Les tests d'acceptance et validation
- La formation des équipes support

### **Points critiques d'implémentation**

- **KYC Apprenant** : vérification biométrique avec selfie obligatoire
- **Parcours dual** : support apprenant indépendant ET affilié entreprise
- **Multi-modalités** : gestion synchrone/asynchrone, présentiel/distanciel
- **Tokenisation certificats** : système blockchain pour authentification
- **Bibliothèque restreinte** : accès limité aux formations suivies uniquement

### **Métriques de succès**

- Taux de complétion des formations > 85%
- Satisfaction apprenants > 4.5/5
- Temps moyen d'obtention certificat < 24h
- Taux de validation KYC premier passage > 90%

---

**© 2025 MB Aviation - Tous droits réservés**

**Société porteuse du projet :** MB Aviation  
**Société éditrice :** Kepler Aviation  
**Rédacteurs :** Robin Navarro, Aurélien Francio, Pierre Beunardeau

*Ce document est la propriété exclusive de MB Aviation. Toute reproduction ou distribution non autorisée est strictement interdite.*

---
