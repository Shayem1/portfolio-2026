# portfolio-2026

Shayem Quazi — public engineering portfolio. Local-first automation, agent infrastructure, client systems, and measured media toolkits.
Static site: plain HTML/CSS, **no build step**. Live at https://shayem1.github.io/portfolio-2026/

## Portfolio items

| ID | Item | Detail page |
|---|---|---|
| PF1 | Scanner-for-IBMA (live, CI-verified) | `projects/scanner-for-ibma.html` |
| PF2 | Strata agent stack (local LLM serving + CPU media toolkits) | `projects/strata-agent-stack.html` |
| PF3 | IBMA Assessment (production client app) | `projects/ibma-assessment.html` |
| PF4 | Panoviewer (public repo, tagged alpha) | `projects/panoviewer.html` |
| PF5 | SkyWorks Domain (client site; private repo) | inventory only |
| PF6 | LM-PDF Editor (retired 2026, documented) | `projects/lm-pdf-editor.html` |
| PF7 | Network & system diagnostics fieldwork | `projects/diagnostics.html` |
| PF8 | IDS & ethics policies (governance documents) | `policies.html` |
| PF9 / PF11 | *(retired items, numbers not reused)* | — |
| PF10 | Translator API (superseded by PF2 audio toolkits) | inventory only |
| PF11 | extraction pipeline (file routing tool) | inventory only |
| PF12 | Discord bot (agent surface) | inventory only |
| PF13 | This portfolio site | live |

Items can be added freely; numbering is stable once assigned.

## Structure

```
index.html                 landing: thesis + bench strip + selected projects
projects/                  inventory + one page per project
policies.html              both governance policies in full
about.html                 skills & experience (self-assessed, artifact-linked)
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
(`main` is the working branch; `gh-pages` mirrors it for Pages.)

## Deploy — Cloudflare Pages (alternative)

Connect this repository → framework preset **None**, build command empty, output directory `/`.

## Evidence policy (external-organisation boundary)

- Public evidence is linked directly (e.g. the Panoviewer repo).
- Systems built **for external organisations** (Scanner-for-IBMA, IBMA Assessment, SkyWorks Domain): internal code and databases are **not shared**. The site publishes the public-facing data flow, the policies (own authorship), commit/CI artifacts and measured results. Live-system access, where the client permits it, is arranged through the client.
- No real student/contact records appear anywhere on this site; pipeline demos use fixture codes only (`A101/A202/A303`).

## Editing

Edit HTML directly; the design system lives in `assets/css/site.css` (tokens at the top). Status chips: `live` / `alpha` / `retired`. Bench chips are for **measured numbers only**.

MIT licence, see `LICENSE`.
