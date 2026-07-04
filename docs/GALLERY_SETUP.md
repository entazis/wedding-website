# Post-wedding gallery — setup guide

The RSVP form is gone; the site now has a **password-protected gallery** of
photos (self-hosted) and videos (unlisted YouTube embeds).

How it fits together:

- **Photos** live as optimized WebP files under `media/gallery/` and are served
  by **nginx** at `/media/gallery/…`, protected by **HTTP Basic Auth**.
- **Videos** are unlisted **YouTube** videos — only their ids live in the
  manifest; YouTube does the storage, transcoding and streaming (free).
- A `manifest.json` (also protected) lists every photo + video. The front-end
  fetches it after the guest types the password, then loads each image with the
  same credential — so guests see **one** themed password screen and never a
  browser popup.

Everything is driven by `media/gallery/manifest.json`, so you can add media
without touching the code.

---

## 1. Configure nginx (one time)

### a) Create the password file

Pick ONE shared password for all guests (put it on your thank-you card). The
username **must** be `vendeg` (the app uses it):

```sh
sudo htpasswd -c /etc/nginx/.htpasswd-barbiesbence vendeg
# type the shared guest password when prompted
```

### b) Add the protected media location

Edit `/etc/nginx/sites-available/barbiesbence.conf` and add this **inside the
`server { … }` block that listens on 443** (next to the existing `location /`):

```nginx
    # Password-protected wedding gallery media
    location /media/gallery/ {
        root /var/www/wedding-website;          # serves /var/www/wedding-website/media/gallery/…

        auth_basic           "Privát galéria (Barbi & Bence)";
        auth_basic_user_file /etc/nginx/.htpasswd-barbiesbence;

        # optimized photos are immutable — let browsers cache them (privately)
        add_header Cache-Control "private, max-age=2592000" always;

        # the manifest changes when you add media — never cache it
        location = /media/gallery/manifest.json {
            add_header Cache-Control "no-store" always;
        }
    }
```

### c) Test and reload

```sh
sudo nginx -t && sudo systemctl reload nginx
```

That's it for the server. You can verify: visiting
`https://barbiesbence.hu/media/gallery/manifest.json` should now ask for a
password.

---

## 2. Add the photos

1. **Download the album from Google Photos** — open the album → **Download all**
   (or use Google Takeout). You get the full-resolution originals in a zip.
2. **Unzip the originals into** `media/originals/` on the server
   (`/var/www/wedding-website/media/originals/`). Only these are read; they are
   never served, so keep or delete them afterwards as you like.
3. **Optimize** (resizes to web + thumbnails and rewrites the manifest):

   ```sh
   cd /var/www/wedding-website
   npm i -D sharp            # one time
   node scripts/optimize-photos.mjs
   ```

   ~1200 photos come out to roughly 1–2 GB total. Re-run any time you add more.

## 3. Add the videos

1. Upload each film to **YouTube** and set visibility to **Unlisted**.
2. Copy the video id from the URL (`youtube.com/watch?v=XXXXXXXXXXX` → `XXXXXXXXXXX`).
3. Edit `media/gallery/manifest.json` and fill in the `videos` array:

   ```json
   {
     "photos": [ … generated, don't touch … ],
     "videos": [
       { "id": "XXXXXXXXXXX", "title": "Ceremónia" },
       { "id": "YYYYYYYYYYY", "title": "Első tánc" }
     ]
   }
   ```

   (Running the optimize script again preserves whatever videos you added here.)

---

## 4. Rebuild & deploy the site

The gallery UI change ships in the built app:

```sh
cd /var/www/wedding-website
npm run build      # outputs to dist/, which nginx already serves
```

No nginx reload needed for content changes — photos/videos and the manifest are
read live, so after the initial setup you only re-run the optimize script or
edit `manifest.json` to add media.

---

## Security notes

- The photo files themselves refuse to load without the password (nginx returns
  `401`), so search engines and random visitors can't reach them, and the
  images can't be hotlinked.
- The password is checked **server-side** by nginx — it is not embedded in the
  website's code.
- It's a single shared password (fine for a wedding). To change it, re-run the
  `htpasswd` command (without `-c`) and tell your guests the new one.
- Videos are **unlisted**, not private: anyone with the exact YouTube link could
  view them, but they're not searchable and are only linked from the gated
  gallery.
