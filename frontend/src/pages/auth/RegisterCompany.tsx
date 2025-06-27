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
  Building, 
  Check,
  AlertCircle,
  FileText,
  Shield,
  Upload,
  Clock,
  CheckCircle,
  Plane,
  Building2,
  MapPin,
  Users
} from 'lucide-react';

type CompanyType = 'airline' | 'airport_service' | 'other';

interface FormData {
  // Type d'entreprise
  companyType: CompanyType;
  
  // Informations entreprise
  companyName: string;
  siret: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  website: string;
  description: string;
  sector: string;
  employeeCount: string;
  
  // Affiliation aéroport
  airportAffiliation: boolean;
  airportCode?: string;
  airportName?: string;
  
  // Contact manager principal
  managerFirstName: string;
  managerLastName: string;
  managerPosition: string;
  managerEmail: string;
  managerPhone: string;
  
  // Compte
  email: string;
  password: string;
  confirmPassword: string;
  
  // Budget formation
  annualBudget: string;
  teamSize: string;
  
  // Documents
  documents: {
    siretFile?: File;
    presentationFile?: File;
  };
  
  // Conditions
  termsAccepted: boolean;
  dataProcessingAccepted: boolean;
}

export default function RegisterCompany() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyType: 'airline',
    companyName: '',
    siret: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    website: '',
    description: '',
    sector: '',
    employeeCount: '',
    airportAffiliation: false,
    managerFirstName: '',
    managerLastName: '',
    managerPosition: '',
    managerEmail: '',
    managerPhone: '',
    email: '',
    password: '',
    confirmPassword: '',
    annualBudget: '',
    teamSize: '',
    documents: {},
    termsAccepted: false,
    dataProcessingAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (documentType: 'siretFile' | 'presentationFile', file: File) => {
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
      console.log('Inscription entreprise:', formData);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirection vers page de confirmation
      navigate('/company/registration-pending');
    } catch (error) {
      console.error('Erreur inscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = () => {
    return formData.companyType && formData.companyName && formData.siret && formData.address && formData.city;
  };

  const isStep2Valid = () => {
    return formData.managerFirstName && formData.managerLastName && formData.managerEmail && 
           formData.email && formData.password && formData.password === formData.confirmPassword;
  };

  const isStep3Valid = () => {
    return formData.documents.siretFile && formData.termsAccepted && formData.dataProcessingAccepted;
  };

  const companyTypes = [
    {
      id: 'airline' as CompanyType,
      title: 'Compagnie Aérienne',
      description: 'Transport aérien commercial, cargo, ou charter',
      icon: Plane,
      color: 'blue'
    },
    {
      id: 'airport_service' as CompanyType,
      title: 'Prestataire Aéroportuaire',
      description: 'Services au sol, handling, maintenance, sécurité',
      icon: Building2,
      color: 'green'
    },
    {
      id: 'other' as CompanyType,
      title: 'Autre Entreprise',
      description: 'Autre type d\'entreprise du secteur aéronautique',
      icon: Building,
      color: 'purple'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Building className="h-4 w-4" />
              Entreprise
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Créer un Compte Entreprise
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gérez efficacement la formation de vos équipes dans le secteur aéronautique
            </p>
          </div>

          {/* Indicateur de progression */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { number: 1, title: "Type" },
                { number: 2, title: "Informations" },
                { number: 3, title: "Contact" },
                { number: 4, title: "Validation" }
              ].map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className="text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepItem.number 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step > stepItem.number ? <Check className="h-4 w-4" /> : stepItem.number}
                    </div>
                    <div className="text-xs mt-1 font-medium text-gray-600">{stepItem.title}</div>
                  </div>
                  {index < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
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
                {step === 1 && <><Building className="h-6 w-6" /> Type d'entreprise</>}
                {step === 2 && <><Building2 className="h-6 w-6" /> Informations entreprise</>}
                {step === 3 && <><Users className="h-6 w-6" /> Contact manager</>}
                {step === 4 && <><Shield className="h-6 w-6" /> Validation KYB</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">

              {/* Étape 1: Type d'entreprise */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600">
                      Sélectionnez le type d'entreprise qui correspond le mieux à votre activité
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {companyTypes.map((type) => {
                      const IconComponent = type.icon;
                      const isSelected = formData.companyType === type.id;
                      return (
                        <Card 
                          key={type.id}
                          className={`cursor-pointer hover:shadow-lg transition-all border-2 ${
                            isSelected 
                              ? `border-${type.color}-500 bg-${type.color}-50` 
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('companyType', type.id)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className={`bg-${type.color}-100 p-3 rounded-lg`}>
                                <IconComponent className={`h-6 w-6 text-${type.color}-600`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {type.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  {type.description}
                                </p>
                              </div>
                              {isSelected && <Check className="h-5 w-5 text-green-500" />}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button 
                      onClick={() => setStep(2)}
                      disabled={!formData.companyType}
                      className="bg-blue-600 px-8"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 2: Informations entreprise */}
              {step === 2 && (
                <form onSubmit={(e) => { e.preventDefault(); if (isStep1Valid()) setStep(3); }} className="space-y-6">
                  
                  {/* Informations principales */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Informations de l'entreprise
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Ex: Air France"
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
                        <Label htmlFor="sector">Secteur d'activité</Label>
                        <Input
                          id="sector"
                          value={formData.sector}
                          onChange={(e) => handleInputChange('sector', e.target.value)}
                          placeholder="Ex: Transport aérien international"
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
                      
                      <div>
                        <Label htmlFor="website">Site web</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://votre-entreprise.com"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="employeeCount">Nombre d'employés</Label>
                        <select
                          id="employeeCount"
                          value={formData.employeeCount}
                          onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Sélectionner</option>
                          <option value="1-10">1-10 employés</option>
                          <option value="11-50">11-50 employés</option>
                          <option value="51-200">51-200 employés</option>
                          <option value="201-1000">201-1000 employés</option>
                          <option value="1000+">Plus de 1000 employés</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description de l'entreprise</Label>
                        <textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                          rows={3}
                          placeholder="Décrivez votre entreprise et vos activités..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Affiliation aéroport */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Affiliation aéroport
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="airportAffiliation"
                          checked={formData.airportAffiliation}
                          onCheckedChange={(checked) => handleInputChange('airportAffiliation', checked as boolean)}
                        />
                        <Label htmlFor="airportAffiliation" className="font-medium">
                          Notre entreprise opère sur un site aéroportuaire spécifique
                        </Label>
                      </div>
                      
                      {formData.airportAffiliation && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <Label htmlFor="airportCode">Code aéroport (IATA/ICAO)</Label>
                            <Input
                              id="airportCode"
                              value={formData.airportCode || ''}
                              onChange={(e) => handleInputChange('airportCode', e.target.value)}
                              placeholder="Ex: CDG, LFPG"
                            />
                          </div>
                          <div>
                            <Label htmlFor="airportName">Nom de l'aéroport</Label>
                            <Input
                              id="airportName"
                              value={formData.airportName || ''}
                              onChange={(e) => handleInputChange('airportName', e.target.value)}
                              placeholder="Ex: Charles de Gaulle"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Budget formation */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-900 mb-4">Informations formation</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="teamSize">Taille de l'équipe à former</Label>
                        <select
                          id="teamSize"
                          value={formData.teamSize}
                          onChange={(e) => handleInputChange('teamSize', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Sélectionner</option>
                          <option value="1-10">1-10 personnes</option>
                          <option value="11-25">11-25 personnes</option>
                          <option value="26-50">26-50 personnes</option>
                          <option value="51-100">51-100 personnes</option>
                          <option value="100+">Plus de 100 personnes</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="annualBudget">Budget formation annuel</Label>
                        <select
                          id="annualBudget"
                          value={formData.annualBudget}
                          onChange={(e) => handleInputChange('annualBudget', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Sélectionner</option>
                          <option value="<10k">Moins de 10k€</option>
                          <option value="10k-50k">10k€ - 50k€</option>
                          <option value="50k-100k">50k€ - 100k€</option>
                          <option value="100k-500k">100k€ - 500k€</option>
                          <option value="500k+">Plus de 500k€</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button type="submit" disabled={!isStep1Valid()} className="bg-blue-600 px-8">
                      Continuer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Étape 3: Contact manager */}
              {step === 3 && (
                <form onSubmit={(e) => { e.preventDefault(); if (isStep2Valid()) setStep(4); }} className="space-y-6">
                  
                  {/* Informations manager */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Manager principal
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
                          placeholder="Ex: Responsable Formation"
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
                        <Label htmlFor="managerEmail">Email manager *</Label>
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
                          placeholder="admin@votre-entreprise.com"
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
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button type="submit" disabled={!isStep2Valid()} className="bg-blue-600 px-8">
                      Continuer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Étape 4: Validation KYB */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Validation Know Your Business (KYB)</h3>
                    <p className="text-blue-700 text-sm">
                      Ces documents sont nécessaires pour vérifier l'authenticité de votre entreprise.
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
                        <p className="text-sm text-gray-600">Document officiel prouvant l'existence légale de votre entreprise</p>
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

                  {/* Document présentation optionnel */}
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Présentation entreprise</h4>
                        <p className="text-sm text-gray-600">Document présentant votre entreprise et vos besoins en formation</p>
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
                      <h3 className="font-semibold text-yellow-900">Processus de validation</h3>
                    </div>
                    
                    <div className="space-y-3 text-sm text-yellow-800">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Étape 1 :</strong> Réception de votre demande (immédiat)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Étape 2 :</strong> Analyse des documents (2-3 jours ouvrés)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Étape 3 :</strong> Validation et activation (1-2 jours ouvrés)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(3)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={!isStep3Valid() || isSubmitting} 
                      className="bg-blue-600 px-8"
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

          {/* Aide */}
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
} 