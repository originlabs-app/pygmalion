
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle2, FileIcon, FileText, Lock } from 'lucide-react';

interface Module {
  id: string;
  title: string;
}

interface CourseSidebarProps {
  modules: Module[];
  currentModule: number;
  activeTab: string;
  progress: number;
  securityVerification: 'idle' | 'verifying' | 'completed';
  onModuleClick: (index: number) => void;
  onTabClick: (tab: string) => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  modules,
  currentModule,
  activeTab,
  progress,
  securityVerification,
  onModuleClick,
  onTabClick
}) => {
  return (
    <div className="col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {modules.map((module, index) => (
              <Button
                key={module.id}
                variant={currentModule === index && activeTab === 'content' ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  onModuleClick(index);
                  onTabClick('content');
                }}
              >
                <div className="flex items-center">
                  {index < currentModule ? (
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <BookOpen className="h-4 w-4 mr-2" />
                  )}
                  Module {index + 1}
                </div>
              </Button>
            ))}
            <Button
              variant={activeTab === 'quiz' ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                if (securityVerification !== 'completed' && progress >= 100) {
                  onTabClick('security');
                } else if (securityVerification === 'completed' || activeTab === 'quiz') {
                  onTabClick('quiz');
                } else {
                  // This would show a toast in the main component
                  onTabClick('content');
                }
              }}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Évaluation 
                {securityVerification !== 'completed' && progress >= 100 && (
                  <Lock className="h-3 w-3 ml-1" />
                )}
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Resources section */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Ressources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-2">Documents complémentaires pour ce module:</p>
            <Button variant="ghost" className="w-full justify-start">
              <FileIcon className="h-4 w-4 mr-2" /> Guide de sécurité aérienne
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileIcon className="h-4 w-4 mr-2" /> Réglementation 2024
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSidebar;
