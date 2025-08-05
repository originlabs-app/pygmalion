const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Interfaces to check for duplicates
const interfacesToCheck = [
  'User', 'AuthUser', 'Course', 'Enrollment', 'Module', 
  'Quiz', 'Exam', 'Certificate', 'TrainingOrganization',
  'Session', 'CourseModule', 'CourseResource'
];

// Find duplicates
function findDuplicateInterfaces() {
  const frontendFiles = glob.sync('frontend/src/**/*.{ts,tsx}', { ignore: ['**/node_modules/**'] });
  const backendFiles = glob.sync('backend/src/**/*.ts', { ignore: ['**/node_modules/**'] });
  
  const allFiles = [...frontendFiles, ...backendFiles];
  const interfaceLocations = {};
  
  // Search for interface definitions
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    interfacesToCheck.forEach(interfaceName => {
      const regex = new RegExp(`(interface|type|class)\\s+${interfaceName}\\s*[{<]`, 'g');
      if (content.match(regex)) {
        if (!interfaceLocations[interfaceName]) {
          interfaceLocations[interfaceName] = [];
        }
        interfaceLocations[interfaceName].push(file);
      }
    });
  });
  
  // Report duplicates
  console.log('🔍 DUPLICATE INTERFACE DETECTION REPORT\n');
  
  let duplicatesFound = false;
  Object.entries(interfaceLocations).forEach(([interfaceName, locations]) => {
    if (locations.length > 1) {
      duplicatesFound = true;
      console.log(`❌ ${interfaceName} found in ${locations.length} locations:`);
      locations.forEach(loc => console.log(`   - ${loc}`));
      console.log('');
    }
  });
  
  if (!duplicatesFound) {
    console.log('✅ No duplicate interfaces found!');
  } else {
    console.log(`\n📋 RECOMMENDATION: Import these interfaces from 'shared/types' instead`);
  }
  
  // Check shared types usage
  console.log('\n📊 SHARED TYPES USAGE:');
  let sharedImports = 0;
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes("from 'shared/types'") || content.includes('from "shared/types"') ||
        content.includes("from '@shared/types'") || content.includes('from "@shared/types"')) {
      sharedImports++;
    }
  });
  
  console.log(`Files importing from shared/types: ${sharedImports}`);
}

findDuplicateInterfaces();