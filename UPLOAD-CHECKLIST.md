# Hostinger upload checklist - subrata.tech

After every change to this repo, upload **everything in this list** to
`~/domains/subrata.tech/public_html/` on Hostinger.

## Root files (must be at the top level)
- [ ] `index.html`
- [ ] `style.css`
- [ ] `script.js`
- [ ] `animations.js`
- [ ] `pipeline-config.js`
- [ ] `.htaccess`
- [ ] `404.html`

## Folders (upload the whole folder, preserve structure)
- [ ] `images/`  - all subfolders (`logo/`, `certificates/`, `favicon_io/`)
- [ ] `projects/`
- [ ] `pdf/`

## Quick verification (run in Hostinger terminal)
```bash
cd ~/domains/subrata.tech/public_html
ls -la index.html style.css script.js animations.js pipeline-config.js .htaccess 404.html
ls -la images/ projects/ pdf/
```

## Quick verification (run locally, powershell)
```powershell
cd D:\Projects\Web Development\Fornend\sdotbhowmik.github.io
.\upload-checklist.ps1
```

## After upload, hard-refresh the browser
- Chrome / Edge: Ctrl + Shift + R
- Firefox: Ctrl + F5
- Or open an Incognito window

## Common breakage causes
| Symptom | Cause |
|---|---|
| Page text but no styling | `style.css` missing or 403'd |
| Carousel/pipeline empty | `script.js` / `animations.js` / `pipeline-config.js` missing |
| Broken image icons | `images/` folder not uploaded, or wrong path |
| Layout shifted | Browser cache; hard-refresh |
| "blocked by CSP" in console | `.htaccess` not uploaded, or old version cached |
| 404 on /blog/* | The PHP blog was deleted by design; ignore |
