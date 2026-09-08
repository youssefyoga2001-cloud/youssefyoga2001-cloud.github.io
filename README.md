# Youssef Mohamed — Portfolio

React + TypeScript + Vite + Tailwind CSS v4.

```bash
npm run dev
```

Node is installed at `C:\Program Files\nodejs` but is not on PATH in every shell. If
`npm` is not found, prefix your session with:

```bash
$env:PATH = "$env:ProgramFiles\nodejs;$env:PATH"
```

## Editing content

All copy lives in `src/content.ts` — your name, email, nav links, project titles,
categories, years, and the services list. The hero greeting and pill labels are in
`src/components/Hero.tsx`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages. The repo's **Settings → Pages → Source** must be set to **GitHub Actions**
(not "Deploy from a branch"), otherwise the workflow publishes but nothing serves.

Asset URLs go through `asset()` in `src/content.ts`, which prefixes
`import.meta.env.BASE_URL`. The workflow feeds Vite a `BASE_PATH` from
`actions/configure-pages`, so the same build works at a domain root or under a project
sub-path. Never hardcode a leading `/` on a public-folder path — it breaks sub-path
deploys.

## Videos

Videos are served from `public/videos/` and are committed to the repo (~87 MB total).
`Hero.mp4` is the scrubbable background; the rest back the projects grid.

**Filenames are case-sensitive.** Vite's static serving does exact matching even on
Windows, and a case mismatch does not 404 — it silently falls through to `index.html`,
so the browser gets HTML and fails with `DEMUXER_ERROR_COULD_NOT_OPEN`. If a video stops
rendering, check the case first.

Each file should stay well under GitHub's 100 MB hard limit.

### Every video must be faststart

**Always export or remux with `-movflags +faststart`.** Without it the `moov` atom sits at
the end of the file and the browser cannot decode a frame until it has hunted that index
down — over HTTP it generally pulls the whole file first. Measured on the live site, a
9 MB clip took **over 20 seconds** just to report its duration; after remuxing, 1.4 s to
being playable. Same bytes, same picture — only the atom order changed.

To fix a file after the fact (stream copy, lossless, seconds to run):

```bash
ffmpeg -i input.mp4 -c copy -movflags +faststart output.mp4
```

Verify with: the first 2 KB of the file should contain the string `moov`.

### Posters

Every clip has a committed `<name>.jpg` beside it, and tiles render that image rather than
a `<video>`. A tile only attaches a video source on hover, so loading the page costs
~520 KB of posters instead of six multi-megabyte videos. To regenerate one, use the
`posterAt` fraction recorded in `src/content.ts`:

```bash
ffmpeg -ss <posterAt * duration> -i input.mp4 -frames:v 1 -vf "scale=1280:-2" -q:v 4 poster.jpg
```

To re-compress a clip from a master:

```bash
ffmpeg -i input.mp4 -vf scale=1920:-2 -c:v libx264 -crf 26 -preset slow -movflags +faststart output.mp4
```

Until then, each project takes an optional `posterAt` (0–1) in `src/content.ts` setting
which point in the clip to freeze on. It defaults to `0.3`; O3 Sigma and Kowens are set
to `0.6` because their frames at 30% are too dark to read as thumbnails.

## Notes

- `npm run lint` fails in this environment: Windows Application Control blocks oxlint's
  native binary. Not a code issue.
- The hero video scrubs with horizontal mouse movement. On touch devices (no fine
  pointer) and under `prefers-reduced-motion` it falls back to muted loop playback.
