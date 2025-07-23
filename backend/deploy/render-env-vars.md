# Variables d'environnement pour Render (PRODUCTION)

## Variables EXACTES à configurer sur Render :

### Database (Supabase PostgreSQL)
```bash
DATABASE_URL=postgresql://postgres.pahxxisutmxznaccytak:rbcfF3TAIbj6gNHz@aws-0-eu-west-3.pooler.supabase.com:5432/postgres
```

### JWT Configuration
```bash
JWT_SECRET=1JjA6IhS13XiCr/sWQ2I/OK+RK9KJg6rEtG78BcjrsE24ziZ8Rm5Nh/kujsE9N8MYtXIPQ6eFi2vpJdGLU4Vzg==
JWT_EXPIRES_IN=1h
```

### Supabase Configuration
```bash
SUPABASE_URL=https://pahxxisutmxznaccytak.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHh4aXN1dG14em5hY2N5dGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTg2NTAsImV4cCI6MjA2NTEzNDY1MH0.b5yPjjgAQfysNp5hZLsm_n4seLem-l7rUm4-dzf6T78
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHh4aXN1dG14em5hY2N5dGFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU1ODY1MCwiZXhwIjoyMDY1MTM0NjUwfQ.q5MtGAD5mXEY5NwB-RCqlr6XqO1X-sXab8PuEbEfTOs
```

### Upload Configuration (Supabase Storage)
```bash
UPLOAD_DESTINATION=supabase
SUPABASE_BUCKET=training-org-documents
MAX_FILE_SIZE=10485760
```

### CORS Configuration (À mettre à jour après Netlify)
```bash
FRONTEND_URL=https://votre-site.netlify.app
CORS_ORIGIN=https://votre-site.netlify.app
```

### Security & Features
```bash
MFA_ENABLED=true
```

### Environment
```bash
NODE_ENV=production
PORT=3000
```

## Instructions de configuration :
1. Créer le service Web sur Render (PAS de PostgreSQL séparé)
2. Ajouter ces variables dans l'onglet "Environment" 
3. Supabase gère tout : DB + Auth + Storage

## Notes importantes :
- ✅ Pas besoin de créer une DB Render (Supabase géré)
- ✅ Migrations Prisma fonctionneront avec Supabase
- ✅ Authentification complètement gérée par Supabase
- ✅ Upload de fichiers via Supabase Storage 