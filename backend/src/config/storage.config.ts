import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageConfig {
  private supabaseClient: SupabaseClient;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');
    this.bucketName = this.configService.get<string>('SUPABASE_BUCKET') || 'training-org-documents';

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

  getBucketName(): string {
    return this.bucketName;
  }

  /**
   * Initialise le bucket s'il n'existe pas
   */
  async initializeBucket(): Promise<void> {
    const { data: buckets, error: listError } = await this.supabaseClient.storage.listBuckets();
    
    if (listError) {
      throw new Error(`Erreur lors de la vérification des buckets: ${listError.message}`);
    }

    const bucketExists = buckets?.some(bucket => bucket.name === this.bucketName);
    
    if (!bucketExists) {
      const { error: createError } = await this.supabaseClient.storage.createBucket(this.bucketName, {
        public: false, // Bucket privé pour la sécurité
      });

      if (createError) {
        throw new Error(`Erreur lors de la création du bucket: ${createError.message}`);
      }

      console.log(`✅ Bucket '${this.bucketName}' créé avec succès`);
    } else {
      console.log(`✅ Bucket '${this.bucketName}' existe déjà`);
    }
  }
} 