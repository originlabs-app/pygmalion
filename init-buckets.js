// Script pour initialiser les buckets Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuration (remplacez par vos vraies valeurs)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://votre-projet.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'votre-service-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Configuration des buckets
const bucketsConfig = [
  {
    name: 'course-content',
    config: { public: false, fileSizeLimit: 100 * 1024 * 1024 }, // 100MB
    description: 'Contenu de cours: vidéos, PDFs, présentations, documents pédagogiques'
  },
  {
    name: 'training-org-documents',
    config: { public: false, fileSizeLimit: 50 * 1024 * 1024 }, // 50MB
    description: 'Documents des organismes de formation: certifications, agréments'
  },
  {
    name: 'user-profiles',
    config: { public: false, fileSizeLimit: 10 * 1024 * 1024 }, // 10MB
    description: 'Photos de profil et documents utilisateurs personnels'
  },
  {
    name: 'certificates',
    config: { public: false, fileSizeLimit: 5 * 1024 * 1024 }, // 5MB
    description: 'Certificats générés, diplômes et documents de certification'
  }
];

async function listExistingBuckets() {
  logger.info('📋 Liste des buckets existants...');
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      logger.error('❌ Erreur lors de la récupération des buckets:', error.message);
      return [];
    }

    if (buckets && buckets.length > 0) {
      logger.info(`✅ ${buckets.length} bucket(s) trouvé(s):`);
      buckets.forEach((bucket, index) => {
        logger.info(`  ${index + 1}. ${bucket.name} (créé: ${bucket.created_at})`);
      });
      return buckets.map(b => b.name);
    } else {
      logger.info('ℹ️  Aucun bucket existant');
      return [];
    }
  } catch (error) {
    logger.error('❌ Erreur:', error.message);
    return [];
  }
}

async function createBucketsIfNeeded() {
  logger.info('\n🏗️  Création des buckets nécessaires...');
  
  const existingBuckets = await listExistingBuckets();
  
  for (const bucket of bucketsConfig) {
    if (!existingBuckets.includes(bucket.name)) {
      logger.info(`\n📦 Création du bucket '${bucket.name}'...`);
      
      try {
        const { data, error } = await supabase.storage.createBucket(bucket.name, bucket.config);
        
        if (error) {
          logger.error(`❌ Erreur création '${bucket.name}': ${error.message}`);
        } else {
          logger.info(`✅ Bucket '${bucket.name}' créé avec succès`);
          logger.info(`   └─ ${bucket.description}`);
          logger.info(`   └─ Limite: ${Math.round(bucket.config.fileSizeLimit / (1024 * 1024))}MB`);
        }
      } catch (error) {
        logger.error(`❌ Erreur création '${bucket.name}': ${error.message}`);
      }
    } else {
      logger.info(`✅ Bucket '${bucket.name}' existe déjà`);
    }
  }
}

async function testBucketAccess() {
  logger.info('\n🧪 Test d\'accès aux buckets...');
  
  for (const bucket of bucketsConfig) {
    try {
      const { data, error } = await supabase.storage.from(bucket.name).list('', { limit: 1 });
      
      if (error) {
        logger.info(`❌ Erreur accès '${bucket.name}': ${error.message}`);
      } else {
        logger.info(`✅ Accès OK pour '${bucket.name}'`);
      }
    } catch (error) {
      logger.info(`❌ Erreur test '${bucket.name}': ${error.message}`);
    }
  }
}

async function showBucketStructure() {
  logger.info('\n📊 Structure recommandée des buckets:');
  logger.info('━'.repeat(60));
  
  bucketsConfig.forEach((bucket, index) => {
    const limitMB = Math.round(bucket.config.fileSizeLimit / (1024 * 1024));
    logger.info(`${index + 1}. 📦 ${bucket.name}`);
    logger.info(`   └─ ${bucket.description}`);
    logger.info(`   └─ Limite: ${limitMB}MB | Privé: ${!bucket.config.public}`);
    logger.info('');
  });

  logger.info('💡 Usage des buckets:');
  logger.info('  • course-content      → Upload de contenu pédagogique');
  logger.info('  • training-org-documents → Documents officiels des OF');
  logger.info('  • user-profiles       → Photos et documents personnels');
  logger.info('  • certificates        → Certificats et diplômes générés');
}

async function main() {
  logger.info('🚀 Initialisation des buckets Supabase Storage\n');
  
  // Vérifier la configuration
  if (SUPABASE_URL.includes('votre-projet') || SUPABASE_SERVICE_KEY.includes('votre-service')) {
    logger.info('⚠️  ATTENTION: Veuillez configurer vos variables d\'environnement Supabase');
    logger.info('');
    logger.info('Variables requises:');
    logger.info('  export SUPABASE_URL="https://votre-projet.supabase.co"');
    logger.info('  export SUPABASE_SERVICE_KEY="votre-service-role-key"');
    logger.info('');
    showBucketStructure();
    return;
  }

  try {
    await createBucketsIfNeeded();
    await testBucketAccess();
    
    logger.info('\n🎉 Initialisation terminée !');
    logger.info('\n📋 Prochaines étapes:');
    logger.info('  1. Vérifier que tous les buckets sont créés dans Supabase Dashboard');
    logger.info('  2. Configurer les politiques RLS si nécessaire');
    logger.info('  3. Tester l\'upload avec le backend NestJS');
    
  } catch (error) {
    logger.error('\n❌ Erreur globale:', error.message);
  }
}

// Instructions d'usage
if (require.main === module) {
  logger.info('📋 INSTRUCTIONS:');
  logger.info('');
  logger.info('1. Configurez vos variables d\'environnement:');
  logger.info('   export SUPABASE_URL="https://votre-projet.supabase.co"');
  logger.info('   export SUPABASE_SERVICE_KEY="votre-service-role-key"');
  logger.info('');
  logger.info('2. Installez la dépendance:');
  logger.info('   npm install @supabase/supabase-js');
  logger.info('');
  logger.info('3. Lancez le script:');
  logger.info('   node init-buckets.js');
  logger.info('');
  
  main();
}