**PROJET - PYGMALION**

---

**BRIEF MARKETPLACE**

**Attentes & Besoins**

---

La marketplace est conçue comme un pivot technologique central qui connecte les organismes de formation à des entreprises et apprenants du secteur aéroportuaire. Elle vise à centraliser les offres de formation, simplifier les processus d'achat et de gestion, tout en assurant une conformité stricte aux normes métiers.

Sur le plan technique, la marketplace repose sur une architecture modulaire interconnectée avec le LMS de la plateforme. Elle doit permettre l'affichage dynamique d'un catalogue multicritère de formations (thématique, format, modalité, certification, prix, ...) intégrant un moteur de recherche intelligent, des filtres avancés et des pages détaillées pour chaque offre. Un système transactionnel fluide est requis : panier multi-apprenants, paiement et affiliation de formation aux apprenants intuitif.

Côté organismes de formation (client revendeur), un back-office partenaire intuitif est essentiel. Il permettra de créer, gérer et publier les offres, suivre les ventes, planifier les sessions et automatiser la génération de documents administratifs (émargement, attestations, contrats). Ce module devra également intégrer des contrôles de conformité pour garantir la qualité de la transmission des contenus publiés.

La plateforme intègre par ailleurs des outils puissants pour les entreprises utilisatrices : tableaux de bord (Risk & audit management) pour suivre l'état de conformité des formations, planifier les renouvellements, générer des rapports et interagir directement avec les OF.

Le développement de la plateforme devra pouvoir à terme permettre une connexion via API entre la plateforme et les logiciels ERP/HRIS déjà existant sur le marché.

Enfin, tous les processus doivent être sécurisés, traçables et conformes au RGPD : authentification forte, stockage chiffré, signature électronique, journalisation des activités sensibles. Les attestations NFT doivent pouvoir être disponibles et consultables facilement par les utilisateurs.

*(cf. "Requirements - Catalogue de formation")*

**1. Objectifs et rôle de la marketplace**

**Objectif principal**

Centraliser toutes les formations du secteur aéroportuaire sur une plateforme unique, ouverte aux organismes partenaires et conforme aux exigences réglementaires.

**Cibles utilisateurs**

* **Organismes de formation (OF)** - Revendeur
* **Entreprises** (gestionnaires aéroportuaires, compagnies aériennes, assistants en escale, autres entreprises liées au domaine aéroportuaire) – Consommateur
* **Apprenants individuels** - Consommateur
* **Administrateurs plateforme**

**2. Fonctionnalités de base**

**2.1 Catalogue de formations**

**Affichage dynamique des formations :**
* Par thématique
* Par format (e-learning, présentiel, semi-présentiel)
* Par langue, niveau, certification incluse
* Filtres avancés : durée, prix, organisme, dates, lieu, etc., …
* Moteur de recherche intelligent

**2.2 Pages de détail formation**

* **Description complète** : voir requirements – Catalogue de formation
* **Évaluation utilisateurs** : notes, commentaires, retour qualitatif, éval. Qualiopi
* **Boutons d'actions** :
  * Ajouter au panier
  * Faire une demande de devis
  * Faire une demande de financement (accès à l'interface pour préremplir les docs)

**3. Espace revendeur (OF)**

**3.1 Gestion de l'offre**

* Création de la formation directement dans l'espace LMS
* Création de l'article dans la marketplace
* Téléchargement de contenus pédagogiques liés
* Gestion des sessions (typologie de modalité, dates, lieux, intervenants)

**3.2 Automatisation administrative**

* Génération automatique des documents : feuilles d'émargement, attestations, certificats (MP/LMS)
* Signature électronique intégrée

**3.3 Statistiques et gestion commerciale**

* Tableau de bord des ventes, inscriptions, revenus
* Gestion des abonnements ou commissions
* Visualisation des retours d'expérience des apprenants, notifications sur l'annonce de formation

**4. Espace Entreprise (Client / Consommateur)**

**4.1 Interface de commande**

* Création de panier groupé pour plusieurs salariés
* Affiliation intuitive des formations à des groupes d'apprenants
* Gestion des rôles RH et managers (validation de commande, suivi)
* Demande d'accompagnement pour le financement
* (Émission de documents pour faciliter la demande de financement à postériori)

**4.2 Suivi de l'exécution**

**Tableau de bord :**
* Formations en cours
* Échéances à venir
* Résultats et certifications

**5. Sécurité, conformité et règles d'adhésion**

**5.1 Conformité légale**

* Contrôle Qualiopi / audit automatique des OF
* Validation semi-automatique des nouvelles formations par les administrateurs
* Génération de documents normalisés pour OPCO

**5.2 Système de contrat numérique**

* Signature électronique des CGU/CGV à l'inscription
* Signature d'une charte de bonne pratique ("contrat moral")
* Signature de l'ensemble des documents que les utilisateurs doivent signer (feuille d'émargement, convention de formation, etc...)

**6. UX, interactivité et accompagnement**

**6.1 Interface utilisateur fluide**

* Design responsive et clair pour tous profils d'utilisateur
* Espace de mise en avant de formation, encart publicitaire
* Éléments de preuve sociales (témoignages, évaluations, notes, etc., …)
* Optimisation référencement

**6.2 Support client**

* Chatbot de support intégré
* FAQ dynamique et guide vidéo

---

## **REQUIREMENTS MARKETPLACE**

### **Design landing page: Simple, efficace, web3**

**Informations primordiales.**

**Prendre exemple sur :**
* Plateforme F : Formations pour tous les professionnels de l'immobilier
* Safe Handling : Formation aéroportuaire Paris (Orly, Roissy, CDG)

### **Spécifications Design & UX**

**Design épuré et professionnel :** Le design devra être épuré et simple, mettre en valeur le contenu sans le surcharger. Un thème professionnel et sobre est préférable, avec une palette de couleurs reflétant la marque de l'entreprise.

**Navigation Intuitive :** Navigation simple et intuitive impérative. Les menus doivent être clairement étiquetés et logiquement organisés.

**Mise en Avant des Formations Phares :** Mettre en avant les formations les plus populaires ou les plus pertinentes. Ceci peut se faire via des carrousels d'images ou des sections « À la une ».

**Filtres de Recherche Efficaces :** Proposer des filtres de recherche pour permettre aux utilisateurs de trouver rapidement les formations qui correspondent à leurs besoins (exemple : par type d'activités : piste/passage/outil/machine…)

**Descriptions et détails des cours :** Chaque cours doit avoir une page détaillée avec des informations claires sur le contenu, la durée, le formateur, les avis, etc.

**Éléments de Preuve Sociale :** Intégrer des éléments de preuve sociale comme les témoignages d'utilisateurs, les évaluations des cours, et les certifications obtenues.

**Appels à l'Action Visibles :** Les boutons d'appel à l'action (inscription, demande d'informations, etc.) doivent être visibles et inciter à l'action.

### **Adaptabilité et Restrictions d'Accès**

**Adaptabilité Mobile :** La page doit être entièrement responsive, offrant une expérience utilisateur optimale sur les appareils mobiles (interface marché uniquement).

**Limiter l'accès des formations sur mobile :** Utilisation de l'espace de formation accessible uniquement via ordinateur ou tablette (pas de formation dans le bus, etc., …)

### **Optimisation**

**Optimisation pour le Référencement :** Optimisation de la page pour les moteurs de recherche pour attirer du trafic organique. 