// Shared types + config for the post-wedding gallery.
//
// Media (optimized photos, thumbnails and the manifest itself) is served by
// nginx from `/media/gallery/`, which is protected by HTTP Basic Auth. The
// front-end never hardcodes the password — the passphrase the guest types is
// sent to nginx, and nginx is the single source of truth for access.

/** Base URL (served by nginx, Basic-Auth protected) for all gallery media. */
export const MEDIA_BASE = '/media/gallery';

/** URL of the manifest that lists every photo + video. */
export const MANIFEST_URL = `${MEDIA_BASE}/manifest.json`;

/** Basic Auth username shared by all guests (only the password varies). */
export const AUTH_USER = 'vendeg';

/** sessionStorage key so a guest isn't re-prompted on every navigation. */
export const UNLOCK_FLAG = 'gallery-unlocked';

export interface PhotoEntry {
  /** Stable id, used as React key (usually the original filename stem). */
  id: string;
  /** Thumbnail path, relative to MEDIA_BASE (e.g. "thumbs/IMG_0001.webp"). */
  thumb: string;
  /** Full web-sized image path, relative to MEDIA_BASE. */
  full: string;
  /** Intrinsic width/height of the full image, for correct lightbox sizing. */
  w?: number;
  h?: number;
  /** Optional caption shown in the lightbox. */
  caption?: string;
}

export interface VideoEntry {
  /** YouTube video id (the part after `watch?v=`). */
  id: string;
  /** Human title shown under the player. */
  title?: string;
}

export interface GalleryManifest {
  photos: PhotoEntry[];
  videos: VideoEntry[];
}

/** Resolve a manifest-relative media path to an absolute URL. */
export const mediaUrl = (path: string): string => `${MEDIA_BASE}/${path}`;
