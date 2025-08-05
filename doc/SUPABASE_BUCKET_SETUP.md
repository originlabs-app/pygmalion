# Configuration du Bucket Supabase pour les Images de Formation

## 📦 Création du Bucket via Supabase Dashboard

### 1. Accéder à Storage
- Connectez-vous à [Supabase Dashboard](https://app.supabase.com)
- Sélectionnez votre projet Pygmalion
- Dans le menu latéral, cliquez sur **Storage**

### 2. Créer le bucket "course-images"
```sql
-- Ou via SQL Editor
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-images',
  'course-images', 
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
);
```

### 3. Configuration des Politiques RLS

#### Politique 1 : Lecture publique
```sql
-- Permettre la lecture publique de toutes les images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'course-images');
```

#### Politique 2 : Upload par les Organismes de Formation
```sql
-- Les OF peuvent uploader dans leur dossier
CREATE POLICY "OF can upload own images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.jwt() ->> 'organization_id'
);
```

#### Politique 3 : Mise à jour par les OF
```sql
-- Les OF peuvent mettre à jour leurs images
CREATE POLICY "OF can update own images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.jwt() ->> 'organization_id'
);
```

#### Politique 4 : Suppression par les OF
```sql
-- Les OF peuvent supprimer leurs images
CREATE POLICY "OF can delete own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.jwt() ->> 'organization_id'
);
```

#### Politique 5 : Admin full access
```sql
-- Les admins ont accès total
CREATE POLICY "Admins have full access" ON storage.objects
USING (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  auth.jwt() ->> 'role' = 'admin'
);
```

### 4. Script de création complet
```sql
-- Créer le bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-images',
  'course-images', 
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
) ON CONFLICT (id) DO NOTHING;

-- Politique de lecture publique
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'course-images');

-- Politique d'upload pour les OF
CREATE POLICY "OF can upload own images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = (
    SELECT organization_id::text 
    FROM profiles 
    WHERE user_id = auth.uid()
  )
);

-- Politique de mise à jour pour les OF
CREATE POLICY "OF can update own images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = (
    SELECT organization_id::text 
    FROM profiles 
    WHERE user_id = auth.uid()
  )
);

-- Politique de suppression pour les OF
CREATE POLICY "OF can delete own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = (
    SELECT organization_id::text 
    FROM profiles 
    WHERE user_id = auth.uid()
  )
);

-- Politique admin
CREATE POLICY "Admins have full access" ON storage.objects
USING (
  bucket_id = 'course-images' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);
```

### 5. Structure des dossiers attendue
```
course-images/
├── {organization_id}/
│   ├── courses/
│   │   ├── {course_id}_cover.jpg
│   │   ├── {course_id}_thumb.jpg
│   │   └── {course_id}_banner.jpg
│   └── temp/
│       └── {timestamp}_upload.jpg
```

### 6. Configuration des CORS (si nécessaire)
```json
{
  "origins": ["http://localhost:3000", "http://localhost:8080", "https://votredomaine.com"],
  "methods": ["GET", "POST", "PUT", "DELETE"],
  "headers": ["Content-Type", "Authorization"],
  "maxAge": 3600
}
```

### 7. Test rapide via cURL
```bash
# Tester l'upload (remplacer YOUR_ANON_KEY et YOUR_JWT_TOKEN)
curl -X POST https://your-project.supabase.co/storage/v1/object/course-images/test/test.jpg \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: image/jpeg" \
  --data-binary @test-image.jpg
```

### 8. URLs publiques générées
Les images seront accessibles via :
```
https://your-project.supabase.co/storage/v1/object/public/course-images/{organization_id}/courses/{filename}
```

### 9. Nettoyage automatique (optionnel)
```sql
-- Fonction pour nettoyer les vieilles images temporaires
CREATE OR REPLACE FUNCTION clean_temp_images()
RETURNS void AS $$
BEGIN
  DELETE FROM storage.objects
  WHERE bucket_id = 'course-images'
  AND name LIKE '%/temp/%'
  AND created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Planifier le nettoyage quotidien
SELECT cron.schedule('clean-temp-images', '0 2 * * *', 'SELECT clean_temp_images();');
```

## 🚀 Commandes rapides

### Via l'interface Supabase :
1. Storage → New bucket
2. Name: `course-images`
3. Public bucket: ✅
4. File size limit: 5MB
5. Allowed MIME types: `image/jpeg, image/png, image/webp`

### Via l'API Supabase Management :
```bash
curl -X POST https://api.supabase.com/v1/projects/{project_ref}/storage/buckets \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "course-images",
    "name": "course-images",
    "public": true,
    "file_size_limit": 5242880,
    "allowed_mime_types": ["image/jpeg", "image/png", "image/webp"]
  }'
```

## ✅ Vérification
1. Aller dans Storage → course-images
2. Tester l'upload d'une image
3. Vérifier l'URL publique fonctionne
4. Tester les permissions avec un compte OF