# COMPANION proxy (optional)

The AI companion works out of the box with **no API key**: it answers from the site's own data
(`app/data/profile.ts`) in English and Turkish, and can move visitors between pages.

If you want it backed by a real language model again, the key must live on a server, never in
the website code. GitHub Pages can't run server code, so this folder holds a tiny
[Cloudflare Worker](https://developers.cloudflare.com/workers/) (free tier is plenty) that keeps
your OpenRouter key secret and forwards chat requests.

## Setup (about 5 minutes)

1. **Rotate the old key first.** The previous key was published inside the site's JavaScript, so
   delete it at <https://openrouter.ai/settings/keys> and create a new one.
2. Install the CLI and log in:
   ```bash
   npm install -g wrangler
   wrangler login
   ```
3. From this folder, deploy and add the key as a secret:
   ```bash
   cd companion-worker
   wrangler deploy worker.js --name ozan-companion --compatibility-date 2025-01-01
   wrangler secret put OPENROUTER_API_KEY --name ozan-companion
   ```
   Wrangler prints a URL like `https://ozan-companion.<you>.workers.dev`.
4. Build the site with that URL, then deploy as usual:
   ```bash
   NEXT_PUBLIC_COMPANION_ENDPOINT=https://ozan-companion.<you>.workers.dev npm run deploy
   ```

If the worker is ever down or out of credit, the companion silently falls back to its built-in
answers, so the chat never breaks.

To allow other domains (for example a custom domain), add them to `ALLOWED_ORIGINS` in `worker.js`.
