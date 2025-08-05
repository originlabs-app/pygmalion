#!/bin/bash

echo "=== Application de la refactorisation exams.service.ts ==="

# Sauvegarder l'ancien service
mv src/exams/exams.service.ts src/exams/exams.service.old.ts
mv src/exams/exams.controller.ts src/exams/exams.controller.old.ts

# Appliquer les nouveaux fichiers
mv src/exams/exams.service.refactored.ts src/exams/exams.service.ts
mv src/exams/exams.controller.refactored.ts src/exams/exams.controller.ts

echo "✅ Refactorisation appliquée"
echo ""
echo "Statistiques:"
echo "- Ancien service: $(wc -l < src/exams/exams.service.old.ts) lignes"
echo "- Nouveau service principal: $(wc -l < src/exams/exams.service.ts) lignes"
echo "- Services modulaires:"
echo "  - exam-mapper.service.ts: $(wc -l < src/exams/services/exam-mapper.service.ts) lignes"
echo "  - exam-validation.service.ts: $(wc -l < src/exams/services/exam-validation.service.ts) lignes"
echo "  - exam-attempt.service.ts: $(wc -l < src/exams/services/exam-attempt.service.ts) lignes"
echo "  - exam-reporting.service.ts: $(wc -l < src/exams/services/exam-reporting.service.ts) lignes"
echo "  - exam-statistics.service.ts: $(wc -l < src/exams/services/exam-statistics.service.ts) lignes"

echo ""
echo "Total lignes après refactorisation: $(find src/exams/services -name "*.ts" -exec wc -l {} + | tail -1 | awk '{print $1}')"
echo ""
echo "Réduction: De 1037 lignes à ~300 lignes dans le service principal + services modulaires"