<!-- Horizontal rule removed to avoid YAML front‑matter parsing on GitHub -->
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# PLAN D'EXÉCUTION — 200 JOURS (MVP + POST-MVP) (+- 20 jours)
## Analyse code, alignement PRD/user-flows, charges et planning

**Projet :** Pygmalion — Marketplace & LMS aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## 1) État actuel du développement — Ce qui est fait vs ce qui reste à faire

### 📊 **Résumé Exécutif — État d'Avancement après 12 jours**


| Fonctionnalité | Code Écrit | Travail Restant | État | Impact Business |
|----------------|------------|-----------------|------|-----------------|
| **Sécurité/Authentification** | 22% | 78% + tests | ⚠️ Base présente | Connexion fonctionnelle, à sécuriser |
| **Catalogue formations** | 20% | 80% + polish | ⚠️ Fonctionnel | Recherche active, optimisation requise |
| **Anti-fraude examens** | 15% | 85% + validation | ⚠️ Prototype | Détection basique, à industrialiser |
| **Validation OF/Qualiopi** | 15% | 85% + workflow | ⚠️ Ébauche | Structure présente, process à compléter |
| **Interface utilisateur** | 20% | 80% + intégration | ⚠️ Fragments | Composants isolés, assemblage nécessaire |
| **Intégration LMS** | 5% | 95% + connexions | 🔴 Mock only | Version démo, production à faire |
| **Paiements Stripe** | 0% | 100% | 🔴 Absent | **BLOQUANT pour revenus** |
| **Conformité légale** | 0% | 100% | 🔴 Absent | **OBLIGATOIRE (Qualiopi, BPF)** |
| **Emails automatiques** | 0% | 100% | 🔴 Absent | **CRITIQUE pour communication** |
| **Module budgets** | 0% | 100% | 🔴 Absent | Requis entreprises |

#### **⚠️ Note importante sur les %**
- Ces pourcentages représentent **uniquement le code écrit**
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
  - Pointeurs code clés (traçabilité):
    - Cours: `backend/src/courses/**` (contrôleur/service, statut, recherche/pagination)
    - Inscriptions/Sessions: `backend/src/enrollments/**`, `backend/src/sessions/**`
    - OF/Validation: `backend/src/training-organizations/**` (incl. routes admin approve/reject)
    - Sécurité examens: `backend/src/security/**`
    - Auth/Guards/Filters/Pipes: `backend/src/auth/**`, `backend/src/common/**`

- Manquants MVP:
  - Stripe: Checkout + webhooks idempotents + commissions (Connect) + refunds (aucun code).
  - Génération PDF (émargement, attestation, facture): non implémentée (librairie à valider: Puppeteer/PDFKit).
  - Moteur d’alertes conformité: règles J‑90/J‑60/J‑30/J‑7/J‑1, notifications, escalades.
  - Budget: modèles + endpoints (enveloppes/allocations/consommé/exports).
  - Exports BPF (CERFA): génération + formats.
  - LMS: SSO OAuth2 + provisioning (cours/sessions/inscrits) + sync progression (non branché).
  - Admin UI/API: workflow de modération/validation complet (actions, motifs, audit trail) — endpoints partiels back, UI partielle existante (approbation/rejet OF); à compléter (commentaires, historique, centralisation).
  - Pré-requis d’environnement P0 (à provisionner):
    - Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (+ comptes Connect si besoin)
    - Emails: `RESEND_API_KEY` ou `SENDGRID_API_KEY`
    - Supabase: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
    - Plateforme: `FRONTEND_URL`, `BACKEND_URL`, CORS, secrets JWT
    - Stockage: buckets/documents initialisés (scripts déjà présents)

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
  - Pointeurs code clés (traçabilité):
    - Catalogue/Détail: `frontend/src/pages/courses/**`, `frontend/src/pages/CourseDetail.tsx`
    - Dashboards/Pages: `frontend/src/pages/dashboard/**`, composants: `frontend/src/components/dashboard/**`
    - Hooks sécurité examens: `frontend/src/hooks/useFocusedExam.ts(x)`, `useFraudDetection.tsx`, `useSecurityChecks.tsx`
    - LMS (mock): `frontend/src/services/lmsService.ts`, `frontend/src/hooks/useLMSAccess.tsx`

- Manquants MVP:
  - Stripe: flux Checkout côté client, écrans paiement/états, gestion retours webhooks.
  - Budget: UI enveloppes/alloc/consommé, exports CSV/Excel.
  - Admin: UI modération/validation (partiel existant: écrans d'approbation/rejet OF) — reste liste d'attente, commentaires, historique centralisé.
  - Alertes: écran paramètres/règles + centre de notifications.
  - LMS: SSO/provisioning/sync réels (remplacer le mock).
  - Emails: intégration provider (SendGrid/Resend/SES) pour transactionnels (inscription, facture, conformité).
  - Dashboards par rôle: finaliser pages/routage et assemblage des composants pour OF/Apprenant/Manager/Gestionnaire/Admin (KPIs PRD); back + hook FE déjà prêts.
  - Écrans simulés (à brancher) — repères:
    - Paiement: `frontend/src/pages/payment/PaymentPage.tsx` (simulation)
    - Paramètres email: `frontend/src/pages/admin/AdminSettings.tsx` (UI sans backend)
    - LMS: `frontend/src/services/lmsService.ts` (mock)

### Tests & Qualité — état actuel vs PRD
- UX: pas de campagne de tests utilisateurs (UAT) ni d’accessibilité (WCAG) menée — à planifier.
- Sécurité: hardening partiel; pas de pentest ni de validation OWASP systématique; rate‑limiting/abuse à ajouter.
- API/tests: tests unitaires partiels; quelques tests e2e existent (couverture faible); flows critiques non couverts; documentation API à compléter.
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

### 🔴 **P0 - CRITIQUE (104 jours) — Indispensable pour lancer**

#### **Authentification & Sécurité (14 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **MFA/OTP obligatoire** | Authentification multi-facteurs pour tous les rôles | 3 |
| **Validation KYC/KYB/CAC** | Vérification identité complète selon rôle | 4 |
| **SSO Marketplace↔LMS** | Connexion unique entre plateforme et LMS | 7 |

#### **Fonctionnalités Core Marketplace (39 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Finalisation Marketplace** | Catalogue, recherche, inscription (reste 75% à faire), champs Qualiopi basiques | 9 |
| **Module Formateur** | Gestion formateurs, affiliation multi-OF, documents pédagogiques | 8 |
| **Processus validation OF** | Workflow 4 étapes, signature CDC/CGU/CGV en ligne | 5 |
| **Import contenus formation** | Upload fichiers existants, multimodalité complète | 3 |
| **Paiements Stripe** | Checkout, webhooks, commissions, factures automatiques | 12 |
| **Connexion LMS automatique** | Déclenchement et provisioning après inscription | 2 |

#### **Documents & Communications (14 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Certificats & attestations** | Génération PDF automatique (émargement, attestation, certificat) | 8 |
| **Emails automatiques** | Transactionnels (inscription, facture, rappels, alertes) | 6 |

#### **Infrastructure & Production (17 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Tests essentiels** | Tests critiques des flux principaux | 7 |
| **Déploiement cloud** | Mise en ligne environnement production | 4 |
| **Configuration BDD** | Environnements dev/staging/prod sécurisés | 3 |
| **Documentation API minimale** | Endpoints critiques documentés | 3 |
| **Durcissement minimal** | CORS, Helmet, rate‑limiting auth/écritures | (inclus)

#### **Conformité minimale (8 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Alertes conformité (MVP)** | Notifications J-90/J-60/J-30/J-7/J-1 sur échéances clés | 8 |

#### **Gestion Entreprise & Équipes — MVP (9 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Import personnel Excel/CSV** | Template fourni, import en masse, affiliation automatique | 5 |
| **Assignation sans paiement** | Inscription interne vs externe, gestion équipes (Manager) | 4 |

#### **Dashboards basiques (3 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Dashboards par rôle (basiques)** | Assemblage pages/routage minimal (OF, Apprenant, Manager, Gestionnaire) | 3 |

#### 🔗 Mapping User Flows → Livrables P0
| User Flow | Livrables P0 correspondants |
|-----------|-----------------------------|
| Apprenant EXTERNE — Inscription + Paiement CB | Stripe Checkout + webhooks (idempotence), décrémentation places, facture PDF, emails transactionnels, provisioning LMS auto |
| Apprenant INTERNE — Assignation sans paiement | Assignation Manager (sans CB), décrémentation places, email confirmation, provisioning LMS auto |
| OF — Créer et publier e-learning | Finalisation Marketplace (fiche + sessions), champs Qualiopi basiques, ID cours LMS, publication, workflow validation OF |
| Manager — Consulter inscriptions équipe | Dashboards basiques (pages/routage), endpoints stats/inscriptions minimal |
| Validation OF — 4 étapes | Workflow validation (4 étapes) + signature CDC/CGU/CGV en ligne + UI admin partielle (approve/reject) |

#### 🧭 Ordre recommandé P0 (séquençage sans changer les charges)
- Lot 1: Stripe (Checkout/webhooks/Connect/refunds), Emails, PDF (choix outil + 2–3 templates).
- Lot 2: SSO↔LMS + provisioning minimal + e2e paiements/assignation.
- Lot 3: Validation OF 4 étapes (+ audit minimal) + finalisation marketplace.
- Lot 4: Alertes J‑90… + assignation interne + import Excel/CSV + dashboards basiques.
- Lot 5: Tests essentiels renforcés + staging + doc API min + durcissement.

#### ✅ Definition of Done — P0
- Paiements: idempotence clés, 3 cas (succès/échec/refund), facture PDF stockée, emails envoyés et loggués.
- SSO↔LMS: création/sync + provisioning OK, mécanismes de re‑try/queue, logs corrélés.
- Validation OF: 4 états + commentaires + piste d’audit minimale (horodatage, acteur, motif).
- Alertes: déclenchements J‑X testables, anti‑doublons, journalisation des envois.
- E2E: parcours Externe/Interne verts en CI (paiement, assignation, SSO+provisioning).

#### 📌 Détails d’implémentation et critères d’acceptation — P0

- **Authentification & Sécurité**
  - MFA/OTP obligatoire (rôles configurables), verrouillage après X tentatives, logs d’audit (succès/échec, IP, userId). Critères: MFA exigé sur login sensible; récupération possible; tests e2e basiques.
  - KYC/KYB/CAC par rôle (Apprenant/Entreprise/OF/Formateur): collecte champs, upload documents, statut de vérification. Critères: transitions statut et visibilité; logs d’audit; export minimal liste vérifs.
  - SSO Marketplace↔LMS (OAuth2/OIDC): création/sync utilisateur, SSO silent login. Critères: SSO fonctionnel sur 2 parcours (externe/interne); gestion d’erreurs; logs corrélés.

- **Fonctionnalités Core Marketplace**
  - Finalisation Marketplace (+ Qualiopi basiques): complétion fiche (catégorie aviation, objectifs, prérequis, programme), recherche/filtres, statut cours. Critères: création→publication; recherche; pagination; contrôles d’accès; logs.
  - Module Formateur (MVP): gestion profil formateur, affiliation multi‑OF, liste formations dispensées, dépôts docs pédagogiques basiques. Critères: CRUD profil, association OF, droits visibles.
  - Workflow Validation OF (4 étapes) + signature CDC/CGU/CGV: états, commentaires, pièces jointes; signature électronique simple (horodatage). Critères: piste d’audit; historique; UI admin partielle OK.
  - Import contenus + multimodalité: upload fichiers (programme PDF…), saisie modalité (présentiel/e‑learning/virtuel), mapping ID cours LMS. Critères: contrôle MIME/taille; e2e sur upload; logs stockage.
  - Paiements Stripe: Checkout session, webhooks sécurisés (HMAC), Connect commissions, refunds, factures. Critères: idempotence clé, tables transactions, mapping enrollment↔payment, 3 cas (succès/échec/refund) couverts.
  - Connexion LMS automatique: à validation/ paiement, créer inscription au cours; en échec, re‑try + file d’attente. Critères: journaux d’orchestration; réconciliation admin.

- **Documents & Communications**
  - PDF: émargement, attestation, facture (template). Critères: rendu stable (Puppeteer/PDFKit décidé), stockage sécurisé, lien/téléchargement, checksum, test visuel.
  - Emails transactionnels: inscription, paiement, validation OF, assignation interne, alertes J‑90… Critères: provider branché (Resend/SendGrid/SES), templates, suppression PII dans logs.

- **Infra & Production**
  - Tests essentiels: e2e critiques (paiement externe, assignation interne, SSO+provisioning), smoke tests API. Critères: pipeline OK.
  - Déploiement cloud + BDD (dev/staging/prod): migrations Prisma, secrets, backups. Critères: rollback documenté, RTO/RPO définis.
  - Doc API minimale: Swagger endpoints critiques (auth, courses, sessions, enrollments, payments). Critères: à jour CI.

- **Conformité minimale**
  - Alertes J‑90/J‑60/J‑30/J‑7/J‑1 (échéances): planification, notifications, centre d’alertes basique. Critères: déclenchements testables, suppression double envoi, logs.

- **Entreprise & Équipes (MVP)**
  - Import personnel Excel/CSV: template, validation, rapport d’erreurs, affiliation entreprise. Critères: volumes pilotés, idempotence import.
  - Assignation sans paiement: manager → inscription interne; gestion places; notifications. Critères: parcours UI minimal + API.

- **Dashboards basiques**
  - Assemblage pages/routage (OF, Apprenant, Manager, Gestionnaire): vues liste/compteurs. Critères: navigation, autorisations, données minimales.

### 🟡 **P1 - IMPORTANT (48 jours) — Conformité et gestion d'entreprise**

#### **Conformité Qualiopi & Légale (12 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Pack Qualiopi complet** | Champs formations, questionnaires T0/T+90, BPF, déroulé pédagogique | 12 |

#### **Gestion Entreprise & Équipes (16 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Budget formation** | Enveloppes, allocations, consommation, prévisionnel | 8 |
| **Tableaux de bord KPIs** | Dashboards par rôle (OF, Manager, Gestionnaire, Admin) | 5 |
| **Gestion multi-sites** | Vue consolidée gestionnaires d'aéroport | 3 |

#### **Validation & Contrôle (20 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Workflow validation OF complet** | Interface admin modération, historique, audit trail | 6 |
| **Import/Export données avancé** | Inscriptions masse, résultats, rapports autorités | 4 |
| **Validation KYC/KYB renforcée** | Process automatisé avec vérifications tierces | 5 |
| **Surveillance examens basique** | Logs et détection patterns suspects | 2 |
| **Exports BPF/CERFA** | Génération documents légaux formatés | 3 |

#### 📌 Détails d’implémentation — P1
- Qualiopi & Légal: questionnaires T0/T+90, BPF, déroulé pédagogique complet; audit trail; exports conformes. Critères: modèles validés, tests fonctionnels.
- Gestion Entreprise avancée: budgets (enveloppes, allocations, consommation, prévisionnel), KPIs étendus, multi‑sites. Critères: agrégations performantes, exports.
- Validation renforcée: intégration tiers KYC/KYB; surveillance examens basique (heuristiques + logs).

### 🟢 **P2 - OPTIMISATION (48 jours) — Qualité et performance**

#### **Qualité & Tests (20 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Tests automatisés** | Couverture 80% avec tests unitaires et intégration | 8 |
| **Tests E2E complets** | Parcours utilisateurs critiques validés | 5 |
| **Audit sécurité OWASP** | Scan vulnérabilités et hardening | 4 |
| **Documentation technique** | API complète, guides développeur | 3 |

#### **Performance & UX (14 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Optimisation performance** | Temps chargement < 2s, cache, CDN | 4 |
| **Responsive mobile** | Adaptation complète smartphones/tablettes | 4 |
| **Amélioration UX** | Parcours utilisateur optimisés, A/B testing | 3 |
| **Accessibilité WCAG** | Conformité handicap niveau AA | 3 |

#### **Monitoring & DevOps (14 jours)**
| Fonction | Description Business | Jours |
|----------|---------------------|-------|
| **Monitoring APM** | Métriques temps réel, alerting | 4 |
| **CI/CD complet** | Pipeline automatisé avec quality gates | 4 |
| **Backup & DR** | Stratégie sauvegarde, RTO/RPO définis | 3 |
| **SSO entreprises** | Intégration AD/LDAP pour grands comptes | 2 |
| **Documentation utilisateur** | Guides et tutoriels par persona | 1 |

#### 📌 Détails d’implémentation — P2
- Qualité/Tests: couverture 80% code, e2e complets, non‑régression CI, tests perfs.
- Performance & UX: cache/CDN, lazy‑loading, images optimisées, Core Web Vitals.
- Monitoring & DevOps: APM (traces/spans), alerting SLO, backups vérifiés, CI/CD avec quality gates.

### ⚠️ Risques & mitigations (résumé)
- Stripe/Connect & idempotence: utiliser clés d’idempotence par opération, re‑try exponentiel, webhooks vérifiés HMAC, files/queues.
- SSO↔LMS & provisioning: feature flags, gestion d’erreurs centralisée, re‑try, journal d’orchestration et réconciliation admin.
- PDF headless: limiter templates, tests visuels par template, timeouts/process watchdog, fallback génération.
- Volumétrie imports: validation en amont, batch + reprise sur erreur, rapports d’import détaillés.

### 🎯 Checkpoints livrables — P0 (vérifiables)
- Paiements: endpoint création Checkout, webhooks `payment_intent.succeeded`/`payment_intent.payment_failed`/refund, enregistrement transaction, idempotence testée, facture PDF liée à l’inscription, email de confirmation.
- SSO/LMS: création utilisateur si absent, login SSO, appel provisioning sur inscription validée, re‑try et logs corrélés (traceId).
- Validation OF: transitions 4 états effectives, commentaire/modérateur, horodatage/auteur, export liste vérifs.
- Alertes: règles J‑90/J‑60/J‑30/J‑7/J‑1 planifiées, envois visibles dans un log/centre de notifications basique, anti‑doublons.
- Assignation interne: parcours Manager → inscription sans CB, décrémentation place, email, provisioning LMS.

---

**© 2025 MB Aviation - Document de travail confidentiel**

