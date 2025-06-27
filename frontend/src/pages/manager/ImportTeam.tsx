import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  ArrowLeft,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  Users
} from 'lucide-react';

const ImportTeam = () => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importComplete, setImportComplete] = useState(false);

  const mockData = [
    { name: 'Thomas Durand', email: 'thomas.durand@airfrance.fr', status: 'valid' },
    { name: 'Céline Moreau', email: 'celine.moreau@airfrance.fr', status: 'valid' },
    { name: 'Alexandre Bernard', email: 'alexandre.bernard@airfrance.fr', status: 'warning' },
    { name: 'Sophie Leroy', email: 'sophie.leroy.invalid', status: 'error' }
  ];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportComplete(true);
    }, 2000);
  };

  const downloadTemplate = () => {
    alert('Template téléchargé !');
  };

  const validCount = mockData.filter(m => m.status === 'valid').length;
  const warningCount = mockData.filter(m => m.status === 'warning').length;
  const errorCount = mockData.filter(m => m.status === 'error').length;

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Import Excel Équipe</h1>
              <p className="text-gray-600">Importez plusieurs membres via un fichier Excel</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/manager/team">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'équipe
            </Link>
          </Button>
        </div>

        {!importComplete && (
          <>
            {/* Template */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  Template Excel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-medium">Template Import Équipe</div>
                      <div className="text-sm text-gray-600">Format Excel avec colonnes prédéfinies</div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={downloadTemplate}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Colonnes requises :</strong> Prénom, Nom, Email, Téléphone, Poste, Département
                </div>
              </CardContent>
            </Card>

            {/* Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Fichier</CardTitle>
              </CardHeader>
              <CardContent>
                {!file ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-lg font-medium mb-2">Sélectionnez votre fichier Excel</div>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" type="button" className="pointer-events-none">
                        Choisir un fichier
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <FileSpreadsheet className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-gray-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>

                    {!importing && (
                      <Button onClick={processImport} className="w-full">
                        Analyser et importer
                      </Button>
                    )}

                    {importing && (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <div>Analyse en cours...</div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview */}
            {file && !importing && (
              <Card>
                <CardHeader>
                  <CardTitle>Aperçu des données</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mockData.length}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{validCount}</div>
                      <div className="text-sm text-gray-600">Valides</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                      <div className="text-sm text-gray-600">Warnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                      <div className="text-sm text-gray-600">Erreurs</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {mockData.map((member, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        member.status === 'valid' ? 'border-green-200 bg-green-50' :
                        member.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                        'border-red-200 bg-red-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.email}</div>
                          </div>
                          <Badge variant={
                            member.status === 'valid' ? 'default' :
                            member.status === 'warning' ? 'secondary' : 'destructive'
                          }>
                            {member.status === 'valid' ? 'Valide' :
                             member.status === 'warning' ? 'Warning' : 'Erreur'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Success */}
        {importComplete && (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Import réussi !</h2>
              <p className="text-gray-600 mb-6">
                3 membres ont été ajoutés à votre équipe avec succès.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/manager/team">Voir l'équipe</Link>
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Nouvel import
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ImportTeam; 