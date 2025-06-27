# Variables d'environnement pour Render

## Variables obligatoires à configurer sur Render :

### Database
- `DATABASE_URL` : URL PostgreSQL fournie par Render
- Format : `postgresql://username:password@hostname:5432/database_name`

### JWT Configuration
- `JWT_SECRET` : Clé secrète pour JWT (générer une clé forte)
- `JWT_EXPIRES_IN` : `24h`

### Supabase Configuration
- `SUPABASE_URL` : URL de votre projet Supabase
- `SUPABASE_ANON_KEY` : Clé anonyme Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : Clé service role Supabase

### Upload Configuration
- `UPLOAD_DESTINATION` : `supabase`
- `MAX_FILE_SIZE` : `10485760`

### CORS Configuration
- `CORS_ORIGIN` : URL de votre frontend Netlify
- `FRONTEND_URL` : URL de votre frontend Netlify

### Port Configuration
- `PORT` : `3000` (Render définira automatiquement)

### Node Environment
- `NODE_ENV` : `production`

## Instructions de configuration :
1. Créer le service sur Render
2. Ajouter ces variables dans l'onglet "Environment"
3. Connecter à une base PostgreSQL Render 