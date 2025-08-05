# Guide d'Upload des Images de Formation

## 📸 Système d'Upload d'Images pour les Organismes de Formation

### Vue d'ensemble

Les organismes de formation (OF) peuvent uploader des images de couverture pour leurs formations directement depuis leur tableau de bord. Les images sont stockées dans Supabase Storage et automatiquement optimisées.

### Architecture actuelle

1. **Images temporaires (placeholders)** :
   - Stockées dans `/frontend/public/images/`
   - Servies directement par le serveur frontend
   - Utilisées pour les démos et comme fallback

2. **Images uploadées par les OF** :
   - Stockées dans Supabase Storage (bucket `course-images`)
   - URLs publiques générées automatiquement
   - Optimisation automatique (redimensionnement, compression)

### Flux d'upload

```mermaid
graph LR
    A[OF Upload Image] --> B[Frontend FormData]
    B --> C[API /upload/course-image]
    C --> D[Supabase Storage]
    D --> E[URL Publique]
    E --> F[Update Course image_url]
```

### Endpoints API disponibles

#### 1. Upload d'image de formation
```typescript
POST /api/upload/course-image
Content-Type: multipart/form-data

Body:
- file: Image file (jpeg, jpg, png, webp)
- courseId: ID de la formation

Response:
{
  "url": "https://xxx.supabase.co/storage/v1/object/public/course-images/..."
}
```

#### 2. Service d'upload (backend)
```typescript
// backend/src/common/services/upload.service.ts
class UploadService {
  async uploadCourseImage(file: Express.Multer.File, courseId: string): Promise<string> {
    // 1. Validation du fichier
    // 2. Génération du nom unique
    // 3. Upload vers Supabase
    // 4. Retour de l'URL publique
  }
}
```

### Configuration Supabase Storage

1. **Bucket `course-images`** :
   - Public access activé
   - Taille max : 5MB
   - Types acceptés : image/jpeg, image/png, image/webp
   - Politique RLS : Les OF peuvent uploader/modifier leurs propres images

2. **Structure des fichiers** :
   ```
   course-images/
   ├── {organizationId}/
   │   ├── {courseId}-{timestamp}.jpg
   │   └── {courseId}-thumb-{timestamp}.jpg
   ```

### Interface utilisateur (OF Dashboard)

```typescript
// Component d'upload dans le formulaire de création/édition
<CourseImageUpload
  currentImageUrl={course.image_url}
  onImageUploaded={(url) => updateCourse({ image_url: url })}
  courseId={course.id}
/>
```

### Optimisations automatiques

1. **Redimensionnement** :
   - Image principale : 1200x630px (ratio social media)
   - Thumbnail : 400x210px

2. **Compression** :
   - JPEG quality : 85%
   - WebP si supporté par le navigateur

3. **CDN & Cache** :
   - Headers de cache : 1 an
   - Serveur edge Supabase

### Fallback & Placeholders

Si aucune image n'est uploadée :
1. Utilisation des placeholders par catégorie
2. Image par défaut : `/images/aviation-learners-training.jpg`

### Sécurité

1. **Validation côté serveur** :
   - Type MIME vérifié
   - Taille maximale enforced
   - Scan antivirus (si configuré)

2. **Permissions** :
   - Seul l'OF propriétaire peut modifier l'image
   - Les admins peuvent modifier toutes les images

### TODO - Implémentation complète

- [ ] Créer le composant `CourseImageUpload`
- [ ] Implémenter l'endpoint `/api/upload/course-image`
- [ ] Configurer le bucket Supabase
- [ ] Ajouter la compression d'images
- [ ] Implémenter le système de thumbnails
- [ ] Ajouter la prévisualisation avant upload
- [ ] Gérer la suppression des anciennes images

### Exemples de code

#### Frontend - Composant d'upload
```tsx
const CourseImageUpload: React.FC<Props> = ({ currentImageUrl, onImageUploaded, courseId }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('courseId', courseId);
      
      const response = await uploadService.uploadCourseImage(formData);
      onImageUploaded(response.url);
    } catch (error) {
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      {currentImageUrl && (
        <img src={currentImageUrl} alt="Course" className="w-full rounded-lg" />
      )}
      <UploadButton onUpload={handleUpload} loading={uploading} />
    </div>
  );
};
```

#### Backend - Controller
```typescript
@Controller('upload')
export class UploadController {
  @Post('course-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCourseImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('courseId') courseId: string,
    @CurrentUser() user: User
  ) {
    // Vérifier que l'utilisateur est bien l'OF propriétaire
    const course = await this.coursesService.findOne(courseId);
    if (course.provider_id !== user.organization_id) {
      throw new ForbiddenException();
    }
    
    const url = await this.uploadService.uploadCourseImage(file, courseId);
    
    // Mettre à jour la formation
    await this.coursesService.update(courseId, { image_url: url });
    
    return { url };
  }
}
```