import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: unknown) => jsPDF;
  }
}

interface ExportData {
  headers: string[];
  rows: unknown[][];
}

export const exportToCSV = (data: ExportData, filename: string) => {
  // Créer le contenu CSV
  const csvContent = [
    // Headers
    data.headers.join(','),
    // Rows
    ...data.rows.map(row => 
      row.map(cell => {
        // Échapper les virgules et guillemets dans les cellules
        const cellStr = String(cell || '');
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    )
  ].join('\n');

  // Créer un blob et télécharger
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (
  title: string, 
  subtitle: string,
  data: ExportData,
  filename: string,
  additionalInfo?: { label: string; value: string }[]
) => {
  const doc = new jsPDF();
  
  // Titre
  doc.setFontSize(20);
  doc.text(title, 14, 22);
  
  // Sous-titre
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(subtitle, 14, 30);
  
  // Date d'export
  doc.setFontSize(10);
  doc.text(`Exporté le: ${new Date().toLocaleDateString('fr-FR')}`, 14, 38);
  
  // Informations additionnelles
  let yPos = 48;
  if (additionalInfo) {
    additionalInfo.forEach(info => {
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(`${info.label}:`, 14, yPos);
      doc.setTextColor(100);
      doc.text(info.value, 14 + doc.getTextWidth(`${info.label}: `), yPos);
      yPos += 6;
    });
  }
  
  // Table
  doc.autoTable({
    head: [data.headers],
    body: data.rows,
    startY: yPos + 5,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [139, 92, 246],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });
  
  // Pied de page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  // Télécharger
  doc.save(`${filename}.pdf`);
};

// Export spécifique pour les résultats de quiz
export const exportQuizResults = (
  quizTitle: string,
  results: unknown[],
  format: 'csv' | 'pdf'
) => {
  const exportData: ExportData = {
    headers: [
      'Apprenant',
      'Email',
      'Tentative',
      'Date',
      'Score',
      'Réussi',
      'Durée'
    ],
    rows: results.map(result => [
      result.user.fullName,
      result.user.email,
      `#${result.attemptNumber}`,
      new Date(result.startTime).toLocaleDateString('fr-FR'),
      `${result.score?.toFixed(0) || 0}%`,
      result.passed ? 'Oui' : 'Non',
      result.timeSpent || 'N/A'
    ])
  };

  const filename = `quiz_${quizTitle.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}`;

  if (format === 'csv') {
    exportToCSV(exportData, filename);
  } else {
    exportToPDF(
      'Résultats du Quiz',
      quizTitle,
      exportData,
      filename,
      [
        { label: 'Nombre de tentatives', value: String(results.length) },
        { label: 'Taux de réussite', value: `${((results.filter(r => r.passed).length / results.length) * 100).toFixed(0)}%` }
      ]
    );
  }
};

// Export spécifique pour les résultats d'examens
export const exportExamResults = (
  examTitle: string,
  results: unknown[],
  format: 'csv' | 'pdf'
) => {
  const exportData: ExportData = {
    headers: [
      'Apprenant',
      'Email',
      'Tentative',
      'Date',
      'Score',
      'Réussi',
      'Alertes sécurité',
      'Statut'
    ],
    rows: results.map(result => [
      result.user.fullName,
      result.user.email,
      `#${result.attemptNumber}`,
      new Date(result.startTime).toLocaleDateString('fr-FR'),
      `${result.score?.toFixed(0) || 0}%`,
      result.passed ? 'Oui' : 'Non',
      String(result.securityInfo.alertCount || 0),
      result.securityInfo.suspended ? 'Suspendu' : 'Normal'
    ])
  };

  const filename = `exam_${examTitle.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}`;

  if (format === 'csv') {
    exportToCSV(exportData, filename);
  } else {
    exportToPDF(
      'Résultats de l\'Examen',
      examTitle,
      exportData,
      filename,
      [
        { label: 'Nombre de tentatives', value: String(results.length) },
        { label: 'Taux de réussite', value: `${((results.filter(r => r.passed).length / results.length) * 100).toFixed(0)}%` },
        { label: 'Tentatives suspectes', value: String(results.filter(r => r.securityInfo.alertCount > 3).length) }
      ]
    );
  }
};

// Export global des résultats d'un cours
export const exportCourseResults = (
  courseName: string,
  quizResults: unknown[],
  examResults: unknown[],
  format: 'csv' | 'pdf'
) => {
  const allResults = [
    ...quizResults.map(q => ({ ...q, type: 'Quiz' })),
    ...examResults.map(e => ({ ...e, type: 'Examen' }))
  ];

  const exportData: ExportData = {
    headers: [
      'Type',
      'Titre',
      'Module',
      'Tentatives totales',
      'Réussites',
      'Score moyen',
      'Étudiants uniques'
    ],
    rows: allResults.map(result => [
      result.type,
      result.quizTitle || result.examTitle,
      result.moduleTitle,
      String(result.totalAttempts),
      String(result.passedAttempts),
      `${result.averageScore.toFixed(0)}%`,
      String(result.students?.length || 0)
    ])
  };

  const filename = `resultats_${courseName.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}`;

  if (format === 'csv') {
    exportToCSV(exportData, filename);
  } else {
    const totalAttempts = allResults.reduce((sum, r) => sum + r.totalAttempts, 0);
    const totalPassed = allResults.reduce((sum, r) => sum + r.passedAttempts, 0);
    const avgScore = allResults.reduce((sum, r) => sum + r.averageScore, 0) / allResults.length;

    exportToPDF(
      'Résultats de la Formation',
      courseName,
      exportData,
      filename,
      [
        { label: 'Nombre d\'évaluations', value: String(allResults.length) },
        { label: 'Tentatives totales', value: String(totalAttempts) },
        { label: 'Taux de réussite global', value: `${((totalPassed / totalAttempts) * 100).toFixed(0)}%` },
        { label: 'Score moyen global', value: `${avgScore.toFixed(0)}%` }
      ]
    );
  }
};