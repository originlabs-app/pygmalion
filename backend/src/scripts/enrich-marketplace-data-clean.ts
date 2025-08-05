import {
  PrismaClient,
  Prisma,
  AviationCategory,
  CourseModality,
} from '@prisma/client';
import { ScriptLogger } from '@/common/services/script-logger.service';
import {
  FormationData,
  TrainingOrgData,
  EnrichedCourseData,
  EnrichmentSummary,
  InstructorProfile,
  FAQItem,
} from '@/types/marketplace.types';
import { aviationFormationsData } from '@/data/aviation-formations.data';
import { trainingOrgsData } from '@/data/training-orgs.data';

const prisma = new PrismaClient();
const logger = new ScriptLogger('MarketplaceEnrichment');

/**
 * Génère un slug unique à partir d'un titre
 */
function generateSlug(title: string, index: number): string {
  const baseSlug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${baseSlug}-${Date.now()}-${index}`;
}

/**
 * Génère les données enrichies pour un cours
 */
function generateEnrichedCourseData(
  formation: FormationData,
  provider: TrainingOrgData,
  index: number,
): Partial<EnrichedCourseData> {
  return {
    // Métriques d'engagement (valeurs réalistes)
    view_count: Math.floor(Math.random() * 5000) + 500,
    favorite_count: Math.floor(Math.random() * 200) + 20,
    click_count: Math.floor(Math.random() * 1000) + 100,
    completion_time_avg: parseInt(formation.duration) || 40,
    conversion_rate: new Prisma.Decimal(Math.random() * 20 + 5),

    // Prérequis structurés
    prerequisites_structured: {
      education: getEducationPrerequisites(formation.difficulty),
      certifications: getCertificationPrerequisites(formation),
      medical: ['Aptitude médicale valide', 'Pas de contre-indication'],
      languages: ['Français courant', 'Anglais niveau B1 minimum'],
      experience: getExperiencePrerequisites(formation.difficulty),
    },

    // Résultats d'apprentissage
    learning_outcomes: {
      knowledge: generateKnowledgeOutcomes(formation),
      skills: generateSkillsOutcomes(formation),
      competencies: generateCompetencies(formation),
    },

    // Matériel inclus
    included_materials: {
      physical: [
        'Manuel de formation',
        'Support de cours imprimé',
        'Carnet de suivi',
      ],
      digital: [
        'Accès plateforme e-learning',
        'Vidéos de formation',
        'QCM en ligne',
      ],
      equipment: getIncludedEquipment(formation),
      certifications: [
        'Certificat de fin de formation',
        'Attestation de présence',
      ],
    },

    // Détails du planning
    schedule_details: {
      format: 'Intensif',
      sessions_per_week: 5,
      hours_per_session: 7,
      flexibility: 'Planning fixe avec possibilité de rattrapage',
    },

    // Profils instructeurs
    instructor_profiles: generateInstructorProfiles(formation),

    // FAQ
    faq: generateFAQ(formation),

    // Données commerciales
    early_bird_discount: new Prisma.Decimal(10),
    group_discount: {
      '3_5_personnes': new Prisma.Decimal(5),
      '6_10_personnes': new Prisma.Decimal(10),
      '11_plus_personnes': new Prisma.Decimal(15),
    },
    payment_options: [
      'Virement',
      'CB',
      'PayPal',
      '3x sans frais',
      'OPCO',
      'CPF',
    ],
    refund_policy: "Remboursement intégral jusqu'à 15 jours avant le début",
    min_participants: 4,
    max_participants: 12,

    // SEO et Marketing
    meta_title: `${formation.title} | Formation ${provider.name}`,
    meta_description: formation.description.substring(0, 160),
    slug: generateSlug(formation.title, index),
    keywords: [...formation.tags, 'formation', 'aéronautique', 'aviation'],

    // Tags et catégorisation
    tags: formation.tags,
    difficulty_level: formation.difficulty,
    industry_sectors: ['Aéronautique', 'Transport aérien', 'Aviation civile'],
    job_roles: formation.job_roles || [],
  };
}

/**
 * Génère les prérequis d'éducation selon le niveau
 */
function getEducationPrerequisites(difficulty: string): string[] {
  const prerequisites: Record<string, string[]> = {
    beginner: ['Niveau BAC ou équivalent'],
    intermediate: ['BAC+2 ou expérience équivalente'],
    advanced: ['BAC+3 ou expérience significative'],
    expert: ['BAC+5 ou expertise confirmée'],
  };
  return prerequisites[difficulty] || prerequisites.beginner;
}

/**
 * Génère les prérequis de certification
 */
function getCertificationPrerequisites(formation: FormationData): string[] {
  if (formation.difficulty === 'beginner') {
    return ['Aucune certification requise'];
  }
  return ['Certifications de base du domaine recommandées'];
}

/**
 * Génère les prérequis d'expérience
 */
function getExperiencePrerequisites(difficulty: string): string[] {
  const prerequisites: Record<string, string[]> = {
    beginner: ['Aucune expérience requise'],
    intermediate: ["1-2 ans d'expérience dans le domaine"],
    advanced: ["3-5 ans d'expérience confirmée"],
    expert: ["5+ ans d'expertise reconnue"],
  };
  return prerequisites[difficulty] || prerequisites.beginner;
}

/**
 * Génère les connaissances acquises
 */
function generateKnowledgeOutcomes(formation: FormationData): string[] {
  return [
    `Maîtriser les fondamentaux de ${formation.title.toLowerCase()}`,
    'Comprendre la réglementation applicable',
    'Connaître les procédures et protocoles',
    'Identifier les risques et mesures de sécurité',
  ];
}

/**
 * Génère les compétences acquises
 */
function generateSkillsOutcomes(formation: FormationData): string[] {
  return [
    'Appliquer les procédures en situation réelle',
    'Utiliser les outils et équipements spécifiques',
    'Communiquer efficacement en équipe',
    'Résoudre les problèmes courants',
  ];
}

/**
 * Génère les compétences comportementales
 */
function generateCompetencies(formation: FormationData): string[] {
  return [
    'Rigueur et respect des procédures',
    'Travail en équipe multiculturelle',
    'Gestion du stress et des urgences',
    'Adaptabilité et réactivité',
  ];
}

/**
 * Détermine l'équipement inclus
 */
function getIncludedEquipment(formation: FormationData): string[] {
  if (formation.tags.includes('sûreté')) {
    return ["Badge d'accès formation", 'EPI réglementaires'];
  }
  if (formation.tags.includes('maintenance')) {
    return ['Outillage de base', 'EPI complets', 'Documentation technique'];
  }
  return ['Matériel pédagogique standard'];
}

/**
 * Génère les profils d'instructeurs
 */
function generateInstructorProfiles(
  formation: FormationData,
): InstructorProfile[] {
  return [
    {
      name: `Expert ${Math.floor(Math.random() * 100)}`,
      title: 'Instructeur certifié',
      experience: "15+ ans dans l'aviation",
      certifications: ['Instructeur DGAC', 'Expert technique'],
      specialties: formation.tags.slice(0, 3),
    },
    {
      name: `Formateur ${Math.floor(Math.random() * 100)}`,
      title: 'Formateur senior',
      experience: '10+ ans de formation',
      certifications: ['Formateur professionnel', 'Certificat pédagogique'],
      specialties: ['Pédagogie', 'Accompagnement', 'Évaluation'],
    },
  ];
}

/**
 * Génère la FAQ
 */
function generateFAQ(formation: FormationData): FAQItem[] {
  return [
    {
      question: 'Cette formation est-elle éligible au CPF ?',
      answer:
        'Oui, cette formation est éligible au CPF. Nous vous accompagnons dans les démarches.',
    },
    {
      question: 'Quel est le taux de réussite ?',
      answer:
        'Le taux de réussite moyen est de 92% sur les 3 dernières années.',
    },
    {
      question: 'Y a-t-il des prérequis spécifiques ?',
      answer:
        'Les prérequis sont détaillés dans la section dédiée. Nous évaluons chaque candidature.',
    },
    {
      question: "Comment se déroule l'évaluation ?",
      answer:
        "L'évaluation comprend des QCM, des mises en situation et un examen final.",
    },
  ];
}

/**
 * Fonction principale d'enrichissement
 */
async function enrichMarketplaceData(): Promise<void> {
  logger.info("🚀 Début de l'enrichissement de la marketplace...");

  try {
    logger.info('📚 Création des organismes de formation...');

    // Créer les organismes avec un user_id valide
    const adminUser = await prisma.userProfile.findFirst({
      where: { role: 'admin' },
    });

    if (!adminUser) {
      throw new Error('Aucun utilisateur admin trouvé');
    }

    const createdProviders: TrainingOrgData[] = [];

    for (const orgData of trainingOrgsData) {
      const org = await prisma.trainingOrganization.create({
        data: {
          user_id: adminUser.id,
          organization_name: orgData.name,
          description: orgData.description,
          qualiopi_certified: orgData.qualiopi_certified,
          certifications: orgData.certifications,
          partnerships: orgData.partnerships,
          total_courses: orgData.total_courses,
          total_learners: orgData.total_learners,
          average_rating: new Prisma.Decimal(orgData.average_rating),
          verification_status: 'verified',
          verified_at: new Date(),
        },
      });

      createdProviders.push(orgData);
      logger.info(`✅ Organisme créé: ${org.organization_name}`);
    }

    logger.info('📚 Création des formations enrichies...');

    let formationIndex = 0;
    const summary: EnrichmentSummary = {
      formations: 0,
      organismes: createdProviders.length,
      sessions: 0,
      temoignages: 0,
    };

    for (const categoryData of aviationFormationsData) {
      for (const formation of categoryData.formations) {
        const provider =
          createdProviders[formationIndex % createdProviders.length];
        const providerRecord = await prisma.trainingOrganization.findFirst({
          where: { organization_name: provider.name },
        });

        if (!providerRecord) continue;

        const enrichedData = generateEnrichedCourseData(
          formation,
          provider,
          formationIndex,
        );

        // Créer le cours avec toutes les données enrichies
        const course = await prisma.course.create({
          data: {
            title: formation.title,
            description: formation.description,
            provider: {
              connect: { id: providerRecord.id }
            },
            category: categoryData.category,
            course_type: CourseModality.in_person,
            status: 'published',
            duration: formation.duration,
            cpf_eligible: true,
            opco_eligible: true,
            image_url: `https://images.unsplash.com/photo-${1540000000000 + formationIndex}`,
            qualiopi_indicators: [
              'Indicateur 1',
              'Indicateur 2',
              'Indicateur 3',
            ],
            detailed_program: {
              modules: [
                {
                  title: 'Module 1 - Introduction',
                  duration: '2 jours',
                  content: ['Présentation', 'Objectifs', 'Méthodologie'],
                },
                {
                  title: 'Module 2 - Pratique',
                  duration: '3 jours',
                  content: ['Exercices', 'Mises en situation', 'Évaluation'],
                },
              ],
              evaluation: 'QCM + Mise en situation pratique',
              certification: 'Certificat de réussite délivré',
            },
            ...enrichedData,
          } as Prisma.CourseCreateInput,
        });

        summary.formations++;

        // Créer des sessions
        const sessionCount = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < sessionCount; i++) {
          const startDate = new Date();
          startDate.setMonth(startDate.getMonth() + i);

          await prisma.session.create({
            data: {
              course_id: course.id,
              start_date: startDate,
              end_date: new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000),
              location: `${provider.name} - Centre de formation`,
              price: new Prisma.Decimal(formation.price),
              max_seats: 12,
              available_seats: Math.floor(Math.random() * 8) + 4,
            },
          });

          summary.sessions++;
        }

        // Créer des témoignages
        const testimonialCount = 3 + Math.floor(Math.random() * 5);
        for (let i = 0; i < testimonialCount; i++) {
          await prisma.testimonial.create({
            data: {
              course_id: course.id,
              user_name: `Apprenant ${formationIndex}_${i}`,
              user_role: ['Technicien', 'Ingénieur', 'Manager', 'Spécialiste'][
                i % 4
              ],
              content: `Formation excellente, très pratique et conforme aux attentes. ${i % 2 === 0 ? 'Formateurs experts.' : 'Je recommande vivement.'}`,
              rating: 4 + Math.floor(Math.random() * 2),
              is_featured: i === 0,
            },
          });

          summary.temoignages++;
        }

        logger.info(
          `✅ Formation créée: ${formation.title} (${categoryData.category})`,
        );
        formationIndex++;
      }
    }

    logger.info('📊 Mise à jour des statistiques globales...');

    // Mettre à jour les stats globales
    const stats = [
      {
        key: 'total_formations',
        value: summary.formations.toString(),
        label: 'Formations disponibles',
      },
      { key: 'total_apprenants', value: '15420', label: 'Apprenants formés' },
      { key: 'taux_reussite', value: '94%', label: 'Taux de réussite' },
      { key: 'satisfaction', value: '4.8/5', label: 'Satisfaction moyenne' },
    ];

    for (const stat of stats) {
      await prisma.globalStats.upsert({
        where: { key: stat.key },
        update: { value: stat.value, label: stat.label },
        create: stat,
      });
    }

    logger.info('✅ Statistiques globales mises à jour');

    logger.info('🎉 Enrichissement terminé avec succès !');
    logger.info('📊 Résumé :');
    logger.info(`   - ${summary.formations} formations créées`);
    logger.info(`   - ${summary.organismes} organismes de formation`);
    logger.info(`   - ${summary.sessions} sessions programmées`);
    logger.info(`   - ${summary.temoignages} témoignages ajoutés`);
  } catch (error) {
    logger.error("❌ Erreur lors de l'enrichissement:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécution du script
enrichMarketplaceData().catch((error) => {
  logger.error('Script failed:', error);
  process.exit(1);
});
