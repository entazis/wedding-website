// Holds the guest's Basic-Auth credential after they pass the passphrase gate,
// and fetches protected media WITH that credential attached.
//
// Why not just use <img src="/media/gallery/..">? Those files are protected by
// nginx Basic Auth. A bare <img> to a protected URL would make the browser pop
// its native auth dialog. Instead we fetch each file with an explicit
// Authorization header and hand the <img> a blob: URL — so the themed gate is
// the ONLY password prompt a guest ever sees.

import { AUTH_USER } from './types';

const AUTH_KEY = 'gallery-auth';

let authHeader: string | null = null;

/** Build + remember the Basic header for this guest (kept for the session). */
export function setCredentials(password: string): string {
  authHeader = `Basic ${btoa(`${AUTH_USER}:${password}`)}`;
  try {
    sessionStorage.setItem(AUTH_KEY, authHeader);
  } catch {
    /* private-mode / storage disabled — in-memory still works this session */
  }
  return authHeader;
}

/** Restore a credential saved earlier this session (survives page reloads). */
export function restoreCredentials(): string | null {
  if (authHeader) return authHeader;
  try {
    authHeader = sessionStorage.getItem(AUTH_KEY);
  } catch {
    authHeader = null;
  }
  return authHeader;
}

export function clearCredentials(): void {
  authHeader = null;
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignore */
  }
}

export function getAuthHeader(): string | null {
  return authHeader;
}

// Cache resolved blob URLs so reopening the lightbox / re-scrolling is instant.
const objectUrlCache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

/** Fetch a protected media URL with credentials and return a blob: URL. */
export function fetchAuthedObjectUrl(url: string): Promise<string> {
  const cached = objectUrlCache.get(url);
  if (cached) return Promise.resolve(cached);

  const pending = inflight.get(url);
  if (pending) return pending;

  const promise = (async () => {
    const headers: HeadersInit = {};
    const header = authHeader ?? restoreCredentials();
    if (header) headers.Authorization = header;

    const res = await fetch(url, { headers });
    if (!res.ok) {
      inflight.delete(url);
      throw new Error(`Media request failed: ${res.status}`);
    }
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    objectUrlCache.set(url, objectUrl);
    inflight.delete(url);
    return objectUrl;
  })();

  inflight.set(url, promise);
  return promise;
}
