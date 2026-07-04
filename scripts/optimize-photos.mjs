#!/usr/bin/env node
/**
 * optimize-photos.mjs — turn full-resolution wedding photos into web-ready
 * assets for the password-protected gallery.
 *
 * For each image in the SOURCE dir it produces:
 *   - a large web version  -> OUT/web/<name>.webp   (max 2560px long edge)
 *   - a small thumbnail    -> OUT/thumbs/<name>.webp (max 500px long edge)
 * and (re)writes OUT/manifest.json listing every photo. Any `videos` already
 * present in an existing manifest.json are preserved, so you can add YouTube
 * ids by hand and re-run this without losing them.
 *
 * Usage:
 *   npm i -D sharp          # one time
 *   node scripts/optimize-photos.mjs [sourceDir] [outDir]
 *
 * Defaults: sourceDir = media/originals , outDir = media/gallery
 *
 * The originals are never served — only OUT is exposed by nginx. Keep the
 * originals as your backup (or delete them once you've verified the output).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('\n✗ The "sharp" package is not installed. Run:  npm i -D sharp\n');
  process.exit(1);
}

const SRC = resolve(process.argv[2] ?? 'media/originals');
const OUT = resolve(process.argv[3] ?? 'media/gallery');

const WEB_MAX = 2560;
const WEB_QUALITY = 82;
const THUMB_MAX = 500;
const THUMB_QUALITY = 72;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif']);

if (!existsSync(SRC)) {
  console.error(`✗ Source folder not found: ${SRC}`);
  process.exit(1);
}

const webDir = join(OUT, 'web');
const thumbDir = join(OUT, 'thumbs');
mkdirSync(webDir, { recursive: true });
mkdirSync(thumbDir, { recursive: true });

// Preserve any manually-added videos from a previous manifest.
const manifestPath = join(OUT, 'manifest.json');
let videos = [];
if (existsSync(manifestPath)) {
  try {
    videos = JSON.parse(readFileSync(manifestPath, 'utf8')).videos ?? [];
  } catch {
    /* ignore a corrupt/old manifest */
  }
}

const files = readdirSync(SRC)
  .filter((f) => EXTS.has(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (files.length === 0) {
  console.error(`✗ No images found in ${SRC}`);
  process.exit(1);
}

console.log(`Processing ${files.length} photo(s)\n  from: ${SRC}\n  to:   ${OUT}\n`);

const photos = [];
let done = 0;

for (const file of files) {
  const id = basename(file, extname(file));
  const srcPath = join(SRC, file);
  try {
    const pipeline = sharp(srcPath).rotate(); // honour EXIF orientation

    const webInfo = await pipeline
      .clone()
      .resize({ width: WEB_MAX, height: WEB_MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEB_QUALITY })
      .toFile(join(webDir, `${id}.webp`));

    await pipeline
      .clone()
      .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(join(thumbDir, `${id}.webp`));

    photos.push({
      id,
      thumb: `thumbs/${id}.webp`,
      full: `web/${id}.webp`,
      w: webInfo.width,
      h: webInfo.height,
    });

    done += 1;
    if (done % 25 === 0 || done === files.length) {
      console.log(`  ${done}/${files.length}`);
    }
  } catch (err) {
    console.warn(`  ! skipped ${file}: ${err.message}`);
  }
}

writeFileSync(manifestPath, JSON.stringify({ photos, videos }, null, 2));

console.log(
  `\n✓ Done. ${photos.length} photos, ${videos.length} videos.\n` +
    `  Manifest: ${manifestPath}\n` +
    (videos.length === 0
      ? '  Tip: add YouTube videos by editing the "videos" array in manifest.json,\n' +
        '       e.g. { "id": "dQw4w9WgXcQ", "title": "Ceremónia" }\n'
      : ''),
);
