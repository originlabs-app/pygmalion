# Variables d'environnement pour Netlify (PRODUCTION)

## Variables EXACTES à configurer sur Netlify :

### API Configuration
```bash
VITE_API_URL=https://pygmalion-backend-xxx.onrender.com
```
*(Remplacer par l'URL réelle de votre backend Render)*

### Supabase Configuration (VRAIES VALEURS)
```bash
VITE_SUPABASE_URL=https://pahxxisutmxznaccytak.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHh4aXN1dG14em5hY2N5dGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTg2NTAsImV4cCI6MjA2NTEzNDY1MH0.b5yPjjgAQfysNp5hZLsm_n4seLem-l7rUm4-dzf6T78
```

### Environment
```bash
VITE_NODE_ENV=production
```

## Instructions de configuration :
1. Aller sur Netlify Dashboard
2. Sélectionner votre site
3. Site settings > Environment variables
4. Copier-coller chaque variable exactement

## Notes importantes :
- ✅ Utilise la même instance Supabase que le backend
- ✅ Authentification frontend/backend synchronisée  
- ✅ Pas besoin de configuration supplémentaire Supabase 