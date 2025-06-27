import { Course, User, Enrollment } from '@/types';

// 8 formations hardcodées - 2 par modalité
export const demoCoursesData: Course[] = [
  // === E-LEARNING (2 formations) ===
  {
    id: '1',
    title: 'Sûreté Aéroportuaire - Module Certification',
    description: 'Formation complète en e-learning pour obtenir votre badge d\'accès aux zones réglementées des aéroports. Conforme aux exigences DGAC et réglementations européennes.',
    image: '/images/placeholder-surete-aeroport.jpg',
    provider: 'AeroSecure Training',
    providerId: 'provider-1',
    category: 'Sécurité Aéroportuaire',
    type: 'online',
    status: 'published',
    objectives: 'Comprendre les enjeux de la sûreté aéroportuaire, maîtriser les procédures de contrôle d\'accès, appliquer les mesures de sécurité en zones réglementées, identifier les menaces et comportements suspects.',
    requirements: 'Aucun prérequis - Accessible à tous',
    targetAudience: 'Personnel aéroportuaire, agents de sûreté, nouveaux employés secteur aviation',
    program: `Module 1: Contexte réglementaire (3h) - Réglementation nationale et internationale, responsabilités des acteurs aéroportuaires, evolution des menaces sécuritaires. Module 2: Zones et accès aéroportuaires (4h) - Classification des zones aéroportuaires, procédures de contrôle d'accès, gestion des badges et autorisations. Module 3: Détection et intervention (3h) - Identification des comportements suspects, procédures d'alerte et d'intervention, coordination avec les forces de sécurité. Module 4: Cas pratiques et certification (2h) - Études de cas concrets, examen de certification, délivrance du certificat.`,
    qualiopiIndicators: ['Qualiopi', 'DGAC Approuvé', 'Badge Zone Critique'],
    language: 'Français',
    classificationNumber: 'RNCP 34520',
    successRate: 96,
    satisfactionRate: 4.7,
    validityDuration: '5 ans',
    targetCertification: 'Badge d\'accès zones réglementées',
    programPdfUrl: '/pdfs/programme-surete-aeroport.pdf',
    duration: '12 heures',
    cpfEligible: true,
    opcoEligible: true,
    sessions: [
      {
        id: 'session-1-1',
        courseId: '1',
        startDate: '2024-02-01',
        endDate: '2024-02-01',
        price: 350,
        availableSeats: 50,
        location: 'En ligne'
      }
    ]
  },
  {
    id: '2',
    title: 'Formation Anglais Technique Aéronautique ICAO Niveau 4',
    description: 'Perfectionnez votre anglais technique aviation avec cette formation e-learning interactive. Préparation à l\'examen ICAO Level 4.',
    image: '/images/placeholder-anglais-aviation.jpg',
    provider: 'AeroLanguage Institute',
    providerId: 'provider-2',
    category: 'Langues Techniques',
    type: 'online',
    status: 'published',
    objectives: 'Atteindre le niveau ICAO 4 en anglais aviation, maîtriser la phraséologie aéronautique standard, communiquer efficacement en situation d\'urgence, comprendre les documents techniques en anglais.',
    requirements: 'Niveau B1 minimum en anglais général',
    targetAudience: 'Pilotes, contrôleurs aériens, personnel technique aviation',
    program: `Module 1: Phraséologie de base (10h) - Communications sol-air, procédures de départ et d'arrivée, gestion du trafic aérien. Module 2: Situations d'urgence (10h) - Communications d'urgence, procédures de détresse, phraséologie spécialisée. Module 3: Documentation technique (10h) - Lecture de manuels techniques, compréhension des NOTAM, interprétation des cartes aéronautiques. Module 4: Certification ICAO (10h) - Préparation à l'examen, tests blancs, certification officielle.`,
    qualiopiIndicators: ['ICAO Approved', 'DGAC Reconnu', 'Qualiopi'],
    language: 'Bilingue (Français/Anglais)',
    classificationNumber: 'RS 5544',
    successRate: 89,
    satisfactionRate: 4.6,
    validityDuration: '3 ans',
    targetCertification: 'Certificat ICAO Level 4',
    programPdfUrl: '/pdfs/programme-anglais-icao.pdf',
    duration: '40 heures',
    cpfEligible: true,
    opcoEligible: true,
    sessions: [
      {
        id: 'session-2-1',
        courseId: '2',
        startDate: '2024-02-05',
        endDate: '2024-04-05',
        price: 595,
        availableSeats: 30,
        location: 'Plateforme e-learning'
      }
    ]
  },

  // === DISTANCIEL (2 formations) ===
  {
    id: '3',
    title: 'Maintenance Aéronefs Part 66 - Module Avionique',
    description: 'Formation distancielle approfondie en avionique pour techniciens aéronautiques. Préparation à la licence Part 66 avec travaux pratiques virtuels.',
    image: '/images/placeholder-maintenance-avionique.jpg',
    provider: 'TechAero Academy',
    providerId: 'provider-3',
    category: 'Maintenance Aéronautique',
    type: 'virtual',
    status: 'published',
    objectives: 'Obtenir la qualification Part 66 Module Avionique, maîtriser les systèmes électroniques des aéronefs, diagnostiquer et réparer les pannes avioniques, appliquer les procédures de maintenance réglementaires.',
    requirements: 'CAP/BEP technique ou équivalent, expérience maintenance recommandée',
    targetAudience: 'Techniciens maintenance, mécaniciens aéronautiques, ingénieurs avionique',
    program: `Semaine 1-2: Fondamentaux électroniques (20h) - Électricité et électronique de base, circuits numériques et analogiques, systèmes de communication. Semaine 3-4: Systèmes avioniques (20h) - Navigation et pilotage automatique, systèmes d'affichage, communications radio. Semaine 5-6: Maintenance pratique (20h) - Diagnostic de pannes (simulation), procédures de réparation, documentation technique. Semaine 7-8: Certification (20h) - Révisions et approfondissements, examen Part 66, validation des compétences.`,
    qualiopiIndicators: ['EASA Part 66', 'DGAC Approuvé', 'Qualiopi'],
    language: 'Français',
    classificationNumber: 'RNCP 34190',
    successRate: 92,
    satisfactionRate: 4.8,
    validityDuration: 'À vie',
    targetCertification: 'Licence Part 66 Module Avionique',
    programPdfUrl: '/pdfs/programme-maintenance-avionique.pdf',
    duration: '80 heures (8 semaines)',
    cpfEligible: true,
    opcoEligible: true,
    sessions: [
      {
        id: 'session-3-1',
        courseId: '3',
        startDate: '2024-03-01',
        endDate: '2024-04-26',
        price: 1450,
        availableSeats: 15,
        location: 'Classes virtuelles Zoom'
      },
      {
        id: 'session-3-2',
        courseId: '3',
        startDate: '2024-05-06',
        endDate: '2024-06-28',
        price: 1450,
        availableSeats: 18,
        location: 'Classes virtuelles Teams'
      }
    ]
  },
  {
    id: '4',
    title: 'Contrôle Aérien - Procédures d\'Approche ILS',
    description: 'Formation spécialisée en contrôle d\'approche aux instruments. Simulation temps réel et procédures avancées pour contrôleurs certifiés.',
    image: '/images/placeholder-controle-aerien.jpg',
    provider: 'ATC Training Center',
    providerId: 'provider-4',
    category: 'Contrôle Aérien',
    type: 'virtual',
    status: 'published',
    objectives: 'Maîtriser les procédures ILS complexes, gérer le trafic d\'approche haute densité, appliquer les procédures d\'urgence approche, optimiser la fluidité du trafic.',
    requirements: 'Licence contrôleur aérien en cours de validité',
    targetAudience: 'Contrôleurs aériens confirmés, instructeurs ATC, superviseurs tours de contrôle',
    program: `Module 1: Théorie ILS avancée (15h) - Systèmes ILS Cat I, II, III, procédures de précision, gestion des minimums météo. Module 2: Simulation contrôle (25h) - Simulateur haute fidélité ATC, scénarios complexes temps réel, gestion multi-pistes. Module 3: Situations d'urgence (10h) - Procédures d'urgence approche, coordination avec les services, gestion de crise. Module 4: Évaluation pratique (10h) - Tests de compétences, évaluation continue, certification finale.`,
    qualiopiIndicators: ['DGAC Approuvé', 'EUROCONTROL Certified', 'Qualiopi'],
    language: 'Français/Anglais',
    classificationNumber: 'RS 5677',
    successRate: 94,
    satisfactionRate: 4.9,
    validityDuration: '2 ans',
    targetCertification: 'Qualification ILS Avancée',
    programPdfUrl: '/pdfs/programme-controle-aerien.pdf',
    duration: '60 heures (10 semaines)',
    cpfEligible: false,
    opcoEligible: true,
    sessions: [
      {
        id: 'session-4-1',
        courseId: '4',
        startDate: '2024-03-15',
        endDate: '2024-05-17',
        price: 2200,
        availableSeats: 8,
        location: 'Simulateur ATC Virtuel'
      }
    ]
  },

  // === SEMI-PRÉSENTIEL (2 formations) ===
  {
    id: '5',
    title: 'Formation Pilote Privé PPL - Théorie + Pratique',
    description: 'Formation complète pilote privé combinant cours théoriques en ligne et vols pratiques. De zéro à votre licence PPL en 6 mois.',
    image: '/images/placeholder-formation-pilote.jpg',
    provider: 'Aero Club Formation',
    providerId: 'provider-5',
    category: 'Pilotage',
    type: 'blended',
    status: 'published',
    objectives: 'Obtenir la licence de pilote privé PPL, maîtriser le pilotage VFR, naviguer en sécurité sur tout le territoire, voler avec passagers.',
    requirements: 'Certificat médical classe 2, 17 ans minimum',
    targetAudience: 'Futurs pilotes privés, reconversion professionnelle, passion aviation',
    program: `Phase 1: Théorie en ligne (100h) - Réglementation aérienne, navigation et météorologie, aérodynamique et mécanique du vol, communications radio. Phase 2: Formation pratique (45h vol) - Vol local et perfectionnement, navigation et atterrissages extérieurs, vol de nuit (si option), test en vol avec examinateur. Phase 3: Préparation examens (50h) - QCM théorique DGAC, préparation test pratique, révisions et perfectionnement.`,
    qualiopiIndicators: ['DGAC Approuvé', 'FFA Certifié', 'Qualiopi'],
    language: 'Français',
    classificationNumber: 'RNCP 34588',
    successRate: 87,
    satisfactionRate: 4.9,
    validityDuration: 'À vie (revalidation tous les 2 ans)',
    targetCertification: 'Licence de Pilote Privé (PPL)',
    programPdfUrl: '/pdfs/programme-formation-pilote.pdf',
    duration: '195 heures (6 mois)',
    cpfEligible: true,
    opcoEligible: false,
    sessions: [
      {
        id: 'session-5-1',
        courseId: '5',
        startDate: '2024-04-01',
        endDate: '2024-09-30',
        price: 8500,
        availableSeats: 6,
        location: 'Aérodrome Lognes-Emerainville'
      },
      {
        id: 'session-5-2',
        courseId: '5',
        startDate: '2024-06-01',
        endDate: '2024-11-30',
        price: 8500,
        availableSeats: 8,
        location: 'Aérodrome Meaux-Esbly'
      }
    ]
  },
  {
    id: '6',
    title: 'Agent de Piste - Certification Complete IATA',
    description: 'Formation hybride d\'agent de piste aéroportuaire. Théorie en ligne + pratique terrain pour manipulation bagages, chargement et sécurité.',
    image: '/images/placeholder-agent-piste.jpg',
    provider: 'Ground Handling Academy',
    providerId: 'provider-6',
    category: 'Operations Aéroportuaires',
    type: 'blended',
    status: 'published',
    objectives: 'Obtenir la certification agent de piste IATA, maîtriser les opérations de handling, assurer la sécurité des opérations au sol, utiliser les équipements spécialisés.',
    requirements: 'Certificat médical, casier judiciaire vierge, 18 ans minimum',
    targetAudience: 'Demandeurs d\'emploi, reconversion, personnel aéroportuaire, jeunes diplômés',
    program: `Semaine 1-2: Théorie fondamentale (40h en ligne) - Sécurité aéroportuaire et FOD, procédures de chargement/déchargement, communication et coordination, réglementation IATA. Semaine 3: Formation terrain (40h pratique) - Manipulation des bagages et fret, utilisation équipements GSE, procédures push-back et remorquage, exercices situations réelles. Semaine 4: Perfectionnement (40h mixte) - Révisions théoriques, examens pratiques, certification IATA.`,
    qualiopiIndicators: ['IATA Certified', 'DGAC Approuvé', 'Qualiopi'],
    language: 'Français',
    classificationNumber: 'RS 5234',
    successRate: 93,
    satisfactionRate: 4.5,
    validityDuration: '3 ans',
    targetCertification: 'Certificat Agent de Piste IATA',
    programPdfUrl: '/pdfs/programme-agent-piste.pdf',
    duration: '120 heures (4 semaines)',
    cpfEligible: true,
    opcoEligible: true,
    sessions: [
      {
        id: 'session-6-1',
        courseId: '6',
        startDate: '2024-03-18',
        endDate: '2024-04-12',
        price: 1850,
        availableSeats: 12,
        location: 'Aéroport Roissy CDG - Zone Cargo'
      },
      {
        id: 'session-6-2',
        courseId: '6',
        startDate: '2024-05-13',
        endDate: '2024-06-07',
        price: 1850,
        availableSeats: 14,
        location: 'Aéroport Orly - Terminal Sud'
      }
    ]
  },

  // === PRÉSENTIEL (2 formations) ===
  {
    id: '7',
    title: 'Hôtesse de l\'Air / Steward - Formation Initiale CCA',
    description: 'Formation présentielle intensive pour devenir personnel navigant commercial. Préparation complète au Certificat de Membre d\'Équipage de Cabine.',
    image: '/images/placeholder-hotesse-steward.jpg',
    provider: 'Cabin Crew Training Institute',
    providerId: 'provider-7',
    category: 'Personnel Navigant',
    type: 'in-person',
    status: 'published',
    objectives: 'Obtenir le Certificat CCA (Cabin Crew Attestation), maîtriser les procédures de sécurité en cabine, assurer le service commercial de qualité, gérer les situations d\'urgence à bord.',
    requirements: 'Bac ou équivalent, certificat médical classe 2, niveau B1 anglais, 18 ans minimum',
    targetAudience: 'Futurs hôtesses/stewards, reconversion professionnelle, jeunes diplômés',
    program: `Semaine 1: Sécurité et secours (35h) - Équipements de sécurité et évacuation, premiers secours et réanimation, gestion d'urgences médicales, procédures incendie et décompression. Semaine 2: Procédures opérationnelles (35h) - Communication équipage/cockpit, procédures pré-vol et post-vol, gestion des passagers difficiles, réglementation aérienne. Semaine 3: Service commercial (35h) - Techniques de service en cabine, vente à bord et duty-free, protocole et savoir-vivre, communication multiculturelle. Semaine 4: Certification (35h) - Révisions et approfondissements, examens théoriques et pratiques, simulation situations réelles, délivrance certificat CCA.`,
    qualiopiIndicators: ['DGAC CCA', 'EASA Approved', 'Qualiopi'],
    language: 'Français/Anglais',
    classificationNumber: 'RNCP 34344',
    successRate: 91,
    satisfactionRate: 4.8,
    validityDuration: '5 ans (revalidation annuelle)',
    targetCertification: 'Certificat de Membre d\'Équipage de Cabine (CCA)',
    programPdfUrl: '/pdfs/programme-hotesse-steward.pdf',
    duration: '140 heures (4 semaines)',
    cpfEligible: true,
    opcoEligible: true,
    sessions: [
      {
        id: 'session-7-1',
        courseId: '7',
        startDate: '2024-04-08',
        endDate: '2024-05-03',
        price: 3200,
        availableSeats: 4,
        location: 'Centre de formation Roissy'
      },
      {
        id: 'session-7-2',
        courseId: '7',
        startDate: '2024-06-10',
        endDate: '2024-07-05',
        price: 3200,
        availableSeats: 12,
        location: 'Centre de formation Orly'
      }
    ]
  },
  {
    id: '8',
    title: 'Soudage Aéronautique - Certification EN 4179',
    description: 'Formation présentielle spécialisée en soudage pour l\'industrie aéronautique. Techniques TIG, plasma et certification selon normes EN 4179.',
    image: '/images/placeholder-soudage-aeronautique.jpg',
    provider: 'AeroWeld Training Center',
    providerId: 'provider-8',
    category: 'Fabrication Aéronautique',
    type: 'in-person',
    status: 'published',
    objectives: 'Obtenir la certification EN 4179 soudage aéronautique, maîtriser le soudage TIG sur alliages aviation, appliquer les procédures qualité aéronautique, souder selon les standards Airbus/Boeing.',
    requirements: 'Expérience soudage général, CAP/BEP métallurgie ou équivalent',
    targetAudience: 'Soudeurs expérimentés, techniciens aéronautiques, reconversion industrie',
    program: `Semaine 1: Fondamentaux aéronautiques (40h) - Métallurgie des alliages aviation, normes et procédures EN 4179, préparation des pièces, contrôle qualité. Semaine 2: Techniques avancées (40h) - Soudage TIG aluminium aviation, soudage aciers inoxydables, techniques plasma et laser, réparation de pièces critiques. Semaine 3: Certification (40h) - Tests de qualification, soudure de pièces étalons, contrôles destructifs/non-destructifs, certification EN 4179.`,
    qualiopiIndicators: ['EN 4179 Certified', 'Airbus Approved', 'Qualiopi'],
    language: 'Français',
    classificationNumber: 'RS 5891',
    successRate: 88,
    satisfactionRate: 4.7,
    validityDuration: '3 ans',
    targetCertification: 'Certificat de Soudage Aéronautique EN 4179',
    programPdfUrl: '/pdfs/programme-soudage-aeronautique.pdf',
    duration: '120 heures (3 semaines)',
    cpfEligible: true,
    opcoEligible: true,
    sessions: [
      {
        id: 'session-8-1',
        courseId: '8',
        startDate: '2024-05-06',
        endDate: '2024-05-24',
        price: 2800,
        availableSeats: 6,
        location: 'Atelier Soudage Toulouse'
      },
      {
        id: 'session-8-2',
        courseId: '8',
        startDate: '2024-07-01',
        endDate: '2024-07-19',
        price: 2800,
        availableSeats: 7,
        location: 'Centre technique Bordeaux'
      }
    ]
  }
];

// Autres données demo existantes...
export const demoUsersData: User[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    role: 'student',
    verified: true
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@airfrance.fr',
    role: 'manager',
    organization: 'Air France',
    verified: true
  }
];

export const demoEnrollmentsData: Enrollment[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    sessionId: 'session-1-1',
    enrollmentDate: '2024-01-20',
    status: 'approved',
    paymentStatus: 'paid'
  },
  {
    id: '2',
    userId: '1',
    courseId: '5',
    sessionId: 'session-5-1',
    enrollmentDate: '2024-01-18',
    status: 'approved',
    paymentStatus: 'paid'
  }
];
