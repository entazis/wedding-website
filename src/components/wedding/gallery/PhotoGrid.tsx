import { useEffect, useRef, useState } from 'react';
import AuthImage from './AuthImage';
import PhotoLightbox from './PhotoLightbox';
import { mediaUrl, type PhotoEntry } from './types';

interface PhotoGridProps {
  photos: PhotoEntry[];
}

/** How many thumbnails to reveal per batch (keeps the DOM light for ~1200). */
const BATCH = 48;

/**
 * Responsive thumbnail grid with incremental reveal via IntersectionObserver,
 * plus a shared lightbox. Only `visibleCount` thumbnails are mounted at once;
 * scrolling near the bottom reveals the next batch.
 */
const PhotoGrid = ({ photos }: PhotoGridProps) => {
  const [visibleCount, setVisibleCount] = useState(Math.min(BATCH, photos.length));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + BATCH, photos.length));
        }
      },
      { rootMargin: '600px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [photos.length]);

  const visible = photos.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {visible.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Fénykép megnyitása ${i + 1}`}
          >
            <AuthImage
              url={mediaUrl(photo.thumb)}
              alt={photo.caption ?? ''}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
          </button>
        ))}
      </div>

      {visibleCount < photos.length && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
};

export default PhotoGrid;
