#!/bin/bash

echo "=== Application de la refactorisation security.service.ts ==="

# Sauvegarder l'ancien service
mv src/security/security.service.ts src/security/security.service.old.ts

# Appliquer le nouveau fichier
mv src/security/security.service.refactored.ts src/security/security.service.ts

echo "✅ Refactorisation appliquée"
echo ""
echo "Statistiques:"
echo "- Ancien service: $(wc -l < src/security/security.service.old.ts) lignes"
echo "- Nouveau service principal: $(wc -l < src/security/security.service.ts) lignes"
echo "- Services modulaires:"
echo "  - exam-config.service.ts: $(wc -l < src/security/services/exam-config.service.ts) lignes"
echo "  - exam-monitoring.service.ts: $(wc -l < src/security/services/exam-monitoring.service.ts) lignes"
echo "  - exam-reports.service.ts: $(wc -l < src/security/services/exam-reports.service.ts) lignes"
echo "  - exam-session.service.ts: $(wc -l < src/security/services/exam-session.service.ts) lignes"

echo ""
echo "Total lignes après refactorisation: $(find src/security/services -name "*.ts" -exec wc -l {} + | tail -1 | awk '{print $1}')"
echo ""
echo "Réduction: De 913 lignes à ~100 lignes dans le service principal + services modulaires"