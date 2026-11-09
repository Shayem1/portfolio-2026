# portfolio-2026

Shayem Quazi — project portfolio for UTS 43030 Professional Practices (Assessment 3) and beyond.
Static site: plain HTML/CSS, **no build step**. Designed for GitHub Pages or Cloudflare Pages from the repo root.

## Structure

```
index.html                 landing: thesis + bench strip + project cards
projects/                  one page per project (scanner, strata stack, ibma, panoviewer, lm-pdf-editor, diagnostics)
goals.html                 Assessment 1 plan line -> what was done -> proof  (the 15-pt linkage artifact)
policies.html              both IDS/ethics policies in full (extracted from client-repo docs; own authorship — publishable)
about.html                 SFIA ratings before/after the builds
assets/css/site.css        design system ("engineered ledger paper")
assets/media/              proof images + demo slots (see media/README.md)
```

## Preview locally

```bat
python -m http.server 8000
:: open http://localhost:8000
```

## Deploy — GitHub Pages (ACTIVE)

Live at **https://shayem1.github.io/portfolio-2026/** (Pages source: `gh-pages` branch, root path).

Workflow for updates:
```bat
git push origin main
git branch -f gh-pages main
git push -f origin gh-pages
```
(`main` is the working branch; `gh-pages` mirrors it for Pages. If you switch Pages to deploy-from-branch `main` in Settings, the mirror step is no longer needed.)

## Deploy — Cloudflare Pages

1. Create Pages project → connect this repository.
2. Framework preset: **None**; build command: *(empty)*; output directory: `/`.
3. Deploy. (Same wrangler/Pages flow already used for the SNS-TAX and Panoviewer projects.)

## Evidence policy (external-organisation boundary)

- Public evidence is linked directly (e.g. the Panoviewer repo).
- Systems built **for external organisations** (Scanner-for-IBMA, IBMA Assessment, SkyWorks Domain): internal code and databases are **not shared, even on request** — the portfolio instead publishes the public-facing **data flow, the policies (own authorship, see `policies.html`), commit/CI artifacts and measured results**. Live-system access, where the client permits it, is arranged through the client.
- No real student/contact records appear anywhere on this site; pipeline demos use fixture codes only (`A101/A202/A303`).

## Editing

Edit HTML directly; the design system lives in `assets/css/site.css` (tokens at the top). Status chips: `live` / `alpha` / `retired`. Bench chips are for **measured numbers only**.

MIT licence (to be added when publishing).
