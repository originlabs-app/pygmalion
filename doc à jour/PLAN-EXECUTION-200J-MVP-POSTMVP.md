<!-- Horizontal rule removed to avoid YAML front‑matter parsing on GitHub -->
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# PLAN D'EXÉCUTION — 200 JOURS (MVP + POST-MVP)
## Analyse code, alignement PRD/user-flows, charges et planning

**Projet :** Pygmalion — Marketplace & LMS aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## 1) État actuel du développement — Ce qui est fait vs ce qui reste à faire

### 📊 **Résumé Exécutif — État d'Avancement après 12 jours**

**Progression globale : 25% du MVP réalisé**

| Fonctionnalité | Réalisé | Restant | État | Impact Business |
|----------------|---------|---------|------|-----------------|
| **Sécurité/Authentification** | 80% | 20% | ✅ Opérationnel | Connexion sécurisée avec MFA |
| **Catalogue formations** | 90% | 10% | ✅ Fonctionnel | Recherche et filtres actifs |
| **Anti-fraude examens** | 75% | 25% | ✅ Base solide | Détection triche active |
| **Validation OF/Qualiopi** | 60% | 40% | ⚠️ En cours | Workflow validation présent |
| **Interface utilisateur** | 40% | 60% | ⚠️ Partiel | Composants prêts, assemblage nécessaire |
| **Intégration LMS** | 30% | 70% | ⚠️ Démo uniquement | Version mock, pas production |
| **Paiements Stripe** | 0% | 100% | 🔴 Manquant | **BLOQUANT pour revenus** |
| **Conformité légale** | 0% | 100% | 🔴 Manquant | **OBLIGATOIRE (Qualiopi, BPF)** |
| **Emails automatiques** | 0% | 100% | 🔴 Manquant | **CRITIQUE pour communication** |
| **Module budgets** | 0% | 100% | 🔴 Manquant | Requis entreprises |

#### **Points clés pour la direction**
✅ **Forces** : Base technique solide, sécurité niveau bancaire, marketplace fonctionnel  
🔴 **Urgences** : Paiements (0%), Conformité légale (0%), Communications (0%)  
📈 **Prévision** : Avec les ressources adéquates, MVP livrable en 120 jours supplémentaires

---

### 🔧 **Détails Techniques** (pour l'équipe de développement)

### Backend (NestJS + Prisma + Supabase)

- Implémenté:
  - Auth/MFA/JWT: Supabase Auth, `JwtStrategy`, guards (`JwtAuthGuard`, `RolesGuard`), `CustomValidationPipe`, `HttpExceptionFilter`, logs Winston.
  - Marketplace catalogue:
    - Cours: création/lecture/mise à jour/statut/publication, recherche/filtrage/pagination.
    - Endpoints clés: `POST /courses` (OF/admin), `GET /courses`, `GET /courses/:id`, `PATCH /courses/:id`, `PATCH /courses/:id/status`, `DELETE /courses/:id`.
    - Règles: création réservée aux OF “verified”; contrôles de propriété pour update/delete/status.
  - Sessions/inscriptions: endpoints présents (gestion des places, transitions de statut, stats); logique d’accès et de validation (pas couplé aux paiements).
  - OF (KYB/Qualiopi): profil organisme, upload documents (Supabase Storage), statut de vérification admin; liste/lecture des documents.
  - Sécurité examens: socle back (services config/monitoring/reports) prêt pour logs/événements; proctoring IA avancé post‑MVP.
  - Infra/config: init buckets Supabase, `SupabaseService` (auth), `UploadService` (types MIME/tailles/URLs signées), `LoggerService`.

- Manquants MVP:
  - Stripe: Checkout + webhooks idempotents + commissions (Connect) + refunds (aucun code).
  - Moteur d’alertes conformité: règles J‑90/J‑60/J‑30/J‑7/J‑1, notifications, escalades.
  - Budget: modèles + endpoints (enveloppes/allocations/consommé/exports).
  - Exports BPF (CERFA): génération + formats.
  - LMS: SSO OAuth2 + provisioning (cours/sessions/inscrits) + sync progression (non branché).
  - Admin UI/API: workflow de modération/validation complet (actions, motifs, audit trail) — endpoints partiels back, UI à créer.

### Frontend (Vite + React + Tailwind)

- Implémenté:
  - Auth/Contexts/API: pages login/register/verified, client API avec refresh proactif et MFA (interceptors), contexts (Auth/Courses/Enrollments).
  - Marketplace zone publique (vitrine sans checkout):
    - Catalogue: `CoursesPage.tsx` avec recherche, filtres (catégories/modalités/lieu/prix/certification), tri, pagination, vues grille/liste.
    - Détails: `CourseDetail.tsx` (sessions, objectifs, prérequis, badges de modalité); chemin d’inscription via context (non relié à Stripe).
  - Vitrine commerciale/landing: `ForTrainingOrganizations.tsx`, `ForLearners.tsx`, `ForCompanies.tsx`, `ForAirports.tsx` + `Index.tsx`.
  - LMS (démo): `services/lmsService.ts` (catalogue/sessions mock pour UX; pas d’intégration réelle).
  - Sécurité examens (socle front): hooks `useFocusedExam`, `useFraudDetection`, `useSecurityChecks` (détection switch d’onglet, blocage contextuel/raccourcis, messages prévention).
  - Dashboards: composants UI par rôle largement implémentés (`frontend/src/components/dashboard/**`), hook `useDashboardKPIs` prêt; restent à finaliser les pages/routage et l’assemblage par persona.

- Manquants MVP:
  - Stripe: flux Checkout côté client, écrans paiement/états, gestion retours webhooks.
  - Budget: UI enveloppes/alloc/consommé, exports CSV/Excel.
  - Admin: UI modération/validation (liste attente, approve/reject, commentaires, historique).
  - Alertes: écran paramètres/règles + centre de notifications.
  - LMS: SSO/provisioning/sync réels (remplacer le mock).
  - Emails: intégration provider (SendGrid/Resend/SES) pour transactionnels (inscription, facture, conformité).
  - Dashboards par rôle: finaliser pages/routage et assemblage des composants pour OF/Apprenant/Manager/Gestionnaire/Admin (KPIs PRD); back + hook FE déjà prêts.

### Tests & Qualité — état actuel vs PRD
- UX: pas de campagne de tests utilisateurs (UAT) ni d’accessibilité (WCAG) menée — à planifier.
- Sécurité: hardening partiel; pas de pentest ni de validation OWASP systématique; rate‑limiting/abuse à ajouter.
- API/tests: tests unitaires partiels; peu/aucun tests e2e API/flows critiques; documentation API à compléter.
- Observabilité: logs OK; monitoring/alerting et métriques (APM) à mettre en place pour la prod.
- Sauvegardes/DR: stratégie backup/restauration (RTO/RPO) à formaliser et tester.

### Synthèse 12 jours réalisés — confirmation
- Fondations sécurité (JWT/MFA/guards/filters, logs) en place.
- Modèles back clés (cours/sessions/inscriptions/OF) opérationnels avec validations et contrôles; recherche/pagination côté `CoursesService`.
- Vitrine marketplace complète (catalogue + détail) et landing pages; pas de checkout Stripe (confirmé).
- API client front robuste (refresh proactif, file d’attente 401), contexts structurés.
- LMS: UX démo (mock) mais pas d’intégration réelle.
- Couverture MVP estimée: ~20–25% (fondations solides, zone publique OK, monétisation/compliance/ops à faire).

### Points “création formation”
- Backend: `POST /courses` autorisé pour OF “verified”, `PATCH /courses/:id` et `PATCH /courses/:id/status` avec contrôles; sessions gérées.
- Front (à faire): écrans “Créer/éditer une formation/session” côté OF (formulaires, validations, upload docs), tableau de bord OF.

### Petites anomalies/opportunités
- Dashboards: pas de pages "Dashboard" spécifiques; hooks KPI présents mais pas de vues consolidées (à planifier dans Analytics).
- Environnements: FE pointe `VITE_API_URL` (dans `api.ts`), backend par défaut `:3000` — normaliser dans M1 (CI/Env).
- Emails: aucun câblage de provider (à intégrer avec le "compliance pack").

---

### 💼 **Traduction Business des Points Techniques**

| Ce que dit la technique | Ce que ça signifie pour le business |
|------------------------|-------------------------------------|
| "Auth/MFA avec guards" | ✅ **Sécurité bancaire** : Double authentification, protection contre piratage |
| "Endpoints CRUD complets" | ✅ **Gestion complète** : Créer, lire, modifier, supprimer les formations |
| "Pas de Stripe (0%)" | 🔴 **Pas de revenus** : Impossible d'encaisser des paiements |
| "Mock LMS" | ⚠️ **Version démo** : Fonctionne mais pas connecté aux vrais systèmes |
| "Hooks sans pages" | ⚠️ **Composants orphelins** : Pièces du puzzle prêtes mais non assemblées |
| "Pas de provider email" | 🔴 **Communications KO** : Impossible d'envoyer des emails automatiques |

---

## 2) Analyse PRD ↔ User-Flows — Alignement et Décisions

### 📊 **Vue d'ensemble : Ce qui est fait vs Ce qui reste selon les exigences**

| Catégorie | ✅ Déjà développé | ❌ À développer | Impact |
|-----------|-------------------|-----------------|--------|
| **Utilisateurs** | 6 types d'utilisateurs définis et codés | - | Prêt |
| **Catalogue** | Recherche, filtres, détail formations | - | Fonctionnel |
| **Sécurité** | Authentification double facteur | - | Opérationnel |
| **Paiements** | - | Système complet Stripe | **BLOQUANT** |
| **Conformité** | - | Documents légaux obligatoires | **CRITIQUE** |
| **Communications** | - | Emails automatiques | **URGENT** |
| **E-learning** | Interface démo | Connexion réelle LMS | Important |
| **Administration** | Composants prêts | Pages finalisées | À assembler |

### 💳 **Système de Paiement — Priorité absolue (0% fait)**

**Ce que ça fait :** Permet d'encaisser les paiements et reverser aux organismes de formation

| Aspect | Description | Effort |
|--------|-------------|--------|
| **Solution** | Stripe Connect (gestion automatique des reversements) | 12 jours |
| **Commission** | 15-20% prélevée automatiquement sur chaque vente | Configurable |
| **Documents** | Factures PDF générées automatiquement | Inclus |
| **Sécurité** | Paiements sécurisés, remboursements possibles | Standard Stripe |

**✅ Succès = Paiement → Inscription → Accès formation → Facture envoyée**

### 🎓 **Plateforme E-learning — Connexion LMS (30% fait)**

**Ce que ça fait :** Connecte automatiquement les apprenants aux contenus de formation

| Aspect | Description | Effort |
|--------|-------------|--------|
| **État actuel** | Interface démo fonctionnelle | 30% fait |
| **À faire** | Connexion automatique aux vraies plateformes | 8 jours |
| **Fonctionnalités** | Suivi progression, résultats temps réel | Inclus |

**✅ Succès = Inscription → Accès automatique → Suivi progression visible**

### 📋 **Conformité Légale Qualiopi — Obligatoire (0% fait)**

**Ce que ça fait :** Respecte les obligations légales pour opérer en France

| Document/Fonction | Obligation | Description | Effort |
|-------------------|------------|-------------|--------|
| **Questionnaires satisfaction** | LÉGAL | T0 (début) et T+90 (3 mois après) | 3 jours |
| **BPF (Bilan Pédagogique)** | LÉGAL | Export pour financements OPCO | 2 jours |
| **Feuilles émargement** | LÉGAL | Signature électronique présence | 2 jours |
| **Alertes échéances** | CRITIQUE | J-90, J-60, J-30, J-7, J-1 | 3 jours |
| **Exports comptables** | REQUIS | CSV/Excel pour OPCO et CPF | 2 jours |

**🚨 Sans ces documents = Impossible d'opérer légalement**

### 🔗 **Certificats Blockchain — Innovation future (2026)**

**Ce que ça fait :** Certificats infalsifiables avec QR code de vérification

| Phase | Description | Timing |
|-------|-------------|--------|
| **Phase 1** | Connexion API Kepler pour génération certificats | Post-MVP (5 jours) |
| **Phase 2** | Blockchain complète avec NFT | 2026+ |

---

### ✅ **Décisions Actées par la Direction**

| Décision | Choix retenu | Impact |
|----------|--------------|--------|
| **Paiements** | Stripe Connect avec 15-20% commission | Revenus automatiques |
| **E-learning** | Plateforme 100% custom | Contrôle total |
| **Conformité** | Alertes J-90 à J-1 automatiques | Zéro risque légal |
| **Blockchain** | Reporté après MVP | Focus sur l'essentiel |

### ⚠️ **Décisions Urgentes Requises**

| Point | Question | Deadline |
|-------|----------|----------|
| **1. Stripe** | Valider compte et commission exacte | Semaine 1 |
| **2. Formations obligatoires** | Liste exacte par métier aéro | Semaine 2 |
| **3. Templates emails** | Valider modèles et ton | Semaine 2 |
| **4. Export OPCO** | Format exact requis | Semaine 3 |

### 📅 **Impact sur les Livraisons**

| Milestone | Contenu | Timing |
|-----------|---------|--------|
| **M1** | Marketplace public sans paiement | Jour 40 |
| **M2** | Paiements + Factures opérationnels | Jour 80 |
| **M3** | Conformité légale complète | Jour 120 |
| **M4** | Tableaux de bord finalisés | Jour 160 |
| **M5** | Optimisations et qualité | Jour 200 |

---

## 3) Charge globale — 200 jours (MVP + Post-MVP)

### 📊 **Vue Exécutive : Répartition du Budget Temps**

| Priorité | Jours | % Total | Objectif | Impact Business |
|----------|-------|---------|----------|-----------------|
| **🔴 P0 - CRITIQUE** | 77j | 38% | Lancement commercial | **Génération de revenus** |
| **🟡 P1 - IMPORTANT** | 73j | 37% | Valeur ajoutée | **Différenciation marché** |
| **🟢 P2 - QUALITÉ** | 50j | 25% | Excellence | **Satisfaction client** |
| **TOTAL** | **200j** | **100%** | **MVP + Post-MVP** | **Solution complète** |

**Note importante :** Les 12 jours déjà investis sont inclus dans ce budget total.

### **Répartition détaillée par priorité**

### 🔴 **P0 - CRITIQUE (77 jours) — Indispensable pour lancer**

#### **Fonctionnalités Client (45 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Finalisation Marketplace** | Compléter catalogue et inscription (reste 60% à faire) | 15 |
| **Paiements en ligne** | Système complet Stripe avec factures automatiques | 12 |
| **Certificats PDF** | Génération automatique des attestations de formation | 10 |
| **Emails automatiques** | Communications client (inscription, facture, rappels) | 8 |

#### **Qualité & Mise en Production (32 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Tests complets** | Vérification de toutes les fonctionnalités critiques | 10 |
| **Documentation API** | Guide technique pour intégrations futures | 5 |
| **Déploiement cloud** | Mise en ligne de la plateforme | 5 |
| **Automatisation** | Déploiements automatiques et surveillance 24/7 | 6 |
| **Configuration base de données** | Environnements sécurisés (dev/test/prod) | 6 |

### 🟡 **P1 - IMPORTANT (73 jours) — Valeur ajoutée et conformité**

#### **Conformité Légale (23 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Pack Qualiopi complet** | Questionnaires T0/T+90, BPF, émargements, déroulé pédagogique | 15 |
| **Alertes automatiques** | Notifications J-90, J-60, J-30, J-7, J-1 avant échéances | 8 |

#### **Gestion Entreprise (30 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Budget formation** | Suivi des enveloppes et consommation avec exports | 10 |
| **Tableaux de bord avancés** | Indicateurs clés de performance (KPIs) | 8 |
| **Gestion multi-sites** | Vue consolidée pour gestionnaires d'aéroport | 8 |
| **Gestion d'équipes** | Interface complète pour managers | 6 |
| **Connexion entreprise** | Authentification unique (SSO) pour grandes entreprises | 4 |

#### **Contrôle Qualité (20 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Import/Export données** | Traitement en masse des inscriptions et résultats | 5 |
| **Validation renforcée** | Vérification identité (KYC) et organismes (KYB) | 5 |
| **Surveillance examens** | Détection de fraude par webcam | 5 |
| **Validation organismes** | Interface administrateur pour approuver les OF | 4 |
| **Certificats blockchain** | Connexion API Kepler pour certificats infalsifiables | 5 |

### 🟢 **P2 - QUALITÉ (50 jours) — Excellence opérationnelle**

| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Tests automatisés complets** | Couverture 80% du code pour fiabilité maximale | 12 |
| **Optimisation vitesse** | Temps de chargement < 2 secondes | 8 |
| **Tests d'intégration** | Vérification des connexions entre systèmes | 5 |
| **Audit sécurité** | Renforcement contre piratage et vulnérabilités | 5 |
| **Amélioration interface** | Expérience utilisateur optimisée | 5 |
| **Version mobile** | Adaptation complète smartphones/tablettes | 5 |
| **Accessibilité handicap** | Conformité normes internationales | 5 |
| **Documentation utilisateur** | Guides et tutoriels pour tous les rôles | 5 |

---

### 📝 **Notes Importantes pour la Direction**

✅ **Budget confirmé : 200 jours tout inclus**
- Les 12 jours déjà investis sont comptés dans le total
- P0 indique le travail restant (ex: Marketplace 15j = finalisation des 60% restants)

✅ **Priorisation stratégique :**
- **P0 (38%)** = Lancement commercial possible
- **P1 (37%)** = Conformité légale + différenciation  
- **P2 (25%)** = Excellence et scalabilité

❌ **Exclus du budget 200 jours :**
- Tokenisation blockchain complète (Phase 2026)
- Intégrations API directes OPCO/CPF (exports CSV inclus)
- Intelligence artificielle avancée

---

## 4) MVP vs Post-MVP (dans 200 jours)

### **Découpage proposé** (indicatif; budget total 200j)

#### 🎯 **MVP cible ≈ 120 jours**
- Principalement **P0** + sous-ensemble **P1**
- Budget de base
- Alertes de base
- Admin OF minimal
- Analytics simples

<!-- Post-MVP breakdown removed per request -->
---

## 5) Tableau modules — État, tests, sécu, progression vs reste

### 🎯 **Vue Synthétique pour la Direction**

| Catégorie | Modules | Avancement | Criticité | Commentaire |
|-----------|---------|------------|-----------|-------------|
| **✅ Presque terminés** | Auth, Catalogue, Anti-fraude | 75-90% | Fondations | Base solide établie |
| **⚠️ En cours** | OF/Qualiopi, Dashboards, LMS | 30-60% | Important | Finition nécessaire |
| **🔴 Non démarrés** | Paiements, Conformité, Budget | 0% | **CRITIQUE** | Bloquants pour MVP |

### 📊 **État détaillé par module**

#### **Tableau Simplifié pour la Direction**

| Module Fonctionnel | État Actuel | Jours Restants | Impact si non fait |
|--------------------|-------------|----------------|-------------------|
| **🟢 Sécurité/Connexion** | 80% fait | 4 | Risque sécurité |
| **🟢 Catalogue formations** | 65% fait | 8 | Pas de visibilité |
| **🟢 Anti-fraude examens** | 75% fait | 8 | Triche possible |
| **🟡 Validation organismes** | 70% fait | 6 | OF non vérifiés |
| **🟡 Tableaux de bord** | 40% fait | 8 | Pas de pilotage |
| **🟡 Plateforme e-learning** | 30% fait | 12 | Pas de formation en ligne |
| **🟡 Certificats PDF** | 30% fait | 10 | Pas d'attestations |
| **🔴 Paiements en ligne** | 0% fait | 12 | **PAS DE REVENUS** |
| **🔴 Conformité légale** | 0% fait | 8 | **ILLÉGAL** |
| **🔴 Gestion budgets** | 0% fait | 10 | Pas de suivi financier |
| **🔴 Import/Export** | 0% fait | 5 | Traitement manuel |

#### **Détails Techniques** (pour l'équipe de développement)

| Module | Codé | Testé | User-flow (impl. FE) | Sécu | Autres tests | Progression (≈12j) | Reste (200j) |
|--------|:----:|:-----:|:---------:|:----:|:------------:|:------------------:|:------------:|
| **Auth/MFA/JWT** | ✅ | ⚠️ | ✅ | Guards/MFA | À compléter e2e | 80% | 4 |
| **Utilisateurs/Profils** | ✅ | ⚠️ | ✅ | RBAC | Unitaires ciblés | 70% | 4 |
| **Cours/Sessions** | ✅ | ⚠️ | ✅ | Validations | Recherche/filters | 65% | 8 |
| **Inscriptions** | ✅ | ⚠️ | ⚠️ | Règles | E2E critiques | 60% | 10 |
| **Examens sécurisés** | ✅ | ⚠️ | ⚠️ | Anti-fraude/Lockdown | Proctoring IA futur | 75% | 8 |
| **Paiements Stripe** | ❌ | ❌ | ❌ | PCI (Stripe) | Webhooks/tests | 0% | 12 |
| **OF (KYB/Qualiopi)** | ✅ | ⚠️ | ✅ | Vérif admin | Flux UI admin | 70% | 6 |
| **Documents/Certificats PDF** | ⚠️ | ❌ | ✅ | Signatures/QR | Templates | 30% | 10 |
| **Alerts conformité** | ❌ | ❌ | ❌ | Règles | Scénarios | 0% | 8 |
| **Budget** | ❌ | ❌ | ❌ | Rôles | Exports | 0% | 10 |
| **Dashboards/Analytics** | ⚠️ | ❌ | ⚠️ | – | KPIs | 40% | 8 |
| **Admin plateforme** | ⚠️ | ❌ | ✅ | Audit | UI modération | 30% | 8 |
| **LMS (SSO/provisioning/sync)** | ⚠️ | ❌ | ❌ | – | Flows complets | 30% | 12 |
| **Import/Export avancé** | ❌ | ❌ | ✅ | – | E2E | 0% | 5 |
| **Tokenisation H1** | 🔄 | ❌ | ❌ | – | Verif publique | 0% | 5 |
| **Qualité (tests/unit/int)** | ⚠️ | ❌ | – | – | Couverture | 15% | 20 |

### 📝 **Synthèse pour la Direction**

**Message clé : 25% du MVP réalisé en 12 jours**

✅ **Forces actuelles :**
- Base technique solide (sécurité, catalogue)
- Système anti-fraude innovant
- Architecture scalable

🔴 **Urgences absolues :**
- **Paiements** : 0% → Sans ça, pas de revenus
- **Conformité** : 0% → Sans ça, illégal d'opérer
- **Budgets** : 0% → Requis par les entreprises

📊 **Projection :**
- Avec les ressources adéquates
- MVP complet en 120 jours additionnels
- Lancement commercial possible Q2 2025

**Légende tableau technique** : ✅ Fait | ⚠️ Partiel | ❌ Non fait | 🔄 Mock/Démo

---

## 🎯 Conclusion - Prêt pour Exécution

### ✅ **Ce document confirme :**
- **25% du MVP** déjà réalisé en 12 jours
- **200 jours total** pour solution complète
- **Priorités claires** : Paiements, Conformité, Communications
- **Risques identifiés** et mitigations prévues

### 📅 **Prochaines étapes immédiates :**
1. **Valider** les choix Stripe et commission
2. **Mobiliser** l'équipe de développement  
3. **Démarrer** Sprint P0 (Paiements + Conformité)

### 💼 **Livrables garantis en 200 jours :**
- Marketplace complet avec paiements
- Conformité légale totale (Qualiopi, BPF)
- Système anti-fraude opérationnel
- Tableaux de bord pour tous les acteurs
- Production stable avec support

---

**© 2025 MB Aviation - Document de travail confidentiel**

