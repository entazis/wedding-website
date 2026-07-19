import { Play } from 'lucide-react';
import { useState } from 'react';
import type { VideoEntry } from './types';

interface VideoGalleryProps {
  videos: VideoEntry[];
}

/**
 * YouTube (unlisted) videos rendered as lightweight click-to-play facades:
 * we show the poster thumbnail first and only inject the iframe on click, so
 * a page with several films doesn't load several players up front. Uses the
 * privacy-enhanced `youtube-nocookie.com` domain.
 */
const VideoGallery = ({ videos }: VideoGalleryProps) => {
  const [playing, setPlaying] = useState<Set<string>>(new Set());

  const play = (id: string) => setPlaying((prev) => new Set(prev).add(id));

  if (!videos.length) return null;

  // A lone video reads best centered and wide; two or more tile in a grid.
  const single = videos.length === 1;

  return (
    <div className={single ? 'mx-auto w-full max-w-4xl' : 'grid gap-6 md:grid-cols-2'}>
      {videos.map((video) => (
        <div key={video.id} className="floating-element">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-elegant">
            {playing.has(video.id) ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title ?? 'Esküvői videó'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => play(video.id)}
                className="group absolute inset-0 h-full w-full"
                aria-label={`Videó lejátszása: ${video.title ?? ''}`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title ?? 'Esküvői videó'}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                    <Play size={30} className="ml-1" fill="currentColor" />
                  </div>
                </div>
              </button>
            )}
          </div>
          {video.title && (
            <p className="mt-3 text-center font-body font-medium text-foreground">{video.title}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
