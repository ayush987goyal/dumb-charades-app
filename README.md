# Dumb Charades

A fast, mobile-first party game and movie generator for playing Dumb Charades with friends and family. Built with Next.js, Tailwind CSS, and TypeScript.

**Live app:** [https://v0-dumb-charades.vercel.app](https://v0-dumb-charades.vercel.app)

## What is inside

- **814 curated movies across 8 cinema categories:**
  - **Bollywood (518 titles):** Hand-picked Hindi films from the 1950s through 2026 selected specifically for charades actability. Every movie either breaks down into concrete physical words or has a famous cultural signature pose. See [docs/bollywood-charades-movies-research.md](docs/bollywood-charades-movies-research.md) for the full catalog and acting cues.
  - **Hollywood (81 titles)**
  - **Tollywood (41 titles)**
  - **Kollywood (40 titles)**
  - **British (35 titles)**
  - **Korean (35 titles)**
  - **Japanese (35 titles)**
  - **French (29 titles)**
- **Automatic word count badge:** Each movie card displays the word count (`1 Word`, `4 Words`) right above the title, splitting on spaces and hyphens so the actor immediately knows how many fingers to hold up.
- **Team and individual modes:** Alternate automatically between Team A and Team B with live team scoreboards, or play free-for-all individual rounds with accuracy tracking.
- **Configurable round timer with audio and haptic cues:** Choose 1, 2, 3, or 5-minute turns. Plays a warning sound and pulses a 10-second haptic heartbeat countdown before the final buzzer.
- **Cross-platform web haptics and screen wake lock:** Uses the Web Vibration API (`navigator.vibrate`) on Android and a hidden `<input type="checkbox" switch>` toggle to fire the hardware Taptic Engine on iOS 17.4+ and iOS 18+ Safari. Keeps the phone screen awake during active rounds via the Screen Wake Lock API (`navigator.wakeLock`).
- **No-repeat movie history:** Completed movies are stored in `localStorage` so cards never repeat across turns or sessions until you clear the history.
- **Installable PWA:** Ships with a web app manifest and home-screen icons for standalone fullscreen play on iOS and Android.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Project structure

- `app/page.tsx`: Main game state machine (`setup -> playerEntry -> playing -> results`).
- `app/layout.tsx`: Root layout, SEO metadata, OpenGraph tags, and `WebApplication` JSON-LD schema.
- `app/manifest.json`: PWA manifest with standard and maskable icons.
- `components/game-setup.tsx`: Mode, round duration, and multi-category selection screen.
- `components/player-name-input.tsx`: Turn handoff screen before starting the countdown.
- `components/game-play.tsx`: Active round timer, word count badge, movie display, wake lock, and Got It / Skip controls.
- `components/game-results.tsx`: Round summary, player accuracy, and Team A vs. Team B leaderboard.
- `lib/movies/`: Category movie catalogs (`bollywood.ts`, `hollywood.ts`, `tollywood.ts`, `kollywood.ts`, `british.ts`, `french.ts`, `korean.ts`, `japanese.ts`).
- `lib/haptics.ts`: Dual-engine web haptics (`navigator.vibrate` + iOS Safari switch Taptic Engine) and Screen Wake Lock helper.
- `lib/storage.ts`: `localStorage` persistence for completed movie history.
- `docs/bollywood-charades-movies-research.md`: Research criteria, primary sources, and acting cues for the Bollywood movie catalog.
