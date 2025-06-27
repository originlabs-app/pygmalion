
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface VideoContentFormProps {
  videoUrl: string;
  setVideoUrl: (value: string) => void;
  videoDuration: string;
  setVideoDuration: (value: string) => void;
}

const VideoContentForm: React.FC<VideoContentFormProps> = ({
  videoUrl,
  setVideoUrl,
  videoDuration,
  setVideoDuration
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="videoUrl">URL de la vidéo*</Label>
        <Input
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          required
        />
        <p className="text-xs text-muted-foreground">
          Copiez l'URL d'une vidéo YouTube, Vimeo, ou autre plateforme de streaming.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoDuration">Durée de la vidéo</Label>
        <Input
          id="videoDuration"
          value={videoDuration}
          onChange={(e) => setVideoDuration(e.target.value)}
          placeholder="Ex: 10:30"
        />
      </div>
    </div>
  );
};

export default VideoContentForm;
