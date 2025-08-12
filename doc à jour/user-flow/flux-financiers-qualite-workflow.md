---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# WORKFLOW FLUX FINANCIERS & PROCESSUS QUALITÉ
## Spécifications Fonctionnelles Détaillées

**Projet :** Pygmalion - Marketplace de Formation Aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## **1. FLUX FINANCIERS - Architecture des paiements**

### **A. Les acteurs du système**

1. **Client** : L'acheteur final (apprenant ou entreprise) qui paie la formation
2. **Marchand** : L'Organisme de Formation (OF) qui délivre la prestation
3. **Plateforme** : Pygmalion - orchestrateur de la transaction
4. **Stripe** : Prestataire de paiement sécurisé

### **B. Flux entrants (en vert)**

#### **B.1 Paiement Client → Stripe**
- Initiation du paiement via Stripe Checkout
- Traitement sécurisé des données bancaires
- Autorisation et capture des fonds

#### **B.2 Reversement Stripe → Marchand**
- Transfert automatique après déduction :
  - Frais Stripe (2.9% + 0.30€)
  - Commission plateforme (15-20%)
- Délai de payout : J+2 à J+7 selon configuration

#### **B.3 Webhooks Stripe → Plateforme**
- Événements temps réel : `payment_intent.succeeded`, `payment_intent.failed`
- Métadonnées de transaction complètes
- Idempotence garantie via `stripe_idempotency_key`

### **C. Flux sortants et rétroactions (en rouge)**

#### **C.1 Plateforme → Marchand**
- Notification de paiement validé
- Détails d'inscription/commande
- Déclenchement de la prestation

#### **C.2 Plateforme → Stripe**
- Création de sessions de paiement
- Gestion des remboursements
- Requêtes API avec PaymentIntent

#### **C.3 Marchand → Client**
- Livraison du service (accès LMS)
- Émission facture électronique
- Documents de formation

### **D. Cas d'exception et remboursements**

- **Remboursement total/partiel** : Stripe → Client direct
- **Litiges** : Gestion via dashboard Stripe Radar
- **Échecs de paiement** : Retry automatique avec decay exponentiel

---

## **2. PROCESSUS QUALITÉ - Enquêtes de satisfaction**

### **A. Circuit des enquêtes de satisfaction (EdS)**

#### **A.1 EdS Formation - Apprenant**
- **À T0** (à chaud) : Via LMS ou MP en fin de formation
- **À T+90** (à froid) : Envoi par email avec lien MP
- **Obligation** : QUALIOPI - taux de réponse minimum 60%

#### **A.2 EdS Formation - Entreprise**
- Questionnaire spécifique pour le manager/superviseur
- Focus sur l'adéquation formation/besoins opérationnels

#### **A.3 EdS Formation - Formateur**
- Auto-évaluation de la session dispensée
- Remontée des difficultés pédagogiques

#### **A.4 EdS Retour Terrain Post-formation**
- Module de contrôle managérial
- Mesure de l'impact opérationnel réel
- Évaluation de l'évolution de l'agent sur le terrain

### **B. Système de notation et contrôle**

#### **B.1 Calcul et mise à jour**
```
Moyenne = Σ(notes) / nombre_evaluations
Seuil_critique = 3.8/5
```

#### **B.2 Actions selon notation**

**Si Moyenne > 3.8 :**
- Formation reste disponible sur MP
- Envoi des résultats à l'OF

**Si Moyenne < 3.8 :**
1. **J+0** : Demande de MAJ à l'OF (Engagements CDC)
2. **J+15** : Relance si pas de MAJ
3. **J+15-30** : Blocage temporaire de l'accès formation
4. **J+30** : Blocage définitif + contrôle modérateur MP

### **C. Contrôle qualité par modérateur**

- Vérification du contenu mis à jour
- Validation des engagements CDC respectés
- Décision : OK → déblocage / NOK → maintien blocage

---

## **3. GÉNÉRATION DOCUMENTAIRE**

### **A. Documents automatiques post-formation**

#### **A.1 Déclencheurs**
- Questionnaire complété et validé
- Fin de formation confirmée
- Paiement validé

#### **A.2 Documents générés**
1. **Certificat de formation** (avec tokenisation)
2. **Attestation de présence**
3. **Feuille d'émargement numérique**
4. **Facture acquittée**

### **B. Processus de tokenisation** *(Post-MVP 2026)*

```
Formation terminée → Génération certificat → Tokenisation blockchain → Émission certificat tokenisé
```

- Hash unique on-chain (Polygon)
- QR code de vérification
- Métadonnées immuables

---

## **4. GESTION ADMINISTRATIVE**

### **A. Bilan Pédagogique et Financier (BPF)**

- Génération automatique selon CERFA 10443*16
- Consolidation des données :
  - Nombre de stagiaires formés
  - Heures de formation dispensées
  - Chiffre d'affaires par type de formation
  - Taux de satisfaction global

### **B. Modules de gestion**

1. **Inscriptions** : Tracking complet du parcours client
2. **Facturation** : Génération, envoi, relances automatiques
3. **Reporting** : Tableaux de bord temps réel

---

## **5. ASPECTS RÉGLEMENTAIRES**

### **A. Structure juridique**

- **Société PYGMALION** : Filiale de VimPaci
- **Statut** : SAS au capital de X€
- **Immatriculation** : RCS, numéro de déclaration d'activité

### **B. Conformité**

1. **RGPD** : 
   - DPO désigné
   - Registre des traitements
   - Politique de confidentialité

2. **Objectifs de Développement Durable (ODD)**
   - Alignement sur les 17 ODD de l'ONU
   - Focus sur ODD 4 (Éducation de qualité)

3. **Politique RSE (ISO 26000)**
   - Gouvernance responsable
   - Impact environnemental minimisé
   - Contribution sociétale positive

---

## **6. ORGANISATION ÉQUIPE SUPPORT**

### **A. Structure opérationnelle**

```
Équipe PGM
    ├── Support (N1/N2)
    │   └── Service client
    └── Modérateur
        ├── Contrôle contenu
        └── Validation qualité
```

### **B. Processus d'escalade**

1. **Niveau 1** : Support client - résolution 80% des cas
2. **Niveau 2** : Support technique - cas complexes
3. **Modération** : Validation contenu et qualité
4. **Direction** : Litiges et cas critiques

---

## **7. INTÉGRATIONS TECHNIQUES**

### **A. APIs critiques**

1. **Stripe API v2023**
   - Webhooks sécurisés (HMAC)
   - Idempotence obligatoire
   - Rate limiting : 100 req/sec

2. **LMS Integration**
   - SSO via OAuth 2.0
   - Provisioning automatique
   - Sync des progressions

### **B. Sécurité des flux**

- **Chiffrement** : TLS 1.3 minimum
- **Authentification** : JWT avec rotation
- **Audit trail** : Logs immutables de toutes transactions

---

## **Notes de mise en œuvre**

Ce document constitue la référence exhaustive des flux financiers et processus qualité pour la plateforme Pygmalion. Il servira de base pour :
- L'intégration du système de paiement Stripe
- L'implémentation du système qualité QUALIOPI
- Le développement des workflows de contrôle
- La mise en conformité réglementaire

### **Points critiques d'implémentation**

- **Idempotence Stripe** : Éviter les paiements multiples via clés uniques
- **Seuil qualité 3.8/5** : Déclencheur automatique d'actions correctives
- **Tokenisation blockchain** : Système de preuve infalsifiable
- **RGPD** : Consentement explicite à chaque étape
- **BPF CERFA** : Export automatique pour déclaration annuelle

### **Métriques de succès**

- Taux de conversion paiement > 85%
- Délai de reversement OF < 7 jours
- Taux de satisfaction global > 4.2/5
- Conformité QUALIOPI : 100%
- Disponibilité système paiement : 99.9%

---

**© 2025 MB Aviation - Tous droits réservés**

**Société porteuse du projet :** MB Aviation  
**Société éditrice :** Kepler Aviation  
**Rédacteurs :** Robin Navarro, Aurélien Francio, Pierre Beunardeau

*Ce document est la propriété exclusive de MB Aviation. Toute reproduction ou distribution non autorisée est strictement interdite.*

---
