#!/bin/bash

# Script pour nettoyer les console.log dans tous les scripts
# Conforme aux principes SSOT et Anti-Pasta

echo "🧹 Nettoyage des console.log dans les scripts..."

# Liste des fichiers à nettoyer
files=(
  "populate-programs.ts"
  "populate-sessions.ts"
  "populate-real-data.ts"
  "upload-images-to-supabase.ts"
  "update-course-images.ts"
  "update-course-fields.ts"
)

# Pour chaque fichier
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Traitement de $file..."
    
    # Créer une copie de sauvegarde
    cp "$file" "$file.backup"
    
    # Ajouter l'import du logger en haut du fichier
    sed -i '' '1i\
import { ScriptLogger } from "@/common/services/script-logger.service";\
const logger = new ScriptLogger("'$(basename "$file" .ts)'");\
' "$file"
    
    # Remplacer console.log par logger.info
    sed -i '' 's/console\.log(/logger.info(/g' "$file"
    
    # Remplacer console.error par logger.error
    sed -i '' 's/console\.error(/logger.error(/g' "$file"
    
    # Remplacer console.warn par logger.warn
    sed -i '' 's/console\.warn(/logger.warn(/g' "$file"
    
    echo "✅ $file nettoyé"
  fi
done

echo "🎉 Nettoyage terminé !"