
import React from 'react';
import { Button } from '@/components/ui/button';

const InteractiveContent: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 p-8 mb-6 bg-gray-50">
      <h3 className="text-xl font-medium mb-4 text-center">Activité interactive</h3>
      <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
        <p className="text-center mb-4">Complétez les phrases ci-dessous en glissant-déposant les termes appropriés:</p>
        <div className="bg-white p-6 rounded-md border border-gray-300">
          <div className="space-y-6">
            <div className="p-4 border border-dashed border-gray-300 rounded-md text-center bg-gray-50">
              <p>Question 1: Complétez le terme manquant...</p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="bg-blue-100 px-3 py-1 rounded-md border border-blue-200">Terme 1</div>
                <div className="bg-blue-100 px-3 py-1 rounded-md border border-blue-200">Terme 2</div>
                <div className="bg-blue-100 px-3 py-1 rounded-md border border-blue-200">Terme 3</div>
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-gray-300 rounded-md text-center bg-gray-50">
              <p>Question 2: Placez les éléments dans le bon ordre...</p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="bg-green-100 px-3 py-1 rounded-md border border-green-200">Élément A</div>
                <div className="bg-green-100 px-3 py-1 rounded-md border border-green-200">Élément B</div>
                <div className="bg-green-100 px-3 py-1 rounded-md border border-green-200">Élément C</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button>Vérifier mes réponses</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveContent;
