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
  /**
   * Video id: for YouTube the part after `watch?v=`; for Google Drive the
   * FILE_ID from the share link (`drive.google.com/file/d/FILE_ID/view`).
   */
  id: string;
  /** Hosting provider; omit for YouTube (the default). */
  provider?: 'youtube' | 'drive';
  /** Human title shown under the player. */
  title?: string;
  /**
   * Optional reveal date, `YYYY-MM-DD` (or any Date-parsable string). The video
   * stays out of the gallery until local midnight of that day. Omit to always
   * show.
   */
  visibleFrom?: string;
}

/**
 * Videos whose `visibleFrom` has arrived (or that have none). Dates without a
 * time component are read as *local* midnight, so a reveal set for the 1st
 * happens at 00:00 in the couple's timezone rather than 02:00 CEST via UTC.
 */
export const visibleVideos = (videos: VideoEntry[] = [], now: Date = new Date()): VideoEntry[] =>
  videos.filter(({ visibleFrom }) => {
    if (!visibleFrom) return true;
    const when = new Date(/^\d{4}-\d{2}-\d{2}$/.test(visibleFrom) ? `${visibleFrom}T00:00:00` : visibleFrom);
    return Number.isNaN(when.getTime()) || now >= when;
  });

export interface GalleryManifest {
  photos: PhotoEntry[];
  videos: VideoEntry[];
}

/** Resolve a manifest-relative media path to an absolute URL. */
export const mediaUrl = (path: string): string => `${MEDIA_BASE}/${path}`;
