---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# WORKFLOW ESPACE FORMATEUR
## Spécifications Fonctionnelles Détaillées

**Projet :** Pygmalion - Marketplace de Formation Aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

# 0) Inscription & choix du profil

1. Arrivée sur **Page d’inscription** avec champs :
   – *Identifiant (email ?)*, *Mot de passe*, *Sélection du profil* (liste déroulante) : **Apprenant / Entreprise / Organisme de Formation / Formateur**.&#x20;
2. **Choix du profil “Formateur”.** En cas de **Déjà inscrit**, on passe directement par la page d’authentification.&#x20;
3. **Création du compte** puis **1re connexion**. En cas d’**échec** (mauvais identifiants ou autre), retour page auth avec statut d’erreur.&#x20;
4. **KYC Formateur** (page dédiée) : saisie/collecte d’informations personnelles requises.&#x20;

# 1) Authentification & MFA

5. **Page Authentification** : identifiant + mot de passe. **OTP** possible via **SMS/mail** ou **application dédiée**. Branche **Échec** explicite en cas de code invalide.&#x20;
6. **Paramétrage Authenticator** (liaison d’une app d’authentification), puis **Seconde identification MFA** (vérification OTP). Branches **Échec** prévues à chaque étape ; si **échecs multiples**, **Alerte Équipe Support** (prise de contact).&#x20;
7. **Création du mot de passe** (si nouveau compte) et **Choix de la langue** du compte. **Succès** ➜ accès au **DASHBOARD** (avec restrictions possibles, voir §3).&#x20;

# 2) Paramétrage du compte & rattachement

8. **Paramétrage du compte** (préférences, notifications). **Paramétrage des alertes & notifications** mentionné explicitement.&#x20;
9. **Paramétrage Dashboard** : **gestion de la présentation / favoris / épingles**.&#x20;
10. **Choix de l’OF (Organisme de Formation) pour lequel j’interviens.** Cette association conditionne les droits et la visibilité. **Succès** attendu après sélection valide.&#x20;

# 3) Accords & restrictions d’accès

11. **Accès Espace Signature** : **Contrat d’Engagement**, **CGV**, **CGU** à accepter.&#x20;
12. **Accès restreint** tant que **les documents** transmis ne sont **pas validés par le modérateur PGM** (gating). Une autre mention de **“Accès restreint le temps de validation des documents par modérateur”** apparaît côté LMS.&#x20;
13. **Validation création du compte** (état “succès”) une fois l’ensemble des prérequis (KYC + accords) validés.&#x20;

# 4) Dashboard → navigation vers Marketplace & LMS

14. Depuis le **DASHBOARD** (nœud central du flow), le formateur a des entrées vers **MARKETPLACE** et surtout vers **LMS / ESPACE FORMATION**.&#x20;

# 5) LMS – ESPACE FORMATION (menus & contenus)

15. **Menu 1 – “Liste des formations que je dispense”** : vue centrée “mes cours”.&#x20;
16. **Menu 2 – “Calendrier de mes prochaines formations”** : planning personnel des prochaines sessions ; l’UI propose aussi un **Aperçu des prochaines sessions**.&#x20;
17. **Menu 3 – “Documents (pédagogiques)”** :

* **Émargement**, **Certificat**, **Déroulé** (documents clés) ;
* **Programme de la formation (pour les stagiaires)** ;
* **Résultats des tests de positionnement** (réalisés avant le début de la formation) ;
* **Déroulé pédagogique** *(à compléter par le formateur)* ;
* **Fiches séances** *(à compléter par le formateur)* ;
* **Fiches d’évaluation pédagogique** *(à compléter par le formateur, avec objectifs visés, mode d’évaluation, barème de notation pour chaque apprenant)*.&#x20;

18. **Menu 4 – “Rapports et Analyses (voir Requirements)”** : reporting pédagogique/activité (spécifiques à définir dans le PDD).&#x20;
19. **Menu 5 – “Paramètres (voir Requirements)”** : préférences de l’espace formation (détails à préciser).&#x20;
20. **Menu 6 – “Ressources pédagogiques (supports, contenus, etc.)”** : dépôt/gestion des supports pédagogiques.&#x20;

# 6) Conduite de session & salle de classe

21. **Accès à ma salle de classe** : point d’entrée pour conduire les sessions.&#x20;
22. **Dispensation de formation multimodale** : le diagramme indique explicitement la conduite de cours en plusieurs modalités (présentiel, distanciel, e-learning).&#x20;
23. **Validation de la formation** (fin de parcours apprenant) : permet de clôturer la session côté formateur/LMS après atteinte des critères (implicite dans le flow).&#x20;

# 7) Qualité & obligations

24. **Questionnaire qualité formation – Qualiopi & PGM** : recueil systématique des évaluations qualité (à chaud/à froid géré côté produit).&#x20;
25. **Génération des certificats de formation + Token + Doc obligatoire** :

* Génération de certificats/attestations/émargements,
* **Tokenisation** du certificat (post-MVP simple),
* Production/association des **documents obligatoires**.&#x20;

26. **Envoi facture et autres documents** : émission/transmission des pièces de fin de session (selon process).&#x20;

# 8) États & branches d’exception (clairs sur le schéma)

27. **Échec** possible à chaque étape d’authentification/MFA/Authenticator → message d’erreur + retour étape précédente. **Alerte Équipe Support** si échecs répétés (process d’assistance).&#x20;
28. **Accès restreint** tant que la **validation modérateur PGM** n’est pas obtenue (gating d’entrée dans l’espace formation).&#x20;
29. **Succès** : une fois validé, le formateur accède à tout l’**ESPACE FORMATION** avec l’ensemble des menus ci-dessus.&#x20;

---

## **Notes de mise en œuvre**

Ce document constitue la référence exhaustive du parcours Formateur pour la plateforme Pygmalion. Il servira de base pour :
- Le développement des interfaces utilisateur
- L'implémentation des workflows backend
- Les tests d'acceptance et validation
- La formation des équipes support

### **Points critiques d'implémentation**

- **Authentification MFA** : obligatoire pour tous les formateurs
- **Validation modérateur** : gating strict avant accès aux fonctionnalités
- **Documents pédagogiques** : génération automatique avec templates prédéfinis
- **Tokenisation** : système de certification blockchain pour traçabilité

---

**© 2025 MB Aviation - Tous droits réservés**

**Société porteuse du projet :** MB Aviation  
**Société éditrice :** Kepler Aviation  
**Rédacteurs :** Robin Navarro, Aurélien Francio, Pierre Beunardeau

*Ce document est la propriété exclusive de MB Aviation. Toute reproduction ou distribution non autorisée est strictement interdite.*

---
