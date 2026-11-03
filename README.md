# web-dra-leticia

Site of Dra. Letícia Penin's dental clinic: [draleticiapenin.com.br](https://draleticiapenin.com.br). A static site (HTML, CSS, JS, images and a video) without a build, on the JonomaIT platform: `runtime = "cloudfront"`.

## How it is published

| | |
|---|---|
| Files | `site/`, exactly as they are served |
| Infrastructure | the platform's CloudFront runner: a private S3 bucket (and a copy in `sa-east-1`, read when the primary fails), CloudFront on every edge location, a certificate of its own for `draleticiapenin.com.br` (a customer domain allowed by the platform, `site-zones`) |
| DNS | Cloudflare, zone `draleticiapenin.com.br`, proxied |
| Deploy | every merge to `main` (`deploy-app` of [`pipelines`](https://github.com/JonomaIT/pipelines)); by hand, *Actions → CI → Run workflow* |

Cache: HTML, CSS, JS, JSON, XML and text are always revalidated; images, video and fonts are cached for 7 days. Every deploy invalidates the whole distribution.

The site does not depend on the lab: the platform parameters it needs (`global/platform`) and the zone settings (`global/cloudflare-zone`) are persistent.

## Design system

A small design system of its own, no framework and nothing from third parties at runtime:

| File | What |
|---|---|
| `site/css/tokens.css` | the brand: colors (palette and semantic names), type scale, spacing, radii, shadows, motion, the local fonts |
| `site/css/base.css` | reset, typography, focus, layout helpers, the scroll reveal (content stays visible without JS) |
| `site/css/components.css` | button, section header, trust badges, rating, media frame, service card, testimonial, carousel, contact list, map, header and menu, footer, WhatsApp button |
| `site/css/sections.css` | page composition only (backgrounds, order) |
| `docs/styleguide.html` | every token and component on one page: open it from the repo (not published) |

Sections use semantic tokens only (`--brand`, `--accent`, `--surface`...): changing the brand is changing `tokens.css`.

`design/` keeps what is not published: the original photos and video (the site serves smaller WebP and a 720 px video) and the icon font project (`design/icomoon/selection.json`, open it in icomoon.io to add icons).

## Change the site

Edit `site/`, open a pull request (the app contract is checked), merge: the deploy runs by itself.

## Migrated from

`JoshuelNobre/front-dra-leticia` (AWS account `550094086634`, Route 53), November 2026.
