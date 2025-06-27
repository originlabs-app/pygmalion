
import React from 'react';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoContentProps {
  title: string;
  duration: string;
}

const VideoContent: React.FC<VideoContentProps> = ({ title, duration }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-50 rounded-lg border border-gray-200">
      <div className="p-6 text-center flex flex-col items-center justify-center h-full">
        <Video className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-xl font-medium mb-2">Vidéo de formation</p>
        <p className="text-muted-foreground mb-6">{title}</p>
        <div className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
          Durée estimée: {duration}
        </div>
        <Button variant="outline" size="lg" className="gap-2">
          <Video className="h-4 w-4" />
          Lancer la vidéo
        </Button>
      </div>
    </div>
  );
};

export default VideoContent;
