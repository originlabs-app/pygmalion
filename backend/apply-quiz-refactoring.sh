#!/bin/bash

echo "=== Application de la refactorisation quizzes.service.ts ==="

# Sauvegarder les anciens fichiers
mv src/quizzes/quizzes.service.ts src/quizzes/quizzes.service.old.ts
mv src/quizzes/quizzes.controller.ts src/quizzes/quizzes.controller.old.ts

# Appliquer les nouveaux fichiers
mv src/quizzes/quizzes.service.refactored.ts src/quizzes/quizzes.service.ts
mv src/quizzes/quizzes.controller.refactored.ts src/quizzes/quizzes.controller.ts

echo "✅ Refactorisation appliquée"
echo ""
echo "Statistiques:"
echo "- Ancien service: $(wc -l < src/quizzes/quizzes.service.old.ts) lignes"
echo "- Nouveau service principal: $(wc -l < src/quizzes/quizzes.service.ts) lignes"
echo "- Services modulaires:"
echo "  - quiz-mapper.service.ts: $(wc -l < src/quizzes/services/quiz-mapper.service.ts) lignes"
echo "  - quiz-validation.service.ts: $(wc -l < src/quizzes/services/quiz-validation.service.ts) lignes"
echo "  - quiz-attempt.service.ts: $(wc -l < src/quizzes/services/quiz-attempt.service.ts) lignes"
echo "  - quiz-reporting.service.ts: $(wc -l < src/quizzes/services/quiz-reporting.service.ts) lignes"

echo ""
echo "Total lignes après refactorisation: $(find src/quizzes/services -name "*.ts" -exec wc -l {} + | tail -1 | awk '{print $1}')"
echo ""
echo "Réduction: De 783 lignes à ~230 lignes dans le service principal + services modulaires"