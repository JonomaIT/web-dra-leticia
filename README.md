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

## Change the site

Edit `site/`, open a pull request (the app contract is checked), merge: the deploy runs by itself.

## Migrated from

`JoshuelNobre/front-dra-leticia` (AWS account `550094086634`, Route 53), November 2026.
