# PRD (Product Requirements Document) - PYGMALION

**Projet interne :** Pygmalion | **Société porteuse :** MB Aviation

---

**Vision : Udemy pour les formations et formateurs, et étudiants-employés du secteur aérien et aéroportuaire**

## 1. Introduction / Vue d'ensemble

**Durée de développement :** 320 jours (P0: 180 jours, P1: 100 jours, P2: 40 jours)

* **Problème à résoudre :** MBAVIATION, ses clients entreprises (compagnies aériennes, aéroports, prestataires), ses organismes de formation partenaires (OF) et les apprenants individuels du secteur aéronautique manquent d'une plateforme centralisée et efficace pour gérer, contrôler et anticiper l'ensemble du cycle de vie de la formation. Les défis actuels incluent : la dispersion des offres, la complexité du suivi des qualifications/certifications et de leurs échéances dans un secteur très réglementé, la difficulté pour les managers/entreprises de superviser la conformité de leurs équipes, la lourdeur administrative liée aux exigences Qualiopi (pour les OF et MBAVIATION si applicable), et le manque d'outils intégrés pour gérer diverses modalités de formation (présentiel, e-learning, classe virtuelle) et la sous-traitance avec les OF partenaires. Les gestionnaires d'aéroport manquent de visibilité sur la conformité globale des intervenants sur leur plateforme.

* **Solution Proposée :** Une plateforme intégrée comprenant une **Marketplace** pour la découverte et l'inscription aux formations aéronautiques, et un **LMS propriétaire développé entièrement en interne** (pas de dépendance Moodle, Canvas ou autre) pour la livraison et le suivi des formations (notamment e-learning). La plateforme inclut :
  * La publication d'offres par des OF revendeur partenaires *validés* (respectant un CDC spécifique)
  * La recherche et consultation de formations par les apprenants (internes/externes), les managers, entreprise…
  * L'inscription et le déclenchement de l'accès au contenu (via le LMS).
  * Des tableaux de bord pour l'Apprenant, l'OF, et le Manager (pour le suivi de son équipe) et le gestionnaire d’aéroport (pour contrôle du personnel œuvrant sur son site d’exploitation
  * La capture des informations essentielles pour la traçabilité et les bases de la conformité (y compris champs liés à Qualiopi).
  * Certification sécurisée des formations via système hashrecord avec hash unique, QR code et page de vérification publique

* **Vision à long terme :** Devenir la plateforme mondiale de référence pour la formation certifiante dans le secteur aéronautique, reconnue pour sa qualité (qualiopi), sa sécurité (MFA, KYC/B, Blockchain pour certificats, contrôle biométrique des données), son efficacité opérationnelle (audit & risk management, audit alert et anticipation de risque),  administrative (automatisation demande de financement, gestion financière, anticipation saisonnalité), et son intégration transparente entre la gestion des formations (Marketplace) et leur réalisation (LMS sécurisé), tout en offrant une sécurisation et visibilité unique aux gestionnaires d'aéroports et en supportant un écosystème de partenaires formateurs.

## 2. Objectifs (Goals)

### 2.1 Objectifs Business
  * Intégrer et valider 5-10 organismes de formation partenaires clés du secteur aéronautique sur la plateforme dans les 6 mois post-lancement.
  * Gérer les inscriptions pour 400-10,000 apprenants via la plateforme dans les 6 mois (scénario conservateur : 400-2,000 ; scénario ambitieux : 2,000-10,000).
  * Valider le processus d'inscription et le flux d'assignation (pour internes).
  *
  * Valider le modèle économique pour les OF externes (ex: Commission de X% sur les inscriptions payantes).
  * Démontrer la capacité à capturer les données de base nécessaires à la conformité et au suivi (notamment échéances).
  * Mise en place du système d’alerte lors de défaillances de formation

### 2.2 Objectifs Produit
  * Permettre aux OF validés de créer un profil et publier au moins une formation aéronautique avec ses sessions (toutes modalités confondu).
  * Permettre aux entreprises de charger un doc type excel afin de renseigner leurs salariés dans la plateforme (création d’une trame fix)
  * Permettre aux Managers d'entreprise de visualiser la liste de leurs apprenants affiliés et leurs inscriptions basiques.
  * Permettre aux Managers d'entreprise, OF et gestionnaire d’aéroport la remonter de l’ensemble des statistiques concernant les apprenants affilié
  * Permettre aux apprenants (internes/externes) de rechercher des formations par mot-clé et catégorie aéronautique.
  * Permettre aux apprenants externes de s'inscrire et payer une session par CB.
  * Permettre aux Managers d'assigner (ou faciliter l'inscription) des apprenants internes à des sessions (flux sans paiement CB).
  * Permettre l’émission des documents obligatoire automatiquement (feuille de présence, attestation, certificat..)
  * Permettre l'émission d'un certificat de formation via système hashrecord avec hash unique, QR code et page de vérification publique dédiée
  * Déclencher automatiquement l'inscription dans le cours correspondant lors d'une inscription validée à une session.
  * Fournir un tableau de bord OF basique (formations, inscrits, vente, agenda).
  * Fournir un tableau de bord Apprenant basique (mes inscriptions, mes certificats).
  * Fournir un tableau de bord entreprise/Manager basique (mon équipe, leurs inscriptions).
  * Fournir un tableau de bord au Gestionnaire d’aéroport basique (remonté des états de formation du personnel travaillant sur son site d’exploitation


## 3. Public Cible (User Personas) Principaux

### 3.1 Organisme de Formation (Gestionnaire/Admin OF) - Partenaire Aéronautique / Validé : Revendeur
  * *Besoin principal :* Augmenter la visibilité de ses formations *spécialisées aviation*, obtenir des inscrits qualifiés (entreprises, individuels), simplifier la gestion des inscriptions, répondre aux exigences de qualité  Qualiopi.
  * *Doit pouvoir :* Passer le processus de validation (KYB), valider/signer le CDC/CGU de la MP ainsi que le contrat partenariat en ligne (type: condition générale de vente) créer/modifier profil OF, créer/modifier/gérer/poster/importer/vendre des formations (toute type de modalité), définir des sessions (dates, prix, modalité de formation, voir ses inscrits par session…)
  * l’OF doit pouvoir importer ses contenus de formation, doit pouvoir les modifier directement en ligne, le LMS doit pouvoir permettre une importation simple et efficace des contenus de formation, il doit aussi

### 3.2 Apprenant (Interne - Salarié entreprise cliente/aéroport) : Client
  * *Besoin principal :* Accéder aux formations requises pour son poste (assignées ou à choisir), maintenir ses certifications à jour, suivre sa progression, accéder facilement au contenu.
  * *Doit pouvoir :* Se connecter (via accès unifié interne ou compte créé/lié par Manager), validé un KYC, voir les formations disponibles/assignées, s'inscrire (sans paiement direct), accéder à son tableau de bord, accéder aux cours associés, voir ses inscriptions, accéder à ses certifications

### 3.3 Apprenant (Externe - Individuel Aéronautique) : Client
  * *Besoin principal :* Trouver rapidement une formation *aviation* certifiante, comparer (infos clés Qualiopi, dates, prix, modalité de formation), s'inscrire simplement et payer en ligne.
  * *Doit pouvoir :* Créer un compte, validé un KYC, chercher/comparer formations, lire détail, s'inscrire à une session, payer par CB, retrouver son inscription, accéder aux cours associés, accéder à ses certifications, s’affilier à un employeur
  *
### 3.4 Entreprise / Manager (Responsable service/filiales/RH/équipe/formation) : Client+
  * *Besoin principal :* Assurer la formation de ses équipes, assurer la conformité de son équipe, suivre les formations obligatoires et leurs échéances, gérer les accès/inscriptions de ses collaborateurs. Avoir un visuel simple et efficace avec des alertes
  * *Doit pouvoir :* Se connecter, Créer un compte, validé un KYB, affilié ses apprenants, s’affilier à un site d’exploitation, intégrer d’anciennes certifications, initier/faciliter l'inscription des membres de l'équipe à une formation (flux interne). Gérer des budgets de formation


### 3.5 Gestionnaire d'aéroport : Client+++
  * *Besoin principal :* Assurer la formation et la conformité de ses équipes, suivre l’état des formations obligatoires et leurs échéances de l’ensemble du personnel travaillant sur son site d’exploitation (entreprise, service..), Avoir un visuel simple et efficace avec des alertes, pouvoir télécharger des rapports.
  * *Doit pouvoir :* Se connecter, Créer un compte, validé un KYB, affilié ses équipe, accéder aux formations, affilier les entreprises présente sur son site d’exploitation

### 3.6 Administrateur Plateforme (Équipe MBAVIATION)
  * *3 Types : technique (bug plateforme) / opérationnel (assistance aux taches diverse, intégration data utilisateur..), commercial (démo)*
  * *Besoin principal :* Superviser le fonctionnement, gérer les utilisateurs (OF, entreprise, Apprenants, gestionnaire aéroport), valider les OF selon les critères définis, gérer le catalogue de base (catégories), modérer le contenu si besoin, voir les transactions/inscriptions, Assistance aux clients, démo commercial
  * *Doit pouvoir :* Accéder à une interface d'admin simple pour ces tâches.



## 4. Périmètre (Scope)

### 4.1 Ce qui est inclus
  * Création de compte OF (avec validation admin), Apprenant (Interne/Externe), entreprise, gestionnaire aéroport, admin
    * En tant qu'utilisateur je peux ….
  * Profil basique OF (validé), Profil Entreprise (basique), Profil Apprenant.
  * **Accès unifié interne (P0 - MVP)** : Sessions partagées entre Marketplace et LMS (même base de données, authentification unifiée interne sans dépendance SSO externe)
  * Création/Gestion article/Fiche Formation par OF (champs spécifiques, Qualiopi basiques, tous types de modalité, notation des formations
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
  * Tableau de bord Gestion aéroport (accès aux statistiques du personnel et entreprise travaillant sous son site d’exploitation, accès a des rapports et alerte)
  * Interface d'admin (gestion user, validation OF, modération, contenu).
  * Authentification sécurisée (Email/Mdp, \+ **MFA obligatoire**). OTP, type Authentificator
  * Lien basique entre Apprenant Interne et son Manager/Entreprise. Et le gestionnaire du site d’exploitation
  * Un LMS sécurisé et fonctionnel en multimodalité (détection de fraude basique via logs et heuristiques)
  * Un LMS répondant au besoin stipulé dans le doc (LMS \- Brief)
  * **Accès unifié interne (P0 - MVP)** : Authentification unique entre Marketplace et LMS (même session utilisateur, même DB, pas de double connexion)
  * Certification hashrecord (système sécurisé + page de vérification publique) - **P0**

### 4.2 Ce qui est exclu
  * Chatbot IA \+ outil de conception de formation
  * Automatisation complète de la génération documentaire Qualiopi / Rapports.
  * Financements complexes (OPCO, CPF...).
  * Gestion de la sous-traitance entre OFs.
  * Système d'avis et notations détaillé.
  * Gestion d'équipes avancée / Inscriptions groupées complexes.
  * Comparateur avancé, recommandations personnalisées.
  * API externes CRM OF.
  * Gestion de devis, facturation complexe
  * Gestion dynamique et centralisée du référentiel de formation.
  * Processus Train-the-Trainer.
  * Bibliothèque pédagogique
  * Onglet accueil/déconnexion, changement de profil (OF/Formateur/Entreprise/apprenant) (type adresse de connexion multi-profil) mini OF/formateur affilié/apprenant
  * **SSO entreprises externes (P2 - Post-MVP)** : Intégration avec les systèmes d'authentification d'entreprise (Active Directory, LDAP, SAML) pour les grands comptes - **Non inclus dans le MVP**
  * Révocation/rotation des clés blockchain
  * Portabilité multi-chaînes des certificats tokenisés
  * Biométrie et proctoring avancé




## 5. Exigences Fonctionnelles Générales (Haut Niveau)

* Le système permettra aux OF validés de publier et gérer leurs offres de formation.
* Le système permettra aux Apprenants (internes/externes) et entreprise/Managers de rechercher, consulter et s'inscrire/être assignés aux formations.
* Le système déclenchera l'accès à la formation dans le LMS intégré pour les sessions multimodale.
* Le système gérera les paiements sécurisés par CB pour les inscriptions externes.
* Le système fournira des tableaux de bord distincts et adaptés aux rôles Apprenant, OF, et entreprise/Manager et gestionnaire aéroport
* Le système permettra de lier les apprenants internes à leur manager/entreprise.
* **Accès unifié interne (P0 - MVP)** : Le système offrira une authentification unique entre Marketplace et LMS avec sessions partagées et base de données commune. Les utilisateurs se connectent une seule fois pour accéder aux deux plateformes sans redémarrage de session.
* **SSO entreprises externes (P2 - Post-MVP)** : Le système supportera l'intégration avec les annuaires d'entreprise (Active Directory, LDAP, SAML) permettant aux employés de grands comptes de se connecter avec leurs identifiants corporate existants
* Le système permettra une automatisation complète de la génération documentaire
* Le système permettra une certification sécurisée via hashrecord (émission, hash unique, page vérification publique, API de vérification)
* Le système permettra un visuel intuitif d’alerte et d’anticipation au manquement de formation réglementaire
* Le système respectera les réglementations RGPD

## 6. Exigences Non-Fonctionnelles (Critères Qualité)

* **Utilisabilité :** Interface claire, intuitive et adaptée au contexte aéronautique pour les différents rôles.
* **Performance :** Temps de chargement \< 1.5s, réactivité de l'intégration
* **Sécurité plateforme :** Protection données personnelles (RGPD), transactions CB sécurisées (PCI-DSS via Stripe), authentification robuste (**MFA**) + OTP Authentificator, cloisonnement données entreprises. Intégration sécurisée avec le LMS.
* **Sécurité, formation :** détection de fraude basique (logs, heuristiques simples)
* **Fiabilité :** Haute disponibilité pour l'accès aux formations. Taux d'erreur bas sur les inscriptions/paiements.
* **Compatibilité :** Navigateurs modernes (Chrome, Firefox, Safari, Edge). Design responsive (Desktop prioritaire pour certaines vues admin/manager, Mobile utilisable pour consultation/inscription apprenant).
* **Maintenabilité :** Code propre, documenté, facilitant les évolutions futures (vers Blockchain, OPCO, etc.).
* RGPD : le système de répondre aux caractéristiques dossier de privacy by design édité à cet effet.

## 7. Métriques de Succès (KPIs)

* Nombre d'OF validés et actifs (ayant publié formation).
* Nombre de formations aéronautiques publiées (par modalité).
* Nombre d'inscriptions (internes / externes).
* Taux de conversion (Visiteur externe \-\> Inscrit payant).
* Nombre de d'entreprise actifs (ayant consulté leur dashboard).
* Nombre d'apprenants internes gérés via la plateforme.
* Taux de succès des inscriptions au formation déclenchées.
* **% de certificats enregistrés avec succès (hashrecord)**
* **Temps moyen d'enregistrement hashrecord** (cible < 30s, tx minée)
* **Taux de vérifications publiques des certificats**
* **Taux de conformité des équipes** (% employés à jour)
* (Optionnel) Score CSAT/NPS basique post-inscription

## 8. Hypothèses et Contraintes

### 8.1 Hypothèses
  * Les OF partenaires sont prêts à fournir les informations requises pour la validation et pour les fiches formation (incl. Qualiopi basique). Voir CDC OF
  * Les entreprises clientes accepteront d'utiliser la plateforme pour gérer la formation de leurs équipes (via les Managers).
  * Le modèle économique pour les OF (commission/autre) est viable.
  * L'intégration de base avec LMS (création compte/inscription cours) est techniquement faisable dans les délais/budget.

### 8.2 Contraintes
  * Budget de développement : \[À définir\].
  * Délai de lancement : \[À définir\].
  * Technologie LMS imposée : LMS propriétaire (NestJS + React) défini
  * Prestataire de paiement imposé : **Stripe** (ou autre si défini).
  * Respect strict du RGPD : Dossier de privacy by design disponible
  * Nécessité d'afficher/capturer des informations spécifiques liées aux réglementations aéronautiques et à **Qualiopi**.
  * Le processus de validation des OF doit être fonctionnel.
  * Le processus d'alerte de conformité doit être fonctionnel.
  * **Certification** : Système hashrecord, gestion sécurisée des clés, conformité RGPD (hash uniquement)
  * **Génération automatique de documents** : Factures, attestations, feuilles d'émargement (event-driven)
  * **LMS sécurisé** : Intégration native avec accès unifié interne
  * **Conformité** : Vue entreprise et gestionnaire aéroport avec règles d'échéances et alertes

---

## 9. Feature List - MBAVIATION Marketplace Formation

### 9.1 Module : Gestion des Comptes & Rôles

* Inscription Apprenant Externe (Email, Mdp, Nom, Prénom)
* Inscription Apprenant Interne (Processus via Manager ou pré-création/import par Admin?) \- **À définir**
* Inscription OF (Email, Mdp, Nom Société, SIRET, **Infos/Docs pour validation selon Specs OF**, Contact) \-\> Compte "En attente validation"
* Inscription Manager (Email, Mdp, Nom, Prénom, **Lien vers Entreprise**)
* Processus de Validation OF par Admin (Back-Office)
* Connexion Utilisateur (Email, Mdp)
* Fonction "Mot de passe oublié"
* Gestion Profil Apprenant (Nom, Email, Mdp)
* Gestion Profil OF (Infos société validées, logo, description, contacts)
* Gestion Profil Manager (Nom, Email, Mdp, voir son entreprise)
* Gestion Profil gestionnaire aeroport (Nom, Email, Mdp,) \+ affiliation
* Gestion Relation Apprenant Interne \<-\> Manager / Entreprise (par Admin ou Manager?) \- **À définir**
* **Connexion sociale (P2 - Post-MVP)** : Authentification via Google/LinkedIn pour simplifier l'inscription et la connexion
* **SSO Entreprise (P2 - Post-MVP)** : Intégration avec annuaires d'entreprise (AD/LDAP/SAML) pour permettre aux employés de grands comptes de se connecter avec leurs identifiants corporate
* Validation de l'email à l'inscription
* Authentification Multi-Facteurs (MFA) + OTP

### 9.2 Module : Validation KYC/KYB/CAC (Know Your Customer/Business/Conformité Aéroportuaire)

#### 9.2.1 P0 - Processus Manuel (8 jours)
* Upload documents d'identité (CNI, passeport pour KYC)
* Upload documents entreprise (Kbis, statuts pour KYB)
* Upload certificats aéronautiques (badges, habilitations pour CAC)
* Interface admin de validation manuelle avec checklist
* Statuts : En attente / En cours de vérification / Validé / Rejeté
* Notifications email sur changement de statut
* Historique et audit trail des validations

#### 9.2.2 P1 - Processus Semi-Automatisé (4 jours additionnels)
* OCR pour extraction automatique des données
* Pré-validation automatique des formats et dates
* Score de confiance avec alertes sur anomalies
* Intégration bases de données publiques (INSEE, Infogreffe)
* Workflow de révision pour cas limites

#### 9.2.3 P2 - Processus Entièrement Automatisé (4 jours additionnels)
* Intégration services tiers (Onfido, Jumio, ComplyAdvantage)
* Vérification biométrique avec liveness detection
* Screening PEP/sanctions automatique
* API temps réel avec autorités aéroportuaires
* Machine Learning pour détection de fraude

### 9.3 Module : Catalogue Formations (Côté OF / Admin MBAVIATION)

* Création Fiche Formation/fiche article (Titre, **Catégorie Aviation \[liste fixe\]**, Desc complète, Objectifs péda, Public visé, Prérequis, Programme \[texte riche\], **Champs Qualiopi basiques \[indicateurs clés?\]**, **Modalité \[Présentiel/E-learning/Virtuel\]**),
* Ajout image principale formation
* Gestion statut formation (Brouillon, En attente validation \[si OF\], Publiée, Archivée)
* Modification/Suppression fiche formation (par créateur ou Admin)
* Ajout Session(s) (Date début, Date fin, Lieu \[adresse ou "En ligne"\], Prix HT/TTC, Places dispo, **ID Cours LMS**)
* Modification/Suppression session
* Ajout documents (PDF programme...)
* Gestion formateurs associés
* Duplication formation/session
*

### 9.4 Module : Recherche & Consultation (Côté Apprenant / Manager)

* Barre recherche mots-clés (titre, description)
* Page résultats : Liste formations
* Filtres page résultats : Catégorie Aviation, Dates, **Multimodalité (En ligne / Présentiel / Virtuel/…)**
* Tri simple résultats (pertinence \[basique\], date, début)
* Affichage clair, prix, dates, modalité, OF sur liste
* Page Détail Formation : Toutes infos OF/Admin, **Infos Qualiopi clés**, liste sessions disponible (statut ouvert/complet)
* Filtres avancés (certification, visée, durée...)
* Sauvegarde recherche / Alertes
* Formations similaires

### 9.5 Module : Inscription, Assignation & Paiement

* Bouton "S'inscrire" / "Demander inscription" sur session ouverte
* **Flux Apprenant Externe :**
  * Formulaire inscription (connexion/création si besoin)
  * Récapitulatif avant paiement
  * Intégration paiement **CB via Stripe Checkout**
  * Gestion statut place (décrémentation)
  * Page confirmation paiement/inscription
  * Email confirmation apprenant
  * Notification OF

* **Flux Apprenant Interne :**
  * Option 1: L'apprenant demande \-\> notification Manager pour validation/assignation.
  * Option 2: Le Manager assigne directement depuis son dashboard.
  * **Pas de paiement CB.**
  * Gestion statut place.
  * Email confirmation apprenant (post-validation/assignation).
  * Notification OF.
  * **Flux exact à valider.**

* **Déclenchement inscription LMS :** Pour toute inscription validée (Externe payée, Interne validée/assignée) à une session de formation \-\> provisionnement natif via base de données commune pour inscrire l'utilisateur au cours lié.
* Ajout au panier
* Codes promo
* Génération facture basique (externe)

### 9.6 Module : Tableaux de Bord (voir dossier requirement)

* **Tableau de Bord Apprenant :**
  * Section "Mes Formations/Inscriptions": Liste sessions inscrites (à venir, passées). Statut. **Lien direct vers le LMS.**
  * Accès certificat
  * Historique complet / Certificats avec vérification hashrecord sur Avalanche

* **Tableau de Bord OF :**
  * Section "Mes Formations": Liste formations créées (statut). Accès modif/sessions.
  * Section "Inscriptions": Vue par session des apprenants inscrits (Nom, Prénom, Email, Date inscription, Entreprise si Interne).
  * Export liste inscrits (CSV)
  * Stats simples (vues, inscrits)
  * Tableau de bord de vente

* **Tableau de Bord Entreprise/Manager :** **\[P0 - MVP\]**
  * Section "Mon Équipe": Liste des apprenants internes rattachés.
  * Section "Suivi Formations Équipe": Vue simplifiée des inscriptions de l'équipe (Qui, Quelle formation/session, Statut basique \[inscrit\]).
  * (Optionnel selon flux interne) Fonction pour assigner/valider inscription d'un membre.
  * Reporting plus détaillé (échéances, conformité...)
  * Système d’alerte aux manquements de formation réglementaire


* **Tableau de Bord Gestionnaire aeroport :**
  * **\[P0 - MVP Basique\]** : Vue en lecture seule de la conformité globale, liste des entreprises affiliées, alertes critiques, exports PDF pour DGAC
  * **\[P1 - Complet\]** : Vue consolidée multi-sites avancée, agrégation temps réel, workflows validation croisée, benchmarking secteur, carte interactive alertes, conformité par zone/terminal, reporting DGAC/EASA unifié, actions d'administration

### 9.7 Module : Wallet Documents Entreprise (P1)

* **Coffre-fort numérique sécurisé** pour documents de conformité et formation
* **Upload et stockage chiffré AES-256** avec redondance et backup automatique
* **Versioning automatique** avec historique complet et comparaison de versions
* **Partage sélectif** avec liens temporaires et expiration configurable
* **OCR automatique** et extraction de métadonnées pour recherche
* **Recherche full-text** avancée dans tous les documents
* **Catégorisation intelligente** (certifications, attestations, conventions, etc.)
* **Notifications d'expiration** pour documents à renouveler
* **Audit trail complet** pour traçabilité et conformité RGPD
* **Intégration avec le système de conformité** pour validation automatique

### 9.8 Module : Administration Plateforme (Back-Office)

* Gestion utilisateurs (Voir liste tous rôles, Activer/Désactiver, Modifier rôle/entreprise).
* **Workflow Validation OF** (Voir demandes, consulter infos/docs, Approuver/Rejeter).
* Gestion formations (Voir toutes, Modifier/Dé publier \- Modération).
* Gestion catégories Aviation.
* Vue simples transactions CB (via dashboard Stripe \+ référence interne).
* Vue simples inscriptions LMS déclenchées (log/statut basique).
* Reporting avancé (financier, usage...).
* Gestion contenu statique (FAQ, CGU...).

---

## 10. User Flows Principaux - PYGMALION Marketplace Formation

### Voir dossier parcours utilisateurs

### 10.1 User Flow 1 : Apprenant EXTERNE - Trouver et s'inscrire à une formation (Paiement CB)

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
      * Certificat : Si formation terminée → écriture du hash du certificat sur Avalanche (hashrecord) → page vérification publique.
      * Accès : Trouve inscription dans Tableau de Bord \-\> "Mes Formations" \+ lien LMS si applicable.
    * NON : Écran : Erreur paiement \-\> Action : Peut réessayer ou annuler.
      *\[Feedback: Flux standard OK, ajout LMStrigger et notif OF. Gestion erreur paiement à prévoir.\]*

### 10.2 User Flow 2 : Apprenant INTERNE - S'inscrire à une formation assignée ou demandée

* **Cas A: Formation assignée par Manager**
  1. Notification (Email ? Dashboard ?) : Vous avez été inscrit à la formation X par votre manager.
  2. Action : Se connecte à la plateforme.
  3. Écran : Tableau de Bord Apprenant.
  4. Action : Va dans "Mes Formations".
  5. Écran : Voit la formation/session inscrite.
  6. Action : Clique sur le lien pour accéder (détails ou directement LMS).
* **Cas B: L'apprenant demande l'inscription**
  1. Arrivée Page d'Accueil \-\> Recherche \-\> Page Résultats \-\> Page Détail Formation.
  2. Action : Voit une session, clique "Demander l'inscription" (ou équivalent).
  3. Condition : Connecté ? (Assume OUI, comme Apprenant Interne).
  4. Écran : Confirmation de la demande soumise.
  5. Système : Notification envoyée au Manager pour validation.
  6. **(Flow Manager \- Validation)** Manager reçoit notif \-\> Va sur son Dashboard \-\> Section "Demandes" \-\> Approuve/Rejette.
  7. Condition : Approuvé par Manager ?
     * OUI :
       * Système : Valide l'inscription, décrémente place, **déclenche inscription LMS si e-learning**.
       * Notification : Email confirmation apprenant. Notification OF.
       * Certificat : Si formation terminée → écriture du hash du certificat sur Avalanche (hashrecord).
       * Accès : Apprenant voit l'inscription dans "Mes Formations".
     *
     * NON : Notification : Email apprenant informant du rejet.
       *\[Feedback: Flux Interne crucial. Le Cas B nécessite un mini-workflow d'approbation Manager.\]*

### 10.3 User Flow 3 : Organisme de Formation (OF) - Créer et publier une nouvelle formation e-learning

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
    *\[Feedback: Flux OK, ajout Modalité E-learning et ID Cours LMS essentiel.\]*

### 10.4 User Flow 4 : Manager - Consulter les inscriptions de son équipe

1. Connexion Tableau de Bord Manager.
2. Écran : Tableau de Bord Manager (accueil).
3. Action : Navigue vers "gestion des Formations".
4. Écran : Affiche la liste des apprenants internes rattachés au Manager.
5. Action : Clique sur un apprenant OU sur une vue "Formations de l'équipe".
6. Écran : Affiche la liste des inscriptions pour cet apprenant / l'équipe (Formation, Session, Date inscription, Statut basique).
   *\[Feedback: Simple vue en lecture. Assignation/Validation serait un flow distinct.\]*

