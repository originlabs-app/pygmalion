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
  console.log('📋 Liste des buckets existants...');
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Erreur lors de la récupération des buckets:', error.message);
      return [];
    }

    if (buckets && buckets.length > 0) {
      console.log(`✅ ${buckets.length} bucket(s) trouvé(s):`);
      buckets.forEach((bucket, index) => {
        console.log(`  ${index + 1}. ${bucket.name} (créé: ${bucket.created_at})`);
      });
      return buckets.map(b => b.name);
    } else {
      console.log('ℹ️  Aucun bucket existant');
      return [];
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return [];
  }
}

async function createBucketsIfNeeded() {
  console.log('\n🏗️  Création des buckets nécessaires...');
  
  const existingBuckets = await listExistingBuckets();
  
  for (const bucket of bucketsConfig) {
    if (!existingBuckets.includes(bucket.name)) {
      console.log(`\n📦 Création du bucket '${bucket.name}'...`);
      
      try {
        const { data, error } = await supabase.storage.createBucket(bucket.name, bucket.config);
        
        if (error) {
          console.error(`❌ Erreur création '${bucket.name}': ${error.message}`);
        } else {
          console.log(`✅ Bucket '${bucket.name}' créé avec succès`);
          console.log(`   └─ ${bucket.description}`);
          console.log(`   └─ Limite: ${Math.round(bucket.config.fileSizeLimit / (1024 * 1024))}MB`);
        }
      } catch (error) {
        console.error(`❌ Erreur création '${bucket.name}': ${error.message}`);
      }
    } else {
      console.log(`✅ Bucket '${bucket.name}' existe déjà`);
    }
  }
}

async function testBucketAccess() {
  console.log('\n🧪 Test d\'accès aux buckets...');
  
  for (const bucket of bucketsConfig) {
    try {
      const { data, error } = await supabase.storage.from(bucket.name).list('', { limit: 1 });
      
      if (error) {
        console.log(`❌ Erreur accès '${bucket.name}': ${error.message}`);
      } else {
        console.log(`✅ Accès OK pour '${bucket.name}'`);
      }
    } catch (error) {
      console.log(`❌ Erreur test '${bucket.name}': ${error.message}`);
    }
  }
}

async function showBucketStructure() {
  console.log('\n📊 Structure recommandée des buckets:');
  console.log('━'.repeat(60));
  
  bucketsConfig.forEach((bucket, index) => {
    const limitMB = Math.round(bucket.config.fileSizeLimit / (1024 * 1024));
    console.log(`${index + 1}. 📦 ${bucket.name}`);
    console.log(`   └─ ${bucket.description}`);
    console.log(`   └─ Limite: ${limitMB}MB | Privé: ${!bucket.config.public}`);
    console.log('');
  });

  console.log('💡 Usage des buckets:');
  console.log('  • course-content      → Upload de contenu pédagogique');
  console.log('  • training-org-documents → Documents officiels des OF');
  console.log('  • user-profiles       → Photos et documents personnels');
  console.log('  • certificates        → Certificats et diplômes générés');
}

async function main() {
  console.log('🚀 Initialisation des buckets Supabase Storage\n');
  
  // Vérifier la configuration
  if (SUPABASE_URL.includes('votre-projet') || SUPABASE_SERVICE_KEY.includes('votre-service')) {
    console.log('⚠️  ATTENTION: Veuillez configurer vos variables d\'environnement Supabase');
    console.log('');
    console.log('Variables requises:');
    console.log('  export SUPABASE_URL="https://votre-projet.supabase.co"');
    console.log('  export SUPABASE_SERVICE_KEY="votre-service-role-key"');
    console.log('');
    showBucketStructure();
    return;
  }

  try {
    await createBucketsIfNeeded();
    await testBucketAccess();
    
    console.log('\n🎉 Initialisation terminée !');
    console.log('\n📋 Prochaines étapes:');
    console.log('  1. Vérifier que tous les buckets sont créés dans Supabase Dashboard');
    console.log('  2. Configurer les politiques RLS si nécessaire');
    console.log('  3. Tester l\'upload avec le backend NestJS');
    
  } catch (error) {
    console.error('\n❌ Erreur globale:', error.message);
  }
}

// Instructions d'usage
if (require.main === module) {
  console.log('📋 INSTRUCTIONS:');
  console.log('');
  console.log('1. Configurez vos variables d\'environnement:');
  console.log('   export SUPABASE_URL="https://votre-projet.supabase.co"');
  console.log('   export SUPABASE_SERVICE_KEY="votre-service-role-key"');
  console.log('');
  console.log('2. Installez la dépendance:');
  console.log('   npm install @supabase/supabase-js');
  console.log('');
  console.log('3. Lancez le script:');
  console.log('   node init-buckets.js');
  console.log('');
  
  main();
}