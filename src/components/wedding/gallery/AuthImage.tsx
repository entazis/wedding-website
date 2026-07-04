import { useEffect, useRef, useState } from 'react';
import { fetchAuthedObjectUrl } from './authStore';

interface AuthImageProps {
  /** Absolute URL of a Basic-Auth protected media file. */
  url: string;
  alt: string;
  className?: string;
  /** Skip lazy-loading and fetch immediately (used by the lightbox). */
  eager?: boolean;
  onLoad?: () => void;
}

/**
 * <img> that loads a protected file through an authenticated fetch (see
 * authStore). Lazy by default via IntersectionObserver, so a grid of ~1200
 * thumbnails only fetches what scrolls into view.
 */
const AuthImage = ({ url, alt, className, eager = false, onLoad }: AuthImageProps) => {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(eager);
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (eager || inView) return;
    const el = holderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, inView]);

  useEffect(() => {
    if (!inView) return;
    let alive = true;
    setFailed(false);
    fetchAuthedObjectUrl(url)
      .then((objectUrl) => {
        if (alive) setSrc(objectUrl);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [url, inView]);

  if (failed) {
    return (
      <div
        ref={holderRef}
        className={`flex items-center justify-center bg-muted text-xs text-muted-foreground ${className ?? ''}`}
      >
        ⚠
      </div>
    );
  }

  if (!src) {
    return <div ref={holderRef} className={`animate-pulse bg-muted ${className ?? ''}`} />;
  }

  return <img src={src} alt={alt} className={className} onLoad={onLoad} />;
};

export default AuthImage;
