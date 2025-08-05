# 📝 Standards de Code Backend - Pygmalion

## 🚨 Règles OBLIGATOIRES (SSOT & Anti-Pasta)

### 1. ❌ JAMAIS de console.log

```typescript
// ❌ INTERDIT
console.log('Debug info');
console.error('Erreur:', error);

// ✅ OBLIGATOIRE
import { Logger } from '@nestjs/common';
const logger = new Logger('ModuleName');
logger.log('Debug info');
logger.error('Erreur:', error);

// Pour les scripts standalone
import { ScriptLogger } from '@/common/services/script-logger.service';
const logger = new ScriptLogger('ScriptName');
logger.info('Debug info');
```

### 2. ❌ JAMAIS de types any

```typescript
// ❌ INTERDIT
function process(data: any): any {
  const result: any = {};
}

// ✅ OBLIGATOIRE
interface ProcessData {
  id: string;
  name: string;
}

function process(data: ProcessData): ProcessResult {
  const result: ProcessResult = {};
}
```

### 3. ❌ JAMAIS de données hardcodées massives

```typescript
// ❌ INTERDIT - Données inline
const formations = [
  { name: 'Formation 1', price: 1000 },
  // ... 200 lignes
];

// ✅ OBLIGATOIRE - Données externalisées
// src/data/formations.data.ts
export const formationsData: FormationData[] = [...];

// src/services/formation.service.ts
import { formationsData } from '@/data/formations.data';
```

### 4. ✅ TOUJOURS des imports absolus

```typescript
// ❌ INTERDIT
import { Service } from '../../../services/service';

// ✅ OBLIGATOIRE
import { Service } from '@/services/service';
```

## 🏗️ Architecture des Fichiers

```
backend/src/
├── data/              # Données statiques externalisées
├── types/             # Interfaces et types TypeScript
├── common/            # Code partagé
│   ├── decorators/    # Décorateurs personnalisés
│   ├── filters/       # Filtres d'exception
│   ├── guards/        # Guards d'authentification
│   ├── pipes/         # Pipes de validation
│   ├── services/      # Services communs (logger, etc.)
│   └── validators/    # Validateurs personnalisés
├── config/            # Configuration
├── modules/           # Modules métier (auth, users, courses, etc.)
└── scripts/           # Scripts utilitaires
```

## 🔒 Sécurité et Validation

### Validation des Données

```typescript
// ✅ TOUJOURS valider les entrées
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email invalide' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @IsStrongPassword()
  password: string;
}
```

### Protection contre les Injections

```typescript
// ✅ Utiliser les validateurs de sécurité
import { IsSafeString } from '@/common/validators/sanitize.validator';

export class UpdateCourseDto {
  @IsString()
  @IsSafeString() // Protection SQL/XSS
  @MaxLength(200)
  title: string;
}
```

## 📊 Logging et Monitoring

### Logger dans les Services

```typescript
@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  async createCourse(data: CreateCourseDto): Promise<Course> {
    this.logger.log(`Creating course: ${data.title}`);
    
    try {
      const course = await this.prisma.course.create({ data });
      this.logger.log(`Course created successfully: ${course.id}`);
      return course;
    } catch (error) {
      this.logger.error(`Failed to create course: ${error.message}`, error.stack);
      throw error;
    }
  }
}
```

### Logger dans les Scripts

```typescript
import { ScriptLogger } from '@/common/services/script-logger.service';

const logger = new ScriptLogger('DataMigration');

async function migrateData(): Promise<void> {
  logger.info('🚀 Starting data migration...');
  
  try {
    // Migration logic
    logger.info('✅ Migration completed successfully');
  } catch (error) {
    logger.error('❌ Migration failed:', error);
    throw error;
  }
}
```

## 🧪 Tests

### Structure des Tests

```typescript
describe('CourseService', () => {
  let service: CourseService;
  let prisma: PrismaService;
  let logger: Logger;

  beforeEach(() => {
    // Setup
  });

  describe('createCourse', () => {
    it('should create a course with valid data', async () => {
      // Test
    });

    it('should throw BadRequestException with invalid data', async () => {
      // Test
    });
  });
});
```

## 📝 Documentation

### JSDoc pour les Fonctions Complexes

```typescript
/**
 * Enrichit les données d'un cours avec les métriques marketplace
 * @param formation - Données de base de la formation
 * @param provider - Organisme de formation
 * @param index - Index pour génération de slug unique
 * @returns Données enrichies pour le cours
 */
function generateEnrichedCourseData(
  formation: FormationData,
  provider: TrainingOrgData,
  index: number
): Partial<EnrichedCourseData> {
  // Implementation
}
```

## 🚀 Scripts NPM

### Nommage des Scripts

```json
{
  "scripts": {
    // Format: action:target
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "enrich:marketplace": "ts-node src/scripts/enrich-marketplace-data-clean.ts",
    "clean:logs": "ts-node src/scripts/clean-console-logs.ts"
  }
}
```

## ✅ Checklist Avant Commit

- [ ] Aucun `console.log` dans le code
- [ ] Aucun type `any` utilisé
- [ ] Données massives externalisées
- [ ] Imports absolus uniquement
- [ ] Validation des DTOs complète
- [ ] Logger approprié utilisé
- [ ] Tests écrits/mis à jour
- [ ] Documentation à jour

## 🛠️ Outils de Vérification

```bash
# Vérifier les console.log
grep -r "console\." src/ --exclude-dir=node_modules

# Vérifier les types any
grep -r ": any" src/ --exclude-dir=node_modules

# Vérifier les imports relatifs
grep -r "from '\.\." src/ --exclude-dir=node_modules

# Linter
npm run lint

# Tests
npm run test
```

---

**Ces standards sont OBLIGATOIRES et font partie des principes SSOT définis dans CLAUDE.md**