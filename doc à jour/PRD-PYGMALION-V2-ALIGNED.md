---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# PRD - PRODUCT REQUIREMENTS DOCUMENT
## PYGMALION - Marketplace Formation Aéronautique

**Projet :** Pygmalion - Plateforme de Formation Aéronautique  
**Version :** 2.0 - Aligned  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## **1. INTRODUCTION / VUE D'ENSEMBLE**

### **Vision**
> **"Udemy pour les formations et formateurs du secteur aérien et aéroportuaire"**

### **Problème à résoudre**
MBAVIATION, ses clients entreprises (compagnies aériennes, aéroports, prestataires), ses organismes de formation partenaires (OF) et les apprenants individuels du secteur aéronautique manquent d'une plateforme centralisée et efficace pour gérer, contrôler et anticiper l'ensemble du cycle de vie de la formation.

**Défis actuels :**
- Dispersion des offres de formation
- Complexité du suivi des qualifications/certifications dans un secteur très réglementé
- Difficulté pour les managers/entreprises de superviser la conformité
- Lourdeur administrative liée aux exigences Qualiopi
- Manque d'outils intégrés pour gérer diverses modalités (présentiel, e-learning, virtuel)
- Manque de visibilité pour les gestionnaires d'aéroport sur la conformité globale

### **Solution Proposée - PHASES**

#### **PHASE 1 - MVP (Q3 2025)**
Une plateforme intégrée comprenant :
- **Marketplace** pour la découverte et l'inscription aux formations
- **LMS sécurisé** pour la livraison et le suivi (multimodal)
- Publication d'offres par OF validés
- Recherche et consultation de formations
- Inscription avec déclenchement automatique LMS
- Tableaux de bord multi-rôles
- **Tokenisation blockchain des certificats** (smart contracts + NFT)
- Système d'alertes conformité basique

#### **PHASE 2 - POST-MVP (Q4 2025)**
- Système anti-fraude IA avancé
- Intégrations OPCO/CPF pour financements
- Analytics et reporting avancés
- Gestion d'équipes complexe
- Import/export données enrichi
- Système de notation détaillé

#### **PHASE 3 - ALL-IN (2026+)**
- Blockchain complet pour certificats
- IA prédictive pour conformité
- Marketplace internationale
- Integrations ERP/SIRH natives
- Proctoring IA temps réel

### **Vision à long terme**
Devenir la plateforme mondiale de référence pour la formation certifiante dans le secteur aéronautique, reconnue pour sa qualité (Qualiopi), sa sécurité (MFA, KYC/KYB), son efficacité opérationnelle et administrative.

---

## **2. OBJECTIFS (GOALS) - POUR LE MVP**

### **Objectifs Business**
- Intégrer **5-10 organismes de formation** partenaires clés dans les 6 mois post-lancement
- Gérer les inscriptions pour **400 à 10,000 apprenants** via la plateforme dans les 6 mois *(fourchette à affiner par MB Aviation)*
- Valider le modèle économique : **Modèle commission pure** - Commission **[À DÉCIDER : 15% OU 15-20% ?]** sur les inscriptions
- Démontrer la capacité à capturer les données de conformité
- Mise en place du système d'alerte défaillances de formation
- **Objectif fin 2025 : Entre 2,000 et 10,000 utilisateurs actifs** *(selon stratégie MB Aviation)*

### **Objectifs Produit**
- Permettre aux OF validés de créer profil et publier formations avec sessions
- Import en masse du personnel entreprise (template Excel)
- Dashboard Manager : visualisation équipe et statistiques
- Recherche formations par mot-clé et catégorie
- Inscription/paiement externe via Stripe
- Assignation interne sans paiement CB
- Génération automatique documents (émargement, attestation, certificat)
- **Émission diplômes tokenisés** (hash unique + QR code vérifiable)
- Déclenchement automatique inscription LMS
- Tableaux de bord par rôle (OF, Apprenant, Manager, Gestionnaire aéroport)

---

## **3. PUBLIC CIBLE (USER PERSONAS) - MVP**

### **1. Organisme de Formation (Admin OF) - Partenaire Validé**
**Besoin principal :** Augmenter visibilité, obtenir inscrits qualifiés, simplifier gestion, respecter Qualiopi

**Doit pouvoir (MVP) :**
- Passer processus validation (KYB + documents Qualiopi)
- Signer CDC/CGU/CGV en ligne
- Créer/modifier profil OF
- Créer/gérer formations (toutes modalités)
- Définir sessions (dates, prix, modalité, places)
- Importer/modifier contenus formation
- Voir inscrits par session
- Accéder dashboard ventes

### **2. Formateur (Interne/Externe)**
**Besoin principal :** Dispenser formations, gérer documents pédagogiques, suivre progressions

**Doit pouvoir (MVP) :**
- Créer compte avec validation KYC/CAC
- S'affilier à un ou plusieurs OF
- Accéder aux formations assignées
- Gérer documents pédagogiques (émargement, déroulé, fiches)
- Valider formations et générer certificats
- Accéder calendrier sessions
- Compléter questionnaires qualité

### **3. Apprenant Interne (Salarié entreprise/aéroport)**
**Besoin principal :** Accéder formations requises, maintenir certifications, suivre progression

**Doit pouvoir (MVP) :**
- Se connecter (SSO ou compte créé par Manager)
- Valider KYC
- Voir formations disponibles/assignées
- S'inscrire sans paiement direct
- Accéder tableau de bord personnel
- Accéder aux cours LMS
- Télécharger certificats tokenisés

### **4. Apprenant Externe (Individuel)**
**Besoin principal :** Trouver formation aviation, comparer, s'inscrire, payer

**Doit pouvoir (MVP) :**
- Créer compte et valider KYC
- Chercher/comparer formations
- S'inscrire et payer par CB (Stripe)
- Accéder cours LMS
- Télécharger certificats tokenisés
- S'affilier à employeur ultérieurement

### **5. Manager Entreprise (Responsable équipe/RH/formation)**
**Besoin principal :** Assurer formation équipes, conformité, suivi échéances, gérer budget

**Doit pouvoir (MVP) :**
- Créer compte entreprise avec KYB
- Importer personnel (Excel/CSV)
- Affilier apprenants
- Assigner formations sans paiement
- Suivre état conformité avec alertes
- Gérer budget formation
- Exporter rapports

### **6. Gestionnaire Aéroport**
**Besoin principal :** Contrôler conformité tout personnel sur site, alertes temps réel

**Doit pouvoir (MVP) :**
- Créer compte avec KYB
- Affilier entreprises du site
- Visualiser état formation global
- Recevoir alertes non-conformité
- Télécharger rapports conformité
- Superviser multi-entreprises

### **7. Administrateur Plateforme (Équipe PYGMALION)**
**Types :** Technique (bugs), Opérationnel (assistance), Commercial (démos)

**Doit pouvoir (MVP) :**
- Superviser fonctionnement global
- Valider OF selon critères définis
- Gérer utilisateurs tous rôles
- Modérer contenu
- Voir transactions/inscriptions
- Support client

---

## **4. PÉRIMÈTRE (SCOPE)**

### **CE QUI EST INCLUS - MVP**

#### **Gestion des comptes**
- Création comptes multi-rôles (OF, Formateur, Apprenant, Manager, Gestionnaire)
- Validation KYC/KYB/CAC selon rôle
- Authentification MFA/OTP obligatoire
- SSO pour connexion unique MP/LMS

#### **Catalogue formations**
- Création/gestion formations par OF validés
- Toutes modalités (présentiel, e-learning, virtuel, blended)
- Sessions avec dates, lieux, prix, places
- Champs Qualiopi basiques
- Import contenus existants

#### **Recherche et inscription**
- Moteur recherche avec filtres
- Page détails formation
- Inscription externe avec paiement Stripe
- Assignation interne sans paiement
- Déclenchement automatique LMS

#### **Documents et certificats**
- Génération automatique (émargement, attestation, facture)
- **Tokenisation blockchain des certificats** (NFT + smart contracts)
- Stockage décentralisé sur blockchain
- Vérification publique via blockchain

#### **Tableaux de bord**
- Dashboard OF : formations, inscrits, ventes
- Dashboard Apprenant : inscriptions, certificats
- Dashboard Manager : équipe, conformité, alertes
- Dashboard Gestionnaire : vue globale site

#### **Import/Export données**
- Import personnel via Excel/CSV (template fourni)
- Export listes inscrits
- Export rapports conformité
- API basique pour intégrations

#### **Gestion budgétaire**
- Suivi budget formation par entreprise
- Allocation par équipe/service
- Reporting consommation
- Prévisionnel N+1

#### **Processus validation OF**
- Workflow détaillé avec étapes :
  1. Soumission documents (Kbis, Qualiopi, etc.)
  2. Vérification modérateur
  3. Signature CDC/CGV
  4. Activation compte
- Critères : Certification Qualiopi valide, documents légaux, références

#### **Système alertes conformité**
- Alertes échéances formations
- Dashboard non-conformités
- Notifications email automatiques
- Rapports pour autorités

### **CE QUI EST EXCLU - MVP (POUR POST-MVP)**

#### **Post-MVP prioritaire (Q4 2025)**
- **Système anti-fraude IA** (proctoring, biométrie)
- Financements OPCO/CPF
- Gestion équipes avancée
- Système notation détaillé
- Comparateur avancé
- Recommandations IA

#### **All-in (2026+)**
- Blockchain complet (smart contracts)
- Chatbot IA
- API externes CRM
- Gestion devis complexe
- Bibliothèque pédagogique
- Multi-profil simultané

---

## **5. EXIGENCES FONCTIONNELLES (HAUT NIVEAU)**

### **Système principal**
- Le système permettra aux OF validés de publier et gérer leurs formations
- Le système permettra la recherche et inscription aux formations
- Le système déclenchera l'accès LMS automatiquement
- Le système gérera les paiements sécurisés via Stripe
- Le système fournira des tableaux de bord adaptés par rôle
- Le système permettra l'import/export de données
- Le système générera automatiquement les documents requis
- **Le système permettra la tokenisation blockchain des certificats** (NFT + smart contracts)
- Le système alertera sur les non-conformités
- Le système respectera RGPD et privacy by design

---

## **6. EXIGENCES NON-FONCTIONNELLES**

### **Performance & Fiabilité**
- Temps chargement < 3 secondes
- Disponibilité 99.5% minimum
- Support 1000+ utilisateurs simultanés
- Backup automatique quotidien

### **Sécurité**
- RGPD et privacy by design
- PCI-DSS pour paiements (via Stripe)
- MFA/OTP obligatoire tous rôles
- Chiffrement AES-256
- Audit trail complet
- **[POST-MVP++] Biométrie et anti-fraude IA**

### **Compatibilité**
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive design (desktop prioritaire admin)
- Mobile-friendly pour apprenants
- API RESTful documentée

### **Maintenabilité**
- Code documenté et tests unitaires
- Architecture microservices
- CI/CD automatisé
- Monitoring temps réel

---

## **7. MÉTRIQUES DE SUCCÈS (KPIs)**

### **Business KPIs**
- Nombre OF validés et actifs : **[OBJECTIF : 5-10]**
- Nombre formations publiées : **[OBJECTIF : 100+]**
- Nombre inscriptions totales : **[OBJECTIF : 400-10,000 selon stratégie]**
- Taux conversion visiteur → inscrit : **[OBJECTIF : 15%]**
- Revenue mensuel récurrent : **[OBJECTIF : À DÉFINIR]**

### **Product KPIs**
- Nombre entreprises actives : **[OBJECTIF : 20+]**
- Nombre apprenants internes gérés : **[OBJECTIF : 300+]**
- Taux succès inscriptions LMS : **[OBJECTIF : 99%]**
- Taux satisfaction (NPS) : **[OBJECTIF : 50+]**
- Temps moyen validation OF : **[OBJECTIF : < 48h]**

### **Technical KPIs**
- Uptime plateforme : **99.5%**
- Temps réponse API : **< 200ms**
- Taux erreur paiements : **< 1%**
- Couverture tests : **> 80%**

---

## **8. HYPOTHÈSES ET CONTRAINTES**

### **Hypothèses**
- OF prêts à fournir documents validation (Qualiopi, etc.)
- Entreprises accepteront utilisation plateforme
- Modèle économique viable : **Commission pure 15-20%**
- Intégration LMS techniquement faisable dans délais

### **Contraintes**
- Budget développement MVP : **[À DÉFINIR]**
- Délai lancement MVP : **[Q3 2025]**
- Technologie imposée : NestJS + React + Stripe
- Respect strict RGPD avec privacy by design
- Affichage informations Qualiopi obligatoire
- Processus validation OF fonctionnel dès MVP
- Alertes conformité fonctionnelles dès MVP
- **Tokenisation blockchain dès MVP** (smart contracts + NFT)

---

## **9. ROADMAP DÉTAILLÉE**

### **MVP (Q3 2025) - 3 mois**
✓ Core marketplace  
✓ LMS multimodal  
✓ Paiements Stripe  
✓ Tokenisation blockchain certificats  
✓ Alertes conformité base  
✓ Import/export données  
✓ Dashboards multi-rôles  

### **Post-MVP (Q4 2025) - 3 mois**
→ Anti-fraude IA  
→ Financements OPCO/CPF  
→ Analytics avancés  
→ Gestion équipes complexe  
→ Système notation  
→ Mobile apps  

### **All-in (2026+)**
→ Blockchain complet  
→ IA prédictive  
→ International  
→ Intégrations ERP  
→ Marketplace B2B  

---

## **10. FEATURE LIST DÉTAILLÉE**

*(MH = Must-Have MVP)*  
*(PM = Post-MVP)*  
*(AI = All-in)*

### **Module : Gestion Comptes & Rôles**

| Feature | Priorité | Description |
|---------|----------|-------------|
| Inscription multi-rôles | MH | OF, Formateur, Apprenant, Manager, Gestionnaire |
| Validation KYC/KYB/CAC | MH | Selon type compte avec documents |
| MFA/OTP obligatoire | MH | Authentification sécurisée |
| SSO MP↔LMS | MH | Connexion unique |
| Import personnel Excel | MH | Template fourni pour entreprises |
| Gestion profils | MH | Modification infos personnelles |
| Validation email | PM | Confirmation par email |
| SSO entreprise | PM | Intégration AD/LDAP |

### **Module : Catalogue Formations**

| Feature | Priorité | Description |
|---------|----------|-------------|
| Création formation | MH | Tous champs requis + Qualiopi |
| Gestion sessions | MH | Dates, lieux, prix, places |
| Import contenus | MH | Upload fichiers existants |
| Statuts formation | MH | Brouillon, validation, publié |
| Multimodalité | MH | Présentiel, e-learning, virtuel, blended |
| Documents attachés | PM | PDF programme, supports |
| Duplication | PM | Copie formation/session |

### **Module : Recherche & Inscription**

| Feature | Priorité | Description |
|---------|----------|-------------|
| Recherche mots-clés | MH | Titre, description |
| Filtres basiques | MH | Catégorie, date, modalité |
| Page détails | MH | Infos complètes + sessions |
| Inscription externe | MH | Avec paiement Stripe |
| Assignation interne | MH | Sans paiement |
| Déclenchement LMS | MH | Automatique après validation |
| Panier | PM | Multi-formations |
| Codes promo | PM | Réductions |

### **Module : Documents & Certificats**

| Feature | Priorité | Description |
|---------|----------|-------------|
| Génération auto | MH | Émargement, attestation, facture |
| **Tokenisation blockchain** | MH | NFT + smart contracts sur blockchain |
| Vérification publique | MH | API ouverte |
| Stockage sécurisé | MH | Documents chiffrés |
| Templates personnalisés | PM | Par OF |
| Blockchain complet | AI | Smart contracts |

### **Module : Conformité & Alertes**

| Feature | Priorité | Description |
|---------|----------|-------------|
| Alertes échéances | MH | Notifications automatiques |
| Dashboard conformité | MH | Vue temps réel |
| Rapports autorités | MH | Export PDF/Excel |
| Scoring conformité | PM | Algorithme IA |
| Prédiction risques | AI | Machine learning |

### **Module : Budget & Finance**

| Feature | Priorité | Description |
|---------|----------|-------------|
| Suivi budget | MH | Par entreprise/service |
| Allocation équipes | MH | Répartition budget |
| Reporting conso | MH | Tableaux et graphiques |
| Prévisionnel N+1 | MH | Estimation besoins |
| Intégration OPCO | PM | APIs financements |
| Factures complexes | PM | Multi-lignes, avoir |

### **Module : Anti-fraude**

| Feature | Priorité | Description |
|---------|----------|-------------|
| Logs basiques | MH | Tracking activités |
| Détection basique | MH | Patterns suspects |
| **Proctoring IA** | PM++ | Surveillance examens |
| **Biométrie** | PM++ | Vérification identité |
| **Analyse comportement** | PM++ | Machine learning |
| Blockchain audit | AI | Immutabilité logs |

---

**© 2025 MB Aviation - Tous droits réservés**

**Société porteuse du projet :** MB Aviation  
**Société éditrice :** Kepler Aviation  
**Rédacteurs :** Robin Navarro, Aurélien Francio, Pierre Beunardeau

*Ce document est la propriété exclusive de MB Aviation. Toute reproduction ou distribution non autorisée est strictement interdite.*

---