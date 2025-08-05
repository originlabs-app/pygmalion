
import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { Video, Play, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadService } from '@/services/uploadService';
import { toast } from 'sonner';

interface VideoContentProps {
  title: string;
  duration: string;
  videoUrl?: string; // URL locale (Supabase)
  externalUrl?: string; // URL externe (YouTube/Vimeo)
  storagePath?: string; // Chemin pour URL signée
}

const VideoContent: React.FC<VideoContentProps> = ({ 
  title, 
  duration, 
  videoUrl, 
  externalUrl, 
  storagePath 
}) => {
  const [loading, setLoading] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);

  // Récupérer l'URL signée pour les vidéos locales
  useEffect(() => {
    const getSignedUrl = async () => {
      if (storagePath && !externalUrl) {
        setLoading(true);
        try {
          const url = await uploadService.getSignedUrl(storagePath);
          setSignedUrl(url);
        } catch (error: any) {
          logger.error('Erreur URL signée:', error);
          setVideoError(true);
          toast.error('Impossible de charger la vidéo');
        } finally {
          setLoading(false);
        }
      }
    };

    getSignedUrl();
  }, [storagePath, externalUrl]);

  const handleExternalVideoClick = () => {
    if (externalUrl) {
      window.open(externalUrl, '_blank');
    }
  };

  const isYouTube = externalUrl?.includes('youtube.com') || externalUrl?.includes('youtu.be');
  const isVimeo = externalUrl?.includes('vimeo.com');

  // Extraire l'ID YouTube pour l'embed
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Extraire l'ID Vimeo pour l'embed
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };
  // Rendu pour vidéo YouTube intégrée
  if (isYouTube && externalUrl) {
    const youtubeId = getYouTubeId(externalUrl);
    if (youtubeId) {
      return (
        <div className="aspect-video mb-6 bg-black rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      );
    }
  }

  // Rendu pour vidéo Vimeo intégrée
  if (isVimeo && externalUrl) {
    const vimeoId = getVimeoId(externalUrl);
    if (vimeoId) {
      return (
        <div className="aspect-video mb-6 bg-black rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      );
    }
  }

  // Rendu pour vidéo locale (Supabase)
  if (signedUrl && !videoError) {
    return (
      <div className="aspect-video mb-6 bg-black rounded-lg overflow-hidden">
        <video
          width="100%"
          height="100%"
          controls
          className="w-full h-full"
          onError={() => {
            setVideoError(true);
            toast.error('Erreur de lecture vidéo');
          }}
        >
          <source src={signedUrl} type="video/mp4" />
          <source src={signedUrl} type="video/webm" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
    );
  }

  // Rendu par défaut/erreur
  return (
    <div className="aspect-video mb-6 bg-gray-50 rounded-lg border border-gray-200">
      <div className="p-6 text-center flex flex-col items-center justify-center h-full">
        {loading ? (
          <>
            <Loader2 className="h-16 w-16 text-blue-500 mb-4 animate-spin" />
            <p className="text-xl font-medium mb-2">Chargement de la vidéo...</p>
          </>
        ) : videoError ? (
          <>
            <Video className="h-16 w-16 text-red-400 mb-4" />
            <p className="text-xl font-medium mb-2 text-red-600">Erreur de chargement</p>
            <p className="text-muted-foreground mb-6">Impossible de charger la vidéo</p>
          </>
        ) : (
          <>
            <Video className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl font-medium mb-2">Vidéo de formation</p>
            <p className="text-muted-foreground mb-2">{title}</p>
            <div className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
              Durée estimée: {duration}
            </div>
            
            {externalUrl ? (
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={handleExternalVideoClick}
              >
                <ExternalLink className="h-4 w-4" />
                Ouvrir la vidéo externe
              </Button>
            ) : (
              <p className="text-sm text-amber-600">
                Vidéo non disponible
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoContent;
