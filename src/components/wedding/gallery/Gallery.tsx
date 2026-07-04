import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Loader2, Lock, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { clearCredentials, getAuthHeader, restoreCredentials, setCredentials } from './authStore';
import PhotoGrid from './PhotoGrid';
import VideoGallery from './VideoGallery';
import { MANIFEST_URL, UNLOCK_FLAG, type GalleryManifest } from './types';

type Status = 'locked' | 'checking' | 'unlocked' | 'error';

/**
 * Fetch the (Basic-Auth protected) manifest using whatever credential is
 * currently held by authStore. A 200 proves the password; the same credential
 * then loads every thumbnail/photo via authenticated fetches.
 */
async function fetchManifest(): Promise<GalleryManifest | null> {
  const headers: HeadersInit = {};
  const header = getAuthHeader();
  if (header) headers.Authorization = header;
  const res = await fetch(MANIFEST_URL, { headers, cache: 'no-store' });
  if (!res.ok) return null;
  return (await res.json()) as GalleryManifest;
}

const Gallery = () => {
  const [status, setStatus] = useState<Status>('locked');
  const [password, setPassword] = useState('');
  const [manifest, setManifest] = useState<GalleryManifest | null>(null);
  const attemptedSilent = useRef(false);

  // On mount, if this session already unlocked, try a silent re-fetch using the
  // browser's cached credentials so returning guests skip the prompt.
  useEffect(() => {
    if (attemptedSilent.current) return;
    attemptedSilent.current = true;
    if (sessionStorage.getItem(UNLOCK_FLAG) !== '1' || !restoreCredentials()) return;
    setStatus('checking');
    fetchManifest()
      .then((data) => {
        if (data) {
          setManifest(data);
          setStatus('unlocked');
        } else {
          clearCredentials();
          sessionStorage.removeItem(UNLOCK_FLAG);
          setStatus('locked');
        }
      })
      .catch(() => {
        clearCredentials();
        sessionStorage.removeItem(UNLOCK_FLAG);
        setStatus('locked');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setStatus('checking');
    setCredentials(password.trim());
    try {
      const data = await fetchManifest();
      if (data) {
        setManifest(data);
        sessionStorage.setItem(UNLOCK_FLAG, '1');
        setStatus('unlocked');
      } else {
        clearCredentials();
        setStatus('error');
      }
    } catch {
      clearCredentials();
      setStatus('error');
    }
  };

  // --- Unlocked: show the gallery ------------------------------------------
  if (status === 'unlocked' && manifest) {
    return (
      <div className="space-y-16">
        {manifest.videos?.length > 0 && (
          <div>
            <h3 className="mb-8 flex items-center justify-center gap-3 text-display-md text-primary">
              <Video size={28} /> Videók
            </h3>
            <VideoGallery videos={manifest.videos} />
          </div>
        )}

        {manifest.photos?.length > 0 && (
          <div>
            <h3 className="mb-8 flex items-center justify-center gap-3 text-display-md text-primary">
              <Camera size={28} /> Fényképek
            </h3>
            <PhotoGrid photos={manifest.photos} />
          </div>
        )}

        {!manifest.videos?.length && !manifest.photos?.length && (
          <p className="text-center text-primary-foreground text-lg font-script">
            A galéria hamarosan megtelik emlékekkel. 💕
          </p>
        )}
      </div>
    );
  }

  // --- Locked / checking / error: passphrase gate --------------------------
  return (
    <div className="mx-auto max-w-md">
      <div className="wedding-card-enhanced rounded-2xl bg-background/95 p-8 text-center backdrop-blur-md md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Lock className="text-primary" size={30} />
        </div>
        <h3 className="text-display-md text-primary">Privát galéria</h3>
        <p className="mx-auto mt-3 mb-8 max-w-sm text-body-elegant text-muted-foreground">
          Fényképeink és videóink jelszóval védettek. Add meg a meghívón (vagy a
          köszönőkártyán) szereplő jelszót a megtekintéshez.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === 'error') setStatus('locked');
            }}
            placeholder="Jelszó"
            autoComplete="current-password"
            className="text-center text-foreground"
            disabled={status === 'checking'}
            aria-label="Galéria jelszó"
          />

          {status === 'error' && (
            <p className="text-sm text-destructive">
              Helytelen jelszó. Kérjük, próbáld újra.
            </p>
          )}

          <Button
            type="submit"
            className="wedding-button w-full"
            disabled={status === 'checking' || !password.trim()}
          >
            {status === 'checking' ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={18} /> Ellenőrzés…
              </>
            ) : (
              'Megnyitás'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Gallery;
