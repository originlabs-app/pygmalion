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

**Progression globale : 15% du MVP réalisé** *(code uniquement, hors tests et optimisations)*

| Fonctionnalité | Code Écrit | Travail Restant | État | Impact Business |
|----------------|------------|-----------------|------|-----------------|
| **Sécurité/Authentification** | 20% | 80% + tests | ⚠️ Base présente | Connexion fonctionnelle, à sécuriser |
| **Catalogue formations** | 25% | 75% + polish | ⚠️ Fonctionnel | Recherche active, optimisation requise |
| **Anti-fraude examens** | 20% | 80% + validation | ⚠️ Prototype | Détection basique, à industrialiser |
| **Validation OF/Qualiopi** | 15% | 85% + workflow | ⚠️ Ébauche | Structure présente, process à compléter |
| **Interface utilisateur** | 10% | 90% + intégration | ⚠️ Fragments | Composants isolés, assemblage nécessaire |
| **Intégration LMS** | 5% | 95% + connexions | 🔴 Mock only | Version démo, production à faire |
| **Paiements Stripe** | 0% | 100% | 🔴 Absent | **BLOQUANT pour revenus** |
| **Conformité légale** | 0% | 100% | 🔴 Absent | **OBLIGATOIRE (Qualiopi, BPF)** |
| **Emails automatiques** | 0% | 100% | 🔴 Absent | **CRITIQUE pour communication** |
| **Module budgets** | 0% | 100% | 🔴 Absent | Requis entreprises |

#### **⚠️ Note importante sur les 15%**
- Ce pourcentage représente **uniquement le code écrit**
- **NON inclus** : Tests unitaires, tests d'intégration, audits sécurité, optimisation performance, scalabilité, débuggage, itérations UX
- **Effort réel restant** : 85% du code + 100% des tests + validation production

#### **Points clés pour la direction**
✅ **Acquis** : Structure de base établie, architecture solide  
⚠️ **Réalité** : Code brut nécessitant industrialisation complète  
🔴 **Urgences** : Paiements (0%), Conformité légale (0%), Communications (0%)  
📈 **Prévision réaliste** : MVP production-ready en 120-140 jours avec équipe complète

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
- Couverture MVP estimée: ~15% (code de base uniquement, fondations établies, monétisation/compliance/ops à faire).

---

### **Répartition détaillée par priorité**

### 🔴 **P0 - CRITIQUE (77 jours) — Indispensable pour lancer**

#### **Fonctionnalités Client (45 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Finalisation Marketplace** | Compléter catalogue et inscription (reste 85% à faire) | 15 |
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
| **Gestion multi-sites** | Vue consolidée pour gestionnaires d'aéroport | 6 |
| **Gestion d'équipes** | Interface complète pour managers | 4 |
| **Connexion entreprise** | Authentification unique (SSO) pour grandes entreprises | 2 |

#### **Contrôle Qualité (20 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Import/Export données** | Traitement en masse des inscriptions et résultats | 4 |
| **Validation renforcée** | Vérification identité (KYC) et organismes (KYB) | 4 |
| **Surveillance examens** | Détection de fraude par webcam | 4 |
| **Validation organismes** | Interface administrateur pour approuver les OF | 4 |
| **Certificats blockchain** | Connexion API Kepler pour certificats infalsifiables | 4 |

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

**© 2025 MB Aviation - Document de travail confidentiel**

