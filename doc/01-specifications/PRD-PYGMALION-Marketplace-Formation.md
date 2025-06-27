**TEMPLATE \- PRD (Product Requirements Document) \- MBAVIATION Marketplace Formation V1 (MVP) \-**

---

**Vision : udemy pour les formations et formateurs, et étudiants-employés du secteur aerien et aeroportuaire**

**1\. Introduction / Vue d'ensemble**

* **Problème à résoudre :** MBAVIATION, ses clients entreprises (compagnies aériennes, aéroports, prestataires), ses organismes de formation partenaires (OF) et les apprenants individuels du secteur aéronautique manquent d'une plateforme centralisée et efficace pour gérer, contrôler et anticiper l'ensemble du cycle de vie de la formation. Les défis actuels incluent : la dispersion des offres, la complexité du suivi des qualifications/certifications et de leurs échéances dans un secteur très réglementé, la difficulté pour les managers/entreprises de superviser la conformité de leurs équipes, la lourdeur administrative liée aux exigences Qualiopi (pour les OF et MBAVIATION si applicable), et le manque d'outils intégrés pour gérer diverses modalités de formation (présentiel, e-learning, classe virtuelle) et la sous-traitance avec les OF partenaires. Les gestionnaires d'aéroport manquent de visibilité sur la conformité globale des intervenants sur leur plateforme.

* **Solution Proposée :** Une plateforme intégrée comprenant une **Marketplace** pour la découverte et l'inscription aux formations aéronautiques, et un **LMS sécurisé** pour la livraison et le suivi des formations (notamment e-learning). L'MVP se concentrera sur :  
  * La publication d'offres par des OF revendeur partenaires *validés* (respectant un CDC spécifique)  
  * La recherche et consultation de formations par les apprenants (internes/externes), les managers, entreprise…  
  * L'inscription et le déclenchement de l'accès au contenu (via le LMS).  
  * Des tableaux de bord pour l'Apprenant, l'OF, et le Manager (pour le suivi de son équipe) et le gestionnaire d’aéroport (pour contrôle du personnel œuvrant sur son site d’exploitation  
  * La capture des informations essentielles pour la traçabilité et les bases de la conformité (y compris champs liés à Qualiopi).  
  * Tokenisation des certificats des formations

* **Vision à long terme :** Devenir la plateforme mondiale de référence pour la formation certifiante dans le secteur aéronautique, reconnue pour sa qualité (qualiopi), sa sécurité (MFA, KYC/B, Blockchain pour certificats, contrôle biométrique des données), son efficacité opérationnelle (audit & risk management, audit alert et anticipation de risque),  administrative (automatisation demande de financement, gestion financière, anticipation saisonnalité), et son intégration transparente entre la gestion des formations (Marketplace) et leur réalisation (LMS sécurisé), tout en offrant une sécurisation et visibilité unique aux gestionnaires d'aéroports et en supportant un écosystème de partenaires formateurs.

**2\. Objectifs (Goals) — Pour le MVP**

* **Objectifs Business :**  
  * Intégrer et valider \[Nombre: ex: I 5-10\] organismes de formation partenaires clés du secteur aéronautique sur la plateforme dans les 6 mois post-lancement.  
  * Gérer les inscriptions pour \[Nombre: ex: 400+\] apprenants (internes et externes confondus) via la plateforme dans les 6 mois.  
  * Valider le processus d'inscription et le flux d'assignation (pour internes).  
  *   
  * Valider le modèle économique MVP pour les OF externes (ex: Commission de X% sur les inscriptions payantes).  
  * Démontrer la capacité à capturer les données de base nécessaires à la conformité et au suivi (notamment échéances).  
  * Mise en place du système d’alerte lors de défaillances de formation

* **Objectifs Produit :**  
  * Permettre aux OF validés de créer un profil et publier au moins une formation aéronautique avec ses sessions (toutes modalités confondu).  
  * Permettre au entreprise de charger un doc type excel afin de renseigner leurs salarié dans la plateforme (création d’une trame fix)  
  * Permettre aux Managers d'entreprise de visualiser la liste de leurs apprenants affiliés et leurs inscriptions basiques.  
  * Permettre aux Managers d'entreprise, OF et gestionnaire d’aéroport la remonter de l’ensemble des statistiques concernant les apprenants affilié  
  * Permettre aux apprenants (internes/externes) de rechercher des formations par mot-clé et catégorie aéronautique.  
  * Permettre aux apprenants externes de s'inscrire et payer une session par CB.  
  * Permettre aux Managers d'assigner (ou faciliter l'inscription) des apprenants internes à des sessions (flux sans paiement CB).  
  * Permettre l’emmission des document obligatoire automatiquement (feuille de presence, attestation, certifica  
  * Permettre l’émission d’un certificat de formation tokenisé et disponible en ligne  
  * Déclencher automatiquement l'inscription dans le cours correspondant lors d'une inscription validée à une session.  
  * Fournir un tableau de bord OF basique (formations, inscrits, vente, agenda).  
  * Fournir un tableau de bord Apprenant basique (mes inscriptions, mes certificats).  
  * Fournir un tableau de bord entreprise/Manager basique (mon équipe, leurs inscriptions).  
  * Fournir un tableau de bord au Gestionnaire d’aéroport basique (remonté des états de formation du personnel travaillant sur son site d’exploitation  
    

**3\. Public Cible (User Personas) \- Principaux pour le MVP**

* **Organisme de Formation (Gestionnaire/Admin OF) \- Partenaire Aéronautique / Validé :     Revendeur**  
  * *Besoin principal :* Augmenter la visibilité de ses formations *spécialisées aviation*, obtenir des inscrits qualifiés (entreprises, individuels), simplifier la gestion des inscriptions, répondre aux exigences de qualité  Qualiopi.  
  * *Doit pouvoir (MVP) :* Passer le processus de validation (KYB), valider/signer le CDC/CGU de la MP ainsi que le contrat partenariat en ligne (type: condition général de vente) créer/modifier profil OF, créer/modifier/gérer/poster/importer/vendre des formations (toute type de modalité), définir des sessions (dates, prix, modalité de formation, voir ses inscrits par session…)  
  * l’OF doit pouvoir importé ses contenu de formation, doit pouvoir les modifier directement en ligne, le LMS doit pouvoir permettre une importation simple et efficace des contenue de formation, il doit aussi

* **Apprenant (Interne \- Salarié entreprise cliente/aéroport) :     Client**  
  * *Besoin principal :* Accéder aux formations requises pour son poste (assignées ou à choisir), maintenir ses certifications à jour, suivre sa progression, accéder facilement au contenu.  
  * *Doit pouvoir (MVP) :* Se connecter (via SSO ou compte créé/lié par Manager), validé un KYC, voir les formations disponibles/assignées, s'inscrire (sans paiement direct), accéder à son tableau de bord, accéder aux cours associés, voir ses inscriptions, accéder a ses certifications

* **Apprenant (Externe \- Individuel Aéronautique) :     Client**  
  * *Besoin principal :* Trouver rapidement une formation *aviation* certifiante, comparer (infos clés Qualiopi, dates, prix, modalité de formation), s'inscrire simplement et payer en ligne.  
  * *Doit pouvoir (MVP) :* Créer un compte,validé un KYC, chercher/comparer formations, lire détail, s'inscrire à une session, payer par CB, retrouver son inscription, accéder aux cours associés, accéder a ses certification, s’affilier a un employeur  
  
**🆕 DÉTAIL PARCOURS APPRENANTS - 3 TYPES AVEC STATUTS :**

* **Type A - Apprenant Libre (learnerStatus: 'free') :**
  * **Inscription :** Page spécialisée `/register/learner` → Parcours "Apprenant Libre"
  * **Caractéristiques :** Autonome, paiement individuel formations, accès immédiat
  * **Évolution :** Peut demander affiliation ultérieurement (devient 'pending_affiliation')
  * **Use case :** Pilote freelance, technicien indépendant, étudiant aviation

* **Type B - Apprenant Invité (learnerStatus: 'affiliated') :**
  * **Inscription :** Via code d'invitation manager → Affiliation automatique entreprise
  * **Caractéristiques :** Lié entreprise, formations payées par employeur, assignation manager
  * **Workflow :** Manager génère code → Apprenant s'inscrit → Validation automatique
  * **Use case :** Salarié Air France, employé aéroport, équipe handling

* **Type C - Demande d'Affiliation (learnerStatus: 'pending_affiliation') :**
  * **Inscription :** Libre + demande affiliation avec infos entreprise + motivation
  * **Caractéristiques :** En attente validation manager, peut basculer affiliated ou free
  * **Workflow :** Inscription → Demande → Manager valide/rejette → Changement statut
  * **Use case :** Nouvel employé, changement poste, réorganisation équipe

**🛠️ IMPLÉMENTATION TECHNIQUE STATUTS :**
```typescript
export type LearnerStatus = 'free' | 'affiliated' | 'pending_affiliation';

interface User {
  learnerStatus?: LearnerStatus;
  invitedBy?: string; // ID manager ayant invité
  affiliationRequestTo?: string; // ID entreprise demandée
}
```

**📱 PAGES & ROUTES SPÉCIALISÉES :**
- `/for-learners` - Landing page apprenants avec parcours expliqués
- `/register/learner` - Wizard inscription adaptatif 3 étapes
- Dashboard étudiant adaptatif selon statut (boutons affiliation si 'free')
- Interface manager pour valider demandes d'affiliation

* **Entreprise / Manager (Responsable service/filliale/RH/équipe/formation) :** **\[CLÉ POUR MVP\]     Client \+**  
  * *Besoin principal :* Assurer la formation de ses equipes, assurer la conformité de son équipe, suivre les formations obligatoires et leurs échéances, gérer les accès/inscriptions de ses collaborateurs. Avoir un visuel simple et efficace avec des alertes  
  * *Doit pouvoir (MVP) :* Se connecter, Créer un compte, validé un KYB, affilié ses apprenants, s’affilier a un site d’exploitation, intégrer d’anciennes certifications, initier/faciliter l'inscription des membres de l'équipe à une formation (flux interne). Gérer des budgets de formation  
      
      
* **Gestionnaire d’aeroport :** **\[CLÉ POUR MVP\]     Client \+++**  
  * *Besoin principal :* Assurer la formation et la conformatité de ses equipes, suivre l’etat des formations obligatoires et leurs échéances de l’ensemble du personnel travaillant sur son site d’exploitation (entreprise, service..), Avoir un visuel simple et efficace avec des alertes, pouvoir telecharger des rapports.  
  * *Doit pouvoir (MVP) :* Se connecter, Créer un compte, validé un KYB, affilié ses equipe, acceder aux formations, affilier les entreprises presente sur son site d’exploitation

* **Administrateur Plateforme (Équipe MBAVIATION) :**  
  * *3 Types : technique (bug plateforme) / opérationnel (assistance aux taches diverse, intégration data utilisateur..), commercial (démo)*  
  * *Besoin principal :* Superviser le fonctionnement, gérer les utilisateurs (OF, entreprise, Apprenants, gestionnaire aeroport), valider les OF selon les critères définis, gérer le catalogue de base (catégories), modérer le contenu si besoin, voir les transactions/inscriptions, Assistance aux clients, demo commercial  
  * *Doit pouvoir (MVP) :* Accéder à une interface d'admin simple pour ces tâches.  
  


**4\. Périmètre (Scope) \- MVP**

* **CE QUI EST INCLUS :**  
  * Création de compte OF (avec validation admin), Apprenant (Interne/Externe), entreprise, gestionnaire aeroport, admin  
    * En tant qu'utilisateur je peux ….  
  * Profil basique OF (validé), Profil Entreprise (basique), Profil Apprenant.  
  * Création/Gestion article/Fiche Formation par OF (champs spécifiques, Qualiopi basiques, toutes types de modalité, notation des formations  
  * Ajout/Gestion Sessions (dates, lieu/online, prix, places…)  
  * Moteur de recherche simple (mots-clés, catégorie aviation).  
  * Page résultats \+ filtres basiques (catégorie, date, modalité).  
  * Page détail Formation/Sessions (affichage infos clés Qualiopi).  
  * Processus inscription Apprenant Externe avec **Paiement CB via Stripe**.  
  * Processus inscription/assignation Apprenant Interne (sans paiement CB, initié par Apprenant ou Manager).  
  * Déclenchement de l'inscription dans LMS pour les sessions formation.  
  * Emails de confirmation (inscription, paiement externe, notification OF/entreprise/gestionnaire/apprenant).  
  * Tableau de bord OF/revendeur (formations, inscrits par session, vente).  
  * Tableau de bord Apprenant (mes inscriptions, accès espace de formation).  
  * Tableau de bord entreprise (équipe, filiale, service, statistique, formation, alerte, inscriptions basiques).  
  * Tableau de bord Gestion aéroport (acées au statistique du personnel et entreprise travaillant sous son site d’exploitataion, accès a des rapport et alert)  
  * Interface d'admin (gestion user, validation OF, modération, contenu).  
  * Authentification sécurisée (Email/Mdp, \+ **MFA fortement recommandée si faisable**). OTP, type Authentificator   
  * Lien basique entre Apprenant Interne et son Manager/Entreprise. Et le gestionnaire du site d’exploitation  
  * Un LMS sécurisé et fonctionnel en multimodalité (avec iutilisation des données biométrique et système intègre d’analyse de fraude en temps réel)  
  * Un LMS repondant au besoin stipulé dans le doc (LMS \- Pypmalion Brief)  
  * SSO (Single Sign-On) connexion unique au deux plateformes imperatif MVP

* **CE QUI EST EXCLU (pour post-MVP) :**  
  * **Chatbot IA avancé** + outil de conception de formation + transmission de formation IA
  * **Automatisation complète de la génération documentaire Qualiopi/Rapports** (les documents obligatoires de base sont en MH1, mais pas les rapports Qualiopi avancés)
  * **Financements complexes** (OPCO, CPF...) - Intégration API avec organismes de financement
  * **Gestion de la sous-traitance entre OFs**
  * **Système d'avis et notations détaillé** (très important par la suite)
  * **Gestion d'équipes avancée** / Inscriptions groupées complexes
  * **Comparateur avancé**, recommandations personnalisées IA
  * **API externes CRM OF** - Intégration avec systèmes existants OF
  * **Gestion de devis, facturation complexe** 
  * **Gestion dynamique et centralisée du référentiel de formation**
  * **Processus Train-the-Trainer** 
  * **Bibliothèque pédagogique avancée**
  * **Multi-profil avancé** : changement de profil (OF/Formateur/Entreprise/apprenant) sur même compte

**CORRECTIONS MAJEURES :**
- ✅ **Tokenisation** : MAINTENANT en [MH2] (était exclu par erreur)
- ✅ **Génération automatique documents de base** : MAINTENANT en [MH1] (était exclu par erreur)
- ✅ **SSO obligatoire** : MAINTENANT en [MH1] (était optionnel)
- ✅ **MFA + OTP** : MAINTENANT en [MH1] obligatoire (était "si faisable")  
    

**5\. Exigences Fonctionnelles Générales (Haut Niveau)**

* Le système permettra aux OF validés de publier et gérer leurs offres de formation.  
* Le système permettra aux Apprenants (internes/externes) et entreprise/Managers de rechercher, consulter et s'inscrire/être assignés aux formations.  
* Le système déclenchera l'accès à la formation dans le LMS intégré pour les sessions multimodale.  
* Le système gérera les paiements sécurisés par CB pour les inscriptions externes.  
* Le système fournira des tableaux de bord distincts et adaptés aux rôles Apprenant, OF, et entreprise/Manager et gestionnaire aéroport  
* Le système permettra de lier les apprenants internes à leur manager/entreprise.  
* Le système permettra une automatisation complète de la génération documentaire  
* Le système permettra une tokenisation des certificats de formation   
* Le système permettra un visuel intuitif d’alerte et d’anticipation au manquement de formation réglementaire  
* Le système respectera les réglementations RGPD suivant le dossier 

**6\. Exigences Non-Fonctionnelles (Critères Qualité)**

* **Utilisabilité :** Interface claire, intuitive et adaptée au contexte aéronautique pour les différents rôles.  
* **Performance :** Temps de chargement \< 3s, réactivité de l'intégration  
* **Sécurité plateforme :** Protection données personnelles (RGPD), transactions CB sécurisées (PCI-DSS via Stripe), authentification robuste (**MFA si possible MVP**) \+ OTP Authentificator, cloisonnement données entreprises. Intégration sécurisée avec le LMS.   
* **Sécurité formation :** utilisation des données biométrique, système intègre d’analyse de fraude en temps réel  
* **Fiabilité :** Haute disponibilité pour l'accès aux formations. Taux d'erreur bas sur les inscriptions/paiements.  
* **Compatibilité :** Navigateurs modernes (Chrome, Firefox, Safari, Edge). Design responsive (Desktop prioritaire pour certaines vues admin/manager, Mobile utilisable pour consultation/inscription apprenant).  
* **Maintenabilité :** Code propre, documenté, facilitant les évolutions futures (vers Blockchain, OPCO, etc.).  
* RGPD : le système de répondre au caracteristique dossier de privacy by design edité par MBA

**7\. Métriques de Succès (KPIs)**

* Nombre d'OF validés et actifs (ayant publié formation).  
* Nombre de formations aéronautiques publiées (par modalité).  
* Nombre d'inscriptions (internes / externes).  
* Taux de conversion (Visiteur externe \-\> Inscrit payant).  
* Nombre de d’entreprise actifs (ayant consulté leur dashboard).  
* Nombre d'apprenants internes gérés via la plateforme.  
* Taux de succès des inscriptions au formation déclenchées.  
* (Optionnel) Score CSAT/NPS basique post-inscription. ?

**8\. Hypothèses et Contraintes**

* **Hypothèses :**  
  * Les OF partenaires sont prêts à fournir les informations requises pour la validation et pour les fiches formation (incl. Qualiopi basique). Voir CDC OF  
  * Les entreprises clientes accepteront d'utiliser la plateforme pour gérer la formation de leurs équipes (via les Managers).  
  * Le modèle économique pour les OF (commission/autre) est viable.  
  * L'intégration de base avec LMS (création compte/inscription cours) est techniquement faisable dans les délais/budget MVP.

* **Contraintes :**  
  * Budget de développement MVP : \[À définir\].  
  * Délai de lancement MVP : \[À définir\].  
  * Technologie LMS imposée :   
  * Prestataire de paiement imposé : **Stripe** (ou autre si défini).  
  * Respect strict du RGPD : Dossier de privacy by design disponible  
  * Nécessité d'afficher/capturer des informations spécifiques liées aux réglementations aéronautiques et à **Qualiopi** (même si l'automatisation est post-MVP).  
  * Le processus de validation des OF doit être fonctionnel dès le MVP.  
  * Le processus d’alerte de conformité doit être fonctionnel dès le MVP.  
  * Tokenisation ?  
  * Génération automatique de doc ?  
  * LMS securisé et connexion SSO 

---

**TEMPLATE - Feature List - PYGMALION Marketplace Formation V1 & V2 (MVP Progressif)**

*(MH1 = Must-Have Premier MVP - Test interne)*  
*(MH2 = Must-Have Deuxième MVP - Commercial)*  
*(NTH = Nice-to-Have, post-MVP)*

**Module : Gestion des Comptes & Rôles**

* \[MH1\] Inscription Apprenant Externe (Email, Mdp, Nom, Prénom)  
* \[MH1\] Inscription Apprenant Interne (Processus via Manager ou pré-création/import par Admin)
* \[MH2\] Inscription OF (Email, Mdp, Nom Société, SIRET, **Infos/Docs pour validation selon Specs OF**, Contact) -> Compte "En attente validation"  
* \[MH1\] Inscription Manager (Email, Mdp, Nom, Prénom, **Lien vers Entreprise**)  
* \[MH1\] Inscription Gestionnaire aéroport (Email, Mdp, Nom, Prénom) + affiliation  
* \[MH2\] Processus de Validation OF par Admin (Back-Office)  
* \[MH1\] Connexion Utilisateur (Email, Mdp)  
* \[MH1\] Fonction "Mot de passe oublié"  
* \[MH1\] Gestion Profil Apprenant (Nom, Email, Mdp)  
* \[MH2\] Gestion Profil OF (Infos société validées, logo, description, contacts)  
* \[MH1\] Gestion Profil Manager (Nom, Email, Mdp, voir son entreprise)  
* \[MH1\] Gestion Profil gestionnaire aéroport (Nom, Email, Mdp) + affiliation  
* \[MH1\] Gestion Relation Apprenant Interne <-> Manager / Entreprise  
* \[**MH1**\] **SSO (Single Sign-On)** - Connexion unique LMS/Marketplace obligatoire
* \[**MH1**\] **Authentification Multi-Facteurs (MFA) + OTP** - Sécurité obligatoire
* \[NTH\] Connexion via Google/LinkedIn/SSO Entreprise  
* \[NTH\] Validation de l'email à l'inscription

**Module : Catalogue Formations (Côté OF / Admin MBAVIATION)**

* \[MH1\] Création Fiche Formation/fiche article basique (test interne)
* \[MH2\] Création Fiche Formation complète (Titre, **Catégorie Aviation [liste fixe]**, Desc complète, Objectifs péda, Public visé, Prérequis, Programme [texte riche], **Champs Qualiopi basiques**, **Modalité [Présentiel/E-learning/Virtuel]**)
* \[MH2\] Ajout image principale formation  
* \[MH2\] Gestion statut formation (Brouillon, En attente validation [si OF], Publiée, Archivée)  
* \[MH2\] Modification/Suppression fiche formation (par créateur ou Admin)  
* \[MH2\] Ajout Session(s) (Date début, Date fin, Lieu [adresse ou "En ligne"], Prix HT/TTC, Places dispo, **ID Cours LMS haute performance**)  
* \[MH2\] Modification/Suppression session  
* \[MH1\] **Import/Import contenu formation simple** - Interface LMS haute performance
* \[MH1\] **Interopérabilité LMS/Marketplace** - Connexion transparente obligatoire
* \[NTH\] Ajout documents (PDF programme...)  
* \[NTH\] Gestion formateurs associés  
* \[NTH\] Duplication formation/session

**Module : Recherche & Consultation (Côté Apprenant / Manager)**

* \[MH1\] Barre recherche mots-clés basique (test interne)
* \[MH2\] Barre recherche mots-clés complète (titre, description)  
* \[MH2\] Page résultats : Liste formations avec **performance optimisée**
* \[MH2\] Filtres page résultats: Catégorie Aviation, Dates, **Multimodalité (En ligne / Présentiel / Virtuel/…)**  
* \[MH2\] Tri simple résultats (pertinence [basique], date début)  
* \[MH2\] Affichage clair prix, dates, modalité, OF sur liste  
* \[MH2\] Page Détail Formation: Toutes infos OF/Admin, **Infos Qualiopi clés**, liste sessions dispo (statut ouvert/complet)  
* \[MH1\] **Interopérabilité LMS/Marketplace** - Navigation fluide et transparente
* \[NTH\] Filtres avancés (certification visée, durée...)  
* \[NTH\] Sauvegarde recherche / Alertes  
* \[NTH\] Formations similaires

**Module : Inscription, Assignation & Paiement**

* \[MH1\] Bouton "S'inscrire" basique (test interne)
* \[MH2\] Bouton "S'inscrire" / "Demander inscription" sur session ouverte  
* \[MH2\] **Flux Apprenant Externe :**  
  * Formulaire inscription (connexion/création si besoin)  
  * Récapitulatif avant paiement  
  * Intégration paiement **CB via Stripe Checkout**  
  * Gestion statut place (décrémentation)  
  * Page confirmation paiement/inscription  
  * Email confirmation apprenant  
  * Notification OF

* \[MH1\] **Flux Apprenant Interne :**  
  * Option 1: L'apprenant demande -> notification Manager pour validation/assignation  
  * Option 2: Le Manager assigne directement depuis son dashboard  
  * **Pas de paiement CB**  
  * Gestion statut place  
  * Email confirmation apprenant (post-validation/assignation)  
  * Notification OF

* \[MH1\] **Déclenchement inscription LMS haute performance :** Pour toute inscription validée -> **interopérabilité totale** avec le LMS pour inscription automatique
* \[**MH1**\] **Génération automatique de documents obligatoires :**
  * Feuilles d'émargement automatiques
  * Attestations de formation automatiques  
  * Certificats de réussite automatiques
  * Factures automatiques
* \[**MH2**\] **Tokenisation intégrée :** Certificats tokenisés automatiquement lors de la validation
* \[NTH\] Ajout au panier  
* \[NTH\] Codes promo

**Module : Tableaux de Bord (voir dossier requierement)**

* **Tableau de Bord Apprenant : \[MH MVP\]**  
  * \[MH\] Section "Mes Formations/Inscriptions": Liste sessions inscrites (à venir, passées). Statut. **Lien direct vers le LMS.**  
  * \[NTH\] Accès certificat   
  * \[NTH\] Historique complet / Certificats (post-MVP)

* **Tableau de Bord OF : \[MH MVP\]**  
  * \[MH\] Section "Mes Formations": Liste formations créées (statut). Accès modif/sessions.  
  * \[MH\] Section "Inscriptions": Vue par session des apprenants inscrits (Nom, Prénom, Email, Date inscription, Entreprise si Interne).  
  * \[NTH\] Export liste inscrits (CSV)  
  * \[NTH\] Stats simples (vues, inscrits)  
  * \[MH\] Tableau de bord de vente

* **Tableau de Bord Entreprise/Manager :** **\[MH MVP\]**  
  * \[MH\] Section "Mon Équipe": Liste des apprenants internes rattachés.  
  * \[MH\] Section "Suivi Formations Équipe": Vue simplifiée des inscriptions de l'équipe (Qui, Quelle formation/session, Statut basique \[inscrit\]).  
  * \[MH\] (Optionnel selon flux interne) Fonction pour assigner/valider inscription d'un membre.  
  * \[MH\] Reporting plus détaillé (échéances, conformité...)  
  * \[MH\] Système d’alerte aux manquements de formation réglementaire  
       
      
* **Tableau de Bord Gestionnaire aeroport :** **\[MH MVP\]**  
  * \[MH\] Section "Mon Équipe": Liste des entreprise / apprenant affilié au site d’exploitation.  
  * \[MH\] Section "Suivi Formations Équipe": Vue simplifiée des inscriptions de l'équipe (Qui, Quelle formation/session, Statut basique \[inscrit\]).  
  * \[MH\] (Optionnel selon flux interne) Fonction pour assigner/valider inscription d'un membre.  
  * \[NTH\] Reporting plus détaillé (échéances, conformité, manquement...)  
  * \[MH\] Système d’alerte aux manquements de formation réglementaire m

**Module : Administration Plateforme (Back-Office)**

* \[MH\] Gestion utilisateurs (Voir liste tous rôles, Activer/Désactiver, Modifier rôle/entreprise).  
* \[MH\] **Workflow Validation OF** (Voir demandes, consulter infos/docs, Approuver/Rejeter).  
* \[MH\] Gestion formations (Voir toutes, Modifier/Dépublier \- Modération).  
* \[MH\] Gestion catégories Aviation.  
* \[MH\] Vue simple transactions CB (via dashboard Stripe \+ référence interne).  
* \[MH\] Vue simple inscriptions LMS déclenchées (log/statut basique).  
* \[MH\] Reporting avancé (financier, usage...).  
* \[NTH\] Gestion contenu statique (FAQ, CGU...).

---

**TEMPLATE \- User Flows Principaux \- PYGMALION Marketplace Formation V1 (MVP)**

**VOIR DOSSIER PARCOURS UTILISATEURS**

**User Flow 1 : Apprenant EXTERNE \- Trouver et s'inscrire à une formation (Paiement CB)**

1. Arrivée Page d'Accueil.  
2. Action : Recherche (mot-clé) OU Navigation (catégorie aviation).  
3. Écran : Page Résultats.  
4. (Optionnel) Action : Filtre (Modalité, Date).  
5. Écran : Page Résultats mise à jour.  
6. Action : Clique sur une Formation.  
7. Écran : Page Détail Formation (infos aviation, Qualiopi clés).  
8. Action : Voit une session (date, prix, modalité), clique "S'inscrire".  
9. Condition : Connecté ?  
   * NON : Écran Connexion/Inscription \-\> Action: Se connecte ou Crée compte Apprenant Externe.  
   * OUI : Passe à l'étape 10\.  
10. Écran : Récapitulatif Inscription.  
11. Action : Clique "Confirmer et Payer".  
12. Écran : Interface paiement Stripe.  
13. Action : Saisit infos CB, valide.  
14. Condition : Paiement succès ?  
    * OUI :  
      * Écran : Confirmation Paiement/Inscription plateforme.  
      * Système : Décrémente place, **déclenche inscription LMS si e-learning**.  
      * Notification : Email confirmation apprenant. Notification OF.  
      * Accès : Trouve inscription dans Tableau de Bord \-\> "Mes Formations" \+ lien Moodle si applicable.  
    * NON : Écran : Erreur paiement \-\> Action : Peut réessayer ou annuler.  
      *\[Feedback: Flux standard OK, ajout LMStrigger et notif OF. Gestion erreur paiement à prévoir.\]*

**User Flow 2 : Apprenant INTERNE \- S'inscrire à une formation assignée ou demandée**

* **Cas A: Formation assignée par Manager (Simplifié MVP)**  
  1. Notification (Email? Dashboard?) : Vous avez été inscrit à la formation X par votre manager.  
  2. Action : Se connecte à la plateforme.  
  3. Écran : Tableau de Bord Apprenant.  
  4. Action : Va dans "Mes Formations".  
  5. Écran : Voit la formation/session inscrite.  
  6. Action : Clique sur le lien pour accéder (détails ou directement LMS).  
* **Cas B: L'apprenant demande l'inscription (si autorisé MVP)**  
  1. Arrivée Page d'Accueil \-\> Recherche \-\> Page Résultats \-\> Page Détail Formation.  
  2. Action : Voit une session, clique "Demander l'inscription" (ou équivalent).  
  3. Condition : Connecté ? (Assume OUI, comme Apprenant Interne).  
  4. Écran : Confirmation de la demande soumise.  
  5. Système : Notification envoyée au Manager pour validation.  
  6. **(Flow Manager \- Validation)** Manager reçoit notif \-\> Va sur son Dashboard \-\> Section "Demandes" \-\> Approuve/Rejette.  
  7. Condition : Approuvé par Manager ?  
     * OUI :  
       * Système : Valide l'inscription, décrémente place, **déclenche inscription Moodle si e-learning**.  
       * Notification : Email confirmation apprenant. Notification OF.  
       * Accès : Apprenant voit l'inscription dans "Mes Formations".  
     *   
     * NON : Notification : Email apprenant informant du rejet.  
       *\[Feedback: Flux Interne crucial. Le Cas A est plus simple pour MVP. Le Cas B nécessite un mini-workflow d'approbation Manager. À choisir/préciser.\]*

**User Flow 3 : Organisme de Formation (OF) \- Créer et publier une nouvelle formation e-learning**

1. Connexion Tableau de Bord OF (après validation initiale du compte OF par Admin).  
2. Action : Navigue "Mes Formations" \-\> Clique "Ajouter Formation".  
3. Écran : Formulaire création (partie 1 : infos générales).  
4. Action : Remplit champs (titre, desc, cat aviation, objectifs, **modalité \= E-learning**, champs Qualiopi...). Télécharge image.  
5. Action : Clique "Étape suivante : Ajouter des sessions".  
6. Écran : Interface ajout/gestion sessions.  
7. Action : Clique "Ajouter une session".  
8. Écran : Formulaire ajout session.  
9. Action : Remplit champs (dates accès, prix \[si payant externe\], places, **ID Cours LMS correspondant**).  
10. Action : Clique "Enregistrer la session".  
11. Action : Clique "Publier la formation".  
12. Condition : Modération Admin post-publication ? (Probablement NON si OF déjà validé).  
13. Écran : Confirmation publication. Formation visible sur site.  
14. Confirmation : Formation listée dans Tableau de Bord OF (statut publiée).  
    *\[Feedback: Flux OK, ajout Modalité E-learning et ID Cours Moodle essentiel.\]*

**User Flow 4 : Manager \- Consulter les inscriptions de son équipe**

1. Connexion Tableau de Bord Manager.  
2. Écran : Tableau de Bord Manager (accueil).  
3. Action : Navigue vers "gestion des Formations".  
4. Écran : Affiche la liste des apprenants internes rattachés au Manager.  
5. Action : Clique sur un apprenant OU sur une vue "Formations de l'équipe".  
6. Écran : Affiche la liste des inscriptions pour cet apprenant / l'équipe (Formation, Session, Date inscription, Statut basique).  
   *\[Feedback: Simple vue en lecture pour MVP semble correct. Assignation/Validation serait un flow distinct.\]*

