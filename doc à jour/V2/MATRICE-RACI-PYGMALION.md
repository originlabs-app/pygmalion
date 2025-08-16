# Matrice RACI - Projet Pygmalion

## Légende
- **R** (Responsible) : Réalise le travail
- **A** (Accountable) : Responsable final, valide le livrable
- **C** (Consulted) : Consulté, fournit expertise
- **I** (Informed) : Informé de l'avancement

## Rôles définis
- **PO** : Product Owner
- **TL** : Tech Lead / Architecte
- **DF** : Développeur Frontend
- **DB** : Développeur Backend
- **DL** : Développeur LMS
- **DH** : Développeur Hashrecord/Blockchain
- **DO** : DevOps/SRE
- **UX** : UX/UI Designer
- **QA** : Quality Assurance
- **SE** : Expert Sécurité
- **EC** : Expert Conformité
- **PM** : Project Manager (CEO/COO)

---

## Phase P0 - CRITIQUE (180 jours)

### Authentification & Sécurité (34j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| MFA/OTP obligatoire | C | A | I | R | - | - | I | C | C | R | I | I |
| Validation KYC/KYB Manuel | A | C | R | R | - | - | - | R | C | C | C | I |
| LMS Core Minimal (20j) | A | A | R | R | R | - | C | R | C | - | - | I |

### Certification Hashrecord (20j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Smart Contract HashRegistry | C | C | - | I | - | R | I | - | R | A | C | I |
| Page Vérification Publique | A | C | R | C | - | R | - | R | C | C | - | I |
| Intégration Workflow | C | A | I | R | - | R | - | - | C | C | - | I |
| Infrastructure Hashrecord | I | A | - | I | - | R | R | - | C | C | - | I |

### Core Marketplace (49j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Finalisation Marketplace | A | C | R | R | - | - | - | R | C | - | C | I |
| Validation OF | A | C | R | R | - | - | - | C | C | - | R | I |
| Import contenus | C | A | R | R | C | - | - | C | C | - | C | I |
| Paiements Stripe (15j) | A | A | R | R | - | - | C | C | R | C | C | I |
| Intégration LMS natif | C | A | C | R | R | - | - | - | R | - | - | I |
| Dashboard Entreprise | A | C | R | R | - | - | - | R | C | - | - | I |
| Dashboard Gestionnaire P0 | A | C | R | R | - | - | - | R | C | - | C | I |

### Documents & Communications (20j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Certificats PDF (10j) | A | C | I | R | - | C | - | C | C | - | C | I |
| Emails automatiques (8j) | A | C | I | R | - | - | C | R | C | - | - | I |
| Notifications Push/SMS | C | C | R | R | - | - | C | C | C | - | - | I |

### Infrastructure & Production (26j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Tests essentiels | C | A | C | C | C | C | I | - | R | C | - | I |
| Déploiement cloud | I | A | I | I | I | I | R | - | C | C | - | I |
| Configuration BDD | I | A | - | C | - | - | R | - | C | C | - | I |
| Documentation API (4j) | C | A | C | R | C | C | I | - | I | - | - | I |
| Durcissement sécurité | I | A | I | C | - | - | R | - | C | R | - | I |

### Conformité & Gestion (31j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Alertes conformité | A | C | R | R | - | - | - | C | C | - | R | I |
| Import personnel | A | C | R | R | - | - | - | C | C | - | C | I |
| Assignation interne | A | C | R | R | C | - | - | C | C | - | - | I |

---

## Phase P1 - IMPORTANT (100 jours)

### LMS Fonctionnel (15j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Éditeur cours avancé | A | C | R | C | R | - | - | R | C | - | - | I |
| Types quiz étendus | C | C | R | C | R | - | - | C | C | - | - | I |
| Forums/discussions | C | A | R | R | R | - | - | C | C | - | - | I |
| Support SCORM/xAPI | C | A | C | R | R | - | - | - | C | - | C | I |
| Reporting formateur | A | C | R | R | R | - | - | C | C | - | - | I |
| Notifications temps réel | C | A | R | R | C | - | C | - | C | - | - | I |

### Éléments déplacés de P0 (20j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Module Formateur (8j) | A | C | R | R | C | - | - | C | C | - | - | I |
| Affiliation Entreprise | A | C | R | R | - | - | - | C | C | - | - | I |
| Wallet Documents | C | A | R | R | - | - | C | C | C | R | - | I |

### Conformité Qualiopi (18j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Pack Qualiopi complet | A | C | R | R | - | - | - | C | C | - | R | I |
| Documents pédagogiques | A | C | R | R | C | - | - | C | C | - | R | I |

### Gestion Entreprise (30j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Budget formation (8j) | A | C | R | R | - | - | - | C | C | - | C | I |
| KPIs avancés (8j) | A | C | R | R | - | - | C | R | C | - | - | I |
| Gestionnaire Aéroport P1 (5j) | A | C | R | R | - | - | - | R | C | - | C | I |
| Parcours sur-mesure (7j) | A | C | R | R | C | - | - | R | C | - | C | I |
| Modération qualité | C | C | R | R | - | - | - | - | C | - | R | I |

### Validation & Contrôle (17j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Workflow OF complet | A | C | R | R | - | - | - | C | C | - | C | I |
| Import/Export avancé | C | A | C | R | - | - | - | - | C | - | - | I |
| KYC/KYB Semi-auto | C | A | R | R | - | - | - | - | C | C | C | I |
| Surveillance examens | C | A | R | R | R | - | - | - | C | C | - | I |
| Exports BPF/CERFA | A | C | I | R | - | - | - | - | C | - | R | I |

---

## Phase P2 - OPTIMISATION (40 jours)

### LMS Optimisé (10j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Mode hors-ligne PWA | C | A | R | C | R | - | C | C | C | - | - | I |
| Analytics avancés | A | C | R | R | R | - | - | C | C | - | - | I |
| IA adaptative | C | A | R | R | R | - | - | - | C | - | - | I |
| Proctoring avancé | C | A | R | R | R | - | - | - | R | C | - | I |

### KYC/KYB Full Auto (4j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Intégration services tiers | C | A | C | R | - | - | C | - | R | R | C | I |

### Qualité & Tests (11j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Tests automatisés (4j) | I | A | C | C | C | C | C | - | R | C | - | I |
| Tests E2E complets (3j) | I | C | C | C | C | C | C | - | R | - | - | I |
| Audit OWASP | I | C | I | I | I | I | C | - | C | R | - | A |
| Documentation technique | C | A | C | C | C | C | C | - | I | - | - | I |

### Performance & UX (8j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| Optimisation performance | I | A | R | R | C | - | R | - | C | - | - | I |
| Mobile responsive | A | C | R | - | - | - | - | R | C | - | - | I |
| UX améliorée | A | C | R | - | C | - | - | R | C | - | - | I |
| Accessibilité WCAG | A | C | R | - | - | - | - | R | R | - | C | I |

### Monitoring & DevOps (7j)

| Tâche | PO | TL | DF | DB | DL | DH | DO | UX | QA | SE | EC | PM |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|
| APM complet | I | A | I | I | I | I | R | - | C | C | - | I |
| CI/CD avancé | I | A | C | C | C | C | R | - | C | - | - | I |
| Backup & DR | I | A | - | C | - | - | R | - | I | C | - | C |
| SSO entreprises | C | A | C | R | - | - | C | - | C | R | - | I |
| Documentation user | A | C | C | C | C | - | - | R | I | - | - | I |

---

## Points clés de gouvernance

### Comité de pilotage (hebdomadaire)
- **Participants** : PM (A), PO (R), TL (R), DO (C)
- **Objectif** : Suivi avancement, arbitrages, risques

### Revue technique (bi-hebdomadaire)
- **Participants** : TL (A), DF (R), DB (R), DL (R), DO (R), QA (C)
- **Objectif** : Architecture, qualité code, dette technique

### Revue sécurité (mensuelle)
- **Participants** : SE (A), TL (R), DO (R), DH (C)
- **Objectif** : Audit sécurité, conformité, risques

### Revue conformité (mensuelle)
- **Participants** : EC (A), PO (R), PM (C)
- **Objectif** : Conformité réglementaire, Qualiopi, DGAC

### Sprint Review (toutes les 2 semaines)
- **Participants** : PO (A), Équipe dev (R), PM (I), Stakeholders (I)
- **Objectif** : Démo, feedback, validation

## Escalade et décision

### Niveau 1 - Opérationnel
- **Décideur** : Tech Lead
- **Périmètre** : Choix techniques, architecture, outils

### Niveau 2 - Produit
- **Décideur** : Product Owner
- **Périmètre** : Fonctionnalités, priorisation, UX

### Niveau 3 - Stratégique
- **Décideur** : CEO/COO (PM)
- **Périmètre** : Budget, planning, partenariats, go/no-go

## Communication

### Canaux principaux
- **Slack** : Communication quotidienne équipe
- **Jira** : Suivi des tâches et tickets
- **Confluence** : Documentation projet
- **GitLab** : Code et CI/CD
- **Email** : Communication formelle et externe

### Reporting
- **Daily standup** : Équipe dev (quotidien)
- **Sprint report** : PO → PM (bi-hebdomadaire)
- **Dashboard KPI** : TL → PM (hebdomadaire)
- **Risk report** : TL/SE → PM (mensuel)
- **Budget report** : PO → CEO (mensuel)

---

*Document créé le : 2025-01-XX*
*Version : 1.0*
*Projet : Pygmalion - 320 jours*