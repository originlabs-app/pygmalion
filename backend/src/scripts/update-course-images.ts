import { PrismaClient } from '@prisma/client';
import { ScriptLogger } from '@/common/services/script-logger.service';

const prisma = new PrismaClient();
const logger = new ScriptLogger('UpdateCourseImages');

// Mapping des formations aux images appropriées
const courseImageMapping = [
  {
    titlePattern: 'Sécurité Aéroportuaire',
    imageUrl: '/images/placeholder-surete-aeroport.jpg',
  },
  {
    titlePattern: 'Personnel Navigant Commercial',
    imageUrl: '/images/placeholder-hotesse-steward.jpg',
  },
  {
    titlePattern: 'Maintenance Aéronautique',
    imageUrl: '/images/placeholder-maintenance-avionique.jpg',
  },
  {
    titlePattern: 'Opérations au Sol',
    imageUrl: '/images/placeholder-agent-piste.jpg',
  },
  {
    titlePattern: 'Contrôleur Aérien',
    imageUrl: '/images/placeholder-controle-aerien.jpg',
  },
  {
    titlePattern: 'Formation Pilote',
    imageUrl: '/images/placeholder-formation-pilote.jpg',
  },
  {
    titlePattern: 'Anglais Aéronautique',
    imageUrl: '/images/placeholder-anglais-aviation.jpg',
  },
  {
    titlePattern: 'Soudage',
    imageUrl: '/images/placeholder-soudage-aeronautique.jpg',
  },
];

async function updateCourseImages() {
  logger.info('🖼️  Mise à jour des images des formations...');

  try {
    // Récupérer toutes les formations
    const courses = await prisma.course.findMany();

    for (const course of courses) {
      // Trouver l'image appropriée basée sur le titre
      const mapping = courseImageMapping.find((m) =>
        course.title.toLowerCase().includes(m.titlePattern.toLowerCase()),
      );

      if (mapping) {
        await prisma.course.update({
          where: { id: course.id },
          data: { image_url: mapping.imageUrl },
        });
        logger.info(`✅ Image mise à jour pour : ${course.title}`);
      } else {
        // Image par défaut si aucune correspondance
        await prisma.course.update({
          where: { id: course.id },
          data: { image_url: '/images/aviation-learners-training.jpg' },
        });
        logger.info(`📷 Image par défaut pour : ${course.title}`);
      }
    }

    logger.info('\n🎉 Mise à jour des images terminée !');

    // Afficher un résumé
    const updatedCourses = await prisma.course.findMany({
      where: {
        image_url: { not: null },
      },
      select: {
        title: true,
        image_url: true,
      },
    });

    logger.info('\n📊 Résumé des images :');
    updatedCourses.forEach((course) => {
      logger.info(`- ${course.title}: ${course.image_url}`);
    });
  } catch (error) {
    logger.error('❌ Erreur lors de la mise à jour des images :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la mise à jour
updateCourseImages()
  .catch(console.error)
  .finally(() => process.exit());
