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
  MapPin, 
  Check,
  AlertCircle,
  FileText,
  Shield,
  Upload,
  Clock,
  CheckCircle,
  Plane,
  Building2,
  Users,
  AlertTriangle
} from 'lucide-react';

interface FormData {
  // Informations aéroport
  airportName: string;
  iataCode: string;
  icaoCode: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  website: string;
  description: string;
  
  // Informations légales
  managementCompany: string;
  siret: string;
  
  // Contact gestionnaire principal
  managerFirstName: string;
  managerLastName: string;
  managerPosition: string;
  managerEmail: string;
  managerPhone: string;
  
  // Compte
  email: string;
  password: string;
  confirmPassword: string;
  
  // Informations supervision
  companiesCount: string;
  employeesCount: string;
  
  // Documents
  documents: {
    siretFile?: File;
    authorizationFile?: File;
    presentationFile?: File;
  };
  
  // Conditions
  termsAccepted: boolean;
  dataProcessingAccepted: boolean;
  uniquenessAcknowledged: boolean;
}

const RegisterAirport = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    airportName: '',
    iataCode: '',
    icaoCode: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    website: '',
    description: '',
    managementCompany: '',
    siret: '',
    managerFirstName: '',
    managerLastName: '',
    managerPosition: '',
    managerEmail: '',
    managerPhone: '',
    email: '',
    password: '',
    confirmPassword: '',
    companiesCount: '',
    employeesCount: '',
    documents: {},
    termsAccepted: false,
    dataProcessingAccepted: false,
    uniquenessAcknowledged: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (documentType: 'siretFile' | 'authorizationFile' | 'presentationFile', file: File) => {
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
      console.log('Inscription gestionnaire aéroport:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/airport/registration-pending');
    } catch (error) {
      console.error('Erreur inscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = () => {
    return formData.airportName && formData.iataCode && formData.address && formData.city && formData.managementCompany && formData.siret;
  };

  const isStep2Valid = () => {
    return formData.managerFirstName && formData.managerLastName && formData.managerEmail && 
           formData.email && formData.password && formData.password === formData.confirmPassword;
  };

  const isStep3Valid = () => {
    return formData.documents.siretFile && formData.documents.authorizationFile && 
           formData.termsAccepted && formData.dataProcessingAccepted && formData.uniquenessAcknowledged;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" />
              Gestionnaire d'Aéroport
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Créer un Compte Gestionnaire d'Aéroport
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supervisez efficacement la formation et la conformité de toutes les entreprises opérant sur votre site aéroportuaire
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { number: 1, title: "Aéroport" },
                { number: 2, title: "Contact" },
                { number: 3, title: "Validation" }
              ].map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepItem.number 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > stepItem.number ? <Check className="h-5 w-5" /> : stepItem.number}
                    </div>
                    <div className="text-xs mt-1 font-medium text-gray-600">{stepItem.title}</div>
                  </div>
                  {index < 2 && (
                    <div className={`w-20 h-1 mx-4 ${
                      step > stepItem.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                {step === 1 && <><MapPin className="h-6 w-6" /> Informations aéroport</>}
                {step === 2 && <><Users className="h-6 w-6" /> Contact gestionnaire</>}
                {step === 3 && <><Shield className="h-6 w-6" /> Validation KYB</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">

              {/* Étape 1: Informations aéroport */}
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); if (isStep1Valid()) setStep(2); }} className="space-y-6">
                  
                  {/* Alerte unicité */}
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Compte unique par aéroport :</strong> Un seul gestionnaire par site aéroportuaire peut être créé. 
                      Votre demande sera validée manuellement par nos équipes pour garantir l'unicité.
                    </AlertDescription>
                  </Alert>

                  {/* Informations aéroport */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                      <Plane className="h-5 w-5" />
                      Informations de l'aéroport
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="airportName">Nom de l'aéroport *</Label>
                        <Input
                          id="airportName"
                          value={formData.airportName}
                          onChange={(e) => handleInputChange('airportName', e.target.value)}
                          placeholder="Ex: Aéroport Charles de Gaulle"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="iataCode">Code IATA *</Label>
                        <Input
                          id="iataCode"
                          value={formData.iataCode}
                          onChange={(e) => handleInputChange('iataCode', e.target.value.toUpperCase())}
                          placeholder="CDG"
                          maxLength={3}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="icaoCode">Code ICAO</Label>
                        <Input
                          id="icaoCode"
                          value={formData.icaoCode}
                          onChange={(e) => handleInputChange('icaoCode', e.target.value.toUpperCase())}
                          placeholder="LFPG"
                          maxLength={4}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Adresse *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="95700 Roissy-en-France"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Roissy-en-France"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          placeholder="95700"
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
                          placeholder="https://www.parisaeroport.fr"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="country">Pays</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="France"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description de l'aéroport</Label>
                        <textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                          rows={3}
                          placeholder="Décrivez l'aéroport, ses spécificités et activités..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informations légales */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Informations légales
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="managementCompany">Société gestionnaire *</Label>
                        <Input
                          id="managementCompany"
                          value={formData.managementCompany}
                          onChange={(e) => handleInputChange('managementCompany', e.target.value)}
                          placeholder="Ex: Aéroports de Paris"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="siret">SIRET gestionnaire *</Label>
                        <Input
                          id="siret"
                          value={formData.siret}
                          onChange={(e) => handleInputChange('siret', e.target.value)}
                          placeholder="12345678901234"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informations supervision */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-900 mb-4">Informations supervision</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companiesCount">Nombre d'entreprises sur site</Label>
                        <select
                          id="companiesCount"
                          value={formData.companiesCount}
                          onChange={(e) => handleInputChange('companiesCount', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Sélectionner</option>
                          <option value="1-10">1-10 entreprises</option>
                          <option value="11-25">11-25 entreprises</option>
                          <option value="26-50">26-50 entreprises</option>
                          <option value="51-100">51-100 entreprises</option>
                          <option value="100+">Plus de 100 entreprises</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="employeesCount">Personnel total estimé</Label>
                        <select
                          id="employeesCount"
                          value={formData.employeesCount}
                          onChange={(e) => handleInputChange('employeesCount', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Sélectionner</option>
                          <option value="<500">Moins de 500</option>
                          <option value="500-1000">500-1000 personnes</option>
                          <option value="1000-5000">1000-5000 personnes</option>
                          <option value="5000-10000">5000-10000 personnes</option>
                          <option value="10000+">Plus de 10000 personnes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button type="submit" disabled={!isStep1Valid()} className="bg-green-600 px-8">
                      Continuer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Étape 2: Contact gestionnaire */}
              {step === 2 && (
                <form onSubmit={(e) => { e.preventDefault(); if (isStep2Valid()) setStep(3); }} className="space-y-6">
                  
                  {/* Informations gestionnaire */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gestionnaire principal
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="managerFirstName">Prénom *</Label>
                        <Input
                          id="managerFirstName"
                          value={formData.managerFirstName}
                          onChange={(e) => handleInputChange('managerFirstName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="managerLastName">Nom *</Label>
                        <Input
                          id="managerLastName"
                          value={formData.managerLastName}
                          onChange={(e) => handleInputChange('managerLastName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="managerPosition">Poste</Label>
                        <Input
                          id="managerPosition"
                          value={formData.managerPosition}
                          onChange={(e) => handleInputChange('managerPosition', e.target.value)}
                          placeholder="Ex: Directeur des Opérations"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="managerPhone">Téléphone</Label>
                        <Input
                          id="managerPhone"
                          type="tel"
                          value={formData.managerPhone}
                          onChange={(e) => handleInputChange('managerPhone', e.target.value)}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="managerEmail">Email gestionnaire *</Label>
                        <Input
                          id="managerEmail"
                          type="email"
                          value={formData.managerEmail}
                          onChange={(e) => handleInputChange('managerEmail', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Compte d'accès */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">Compte d'accès</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email de connexion *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="admin@aeroport.com"
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

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button type="submit" disabled={!isStep2Valid()} className="bg-green-600 px-8">
                      Continuer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Étape 3: Validation KYB */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Validation Know Your Business (KYB)</h3>
                    <p className="text-green-700 text-sm">
                      Documents requis pour la validation de votre statut de gestionnaire d'aéroport.
                    </p>
                  </div>

                  {/* Document SIRET obligatoire */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Extrait Kbis société gestionnaire *</h4>
                        <p className="text-sm text-gray-600">Document prouvant l'existence légale de la société gestionnaire</p>
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

                  {/* Document autorisation obligatoire */}
                  <div className="border-2 border-dashed border-orange-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Autorisation de gestion *</h4>
                        <p className="text-sm text-gray-600">Document officiel prouvant votre autorisation à gérer l'aéroport</p>
                      </div>
                      <Badge className="ml-auto bg-orange-500">Requis</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        type="file"
                        id="authorizationFile"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('authorizationFile', e.target.files[0])}
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('authorizationFile')?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {formData.documents.authorizationFile ? 'Modifier le fichier' : 'Sélectionner le fichier'}
                      </Button>
                      {formData.documents.authorizationFile && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          {formData.documents.authorizationFile.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document présentation optionnel */}
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Présentation aéroport</h4>
                        <p className="text-sm text-gray-600">Document présentant l'aéroport et les entreprises présentes</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">Optionnel</Badge>
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

                  {/* Conditions */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Conditions d'utilisation</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="uniquenessAcknowledged"
                          checked={formData.uniquenessAcknowledged}
                          onCheckedChange={(checked) => handleInputChange('uniquenessAcknowledged', checked as boolean)}
                        />
                        <Label htmlFor="uniquenessAcknowledged" className="text-sm">
                          <strong>Je certifie être le gestionnaire officiel de cet aéroport</strong> et comprends qu'un seul 
                          compte gestionnaire par site aéroportuaire peut être créé *
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
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
                          {' '}de PYGMALION *
                        </Label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="dataProcessingAccepted"
                          checked={formData.dataProcessingAccepted}
                          onCheckedChange={(checked) => handleInputChange('dataProcessingAccepted', checked as boolean)}
                        />
                        <Label htmlFor="dataProcessingAccepted" className="text-sm">
                          J'accepte le traitement de mes données personnelles conformément à la{' '}
                          <Link to="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                            politique de confidentialité
                          </Link>
                          {' '}*
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Processus de validation */}
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-6 w-6 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-900">Processus de validation renforcé</h3>
                    </div>
                    
                    <div className="space-y-3 text-sm text-yellow-800">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Étape 1 :</strong> Réception de votre demande (immédiat)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Étape 2 :</strong> Vérification documentaire approfondie (3-5 jours ouvrés)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Étape 3 :</strong> Validation unicité aéroport (2-3 jours ouvrés)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Étape 4 :</strong> Activation compte gestionnaire (1-2 jours ouvrés)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={!isStep3Valid() || isSubmitting} 
                      className="bg-green-600 px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Création en cours...
                        </>
                      ) : (
                        <>
                          Créer le compte
                          <Check className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Se connecter
              </Link>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Besoin d'aide ? {' '}
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                Contactez-nous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterAirport; 