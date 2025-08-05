#!/bin/bash

# Script pour convertir les imports relatifs en imports absolus

echo "🔄 Conversion des imports relatifs en imports absolus..."

# Fonction pour déterminer le bon alias basé sur le chemin
get_alias() {
    local path=$1
    
    # Mappings des dossiers vers les alias
    if [[ $path == *"prisma"* ]]; then
        echo "@prisma"
    elif [[ $path == *"common"* ]]; then
        echo "@common"
    elif [[ $path == *"auth"* ]]; then
        echo "@auth"
    elif [[ $path == *"config"* ]]; then
        echo "@config"
    elif [[ $path == *"users"* ]]; then
        echo "@users"
    elif [[ $path == *"course-modules"* ]]; then
        echo "@modules"
    elif [[ $path == *"course-resources"* ]]; then
        echo "@resources"
    elif [[ $path == *"courses"* ]]; then
        echo "@courses"
    elif [[ $path == *"enrollments"* ]]; then
        echo "@enrollments"
    elif [[ $path == *"sessions"* ]]; then
        echo "@sessions"
    elif [[ $path == *"security"* ]]; then
        echo "@security"
    elif [[ $path == *"exams"* ]]; then
        echo "@exams"
    elif [[ $path == *"quizzes"* ]]; then
        echo "@quizzes"
    elif [[ $path == *"training-organizations"* ]]; then
        echo "@orgs"
    else
        echo "@"
    fi
}

# Remplacements spécifiques pour les patterns communs
replacements=(
    # Prisma
    "s/from '\.\.\/prisma\/prisma\.module'/from '@prisma\/prisma.module'/g"
    "s/from '\.\.\/prisma\/prisma\.service'/from '@prisma\/prisma.service'/g"
    "s/from '\.\.\/\.\.\/prisma\/prisma\.service'/from '@prisma\/prisma.service'/g"
    
    # Common
    "s/from '\.\.\/common\/guards\/jwt-auth\.guard'/from '@common\/guards\/jwt-auth.guard'/g"
    "s/from '\.\.\/common\/guards\/roles\.guard'/from '@common\/guards\/roles.guard'/g"
    "s/from '\.\.\/common\/decorators\/current-user\.decorator'/from '@common\/decorators\/current-user.decorator'/g"
    "s/from '\.\.\/common\/decorators\/roles\.decorator'/from '@common\/decorators\/roles.decorator'/g"
    "s/from '\.\.\/common\/interfaces\/current-user\.interface'/from '@common\/interfaces\/current-user.interface'/g"
    "s/from '\.\.\/common\/services\/logger\.service'/from '@common\/services\/logger.service'/g"
    "s/from '\.\.\/common\/services\/upload\.service'/from '@common\/services\/upload.service'/g"
    "s/from '\.\.\/common\/modules\/logger\.module'/from '@common\/modules\/logger.module'/g"
    "s/from '\.\.\/common\/tasks\/security\.tasks'/from '@common\/tasks\/security.tasks'/g"
    
    # Guards et decorators depuis common
    "s/from '\.\.\/guards\/jwt-auth\.guard'/from '@common\/guards\/jwt-auth.guard'/g"
    "s/from '\.\.\/guards\/roles\.guard'/from '@common\/guards\/roles.guard'/g"
    "s/from '\.\.\/decorators\/current-user\.decorator'/from '@common\/decorators\/current-user.decorator'/g"
    "s/from '\.\.\/decorators\/roles\.decorator'/from '@common\/decorators\/roles.decorator'/g"
    "s/from '\.\.\/interfaces\/current-user\.interface'/from '@common\/interfaces\/current-user.interface'/g"
    "s/from '\.\.\/services\/logger\.service'/from '@common\/services\/logger.service'/g"
    "s/from '\.\.\/services\/upload\.service'/from '@common\/services\/upload.service'/g"
    
    # Auth
    "s/from '\.\.\/auth\/auth\.module'/from '@auth\/auth.module'/g"
    "s/from '\.\.\/auth\/auth\.service'/from '@auth\/auth.service'/g"
    
    # Users
    "s/from '\.\.\/users\/users\.module'/from '@users\/users.module'/g"
    "s/from '\.\.\/users\/users\.service'/from '@users\/users.service'/g"
    "s/from '\.\.\/users\/dto\//from '@users\/dto\//g"
    
    # Config
    "s/from '\.\.\/config\/storage\.config'/from '@config\/storage.config'/g"
    "s/from '\.\.\/config\/supabase\.config'/from '@config\/supabase.config'/g"
    
    # Training Organizations
    "s/from '\.\.\/training-organizations\//from '@orgs\//g"
    
    # Courses
    "s/from '\.\.\/courses\//from '@courses\//g"
)

# Appliquer les remplacements
for file in $(find src -name "*.ts" -type f); do
    for replacement in "${replacements[@]}"; do
        sed -i '' "$replacement" "$file"
    done
done

echo "✅ Conversion terminée !"

# Compter les imports relatifs restants
remaining=$(grep -r "import.*from.*'\.\.\/" src --include="*.ts" | wc -l)
echo "📊 Imports relatifs restants: $remaining"