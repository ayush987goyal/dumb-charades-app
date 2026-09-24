# Movie library plan

This plan pulls together three research reports on the movie library (all in this folder). Each report cites its sources and includes ready-to-paste TypeScript arrays.

- [hollywood-library.md](hollywood-library.md): a 440-title Hollywood rebuild.
- [south-indian-library.md](south-indian-library.md): a 120-title South Indian category that replaces Tollywood and Kollywood.
- [library-quality-and-categories.md](library-quality-and-categories.md): Bollywood clean-up, a World Cinema merge, two new categories, the data model and a validator.

## Where the library stands today

| Category | Titles | Problem |
|---|---|---|
| Bollywood | 517 (515 unique) | 2 exact duplicates, about 75 obscure picks, about 35 famous films missing (Dhurandhar, Chhaava, Saiyaara, Dunki, Tiger 3, Dhoom 3, Mohabbatein, Sangam) |
| Hollywood | 81 | 29 hard to act or cinephile-only (Her, Moonlight, Zodiac, Memento). Only 1 animated film. |
| Tollywood + Kollywood | 81 | 54 are one-word Telugu/Tamil names a Hindi-speaking group neither knows nor can act (Thirupachi, Vedalam, Dookudu). KGF, Kantara and Drishyam have no home. |
| British, French, Korean, Japanese | 134 | Mostly art-house (The 400 Blows, Tokyo Story, Incendies). 3 accented titles. Dunkirk, 1917 and Parasite also sit in Hollywood. |

`getMoviesByCategories` doesn't remove duplicates, so a title in two selected categories comes up twice as often.

## Proposed changes, in order

Each step can ship as its own PR.

1. **Validator and de-duplication.** Add a small Node script that fails on duplicates, non-ASCII, empty strings and cross-category clashes. Make `getMoviesByCategories` remove duplicates. Fix the 10 errors it finds today.
2. **Hollywood rebuild: 81 to 440.** Add animation (84 titles), franchises, comedies, 80s-90s classics, what India watches (Endgame, No Way Home, The Jungle Book, Baby's Day Out, Mr Bean's Holiday) and 2023-2026 hits. Rule: base title only, except iconic subtitles (Infinity War, No Way Home).
3. **South Indian: 81 to 120, as one category.** Merge Tollywood and Kollywood, and add Malayalam and Kannada. Show the title Hindi audiences saw, with the original in brackets when it differs, e.g. "Makkhi (Eega)", "Robot (Enthiran)". This touches `index.ts`, `game-setup.tsx`, `app/layout.tsx` and `manifest.json`.
4. **Bollywood clean-up.**
   - Remove about 59 clearly obscure titles. Another 30 are your call.
   - Add about 35 missing hits.
   - Drop marketing subtitles that inflate the word count ("Rocket Singh: Salesman of the Year" shows 6 words).
   - Move "Baahubali 2: The Conclusion" to South Indian.
5. **World Cinema: 134 to about 72.** Replace British, French, Korean and Japanese with one list of titles this audience knows: Korean hits, anime, Money Heist-era picks. Harry Potter and Bond move to Hollywood.
6. **New categories (optional).** Bollywood Songs (89-title starter list) and Indian TV & Web Series (93-title starter list). Both fit the act-it-out format. Songs are a common Indian charades variant, and TV covers Ramayan to Panchayat. The UI copy that says "movie" would need small changes.
7. **Metadata (later, optional).** Allow `string | { t, y?, aka?, id? }` so an entry can carry a year, alternate names and a stable id. A year would allow a decade filter, which is a filter, not a difficulty tier. Played history would move to ids under a new storage key, so nobody loses their history.

Net effect of steps 1-5: about 813 titles become about 1,190. Most of the growth is outside Bollywood, which is where repeats happen today.

## Overlaps to resolve during implementation

A cross-check of the proposed lists found these titles in more than one list. The step 1 validator will catch the rest.

- "Wanted" (Bollywood and Hollywood): keep in Bollywood.
- Enter the Dragon, Crouching Tiger Hidden Dragon, Crazy Rich Asians, Slumdog Millionaire (Hollywood and World Cinema): keep in one list only.
- Drishyam, Sarkar, Coolie, Kick, Baadshah: already in Bollywood, so left out of South Indian on purpose.

## Caveats

- IMDb blocked automated fetches. The India box-office numbers for 2025-2026 came partly from search summaries, and some recent titles (Toxic, OG, Lokah) are new enough that recognition may fade.
- Song and TV starter lists rest on popularity data and party-game guides, not per-title surveys.
- The first real game is the best test: note any title that caused a dead round and cut it.
