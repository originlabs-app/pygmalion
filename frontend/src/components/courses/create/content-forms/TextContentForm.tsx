
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextContentFormProps {
  textContent: string;
  setTextContent: (value: string) => void;
}

const TextContentForm: React.FC<TextContentFormProps> = ({
  textContent,
  setTextContent
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="textContent">Contenu textuel*</Label>
      <Textarea
        id="textContent"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="Saisissez votre contenu textuel..."
        rows={8}
        required
      />
      <p className="text-xs text-muted-foreground">
        Vous pouvez utiliser du HTML simple pour formatter votre texte.
      </p>
    </div>
  );
};

export default TextContentForm;
