# 🚀 Guide de Déploiement Pygmalion - Netlify + Render

## 🎯 Architecture de Production  
- **Frontend** : Netlify (React + Vite)
- **Backend** : Render (NestJS + Prisma)
- **Database** : Supabase PostgreSQL ✅
- **Auth & Storage** : Supabase ✅
- **All-in-One** : Supabase gère DB + Auth + Storage

---

## 📋 **ÉTAPE 1 : Déploiement Backend sur Render**

### 1.1 Créer le service Backend (Supabase gère la DB)
**NOTE** : Pas besoin de créer une base PostgreSQL Render - on utilise Supabase !
1. **Create** → **Web Service**
2. **Connect Repository** : `https://github.com/mbaviation-dev/pygmalion`
3. **Name** : `pygmalion-backend`
4. **Root Directory** : `backend`
5. **Runtime** : `Node`
6. **Build Command** : `chmod +x scripts/render-build.sh && ./scripts/render-build.sh`
7. **Start Command** : `npm run start:prod`
8. **Instance Type** : `Starter` (7$/mois)

### 1.3 Configuration des variables d'environnement Backend
Dans l'onglet **Environment** du service, ajoutez :

```bash
# Database (URL fournie par Render PostgreSQL)
DATABASE_URL=postgresql://pygmalion_user:password@hostname:5432/pygmalion

# JWT (générez une clé forte)
JWT_SECRET=votre_super_cle_secrete_jwt_256_bits
JWT_EXPIRES_IN=24h

# Supabase (vos clés existantes)
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre_cle_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role

# Upload
UPLOAD_DESTINATION=supabase
MAX_FILE_SIZE=10485760

# CORS (à configurer après Netlify)
CORS_ORIGIN=https://votre-site.netlify.app
FRONTEND_URL=https://votre-site.netlify.app

# Environment
NODE_ENV=production
PORT=10000
```

### 1.4 Déployer le Backend
1. Cliquez **Create Web Service**
2. Attendez le premier build (5-10 minutes)
3. Notez l'URL : `https://pygmalion-backend-xxx.onrender.com`

---

## 📋 **ÉTAPE 2 : Déploiement Frontend sur Netlify**

### 2.1 Connecter le Repository
1. Allez sur [netlify.com](https://netlify.com)
2. **Add new site** → **Import an existing project**
3. **Deploy with GitHub** → Choisir `pygmalion`
4. **Base directory** : `frontend`
5. **Build command** : `npm run build`
6. **Publish directory** : `dist`

### 2.2 Configuration des variables d'environnement Frontend
Dans **Site settings** → **Environment variables** :

```bash
# API (URL de votre backend Render)
VITE_API_URL=https://pygmalion-backend-xxx.onrender.com

# Supabase (mêmes clés que le backend)
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase

# Environment
VITE_NODE_ENV=production
```

### 2.3 Déployer le Frontend
1. Cliquez **Deploy site**
2. Attendez le build (2-5 minutes)
3. Notez l'URL : `https://charming-name-123456.netlify.app`

---

## 📋 **ÉTAPE 3 : Configuration CORS Backend**

### 3.1 Mettre à jour les variables Backend
Retournez sur Render → Service Backend → Environment :
```bash
CORS_ORIGIN=https://votre-site.netlify.app
FRONTEND_URL=https://votre-site.netlify.app
```

### 3.2 Redéployer le Backend
1. Cliquez **Manual Deploy** → **Deploy latest commit**
2. Attendez le redéploiement

---

## 📋 **ÉTAPE 4 : Configuration Supabase**

### 4.1 Mettre à jour les URLs autorisées
Dans Supabase Dashboard → Authentication → URL Configuration :
- **Site URL** : `https://votre-site.netlify.app`
- **Redirect URLs** : 
  - `https://votre-site.netlify.app/auth/callback`
  - `https://votre-site.netlify.app/email-confirmed`

---

## 📋 **ÉTAPE 5 : Tests de Production**

### 5.1 Vérifications Backend
```bash
# Test API Health
curl https://pygmalion-backend-xxx.onrender.com/

# Test Auth endpoint
curl https://pygmalion-backend-xxx.onrender.com/auth/health
```

### 5.2 Vérifications Frontend
1. Ouvrez `https://votre-site.netlify.app`
2. Testez la connexion API
3. Testez l'authentification Supabase
4. Vérifiez les fonctionnalités principales

---

## 🔧 **Commandes utiles**

### Logs Backend (Render)
- Dashboard → Service → Logs

### Logs Frontend (Netlify)
- Dashboard → Site → Functions (si applicable)

### Base de données
```bash
# Connection à la DB Render
psql $DATABASE_URL

# Reset migrations (si problème)
npx prisma migrate reset --force
```

---

## 🚨 **Checklist pré-production**

- [ ] Backend déployé et accessible
- [ ] Frontend déployé et accessible  
- [ ] Base de données connectée
- [ ] Migrations appliquées
- [ ] Variables d'environnement configurées
- [ ] CORS configuré
- [ ] Supabase URLs mises à jour
- [ ] Tests de connexion réussis
- [ ] Authentification fonctionnelle

---

## 💰 **Coûts Production**

### Gratuit (démo client) :
- ✅ Netlify : 100GB/mois
- ✅ Render : 750h/mois  
- ✅ Supabase : 2 projets

### Payant (production) :
- Netlify Pro : 19$/mois
- Render Starter : 7$/mois
- **Total** : ~26$/mois

---

## 🔗 **URLs finales**
- **Frontend** : https://votre-site.netlify.app
- **Backend** : https://pygmalion-backend-xxx.onrender.com
- **Admin** : https://votre-site.netlify.app/admin-dashboard 