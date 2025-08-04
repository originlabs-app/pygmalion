# Pygmalion - Marketplace de Formation Aéronautique

## 🚀 Description

Pygmalion est une plateforme innovante de marketplace de formation aéronautique, conçue pour connecter les organisations de formation (OF) avec les entreprises et les apprenants dans le secteur aéronautique.

## 🏗️ Architecture

Le projet est structuré en deux parties principales :

### Backend (NestJS + Prisma)
- **Framework** : NestJS avec TypeScript
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : JWT avec stratégies multiples
- **Stockage** : Supabase Storage pour les fichiers multimédias
- **API** : RESTful avec documentation Swagger

### Frontend (React + TypeScript)
- **Framework** : React 18 avec TypeScript
- **UI** : Shadcn/ui avec Tailwind CSS
- **Routing** : React Router v6
- **État** : Context API + Hooks personnalisés
- **Services** : Axios pour les appels API

## 🎯 Fonctionnalités Principales

### Pour les Organisations de Formation (OF)
- Gestion complète des cours et modules
- Système d'évaluation (examens et quiz)
- Tableau de bord analytique
- Gestion des sessions de formation
- Système de certification blockchain

### Pour les Entreprises
- Catalogue de formations personnalisé
- Gestion des inscriptions des employés
- Suivi des certifications
- Tableau de bord RH

### Pour les Apprenants
- Parcours d'apprentissage personnalisé
- LMS intégré avec contenu multimédia
- Système d'évaluation en ligne
- Certifications vérifiables

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js 18+
- PostgreSQL
- Supabase (pour le stockage)

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Structure du Projet

```
Pygmalion/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Authentification
│   │   ├── courses/        # Gestion des cours
│   │   ├── enrollments/    # Inscriptions
│   │   ├── exams/          # Examens
│   │   ├── quizzes/        # Quiz
│   │   └── users/          # Utilisateurs
│   └── prisma/             # Schéma de base de données
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/     # Composants UI
│   │   ├── pages/          # Pages de l'application
│   │   ├── services/       # Services API
│   │   └── types/          # Types TypeScript
└── doc/                    # Documentation
```

## 🔐 Sécurité

- Authentification JWT avec refresh tokens
- Gestion des rôles et permissions
- Validation des données avec DTOs
- Protection CSRF
- Chiffrement des données sensibles

## 🚀 Déploiement

### Backend (Render)
- Configuration automatique via `render.yaml`
- Variables d'environnement sécurisées
- Base de données PostgreSQL gérée

### Frontend (Netlify)
- Déploiement automatique depuis GitHub
- Variables d'environnement configurées
- CDN global pour les performances

## 📊 Base de Données

Le schéma Prisma inclut :
- Utilisateurs et organisations
- Cours, modules et ressources
- Inscriptions et sessions
- Examens, quiz et résultats
- Certifications blockchain

## 🔄 Workflow de Développement

1. **Feature Branch** : Créer une branche pour chaque fonctionnalité
2. **Tests** : Tests unitaires et d'intégration
3. **Code Review** : Validation par l'équipe
4. **Déploiement** : Pipeline CI/CD automatique

## 📝 Documentation

- [Spécifications détaillées](doc/01-specifications/)
- [Architecture technique](doc/02-architecture/)
- [Expérience utilisateur](doc/03-user-experience/)
- [Guide de déploiement](DEPLOYMENT_GUIDE.md)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation dans le dossier `doc/`
- Contacter l'équipe de développement

---

**Pygmalion** - Révolutionner la formation aéronautique 🛩️ 