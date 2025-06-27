export interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  category: string;
  type: 'online' | 'in-person' | 'blended';
  duration: string;
  objectives: string[];
  targetAudience: string[];
  requirements: string[];
  program: ProgramItem[];
  qualiopiIndicators: string[];
  sessions: Session[];
}

export interface ProgramItem {
  title: string;
  description: string;
}

export interface Session {
  id: string;
  date: string;
  location: string;
  price: number;
  availableSeats: number;
}

export const courses: Course[] = [
  {
    id: "course-1",
    title: "Devenir un As du pilotage de drone",
    description: "Formation intensive pour maîtriser le pilotage de drone et obtenir votre certification.",
    provider: "Drone Academy",
    category: "Drones",
    type: "blended",
    duration: "3 jours",
    objectives: [
      "Maîtriser les bases du pilotage de drone",
      "Obtenir la certification de pilote de drone",
      "Connaître la réglementation en vigueur",
      "Réaliser des prises de vues aériennes de qualité"
    ],
    targetAudience: [
      "Débutants souhaitant devenir pilotes de drone",
      "Professionnels souhaitant utiliser un drone dans leur activité",
      "Passionnés de nouvelles technologies"
    ],
    requirements: [
      "Avoir 16 ans minimum",
      "Être en bonne condition physique",
      "Ne pas avoir de contre-indication médicale au pilotage de drone"
    ],
    program: [
      {
        title: "Jour 1 : Théorie",
        description: "Présentation du drone, de son fonctionnement et de la réglementation."
      },
      {
        title: "Jour 2 : Pratique",
        description: "Exercices de pilotage sur simulateur et en extérieur."
      },
      {
        title: "Jour 3 : Examen",
        description: "Examen théorique et pratique pour obtenir la certification."
      }
    ],
    qualiopiIndicators: [
      "Satisfaction des stagiaires",
      "Taux de réussite à l'examen",
      "Nombre de certifications délivrées"
    ],
    sessions: [
      {
        id: "session-1",
        date: "2024-09-15",
        location: "Paris",
        price: 1200,
        availableSeats: 10
      },
      {
        id: "session-2",
        date: "2024-10-20",
        location: "Lyon",
        price: 1350,
        availableSeats: 5
      },
      {
        id: "session-3",
        date: "2024-11-25",
        location: "Marseille",
        price: 1350,
        availableSeats: 8
      }
    ]
  },
  {
    id: "course-2",
    title: "Initiation au code avec Javascript",
    description: "Découvrez les bases de la programmation avec Javascript et créez vos premières pages web interactives.",
    provider: "WebStart",
    category: "Développement Web",
    type: "online",
    duration: "30 heures",
    objectives: [
      "Comprendre les concepts de base de la programmation",
      "Maîtriser la syntaxe de Javascript",
      "Créer des pages web interactives",
      "Développer des petits jeux en Javascript"
    ],
    targetAudience: [
      "Débutants souhaitant apprendre à coder",
      "Personnes en reconversion professionnelle",
      "Étudiants souhaitant acquérir des compétences en programmation"
    ],
    requirements: [
      "Avoir un ordinateur avec une connexion internet",
      "Être motivé et curieux",
      "Aucune connaissance préalable en programmation n'est requise"
    ],
    program: [
      {
        title: "Module 1 : Introduction à Javascript",
        description: "Présentation de Javascript, de son histoire et de son utilisation."
      },
      {
        title: "Module 2 : Les bases de la programmation",
        description: "Variables, types de données, opérateurs, conditions, boucles."
      },
      {
        title: "Module 3 : Le DOM",
        description: "Manipulation du DOM avec Javascript."
      },
      {
        title: "Module 4 : Les événements",
        description: "Gestion des événements avec Javascript."
      },
      {
        title: "Module 5 : Projet final",
        description: "Création d'une page web interactive ou d'un petit jeu en Javascript."
      }
    ],
    qualiopiIndicators: [
      "Satisfaction des stagiaires",
      "Taux de complétion de la formation",
      "Nombre de projets réalisés"
    ],
    sessions: [
      {
        id: "session-4",
        date: "2024-09-01",
        location: "Online",
        price: 499,
        availableSeats: 0
      },
      {
        id: "session-5",
        date: "2024-10-01",
        location: "Online",
        price: 499,
        availableSeats: 15
      }
    ]
  },
  {
    id: "course-3",
    title: "Excel : Maîtriser les Tableaux Croisés Dynamiques",
    description: "Apprenez à utiliser les tableaux croisés dynamiques d'Excel pour analyser et synthétiser vos données.",
    provider: "Data Skills",
    category: "Bureautique",
    type: "in-person",
    duration: "2 jours",
    objectives: [
      "Créer des tableaux croisés dynamiques",
      "Analyser et synthétiser des données",
      "Personnaliser l'affichage des tableaux",
      "Utiliser les fonctions avancées des tableaux croisés dynamiques"
    ],
    targetAudience: [
      "Professionnels souhaitant améliorer leurs compétences en Excel",
      "Analystes de données",
      "Contrôleurs de gestion"
    ],
    requirements: [
      "Avoir une connaissance de base d'Excel",
      "Apporter son ordinateur portable avec Excel installé"
    ],
    program: [
      {
        title: "Jour 1 : Les bases des tableaux croisés dynamiques",
        description: "Création, manipulation et personnalisation des tableaux croisés dynamiques."
      },
      {
        title: "Jour 2 : Fonctions avancées",
        description: "Calculs, filtres, graphiques et autres fonctions avancées."
      }
    ],
    qualiopiIndicators: [
      "Satisfaction des stagiaires",
      "Taux d'utilisation des tableaux croisés dynamiques après la formation",
      "Nombre d'heures gagnées grâce à l'utilisation des tableaux croisés dynamiques"
    ],
    sessions: [
      {
        id: "session-6",
        date: "2024-09-20",
        location: "Toulouse",
        price: 750,
        availableSeats: 6
      }
    ]
  },
  {
    id: "course-4",
    title: "Marketing Digital : Stratégies Avancées",
    description: "Devenez un expert en marketing digital et développez des stratégies performantes pour votre entreprise.",
    provider: "Digital Boost",
    category: "Marketing",
    type: "online",
    duration: "40 heures",
    objectives: [
      "Définir une stratégie de marketing digital",
      "Utiliser les différents canaux de marketing digital",
      "Mesurer et optimiser les performances des campagnes",
      "Se tenir informé des dernières tendances du marketing digital"
    ],
    targetAudience: [
      "Professionnels du marketing",
      "Chefs d'entreprise",
      "Consultants"
    ],
    requirements: [
      "Avoir une connaissance de base du marketing",
      "Être à l'aise avec les outils informatiques"
    ],
    program: [
      {
        title: "Module 1 : Stratégie de marketing digital",
        description: "Définition des objectifs, identification de la cible, positionnement."
      },
      {
        title: "Module 2 : SEO",
        description: "Optimisation du référencement naturel."
      },
      {
        title: "Module 3 : SEA",
        description: "Publicité en ligne (Google Ads, etc.)."
      },
      {
        title: "Module 4 : Social Media Marketing",
        description: "Marketing sur les réseaux sociaux."
      },
      {
        title: "Module 5 : Email Marketing",
        description: "Campagnes d'emailing."
      },
      {
        title: "Module 6 : Analyse des performances",
        description: "Mesure et optimisation des performances des campagnes."
      }
    ],
    qualiopiIndicators: [
      "Satisfaction des stagiaires",
      "Augmentation du chiffre d'affaires des entreprises après la formation",
      "Nombre de certifications délivrées"
    ],
    sessions: [
      {
        id: "session-7",
        date: "2024-09-05",
        location: "Online",
        price: 999,
        availableSeats: 20
      }
    ]
  }
];

// Add the missing function
export const handleLMSRedirect = async (sessionId: string, userId: string) => {
  try {
    console.log(`Redirecting user ${userId} to LMS for session ${sessionId}`);
    
    // This would typically be an API call to your LMS system
    // For now, we'll just simulate a successful redirect
    return Promise.resolve({
      success: true,
      redirectUrl: `/lms/course/test-aviation-safety`
    });
  } catch (error) {
    console.error("Error redirecting to LMS:", error);
    return Promise.reject("Failed to redirect to LMS");
  }
};

// Add the quiz content to the modules in testCourseData
export const testCourseData = {
  title: "Sécurité Aérienne : Fondamentaux",
  description: "Formation complète sur les fondamentaux de la sécurité aérienne pour le personnel navigant et au sol.",
  provider: "Aviation Safety Institute",
  duration: "4 heures",
  modules: [
    {
      id: "module-1",
      title: "Introduction à la Sécurité Aérienne",
      content: `
        <h3>Objectifs du module</h3>
        <p>Ce module vise à vous familiariser avec les concepts fondamentaux de la sécurité aérienne et l'importance de son application rigoureuse dans toutes les opérations.</p>
        
        <h3>Points clés</h3>
        <ul>
          <li>Histoire et évolution des normes de sécurité aérienne</li>
          <li>Cadre réglementaire international (OACI) et européen (EASA)</li>
          <li>Culture de sécurité et facteurs humains</li>
          <li>Systèmes de gestion de la sécurité (SGS)</li>
        </ul>
        
        <h3>1. Histoire et cadre réglementaire</h3>
        <p>L'évolution des normes de sécurité aérienne est intimement liée à l'histoire de l'aviation civile. Chaque avancée majeure en matière de sécurité est souvent née d'incidents ou d'accidents qui ont conduit à une meilleure compréhension des risques.</p>
        
        <p>L'Organisation de l'Aviation Civile Internationale (OACI) établit les normes internationales, tandis que l'Agence Européenne de la Sécurité Aérienne (EASA) les met en œuvre au niveau européen avec des spécificités régionales.</p>
        
        <h3>2. Culture de sécurité</h3>
        <p>Une culture de sécurité positive encourage le signalement des incidents, même mineurs, sans crainte de sanction. Cette approche non punitive est essentielle pour collecter des données précieuses sur les précurseurs d'accidents potentiels.</p>
      `,
      duration: "45 minutes",
      quiz: {
        questions: [
          {
            question: "Quel organisme établit les normes internationales de sécurité aérienne?",
            options: ["FAA", "OACI", "EASA", "DGAC"],
            correctAnswer: 1
          },
          {
            question: "Qu'est-ce qui caractérise une culture de sécurité positive?",
            options: [
              "Sanctionner systématiquement les erreurs",
              "Encourager le signalement des incidents sans crainte",
              "Limiter le partage d'information entre services",
              "Centraliser toutes les décisions au niveau managérial"
            ],
            correctAnswer: 1
          },
          {
            question: "Que signifie SGS dans le contexte aéronautique?",
            options: [
              "Système Global de Surveillance",
              "Service de Gestion des Situations",
              "Système de Gestion de la Sécurité",
              "Standard Guidé de Sûreté"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      id: "module-2",
      title: "Identification des Risques",
      content: `
        <h3>Objectifs du module</h3>
        <p>Ce module vous apprendra à identifier, classifier et évaluer les risques potentiels dans l'environnement aéronautique.</p>
        
        <h3>Points clés</h3>
        <ul>
          <li>Méthodologies d'identification des dangers</li>
          <li>Évaluation et hiérarchisation des risques</li>
          <li>Matrices de risques et critères d'acceptabilité</li>
          <li>Notification des événements de sécurité</li>
        </ul>
        
        <h3>1. Identification des dangers</h3>
        <p>L'identification proactive des dangers constitue la première étape de tout processus de gestion des risques. Elle peut s'appuyer sur différentes sources:</p>
        <ul>
          <li>Audits et inspections</li>
          <li>Rapports d'incidents</li>
          <li>Retours d'expérience</li>
          <li>Analyse des données de vol</li>
        </ul>
        
        <h3>2. Évaluation des risques</h3>
        <p>Une fois les dangers identifiés, il convient d'évaluer le risque associé en termes de probabilité d'occurrence et de gravité des conséquences potentielles.</p>
        
        <p>La matrice de risque permet de visualiser et de classer les risques selon ces deux dimensions, facilitant ainsi la prise de décision quant aux mesures d'atténuation à mettre en œuvre.</p>
      `,
      duration: "60 minutes",
      quiz: {
        questions: [
          {
            question: "Quelle est la première étape du processus de gestion des risques?",
            options: [
              "L'implémentation des mesures correctives",
              "L'évaluation de la gravité",
              "L'identification proactive des dangers",
              "La documentation des procédures"
            ],
            correctAnswer: 2
          },
          {
            question: "Quels sont les deux paramètres principaux utilisés dans une matrice de risque?",
            options: [
              "Coût et délai",
              "Impact et urgence",
              "Probabilité et gravité",
              "Complexité et visibilité"
            ],
            correctAnswer: 2
          },
          {
            question: "Quelle source d'information n'est PAS typiquement utilisée pour l'identification des dangers?",
            options: [
              "Les audits de sécurité",
              "Les rapports d'incidents",
              "Les pronostics météorologiques à long terme",
              "L'analyse des données de vol"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      id: "module-3",
      title: "Mesures de Prévention",
      content: `
        <h3>Objectifs du module</h3>
        <p>Ce module présente les différentes stratégies et mesures permettant de prévenir les incidents et accidents dans l'aviation.</p>
        
        <h3>Points clés</h3>
        <ul>
          <li>Barrières de sécurité et défense en profondeur</li>
          <li>Formation et sensibilisation du personnel</li>
          <li>Standardisation des procédures</li>
          <li>Communication efficace et travail d'équipe</li>
        </ul>
        
        <h3>1. Concept de défense en profondeur</h3>
        <p>La sécurité aérienne repose sur un principe de "défense en profondeur" avec plusieurs couches de protection. Un incident grave ou un accident se produit généralement lorsque plusieurs barrières de sécurité sont compromises simultanément.</p>
        
        <p>Ces barrières peuvent être:</p>
        <ul>
          <li>Techniques (systèmes redondants, alertes automatisées)</li>
          <li>Procédurales (checklists, protocoles standardisés)</li>
          <li>Humaines (formation, conscience situationnelle)</li>
          <li>Organisationnelles (culture de sécurité, supervision)</li>
        </ul>
        
        <h3>2. Importance de la formation</h3>
        <p>La formation initiale et continue constitue l'un des piliers de la prévention des incidents. Elle doit couvrir non seulement les aspects techniques mais également les compétences non-techniques comme la gestion des ressources (CRM/TRM).</p>
      `,
      duration: "75 minutes",
      quiz: {
        questions: [
          {
            question: "Qu'est-ce que le concept de 'défense en profondeur' en sécurité aérienne?",
            options: [
              "La protection physique des installations aéroportuaires",
              "L'utilisation de plusieurs couches de protection",
              "L'application de mesures de cybersécurité avancées", 
              "Le renforcement des cockpits des aéronefs"
            ],
            correctAnswer: 1
          },
          {
            question: "Que signifie l'acronyme CRM dans le contexte de la sécurité aérienne?",
            options: [
              "Control and Reporting Mechanism",
              "Critical Risk Management",
              "Crew Resource Management",
              "Certified Regulation Method"
            ],
            correctAnswer: 2
          },
          {
            question: "Parmi ces éléments, lequel n'est PAS une barrière de sécurité typique?",
            options: [
              "Les systèmes d'alerte automatisés",
              "Les checklists standardisées",
              "Les campagnes publicitaires pour les compagnies aériennes",
              "La formation aux facteurs humains"
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  ],
  quiz: {
    title: "Évaluation Finale - Sécurité Aérienne: Fondamentaux",
    questions: [
      {
        question: "Quelle affirmation concernant la culture de sécurité est correcte?",
        options: [
          "Elle doit être principalement punitive pour être efficace",
          "Elle concerne uniquement le personnel navigant",
          "Elle encourage le signalement transparent des incidents",
          "Elle est secondaire par rapport aux aspects techniques"
        ],
        correctAnswer: 2
      },
      {
        question: "Quels sont les deux paramètres utilisés pour évaluer un risque?",
        options: [
          "Coût et bénéfice",
          "Probabilité et gravité",
          "Durée et complexité",
          "Visibilité et impact médiatique"
        ],
        correctAnswer: 1
      },
      {
        question: "Pourquoi la standardisation des procédures est-elle importante en aviation?",
        options: [
          "Pour réduire les coûts opérationnels uniquement",
          "Pour faciliter la rotation du personnel",
          "Pour réduire la variabilité et les erreurs potentielles",
          "Pour simplifier la formation initiale seulement"
        ],
        correctAnswer: 2
      },
      {
        question: "Comment fonctionne le principe de défense en profondeur?",
        options: [
          "En concentrant toutes les ressources sur la prévention d'un seul type d'incident",
          "En créant plusieurs couches de protection indépendantes",
          "En formant uniquement les pilotes aux procédures d'urgence",
          "En augmentant la résistance physique des aéronefs"
        ],
        correctAnswer: 1
      },
      {
        question: "Quel organisme est responsable des normes de sécurité aérienne au niveau européen?",
        options: [
          "OACI",
          "FAA",
          "EASA",
          "IATA"
        ],
        correctAnswer: 2
      }
    ]
  }
};
