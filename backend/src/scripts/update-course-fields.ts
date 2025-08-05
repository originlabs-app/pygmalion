import { PrismaClient } from '@prisma/client';
import { ScriptLogger } from '@/common/services/script-logger.service';

const prisma = new PrismaClient();
const logger = new ScriptLogger('UpdateCourseFields');

// Données de démo à ajouter aux formations existantes
const courseUpdates = [
  {
    title: 'Sécurité Aéroportuaire - DGAC',
    updates: {
      language: 'Français',
      classification_number: 'DGAC-SEC-001',
      success_rate: 98,
      satisfaction_rate: 4.8,
      validity_duration: '5 ans',
      target_certification: 'Certificat DGAC Sécurité Aéroportuaire',
      program_pdf_url: '/pdfs/programme-securite-dgac.pdf',
      duration: '22 heures (3 semaines)',
      cpf_eligible: true,
      opco_eligible: true,
    },
  },
  {
    title: 'Formation Personnel Navigant Commercial',
    updates: {
      language: 'Français/Anglais',
      classification_number: 'RNCP 34344',
      success_rate: 91,
      satisfaction_rate: 4.8,
      validity_duration: '5 ans (revalidation annuelle)',
      target_certification: "Certificat de Membre d'Équipage de Cabine (CCA)",
      program_pdf_url: '/pdfs/programme-hotesse-steward.pdf',
      duration: '140 heures (4 semaines)',
      cpf_eligible: true,
      opco_eligible: true,
    },
  },
  {
    title: 'Maintenance Aéronautique - Module B1',
    updates: {
      language: 'Français',
      classification_number: 'RNCP 34190',
      success_rate: 92,
      satisfaction_rate: 4.8,
      validity_duration: 'À vie',
      target_certification: 'Licence Part 66 Module Avionique',
      program_pdf_url: '/pdfs/programme-maintenance-avionique.pdf',
      duration: '80 heures (8 semaines)',
      cpf_eligible: true,
      opco_eligible: true,
    },
  },
  {
    title: 'Opérations au Sol - Handling',
    updates: {
      language: 'Français',
      classification_number: 'RS 5234',
      success_rate: 93,
      satisfaction_rate: 4.5,
      validity_duration: '3 ans',
      target_certification: 'Certificat Agent de Piste IATA',
      program_pdf_url: '/pdfs/programme-agent-piste.pdf',
      duration: '120 heures (4 semaines)',
      cpf_eligible: true,
      opco_eligible: true,
    },
  },
];

async function updateCourseFields() {
  logger.info('🚀 Mise à jour des champs des formations existantes...');

  try {
    for (const courseUpdate of courseUpdates) {
      // Chercher la formation par titre
      const courses = await prisma.course.findMany({
        where: {
          title: {
            contains: courseUpdate.title,
          },
        },
      });

      if (courses.length === 0) {
        logger.info(`⚠️  Formation non trouvée : ${courseUpdate.title}`);
        continue;
      }

      // Mettre à jour toutes les formations correspondantes
      for (const course of courses) {
        await prisma.course.update({
          where: { id: course.id },
          data: courseUpdate.updates,
        });
        logger.info(`✅ Mise à jour : ${course.title}`);
      }
    }

    // Mettre à jour aussi les formations sans données spécifiques avec des valeurs par défaut
    const coursesWithoutFields = await prisma.course.findMany({
      where: {
        OR: [
          { language: null },
          { cpf_eligible: false },
          { opco_eligible: false },
        ],
      },
    });

    for (const course of coursesWithoutFields) {
      await prisma.course.update({
        where: { id: course.id },
        data: {
          language: course.language || 'Français',
          cpf_eligible: course.cpf_eligible ?? true,
          opco_eligible: course.opco_eligible ?? true,
          success_rate: course.success_rate || 90,
          satisfaction_rate: course.satisfaction_rate || 4.5,
          validity_duration: course.validity_duration || '2 ans',
          duration: course.duration || `${course.duration_hours || 40} heures`,
        },
      });
      logger.info(`✅ Valeurs par défaut ajoutées : ${course.title}`);
    }

    logger.info('🎉 Mise à jour terminée !');

    // Afficher un résumé
    const updatedCourses = await prisma.course.findMany({
      where: {
        language: { not: null },
      },
    });

    logger.info(
      `\n📊 Total de formations mises à jour : ${updatedCourses.length}`,
    );
  } catch (error) {
    logger.error('❌ Erreur lors de la mise à jour :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la mise à jour
updateCourseFields()
  .catch(console.error)
  .finally(() => process.exit());
