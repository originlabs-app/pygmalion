**PROJET – PYGMALION**

---

**BRIEF LMS (Learning Machine System)**

**Attentes & Besoins**

---

Dans un contexte où capter et maintenir l'attention des apprenants est un enjeu central pour garantir la qualité des formations, il est impératif de s'appuyer sur les technologies les plus avancées pour concevoir des expériences pédagogiques véritablement interactives.

Notre LMS doit ainsi évoluer vers un outil pédagogique de référence, capable de supporter des séances collaboratives et enrichies dans un environnement totalement sécurisé. Qu'il s'agisse de formations en e-learning, en présentiel, en semi-présentiel ou hybride, la plateforme doit se montrer parfaitement adaptable, performante et immersive. Elle doit faciliter l'engagement, stimuler l'échange, et devenir un levier d'apprentissage actif, cohérent avec les exigences modernes de la formation professionnelle.

Parallèlement, la sécurité de l'environnement d'apprentissage doit rester une priorité : il est fondamental d'assurer la sécurisation du process d'apprentissage. La plateforme devra intégrer des outils permettant de pouvoir contrôler la fraude lors des sessions de formation.

Il est aussi essentiel d'anticiper les évolutions pédagogiques à venir en intégrant dès aujourd'hui une architecture ouverte, capable de s'adapter aux innovations immersives telles que la réalité virtuelle, la 3D ou les environnements métavers.

**1. Sécurité & Anti-fraude**

**1.1 Authentification et identification (accès unique pour accéder à la MP et au LMS)**

* KYC obligatoire à l'inscription (connexion unique (SSO) entre MP et LMS)
* Authentification multi-facteur (MFA) à chaque connexion (connexion unique (SSO) entre MP et LMS)
* Reconnaissance biométrique périodique pendant les sessions (ex. reconnaissance faciale)
* Horodatage sécurisé des connexions et activités utilisateurs

**1.2 Surveillance des sessions**

**Proctoring intelligent (antitriche) :**
* Détection de comportements suspects (regards hors écran, changement de fenêtre, voix tierces…)
* Enregistrement vidéo/audio pendant les examens avec stockage crypté
* Alerte live au formateur / à l'OF
* Utilisation webcam pour rapprochement avec données biométriques (prise de photos à intervalle régulier (intervalle à définir) et comparaison avec les données antérieures)
* Logs d'activité détaillés (temps passé, clics, interactions, réponses)

**1.3 Traçabilité**

* Historique complet des formations consultables par les utilisateurs (audit trail)

**2. Optimisation pédagogique & Interactivité**

**2.1 Formats de contenus**

* Facilité d'intégration de contenu de formation déjà existant (import de tous types de fichiers texte, vidéo, audio, présentation powerpoint, etc., ...) modifiable directement en ligne après import
* Support de contenus multimédias : vidéos, quiz interactifs, documents, présentations, modules intuitifs
* Parcours personnalisés : adaptatifs selon le profil, le métier ou les performances

**2.2 Interactivité**

* Forums intégrés par formation avec modération (option)
* Classes virtuelles en direct avec intégration de Visio (type Zoom ou BigBlueButton)
* Simulations interactives pour scénarios métiers aéroportuaires
* Système de feedback instantané (notation des cours, questionnaire de satisfaction Qualiopi, etc.)

**2.3 UX/UI**

* Interface responsive et fluide, accessible sur tous supports (PC, tablette, mobile)
* Interface de formation, pas accessible via mobile
* Navigation intuitive grâce à un dashboard personnalisable (progression, échéances, alertes)
* Notifications intelligentes : rappels de formation, alertes échéance de certification, nouvelles sessions disponibles

**3. Gestion & Interopérabilité**

**3.1 Gestion des utilisateurs**

* Rôles multiples : apprenant, organisme de formation, formateur, entreprise, gestionnaire d'aéroport, administrateur plateforme, auditeur
* Accès différencié aux données, conformes RGPD

**3.2 Intégration unique**

* Interopérabilité avec la plateforme Marketplace

**3.3 Reporting & alertes**

* Rapports exportables (PDF, Excel) pour suivi OF, RH, audits, indicateurs de performance, obligations QUALIOPI (BPF, autres, ...)
* Alertes automatisées pour formations à échéance, non-conformités détectées, résultats d'examen

**4. Interface Utilisateur**

**4.1 Interface formateur**

L'interface réservée aux formateurs dans le LMS, est conçue pour être à la fois directe et puissante, permettant la création, la gestion et le suivi des cours.

Les formateurs / les OF peuvent :

* **Publier du contenu pédagogique** incluant des fiches de cours, des leçons interactives, des vidéos, et bien plus. Ils doivent pouvoir importer/modifier le plus simplement possible des cours déjà existants, des présentations type PowerPoint, des fichiers texte (.PDF, .docx, etc., ...) et toutes autres types de fichiers existants.

* **Créer des évaluations** tels que des quiz, des tests notés et des devoirs pour évaluer les compétences et connaissances des apprenants.

* **Suivre les progrès** grâce à des outils d'analyse et de rapports pour évaluer l'engagement et les performances des apprenants.

* **Personnaliser l'apprentissage** en adaptant les parcours de formation selon les besoins individuels des apprenants ou des groupes de formation.

* **Communication directe** : Utilisation de messagerie instantanée et de forums de discussion pour faciliter la communication entre formateurs et apprenants.

* **Mise en place de travaux collaboratifs** : Création de projets de groupe, favorisant l'apprentissage collaboratif et le travail en équipe.

* **Suivi en temps réel** : Accès à des outils permettant de voir l'activité des apprenants en temps réel, pour une intervention rapide et ciblée si nécessaire.

* **Intégration de ressources externes** : Possibilité d'incorporer des ressources d'apprentissage externes au cours via des liens.

**4.2 Administrateur de la plateforme**

Interface nécessaire avec l'ensemble des fonctionnalités et des accès possibles.

* Mode démo (commercial)
* Mode modérateur contenu simple (assistance utilisateur)  
* Mode pro (dev)

**4.3 Gestionnaire d'aéroport**

Voir Dashboard "Airport Manager"

**4.4 Entreprise**

Voir Dashboard "Entreprise" 