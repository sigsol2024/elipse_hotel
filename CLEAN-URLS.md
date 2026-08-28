# Clean URLs — server setup

Public URLs use paths like `/rooms` and `/about` (no `.html`). HTML files stay on disk as `rooms.html`, etc.

## nginx (staging / production)

1. Open the nginx site config for your Ellipse vhost.
2. Paste rules from `nginx-clean-urls.conf` inside the `server { ... }` block.
3. Test and reload:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```
4. Verify:
   - `/rooms` → **200**
   - `/rooms.html` → **301** to `/rooms`
   - `/index.html` → **301** to `/`
   - CSS/JS load from `/css/…`, `/js/…`

Without nginx rules, clean links in the site will **404** even after deploy.

## Apache / LiteSpeed

Deploy the root `.htaccess` file; it handles the same redirects and rewrites.

## Repo (site files)

- Shared header/footer in `js/site-chrome.js` use clean paths.
- Page links use `/about`, `/rooms`, etc.; home is `/`.
- Asset URLs are root-absolute (`/css/…`, `/js/…`, `/assets/…`) so they work on any clean path.
- Each page has `rel="canonical"` pointing at `https://ellipsehotelslagos.com/…`.
