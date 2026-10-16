# Ozan Özen · Portfolio

Personal site for Ozan Özen (English Language Educator, AI Model Trainer, Tech Journalist), live at
<https://kneezen.github.io>.

Built with Next.js 16 (static export), React 19 and Tailwind CSS 4, deployed to GitHub Pages from
the `gh-pages` branch.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit content

Every word on the site lives in **`app/data/profile.ts`**: roles, experience, education, projects,
certifications, CV rows and contact details. Change it there and the pages, home-page previews,
the ⌘K search and the AI companion all update together.

### Adding or replacing images

1. Drop the file into `public/`.
2. Reference it from `app/data/profile.ts` as `/your-file.png`.
3. Run `npm run optimize-media` (needs Python with Pillow: `pip install pillow`). This writes
   small WebP copies to `public/img/` that the site serves; the original is kept for the
   full-size lightbox.

### Background videos

Pages use the web-sized loops in `public/media/` (`<name>.mp4` + `<name>-poster.webp`).
To swap one, encode the new clip at about 1280px wide with no audio, e.g.

```bash
ffmpeg -i input.mp4 -an -t 14 -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 30 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/media/about.mp4
ffmpeg -ss 1 -i input.mp4 -frames:v 1 -vf scale=1280:-2 public/media/about-poster.webp
```

## Deploy

```bash
npm run deploy     # builds to out/ and pushes it to the gh-pages branch
```

## AI companion

The chat bubble answers from the site's own data with no API key. To connect a real model, see
[`companion-worker/README.md`](companion-worker/README.md). Never put an API key in the site code:
anything in the browser bundle is public.

## Handy shortcuts on the site

- `⌘K` / `Ctrl K` or `/`: search everything and jump anywhere
- Click any image to inspect it, click again to zoom, `←` `→` to browse, `Esc` to close
- CV page: **Download PDF** prints a clean, light version
- Move your cursor around the home hero. Something from the old site is hiding there.
