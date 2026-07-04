import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchAuthedObjectUrl } from './authStore';
import { mediaUrl, type PhotoEntry } from './types';

interface PhotoLightboxProps {
  photos: PhotoEntry[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen photo viewer with keyboard + touch navigation.
 * Self-contained (no external lightbox dependency) so the build stays lean.
 */
const PhotoLightbox = ({ photos, index, onClose, onNavigate }: PhotoLightboxProps) => {
  const photo = photos[index];
  const [loaded, setLoaded] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % photos.length);
  }, [index, photos.length, onNavigate]);

  // Load the full image (with credentials) whenever the visible photo changes,
  // and warm the neighbours so left/right feels instant.
  useEffect(() => {
    setLoaded(false);
    setObjectUrl(null);
    let alive = true;
    fetchAuthedObjectUrl(mediaUrl(photo.full))
      .then((url) => {
        if (alive) setObjectUrl(url);
      })
      .catch(() => {
        /* leave spinner; a failed image is rare and non-fatal */
      });
    if (photos.length > 1) {
      const neighbours = [
        photos[(index + 1) % photos.length],
        photos[(index - 1 + photos.length) % photos.length],
      ];
      neighbours.forEach((n) => fetchAuthedObjectUrl(mediaUrl(n.full)).catch(() => {}));
    }
    return () => {
      alive = false;
    };
  }, [index, photo, photos]);

  // Keyboard navigation + lock background scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [goPrev, goNext, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? goPrev : goNext)();
    touchStartX.current = null;
  };

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Fénykép nagyítva"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25"
        aria-label="Bezárás"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 z-10 rounded-full bg-black/40 px-3 py-1 text-sm text-white/90">
        {index + 1} / {photos.length}
      </div>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 md:left-6 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25"
          aria-label="Előző"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative flex max-h-[92vh] max-w-[94vw] items-center justify-center px-2"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {!loaded && (
          <div className="absolute h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        )}
        {objectUrl && (
          <img
            src={objectUrl}
            alt={photo.caption ?? ''}
            onLoad={() => setLoaded(true)}
            className={`max-h-[92vh] max-w-[94vw] rounded-lg object-contain shadow-2xl transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {photo.caption && (
          <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/70 to-transparent p-4 text-center text-sm text-white">
            {photo.caption}
          </div>
        )}
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 md:right-6 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25"
          aria-label="Következő"
        >
          <ChevronRight size={36} />
        </button>
      )}
    </div>
  );
};

export default PhotoLightbox;
