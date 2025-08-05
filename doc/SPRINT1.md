## 🧪 **LISTE EXHAUSTIVE DE QUESTIONS DE TEST**

### **🏗️ SECTION 1 : INFRASTRUCTURE & SETUP**

#### **Backend (Port 8000)**
```bash
URL : http://localhost:8000
```
- [x] Le backend démarre-t-il sans erreur ?
- [x] L'endpoint `/health` répond-il ?
- [x] L'endpoint `/api/courses` retourne-t-il des données ?
- [x] Vois-tu "Aviation Training Solutions" dans les données API ?
- [x] La base Supabase est-elle connectée ?

#### **Frontend (Port 8080)**
```bash
URL : http://localhost:8080
```
- [x] Le frontend se charge-t-il sans erreur ?
- [x] Y a-t-il des erreurs rouges
 dans la console (F12) ?
- [ ] Les styles Tailwind s'affichent-ils correctement ?
- [ ] La navigation responsive fonctionne-t-elle ?

🔐 AUTHENTIFICATION

  - Comptes test créés : ✅ 4 utilisateurs Supabase Auth
  - Login fonctionne : ✅ JWT token retourné
  - Mot de passe : TestPassword123! pour tous les comptes


---

### **🛍️ SECTION 2 : MARKETPLACE PUBLIC**

#### **Page d'Accueil**
```typescript
URL : http://localhost:8080/
```
- [ ] **Hero Section** : Titre + CTA visible ?
- [ ] **Formations vedettes** : Combien de formations affichées ?
- [ ] **Catégories** : Carousel avec catégories aviation ?
- [ ] **TrustedBy** : Logos partenaires visibles ?
- [ ] **Stats** : Chiffres de la plateforme affichés ?
- [ ] **Testimonials** : Avis clients visibles ?

#### **Catalogue Formations**
```typescript
URL : http://localhost:8080/courses
```
- [ ] **Liste formations** : Combien au total ?
- [ ] **Recherche** : Tape "sécurité" → résultats filtrés ?
- [ ] **Filtres catégorie** : Sélectionne "Sécurité" → filtre appliqué ?
- [ ] **Filtres modalité** : Présentiel/Distanciel/Hybride fonctionnent ?
- [ ] **Tri** : Par prix/date/popularité fonctionne ?
- [ ] **Vue grille/liste** : Toggle fonctionne ?
- [ ] **Pagination** : S'il y a +10 formations ?

#### **Détail Formation**
```typescript
URL : http://localhost:8080/courses/[id]
```
- [ ] **En-tête formation** : Titre + provider + rating ?
- [ ] **Onglet Détails** : Description + objectifs + prérequis ?
- [ ] **Onglet Sessions** : Liste des sessions avec dates/prix ?
- [ ] **Onglet Inscription** : Formulaire accessible ?
- [ ] **Sidebar** : Prix + durée + modalité ?
- [ ] **Bouton inscription** : Redirige vers quoi ?

---

### **🔐 SECTION 3 : AUTHENTIFICATION**

#### **Inscription - Général**
```typescript
URL : http://localhost:8080/register
```
- [ ] **Sélection rôle** : 4 options (Apprenant/OF/Manager/Aéroport) ?
- [ ] **Formulaire** : Validation en temps réel ?
- [ ] **Soumission** : Que se passe-t-il après submit ?
- [ ] **Email confirmation** : Reçu dans inbox ou simulation ?

#### **Inscription - Organisme Formation**
```typescript
URL : http://localhost:8080/register/training-org
```
- [ ] **Étape 1** : Infos organisation (SIRET, adresse) ?
- [ ] **Étape 2** : Contact + documents upload ?
- [ ] **Validation** : Messages d'erreur si champs vides ?
- [ ] **Soumission** : Redirection vers page attente ?
- [ ] **Base données** : Nouvelle org créée en DB ?

#### **Inscription - Apprenant**
```typescript
URL : http://localhost:8080/register/learner
```
- [ ] **Parcours libre** vs **Parcours entreprise** ?
- [ ] **Formulaire** : Validation email + password ?
- [ ] **Soumission** : Nouvel user créé en DB ?
- [ ] **Auto-login** : Connecté automatiquement après ?

#### **Connexion**
```typescript
URL : http://localhost:8080/login
```
- [ ] **Formulaire login** : Email + password ?
- [ ] **Validation** : Messages d'erreur si mauvais credentials ?
- [ ] **Remember me** : Option disponible ?
- [ ] **Forgot password** : Lien fonctionne ?
- [ ] **Redirection** : Vers dashboard selon rôle ?

---

### **🏢 SECTION 4 : DASHBOARD ORGANISME FORMATION**

#### **Accès Dashboard OF**
```typescript
URL : http://localhost:8080/training-org-dashboard
Prérequis : Connecté comme Philippe Moreau (OF)
```

#### **Onglet Vue d'ensemble**
- [ ] **Métriques** : Revenus + apprenants + formations ?
- [ ] **Graphiques** : Évolution revenus + inscriptions ?
- [ ] **Formations populaires** : Top 3 formations ?
- [ ] **Activité récente** : Nouvelles inscriptions ?

#### **Onglet Formations**
- [ ] **Liste formations** : Formations de l'OF seulement ?
- [ ] **Bouton "Créer formation"** : Ouvre modal/page ?
- [ ] **Actions** : Éditer/Dupliquer/Supprimer ?
- [ ] **Statuts** : Brouillon/Publié/Archivé ?

#### **Création Formation - Étape par étape**
```typescript
Action : Cliquer "Créer formation"
```
- [ ] **Étape 1 - Infos de base** : Titre + description + catégorie ?
- [ ] **Étape 2 - Contenu** : Upload vidéos + PDF + ressources ?
- [ ] **Étape 3 - Modules** : Création modules + quiz ?
- [ ] **Étape 4 - Sessions** : Planification + prix + modalité ?
- [ ] **Étape 5 - Publication** : Aperçu + publication marketplace ?
- [ ] **Sauvegarde** : Formation créée en base ?

#### **Onglet Sessions**
- [ ] **Calendrier** : Vue mensuelle + sessions planifiées ?
- [ ] **Créer session** : Formulaire date + lieu + prix ?
- [ ] **Gestion inscrits** : Liste apprenants par session ?
- [ ] **Actions session** : Annuler/Reporter/Modifier ?

#### **Onglet Apprenants**
- [ ] **Liste apprenants** : Tous les inscrits OF ?
- [ ] **Progression individuelle** : % avancement par apprenant ?
- [ ] **Temps passé** : Heures par module ?
- [ ] **Résultats quiz** : Scores + tentatives ?

#### **Onglet Ventes**
- [ ] **Revenus totaux** : Chiffre du mois/année ?
- [ ] **Répartition par formation** : Top performers ?
- [ ] **Moyens de paiement** : Stripe + virements ?
- [ ] **Export données** : CSV/PDF disponible ?

#### **Onglet Évaluations**
- [ ] **Créer quiz** : Interface création questions ?
- [ ] **Créer examen** : Mode sécurisé + anti-fraude ?
- [ ] **Résultats** : Statistiques réussite/échec ?
- [ ] **Fraude détectée** : Alertes + logs ?

#### **Onglet Certificats**
- [ ] **Générés automatiquement** : Après réussite exam ?
- [ ] **Templates** : Personnalisation design OF ?
- [ ] **Tokenisation** : Blockchain automatique ?
- [ ] **Historique** : Tous certificats émis ?

---

### **👨‍🎓 SECTION 5 : DASHBOARD APPRENANT**

#### **Accès Dashboard Étudiant**
```typescript
URL : http://localhost:8080/student-dashboard
Prérequis : Connecté comme Laurent Dubois (Apprenant)
```

#### **Vue d'ensemble**
- [ ] **Formations en cours** : Progression % visible ?
- [ ] **Prochaines échéances** : Examens + deadlines ?
- [ ] **Certificats obtenus** : Historique + download ?
- [ ] **Temps d'étude** : Heures cette semaine/mois ?

#### **Mes Formations**
- [ ] **Formations actives** : Statut En cours ?
- [ ] **Formations complétées** : Avec certificats ?
- [ ] **Formations à venir** : Sessions futures ?
- [ ] **Accès LMS** : Bouton "Continuer formation" ?

#### **Mes Certificats**
- [ ] **Liste certificats** : PDF téléchargeable ?
- [ ] **QR Code** : Vérification blockchain ?
- [ ] **Partage** : LinkedIn + réseaux sociaux ?
- [ ] **Validité** : Dates expiration visibles ?

#### **Profil & Conformité**
- [ ] **KYC Status** : Vérifié/En attente ?
- [ ] **Conformité formations** : Obligatoires OK ?
- [ ] **Données personnelles** : Modification possible ?
- [ ] **Préférences** : Notifications + langue ?

---

### **🎓 SECTION 6 : LMS & PARCOURS FORMATION**

#### **Accès LMS Formation**
```typescript
URL : http://localhost:8080/lms/course/[id]
Prérequis : Inscrit à "Sécurité Aéroportuaire DGAC"
```

#### **Interface LMS**
- [ ] **Sidebar navigation** : Liste modules + progression ?
- [ ] **Module actuel** : Contenu affiché ?
- [ ] **Onglets** : Contenu/Quiz/Vérification ?
- [ ] **Progression bar** : % global + par module ?

#### **Contenu Module**
- [ ] **Texte** : Contenu formaté + images ?
- [ ] **Vidéo** : Player intégré + contrôles ?
- [ ] **PDF** : Viewer intégré + téléchargement ?
- [ ] **Interactif** : Éléments cliquables ?
- [ ] **Navigation** : Précédent/Suivant fonctionnent ?

#### **Suivi Progression**
- [ ] **Temps passé** : Compteur en temps réel ?
- [ ] **Modules validés** : Checkmarks verts ?
- [ ] **Sauvegarde auto** : Position mémorisée ?
- [ ] **Reprise** : Reprend où on s'est arrêté ?

---

### **📝 SECTION 7 : QUIZ & ÉVALUATIONS**

#### **Quiz Intermédiaires**
```typescript
Action : Compléter un module + cliquer onglet "Quiz"
```

#### **Interface Quiz**
- [ ] **Questions** : Affichage une par une ou toutes ?
- [ ] **Types questions** : QCM + Vrai/Faux + texte libre ?
- [ ] **Timer** : Compte à rebours visible ?
- [ ] **Sélection réponses** : Radio buttons fonctionnent ?
- [ ] **Navigation** : Question précédente/suivante ?

#### **Soumission Quiz**
- [ ] **Validation** : Toutes questions répondues ?
- [ ] **Calcul score** : % affiché immédiatement ?
- [ ] **Seuil réussite** : 70% minimum respecté ?
- [ ] **Feedback** : Messages succès/échec ?
- [ ] **Déblocage** : Module suivant accessible si réussi ?

#### **Examens Finaux**
```typescript
Action : Terminer tous modules + accéder examen final
```

#### **Mode Examen Sécurisé**
- [ ] **Plein écran** : Forcé automatiquement ?
- [ ] **Vérification identité** : Photo + pièce d'identité ?
- [ ] **Timer strict** : Pas de pause possible ?
- [ ] **Une tentative** : Pas de retour en arrière ?

---

### **🛡️ SECTION 8 : ANTI-FRAUDE & SÉCURITÉ**

#### **Détection Tab Switching**
```typescript
Action : Pendant un quiz, Alt+Tab vers autre application
```
- [ ] **Alerte immédiate** : Popup warning ?
- [ ] **Compteur violations** : Nombre affiché ?
- [ ] **Seuil d'exclusion** : 3 violations = disqualification ?
- [ ] **Log activité** : Horodatage des violations ?

#### **Webcam Monitoring**
```typescript
Action : Démarrer examen final
```
- [ ] **Demande autorisation** : Permission webcam ?
- [ ] **Détection visage** : Vérification continue ?
- [ ] **Plusieurs personnes** : Alerte si détectées ?
- [ ] **Absence face** : Warning si pas de visage ?

#### **Vérification Identité**
```typescript
Action : Avant examen final
```
- [ ] **Photo pièce d'identité** : Upload + validation ?
- [ ] **Selfie temps réel** : Comparaison avec ID ?
- [ ] **Validation manuelle** : Processus approbation ?
- [ ] **Blocage accès** : Si identité non vérifiée ?

---

### **🏆 SECTION 9 : CERTIFICATS & TOKENISATION**

#### **Génération Certificat**
```typescript
Action : Réussir examen final avec >70%
```

#### **Processus Automatique**
- [ ] **Génération immédiate** : PDF créé automatiquement ?
- [ ] **Template OF** : Design personnalisé organisme ?
- [ ] **Données personnalisées** : Nom + formation + date ?
- [ ] **QR Code** : Intégré au PDF ?

#### **Tokenisation Blockchain**
```typescript
Action : Cliquer "Tokeniser certificat"
```
- [ ] **Simulation blockchain** : Délai 1.5 secondes ?
- [ ] **Token ID** : Généré + affiché ?
- [ ] **Transaction ID** : Hash 64 caractères ?
- [ ] **Statut vérification** : "Vérifié" affiché ?

#### **Vérification Certificat**
```typescript
URL : http://localhost:8080/verify-certificate
```
- [ ] **Scanner QR** : Interface scan fonctionnelle ?
- [ ] **Saisie manuelle** : Token ID + validation ?
- [ ] **Résultat vérification** : Authentique/Invalide ?
- [ ] **Détails** : Infos formation + apprenant ?

---

### **📊 SECTION 10 : ANALYTICS & REPORTING**

#### **Dashboard Admin Global**
```typescript
URL : http://localhost:8080/admin-dashboard
Prérequis : Connecté comme Admin
```

#### **Métriques Générales**
- [ ] **Utilisateurs totaux** : Chiffres temps réel ?
- [ ] **Revenus plateforme** : Total + évolution ?
- [ ] **Formations actives** : Nombre + statuts ?
- [ ] **Certificats émis** : Total + ce mois ?

#### **Analytics OF**
```typescript
Dashboard OF > Onglet Analytics
```
- [ ] **ROI formations** : Revenus par formation ?
- [ ] **Taux réussite** : % par formation ?
- [ ] **Satisfaction** : Notes moyennes ?
- [ ] **Temps moyen** : Durée parcours apprenant ?

#### **Business Intelligence**
- [ ] **Graphiques temps réel** : Données live ?
- [ ] **Export données** : CSV/Excel disponible ?
- [ ] **Filtres période** : Jour/Semaine/Mois/Année ?
- [ ] **Comparaisons** : Évolution vs période précédente ?

---

### **💳 SECTION 11 : INTÉGRATIONS PAIEMENT**

#### **Stripe Integration**
```typescript
Action : S'inscrire à formation payante
```

#### **Processus Paiement**
- [ ] **Page paiement** : Stripe Checkout intégré ?
- [ ] **Informations session** : Formation + prix + date ?
- [ ] **Méthodes paiement** : CB + Apple Pay + Google Pay ?
- [ ] **3D Secure** : Validation banque si nécessaire ?

#### **Après Paiement**
```typescript
URLs : /payment/success et /payment/cancel
```
- [ ] **Success page** : Confirmation + détails ?
- [ ] **Email confirmation** : Reçu automatiquement ?
- [ ] **Accès formation** : Immédiatement disponible ?
- [ ] **Cancel page** : Retour catalogue possible ?

---

### **🔗 SECTION 12 : INTÉGRATIONS SUPABASE**

#### **Storage Fichiers**
```typescript
Action : Upload PDF/vidéos dans création formation
```
- [ ] **Upload réussi** : Fichiers stockés Supabase ?
- [ ] **URLs publiques** : Accessibles dans LMS ?
- [ ] **Sécurité** : Accès limité aux inscrits ?
- [ ] **Performance** : Chargement rapide médias ?

#### **Base de Données**
```typescript
Action : Toute action CRUD (Create/Read/Update/Delete)
```
- [ ] **Persistance** : Données sauvées après refresh ?
- [ ] **Synchronisation** : Changements temps réel ?
- [ ] **Intégrité** : Relations entre tables OK ?
- [ ] **Performance** : Requêtes <2 secondes ?

---

## 🚨 **MÉTHODE DE VALIDATION**

### **Pour chaque question :**
- [ ] **✅ FONCTIONNE** : Feature complète + persistante
- [ ] **🎨 UI SEULEMENT** : Interface OK mais données mockées
- [ ] **❌ CASSÉ** : Erreurs ou ne fonctionne pas
- [ ] **⚠️ PARTIEL** : Fonctionne partiellement

### **Test de Persistance Obligatoire :**
Après chaque action importante :
1. **Refresh page** (F5)
2. **Vérifier si données persistent**
3. **Noter si c'est vraiment sauvé ou juste en mémoire**

---

## 🔑 **COMPTES DE TEST SEED**

### **Données Demo Disponibles :**
```bash
# Organisme Formation
Email: philippe.moreau@aviationtraining.fr
Role: training_org

# Apprenant  
Email: laurent.dubois@airfrance.fr
Role: student

# Manager
Email: manager.demo@aviationtraining.fr 
Role: manager

# Admin
Email: admin@pygmalion.fr
Role: admin
```

### **Formation Test :**
- **"Sécurité Aéroportuaire - DGAC"** par Aviation Training Solutions SARL
- **Sessions disponibles** avec inscriptions possible
- **Modules + Quiz + Examen final** complets

---

## 🎯 **PAR QUELLE SECTION TU COMMENCES ?**

Je recommande cet ordre :
1. **Infrastructure** (backend/frontend up)
2. **Marketplace** (navigation de base)  
3. **Auth** (inscription/connexion avec comptes seed)
4. **Dashboard** (selon ton rôle de test)
5. **LMS** (parcours complet formation DGAC)

**Dis-moi par où tu veux commencer et je t'aide à analyser les résultats !** 🚀