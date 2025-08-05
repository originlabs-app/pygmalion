# 🚀 Guide Rapide - Configuration Bucket Supabase

## 1️⃣ Créer le bucket dans Supabase Dashboard

1. Allez dans **Storage** → **New bucket**
2. Remplissez :
   - **Bucket name** : `course-images`
   - **Public bucket** : ✅ Cocher
   - **File size limit** : `5` (MB)
   - **Allowed MIME types** : `image/jpeg,image/png,image/webp,image/jpg`
3. Cliquez sur **Create bucket**

## 2️⃣ Ajouter les politiques RLS

Dans **Storage** → **Policies** → **New Policy** pour le bucket `course-images` :

### Policy 1 : Lecture publique
- **Name** : `Public read access`
- **Policy command** : `SELECT`
- **Target roles** : `anon, authenticated`
- **Policy definition** :
```sql
true
```

### Policy 2 : Upload pour utilisateurs authentifiés
- **Name** : `Authenticated users can upload`
- **Policy command** : `INSERT`
- **Target roles** : `authenticated`
- **Policy definition** :
```sql
true
```

### Policy 3 : Update pour utilisateurs authentifiés
- **Name** : `Authenticated users can update`
- **Policy command** : `UPDATE`
- **Target roles** : `authenticated`
- **Policy definition** :
```sql
true
```

### Policy 4 : Delete pour utilisateurs authentifiés
- **Name** : `Authenticated users can delete`
- **Policy command** : `DELETE`
- **Target roles** : `authenticated`
- **Policy definition** :
```sql
true
```

## 3️⃣ C'est tout ! 🎉

Le bucket est prêt. Les politiques simples permettent :
- ✅ Tout le monde peut voir les images (public)
- ✅ Les utilisateurs connectés peuvent uploader/modifier/supprimer

## 📝 Notes

- La structure `{organization_id}/courses/{filename}` est gérée automatiquement par le code backend
- Les vérifications de permissions (qui peut modifier quelle formation) sont faites dans l'API NestJS
- Les images sont accessibles via : `https://[votre-projet].supabase.co/storage/v1/object/public/course-images/[chemin]`

## 🧪 Test rapide

1. Uploadez une image test dans le bucket via Supabase Dashboard
2. Copiez l'URL publique
3. Ouvrez l'URL dans un navigateur → L'image doit s'afficher

## 🔧 Endpoint API disponible

```
POST /api/uploads/course-image/{courseId}
Content-Type: multipart/form-data
Authorization: Bearer [JWT_TOKEN]

Body:
- file: [Image file]
```