# Workflow Git Professionnel pour Pygmalion - OriginLabs

## 🎯 Vue d'ensemble

Ce document définit le workflow Git professionnel pour le projet Pygmalion, garantissant une gestion méthodique et SSOT (Single Source of Truth) des commits entre le développement local et GitHub OriginLabs.

## 🔧 Configuration initiale

### 1. Authentification SSH pour OriginLabs uniquement

```bash
# Configuration SSH (~/.ssh/config)
# Compte OriginLabs (usage exclusif)
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_pierre
    IdentitiesOnly yes
```

### 2. Configuration Git locale

```bash
# Configuration locale du projet (dans le dossier Pygmalion)
git config user.name "Pierre Beunardeau"
git config user.email "pierre.beunardeau@originlabs.app"

# Vérifier la configuration
git config --list | grep user
```

### 3. Remote repository

```bash
# URL SSH pour OriginLabs
git remote set-url origin git@github.com:originlabs/pygmalion.git

# Vérifier le remote
git remote -v
```

## 📋 Standards de commits

### Format des messages de commit

```
<type>: <description courte>

[Corps optionnel avec plus de détails]

[Footer optionnel]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types de commits

| Type | Description | Exemple |
|------|-------------|---------|
| `feat` | Nouvelle fonctionnalité | `feat: ajout système de certification blockchain` |
| `fix` | Correction de bug | `fix: correction navigation responsive mobile` |
| `refactor` | Refactoring sans changement fonctionnel | `refactor: extraction service authentification` |
| `perf` | Amélioration des performances | `perf: optimisation chargement modules LMS` |
| `docs` | Documentation uniquement | `docs: mise à jour guide déploiement` |
| `style` | Formatage, UI/UX | `style: amélioration design dashboard` |
| `test` | Ajout ou correction de tests | `test: ajout tests service examen` |
| `chore` | Maintenance, dépendances, config | `chore: mise à jour dépendances NestJS` |
| `security` | Sécurité et conformité | `security: ajout validation entrées utilisateur` |

### Règles des messages

1. **Première ligne** : Maximum 72 caractères
2. **Impératif présent** : "Ajoute" et non "Ajouté" ou "Ajouter"
3. **Pas de point final** sur la première ligne
4. **Corps séparé** par une ligne vide
5. **Footer** pour références issues/PR

## 🔄 Workflow quotidien

### 1. Début de session - Synchronisation

```bash
# Se placer dans le projet
cd /Users/galileonetwork/Documents/Pygmalion

# Vérifier l'état local
git status

# Récupérer les derniers changements
git fetch origin
git pull origin main

# Vérifier les commits récents
git log --oneline -10
```

### 2. Pendant le développement

```bash
# Créer une branche pour une nouvelle fonctionnalité
git checkout -b feature/nom-fonctionnalite

# Commits atomiques et fréquents
git add -p  # Ajout interactif pour des commits précis
git commit -m "feat: description précise"

# Vérifier régulièrement
git status
git diff --staged
```

### 3. Avant de pousser

```bash
# Nettoyer l'historique si nécessaire
git rebase -i HEAD~3  # Réorganiser les 3 derniers commits

# Vérifier la qualité
cd backend && npm run lint && cd ../frontend && npm run lint
cd backend && npm run type-check && cd ../frontend && npm run type-check
cd backend && npm run build && cd ../frontend && npm run build

# Synchroniser avec main
git checkout main
git pull origin main
git checkout feature/nom-fonctionnalite
git rebase main
```

### 4. Push et Pull Request

```bash
# Pousser la branche
git push -u origin feature/nom-fonctionnalite

# Créer une PR via GitHub CLI (optionnel)
gh pr create --title "feat: Titre de la fonctionnalité" \
             --body "Description détaillée" \
             --assignee "@me"
```

## 🚨 Gestion des conflits

### Stratégie de résolution

1. **Toujours pull avant push**
   ```bash
   git pull --rebase origin main
   ```

2. **En cas de conflit**
   ```bash
   # Voir les conflits
   git status
   
   # Résoudre manuellement puis
   git add <fichiers-résolus>
   git rebase --continue
   ```

3. **Si rebase complexe**
   ```bash
   git rebase --abort
   git merge origin/main  # Alternative plus simple
   ```

## 📊 Bonnes pratiques SSOT

### 1. Un seul flux de vérité

- **Main = Production** : La branche `main` reflète toujours l'état de production
- **Branches feature** : Tout développement dans des branches dédiées
- **Pas de commits directs** sur main (sauf hotfixes critiques)

### 2. Commits atomiques

```bash
# ❌ Mauvais : commit fourre-tout
git commit -m "Plein de changements"

# ✅ Bon : commits séparés et précis
git add frontend/src/components/layout/Navbar.tsx
git commit -m "fix: correction scroll horizontal navigation mobile"

git add backend/src/auth/auth.service.ts
git commit -m "feat: ajout validation MFA pour sécurité examen"
```

### 3. Historique propre

```bash
# Avant de merger une feature
git checkout feature/ma-feature
git rebase -i main

# Squash des commits de WIP
pick abc1234 feat: début implémentation certificats
squash def5678 WIP: suite
squash ghi9012 fix: correction typo
# Résultat : 1 seul commit propre
```

## 🔐 Sécurité et conformité

### 1. Vérifications pre-commit

```bash
# Hooks automatiques avant chaque commit :
- ESLint (backend + frontend)
- Prettier
- Type checking TypeScript
- Pas de console.log
- Pas de secrets (API keys, passwords)
- Pas de types "any"
```

### 2. Protection des branches

Sur GitHub OriginLabs :
- Main branch protégée
- Reviews obligatoires
- Tests CI/CD passants requis
- Impossible de force push

### 3. Secrets et credentials

```bash
# ❌ JAMAIS dans le code
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR..."

# ✅ Toujours en variables d'environnement
const supabaseKey = process.env.SUPABASE_ANON_KEY
```

## 📈 Métriques de qualité Pygmalion

### Indicateurs à suivre

1. **Fréquence des commits** : 5-10 commits/jour en développement actif
2. **Taille des PR** : Maximum 400 lignes modifiées
3. **Temps de review** : < 24h
4. **Couverture de tests** : > 80% (quand configuré)
5. **Zero console.log** : Utiliser logger.service.ts

### Commandes de vérification

```bash
# Vérifier les types non stricts
grep -r "any\|unknown" backend/src/ frontend/src/ | wc -l

# Vérifier les console.log
grep -r "console\." backend/src/ frontend/src/ | wc -l

# Statistiques Git
git shortlog -sn --all  # Contributeurs
git log --oneline --graph --all  # Visualisation branches
```

## 🚀 Commandes spécifiques Pygmalion

### Scripts utiles

```bash
# Backend
cd backend
npm run start:dev      # Développement
npm run build         # Build production
npm run lint          # Vérification code
npm run db:push       # Sync Prisma avec DB
npm run db:generate   # Générer client Prisma

# Frontend
cd frontend
npm run dev           # Développement
npm run build         # Build production
npm run lint          # Vérification code
npm run type-check    # Vérification types

# Global (depuis la racine)
./start.sh            # Lance backend + frontend
```

### Alias Git recommandés

```bash
# Ajouter dans ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit -m
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --oneline --graph --all
    amend = commit --amend --no-edit
    sync = pull --rebase origin main
```

## 🎯 Workflow pour les releases

### 1. Préparation

```bash
# Créer branche release
git checkout -b release/v1.0.0

# Mettre à jour versions
cd backend && npm version minor && cd ..
cd frontend && npm version minor && cd ..

# Générer changelog
git log --pretty=format:"- %s" v0.9.0..HEAD > CHANGELOG.md
```

### 2. Finalisation

```bash
# Merger dans main
git checkout main
git merge --no-ff release/v1.0.0

# Tag la version
git tag -a v1.0.0 -m "Release version 1.0.0 - Certification blockchain"

# Pousser avec tags
git push origin main --tags
```

## 📚 Structure du projet

```
Pygmalion/
├── backend/          # API NestJS
│   ├── src/         # Code source
│   ├── prisma/      # Schema DB
│   └── test/        # Tests
├── frontend/        # App React/Vite
│   ├── src/         # Code source
│   └── public/      # Assets statiques
├── doc/             # Documentation
├── shared/          # Types partagés
└── CLAUDE.md        # Guidelines IA
```

## 🆘 Troubleshooting

### Problème : "Permission denied (publickey)"

```bash
# Vérifier la clé SSH
ssh -T git@github.com

# Si erreur, ajouter la clé
ssh-add ~/.ssh/id_ed25519_pierre

# Vérifier la config
cat ~/.ssh/config
```

### Problème : "Diverged branches"

```bash
# Option 1 : Rebase (préféré)
git pull --rebase origin main

# Option 2 : Merge
git pull origin main
```

### Problème : "TypeScript errors"

```bash
# Régénérer Prisma client
cd backend && npm run db:generate

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : "Port already in use"

```bash
# Tuer les processus sur les ports
lsof -ti:8000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

## 🔄 Migration depuis autre compte Git

Si vous avez des commits avec un autre compte :

```bash
# Changer l'auteur des commits récents
git rebase -i HEAD~10
# Pour chaque commit, remplacer 'pick' par 'edit'
# Puis pour chaque commit :
git commit --amend --author="Pierre Beunardeau <pierre.beunardeau@originlabs.app>"
git rebase --continue
```

---

**Dernière mise à jour** : Août 2025  
**Maintenu par** : OriginLabs Team  
**Projet** : Pygmalion - Marketplace de formation aéronautique