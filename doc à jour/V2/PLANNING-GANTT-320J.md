# Planning Gantt - Projet Pygmalion (320 jours)

## Vue d'ensemble des phases

```mermaid
gantt
    title Planning Projet Pygmalion - 320 jours
    dateFormat YYYY-MM-DD
    
    section Phases Principales
    P0 - MVP Critique           :crit, p0, 2025-01-01, 180d
    P1 - Important               :active, p1, after p0, 100d
    P2 - Optimisation           :p2, after p1, 40d
```

## Phase P0 - CRITIQUE (180 jours) - Détail

```mermaid
gantt
    title P0 - Développement MVP (180 jours)
    dateFormat YYYY-MM-DD
    
    section Auth & Sécurité (34j)
    MFA/OTP obligatoire         :auth1, 2025-01-01, 6d
    Validation KYC/KYB Manuel   :auth2, after auth1, 8d
    LMS Core Minimal            :crit, lms0, after auth2, 20d
    
    section Hashrecord (20j)
    Smart Contract              :hash1, 2025-01-20, 8d
    Page Vérification          :hash2, after hash1, 5d
    Intégration Workflow       :hash3, after hash2, 4d
    Infrastructure             :hash4, after hash3, 3d
    
    section Marketplace (49j)
    Finalisation Marketplace    :mp1, 2025-02-01, 12d
    Validation OF              :mp2, after mp1, 7d
    Import contenus            :mp3, after mp2, 5d
    Paiements Stripe           :crit, mp4, after mp3, 15d
    Intégration LMS natif      :mp5, after mp4, 4d
    Dashboard Entreprise       :mp6, after mp5, 3d
    Dashboard Gestionnaire     :mp7, after mp6, 3d
    
    section Documents (20j)
    Certificats PDF            :doc1, 2025-03-15, 10d
    Emails automatiques        :doc2, after doc1, 8d
    Notifications Push/SMS     :doc3, after doc2, 2d
    
    section Infrastructure (26j)
    Tests essentiels           :infra1, 2025-04-01, 9d
    Déploiement cloud          :infra2, after infra1, 8d
    Configuration BDD          :infra3, after infra2, 4d
    Documentation API          :infra4, after infra3, 4d
    Sécurité                   :infra5, after infra4, 3d
    
    section Conformité (31j)
    Alertes conformité         :conf1, 2025-04-20, 13d
    Import personnel           :conf2, after conf1, 8d
    Assignation interne        :conf3, after conf2, 10d
```

## Phase P1 - IMPORTANT (100 jours) - Détail

```mermaid
gantt
    title P1 - Conformité et Gestion Entreprise (100 jours)
    dateFormat YYYY-MM-DD
    
    section LMS Fonctionnel (15j)
    Éditeur cours avancé       :lms1, 2025-07-01, 3d
    Quiz étendus               :lms2, after lms1, 2d
    Forums/discussions         :lms3, after lms2, 3d
    Support SCORM/xAPI         :lms4, after lms3, 3d
    Reporting formateur        :lms5, after lms4, 2d
    Notifications temps réel   :lms6, after lms5, 2d
    
    section Éléments déplacés (20j)
    Module Formateur           :dep1, 2025-07-20, 8d
    Affiliation Entreprise     :dep2, after dep1, 5d
    Wallet Documents           :dep3, after dep2, 5d
    
    section Conformité (18j)
    Pack Qualiopi              :qual1, 2025-08-10, 9d
    Documents pédagogiques     :qual2, after qual1, 9d
    
    section Gestion Entreprise (30j)
    Budget formation           :ent1, 2025-09-01, 8d
    KPIs avancés              :ent2, after ent1, 8d
    Gestionnaire Aéroport      :ent3, after ent2, 5d
    Parcours sur-mesure       :ent4, after ent3, 8d
    Modération qualité        :ent5, after ent4, 1d
    
    section Validation (17j)
    Workflow OF complet        :val1, 2025-10-01, 2d
    Import/Export avancé       :val2, after val1, 2d
    KYC/KYB Semi-auto         :val3, after val2, 4d
    Surveillance examens       :val4, after val3, 2d
    Exports BPF/CERFA         :val5, after val4, 2d
```

## Phase P2 - OPTIMISATION (40 jours) - Détail

```mermaid
gantt
    title P2 - Qualité et Performance (40 jours)
    dateFormat YYYY-MM-DD
    
    section LMS Optimisé (10j)
    Mode hors-ligne PWA        :lms1, 2025-11-01, 2d
    Analytics avancés          :lms2, after lms1, 2d
    IA adaptative             :lms3, after lms2, 3d
    Proctoring avancé         :lms4, after lms3, 3d
    
    section KYC Auto (4j)
    KYC/KYB Full Auto         :kyc1, 2025-11-15, 4d
    
    section Qualité (11j)
    Tests automatisés          :test1, 2025-11-20, 4d
    Tests E2E complets         :test2, after test1, 3d
    Audit OWASP               :test3, after test2, 2d
    Documentation tech         :test4, after test3, 2d
    
    section Performance (8j)
    Optimisation perf          :perf1, 2025-12-05, 2d
    Mobile responsive          :perf2, after perf1, 2d
    UX améliorée              :perf3, after perf2, 2d
    Accessibilité WCAG        :perf4, after perf3, 2d
    
    section Monitoring (7j)
    APM complet               :mon1, 2025-12-15, 2d
    CI/CD avancé              :mon2, after mon1, 2d
    Backup & DR               :mon3, after mon2, 2d
    SSO entreprises           :mon4, after mon3, 1d
```

## Dépendances critiques

### Chemin critique principal
1. **Auth & Sécurité** (34j) → Base nécessaire pour tout le système
2. **LMS Core** (20j P0) → Prérequis pour les fonctionnalités formation
3. **Paiements Stripe** (15j) → Monétisation essentielle
4. **Hashrecord** (20j) → Innovation différenciante, peut être parallélisé
5. **Tests & Déploiement** (26j) → Validation avant production

### Dépendances inter-modules
- **LMS Core (P0)** → **LMS Fonctionnel (P1)** → **LMS Optimisé (P2)**
- **Dashboard Gestionnaire Basique (P0)** → **Gestionnaire Complet (P1)**
- **KYC Manuel (P0)** → **KYC Semi-auto (P1)** → **KYC Full Auto (P2)**
- **Marketplace** → **Intégration LMS** → **Tableaux de bord**

### Parallélisation possible
- **Hashrecord** peut être développé en parallèle de la Marketplace
- **Documentation** peut commencer dès que les modules sont stabilisés
- **Tests** peuvent être écrits en parallèle du développement
- **Infrastructure** peut être préparée en avance

## Jalons principaux

| Jalon | Date (estimation) | Livrables clés |
|-------|------------------|----------------|
| **M1** | J60 | Auth/Security + LMS Core démarré |
| **M2** | J120 | Marketplace + Paiements + Hashrecord |
| **M3** | J180 (Fin P0) | MVP complet, prêt pour beta test |
| **M4** | J280 (Fin P1) | Conformité complète + Entreprise features |
| **M5** | J320 (Fin P2) | Production optimisée, ready to scale |

## Ressources requises par phase

### P0 - MVP (180j)
- **Dev Frontend** : 2 seniors temps plein
- **Dev Backend** : 2 seniors temps plein  
- **Dev Blockchain** : 1 spécialiste (20j)
- **DevOps** : 1 senior (mi-temps)
- **Product Owner** : 1 temps plein
- **QA** : 1 temps plein (à partir de J90)

### P1 - Important (100j)
- **Dev Frontend** : 2 seniors temps plein
- **Dev Backend** : 2 seniors temps plein
- **Dev LMS** : 1 spécialiste (15j)
- **DevOps** : 1 senior temps plein
- **QA** : 1 senior temps plein
- **Conformité** : 1 expert (mi-temps)

### P2 - Optimisation (40j)
- **Dev Frontend** : 1 senior temps plein
- **Dev Backend** : 1 senior temps plein
- **Dev IA/ML** : 1 spécialiste (10j)
- **DevOps** : 1 senior temps plein
- **QA** : 2 seniors temps plein
- **Security** : 1 expert (audit)

## Risques et mitigations

| Risque | Impact | Probabilité | Mitigation | Buffer |
|--------|--------|-------------|------------|--------|
| **LMS sous-estimé** | Élevé | Moyenne | Développement progressif sur 3 phases | +10j inclus |
| **Intégration Stripe** | Moyen | Faible | Utilisation Stripe Checkout standard | +3j prévu |
| **Hashrecord complexité** | Élevé | Moyenne | POC early, fallback PDF ready | +5j prévu |
| **Conformité Qualiopi** | Moyen | Faible | Expert dédié en P1 | Buffer P1 |
| **Performance scale** | Moyen | Faible | Architecture scalable dès P0 | P2 dédié |

## Points d'attention

1. **LMS progressif** : Le développement sur 45j (20+15+10) est plus réaliste que 10j initial
2. **Gestionnaire Aéroport** : Périmètre clarifié P0 basique / P1 complet
3. **Optimisations P0** : Réduction justifiée sur Stripe, PDF, emails pour compenser LMS
4. **Wallet Documents** : Ajouté en P1 comme demandé, 5j maintenus
5. **Parcours sur-mesure** : Augmenté à 8j pour importance stratégique

---

*Document généré le : 2025-01-XX*
*Version : 2.0 - Post réallocation*
*Durée totale : 320 jours*
*Budget maintenu : 1.35-1.8M€*