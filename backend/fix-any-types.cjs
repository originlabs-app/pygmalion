const fs = require('fs');
const path = require('path');
const glob = require('glob');

let totalFixed = 0;
let filesModified = 0;

// Fix @CurrentUser() user: any
function fixCurrentUserAny(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if file has @CurrentUser() user: any
  if (!content.includes('@CurrentUser() user: any')) {
    return false;
  }
  
  // Check if ICurrentUser is imported
  const hasImport = content.includes('ICurrentUser');
  
  if (!hasImport) {
    // Add import after other imports from common
    const commonImportMatch = content.match(/import .* from ['"]@\/common\/.*/);
    if (commonImportMatch) {
      // Add to existing common import if possible
      const decoratorImportMatch = content.match(/import \{ CurrentUser \} from ['"]@\/common\/decorators\/current-user\.decorator['"]/);
      if (decoratorImportMatch) {
        content = content.replace(
          decoratorImportMatch[0],
          `import { CurrentUser } from '@/common/decorators/current-user.decorator';\nimport { ICurrentUser } from '@/common/interfaces/current-user.interface'`
        );
        modified = true;
      }
    } else {
      // Add new import at the top after first import
      const firstImportMatch = content.match(/^import .* from .*/m);
      if (firstImportMatch) {
        const insertPosition = firstImportMatch.index + firstImportMatch[0].length;
        content = content.slice(0, insertPosition) + 
                  "\nimport { ICurrentUser } from '@/common/interfaces/current-user.interface';" + 
                  content.slice(insertPosition);
        modified = true;
      }
    }
  }
  
  // Replace all @CurrentUser() user: any with @CurrentUser() user: ICurrentUser
  const regex = /@CurrentUser\(\) user: any/g;
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(regex, '@CurrentUser() user: ICurrentUser');
    modified = true;
    totalFixed += matches.length;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    filesModified++;
    console.log(`✅ Fixed ${matches ? matches.length : 0} occurrences in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// Fix other common any patterns
function fixOtherAnyTypes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixCount = 0;
  
  // Pattern 1: metadata?: any -> metadata?: Record<string, unknown>
  if (content.includes('metadata?: any')) {
    content = content.replace(/metadata\?: any/g, 'metadata?: Record<string, unknown>');
    modified = true;
    fixCount++;
  }
  
  // Pattern 2: filters: any -> filters: Record<string, unknown>
  if (content.includes('filters: any')) {
    content = content.replace(/filters: any/g, 'filters: Record<string, unknown>');
    modified = true;
    fixCount++;
  }
  
  // Pattern 3: error: any in catch blocks -> error: unknown
  const catchErrorRegex = /catch \(error: any\)/g;
  if (content.match(catchErrorRegex)) {
    content = content.replace(catchErrorRegex, 'catch (error: unknown)');
    modified = true;
    fixCount++;
  }
  
  // Pattern 4: : any[] -> : unknown[]
  const anyArrayRegex = /: any\[\]/g;
  if (content.match(anyArrayRegex)) {
    content = content.replace(anyArrayRegex, ': unknown[]');
    modified = true;
    fixCount++;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    totalFixed += fixCount;
    console.log(`✅ Fixed ${fixCount} other any types in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// Main execution
console.log('🔍 Starting to fix any types in backend...\n');

// Find all TypeScript files
const files = glob.sync('src/**/*.ts', {
  cwd: __dirname,
  ignore: ['**/node_modules/**', '**/dist/**', '**/*.spec.ts', '**/*.test.ts']
});

console.log(`Found ${files.length} TypeScript files to check\n`);

// Phase 1: Fix @CurrentUser() any
console.log('📋 Phase 1: Fixing @CurrentUser() user: any\n');
files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  fixCurrentUserAny(fullPath);
});

console.log(`\n✅ Phase 1 complete: Fixed ${totalFixed} @CurrentUser() any types in ${filesModified} files\n`);

// Reset counters for phase 2
const phase1Fixed = totalFixed;
totalFixed = 0;
filesModified = 0;

// Phase 2: Fix other any types
console.log('📋 Phase 2: Fixing other common any patterns\n');
files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fixOtherAnyTypes(fullPath)) {
    filesModified++;
  }
});

console.log(`\n✅ Phase 2 complete: Fixed ${totalFixed} other any types in ${filesModified} files`);
console.log(`\n🎉 TOTAL: Fixed ${phase1Fixed + totalFixed} any types!`);

// Show remaining any types
console.log('\n📊 Checking remaining any types...');
const { execSync } = require('child_process');
try {
  const remaining = execSync('grep -rn ": any" src/ --include="*.ts" | grep -v "// " | wc -l', { encoding: 'utf8' }).trim();
  console.log(`\n⚠️  Remaining any types to fix manually: ${remaining}`);
} catch (error) {
  console.log('\n❌ Could not count remaining any types');
}