const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping des chemins relatifs vers absolus
const pathMappings = {
  '../auth/': '@/auth/',
  '../common/': '@/common/',
  '../config/': '@/config/',
  '../courses/': '@/courses/',
  '../course-modules/': '@/course-modules/',
  '../course-resources/': '@/course-resources/',
  '../enrollments/': '@/enrollments/',
  '../exams/': '@/exams/',
  '../prisma/': '@/prisma/',
  '../quizzes/': '@/quizzes/',
  '../security/': '@/security/',
  '../sessions/': '@/sessions/',
  '../training-organizations/': '@/training-organizations/',
  '../users/': '@/users/',
  '../../': '@/',
  '../../../': '@/'
};

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Replace each relative import pattern
  Object.entries(pathMappings).forEach(([relative, absolute]) => {
    const regex = new RegExp(`from ['"]${relative.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `from '${absolute}`);
      modified = true;
    }
  });
  
  // Also handle specific patterns
  const patterns = [
    { from: /from ['"]\.\.\/(.+?)['"]/g, to: "from '@/$1'" },
    { from: /from ['"]\.\.\/\.\.\/(.+?)['"]/g, to: "from '@/$1'" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/(.+?)['"]/g, to: "from '@/$1'" }
  ];
  
  patterns.forEach(({ from, to }) => {
    if (content.match(from)) {
      content = content.replace(from, to);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// Find all TypeScript files
const files = glob.sync('src/**/*.ts', {
  cwd: __dirname,
  ignore: ['**/node_modules/**', '**/dist/**']
});

console.log(`Found ${files.length} files to check...`);

let updatedCount = 0;
files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fixImportsInFile(fullPath)) {
    updatedCount++;
  }
});

console.log(`\n✅ Updated ${updatedCount} files with absolute imports`);