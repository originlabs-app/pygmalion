import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Building, 
  Check,
  AlertCircle,
  UserCheck
} from 'lucide-react';

type RegistrationPath = 'free' | 'invited' | 'affiliation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  registrationPath: RegistrationPath;
  invitationCode?: string;
  companyName?: string;
  companyEmail?: string;
  motivation?: string;
}

const RegisterLearner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    registrationPath: 'free'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePathSelection = (path: RegistrationPath) => {
    setFormData(prev => ({ ...prev, registrationPath: path }));
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Inscription apprenant:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (formData.registrationPath === 'free') {
        navigate('/student-dashboard');
      } else {
        navigate('/registration-pending');
      }
    } catch (error) {
      console.error('Erreur inscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Inscription Apprenant
            </h1>
            <p className="text-xl text-gray-600">
              Rejoignez la communauté aviation de PYGMALION
            </p>
          </div>

          {/* Indicateur de progression */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > stepNumber ? <Check className="h-5 w-5" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {step === 1 && "Choisissez votre parcours"}
                {step === 2 && "Vos informations"}
                {step === 3 && "Finalisation"}
              </CardTitle>
            </CardHeader>
            <CardContent>

              {/* Étape 1: Choix du parcours */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    
                    {/* Parcours A - Apprenant Libre */}
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                      onClick={() => handlePathSelection('free')}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-green-100 p-3 rounded-lg">
                            <User className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Apprenant Libre
                            </h3>
                            <p className="text-gray-600 mb-3">
                              Inscription autonome. Vous payez vos formations et gérez votre parcours.
                            </p>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Inscription immédiate
                            </Badge>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Parcours B - Invitation Manager */}
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                      onClick={() => handlePathSelection('invited')}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <UserCheck className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Invitation Manager
                            </h3>
                            <p className="text-gray-600 mb-3">
                              Vous avez reçu un code d'invitation de votre manager.
                            </p>
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              Code requis
                            </Badge>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Parcours C - Demande d'affiliation */}
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                      onClick={() => handlePathSelection('affiliation')}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <Building className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Demande d'Affiliation
                            </h3>
                            <p className="text-gray-600 mb-3">
                              Inscrivez-vous puis demandez l'affiliation à votre entreprise.
                            </p>
                            <Badge variant="outline" className="text-purple-600 border-purple-600">
                              Validation manager
                            </Badge>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Vous avez déjà un compte ?{' '}
                      <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                        Se connecter
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              {/* Étape 2: Informations personnelles */}
              {step === 2 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="confirmPassword">Confirmer *</Label>
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
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Les mots de passe ne correspondent pas.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button type="submit" disabled={!formData.firstName || !formData.email || formData.password !== formData.confirmPassword}>
                      Continuer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Étape 3: Finalisation */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Parcours Invitation */}
                  {formData.registrationPath === 'invited' && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">Invitation Manager</h3>
                        <p className="text-blue-700 text-sm">
                          Entrez le code d'invitation fourni par votre manager.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="invitationCode">Code d'invitation *</Label>
                        <Input
                          id="invitationCode"
                          value={formData.invitationCode || ''}
                          onChange={(e) => handleInputChange('invitationCode', e.target.value)}
                          placeholder="Ex: INV-ABC123"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Parcours Affiliation */}
                  {formData.registrationPath === 'affiliation' && (
                    <div className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-purple-900 mb-2">Demande d'Affiliation</h3>
                        <p className="text-purple-700 text-sm">
                          Votre manager devra valider votre demande.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName || ''}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="companyEmail">Email entreprise *</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          value={formData.companyEmail || ''}
                          onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="motivation">Motivation *</Label>
                        <textarea
                          id="motivation"
                          value={formData.motivation || ''}
                          onChange={(e) => handleInputChange('motivation', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                          rows={3}
                          placeholder="Pourquoi souhaitez-vous être affilié ?"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Parcours Libre */}
                  {formData.registrationPath === 'free' && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Apprenant Libre</h3>
                      <p className="text-green-700 text-sm">
                        Votre compte sera activé immédiatement.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-blue-600">
                      {isSubmitting ? "Inscription en cours..." : "Finaliser l'inscription"}
                      <Check className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterLearner;
