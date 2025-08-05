const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

// Configuration
const API_BASE_URL = 'http://localhost:3000';
const TEST_FILE_PATH = './test-file.pdf'; // Vous devrez créer ce fichier

// Créer un fichier de test PDF simple
const createTestFile = () => {
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 55
>>
stream
BT
/F1 24 Tf
100 700 Td
(Test Upload PDF) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
408
%%EOF`;

  fs.writeFileSync(TEST_FILE_PATH, pdfContent);
  logger.info('✅ Fichier de test créé:', TEST_FILE_PATH);
};

// Test d'upload
const testUpload = async () => {
  try {
    logger.info('🧪 Test d\'upload de fichier...');
    
    // Créer le fichier de test s'il n'existe pas
    if (!fs.existsSync(TEST_FILE_PATH)) {
      createTestFile();
    }

    // Créer FormData
    const formData = new FormData();
    formData.append('file', fs.createReadStream(TEST_FILE_PATH));
    formData.append('contentType', 'pdf');
    formData.append('title', 'Test Upload Document');
    formData.append('description', 'Document de test pour validation de l\'upload');

    // Headers avec token JWT (vous devrez remplacer par un vrai token)
    const headers = {
      ...formData.getHeaders(),
      'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE', // Remplacez par un vrai token
    };

    logger.info('📤 Envoi de la requête d\'upload...');
    
    const response = await axios.post(
      `${API_BASE_URL}/uploads/course-content`,
      formData,
      { headers }
    );

    logger.info('✅ Upload réussi !');
    logger.info('Réponse:', JSON.stringify(response.data, null, 2));

    // Test de récupération d'URL signée
    if (response.data.success && response.data.data.storagePath) {
      logger.info('🔗 Test de génération d\'URL signée...');
      
      const encodedPath = encodeURIComponent(response.data.data.storagePath);
      const urlResponse = await axios.get(
        `${API_BASE_URL}/uploads/signed-url/${encodedPath}`,
        { headers: { 'Authorization': headers.Authorization } }
      );
      
      logger.info('✅ URL signée générée:', urlResponse.data.data.signedUrl);
    }

  } catch (error) {
    logger.error('❌ Erreur lors du test:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      logger.info('💡 Note: Vous devez remplacer YOUR_JWT_TOKEN_HERE par un vrai token JWT');
    }
  }
};

// Test d'ajout de vidéo externe
const testExternalVideo = async () => {
  try {
    logger.info('🎥 Test d\'ajout de vidéo externe...');
    
    const videoData = {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Vidéo de démonstration',
      description: 'Test d\'ajout de vidéo YouTube',
      moduleId: 'module-test-1'
    };

    const response = await axios.post(
      `${API_BASE_URL}/uploads/external-video`,
      videoData,
      {
        headers: {
          'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE', // Remplacez par un vrai token
          'Content-Type': 'application/json'
        }
      }
    );

    logger.info('✅ Vidéo externe ajoutée !');
    logger.info('Réponse:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    logger.error('❌ Erreur lors du test vidéo:', error.response?.data || error.message);
  }
};

// Exécuter les tests
const runTests = async () => {
  logger.info('🚀 Démarrage des tests d\'upload...\n');
  
  // Test 1: Upload de fichier
  await testUpload();
  
  logger.info('\n' + '='.repeat(50) + '\n');
  
  // Test 2: Vidéo externe
  await testExternalVideo();
  
  logger.info('\n✨ Tests terminés !');
  
  // Nettoyage
  if (fs.existsSync(TEST_FILE_PATH)) {
    fs.unlinkSync(TEST_FILE_PATH);
    logger.info('🗑️ Fichier de test supprimé');
  }
};

// Instructions pour l'utilisateur
logger.info(`
📋 INSTRUCTIONS DE TEST:

1. Assurez-vous que le backend est démarré sur ${API_BASE_URL}
2. Remplacez 'YOUR_JWT_TOKEN_HERE' par un vrai token JWT
3. Configurez vos variables d'environnement Supabase
4. Lancez: node test-upload.js

🔧 Variables d'environnement requises:
- SUPABASE_URL
- SUPABASE_SERVICE_KEY (ou SUPABASE_SERVICE_ROLE_KEY)
- SUPABASE_BUCKET (optionnel, défaut: training-org-documents)
`);

// Lancer les tests si exécuté directement
if (require.main === module) {
  runTests();
}

module.exports = { testUpload, testExternalVideo };