#!/bin/bash

cd /Users/galileonetwork/Documents/Pygmalion/backend

echo "=== Application de la refactorisation enrollments.service.ts ==="

# Créer le dossier services s'il n'existe pas
mkdir -p src/enrollments/services

# Sauvegarder les anciens fichiers
mv src/enrollments/enrollments.service.ts src/enrollments/enrollments.service.old.ts
mv src/enrollments/enrollments.module.ts src/enrollments/enrollments.module.old.ts

# Appliquer les nouveaux fichiers
mv src/enrollments/enrollments.service.refactored.ts src/enrollments/enrollments.service.ts
mv src/enrollments/enrollments.module.refactored.ts src/enrollments/enrollments.module.ts

echo "✅ Refactorisation appliquée"
echo ""
echo "Statistiques:"
echo "- Ancien service: $(wc -l < src/enrollments/enrollments.service.old.ts) lignes"
echo "- Nouveau service principal: $(wc -l < src/enrollments/enrollments.service.ts) lignes"
echo "- Services modulaires:"
echo "  - enrollment-validation.service.ts: $(wc -l < src/enrollments/services/enrollment-validation.service.ts) lignes"
echo "  - enrollment-mapper.service.ts: $(wc -l < src/enrollments/services/enrollment-mapper.service.ts) lignes"
echo "  - enrollment-management.service.ts: $(wc -l < src/enrollments/services/enrollment-management.service.ts) lignes"
echo "  - enrollment-query.service.ts: $(wc -l < src/enrollments/services/enrollment-query.service.ts) lignes"

echo ""
echo "Total lignes après refactorisation: $(find src/enrollments/services -name "*.ts" -exec wc -l {} + | tail -1 | awk '{print $1}')"
echo ""
echo "Réduction: De 517 lignes à ~150 lignes dans le service principal + services modulaires"

# Compiler pour vérifier
echo ""
echo "=== Vérification de la compilation ==="
npm run build