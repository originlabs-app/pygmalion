---
**DOCUMENT CONFIDENTIEL**

![Logo MB Aviation](logo-placeholder)

# TSD - TECHNICAL SPECIFICATION DOCUMENT
## PYGMALION - Architecture et Spécifications Techniques

**Projet :** Pygmalion - Plateforme de Formation Aéronautique  
**Version :** 1.0  
**Date :** Août 2025  
**Classification :** Confidentiel

---

## **1. INTRODUCTION & OBJECTIFS TECHNIQUES**

### **1.1 Contexte technique**

Pygmalion est une plateforme marketplace de formation aéronautique nécessitant une architecture hautement sécurisée, scalable et conforme aux exigences réglementaires du secteur aéronautique. Le système doit gérer des transactions financières, des données sensibles de formation, et garantir une traçabilité complète via blockchain.

### **1.2 Objectifs techniques principaux**

1. **Sécurité maximale** : MFA, KYC/KYB, chiffrement AES-256, audit trail
2. **Scalabilité** : Support de 10,000+ utilisateurs simultanés
3. **Performance** : Temps de réponse < 200ms, uptime 99.5%
4. **Interopérabilité** : APIs RESTful, intégrations LMS, blockchain
5. **Conformité** : RGPD, PCI-DSS (via Stripe), QUALIOPI
6. **Innovation** : Tokenisation blockchain native, IA anti-fraude

### **1.3 Contraintes techniques**

- **Stack imposée** : NestJS (backend), React 18 + Vite (frontend)
- **Base de données** : PostgreSQL avec Prisma ORM
- **Paiements** : Stripe exclusivement
- **Blockchain** : Polygon pour les smart contracts
- **Hébergement** : Cloud (AWS/Render) avec CDN Cloudflare
- **Monitoring** : Sentry pour logs et erreurs

---

## **2. ARCHITECTURE GLOBALE**

### **2.1 Vue d'ensemble (C4 Model - Niveau Contexte)**

```mermaid
graph TB
    subgraph "Utilisateurs"
        U1[Apprenants]
        U2[Organismes Formation]
        U3[Entreprises]
        U4[Gestionnaires Aéroport]
        U5[Formateurs]
    end
    
    subgraph "Système Pygmalion"
        PF[Plateforme Pygmalion]
    end
    
    subgraph "Systèmes Externes"
        LMS[LMS Partenaires]
        STRIPE[Stripe Payments]
        BLOCKCHAIN[Polygon Network]
        EMAIL[SendGrid]
        STORAGE[Supabase Storage]
        AUTH[Auth Services]
    end
    
    U1 & U2 & U3 & U4 & U5 --> PF
    PF --> LMS
    PF --> STRIPE
    PF --> BLOCKCHAIN
    PF --> EMAIL
    PF --> STORAGE
    PF --> AUTH
```

### **2.2 Architecture Technique (Niveau Container)**

```mermaid
graph TB
    subgraph "Frontend Layer"
        WEB[React App<br/>Vite + TypeScript]
        MOBILE[PWA Mobile<br/>React + Capacitor]
    end
    
    subgraph "API Gateway"
        GATEWAY[NestJS Gateway<br/>Rate Limiting + Auth]
    end
    
    subgraph "Backend Services"
        AUTH_SVC[Auth Service<br/>JWT + MFA]
        MARKET_SVC[Marketplace Service<br/>Catalog + Search]
        LMS_SVC[LMS Service<br/>Integration + SSO]
        PAYMENT_SVC[Payment Service<br/>Stripe + Webhooks]
        BLOCKCHAIN_SVC[Blockchain Service<br/>Smart Contracts]
        NOTIF_SVC[Notification Service<br/>Email + Push]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL<br/>Primary DB)]
        REDIS[(Redis<br/>Cache + Sessions)]
        S3[(Supabase<br/>File Storage)]
    end
    
    WEB & MOBILE --> GATEWAY
    GATEWAY --> AUTH_SVC & MARKET_SVC & LMS_SVC & PAYMENT_SVC & BLOCKCHAIN_SVC & NOTIF_SVC
    AUTH_SVC & MARKET_SVC & LMS_SVC & PAYMENT_SVC & BLOCKCHAIN_SVC --> DB
    AUTH_SVC --> REDIS
    MARKET_SVC & LMS_SVC --> S3
```

### **2.3 Architecture de déploiement**

```yaml
Production Environment:
  Frontend:
    - CDN: Cloudflare (global edge)
    - Hosting: Vercel/Netlify
    - Assets: Optimized bundles < 500KB
  
  Backend:
    - API: AWS ECS/Render (auto-scaling)
    - Load Balancer: AWS ALB
    - Regions: EU-WEST-1 (primary), EU-WEST-2 (backup)
  
  Database:
    - Primary: AWS RDS PostgreSQL (Multi-AZ)
    - Read Replicas: 2x for load distribution
    - Backup: Daily snapshots, 30-day retention
  
  Blockchain:
    - Network: Polygon Mainnet
    - Smart Contracts: Upgradeable proxy pattern
    - IPFS: Decentralized storage for certificates
```

---

## **3. STACK TECHNIQUE DÉTAILLÉE**

### **3.1 Frontend Stack**

#### **Core Technologies**
```json
{
  "framework": "React 18.2",
  "bundler": "Vite 4.4",
  "language": "TypeScript 5.2",
  "styling": "Tailwind CSS 3.3",
  "state": "Redux Toolkit + RTK Query",
  "routing": "React Router v6",
  "forms": "React Hook Form + Zod",
  "ui-components": "Radix UI + Shadcn",
  "charts": "Recharts",
  "testing": "Vitest + React Testing Library"
}
```

#### **Key Libraries**
- **axios**: API communication
- **react-query**: Server state management
- **react-i18next**: Internationalization
- **date-fns**: Date manipulation
- **crypto-js**: Client-side encryption
- **web3.js**: Blockchain interaction

### **3.2 Backend Stack**

#### **Core Technologies**
```json
{
  "framework": "NestJS 10",
  "runtime": "Node.js 20 LTS",
  "language": "TypeScript 5.2",
  "orm": "Prisma 5.6",
  "validation": "class-validator",
  "auth": "Passport + JWT",
  "api-docs": "Swagger/OpenAPI",
  "testing": "Jest + Supertest",
  "logging": "Winston + Morgan"
}
```

#### **Key Libraries**
- **@nestjs/microservices**: Microservices architecture
- **@nestjs/bull**: Queue management
- **stripe**: Payment processing
- **@sendgrid/mail**: Email service
- **ethers.js**: Ethereum interaction
- **multer**: File uploads
- **bcrypt**: Password hashing
- **speakeasy**: 2FA/OTP

### **3.3 Infrastructure Stack**

#### **Services & Tools**
```yaml
Hosting:
  - AWS EC2/ECS or Render
  - Docker containers
  - Kubernetes (optional for scale)

Database:
  - PostgreSQL 15
  - Redis 7 (caching)
  - Prisma migrations

Storage:
  - Supabase Storage (documents)
  - AWS S3 (backups)
  - IPFS (blockchain documents)

Monitoring:
  - Sentry (errors)
  - Datadog/New Relic (APM)
  - CloudWatch (infrastructure)

CI/CD:
  - GitHub Actions
  - Docker Hub
  - Automated testing
  - Blue-green deployments
```

### **3.4 Intégrations externes**

| Service | Usage | Protocole | Auth |
|---------|-------|-----------|------|
| **Stripe** | Paiements | REST API | Secret Key |
| **SendGrid** | Emails | REST API | API Key |
| **Polygon** | Blockchain | JSON-RPC | Private Key |
| **LMS Partners** | Formation | REST/SOAP | OAuth 2.0 |
| **OPCO/CPF** | Financement | REST API | Client Cert |
| **Cloudflare** | CDN/WAF | API | API Token |

---

## **4. MODULES & SPÉCIFICATIONS DÉTAILLÉES**

### **4.1 Module Authentification & Sécurité**

#### **Fonctionnalités**
```typescript
interface AuthModule {
  // Registration
  registerUser(data: RegistrationDto): Promise<User>
  validateKYC(documents: KYCDocuments): Promise<ValidationResult>
  validateKYB(documents: KYBDocuments): Promise<ValidationResult>
  
  // Authentication
  login(credentials: LoginDto): Promise<AuthTokens>
  refreshToken(refreshToken: string): Promise<AuthTokens>
  logout(userId: string): Promise<void>
  
  // MFA/OTP
  generateOTP(userId: string): Promise<string>
  verifyOTP(userId: string, otp: string): Promise<boolean>
  setupMFA(userId: string): Promise<MFASetup>
  
  // SSO
  initiateSSOLogin(provider: string): Promise<SSORedirect>
  handleSSOCallback(code: string): Promise<User>
}
```

#### **Flux d'authentification**
```mermaid
sequenceDiagram
    User->>Frontend: Login request
    Frontend->>API: POST /auth/login
    API->>API: Validate credentials
    API->>API: Generate OTP
    API->>Email: Send OTP
    API-->>Frontend: Request OTP
    User->>Frontend: Enter OTP
    Frontend->>API: POST /auth/verify-otp
    API->>API: Verify OTP
    API->>API: Generate JWT tokens
    API-->>Frontend: Return tokens
    Frontend->>Frontend: Store tokens
```

### **4.2 Module Marketplace**

#### **Fonctionnalités**
```typescript
interface MarketplaceModule {
  // Catalog Management
  createFormation(data: FormationDto): Promise<Formation>
  updateFormation(id: string, data: UpdateFormationDto): Promise<Formation>
  publishFormation(id: string): Promise<void>
  
  // Sessions
  createSession(formationId: string, data: SessionDto): Promise<Session>
  updateAvailability(sessionId: string, places: number): Promise<void>
  
  // Search & Filter
  searchFormations(query: SearchQuery): Promise<SearchResults>
  filterByCategory(category: string): Promise<Formation[]>
  getRecommendations(userId: string): Promise<Formation[]>
  
  // Enrollment
  enrollExternal(sessionId: string, payment: PaymentInfo): Promise<Enrollment>
  assignInternal(sessionId: string, userIds: string[]): Promise<Enrollment[]>
}
```

### **4.3 Module LMS Integration**

#### **Fonctionnalités**
```typescript
interface LMSModule {
  // SSO & Provisioning
  provisionUser(user: User): Promise<LMSAccount>
  generateSSOToken(userId: string): Promise<SSOToken>
  syncUserProgress(userId: string): Promise<Progress>
  
  // Content Management
  uploadSCORM(file: File): Promise<SCORMPackage>
  trackProgress(userId: string, courseId: string): Promise<void>
  
  // Completion & Certification
  markComplete(enrollmentId: string): Promise<void>
  generateCertificate(enrollmentId: string): Promise<Certificate>
}
```

### **4.4 Module Paiement (Stripe)**

#### **Fonctionnalités**
```typescript
interface PaymentModule {
  // Payment Processing
  createCheckoutSession(items: CartItem[]): Promise<StripeSession>
  processPayment(sessionId: string): Promise<PaymentResult>
  
  // Webhooks
  handleWebhook(event: StripeEvent): Promise<void>
  validateWebhookSignature(payload: string, signature: string): boolean
  
  // Refunds & Disputes
  issueRefund(paymentId: string, amount?: number): Promise<Refund>
  handleDispute(disputeId: string): Promise<DisputeResult>
  
  // Payouts
  createPayout(merchantId: string, amount: number): Promise<Payout>
  getPayoutSchedule(merchantId: string): Promise<Schedule>
}
```

#### **Webhook Events**
```javascript
// Critical Stripe webhooks to handle
const WEBHOOK_EVENTS = [
  'payment_intent.succeeded',
  'payment_intent.failed',
  'checkout.session.completed',
  'invoice.payment_succeeded',
  'payout.created',
  'payout.failed',
  'dispute.created'
];
```

### **4.5 Module Blockchain**

#### **Smart Contract Architecture**
```solidity
// Certificate Token Contract
contract PygmalionCertificate is ERC721, Ownable {
    struct Certificate {
        string formationId;
        string userId;
        uint256 issuedAt;
        string ipfsHash;
        bool isValid;
    }
    
    mapping(uint256 => Certificate) public certificates;
    
    function mintCertificate(
        address to,
        string memory formationId,
        string memory userId,
        string memory ipfsHash
    ) public onlyOwner returns (uint256);
    
    function verifyCertificate(uint256 tokenId) public view returns (bool);
    function revokeCertificate(uint256 tokenId) public onlyOwner;
}
```

#### **Fonctionnalités Blockchain**
```typescript
interface BlockchainModule {
  // Certificate Management
  mintCertificate(data: CertificateData): Promise<TokenId>
  verifyCertificate(tokenId: string): Promise<VerificationResult>
  revokeCertificate(tokenId: string, reason: string): Promise<void>
  
  // IPFS Storage
  uploadToIPFS(document: Buffer): Promise<IPFSHash>
  retrieveFromIPFS(hash: string): Promise<Buffer>
  
  // Smart Contract Interaction
  deployContract(abi: ABI, bytecode: string): Promise<ContractAddress>
  callContractMethod(address: string, method: string, params: any[]): Promise<any>
}
```

---

## **5. MODÈLE DE DONNÉES (ERD)**

### **5.1 Schéma principal (Prisma)**

```prisma
// User Management
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  role          UserRole
  kycStatus     KYCStatus @default(PENDING)
  mfaEnabled    Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  profile       Profile?
  enrollments   Enrollment[]
  organizations Organization[]
  certificates  Certificate[]
}

model Organization {
  id           String    @id @default(cuid())
  name         String
  type         OrgType
  siret        String    @unique
  kybStatus    KYBStatus @default(PENDING)
  qualiopiNumber String?
  
  users        User[]
  formations   Formation[]
  managers     Manager[]
}

// Formation & Sessions
model Formation {
  id            String   @id @default(cuid())
  title         String
  description   String   @db.Text
  category      Category
  modalite      Modalite[]
  duration      Int      // in hours
  price         Decimal  @db.Decimal(10, 2)
  
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  
  sessions      Session[]
  enrollments   Enrollment[]
}

model Session {
  id           String   @id @default(cuid())
  formationId  String
  startDate    DateTime
  endDate      DateTime
  location     String?
  maxPlaces    Int
  availablePlaces Int
  
  formation    Formation @relation(fields: [formationId], references: [id])
  enrollments  Enrollment[]
}

// Enrollments & Payments
model Enrollment {
  id          String   @id @default(cuid())
  userId      String
  sessionId   String
  status      EnrollmentStatus
  paymentId   String?
  enrolledAt  DateTime @default(now())
  completedAt DateTime?
  
  user        User     @relation(fields: [userId], references: [id])
  session     Session  @relation(fields: [sessionId], references: [id])
  payment     Payment? @relation(fields: [paymentId], references: [id])
  certificate Certificate?
}

model Payment {
  id              String   @id @default(cuid())
  stripeSessionId String   @unique
  amount          Decimal  @db.Decimal(10, 2)
  commission      Decimal  @db.Decimal(10, 2)
  status          PaymentStatus
  paidAt          DateTime?
  
  enrollments     Enrollment[]
}

// Certificates & Blockchain
model Certificate {
  id           String   @id @default(cuid())
  enrollmentId String   @unique
  tokenId      String?  @unique
  ipfsHash     String?
  issuedAt     DateTime @default(now())
  isValid      Boolean  @default(true)
  
  enrollment   Enrollment @relation(fields: [enrollmentId], references: [id])
}

// Enums
enum UserRole {
  ADMIN
  OF_ADMIN
  FORMATEUR
  APPRENANT
  MANAGER
  GESTIONNAIRE_AEROPORT
}

enum KYCStatus {
  PENDING
  VERIFIED
  REJECTED
}

enum OrgType {
  OF
  ENTREPRISE
  AEROPORT
}

enum Modalite {
  PRESENTIEL
  ELEARNING
  VIRTUEL
  BLENDED
}

enum EnrollmentStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
}
```

### **5.2 Relations clés**

```mermaid
erDiagram
    User ||--o{ Enrollment : "has many"
    User ||--o{ Organization : "belongs to"
    Organization ||--o{ Formation : "creates"
    Formation ||--o{ Session : "has many"
    Session ||--o{ Enrollment : "has many"
    Enrollment ||--o| Payment : "has one"
    Enrollment ||--o| Certificate : "generates"
    Certificate ||--o| Blockchain : "stored in"
```

---

## **6. API & ENDPOINTS**

### **6.1 Architecture API RESTful**

#### **Conventions**
- **Base URL**: `https://api.pygmalion.aero/v1`
- **Format**: JSON
- **Auth**: Bearer JWT Token
- **Versioning**: URL path (`/v1`, `/v2`)
- **Rate Limiting**: 100 req/min per user
- **Pagination**: `?page=1&limit=20`

### **6.2 Endpoints principaux**

#### **Authentication & Users**
```yaml
POST   /auth/register          # Inscription
POST   /auth/login             # Connexion
POST   /auth/logout            # Déconnexion
POST   /auth/refresh           # Refresh token
POST   /auth/verify-otp        # Vérification OTP
GET    /auth/me                # Profil utilisateur
PUT    /auth/profile           # Mise à jour profil
POST   /auth/kyc               # Soumission KYC
```

#### **Organizations & OF**
```yaml
POST   /organizations          # Créer organisation
GET    /organizations          # Liste organisations
GET    /organizations/:id      # Détails organisation
PUT    /organizations/:id      # Modifier organisation
POST   /organizations/:id/kyb  # Soumission KYB
POST   /organizations/:id/users # Ajouter utilisateur
```

#### **Formations & Catalog**
```yaml
GET    /formations             # Liste formations
GET    /formations/:id         # Détails formation
POST   /formations             # Créer formation (OF only)
PUT    /formations/:id         # Modifier formation
DELETE /formations/:id         # Supprimer formation
GET    /formations/search      # Recherche avancée
GET    /formations/categories  # Liste catégories
```

#### **Sessions**
```yaml
GET    /sessions               # Liste sessions
GET    /sessions/:id           # Détails session
POST   /formations/:id/sessions # Créer session
PUT    /sessions/:id           # Modifier session
DELETE /sessions/:id           # Annuler session
GET    /sessions/:id/enrollments # Liste inscrits
```

#### **Enrollments**
```yaml
POST   /enrollments            # S'inscrire (externe)
POST   /enrollments/assign     # Assigner (interne)
GET    /enrollments            # Mes inscriptions
GET    /enrollments/:id        # Détails inscription
PUT    /enrollments/:id/cancel # Annuler inscription
POST   /enrollments/:id/complete # Marquer terminé
```

#### **Payments**
```yaml
POST   /payments/checkout      # Créer session Stripe
POST   /payments/webhook       # Webhook Stripe
GET    /payments/:id           # Détails paiement
POST   /payments/:id/refund    # Demander remboursement
GET    /payments/history       # Historique paiements
```

#### **Certificates**
```yaml
GET    /certificates           # Mes certificats
GET    /certificates/:id       # Détails certificat
POST   /certificates/:id/verify # Vérifier authenticité
GET    /certificates/:id/download # Télécharger PDF
GET    /certificates/verify/:token # Vérification publique
```

#### **Dashboards & Reports**
```yaml
GET    /dashboard/manager      # Dashboard manager
GET    /dashboard/of           # Dashboard OF
GET    /dashboard/learner      # Dashboard apprenant
GET    /dashboard/airport      # Dashboard aéroport
GET    /reports/compliance     # Rapport conformité
GET    /reports/financial      # Rapport financier
GET    /reports/quality        # Rapport qualité
```

### **6.3 Exemple de requête/réponse**

#### **Inscription à une formation**
```http
POST /api/v1/enrollments
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "sessionId": "clh3k2j4h0001qy3k5e7n8d9m",
  "paymentMethod": "card",
  "participants": [
    {
      "userId": "clh3k2j4h0002qy3k5e7n8d9n",
      "email": "john.doe@airline.com"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "enrollmentId": "clh3k2j4h0003qy3k5e7n8d9o",
    "sessionId": "clh3k2j4h0001qy3k5e7n8d9m",
    "status": "PENDING",
    "checkoutUrl": "https://checkout.stripe.com/pay/cs_test_...",
    "expiresAt": "2025-08-12T15:30:00Z"
  }
}
```

### **6.4 APIs externes consommées**

#### **Stripe API**
```typescript
// Configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  maxNetworkRetries: 2,
  timeout: 20000
});

// Usage
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'eur',
      product_data: { name: formation.title },
      unit_amount: formation.price * 100
    },
    quantity: 1
  }],
  mode: 'payment',
  success_url: `${process.env.FRONTEND_URL}/success`,
  cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  metadata: { enrollmentId }
});
```

#### **LMS API Integration**
```typescript
// SSO Token Generation
async function generateLMSSSOToken(userId: string): Promise<string> {
  const payload = {
    sub: userId,
    iss: 'pygmalion',
    aud: 'lms-partner',
    exp: Math.floor(Date.now() / 1000) + (60 * 15), // 15 min
    iat: Math.floor(Date.now() / 1000)
  };
  
  return jwt.sign(payload, process.env.LMS_SHARED_SECRET);
}

// User Provisioning
async function provisionLMSUser(user: User): Promise<void> {
  await axios.post(`${LMS_API_URL}/users`, {
    externalId: user.id,
    email: user.email,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    role: mapRoleToLMS(user.role)
  }, {
    headers: {
      'Authorization': `Bearer ${LMS_API_KEY}`,
      'X-API-Version': '2.0'
    }
  });
}
```

---

## **7. SÉCURITÉ**

### **7.1 Authentification & Autorisation**

#### **JWT Strategy**
```typescript
// JWT Configuration
const jwtConfig = {
  access: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '15m'
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d'
  }
};

// Token Payload
interface JWTPayload {
  sub: string;         // userId
  role: UserRole;
  orgId?: string;      // organizationId
  permissions: string[];
  iat: number;
  exp: number;
}
```

#### **Role-Based Access Control (RBAC)**
```typescript
// Permissions Matrix
const PERMISSIONS = {
  ADMIN: ['*'],
  OF_ADMIN: [
    'formation:create',
    'formation:update',
    'formation:delete',
    'session:create',
    'session:update',
    'dashboard:of'
  ],
  FORMATEUR: [
    'formation:read',
    'session:read',
    'enrollment:validate',
    'certificate:issue'
  ],
  MANAGER: [
    'user:create',
    'user:assign',
    'enrollment:create',
    'dashboard:manager'
  ],
  APPRENANT: [
    'formation:read',
    'enrollment:create:self',
    'certificate:download:self'
  ]
};
```

### **7.2 Row Level Security (RLS)**

#### **Database Policies**
```sql
-- Users can only see their own data
CREATE POLICY user_isolation ON users
  FOR ALL
  USING (id = current_user_id());

-- Managers can see their team
CREATE POLICY manager_team_access ON users
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM managers 
      WHERE user_id = current_user_id()
    )
  );

-- OF can see their formations
CREATE POLICY of_formation_access ON formations
  FOR ALL
  USING (
    organization_id = current_user_organization_id()
  );
```

### **7.3 Chiffrement**

#### **Data Encryption**
```typescript
// AES-256-GCM Encryption
class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  
  encrypt(text: string): EncryptedData {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }
  
  decrypt(data: EncryptedData): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(data.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(data.authTag, 'hex'));
    
    let decrypted = decipher.update(data.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

### **7.4 Webhook Security**

#### **Stripe Webhook Validation**
```typescript
async function validateStripeWebhook(
  payload: string,
  signature: string
): Promise<boolean> {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Additional validation
    if (event.created < Date.now() / 1000 - 300) {
      throw new Error('Event too old');
    }
    
    // Check idempotency
    const processed = await redis.get(`stripe:${event.id}`);
    if (processed) {
      throw new Error('Event already processed');
    }
    
    // Mark as processed
    await redis.setex(`stripe:${event.id}`, 86400, '1');
    
    return true;
  } catch (err) {
    logger.error('Webhook validation failed', err);
    return false;
  }
}
```

---

## **8. PERFORMANCE & SCALABILITÉ**

### **8.1 Stratégies de cache**

#### **Redis Caching Layers**
```typescript
// Cache Configuration
const cacheConfig = {
  sessions: {
    ttl: 900,    // 15 minutes
    prefix: 'session:'
  },
  formations: {
    ttl: 3600,   // 1 hour
    prefix: 'formation:'
  },
  users: {
    ttl: 1800,   // 30 minutes
    prefix: 'user:'
  }
};

// Cache Implementation
class CacheService {
  async get<T>(key: string): Promise<T | null> {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }
  
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await redis.setex(
      key,
      ttl || 3600,
      JSON.stringify(value)
    );
  }
  
  async invalidate(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length) {
      await redis.del(...keys);
    }
  }
}
```

### **8.2 Optimisation des requêtes**

#### **Database Query Optimization**
```typescript
// Avoid N+1 queries with Prisma
const formationsWithSessions = await prisma.formation.findMany({
  include: {
    sessions: {
      where: {
        startDate: {
          gte: new Date()
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    },
    organization: {
      select: {
        id: true,
        name: true,
        qualiopiNumber: true
      }
    }
  },
  take: 20,
  skip: (page - 1) * 20
});

// Use database indexes
// schema.prisma
model Formation {
  @@index([category, modalite])
  @@index([organizationId])
  @@index([createdAt])
}
```

### **8.3 Load Balancing & Auto-scaling**

#### **Infrastructure Configuration**
```yaml
# AWS Auto Scaling Group
AutoScalingGroup:
  MinSize: 2
  MaxSize: 10
  DesiredCapacity: 3
  TargetGroupARNs:
    - !Ref ALBTargetGroup
  HealthCheckType: ELB
  HealthCheckGracePeriod: 300
  
  # Scaling Policies
  ScaleUpPolicy:
    MetricType: CPUUtilization
    TargetValue: 70
    ScaleUpCooldown: 300
    
  ScaleDownPolicy:
    MetricType: CPUUtilization
    TargetValue: 30
    ScaleDownCooldown: 600
```

### **8.4 CDN & Asset Optimization**

#### **Cloudflare Configuration**
```javascript
// Cloudflare Workers for Edge Computing
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const cache = caches.default;
  let response = await cache.match(request);
  
  if (!response) {
    response = await fetch(request);
    
    // Cache static assets
    if (request.url.match(/\.(js|css|png|jpg|svg)$/)) {
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=31536000');
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
      
      event.waitUntil(cache.put(request, response.clone()));
    }
  }
  
  return response;
}
```

---

## **9. PLAN QA & TESTS AUTOMATISÉS**

### **9.1 Stratégie de tests**

#### **Pyramid de tests**
```
         /\
        /E2E\        5%  - Tests End-to-End (Cypress)
       /------\      
      /Intégra-\     15% - Tests d'intégration
     /  tion    \
    /------------\   30% - Tests de composants
   /  Composants  \
  /----------------\ 50% - Tests unitaires
 /    Unitaires     \
/____________________\
```

### **9.2 Tests unitaires (Backend)**

```typescript
// Example: Formation Service Test
describe('FormationService', () => {
  let service: FormationService;
  let prisma: PrismaService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FormationService, PrismaService],
    }).compile();
    
    service = module.get<FormationService>(FormationService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  
  describe('createFormation', () => {
    it('should create a formation with valid data', async () => {
      const formationData = {
        title: 'Formation Sûreté Aéroportuaire',
        category: 'SECURITY',
        price: 500
      };
      
      jest.spyOn(prisma.formation, 'create').mockResolvedValue({
        id: 'test-id',
        ...formationData
      });
      
      const result = await service.createFormation(formationData);
      
      expect(result).toHaveProperty('id');
      expect(result.title).toBe(formationData.title);
    });
    
    it('should throw on duplicate title', async () => {
      jest.spyOn(prisma.formation, 'create').mockRejectedValue(
        new Error('Unique constraint violation')
      );
      
      await expect(service.createFormation({}))
        .rejects
        .toThrow('Formation already exists');
    });
  });
});
```

### **9.3 Tests d'intégration**

```typescript
// API Integration Test
describe('POST /api/v1/enrollments', () => {
  it('should create enrollment with payment', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/enrollments')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        sessionId: 'valid-session-id',
        paymentMethod: 'card'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('checkoutUrl');
    expect(response.body.data.status).toBe('PENDING');
  });
  
  it('should handle Stripe webhook', async () => {
    const payload = JSON.stringify(mockStripeEvent);
    const signature = stripe.webhooks.generateTestHeaderString({
      payload,
      secret: process.env.STRIPE_WEBHOOK_SECRET
    });
    
    const response = await request(app.getHttpServer())
      .post('/api/v1/payments/webhook')
      .set('stripe-signature', signature)
      .send(payload);
    
    expect(response.status).toBe(200);
  });
});
```

### **9.4 Tests E2E**

```typescript
// Cypress E2E Test
describe('Formation Enrollment Flow', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password123');
  });
  
  it('should complete full enrollment process', () => {
    // Search formation
    cy.visit('/formations');
    cy.get('[data-cy=search-input]').type('Sûreté');
    cy.get('[data-cy=search-button]').click();
    
    // Select formation
    cy.get('[data-cy=formation-card]').first().click();
    cy.get('[data-cy=session-select]').select('2025-09-01');
    cy.get('[data-cy=enroll-button]').click();
    
    // Payment
    cy.get('[data-cy=stripe-card]').within(() => {
      cy.fillCardDetails('4242424242424242', '12/25', '123');
    });
    cy.get('[data-cy=pay-button]').click();
    
    // Confirmation
    cy.url().should('include', '/success');
    cy.get('[data-cy=enrollment-id]').should('be.visible');
  });
});
```

### **9.5 Performance Testing**

```javascript
// K6 Load Testing Script
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Spike
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
};

export default function() {
  const res = http.get('https://api.pygmalion.aero/v1/formations');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

---

## **10. CONFORMITÉ RÉGLEMENTAIRE & STOCKAGE**

### **10.1 RGPD Compliance**

#### **Data Protection Measures**
```typescript
// Privacy by Design Implementation
class PrivacyService {
  // Data minimization
  async collectUserData(input: any): Promise<UserData> {
    return {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      // Exclude unnecessary fields
    };
  }
  
  // Right to erasure
  async deleteUserData(userId: string): Promise<void> {
    await prisma.$transaction([
      // Soft delete user
      prisma.user.update({
        where: { id: userId },
        data: { 
          deletedAt: new Date(),
          email: `deleted_${userId}@deleted.com`,
          personalData: null
        }
      }),
      // Hard delete sensitive data
      prisma.kycDocument.deleteMany({
        where: { userId }
      })
    ]);
  }
  
  // Data portability
  async exportUserData(userId: string): Promise<Buffer> {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: true,
        certificates: true,
        payments: true
      }
    });
    
    return Buffer.from(JSON.stringify(userData));
  }
}
```

### **10.2 Data Retention Policies**

```yaml
Data Retention Schedule:
  User Accounts:
    Active: Indefinite
    Inactive: 3 years, then anonymize
    Deleted: 30 days soft delete, then hard delete
    
  Training Records:
    Certificates: Permanent (regulatory requirement)
    Progress Data: 5 years
    Enrollment Data: 7 years
    
  Financial Records:
    Invoices: 10 years (legal requirement)
    Payment Details: 13 months (PCI-DSS)
    Refunds: 7 years
    
  Logs & Audit:
    Security Logs: 1 year
    Access Logs: 6 months
    Error Logs: 3 months
    
  Documents:
    KYC/KYB: 5 years after relationship ends
    Training Materials: While contract active + 1 year
    Contracts: 10 years after expiration
```

### **10.3 Storage Architecture**

#### **Multi-tier Storage**
```typescript
// Storage Strategy by Data Type
const storageConfig = {
  hot: {
    // Frequently accessed data
    service: 'PostgreSQL + Redis',
    data: ['active_users', 'current_sessions', 'live_enrollments'],
    retention: '90 days'
  },
  warm: {
    // Occasionally accessed
    service: 'PostgreSQL + S3 Standard',
    data: ['completed_trainings', 'recent_certificates'],
    retention: '1 year'
  },
  cold: {
    // Rarely accessed
    service: 'S3 Glacier',
    data: ['archived_records', 'old_invoices'],
    retention: '7+ years'
  },
  blockchain: {
    // Immutable records
    service: 'Polygon + IPFS',
    data: ['certificate_hashes', 'audit_trail'],
    retention: 'Permanent'
  }
};
```

### **10.4 Backup & Disaster Recovery**

```yaml
Backup Strategy:
  Database:
    Type: Automated snapshots
    Frequency: Daily at 02:00 UTC
    Retention: 30 days
    Cross-region: Yes (EU-WEST-1 → EU-WEST-2)
    
  File Storage:
    Type: S3 versioning + lifecycle
    Frequency: Real-time
    Retention: 90 days versions
    
  Configuration:
    Type: Git + encrypted secrets
    Frequency: On change
    Retention: Indefinite
    
Recovery Objectives:
  RTO (Recovery Time Objective): 4 hours
  RPO (Recovery Point Objective): 1 hour
  
Disaster Recovery Plan:
  1. Automated failover to secondary region
  2. Database restoration from latest snapshot
  3. DNS update to point to backup infrastructure
  4. Cache warming and service validation
  5. User notification via status page
```

---

## **11. ANNEXES**

### **11.1 Diagramme de séquence - Paiement Stripe**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant S as Stripe
    participant W as Webhook
    participant D as Database
    
    U->>F: Click "S'inscrire"
    F->>A: POST /enrollments
    A->>D: Create enrollment (PENDING)
    A->>S: Create Checkout Session
    S-->>A: Session URL
    A-->>F: Redirect URL
    F->>U: Redirect to Stripe
    
    U->>S: Complete payment
    S->>W: payment_intent.succeeded
    W->>A: Process webhook
    A->>D: Update enrollment (CONFIRMED)
    A->>D: Create payment record
    A-->>W: 200 OK
    
    S->>U: Redirect to success_url
    U->>F: Load success page
    F->>A: GET /enrollments/:id
    A->>D: Fetch enrollment
    A-->>F: Enrollment details
    F->>U: Show confirmation
```

### **11.2 Workflow LMS Integration**

```mermaid
graph LR
    subgraph "Pygmalion Platform"
        E[Enrollment Created]
        P[Payment Confirmed]
        U[User Provisioning]
        S[SSO Token]
    end
    
    subgraph "LMS Partner"
        L[LMS Account]
        C[Course Access]
        T[Progress Tracking]
        G[Certificate Generation]
    end
    
    E --> P
    P --> U
    U --> L
    U --> S
    S --> C
    C --> T
    T --> G
    G --> E
```

### **11.3 Architecture de sécurité**

```mermaid
graph TB
    subgraph "Internet"
        USER[Users]
    end
    
    subgraph "CDN Layer"
        CF[Cloudflare WAF]
    end
    
    subgraph "Application Layer"
        LB[Load Balancer]
        API1[API Server 1]
        API2[API Server 2]
        API3[API Server 3]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL)]
        RD[(Redis)]
        S3[(S3 Storage)]
    end
    
    subgraph "Security Services"
        AUTH[Auth Service]
        KYC[KYC Service]
        AUDIT[Audit Service]
    end
    
    USER --> CF
    CF --> LB
    LB --> API1 & API2 & API3
    API1 & API2 & API3 --> AUTH
    API1 & API2 & API3 --> KYC
    API1 & API2 & API3 --> AUDIT
    API1 & API2 & API3 --> PG
    API1 & API2 & API3 --> RD
    API1 & API2 & API3 --> S3
```

### **11.4 Wireframes principaux**

#### **Dashboard Manager**
```
┌─────────────────────────────────────────────────────┐
│ PYGMALION          [👤 Manager]  [🔔]  [⚙️]  [↗️]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌───────────────┐ ┌───────────────┐ ┌────────────┐│
│ │ Équipe        │ │ Conformité    │ │ Budget     ││
│ │ 45 personnes  │ │ 92% conforme  │ │ 75% utilisé││
│ │ [Voir détail] │ │ [3 alertes]   │ │ [Détails]  ││
│ └───────────────┘ └───────────────┘ └────────────┘│
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ Formations à venir                              ││
│ ├─────────────────────────────────────────────────┤│
│ │ • Sûreté niveau 1    | 15/09 | 12 inscrits     ││
│ │ • DGR Cat 6          | 18/09 | 8 inscrits      ││
│ │ • Formation SGS      | 22/09 | 15 inscrits     ││
│ │                                [Voir tout →]    ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ Alertes conformité                              ││
│ ├─────────────────────────────────────────────────┤│
│ │ ⚠️ 3 certificats expirent dans 30 jours        ││
│ │ ⚠️ 2 formations obligatoires manquantes         ││
│ │                          [Gérer les alertes →]  ││
│ └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

#### **Page Formation**
```
┌─────────────────────────────────────────────────────┐
│ ← Retour au catalogue                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ [Image Formation]                                ││
│ │                                                  ││
│ │ FORMATION SÛRETÉ AÉROPORTUAIRE                   ││
│ │ Niveau 1 - Agent de sûreté                       ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ ⭐ 4.8/5 (156 avis) | 📍 Paris CDG | ⏱️ 35h        │
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ Description                                      ││
│ │ Formation certifiante pour devenir agent de      ││
│ │ sûreté aéroportuaire. Conforme aux exigences    ││
│ │ DGAC et européennes...                          ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ Sessions disponibles                            ││
│ ├─────────────────────────────────────────────────┤│
│ │ □ 15-19 Sept 2025 | Paris    | 8 places | 950€ ││
│ │ □ 22-26 Sept 2025 | Lyon     | 12 places| 950€ ││
│ │ □ 29 Sept-3 Oct   | Toulouse | 5 places | 950€ ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ [           S'inscrire           ]                  │
└─────────────────────────────────────────────────────┘
```

---

## **Conclusion**

Ce document TSD constitue la référence technique complète pour le développement de la plateforme Pygmalion. Il couvre l'ensemble des aspects techniques nécessaires à la réalisation du projet, depuis l'architecture globale jusqu'aux détails d'implémentation.

### **Points clés à retenir**

1. **Sécurité first** : MFA obligatoire, KYC/KYB, chiffrement AES-256
2. **Blockchain natif** : Tokenisation des certificats dès le MVP
3. **Architecture scalable** : Microservices, cache Redis, CDN
4. **Stack moderne** : NestJS + React + TypeScript + Prisma
5. **Conformité totale** : RGPD, QUALIOPI, PCI-DSS

### **Prochaines étapes techniques**

1. Setup environnements dev/staging/prod
2. Configuration CI/CD avec GitHub Actions
3. Développement API core avec NestJS
4. Intégration Stripe pour paiements
5. Smart contracts pour tokenisation
6. Tests de charge et optimisation

---

**© 2025 MB Aviation - Tous droits réservés**

**Société porteuse du projet :** MB Aviation  
**Société éditrice :** Kepler Aviation  
**Rédacteurs :** Robin Navarro, Aurélien Francio, Pierre Beunardeau

*Ce document est la propriété exclusive de MB Aviation. Toute reproduction ou distribution non autorisée est strictement interdite.*

---