import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageConfig {
  private supabaseClient: SupabaseClient;
  private buckets: {
    courseContent: string;
    trainingOrgDocuments: string;
    userProfiles: string;
    certificates: string;
  };

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');
    
    // Configuration des buckets par type de contenu
    this.buckets = {
      courseContent: this.configService.get<string>('SUPABASE_BUCKET_COURSE_CONTENT') || 'course-content',
      trainingOrgDocuments: this.configService.get<string>('SUPABASE_BUCKET_TRAINING_ORG') || 'training-org-documents',
      userProfiles: this.configService.get<string>('SUPABASE_BUCKET_USER_PROFILES') || 'user-profiles',
      certificates: this.configService.get<string>('SUPABASE_BUCKET_CERTIFICATES') || 'certificates',
    };

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be defined');
    }

    this.supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  getClient(): SupabaseClient {
    return this.supabaseClient;
  }

  getBucketName(type: 'courseContent' | 'trainingOrgDocuments' | 'userProfiles' | 'certificates' = 'courseContent'): string {
    return this.buckets[type];
  }

  getAllBuckets() {
    return this.buckets;
  }

  /**
   * Initialise tous les buckets nécessaires
   */
  async initializeBuckets(): Promise<void> {
    const { data: existingBuckets, error: listError } = await this.supabaseClient.storage.listBuckets();
    
    if (listError) {
      throw new Error(`Erreur lors de la vérification des buckets: ${listError.message}`);
    }

    const existingBucketNames = existingBuckets?.map(bucket => bucket.name) || [];

    // Configuration des buckets avec leurs permissions
    const bucketsToCreate = [
      {
        name: this.buckets.courseContent,
        config: { public: false, fileSizeLimit: 100 * 1024 * 1024 }, // 100MB
        description: 'Contenu de cours: vidéos, PDFs, présentations'
      },
      {
        name: this.buckets.trainingOrgDocuments,
        config: { public: false, fileSizeLimit: 50 * 1024 * 1024 }, // 50MB
        description: 'Documents des organismes de formation'
      },
      {
        name: this.buckets.userProfiles,
        config: { public: false, fileSizeLimit: 10 * 1024 * 1024 }, // 10MB
        description: 'Photos de profil et documents utilisateurs'
      },
      {
        name: this.buckets.certificates,
        config: { public: false, fileSizeLimit: 5 * 1024 * 1024 }, // 5MB
        description: 'Certificats générés et documents de certification'
      }
    ];

    for (const bucket of bucketsToCreate) {
      if (!existingBucketNames.includes(bucket.name)) {
        const { error: createError } = await this.supabaseClient.storage.createBucket(
          bucket.name, 
          bucket.config
        );

        if (createError) {
          console.error(`❌ Erreur création bucket '${bucket.name}': ${createError.message}`);
        } else {
          console.log(`✅ Bucket '${bucket.name}' créé avec succès`);
          console.log(`   └─ ${bucket.description}`);
        }
      } else {
        console.log(`✅ Bucket '${bucket.name}' existe déjà`);
      }
    }

    console.log(`🗄️ Storage Supabase initialisé avec ${bucketsToCreate.length} buckets`);
  }

  /**
   * Méthode de compatibilité (à supprimer plus tard)
   */
  async initializeBucket(): Promise<void> {
    return this.initializeBuckets();
  }
} 