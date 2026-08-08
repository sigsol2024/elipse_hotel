# Staging / subdomain deploy (cPanel + nginx)

## Symptom

- `https://staging…/` shows **Index of /** with only `cgi-bin/`
- `https://staging…/index.html` shows the real site

## Cause

This host uses **nginx in front of Apache**.

- Requests for real files like `/index.html` are served by nginx from  
  `/home/sigsol/staging.ellipsehotelslagos.com`
- The bare `/` request is handed to Apache, whose document root for this
  subdomain is a **different folder** that only contains `cgi-bin/`

`.htaccess` does not fix `/` here, because nginx handles (or mis-routes) `/`
before Apache would apply DirectoryIndex in the git folder.

## Fix (cPanel)

1. **cPanel → Domains** (or Subdomains)
2. Find `staging.ellipsehotelslagos.com`
3. Set **Document Root** to exactly:  
   `/home/sigsol/staging.ellipsehotelslagos.com`  
   (the folder where `git pull` and `index.html` live — not a nested or old path)
4. Save, then wait a minute for nginx/Apache config rebuild  
   (or use “Rebuild Configuration” / restart web services if your host provides it)

## Temporary workaround

Until the document root is fixed, open or redirect to:

`https://staging.ellipsehotelslagos.com/index.html`

In cPanel you can also add a **Redirect** from `/` → `/index.html`.

## Verify on the server

```bash
curl -s https://staging.ellipsehotelslagos.com/index.html | head -5   # should be Ellipse HTML
curl -s https://staging.ellipsehotelslagos.com/ | head -5             # should NOT be "Index of /"
```
