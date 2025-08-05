// Test réel avec votre Supabase
const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

// Vos vraies credentials
const SUPABASE_URL = "https://pahxxisutmxznaccytak.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHh4aXN1dG14em5hY2N5dGFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU1ODY1MCwiZXhwIjoyMDY1MTM0NjUwfQ.q5MtGAD5mXEY5NwB-RCqlr6XqO1X-sXab8PuEbEfTOs";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const prisma = new PrismaClient();

async function testSupabaseAccess() {
  logger.info('🔗 Test de connexion Supabase...');
  
  try {
    // Test des buckets existants
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      logger.error('❌ Erreur buckets:', error.message);
      return false;
    }

    logger.info('✅ Connexion Supabase OK');
    logger.info(`📦 Buckets existants: ${buckets.length}`);
    buckets.forEach((bucket, i) => {
      logger.info(`  ${i + 1}. ${bucket.name} (créé: ${new Date(bucket.created_at).toLocaleDateString()})`);
    });
    
    return true;
  } catch (error) {
    logger.error('❌ Erreur connexion:', error.message);
    return false;
  }
}

async function testPrismaAccess() {
  logger.info('\n🗄️ Test de connexion Prisma...');
  
  try {
    // Test simple: compter les utilisateurs
    const userCount = await prisma.userProfile.count();
    logger.info('✅ Connexion Prisma OK');
    logger.info(`👤 Utilisateurs en base: ${userCount}`);
    
    // Lister les tables via une requête raw
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    logger.info(`📋 Tables existantes: ${tables.length}`);
    tables.forEach((table, i) => {
      logger.info(`  ${i + 1}. ${table.table_name}`);
    });
    
    return true;
  } catch (error) {
    logger.error('❌ Erreur Prisma:', error.message);
    return false;
  }
}

async function createMissingBuckets() {
  logger.info('\n🏗️ Création des buckets manquants...');
  
  const { data: existingBuckets } = await supabase.storage.listBuckets();
  const existingNames = existingBuckets.map(b => b.name);
  
  const bucketsToCreate = [
    { name: 'course-content', limit: 100 * 1024 * 1024, desc: 'Contenu de cours' },
    { name: 'user-profiles', limit: 10 * 1024 * 1024, desc: 'Photos de profil' },
    { name: 'certificates', limit: 5 * 1024 * 1024, desc: 'Certificats générés' },
  ];
  
  for (const bucket of bucketsToCreate) {
    if (!existingNames.includes(bucket.name)) {
      logger.info(`📦 Création bucket '${bucket.name}'...`);
      
      const { data, error } = await supabase.storage.createBucket(bucket.name, {
        public: false,
        fileSizeLimit: bucket.limit
      });
      
      if (error) {
        logger.error(`❌ Erreur création '${bucket.name}': ${error.message}`);
      } else {
        logger.info(`✅ Bucket '${bucket.name}' créé - ${bucket.desc}`);
      }
    } else {
      logger.info(`✅ Bucket '${bucket.name}' existe déjà`);
    }
  }
}

async function testFileUpload() {
  logger.info('\n📤 Test d\'upload de fichier...');
  
  try {
    // Créer un petit fichier de test
    const testContent = 'Test upload Pygmalion - ' + new Date().toISOString();
    const fileName = `test-${Date.now()}.txt`;
    const filePath = `tests/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('training-org-documents')
      .upload(filePath, testContent, {
        contentType: 'text/plain'
      });
    
    if (error) {
      logger.error('❌ Erreur upload:', error.message);
    } else {
      logger.info(`✅ Upload réussi: ${data.path}`);
      
      // Générer une URL signée
      const { data: urlData, error: urlError } = await supabase.storage
        .from('training-org-documents')
        .createSignedUrl(filePath, 3600);
      
      if (!urlError) {
        logger.info(`🔗 URL signée générée (1h): ${urlData.signedUrl.substring(0, 50)}...`);
      }
      
      // Nettoyer le fichier de test
      await supabase.storage
        .from('training-org-documents')
        .remove([filePath]);
      
      logger.info('🗑️ Fichier de test supprimé');
    }
  } catch (error) {
    logger.error('❌ Erreur test upload:', error.message);
  }
}

async function showCurrentState() {
  logger.info('\n📊 État actuel de votre Supabase:');
  logger.info('━'.repeat(50));
  
  // Buckets
  const { data: buckets } = await supabase.storage.listBuckets();
  logger.info(`📦 Storage: ${buckets.length} bucket(s)`);
  
  // Tables et données
  const userCount = await prisma.userProfile.count();
  const courseCount = await prisma.course.count();
  const orgCount = await prisma.trainingOrganization.count();
  
  logger.info(`👤 Utilisateurs: ${userCount}`);
  logger.info(`📚 Cours: ${courseCount}`);
  logger.info(`🏢 Organismes: ${orgCount}`);
  
  logger.info('\n🎯 Prêt pour les tests d\'upload !');
}

async function main() {
  logger.info('🚀 Test réel avec votre Supabase Pygmalion\n');
  
  const supabaseOK = await testSupabaseAccess();
  const prismaOK = await testPrismaAccess();
  
  if (supabaseOK && prismaOK) {
    await createMissingBuckets();
    await testFileUpload();
    await showCurrentState();
  } else {
    logger.info('❌ Impossible de continuer sans connexion');
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);