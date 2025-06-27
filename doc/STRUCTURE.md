# 📁 STRUCTURE DE LA DOCUMENTATION

```
doc/
├── 📋 README.md                              # Index principal de navigation
├── 📊 STRUCTURE.md                           # Ce fichier - aperçu de l'organisation
│
├── 📋 01-specifications/                     # Spécifications principales
│   ├── PRD-PYGMALION-Marketplace-Formation.md    # PRD principal [RÉFÉRENCE]
│   ├── phase-1.1-detailed.md                     # Spécifications détaillées phase 1.1
│   └── phase-1.2-frontend-parcours-utilisateurs.md # Frontend & UX pour démonstration
│
├── 🏗️ 02-architecture/                      # Architecture technique
│   ├── backend.md                                # Architecture backend Node.js/NestJS
│   ├── database-schema.md                        # Modèle de données Prisma
│   └── arborescence.md                           # Structure du projet
│
├── 👤 03-user-experience/                   # Expérience utilisateur
│   ├── user-flows.md                            # Parcours utilisateurs
│   └── dashboard-entreprise.md                   # Specs dashboards entreprise
│
└── 📖 04-detailed-requirements/             # Requirements détaillés par module
    ├── LMS.md                                   # Learning Management System
    ├── marketplace.md                           # Plateforme commerciale
    └── catalogue.md                             # Vitrine formations
```

---

## 🎯 **NAVIGATION RECOMMANDÉE**

### **📋 POUR COMMENCER**
1. **[README.md](README.md)** → Index principal
2. **[PRD principal](01-specifications/PRD-PYGMALION-Marketplace-Formation.md)** → Document de référence

### **🔍 PAR RÔLE**

#### 👔 **Product Manager**
```
README.md → 01-specifications/ → 03-user-experience/ → 04-detailed-requirements/
```

#### 💻 **Développeur**
```
README.md → 02-architecture/ → 04-detailed-requirements/ → 01-specifications/
```

#### 🎨 **UX/UI Designer**
```
README.md → 03-user-experience/ → 04-detailed-requirements/ → 01-specifications/
```

#### 🏗️ **Architecte Technique**
```
README.md → 02-architecture/ → 04-detailed-requirements/ → 01-specifications/
```

---

## 📊 **STATUT DES DOCUMENTS**

| Document | Status | Dernière MAJ | Priorité |
|----------|--------|--------------|----------|
| **PRD principal** | ✅ Finalisé | Dec 2024 | 🔴 CRITIQUE |
| **Phase 1.2 Frontend/UX** | ✅ Finalisé | Dec 2024 | 🔴 CRITIQUE |
| **LMS specs** | ✅ Finalisé | Dec 2024 | 🔴 CRITIQUE |
| **Marketplace specs** | ✅ Finalisé | Dec 2024 | 🔴 CRITIQUE |
| **Catalogue specs** | ✅ Finalisé | Dec 2024 | 🔴 CRITIQUE |
| **Dashboards specs** | ✅ Finalisé | Dec 2024 | 🟡 IMPORTANT |
| **User flows** | ✅ Finalisé | Jun 2024 | 🟡 IMPORTANT |
| **Backend arch** | ✅ Finalisé | Jun 2024 | 🟡 IMPORTANT |
| **Database schema** | ✅ Finalisé | Jun 2024 | 🟡 IMPORTANT |
| **Arborescence** | ✅ Finalisé | Jun 2024 | 🟢 RÉFÉRENCE |
| **Phase 1.1 detailed** | ✅ Finalisé | Jun 2024 | 🟢 RÉFÉRENCE |

---

## 🔄 **WORKFLOW DE MISE À JOUR**

### **📝 Modifications mineures**
- Mettre à jour le document concerné
- Vérifier la cohérence avec le PRD principal
- Mettre à jour la date dans STRUCTURE.md

### **🚨 Modifications majeures**
1. Identifier les documents impactés
2. Mettre à jour le PRD principal en premier
3. Cascader les modifications dans les docs détaillés
4. Vérifier la cohérence globale
5. Mettre à jour le README.md si nécessaire

### **🆕 Nouveaux documents**
1. Créer dans le bon dossier thématique
2. Ajouter le lien dans README.md
3. Mettre à jour STRUCTURE.md
4. Vérifier la cohérence avec le PRD

---

## 📧 **CONTACTS**

**Product Management** : Responsable PRD et cohérence générale  
**Tech Lead** : Responsable architecture et specs techniques  
**UX Lead** : Responsable user flows et specs design

---

*Dernière mise à jour de la structure : Décembre 2024* 