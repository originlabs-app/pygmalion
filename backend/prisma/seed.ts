import { PrismaClient, AviationCategory, CourseModality, CourseStatus, ModuleType, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  try {
    // 1. Créer les utilisateurs de démonstration
    console.log('👤 Création des utilisateurs...');
    
    // Directeur d'Aviation Training Solutions SARL
    const directorUser = await prisma.userProfile.upsert({
      where: { email: 'p.moreau@aviation-training-solutions.fr' },
      update: {},
      create: {
        email: 'p.moreau@aviation-training-solutions.fr',
        first_name: 'Philippe',
        last_name: 'Moreau',
        role: 'training_org',
        organization: 'Aviation Training Solutions SARL',
        phone: '+33 1 45 67 89 12',
        kyc_status: 'verified',
        kyc_verified_at: new Date(),
        mfa_enabled: true,
      },
    });

    // Technicien Air France
    const techUser = await prisma.userProfile.upsert({
      where: { email: 'laurent.dubois@airfrance.fr' },
      update: {},
      create: {
        email: 'laurent.dubois@airfrance.fr',
        first_name: 'Laurent',
        last_name: 'Dubois',
        role: 'student',
        organization: 'Air France',
        phone: '+33 1 48 62 44 22',
        kyc_status: 'verified',
        kyc_verified_at: new Date(),
        mfa_enabled: false,
      },
    });

    // Manager Air France
    const managerUser = await prisma.userProfile.upsert({
      where: { email: 'marie.clement@airfrance.fr' },
      update: {},
      create: {
        email: 'marie.clement@airfrance.fr',
        first_name: 'Marie',
        last_name: 'Clément',
        role: 'manager',
        organization: 'Air France',
        phone: '+33 1 48 62 55 33',
        kyc_status: 'verified',
        kyc_verified_at: new Date(),
        mfa_enabled: true,
      },
    });

    // Admin système
    const adminUser = await prisma.userProfile.upsert({
      where: { email: 'admin@pygmalion-formation.fr' },
      update: {},
      create: {
        email: 'admin@pygmalion-formation.fr',
        first_name: 'Jean',
        last_name: 'Administrateur',
        role: 'admin',
        organization: 'Pygmalion Formation',
        phone: '+33 1 42 55 66 77',
        kyc_status: 'verified',
        kyc_verified_at: new Date(),
        mfa_enabled: true,
      },
    });

    console.log('✅ Utilisateurs créés');

    // 2. Créer l'organisme de formation
    console.log('🏢 Création de l\'organisme de formation...');
    
    const trainingOrg = await prisma.trainingOrganization.upsert({
      where: { siret: '85234567890123' },
      update: {},
      create: {
        user_id: directorUser.id,
        organization_name: 'Aviation Training Solutions SARL',
        siret: '85234567890123',
        description: 'Organisme de formation spécialisé dans les formations aéronautiques et de sécurité aéroportuaire. Expert reconnu depuis 15 ans avec certification Qualiopi.',
        website: 'https://www.aviation-training-solutions.fr',
        contact_email: 'contact@aviation-training-solutions.fr',
        contact_phone: '+33 1 45 67 89 12',
        contact_name: 'Philippe Moreau',
        logo_url: '/images/logos/aviation-training-solutions-logo.png',
        verification_status: 'verified',
        verified_at: new Date(),
        qualiopi_certified: true,
        qualiopi_number: 'QUA-2024-ATS-001',
      },
    });

    console.log('✅ Organisme de formation créé');

    // 3. Créer la compagnie Air France
    console.log('✈️ Création de la compagnie Air France...');
    
    const airFranceCompany = await prisma.company.upsert({
      where: { siret: '42218480800026' },
      update: {},
      create: {
        name: 'Air France',
        siret: '42218480800026',
        contact_email: 'formation@airfrance.fr',
        contact_phone: '+33 1 41 56 78 00',
        manager_id: managerUser.id,
      },
    });

    console.log('✅ Compagnie Air France créée');

    // 4. Créer le cours de démonstration
    console.log('📚 Création du cours de démonstration...');
    
    const demoSecurityCourse = await prisma.course.create({
      data: {
        title: 'Sécurité Aéroportuaire - DGAC',
        provider_id: trainingOrg.id,
        description: 'Formation complète et obligatoire en sécurité aéroportuaire conforme aux exigences DGAC. Module certifiant pour l\'accès aux zones réglementées des aéroports français.',
        category: 'security',
        objectives: 'Maîtriser les procédures de sécurité aéroportuaire selon les standards DGAC\n• Identifier et gérer les risques sécuritaires\n• Appliquer les protocoles d\'accès aux zones réglementées\n• Comprendre la réglementation européenne et française',
        requirements: 'Aucun prérequis spécifique. Formation ouverte à tous les personnels aéroportuaires.',
        target_audience: 'Personnel technique, agents de maintenance, chauffeurs, personnel de nettoyage, sous-traitants accédant aux zones réglementées des aéroports.',
        program: 'Module 1: Réglementation et cadre juridique (2h)\nModule 2: Zones de sécurité et contrôles d\'accès (3h)\nModule 3: Identification des menaces et signalement (2h)\nModule 4: Procédures d\'urgence (2h)\nModule 5: Évaluation pratique (1h)',
        qualiopi_indicators: [
          'Taux de réussite certification: 96%',
          'Satisfaction apprenants: 4.8/5',
          'Insertion professionnelle: 100%'
        ],
        course_type: 'blended',
        image_url: '/images/aviation-learners-training.jpg',
        status: 'published',
        duration_hours: 10,
        certification_type: 'Certificat de sécurité aéroportuaire DGAC',
        certification_validity_months: 24,
      },
    });

    console.log('✅ Cours créé');

    // 5. Créer les modules de cours avec examens
    console.log('📖 Création des modules de cours...');
    
    const modules = [
      {
        title: 'Réglementation et cadre juridique',
        description: 'Introduction aux règlements de sécurité aéroportuaire',
        order_index: 1,
        duration_minutes: 120,
        module_type: ModuleType.lesson,
        is_mandatory: true,
        passing_score: 16.0,
      },
      { 
        title: 'Zones de sécurité et contrôles d\'accès',
        description: 'Comprendre les différentes zones et leurs accès',
        order_index: 2,
        duration_minutes: 180,
        module_type: ModuleType.lesson,
        is_mandatory: true,
        passing_score: 16.0,
      },
      {
        title: 'Quiz intermédiaire - Contrôle des connaissances',
        description: 'Évaluation formative des modules 1 et 2',
        order_index: 3,
        duration_minutes: 30,
        module_type: ModuleType.quiz,
        is_mandatory: true,
        passing_score: 14.0,
      },
      {
        title: 'Identification des menaces et signalement',
        description: 'Détecter et signaler les situations à risque',
        order_index: 4,
        duration_minutes: 120,
        module_type: ModuleType.lesson,
        is_mandatory: true,
        passing_score: 16.0,
      },
      {
        title: 'Examen final - Certification DGAC',
        description: 'Évaluation certificante finale avec anti-fraude',
        order_index: 5,
        duration_minutes: 60,
        module_type: ModuleType.exam,
        is_mandatory: true,
        passing_score: 16.0,
      },
    ];

    const createdModules: any[] = [];
    for (const moduleData of modules) {
      const module = await prisma.courseModule.create({
        data: {
          ...moduleData,
          course_id: demoSecurityCourse.id,
        },
      });
      createdModules.push(module);
    }

    console.log('✅ Modules créés');

    // 6. Créer un quiz formatif (module 3)
    console.log('❓ Création du quiz formatif...');
    
    const formativeQuiz = await prisma.quiz.create({
      data: {
        module_id: createdModules[2].id, // module quiz
        title: 'Quiz - Réglementation et zones de sécurité',
        description: 'Évaluation formative sur les modules 1 et 2',
        time_limit: 30,
        attempts_allowed: 3,
        passing_score: 14.0,
        shuffle_questions: true,
        show_results: true,
      },
    });

    // Questions pour le quiz formatif
    const quizQuestions = [
      {
        question_text: 'Quelle est la durée de validité d\'un certificat de sécurité aéroportuaire DGAC ?',
        question_type: QuestionType.single_choice,
        points: 2,
        order_index: 1,
        explanation: 'Les certificats DGAC sont valides 24 mois et doivent être renouvelés.',
      },
      {
        question_text: 'Quelles zones nécessitent un badge spécial pour l\'accès ?',
        question_type: QuestionType.multiple_choice, 
        points: 3,
        order_index: 2,
        explanation: 'Les zones côté piste et les zones de sûreté restreintes nécessitent des badges spéciaux.',
      },
    ];

    for (const [index, questionData] of quizQuestions.entries()) {
      const question = await prisma.question.create({
        data: {
          ...questionData,
          quiz_id: formativeQuiz.id,
        },
      });

      // Réponses pour la première question
      if (index === 0) {
        await prisma.answer.createMany({
          data: [
            { question_id: question.id, answer_text: '12 mois', is_correct: false, order_index: 1 },
            { question_id: question.id, answer_text: '24 mois', is_correct: true, order_index: 2 },
            { question_id: question.id, answer_text: '36 mois', is_correct: false, order_index: 3 },
            { question_id: question.id, answer_text: '48 mois', is_correct: false, order_index: 4 },
          ],
        });
      }

      // Réponses pour la deuxième question
      if (index === 1) {
        await prisma.answer.createMany({
          data: [
            { question_id: question.id, answer_text: 'Zone côté piste', is_correct: true, order_index: 1 },
            { question_id: question.id, answer_text: 'Zone publique', is_correct: false, order_index: 2 },
            { question_id: question.id, answer_text: 'Zone de sûreté restreinte', is_correct: true, order_index: 3 },
            { question_id: question.id, answer_text: 'Zone d\'embarquement', is_correct: false, order_index: 4 },
          ],
        });
      }
    }

    console.log('✅ Quiz formatif créé');

    // 7. Créer l'examen final (module 5)
    console.log('🛡️ Création de l\'examen final...');
    
    const finalExam = await prisma.exam.create({
      data: {
        module_id: createdModules[4].id, // module exam
        title: 'Examen Final - Certification Sécurité Aéroportuaire DGAC',
        description: 'Évaluation certificante finale avec système anti-fraude',
        time_limit: 60,
        passing_score: 16.0,
        shuffle_questions: true,
        show_results: false,
        generates_certificate: true,
      },
    });

    // Questions pour l'examen final
    const examQuestions = [
      {
        question_text: 'En cas de découverte d\'un objet suspect, quelle est la première action à effectuer ?',
        question_type: QuestionType.single_choice,
        points: 4,
        order_index: 1,
        explanation: 'La procédure impose d\'alerter immédiatement les services de sécurité sans toucher l\'objet.',
      },
      {
        question_text: 'Quels éléments doivent figurer obligatoirement sur un badge d\'accès aux zones réglementées ?',
        question_type: QuestionType.multiple_choice,
        points: 3,
        order_index: 2,
        explanation: 'Photo, nom, fonction et code zone sont obligatoires sur tous les badges.',
      },
      {
        question_text: 'Décrivez la procédure d\'évacuation en cas d\'alerte sécurité.',
        question_type: QuestionType.open_text,
        points: 5,
        order_index: 3,
        explanation: 'La réponse doit inclure : arrêt immédiat des activités, signalement au poste de sécurité, évacuation vers les points de rassemblement désignés.',
      },
    ];

    for (const [index, questionData] of examQuestions.entries()) {
      const question = await prisma.examQuestion.create({
        data: {
          ...questionData,
          exam_id: finalExam.id,
        },
      });

      // Réponses pour la première question
      if (index === 0) {
        await prisma.examAnswer.createMany({
          data: [
            { question_id: question.id, answer_text: 'Examiner l\'objet de plus près', is_correct: false, order_index: 1 },
            { question_id: question.id, answer_text: 'Alerter immédiatement la sécurité', is_correct: true, order_index: 2 },
            { question_id: question.id, answer_text: 'Déplacer l\'objet dans un endroit sûr', is_correct: false, order_index: 3 },
            { question_id: question.id, answer_text: 'Continuer son travail normalement', is_correct: false, order_index: 4 },
          ],
        });
      }

      // Réponses pour la deuxième question  
      if (index === 1) {
        await prisma.examAnswer.createMany({
          data: [
            { question_id: question.id, answer_text: 'Photo d\'identité', is_correct: true, order_index: 1 },
            { question_id: question.id, answer_text: 'Nom et prénom', is_correct: true, order_index: 2 },
            { question_id: question.id, answer_text: 'Date de naissance', is_correct: false, order_index: 3 },
            { question_id: question.id, answer_text: 'Code zone d\'accès', is_correct: true, order_index: 4 },
            { question_id: question.id, answer_text: 'Fonction exercée', is_correct: true, order_index: 5 },
          ],
        });
      }
    }

    // Configuration anti-fraude pour l'examen final
    await prisma.examConfiguration.create({
      data: {
        exam_id: finalExam.id,
        default_proctoring: true,
        default_webcam: true,
        default_lockdown: true,
        default_ip_restriction: null,
        allowed_attempts: 1,
        time_limit_strict: true,
        question_randomization: true,
        answer_randomization: true,
        alert_threshold: 3,
        auto_suspend: false,
        manual_review_required: true,
      },
    });

    console.log('✅ Examen final et configuration anti-fraude créés');

    // 9. Créer les sessions de démonstration
    console.log('📅 Création des sessions...');
    
    const demoSession1 = await prisma.session.create({
      data: {
        course_id: demoSecurityCourse.id,
        start_date: new Date('2024-03-15T09:00:00Z'),
        end_date: new Date('2024-03-16T17:00:00Z'),
        location: 'Centre de formation ATS - Roissy CDG',
        price: 650.00,
        available_seats: 18,
        max_seats: 20,
        lms_course_id: 'lms-security-001',
        session_type: 'regular',
      },
    });

    const demoSession2 = await prisma.session.create({
      data: {
        course_id: demoSecurityCourse.id,
        start_date: new Date('2024-04-12T09:00:00Z'),
        end_date: new Date('2024-04-13T17:00:00Z'),
        location: 'Centre de formation ATS - Orly',
        price: 650.00,
        available_seats: 20,
        max_seats: 20,
        session_type: 'regular',
      },
    });

    console.log('✅ Sessions créées');

    // 10. Créer l'inscription de démonstration
    console.log('📝 Création de l\'inscription...');
    
    const demoEnrollment = await prisma.enrollment.create({
      data: {
        user_id: techUser.id,
        course_id: demoSecurityCourse.id,
        session_id: demoSession1.id,
        status: 'approved',
        payment_status: 'paid',
        enrollment_date: new Date('2024-02-01T10:00:00Z'),
        assigned_by: managerUser.id,
        company_id: airFranceCompany.id,
      },
    });

    console.log('✅ Inscription créée');

    // 11. Créer le progrès de démonstration
    console.log('📊 Création du progrès...');
    
    const progressModules = [
      { module_id: createdModules[0].id, completed: true, score: 18.5, time_spent: 120 },
      { module_id: createdModules[1].id, completed: true, score: 19.0, time_spent: 180 },
      { module_id: createdModules[2].id, completed: true, score: 17.5, time_spent: 120 },
      { module_id: createdModules[3].id, completed: false, score: null, time_spent: 45 },
      { module_id: createdModules[4].id, completed: false, score: null, time_spent: 0 },
    ];

    for (const progress of progressModules) {
      await prisma.enrollmentProgress.create({
        data: {
          enrollment_id: demoEnrollment.id,
          module_id: progress.module_id,
          completed: progress.completed,
          completion_date: progress.completed ? new Date() : null,
          time_spent_minutes: progress.time_spent,
          score: progress.score,
        },
      });
    }

    console.log('✅ Progrès créé');

    // 12. Créer d'autres données de soutien
    console.log('🔧 Création de données additionnelles...');

    // Autres cours pour enrichir le catalogue
    const additionalCourses = [
      {
        title: 'Maintenance Aéronautique - Module B1',
        category: AviationCategory.maintenance,
        description: 'Formation certifiante pour techniciens de maintenance aéronautique selon Part-66.',
        course_type: CourseModality.in_person,
        duration_hours: 40,
        status: CourseStatus.published,
      },
      {
        title: 'Formation Personnel Navigant Commercial',
        category: AviationCategory.cabin_crew,
        description: 'Formation initiale PNC conforme aux exigences EASA.',
        course_type: CourseModality.blended,
        duration_hours: 105,
        status: CourseStatus.published,
      },
      {
        title: 'Opérations au Sol - Handling',
        category: AviationCategory.ground_handling,
        description: 'Formation aux opérations de piste et handling d\'aéronefs.',
        course_type: CourseModality.in_person,
        duration_hours: 24,
        status: CourseStatus.published,
      },
    ];

    for (const courseData of additionalCourses) {
      await prisma.course.create({
        data: {
          ...courseData,
          provider_id: trainingOrg.id,
          objectives: `Objectifs de ${courseData.title}`,
          target_audience: 'Personnel aéronautique',
          program: 'Programme détaillé disponible sur demande',
          qualiopi_indicators: ['Formation certifiante'],
          image_url: '/images/aviation-learners-training.jpg',
        },
      });
    }

    console.log('✅ Cours additionnels créés');

    // Mettre à jour les places disponibles pour la session 1
    await prisma.session.update({
      where: { id: demoSession1.id },
      data: { available_seats: 19 }, // Une place prise par Laurent
    });

    console.log('✅ Places disponibles mises à jour');

    console.log('🎉 Seeding terminé avec succès !');
    console.log('\n📋 Résumé des données créées :');
    console.log('- 4 utilisateurs (directeur OF, technicien, manager, admin)');
    console.log('- 1 organisme de formation (Aviation Training Solutions)');
    console.log('- 1 compagnie (Air France)');
    console.log('- 4 cours (1 principal + 3 additionnels)');
    console.log('- 2 sessions pour le cours principal');
    console.log('- 1 inscription avec progrès');
    console.log('\n🔑 Comptes de test :');
    console.log('OF: p.moreau@aviation-training-solutions.fr');
    console.log('Étudiant: laurent.dubois@airfrance.fr');
    console.log('Manager: marie.clement@airfrance.fr');
    console.log('Admin: admin@pygmalion-formation.fr');

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 