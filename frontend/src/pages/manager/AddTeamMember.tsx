import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, ArrowLeft, ArrowRight, Check, Copy, CheckCircle } from 'lucide-react';

const AddTeamMember = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedCode, setGeneratedCode] = useState('');
  
  const [memberData, setMemberData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    accessLevel: 'standard',
    sendWelcomeEmail: true,
    requireMFA: true
  });

  const departments = ['Handling', 'Bagage', 'Sûreté', 'Maintenance', 'Customer Service', 'Operations'];
  const positions = ['Agent de Piste', 'Agent de Piste Senior', 'Coordinateur Handling', 'Responsable Bagage'];

  const accessLevels = [
    { value: 'basic', label: 'Basique', description: 'Accès formations assignées uniquement' },
    { value: 'standard', label: 'Standard', description: 'Accès formations + marketplace consultable' },
    { value: 'advanced', label: 'Avancé', description: 'Accès complet + demandes de formation' }
  ];

  const generateInvitationCode = () => {
    const code = 'AF-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-2025';
    setGeneratedCode(code);
  };

  const handleInputChange = (field: string, value: any) => {
    setMemberData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    generateInvitationCode();
    setCurrentStep(4);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <Check className="h-5 w-5" /> : step}
            </div>
            {step < 3 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ajouter un Membre</h1>
              <p className="text-gray-600">Ajoutez un nouveau membre à votre équipe</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/manager/team">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'équipe
            </Link>
          </Button>
        </div>

        {/* Steps */}
        {currentStep <= 3 && <StepIndicator />}

        {/* Step 1: Informations */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du membre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={memberData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Prénom du membre"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={memberData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Nom du membre"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={memberData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="prenom.nom@airfrance.fr"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={memberData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Poste *</Label>
                    <Select value={memberData.position} onValueChange={(value) => handleInputChange('position', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un poste" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map(position => (
                          <SelectItem key={position} value={position}>{position}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Département *</Label>
                    <Select value={memberData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un département" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => setCurrentStep(2)} 
                disabled={!memberData.firstName || !memberData.lastName || !memberData.email}
              >
                Suivant <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Accès */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration des accès</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Niveau d'accès *</Label>
                  <div className="grid gap-4">
                    {accessLevels.map(level => (
                      <Card 
                        key={level.value}
                        className={`cursor-pointer transition-all ${
                          memberData.accessLevel === level.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => handleInputChange('accessLevel', level.value)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              memberData.accessLevel === level.value ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                            }`} />
                            <div>
                              <div className="font-medium">{level.label}</div>
                              <div className="text-sm text-gray-600">{level.description}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="requireMFA"
                      checked={memberData.requireMFA}
                      onCheckedChange={(value) => handleInputChange('requireMFA', value)}
                    />
                    <Label htmlFor="requireMFA">Exiger l'authentification multi-facteurs (MFA)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="sendWelcomeEmail"
                      checked={memberData.sendWelcomeEmail}
                      onCheckedChange={(value) => handleInputChange('sendWelcomeEmail', value)}
                    />
                    <Label htmlFor="sendWelcomeEmail">Envoyer un email de bienvenue</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Retour
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                Suivant <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Validation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Nom :</span>
                      <div className="font-medium">{memberData.firstName} {memberData.lastName}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email :</span>
                      <div className="font-medium">{memberData.email}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Poste :</span>
                      <div className="font-medium">{memberData.position}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Département :</span>
                      <div className="font-medium">{memberData.department}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Retour
              </Button>
              <Button onClick={handleSubmit}>
                <Check className="h-4 w-4 mr-2" /> Créer le membre
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Membre ajouté avec succès !</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="font-medium mb-2">Code d'invitation :</div>
                <div className="text-2xl font-mono font-bold text-blue-600 mb-2">{generatedCode}</div>
                <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedCode)}>
                  <Copy className="h-4 w-4 mr-2" /> Copier le code
                </Button>
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link to="/manager/team">Retour à l'équipe</Link>
                </Button>
                <Button asChild>
                  <Link to="/manager/team/add">Ajouter un autre membre</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ManagerLayout>
  );
};

export default AddTeamMember; 