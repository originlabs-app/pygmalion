const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns de remplacement spécifiques
const replacements = [
  // Pattern 1: toResponse(entity: any) -> toResponse(entity: unknown)
  {
    pattern: /private toResponse\(entity: any\)/g,
    replacement: 'private toResponse(entity: unknown)'
  },
  {
    pattern: /private toDocumentResponse\(document: any\)/g,
    replacement: 'private toDocumentResponse(document: unknown)'
  },
  {
    pattern: /private toExamResponse\(entity: any\)/g,
    replacement: 'private toExamResponse(entity: unknown)'
  },
  {
    pattern: /private toExamAnswerResponse\(entity: any\)/g,
    replacement: 'private toExamAnswerResponse(entity: unknown)'
  },
  {
    pattern: /private toExamQuestionResponse\(entity: any\)/g,
    replacement: 'private toExamQuestionResponse(entity: unknown)'
  },
  {
    pattern: /private toExamConfigResponse\(entity: any\)/g,
    replacement: 'private toExamConfigResponse(entity: unknown)'
  },
  {
    pattern: /private toAnswerResponse\(entity: any\)/g,
    replacement: 'private toAnswerResponse(entity: unknown)'
  },
  {
    pattern: /private toQuestionResponse\(entity: any\)/g,
    replacement: 'private toQuestionResponse(entity: unknown)'
  },
  {
    pattern: /private toQuizResponse\(entity: any\)/g,
    replacement: 'private toQuizResponse(entity: unknown)'
  },
  
  // Pattern 2: updateData: any -> updateData: Record<string, unknown>
  {
    pattern: /const updateData: any = /g,
    replacement: 'const updateData: Record<string, unknown> = '
  },
  
  // Pattern 3: where: any -> where: Prisma.*WhereInput
  {
    pattern: /const where: any = {/g,
    replacement: 'const where: Prisma.SecurityEventWhereInput = {'
  },
  
  // Pattern 4: eventData: any -> eventData: Record<string, unknown>
  {
    pattern: /eventData: any/g,
    replacement: 'eventData: Record<string, unknown>'
  },
  {
    pattern: /data: any/g,
    replacement: 'data: Record<string, unknown>'
  },
  
  // Pattern 5: user: any in upload controller
  {
    pattern: /user: any,/g,
    replacement: 'user: ICurrentUser,'
  },
  
  // Pattern 6: logObject: any -> specific type
  {
    pattern: /const logObject: any = {/g,
    replacement: 'const logObject: Record<string, unknown> = {'
  },
  
  // Pattern 7: quiz/exam?: any in DTOs
  {
    pattern: /quiz\?: any;/g,
    replacement: 'quiz?: unknown;'
  },
  {
    pattern: /exam\?: any;/g,
    replacement: 'exam?: unknown;'
  }
];

// Type guard pattern - keep as is (needed for runtime checks)
const typeGuardPattern = /export function isCurrentUser\(obj: any\)/;

function fixRemainingAny(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixCount = 0;
  
  // Skip type guard functions
  if (content.match(typeGuardPattern)) {
    console.log(`⏭️  Skipping type guard in: ${path.relative(process.cwd(), filePath)}`);
    return false;
  }
  
  // Apply all replacements
  replacements.forEach(({ pattern, replacement }) => {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      modified = true;
      fixCount++;
    }
  });
  
  // Special case for createEnrollmentDto in tests
  if (filePath.includes('.spec.ts') && content.includes('const createEnrollmentDto: any')) {
    content = content.replace(
      'const createEnrollmentDto: any',
      'const createEnrollmentDto: Partial<CreateEnrollmentDto>'
    );
    modified = true;
    fixCount++;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${fixCount} any types in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

console.log('🔍 Fixing remaining any types...\n');

const files = glob.sync('src/**/*.ts', {
  cwd: __dirname,
  ignore: ['**/node_modules/**', '**/dist/**']
});

let totalFixed = 0;
let filesModified = 0;

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fixRemainingAny(fullPath)) {
    filesModified++;
    totalFixed++;
  }
});

console.log(`\n✅ Fixed any types in ${filesModified} files`);

// Check remaining
const { execSync } = require('child_process');
try {
  const remaining = execSync('grep -rn ": any" src/ --include="*.ts" | grep -v "// " | wc -l', { encoding: 'utf8' }).trim();
  console.log(`\n📊 Remaining any types: ${remaining}`);
  
  if (parseInt(remaining) > 0) {
    console.log('\n⚠️  Remaining any types to check manually:');
    const remainingList = execSync('grep -rn ": any" src/ --include="*.ts" | grep -v "// "', { encoding: 'utf8' });
    console.log(remainingList);
  }
} catch (error) {
  console.log('\n✅ No more any types found!');
}