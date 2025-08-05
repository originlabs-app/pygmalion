# 🔑 **IDENTIFIANTS DÉMO PYGMALION**

## 🎭 **COMPTES DE TEST DISPONIBLES**

### **👨‍🏫 ORGANISME DE FORMATION** ✅
```bash
Email:    philippe.moreau@aviationtraining.fr
Password: TestPassword123!
Rôle:     training_org
Nom:      Philippe Moreau
Org:      Aviation Training Solutions SARL
Status:   ✅ Créé et testé (Supabase Auth + Prisma DB)
```

### **👨‍🎓 APPRENANT** ✅
```bash
Email:    laurent.dubois@airfrance.fr
Password: TestPassword123!
Rôle:     student
Nom:      Laurent Dubois
Entreprise: Air France
Status:   ✅ Synchronisé (Supabase Auth + Prisma DB)
```

### **👨‍💼 MANAGER** ✅
```bash
Email:    manager.demo@aviationtraining.fr
Password: TestPassword123!
Rôle:     manager
Nom:      Manager Demo
Org:      Aviation Training Solutions
Status:   ✅ Synchronisé (Supabase Auth + Prisma DB)
```

### **👨‍💻 ADMIN** ✅
```bash
Email:    admin@pygmalion.fr
Password: TestPassword123!
Rôle:     admin
Nom:      Admin Pygmalion
Organisation: Pygmalion Platform
Status:   ✅ Synchronisé (Supabase Auth + Prisma DB)
```

### **🧪 COMPTE TEST DEMO**
```bash
Email:    demo.test@gmail.com
Password: password123
Rôle:     student
Nom:      Demo User
Status:   ❌ Non synchronisé (ancien compte)
```

---

## 🧪 **TESTS CURL AUTHENTIFICATION**

### **🔐 Login Organisme Formation (Testé)**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "philippe.moreau@aviationtraining.fr",
    "password": "TestPassword123!"
  }'
```

### **🔐 Login via Fichier JSON**
```bash
# Créer fichier login.json
echo '{
  "email": "philippe.moreau@aviationtraining.fr",
  "password": "TestPassword123!"
}' > login.json

# Login avec le fichier
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d @login.json | jq '.'
```

### **👤 Profil Utilisateur (avec token)**
```bash
# 1. Login d'abord pour récupérer le token
TOKEN=$(curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d @login.json | jq -r '.tokens.access_token')

# 2. Utiliser le token pour accéder au profil
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/auth/me
```

### **📝 Inscription Nouvel Utilisateur**
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nouveau.user@example.com",
    "password": "TestPassword123!",
    "firstName": "Nouveau",
    "lastName": "User",
    "role": "student"
  }'
```

---

## 🎯 **FORMATIONS DISPONIBLES**

1. **Sécurité Aéroportuaire - DGAC** (10h, certification DGAC)
2. **Maintenance Aéronautique - Module B1** (40h, Part-66)
3. **Formation Personnel Navigant Commercial** (105h, EASA)
4. **Opérations au Sol - Handling** (24h, piste)

---

## 📋 **POUR LA DÉMONSTRATION**

### **Parcours Recommandé :**
1. **Connexion OF** : philippe.moreau@aviationtraining.fr
2. **Dashboard OF** : Gérer formations et étudiants
3. **Connexion Étudiant** : laurent.dubois@airfrance.fr
4. **LMS** : Suivre formation "Sécurité Aéroportuaire"
5. **Admin** : Supervision générale

### **URLs Directes :**
- **Backend API** : http://localhost:8000 ✅ (PAS 3000!)
- **Frontend App** : http://localhost:8080 ✅
- **Health Check** : http://localhost:8000/health ✅
- **Courses API** : http://localhost:8000/courses ✅ (8 formations)

### **Configuration Supabase :**
- **Project ID** : kpcyitpehrqqmyjlhiju ✅
- **Status** : Connected ✅
- **Storage** : Opérationnel pour fichiers

---

## ⚠️ **NOTES IMPORTANTES**

1. **PORT BACKEND** : Le backend tourne sur le port **8000** (et NON 3000 comme certains docs obsolètes)
2. **AUTHENTIFICATION** : Les comptes doivent exister à la fois dans Supabase Auth ET Prisma DB
3. **MOT DE PASSE** : Tous les comptes test utilisent `TestPassword123!`
4. **SYNCHRONISATION** : Tous les 4 comptes principaux sont maintenant synchronisés ✅

---

*Dernière mise à jour : 2025-01-24 17:00*