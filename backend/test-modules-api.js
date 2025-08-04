// Script de test pour vérifier les modules de cours avec anti-fraude
const { PrismaClient, ModuleType } = require('@prisma/client');

const prisma = new PrismaClient();

async function testModulesIntegration() {
  console.log('🧪 Test de l\'intégration modules et anti-fraude');
  
  try {
    // 1. Trouver le cours principal
    const course = await prisma.course.findFirst({
      where: { title: { contains: 'Sécurité Aéroportuaire - DGAC' } },
      include: {
        modules: {
          orderBy: { order_index: 'asc' },
          include: {
            quizzes: {
              include: {
                questions: {
                  include: { answers: true },
                  orderBy: { order_index: 'asc' }
                }
              }
            },
            exams: {
              include: {
                questions: {
                  include: { answers: true },
                  orderBy: { order_index: 'asc' }
                },
                exam_config: true
              }
            }
          }
        }
      }
    });

    if (!course) {
      console.log('❌ Cours de démonstration non trouvé');
      return;
    }

    console.log(`✅ Cours trouvé: ${course.title}`);
    console.log(`📚 Nombre de modules: ${course.modules.length}`);

    // 2. Analyser chaque module
    course.modules.forEach((module, index) => {
      console.log(`\n📖 Module ${index + 1}: ${module.title}`);
      console.log(`   Type: ${module.module_type}`);
      console.log(`   Durée: ${module.duration_minutes} minutes`);
      console.log(`   Obligatoire: ${module.is_mandatory}`);

      if (module.module_type === 'quiz' && module.quizzes?.length > 0) {
        const quiz = module.quizzes[0];
        console.log(`   🧩 Quiz trouvé:`);
        console.log(`      - Tentatives autorisées: ${quiz.attempts_allowed}`);
        console.log(`      - Score de passage: ${quiz.passing_score}%`);
        console.log(`      - Questions: ${quiz.questions?.length || 0}`);
        console.log(`      - Résultats visibles: ${quiz.show_results}`);
      }

      if (module.module_type === 'exam' && module.exams?.length > 0) {
        const exam = module.exams[0];
        console.log(`   🛡️ Examen final trouvé:`);
        console.log(`      - Temps limite: ${exam.time_limit} minutes`);
        console.log(`      - Score de passage: ${exam.passing_score}%`);
        console.log(`      - Questions: ${exam.questions?.length || 0}`);
        console.log(`      - Génère certificat: ${exam.generates_certificate}`);
        
        if (exam.exam_config) {
          console.log(`      🔒 Configuration anti-fraude:`);
          console.log(`         - Proctoring: ${exam.exam_config.default_proctoring}`);
          console.log(`         - Webcam: ${exam.exam_config.default_webcam}`);
          console.log(`         - Verrouillage: ${exam.exam_config.default_lockdown}`);
          console.log(`         - Seuil d'alerte: ${exam.exam_config.alert_threshold}`);
          console.log(`         - Suspension auto: ${exam.exam_config.auto_suspend}`);
        }
      }
    });

    // 3. Tester la récupération d'un module spécifique (quiz formatif)
    const quizModule = course.modules.find(m => m.module_type === 'quiz');
    if (quizModule && quizModule.quizzes?.length > 0) {
      console.log(`\n🧪 Test récupération quiz module: ${quizModule.id}`);
      
      const quizData = await prisma.quiz.findUnique({
        where: { id: quizModule.quizzes[0].id },
        include: {
          questions: {
            include: { answers: true },
            orderBy: { order_index: 'asc' }
          }
        }
      });

      if (quizData) {
        console.log(`✅ Quiz récupéré: ${quizData.title}`);
        console.log(`   Questions: ${quizData.questions.length}`);
        
        quizData.questions.forEach((q, i) => {
          console.log(`   Q${i + 1}: ${q.question_text}`);
          console.log(`        Réponses: ${q.answers.length}`);
          console.log(`        Bonne réponse: ${q.answers.find(a => a.is_correct)?.answer_text}`);
        });
      }
    }

    // 4. Tester la récupération d'un examen avec configuration
    const examModule = course.modules.find(m => m.module_type === 'exam');
    if (examModule && examModule.exams?.length > 0) {
      console.log(`\n🛡️ Test récupération examen module: ${examModule.id}`);
      
      const examData = await prisma.exam.findUnique({
        where: { id: examModule.exams[0].id },
        include: {
          questions: {
            include: { answers: true },
            orderBy: { order_index: 'asc' }
          },
          exam_config: true
        }
      });

      if (examData) {
        console.log(`✅ Examen récupéré: ${examData.title}`);
        console.log(`   Questions: ${examData.questions.length}`);
        console.log(`   Configuration anti-fraude: ${examData.exam_config ? 'OUI' : 'NON'}`);
        
        if (examData.exam_config) {
          console.log(`   🔒 Paramètres de sécurité:`);
          console.log(`      - Randomisation questions: ${examData.exam_config.question_randomization}`);
          console.log(`      - Randomisation réponses: ${examData.exam_config.answer_randomization}`);
          console.log(`      - Révision manuelle: ${examData.exam_config.manual_review_required}`);
        }
      }
    }

    console.log('\n🎉 Test d\'intégration modules terminé avec succès !');
    console.log('\n📋 Résumé:');
    console.log(`   • ${course.modules.filter(m => m.module_type === 'lesson').length} modules de contenu`);
    console.log(`   • ${course.modules.filter(m => m.module_type === 'quiz').length} quiz formatifs`);
    console.log(`   • ${course.modules.filter(m => m.module_type === 'exam').length} examens finaux sécurisés`);

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testModulesIntegration();