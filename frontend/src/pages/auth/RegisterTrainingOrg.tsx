import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Check,
  AlertCircle,
  FileText,
  Shield,
  Upload,
  Award,
  Clock,
  CheckCircle,
  Plane
} from 'lucide-react';

interface FormData {
  // Informations organisation
  organizationName: string;
  siret: string;
  address: string;
  city: string;
  postalCode: string;
  website: string;
  description: string;
  
  // Contact
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Compte
  email: string;
  password: string;
  confirmPassword: string;
  
  // Certifications
  qualiopiCertified: boolean;
  qualiopiNumber?: string;
  
  // Documents
  documents: {
    siretFile?: File;
    qualiopiFile?: File;
    presentationFile?: File;
  };
  
  // Conditions
  termsAccepted: boolean;
  partnersConditionsAccepted: boolean;
}

const RegisterTrainingOrg = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    siret: '',
    address: '',
    city: '',
    postalCode: '',
    website: '',
    description: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    email: '',
    password: '',
    confirmPassword: '',
    qualiopiCertified: false,
    documents: {},
    termsAccepted: false,
    partnersConditionsAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (documentType: 'siretFile' | 'qualiopiFile' | 'presentationFile', file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Inscription organisme de formation:', formData);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirection vers page de confirmation
      navigate('/training-org/registration-pending');
    } catch (error) {
      console.error('Erreur inscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = () => {
    return formData.organizationName && 
           formData.siret && 
           formData.address && 
           formData.contactFirstName && 
           formData.contactLastName && 
           formData.contactEmail &&
           formData.email &&
           formData.password &&
           formData.password === formData.confirmPassword;
  };

  const isStep2Valid = () => {
    return formData.documents.siretFile && // SIRET obligatoire
           (!formData.qualiopiCertified || formData.documents.qualiopiFile); // Qualiopi si déclaré
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Building2 className="h-4 w-4" />
              Organisme de Formation
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Rejoignez PYGMALION
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Intégrez notre écosystème de formation aéronautique et développez votre activité
            </p>
          </div>

          {/* Indicateur de progression */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { number: 1, title: "Informations" },
                { number: 2, title: "Documents" },
                { number: 3, title: "Validation" }
              ].map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepItem.number 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > stepItem.number ? <Check className="h-5 w-5" /> : stepItem.number}
                    </div>
                    <div className="text-xs mt-1 font-medium text-gray-600">{stepItem.title}</div>
                  </div>
                  {index < 2 && (
                    <div className={`w-20 h-1 mx-4 ${
                      step > stepItem.number ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                {step === 1 && <><Building2 className="h-6 w-6" /> Informations de l'organisme</>}
                {step === 2 && <><FileText className="h-6 w-6" /> Documents justificatifs</>}
                {step === 3 && <><Shield className="h-6 w-6" /> Finalisation et validation</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">

              {/* Étape 1: Informations de l'organisme */}
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); if (isStep1Valid()) setStep(2); }} className="space-y-6">
                  
                  {/* Informations entreprise */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Informations de l'organisme
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="organizationName">Nom de l'organisme *</Label>
                        <Input
                          id="organizationName"
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange('organizationName', e.target.value)}
                          placeholder="Ex: AeroFormation Excellence"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="siret">SIRET *</Label>
                        <Input
                          id="siret"
                          value={formData.siret}
                          onChange={(e) => handleInputChange('siret', e.target.value)}
                          placeholder="12345678901234"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="website">Site web</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://votre-site.com"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Adresse *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="123 rue de l'Aviation"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Paris"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          placeholder="75001"
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description de l'organisme</Label>
                        <textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                          rows={3}
                          placeholder="Décrivez votre expertise et vos domaines de formation en aéronautique..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact principal */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contact principal</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactFirstName">Prénom *</Label>
                        <Input
                          id="contactFirstName"
                          value={formData.contactFirstName}
                          onChange={(e) => handleInputChange('contactFirstName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contactLastName">Nom *</Label>
                        <Input
                          id="contactLastName"
                          value={formData.contactLastName}
                          onChange={(e) => handleInputChange('contactLastName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contactEmail">Email contact *</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="contactPhone">Téléphone</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Compte utilisateur */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-900 mb-4">Compte d'accès</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email de connexion *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="admin@votre-organisme.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password">Mot de passe *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                      <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Les mots de passe ne correspondent pas.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Certification Qualiopi */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certification Qualiopi
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="qualiopiCertified"
                          checked={formData.qualiopiCertified}
                          onCheckedChange={(checked) => handleInputChange('qualiopiCertified', checked as boolean)}
                        />
                        <Label htmlFor="qualiopiCertified" className="font-medium">
                          Nous disposons de la certification Qualiopi
                        </Label>
                      </div>
                      
                      {formData.qualiopiCertified && (
                        <div>
                          <Label htmlFor="qualiopiNumber">Numéro de certification Qualiopi</Label>
                          <Input
                            id="qualiopiNumber"
                            value={formData.qualiopiNumber || ''}
                            onChange={(e) => handleInputChange('qualiopiNumber', e.target.value)}
                            placeholder="Ex: 2019/84697.1"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button type="submit" disabled={!isStep1Valid()} className="bg-blue-600 px-8">
                      Étape suivante
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Étape 2: Documents justificatifs */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Documents requis pour la validation KYB</h3>
                    <p className="text-blue-700 text-sm">
                      Ces documents sont nécessaires pour vérifier l'authenticité de votre organisme selon les procédures Know Your Business.
                    </p>
                  </div>

                  {/* Document SIRET obligatoire */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Extrait Kbis / Document SIRET *</h4>
                        <p className="text-sm text-gray-600">Document officiel prouvant l'existence légale de votre organisme</p>
                      </div>
                      <Badge variant="destructive" className="ml-auto">Obligatoire</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        type="file"
                        id="siretFile"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('siretFile', e.target.files[0])}
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('siretFile')?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {formData.documents.siretFile ? 'Modifier le fichier' : 'Sélectionner le fichier'}
                      </Button>
                      {formData.documents.siretFile && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          {formData.documents.siretFile.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Qualiopi conditionnel */}
                  {formData.qualiopiCertified && (
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Certification Qualiopi *</h4>
                          <p className="text-sm text-gray-600">Votre certificat Qualiopi en cours de validité</p>
                        </div>
                        <Badge className="ml-auto bg-purple-500">Requis</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <input
                          type="file"
                          id="qualiopiFile"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('qualiopiFile', e.target.files[0])}
                          className="hidden"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => document.getElementById('qualiopiFile')?.click()}
                          className="w-full"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {formData.documents.qualiopiFile ? 'Modifier le fichier' : 'Sélectionner le fichier'}
                        </Button>
                        {formData.documents.qualiopiFile && (
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4" />
                            {formData.documents.qualiopiFile.name}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Document de présentation optionnel */}
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Plane className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Document de présentation</h4>
                        <p className="text-sm text-gray-600">Plaquette ou présentation de votre organisme (optionnel)</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">Optionnel</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        type="file"
                        id="presentationFile"
                        accept=".pdf,.ppt,.pptx,.doc,.docx"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('presentationFile', e.target.files[0])}
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('presentationFile')?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {formData.documents.presentationFile ? 'Modifier le fichier' : 'Sélectionner le fichier'}
                      </Button>
                      {formData.documents.presentationFile && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          {formData.documents.presentationFile.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Formats acceptés :</strong> PDF, JPG, PNG (max 5MB pour les documents, 10MB pour les présentations)
                    </p>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setStep(3)} 
                      disabled={!isStep2Valid()}
                      className="bg-blue-600"
                    >
                      Étape suivante
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 3: Finalisation */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Récapitulatif */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-4">Récapitulatif de votre demande</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Organisme :</strong> {formData.organizationName}
                      </div>
                      <div>
                        <strong>SIRET :</strong> {formData.siret}
                      </div>
                      <div>
                        <strong>Contact :</strong> {formData.contactFirstName} {formData.contactLastName}
                      </div>
                      <div>
                        <strong>Email :</strong> {formData.contactEmail}
                      </div>
                      <div>
                        <strong>Qualiopi :</strong> {formData.qualiopiCertified ? 'Oui' : 'Non'}
                      </div>
                      <div>
                        <strong>Documents :</strong> {Object.keys(formData.documents).filter(key => formData.documents[key as keyof typeof formData.documents]).length} téléchargé(s)
                      </div>
                    </div>
                  </div>

                  {/* Processus de validation */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Processus de validation
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs">1</div>
                        <span><strong>Réception :</strong> Votre dossier sera traité sous 24-48h</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs">2</div>
                        <span><strong>Analyse :</strong> Vérification de vos documents et expertise (3-5 jours)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs">3</div>
                        <span><strong>Validation :</strong> Notification par email avec accès plateforme</span>
                      </div>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                      />
                      <Label htmlFor="termsAccepted" className="text-sm">
                        J'accepte les{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-800 underline">
                          conditions générales d'utilisation
                        </Link>
                        {' '}et la{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                          politique de confidentialité
                        </Link>
                        {' '}de PYGMALION *
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="partnersConditionsAccepted"
                        checked={formData.partnersConditionsAccepted}
                        onCheckedChange={(checked) => handleInputChange('partnersConditionsAccepted', checked as boolean)}
                      />
                      <Label htmlFor="partnersConditionsAccepted" className="text-sm">
                        J'accepte les{' '}
                        <Link to="/partner-conditions" className="text-blue-600 hover:text-blue-800 underline">
                          conditions de partenariat
                        </Link>
                        {' '}pour les organismes de formation *
                      </Label>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.termsAccepted || !formData.partnersConditionsAccepted} 
                      className="bg-blue-600 px-8"
                    >
                      {isSubmitting ? (
                        <>Envoi en cours...</>
                      ) : (
                        <>
                          Soumettre la candidature
                          <Check className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Information complémentaire */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterTrainingOrg; 