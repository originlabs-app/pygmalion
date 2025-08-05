import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ScriptLogger } from '@/common/services/script-logger.service';

// Charger les variables d'environnement
dotenv.config();

const logger = new ScriptLogger('UploadImagesToSupabase');

const prisma = new PrismaClient();

// Client Supabase avec service key pour bypasser RLS
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!, // Service key pour accès admin
);

// Mapping des images aux formations
const imageMapping = [
  {
    titlePattern: 'Sécurité Aéroportuaire',
    localImage: 'placeholder-surete-aeroport.jpg',
    fileName: 'securite-aeroportuaire.jpg',
  },
  {
    titlePattern: 'Personnel Navigant Commercial',
    localImage: 'placeholder-hotesse-steward.jpg',
    fileName: 'personnel-navigant.jpg',
  },
  {
    titlePattern: 'Maintenance Aéronautique',
    localImage: 'placeholder-maintenance-avionique.jpg',
    fileName: 'maintenance-aeronautique.jpg',
  },
  {
    titlePattern: 'Opérations au Sol',
    localImage: 'placeholder-agent-piste.jpg',
    fileName: 'operations-au-sol.jpg',
  },
  {
    titlePattern: 'Anglais',
    localImage: 'placeholder-anglais-aviation.jpg',
    fileName: 'anglais-aviation.jpg',
  },
  {
    titlePattern: 'Pilote',
    localImage: 'placeholder-formation-pilote.jpg',
    fileName: 'formation-pilote.jpg',
  },
  {
    titlePattern: 'Contrôleur',
    localImage: 'placeholder-controle-aerien.jpg',
    fileName: 'controle-aerien.jpg',
  },
  {
    titlePattern: 'Soudage',
    localImage: 'placeholder-soudage-aeronautique.jpg',
    fileName: 'soudage-aeronautique.jpg',
  },
];

async function uploadImagesToSupabase() {
  logger.info('🚀 Upload des images vers Supabase Storage...');

  try {
    // Récupérer toutes les formations avec leur provider
    const courses = await prisma.course.findMany({
      include: {
        provider: true,
      },
    });

    logger.info(`📚 ${courses.length} formations trouvées`);

    for (const course of courses) {
      // Trouver l'image appropriée
      const mapping = imageMapping.find((m) =>
        course.title.toLowerCase().includes(m.titlePattern.toLowerCase()),
      );

      const imageToUse = mapping || {
        localImage: 'aviation-learners-training.jpg',
        fileName: 'default-aviation.jpg',
      };

      // Chemin local de l'image
      const imagePath = path.join(
        '/Users/galileonetwork/Documents/Pygmalion/frontend/public/images',
        imageToUse.localImage,
      );

      if (!fs.existsSync(imagePath)) {
        logger.info(`⚠️  Image non trouvée : ${imagePath}`);
        continue;
      }

      // Lire le fichier image
      const imageBuffer = fs.readFileSync(imagePath);

      // Déterminer l'organisation ID (utiliser l'ID du provider si pas d'org séparée)
      const orgId = course.provider_id || 'default-org';

      // Créer le chemin dans le bucket
      const fileName = `${course.id}_${Date.now()}_${imageToUse.fileName}`;
      const storagePath = `${orgId}/courses/${fileName}`;

      logger.info(`📤 Upload : ${course.title} → ${storagePath}`);

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('course-images')
        .upload(storagePath, imageBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (error) {
        logger.error(`❌ Erreur upload pour ${course.title}:`, error.message);
        continue;
      }

      // Générer l'URL publique
      const { data: urlData } = supabase.storage
        .from('course-images')
        .getPublicUrl(storagePath);

      const publicUrl = urlData.publicUrl;
      logger.info(`✅ URL publique : ${publicUrl}`);

      // Mettre à jour la formation avec l'URL Supabase
      await prisma.course.update({
        where: { id: course.id },
        data: { image_url: publicUrl },
      });

      logger.info(`✅ Formation mise à jour : ${course.title}`);
    }

    logger.info('\n🎉 Upload terminé !');

    // Afficher un résumé
    const updatedCourses = await prisma.course.findMany({
      where: {
        image_url: {
          contains: 'supabase',
        },
      },
      select: {
        title: true,
        image_url: true,
      },
    });

    logger.info(
      `\n📊 ${updatedCourses.length} formations avec images Supabase :`,
    );
    updatedCourses.forEach((course) => {
      logger.info(`- ${course.title}`);
      logger.info(`  URL: ${course.image_url}`);
    });
  } catch (error) {
    logger.error('❌ Erreur générale :', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
uploadImagesToSupabase()
  .catch(console.error)
  .finally(() => process.exit());
