
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Video, File, HelpCircle } from 'lucide-react';

interface ContentTypeSelectorProps {
  contentType: 'text' | 'video' | 'pdf' | 'quiz';
  setContentType: (contentType: 'text' | 'video' | 'pdf' | 'quiz') => void;
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  contentType,
  setContentType
}) => {
  return (
    <Select 
      value={contentType} 
      onValueChange={(value) => setContentType(value as 'text' | 'video' | 'pdf' | 'quiz')}
    >
      <SelectTrigger id="contentType">
        <SelectValue placeholder="Sélectionner un type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="text" className="flex items-center">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-blue-500" />
            Texte
          </div>
        </SelectItem>
        <SelectItem value="video">
          <div className="flex items-center">
            <Video className="h-4 w-4 mr-2 text-red-500" />
            Vidéo
          </div>
        </SelectItem>
        <SelectItem value="pdf">
          <div className="flex items-center">
            <File className="h-4 w-4 mr-2 text-amber-500" />
            PDF
          </div>
        </SelectItem>
        <SelectItem value="quiz">
          <div className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2 text-green-500" />
            Quiz
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ContentTypeSelector;
