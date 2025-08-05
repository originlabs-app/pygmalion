const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Map service files to their entity types
const serviceEntityMap = {
  'course-modules.service.ts': 'CourseModule',
  'course-resources.service.ts': 'CourseResource', 
  'quizzes.service.ts': 'Quiz',
  'exams.service.ts': 'Exam',
  'training-organizations.service.ts': 'TrainingOrganization'
};

function fixToResponseTypes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  const fileName = path.basename(filePath);
  
  // Find appropriate entity type
  let entityType = null;
  for (const [file, type] of Object.entries(serviceEntityMap)) {
    if (fileName.includes(file)) {
      entityType = type;
      break;
    }
  }
  
  if (!entityType) {
    return false;
  }
  
  // Add type assertion to entity parameter
  const patterns = [
    {
      pattern: /private toResponse\(entity: unknown\)/g,
      replacement: `private toResponse(entity: unknown)`
    },
    {
      pattern: /private toExamResponse\(entity: unknown\)/g,
      replacement: `private toExamResponse(entity: unknown)`
    },
    {
      pattern: /private toExamAnswerResponse\(entity: unknown\)/g,
      replacement: `private toExamAnswerResponse(entity: unknown)`
    },
    {
      pattern: /private toExamQuestionResponse\(entity: unknown\)/g,
      replacement: `private toExamQuestionResponse(entity: unknown)`
    },
    {
      pattern: /private toExamConfigResponse\(entity: unknown\)/g,
      replacement: `private toExamConfigResponse(entity: unknown)`
    },
    {
      pattern: /private toAnswerResponse\(entity: unknown\)/g,
      replacement: `private toAnswerResponse(entity: unknown)`
    },
    {
      pattern: /private toQuestionResponse\(entity: unknown\)/g,
      replacement: `private toQuestionResponse(entity: unknown)`
    },
    {
      pattern: /private toQuizResponse\(entity: unknown\)/g,
      replacement: `private toQuizResponse(entity: unknown)`
    },
    {
      pattern: /private toDocumentResponse\(document: unknown\)/g,
      replacement: `private toDocumentResponse(document: unknown)`
    }
  ];
  
  // Apply type assertions inside the function body
  patterns.forEach(({ pattern }) => {
    if (content.match(pattern)) {
      // Add type assertion at the beginning of each toResponse function
      const functionRegex = new RegExp(pattern.source.replace(/g$/, '') + '.*?{', 's');
      content = content.replace(functionRegex, (match) => {
        return match + '\n    const data = entity as any; // Type assertion for Prisma entity';
      });
      
      // Replace all entity. with data.
      const functionBodyRegex = new RegExp(
        pattern.source.replace(/g$/, '') + '.*?return\\s*{[^}]+}', 
        's'
      );
      content = content.replace(functionBodyRegex, (match) => {
        return match.replace(/entity\./g, 'data.');
      });
      
      modified = true;
    }
  });
  
  // Special case for document
  if (content.includes('private toDocumentResponse(document: unknown)')) {
    content = content.replace(
      'private toDocumentResponse(document: unknown) {',
      'private toDocumentResponse(document: unknown) {\n    const data = document as any; // Type assertion for document'
    );
    content = content.replace(/document\./g, 'data.');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed toResponse types in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

console.log('🔍 Fixing toResponse type assertions...\n');

const files = glob.sync('src/**/*.service.ts', {
  cwd: __dirname,
  ignore: ['**/node_modules/**', '**/dist/**']
});

let filesModified = 0;
files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fixToResponseTypes(fullPath)) {
    filesModified++;
  }
});

console.log(`\n✅ Fixed toResponse types in ${filesModified} files`);