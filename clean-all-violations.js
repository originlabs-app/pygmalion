#!/usr/bin/env node

/**
 * Script de nettoyage SSOT - Supprime TOUTES les violations
 * Conforme aux principes de CLAUDE.md
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

logger.info('🚨 NETTOYAGE SSOT CRITIQUE EN COURS...\n');

let stats = {
  filesProcessed: 0,
  consoleLogs: 0,
  anyTypes: 0,
  relativeImports: 0
};

/**
 * Nettoie les console.log dans un fichier
 */
function cleanConsoleLogs(filePath, content) {
  let cleaned = content;
  let count = 0;
  
  // Patterns à remplacer
  const patterns = [
    { regex: /console\.log\(/g, replacement: 'logger.info(' },
    { regex: /console\.error\(/g, replacement: 'logger.error(' },
    { regex: /console\.warn\(/g, replacement: 'logger.warn(' },
    { regex: /console\.debug\(/g, replacement: 'logger.debug(' },
  ];
  
  patterns.forEach(pattern => {
    const matches = cleaned.match(pattern.regex) || [];
    count += matches.length;
    cleaned = cleaned.replace(pattern.regex, pattern.replacement);
  });
  
  // Ajouter l'import du logger si nécessaire et s'il y a eu des remplacements
  if (count > 0 && !cleaned.includes('logger')) {
    const isTypeScript = filePath.endsWith('.ts') || filePath.endsWith('.tsx');
    const isFrontend = filePath.includes('/frontend/');
    const isScript = filePath.includes('/scripts/');
    
    let loggerImport = '';
    if (isScript) {
      loggerImport = isTypeScript 
        ? "import { ScriptLogger } from '@/common/services/script-logger.service';\nconst logger = new ScriptLogger('" + path.basename(filePath, path.extname(filePath)) + "');\n\n"
        : "const { ScriptLogger } = require('@/common/services/script-logger.service');\nconst logger = new ScriptLogger('" + path.basename(filePath, path.extname(filePath)) + "');\n\n";
    } else if (isFrontend) {
      loggerImport = isTypeScript
        ? "import logger from '@/services/logger.service';\n\n"
        : "const logger = require('@/services/logger.service').default;\n\n";
    } else {
      loggerImport = isTypeScript
        ? "import { Logger } from '@nestjs/common';\nconst logger = new Logger('" + path.basename(filePath, path.extname(filePath)) + "');\n\n"
        : "const { Logger } = require('@nestjs/common');\nconst logger = new Logger('" + path.basename(filePath, path.extname(filePath)) + "');\n\n";
    }
    
    // Ajouter l'import au début du fichier
    if (cleaned.startsWith('import') || cleaned.startsWith('const')) {
      // Trouver la fin des imports
      const lines = cleaned.split('\n');
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import') || lines[i].startsWith('const') || lines[i].startsWith('require')) {
          lastImportIndex = i;
        } else if (lines[i].trim() && !lines[i].startsWith('//')) {
          break;
        }
      }
      lines.splice(lastImportIndex + 1, 0, '', loggerImport.trim());
      cleaned = lines.join('\n');
    } else {
      cleaned = loggerImport + cleaned;
    }
  }
  
  stats.consoleLogs += count;
  return { content: cleaned, modified: count > 0 };
}

/**
 * Nettoie les types any dans un fichier TypeScript
 */
function cleanAnyTypes(filePath, content) {
  if (!filePath.match(/\.(ts|tsx)$/)) return { content, modified: false };
  
  let cleaned = content;
  let count = 0;
  
  // Patterns courants de any à remplacer
  const patterns = [
    { regex: /: any\b/g, replacement: ': unknown' },
    { regex: /\(error: any\)/g, replacement: '(error: Error)' },
    { regex: /\(e: any\)/g, replacement: '(e: Error)' },
    { regex: /\(err: any\)/g, replacement: '(err: Error)' },
    { regex: /<any>/g, replacement: '<unknown>' },
  ];
  
  patterns.forEach(pattern => {
    const matches = cleaned.match(pattern.regex) || [];
    count += matches.length;
    cleaned = cleaned.replace(pattern.regex, pattern.replacement);
  });
  
  stats.anyTypes += count;
  return { content: cleaned, modified: count > 0 };
}

/**
 * Nettoie les imports relatifs
 */
function cleanRelativeImports(filePath, content) {
  let cleaned = content;
  let count = 0;
  
  // Pattern pour les imports relatifs
  const relativeImportRegex = /(import\s+(?:{[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+['"]\.\.[/'"])/g;
  
  const matches = cleaned.match(relativeImportRegex) || [];
  count = matches.length;
  
  // Remplacer les imports relatifs par des imports absolus
  if (count > 0) {
    // Déterminer le préfixe selon le contexte
    const isFrontend = filePath.includes('/frontend/');
    const prefix = isFrontend ? '@/' : '@/';
    
    cleaned = cleaned.replace(/(import\s+(?:{[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+['"])\.\.\/(.+?)(['"])/g, 
      (match, p1, p2, p3) => {
        // Calculer le chemin absolu basé sur la structure du projet
        const currentDir = path.dirname(filePath);
        const resolvedPath = path.resolve(currentDir, '..', p2);
        const srcIndex = resolvedPath.lastIndexOf('/src/');
        if (srcIndex !== -1) {
          const relativePath = resolvedPath.substring(srcIndex + 5);
          return `${p1}${prefix}${relativePath}${p3}`;
        }
        return match;
      }
    );
  }
  
  stats.relativeImports += count;
  return { content: cleaned, modified: count > 0 };
}

/**
 * Traite un fichier
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let result = { content, modified: false };
    
    // 1. Nettoyer les console.log
    const consoleResult = cleanConsoleLogs(filePath, result.content);
    result.content = consoleResult.content;
    result.modified = result.modified || consoleResult.modified;
    
    // 2. Nettoyer les types any
    const anyResult = cleanAnyTypes(filePath, result.content);
    result.content = anyResult.content;
    result.modified = result.modified || anyResult.modified;
    
    // 3. Nettoyer les imports relatifs
    const importResult = cleanRelativeImports(filePath, result.content);
    result.content = importResult.content;
    result.modified = result.modified || importResult.modified;
    
    // Sauvegarder si modifié
    if (result.modified) {
      fs.writeFileSync(filePath, result.content);
      logger.info(`✅ ${path.relative(process.cwd(), filePath)}`);
      stats.filesProcessed++;
    }
    
  } catch (error) {
    logger.error(`❌ Erreur sur ${filePath}:`, error.message);
  }
}

/**
 * Fonction principale
 */
function main() {
  // Patterns de fichiers à traiter
  const patterns = [
    'backend/src/**/*.{js,ts}',
    'frontend/src/**/*.{js,ts,tsx}',
    'test-*.js',
    '*.js'
  ];
  
  const excludePatterns = [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/coverage/**'
  ];
  
  // Collecter tous les fichiers
  let allFiles = [];
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { 
      ignore: excludePatterns,
      nodir: true 
    });
    allFiles = allFiles.concat(files);
  });
  
  // Éliminer les doublons
  allFiles = [...new Set(allFiles)];
  
  logger.info(`📁 ${allFiles.length} fichiers à analyser...\n`);
  
  // Traiter chaque fichier
  allFiles.forEach(processFile);
  
  // Afficher le résumé
  logger.info('\n📊 RÉSUMÉ DU NETTOYAGE SSOT :');
  logger.info('================================');
  logger.info(`✅ Fichiers modifiés : ${stats.filesProcessed}`);
  logger.info(`🔍 console.log supprimés : ${stats.consoleLogs}`);
  logger.info(`🔍 types any supprimés : ${stats.anyTypes}`);
  logger.info(`🔍 imports relatifs corrigés : ${stats.relativeImports}`);
  logger.info('================================');
  
  if (stats.consoleLogs > 0 || stats.anyTypes > 0 || stats.relativeImports > 0) {
    logger.info('\n✅ Nettoyage SSOT terminé avec succès !');
    logger.info('⚠️  N\'oubliez pas de vérifier et tester les modifications.');
  } else {
    logger.info('\n✅ Aucune violation SSOT détectée !');
  }
}

// Exécuter le script
main();