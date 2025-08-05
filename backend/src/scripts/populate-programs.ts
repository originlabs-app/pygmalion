import { PrismaClient, Prisma } from '@prisma/client';
import { ScriptLogger } from '@/common/services/script-logger.service';

const prisma = new PrismaClient();
const logger = new ScriptLogger('PopulatePrograms');

async function populatePrograms() {
  logger.info("🚀 Début de l'ajout des programmes détaillés...");

  try {
    // Récupérer tous les cours
    const courses = await prisma.course.findMany();

    logger.info(`📚 ${courses.length} cours trouvés`);

    for (const course of courses) {
      const program = generateDetailedProgram(course);

      await prisma.course.update({
        where: { id: course.id },
        data: { detailed_program: program as Prisma.InputJsonValue },
      });

      logger.info(`  ✅ Programme détaillé ajouté pour: ${course.title}`);
    }

    logger.info('\n✨ Ajout des programmes détaillés terminé avec succès!');
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
      evaluation: 'Examen théorique et mise en situation pratique',
      certification: "Certificat d'agent d'opérations aéroportuaires",
    },
    crew: {
      modules: [
        {
          title: 'Module 1 : Formation théorique',
          duration: '2 semaines',
          content: [
            'Réglementation aérienne (EASA, DGAC)',
            "Sécurité et procédures d'urgence",
            'Service client et hospitalité',
            'Communication interculturelle',
          ],
        },
        {
          title: 'Module 2 : Formation pratique',
          duration: '3 semaines',
          content: [
            'Simulateur de cabine (évacuation, dépressurisation)',
            "Exercices d'évacuation en conditions réelles",
            'Service en vol et gestion du catering',
            'Gestion des passagers difficiles et situations de crise',
          ],
        },
        {
          title: 'Module 3 : Stages en compagnie',
          duration: '4 semaines',
          content: [
            'Vols supervisés',
            'Mise en pratique des acquis',
            'Évaluation continue',
            'Débriefing et perfectionnement',
          ],
        },
      ],
      evaluation: 'Examens théoriques, pratiques et validation en vol',
      certification: "Certificat de Membre d'Équipage de Cabine (CCA)",
    },
    maintenance: {
      modules: [
        {
          title: 'Module 1 : Fondamentaux de la maintenance',
          duration: '1 semaine',
          content: [
            'Systèmes aéronautiques (hydraulique, électrique, pneumatique)',
            'Documentation technique (AMM, SRM, IPC)',
            'Outils et équipements spécialisés',
            'Normes de sécurité et facteurs humains',
          ],
        },
        {
          title: 'Module 2 : Pratique atelier - Cellule',
          duration: '2 semaines',
          content: [
            'Inspection structurale',
            'Réparations composites',
            'Systèmes de commandes de vol',
            "Tests d'étanchéité et pressurisation",
          ],
        },
        {
          title: 'Module 3 : Pratique atelier - Moteurs',
          duration: '2 semaines',
          content: [
            'Démontage/remontage moteur',
            'Boroscope et inspections',
            'Équilibrage et tests',
            'Documentation de maintenance',
          ],
        },
      ],
      evaluation: 'Examens EASA Part-66 et évaluations pratiques',
      certification: 'Licence de maintenance aéronautique EASA Part-66 B1',
    },
    security: {
      modules: [
        {
          title: 'Module 1 : Cadre réglementaire et menaces',
          duration: '2 jours',
          content: [
            'Réglementation européenne (UE 2015/1998)',
            'Historique et typologie des menaces',
            'Organisation de la sûreté aéroportuaire',
            'Documentation et procédures sûreté',
          ],
        },
        {
          title: 'Module 2 : Techniques de contrôle',
          duration: '3 jours',
          content: [
            'Utilisation des équipements (RX, détecteurs)',
            'Fouille manuelle et palpation',
            'Détection comportementale (profilage)',
            'Contrôle des documents de voyage',
          ],
        },
        {
          title: 'Module 3 : Gestion de crise',
          duration: '2 jours',
          content: [
            "Procédures d'alerte et d'évacuation",
            'Gestion des objets suspects',
            'Communication en situation de crise',
            'Exercices pratiques et simulations',
          ],
        },
      ],
      evaluation: 'Examens théoriques et mises en situation',
      certification: "Certificat d'agent de sûreté aéroportuaire",
    },
    language: {
      modules: [
        {
          title: 'Module 1 : Aviation English Basics',
          duration: '2 semaines',
          content: [
            'Phraséologie standard OACI',
            'Communications radio (ATC)',
            'Vocabulaire technique aéronautique',
            "Situations d'urgence et phraséologie",
          ],
        },
        {
          title: 'Module 2 : Professional Communication',
          duration: '2 semaines',
          content: [
            'Interaction avec équipage international',
            'Service passagers en anglais',
            'Rédaction de rapports techniques',
            'Présentations orales professionnelles',
          ],
        },
        {
          title: 'Module 3 : Préparation OACI',
          duration: '1 semaine',
          content: [
            'Tests blancs OACI niveau 4',
            'Enregistrements et analyse',
            'Perfectionnement prononciation',
            "Stratégies d'examen",
          ],
        },
      ],
      evaluation: 'Test OACI niveau 4 (minimum requis)',
      certification: 'Certificat OACI niveau 4 ou supérieur',
    },
    services: {
      modules: [
        {
          title: 'Module 1 : Assistance passagers',
          duration: '1 semaine',
          content: [
            'Accueil et information multilingue',
            'Gestion des réclamations et litiges',
            'Assistance PMR (Passagers à Mobilité Réduite)',
            'Services premium et protocole VIP',
          ],
        },
        {
          title: 'Module 2 : Opérations commerciales',
          duration: '1 semaine',
          content: [
            'Systèmes de réservation (Amadeus, Sabre)',
            "Enregistrement et procédures d'embarquement",
            'Gestion des bagages et tracking',
            "Irrégularités d'exploitation (retards, annulations)",
          ],
        },
        {
          title: 'Module 3 : Escale et coordination',
          duration: '1 semaine',
          content: [
            "Coordination des services d'escale",
            'Communication avec les équipages',
            'Gestion du turn-around',
            'Reporting et KPIs opérationnels',
          ],
        },
      ],
      evaluation: 'Évaluations continues et mise en situation',
      certification: "Certificat d'agent d'escale et services passagers",
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
          'Concepts de base du domaine',
          'Réglementation applicable',
          'Bonnes pratiques professionnelles',
        ],
      },
      {
        title: 'Module 2 : Approfondissement technique',
        duration: '3 jours',
        content: [
          'Études de cas pratiques',
          'Exercices en conditions réelles',
          'Mises en situation professionnelle',
          'Évaluation continue des acquis',
        ],
      },
      {
        title: 'Module 3 : Validation des compétences',
        duration: '1 jour',
        content: [
          'Révisions générales',
          'Examens théoriques',
          'Évaluations pratiques',
          'Remise des certificats',
        ],
      },
    ],
    evaluation: 'Examens théoriques et pratiques',
    certification: 'Certificat de formation professionnelle',
  };

  return programs[course.category] || defaultProgram;
}

// Exécuter le script
populatePrograms().catch(console.error);
