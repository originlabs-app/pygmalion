const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fonction pour remplacer console.* par logger.*
function replaceConsoleInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Skip logger.service.ts itself
  if (filePath.includes('logger.service.ts')) {
    return false;
  }
  
  // Check if file has console.* calls
  if (!content.match(/console\.(log|error|warn|info|debug)/)) {
    return false;
  }
  
  // Add import if not present and file uses console
  const hasLoggerImport = content.includes("from '@/services/logger.service'") || 
                         content.includes('from "../services/logger.service"') ||
                         content.includes("from './services/logger.service'");
  
  if (!hasLoggerImport) {
    // Add import at the top after first import or at beginning
    const firstImportMatch = content.match(/^import .* from .*/m);
    if (firstImportMatch) {
      const insertPosition = firstImportMatch.index + firstImportMatch[0].length;
      content = content.slice(0, insertPosition) + 
                "\nimport logger from '@/services/logger.service';" + 
                content.slice(insertPosition);
    } else {
      content = "import logger from '@/services/logger.service';\n\n" + content;
    }
    modified = true;
  }
  
  // Replace console.* with logger.*
  const replacements = [
    { from: /console\.log/g, to: 'logger.info' },
    { from: /console\.error/g, to: 'logger.error' },
    { from: /console\.warn/g, to: 'logger.warn' },
    { from: /console\.info/g, to: 'logger.info' },
    { from: /console\.debug/g, to: 'logger.debug' }
  ];
  
  replacements.forEach(({ from, to }) => {
    if (content.match(from)) {
      content = content.replace(from, to);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${filePath}`);
    return true;
  }
  
  return false;
}

// Find all .ts and .tsx files
const files = glob.sync('src/**/*.{ts,tsx}', {
  cwd: __dirname,
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
});

console.log(`Found ${files.length} files to check...`);

let updatedCount = 0;
files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (replaceConsoleInFile(fullPath)) {
    updatedCount++;
  }
});

console.log(`\n✅ Updated ${updatedCount} files with logger imports and replaced console.* calls`);