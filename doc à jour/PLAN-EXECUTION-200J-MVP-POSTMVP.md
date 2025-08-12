---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# PLAN D'EXÉCUTION — 200 JOURS (MVP + POST-MVP)
## Analyse code, alignement PRD/user-flows, charges et planning

**Projet :** Pygmalion — Marketplace & LMS aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## 1) Analyse du code (backend, frontend)

### **Backend (NestJS + Prisma + Supabase)**

#### ✅ **Implémenté**
- **Auth/MFA/JWT** : Supabase Auth, guards JWT, pipes/filters globaux, logging Winston
- **Utilisateurs, Cours, Sessions, Inscriptions** : CRUD, validations, gestion places, services de mapping/query; tests unitaires partiels
- **Organismes de formation (KYB/Qualiopi)** : profil OF, upload documents vers Supabase Storage, statut de vérification (admin), listing des docs
- **Examens/Quizz/Sécurité** : services structurés (config/monitoring/reports) avec lockdown browser, détection fraude basique, timeline events fonctionnels; proctoring IA/webcam prévu Post-MVP
- **Configuration** : buckets Supabase auto-init, service Supabase auth/storage, configuration JWT

#### ❌ **Manquants MVP**
- Stripe (Checkout/webhooks)
- Moteur d'alertes conformité
- Module Budget
- Exports BPF
- SSO/provisioning LMS (intégration custom)
- Admin UI

### **Frontend (Vite + React + Tailwind)**

#### ✅ **Implémenté**
- **Auth/Contexts/API** : pages login/register/verified, client API avec refresh token proactif et MFA, services par domaine
- **Pages** : catalogue, détail cours, dashboards basiques par persona, composants et hooks utilitaires
- **Docs/certificats** : génération côté back; tokenisation mock (service blockchain de démonstration seulement, Post-MVP)

#### ❌ **Manquants MVP**
- Flux Stripe côté client
- Budget UI
- Admin modération UI
- Gestion alertes (paramètres/UX)
- SSO/flows LMS profonds

### 📊 **Synthèse 12 jours réalisés**
- Mise en place fondations sécurité (JWT/MFA/guards)
- Modèles clés (cours/sessions/inscriptions/OF)
- Stockage Supabase, API client robuste
- Pages majeures du catalogue et auth
- **Couverture MVP estimée : ~20%** (plus solide côté fondations que fonctionnalités monétisation)

---

## 2) Analyse PRD ↔ User-Flows — Alignement et Décisions

### ✅ **Personas alignés**
OF, Formateur, Apprenant (indép./interne), Entreprise/Manager, Gestionnaire d'aéroport, Admin PGM — parcours définis et cohérents.

### 💳 **Paiements (Stripe) — MVP à construire**
- **Périmètre** : Checkout, webhooks idempotents, commission 15–20%, remboursements, facturation PDF
- **Dépendances** : compte Stripe, CGV/numérotation factures, emails transactionnels
- **Critères d'acceptation** :
  - Paiement réussi → inscription validée → accès LMS
  - Facture émise
  - Logs/webhooks tracés
  - Taux succès > 99%

### 🎓 **LMS custom — MVP à construire**
- **Périmètre** : SSO OAuth2, provisioning (cours/sessions/inscrits), sync progression/résultats
- **Risques** : complexité provisioning, pas de SCORM/xAPI au MVP (assumé)
- **Critères** :
  - Création session → accès LMS auto
  - Progression visible côté MP en < 5 min

### 📋 **Conformité/Qualité — MVP à construire**
- **Périmètre** :
  - Enquêtes T0/T+90
  - BPF CERFA
  - Alertes J-90/J-60/J-30/J-7/J-1 (email + in-app)
  - Exports CSV/Excel
- **Dépendances** :
  - Modèles d'emails
  - Règles par rôle (Manager/Entreprise/PGM)
  - Référentiel formations obligatoires
- **Critères** :
  - Alertes déclenchées selon règles
  - BPF exportable
  - Taux de réponse T0/T+90 mesurable

### 🔗 **Tokenisation — Post-MVP 2026 (confirmé)**
- **Modèle** : on/off-chain (docs off-chain S3/IPFS, hash on-chain Polygon), endpoint public de vérification (QR)
- **Décisions en attente** :
  - Choix off-chain (S3 vs IPFS)
  - Schéma métadonnées
  - H1 (hash+endpoint) vs H2 (smart-contracts/NFT, All-in)

### ✅ **Décisions entérinées**
- ✅ Tokenisation déplacée Post-MVP (2026) — H1 d'abord; H2 hors scope 200j
- ✅ Commission plateforme 15–20% via Stripe
- ✅ LMS 100% custom
- ✅ Alertes conformité J-90… validées

### ⚠️ **Points à valider (bloquants planning)**
1. **Stripe** : Checkout seul ou Connect (reversements OF) dès MVP ?
2. **LMS** : détails SSO/provisioning (objets, mapping, cadence sync)
3. **Conformité** : référentiel des formations obligatoires par acteur/site
4. **Stockage tokenisation** : S3 chiffré vs IPFS (avec Kepler Aviation)

### 📅 **Impact sur milestones**
- **M1** : Marketplace (catalogue/inscription sans paiement, auth/MFA)
- **M2** : Paiements + Certificats (factures PDF, emails)
- **M3** : Conformité + Analytics (alertes, BPF, KPI, Budget v1)
- **M5** : Tokenisation H1 (hash on-chain + vérif publique)

---

## 3) Charge globale — 200 jours (MVP + Post-MVP)

### **Répartition par priorité** (total = 200 jours)

### 🔴 **CRITIQUE — P0 (77 jours)**
| Tâche | Jours | Priorité |
|---|---:|:---:|
| Marketplace public (catalogue, détail, inscription) | 15 | P0 |
| Paiement Stripe (Checkout, webhooks, factures) | 12 | P0 |
| Certificats PDF (génération, templates, stockage) | 10 | P0 |
| Notifications email (templates, envoi) | 8 | P0 |
| Tests E2E critiques | 10 | P0 |
| Documentation API | 5 | P0 |
| Déploiement production | 5 | P0 |
| CI/CD + Monitoring/Observabilité | 6 | P0 |
| DB/Migrations + Config Supabase (environnements) | 6 | P0 |

### 🟡 **IMPORTANT — P1 (73 jours)**
| Tâche | Jours | Priorité |
|---|---:|:---:|
| Analytics avancés (dashboards KPI) | 8 | P1 |
| Gestion équipes complète | 6 | P1 |
| Gestionnaire aéroport (vue conformité multi-entités) | 8 | P1 |
| Budget formation (BE/FE/exports) | 10 | P1 |
| Alertes conformité (moteur + UI + emails) | 8 | P1 |
| Import/Export avancé | 5 | P1 |
| KYC/KYB validation (durcissement, UX) | 5 | P1 |
| Workflow validation OF (admin UI) | 4 | P1 |
| SSO entreprises (optionnel) | 4 | P1 |
| Proctoring IA basique (webcam monitoring) | 5 | P1 |
| Qualiopi compliance pack (T0/T+90, BPF CERFA, émargement numérique, déroulé pédagogique) | 15 | P1 |
| Tokenisation H1 (intégration API Kepler — intégration API uniquement, pas de déploiement blockchain; flux: MP → Kepler (données diplôme) → retour preuves d'authenticité) | 5 | P1 |

### 🟢 **OPTIMISATION — P2 (50 jours)**
| Tâche | Jours | Priorité |
|---|---:|:---:|
| Tests unitaires (≈80% coverage ciblée) | 12 | P2 |
| Tests d’intégration (priorités critiques) | 5 | P2 |
| Optimisations performance | 8 | P2 |
| Security audit/hardening | 5 | P2 |
| UX improvements | 5 | P2 |
| Mobile responsive | 5 | P2 |
| Accessibilité (WCAG de base) | 5 | P2 |
| Documentation utilisateur | 5 | P2 |

### 📝 **Remarques**
- Les postes **P0** couvrent le « go-to-market » MVP
- **P1** complète la valeur (budget/alertes/analytics)
- **P2** consolide qualité/sécu
- Tokenisation H2 (smart-contracts/NFT) est hors 200j (phase 2026 All-in, à valider avec Kepler Aviation)

---

## 4) MVP vs Post-MVP (dans 200 jours)

### **Découpage proposé** (indicatif; budget total 200j)

#### 🎯 **MVP cible ≈ 120 jours**
- Principalement **P0** + sous-ensemble **P1**
- Budget de base
- Alertes de base
- Admin OF minimal
- Analytics simples

#### 🚀 **Post-MVP cible ≈ 80 jours**
- Reste **P1** + **P2**
- Tokenisation H1 (intégration API Kepler — intégration API uniquement, pas de déploiement blockchain)
- Optimisations et qualité

- Tokenisation H2 (SC/NFT)
- IA anti-fraude avancée (comportementale, biométrie continue)
- Intégrations API OPCO/CPF (connecteurs directs)

---

## 5) Tableau modules — État, tests, sécu, progression vs reste

### 📊 **État détaillé par module**

| Module | Codé | Testé | User-flow | Sécu | Autres tests | Progression (≈12j) | Reste (200j) |
|--------|:----:|:-----:|:---------:|:----:|:------------:|:------------------:|:------------:|
| **Auth/MFA/JWT** | ✅ | ⚠️ | ✅ | Guards/MFA | À compléter e2e | 80% | 4 |
| **Utilisateurs/Profils** | ✅ | ⚠️ | ✅ | RBAC | Unitaires ciblés | 70% | 4 |
| **Cours/Sessions** | ✅ | ⚠️ | ✅ | Validations | Recherche/filters | 65% | 8 |
| **Inscriptions** | ✅ | ⚠️ | ✅ | Règles | E2E critiques | 60% | 10 |
| **Examens sécurisés** | ✅ | ⚠️ | ⚠️ | Anti-fraude/Lockdown | Proctoring IA futur | 75% | 8 |
| **Paiements Stripe** | ❌ | ❌ | ✅ | PCI (Stripe) | Webhooks/tests | 0% | 12 |
| **OF (KYB/Qualiopi)** | ✅ | ⚠️ | ✅ | Vérif admin | Flux UI admin | 70% | 6 |
| **Documents/Certificats PDF** | ⚠️ | ❌ | ✅ | Signatures/QR | Templates | 30% | 10 |
| **Alerts conformité** | ❌ | ❌ | ✅ | Règles | Scénarios | 0% | 8 |
| **Budget** | ❌ | ❌ | ✅ | Rôles | Exports | 0% | 10 |
| **Dashboards/Analytics** | ⚠️ | ❌ | ✅ | – | KPIs | 40% | 8 |
| **Admin plateforme** | ⚠️ | ❌ | ✅ | Audit | UI modération | 30% | 8 |
| **LMS (SSO/provisioning/sync)** | ⚠️ | ❌ | ✅ | – | Flows complets | 30% | 12 |
| **Import/Export avancé** | ❌ | ❌ | ✅ | – | E2E | 0% | 5 |
| **Tokenisation H1** | 🔄 | ❌ | ✅ | – | Verif publique | 0% | 12 |
| **Qualité (tests/unit/int)** | ⚠️ | ❌ | – | – | Couverture | 15% | 20 |

### 📝 **Notes**
- « Progression (≈12j) » reflète l’avancement actuel par module; la couverture globale représente ≈20% du MVP.
- 12 jours réalisés = fondations BE/FE + écrans catalogue/auth.
- « Reste » s'aligne sur les 200 jours globaux (répartis ci-dessus)
- **Aucun test user-flow** effectué côté client hormis connexion utilisateur (confirmé)

**Légende** : ✅ Fait | ⚠️ Partiel | ❌ Non fait | 🔄 Mock

---

## 6) Planning de livraison (jours; pas de dates fixes)

### **Capacité variable** (toujours 200 jours de dev au total)

#### 👤 **1 dev full-stack**
- 200 jours → MVP+Post-MVP
- Fenêtre : ~Déc. 2025 – Avr. 2026 pour MVP
- Reste selon priorisation

#### 👥 **2 devs**
- ~120 jours calendrier (coordination incluse)
- MVP visé dans la plage basse (Déc. 2025 possible)
- Finalisation Post-MVP ensuite

#### 👥👤 **3 devs** ⭐ **RECOMMANDÉ**
- ~90–100 jours calendrier
- MVP ≈ 3.5 mois (Mars–Avr. 2026)
- Post-MVP dans la même enveloppe totale

---

## 7) Roadmap par sprints (indicative)

### 🏃 **Sprint 1 — CRITIQUE** (≈ 35 jours)
1. Marketplace public complet
2. Stripe basique
3. Tests user-flow critiques

### 💰 **Sprint 2 — MONÉTISATION** (≈ 30 jours)
1. Checkout Stripe + webhooks
2. Factures
3. Dashboard revenus OF

### 📜 **Sprint 3 — CERTIFICATS** (≈ 25 jours)
1. PDF auto
2. Templates personnalisables
3. QR codes vérification

### 📧 **Sprint 4 — NOTIFICATIONS** (≈ 20 jours)
1. Service email
2. Templates
3. Préférences utilisateur

### 📊 **Sprint 5 — CONFORMITÉ/BUDGET** (≈ 30 jours)
1. Alertes échéances
2. Rapports autorités (BPF)
3. Budget (enveloppes/alloc/exports)

### 🛠️ **Sprint 6 — ADMIN/QUALITÉ** (≈ 30 jours)
1. Admin modération/validation
2. Analytics
3. Tests/Perf/Sécu/CI-CD/Observabilité

### 🔗 **Post-MVP — TOKENISATION H1** (≈ 12 jours)
1. Hash on-chain (Polygon testnet)
2. Endpoint vérif publique
3. UX de vérification

---

## 8) Milestones (5 x 40 jours) — livraisons progressives

Note: Les Milestones sont la référence contractuelle de livraison. Les sprints (section 7) sont une illustration d’ordonnancement interne.

### 🚀 **M1 (J1–40) — MVP Marketplace fonctionnel**

#### 📋 **Scope**
Catalogue public, recherche/filters, fiche cours + sessions, parcours inscription sans paiement, auth/MFA, onboarding OF basique, dashboards basiques, CI/CD dev+staging, logs/monitoring de base

#### 🎨 **Non-code**
Revue UX, templates contenus/copies, pages légales (mentions/privacy brouillon), préparation environnements, données de démo, normalisation FE/BE (`VITE_API_URL` → URL backend port 3000)

#### 📦 **Livrables**
FE/BE prêts démo, API docs v0, seed datasets, checklists QA de base

#### ✅ **Critères sortie**
- Navigation/browse/inscription (sans paiement) OK
- 95% endpoints P0 verts
- Démo stakeholder sign-off

---

### 💳 **M2 (J41–80) — Paiements + Certificats**

#### 📋 **Scope**
Stripe Checkout, webhooks, commission 15–20%, factures/attestations PDF, emails transactionnels (inscription, paiement, facture), rattachement paiement→inscription→accès LMS, renforcement sécurité examens (sur base lockdown existant)

#### 🎨 **Non-code**
Config Stripe (comptes, clés), règles facturation/numérotation, politique rétention (RGPD), procédures support paiement

#### 📦 **Livrables**
Flux e2e paiement→certificat, modèles PDF, templates email, tests E2E critiques paiement

#### ✅ **Critères sortie**
- Taux succès paiement > 99%
- Facture et certificat PDF générés
- Journaux webhooks idempotents
- Démo et acceptation

---

### 📊 **M3 (J81–120) — Conformité + Analytics**

#### 📋 **Scope**
Moteur d'alertes J‑90/J‑60/J‑30/J‑7/J‑1, paramètres notifications, questionnaires T0/T+90, rapports conformité (BPF CERFA + exports OPCO/CPF), feuilles d'émargement électroniques (e‑sign), déroulé pédagogique par session, dashboards KPI, Budget v1 (enveloppes/allocations/consommé‑engagé)

#### 🎨 **Non-code**
Templates emails conformité, taxonomie données conformité, formation Support N1/N2

#### 📦 **Livrables**
Tableaux conformité/analytics, exports CSV/Excel, scénarios d'alertes vérifiés

#### ✅ **Critères sortie**
- Alertes déclenchées selon règles
- BPF exporté
- Dashboards validés par métier

---

### 🎯 **M4 (J121–160) — Post-MVP avancé**

#### 📋 **Scope**
Admin plateforme (validation OF/formateurs, modération contenu, audit trail), import/export avancés, intégration LMS approfondie (provisioning/sync progression), proctoring IA basique (webcam monitoring, détection fraude avancée), UX polish

#### 🎨 **Non-code**
Runbooks admin/modération, revues sécurité/permissions, documentation opérateur

#### 📦 **Livrables**
Interfaces admin, flux de modération, scénarios import/export

#### ✅ **Critères sortie**
- RBAC vérifié
- Traces d'audit conformes
- Tests d'intégration admin verts

---

### ⭐ **M5 (J161–200) — Features premium**

#### 📋 **Scope**
Analytics avancés, Budget prévisionnel N+1, optimisation perf/sécu, accessibilité, documentation utilisateur/admin, préparation production (alerting SLO, sauvegardes DR), Tokenisation H1 (intégration API Kepler; endpoint de vérification/QR; flux: Pygmalion envoie données diplômes → backend Kepler tokenise → renvoie tokenId/hash/verifyUrl)

#### 🎨 **Non-code**
Guides utilisateurs, vidéos courtes, checklist go-live, plan de support, pré-pentest

#### 📦 **Livrables**
Endpoint vérif publique, tableaux avancés, docs finales, plans exploitation

#### ✅ **Critères sortie**
- Observabilité en place
- Audits sécu de base OK
- UX accessibilité revue
- Démonstration finale

---

### 📝 **Notes**
- Le budget reste **200 jours totaux**
- Avec plus de développeurs, on accélère le calendrier tout en conservant la qualité (QA, docs, exploitation, sécu)
- La tokenisation H2 (smart-contracts/NFT) reste hors périmètre et sera planifiée séparément (2026+)

---

## 9) Recommandations et risques

### 📌 Décisions à valider (MB Aviation)
 - Stripe: retenir **Stripe Connect Express** (multi‑organismes + commissions + KYC) avec `application_fee_amount` et webhooks; alternative “marchand unique + virements manuels” non recommandée.
 - Tokenisation (à définir avec Kepler Aviation): **H1 = intégration API Kepler uniquement** (pas de déploiement blockchain maison). Flux cible: MP → Kepler (payload diplôme) → Kepler renvoie `tokenId`/`hash`/`verifyUrl` (preuve d'authenticité). À préciser: endpoints/sécurité (auth, signature), schéma payload, SLA/retry/webhooks. **H2 = SC/NFT** plus tard. Décisions côté Kepler: choix off‑chain (**S3** vs **IPFS**), réseau (**Polygon** testnet→mainnet), schéma on‑chain, révocation, gestion clés.
 - Budget: prévoir une **réserve de 10–15%** dédiée conformité/opérations (Qualiopi, BPF, sécurité, observabilité, support).

### 🎯 **Priorités absolues (Go-To-Market)**
1. **Marketplace public**
2. **Stripe**
3. **Certificats PDF**
4. **Notifications email**

### ⚠️ **Risques/Contraintes**

#### **Intégration Stripe Connect**
- Reversements OF si exigée
- Complexité KYC/flows de fonds

#### **LMS custom**
- Effort provisioning/sync à cadrer
- SCORM/xAPI non prévus au MVP

#### **Tokenisation**
- Choix off‑chain (S3 vs IPFS)
- Schéma métadonnées à valider avec Kepler Aviation

#### **Ports/Environnements**
- FE cible 8000 vs BE 3000
- Normaliser dans l'étape de déploiement

#### **Intégrations OPCO/CPF**
- Hétérogénéité des APIs (si disponibles), délais d'accès sandbox
- Contraintes légales/contractuelles et sécurité des flux
- Mitigation: phase MVP par exports CSV/Excel normalisés + process opératoire

---

## Annexes

### 📚 **Documents de référence**
- **Alignement PRD/user‑flows** : voir `doc à jour/CHANGELOG-ALIGNMENT-2025-08-12.md`
- **Spécifications ajoutées** :
  - `user-flow/budget-entreprise-workflow.md`
  - `user-flow/admin-platform-workflow.md`
- **Tokenisation** : phasage 2026+
  - H1 (intégration API Kepler) : ce doc — §10 et §8/M5
  - H2 (SC/NFT complet) : hors 200j

---

## Annexe B — Matrice de Traçabilité

### 🔄 Exigence PRD → User-flow → Module → Implémentation

| Exigence PRD | User-Flow (réf) | Module Backend | Endpoints | UI Frontend | État |
|---|---|---|---|---|:---:|
| Auth/MFA | `stagiaire-apprenant-workflow` §1–4 | `auth` | POST `/auth/login`, POST `/auth/mfa/verify` | LoginForm, MFAModal | ✅ 80% |
| Paiement Stripe | `stagiaire-apprenant-workflow` §3–11 | ❌ À créer | POST `/payments/checkout`, POST `/payments/webhook` | PaymentPage | ❌ 0% |
| Certificats PDF | `flux-financiers-qualite-workflow` §3.A.2 | `certificates` (à créer) | POST `/certificates/generate`, GET `/certificates/:id/pdf` | CertificateTemplate | ⚠️ 30% |
| Alertes J-90… | `parcours-entreprise-workflow` §B | `alerts` (à créer) | POST `/alerts/compliance`, GET `/alerts` | AlertsConfig | ❌ 0% |
| Dashboard OF | `organisme-formation-workflow` §C.8 | `dashboard` | GET `/dashboard/training-org` | TrainingOrgDashboard | ✅ 90% |
| Budget Formation | `budget-entreprise-workflow` | `budgets` (à créer) | `/budgets/*` | BudgetManager | ❌ 0% |
| Tokenisation H1 (intégration Kepler) | `flux-financiers-qualite-workflow` §3.B | `kepler-integration` (à créer) | POST `/certificates/tokenize` (→ Kepler), GET `/certificates/:id/verify` | QR Verify Page | ❌ 0% |
| Sécurité Examens | PRD §Anti-fraude | `security` | GET `/security/exam-config`, POST `/security/events` | FocusedExamMode, SecurityChecks | ✅ 75% |

Légende: ✅ Implémenté | ⚠️ Partiel | ❌ À faire

### 🎭 Couverture par persona (synthèse)

| Persona | Workflows définis | Endpoints prêts | UI complète |
|---|:---:|:---:|:---:|
| OF | 100% | 85% | 90% |
| Apprenant | 100% | 60% | 70% |
| Manager | 100% | 40% | 50% |
| Stripe/Paiement | 100% | 0% | 0% |

### ❗ Mapping critique manquant (principaux écarts)
- Stripe: 0 endpoint sur 8 requis (Checkout, Webhook, Refunds, Invoices, Events, Payouts/Fees, Status, Health)
- Certificats: 0 endpoint sur 6 requis (Generate, Get PDF, List, Template Preview, Verify QR, Revoke)
- Alertes conformité: 0 endpoint sur 5 requis (Create Rules, List, Trigger, Mute/Resolve, Notifications)

---

**© 2025 MB Aviation — Tous droits réservés**
