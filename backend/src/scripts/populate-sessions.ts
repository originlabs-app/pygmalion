import { PrismaClient } from '@prisma/client';
import { ScriptLogger } from '@/common/services/script-logger.service';

const prisma = new PrismaClient();
const logger = new ScriptLogger('PopulateSessions');

async function populateSessions() {
  logger.info('🚀 Début du peuplement des sessions...');

  try {
    // Récupérer tous les cours sans sessions
    const coursesWithoutSessions = await prisma.course.findMany({
      where: {
        sessions: {
          none: {},
        },
      },
      include: {
        provider: true,
      },
    });

    logger.info(
      `📚 ${coursesWithoutSessions.length} cours sans sessions trouvés`,
    );

    // Pour chaque cours, créer 2-3 sessions
    for (const course of coursesWithoutSessions) {
      logger.info(`\n📅 Création de sessions pour: ${course.title}`);

      // Générer 2-3 sessions par cours
      const sessionCount = Math.floor(Math.random() * 2) + 2; // 2 ou 3 sessions

      for (let i = 0; i < sessionCount; i++) {
        // Dates échelonnées sur les 6 prochains mois
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() + i * 2 + 1);
        startDate.setHours(9, 0, 0, 0);

        const endDate = new Date(startDate);
        const duration =
          typeof course.duration === 'number' ? course.duration : 5;
        endDate.setDate(endDate.getDate() + duration);

        // Locations variées
        const locations = [
          'Paris - Centre de formation aéronautique',
          'Toulouse - Aéroport Blagnac',
          'Lyon - Campus aviation',
          'Marseille - Centre technique',
          'Nice - École aéronautique',
          'Bordeaux - Institut de formation',
          'Nantes - Académie aviation',
          'Formation en ligne (visioconférence)',
        ];

        const session = await prisma.session.create({
          data: {
            course_id: course.id,
            start_date: startDate,
            end_date: endDate,
            price: 2500, // Prix par défaut
            max_seats: Math.floor(Math.random() * 10) + 15, // 15-25 places
            available_seats: Math.floor(Math.random() * 10) + 5, // 5-15 disponibles
            location: locations[Math.floor(Math.random() * locations.length)],
            session_type: 'regular' as const,
          },
        });

        logger.info(
          `  ✅ Session créée: ${startDate.toLocaleDateString('fr-FR')} - ${locations[Math.floor(Math.random() * locations.length)]}`,
        );
      }
    }

    // Ajouter aussi le detailed_program aux cours qui n'en ont pas
    const coursesWithoutProgram = await prisma.course.findMany({
      where: {
        detailed_program: null as any,
      },
    });

    logger.info(
      `\n📝 ${coursesWithoutProgram.length} cours sans programme détaillé trouvés`,
    );

    for (const course of coursesWithoutProgram) {
      const program = generateDetailedProgram(course);

      await prisma.course.update({
        where: { id: course.id },
        data: { detailed_program: program },
      });

      logger.info(`  ✅ Programme détaillé ajouté pour: ${course.title}`);
    }

    logger.info('\n✨ Peuplement des sessions terminé avec succès!');
  } catch (error) {
    logger.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function generateDetailedProgram(course: any) {
  const programs: Record<string, any> = {
    operations: {
      modules: [
        {
          title: 'Module 1 : Introduction aux opérations aéroportuaires',
          duration: '1 jour',
          content: [
            'Présentation du secteur aéroportuaire',
            'Rôles et responsabilités des agents',
            'Réglementation DGAC et IATA',
            'Sécurité et sûreté aéroportuaire',
          ],
        },
        {
          title: 'Module 2 : Gestion des flux passagers',
          duration: '2 jours',
          content: [
            'Accueil et orientation des passagers',
            "Gestion des files d'attente",
            "Procédures d'embarquement",
            'Gestion des situations difficiles',
          ],
        },
        {
          title: 'Module 3 : Opérations piste',
          duration: '2 jours',
          content: [
            'Signalisation et balisage',
            'Coordination avec les équipes',
            "Procédures d'urgence",
            'Manipulation des équipements',
          ],
        },
      ],
    },
    crew: {
      modules: [
        {
          title: 'Module 1 : Formation théorique',
          duration: '2 semaines',
          content: [
            'Réglementation aérienne',
            "Sécurité et procédures d'urgence",
            'Service client et hospitalité',
            'Communication interculturelle',
          ],
        },
        {
          title: 'Module 2 : Formation pratique',
          duration: '3 semaines',
          content: [
            'Simulateur de cabine',
            "Exercices d'évacuation",
            'Service en vol',
            'Gestion des passagers difficiles',
          ],
        },
      ],
    },
    maintenance: {
      modules: [
        {
          title: 'Module 1 : Fondamentaux',
          duration: '1 semaine',
          content: [
            'Systèmes aéronautiques',
            'Documentation technique',
            'Outils et équipements',
            'Normes de sécurité',
          ],
        },
        {
          title: 'Module 2 : Pratique atelier',
          duration: '3 semaines',
          content: [
            'Maintenance préventive',
            'Diagnostic de pannes',
            'Réparations courantes',
            'Tests et validations',
          ],
        },
      ],
    },
    security: {
      modules: [
        {
          title: 'Module 1 : Cadre réglementaire',
          duration: '2 jours',
          content: [
            'Réglementation européenne',
            'Menaces et risques',
            'Procédures de contrôle',
            'Documentation sûreté',
          ],
        },
        {
          title: 'Module 2 : Techniques de contrôle',
          duration: '3 jours',
          content: [
            'Utilisation des équipements',
            'Fouille manuelle',
            'Détection comportementale',
            'Gestion de crise',
          ],
        },
      ],
    },
    language: {
      modules: [
        {
          title: 'Module 1 : Aviation English Basics',
          duration: '2 semaines',
          content: [
            'Phraséologie standard',
            'Communications radio',
            'Vocabulaire technique',
            "Situations d'urgence",
          ],
        },
        {
          title: 'Module 2 : Professional Communication',
          duration: '2 semaines',
          content: [
            'Interaction avec équipage',
            'Service passagers',
            'Rédaction de rapports',
            'Présentations orales',
          ],
        },
      ],
    },
    services: {
      modules: [
        {
          title: 'Module 1 : Assistance passagers',
          duration: '1 semaine',
          content: [
            'Accueil et information',
            'Gestion des réclamations',
            'Passagers à mobilité réduite',
            'Services premium',
          ],
        },
        {
          title: 'Module 2 : Opérations commerciales',
          duration: '1 semaine',
          content: [
            'Systèmes de réservation',
            'Enregistrement et embarquement',
            'Gestion des bagages',
            "Irrégularités d'exploitation",
          ],
        },
      ],
    },
  };

  // Programme par défaut si la catégorie n'est pas trouvée
  const defaultProgram = {
    modules: [
      {
        title: 'Module 1 : Introduction et fondamentaux',
        duration: '2 jours',
        content: [
          'Présentation de la formation',
          'Concepts de base',
          'Réglementation applicable',
          'Bonnes pratiques',
        ],
      },
      {
        title: 'Module 2 : Approfondissement',
        duration: '3 jours',
        content: [
          'Études de cas',
          'Exercices pratiques',
          'Mises en situation',
          'Évaluation continue',
        ],
      },
    ],
  };

  return programs[course.category] || defaultProgram;
}

// Exécuter le script
populateSessions().catch(console.error);
