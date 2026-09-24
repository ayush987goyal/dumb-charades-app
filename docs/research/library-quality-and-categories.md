# Movie library quality audit and category research

Date: 2026-09-24. Scope: `lib/movies/bollywood.ts`, `british.ts`, `french.ts`, `korean.ts`, `japanese.ts`, and new category ideas. Hollywood, Tollywood and Kollywood lists are covered by other agents and are only mentioned where they collide with the lists above.

Audience assumed: urban Indian friend groups, ages 20 to 40. Owner constraints respected: no difficulty tiers, no hints, no modifier rounds, keep the game simple, PWA.

Nothing under `lib/` or `components/` was edited. All findings below were produced by reading the code and by running the validator proposed in section 4 against the current lists.

---

## 0. How the game uses the data (why these issues matter)

- `getMoviesByCategories()` in `lib/movies/index.ts` concatenates the selected arrays with no de-duplication. If a title sits in two selected categories (for example `Dunkirk` in British and Hollywood), it is twice as likely to be drawn.
- `game-play.tsx` and `lib/storage.ts` use the raw title string as the identity. Played history is a list of strings in localStorage key `charades_completed_movies`. Two different films with the same string (Hindi `Sarkar` 2005 and Tamil `Sarkar` 2018) share one history slot. Fixing a spelling changes the key, so the corrected title will reappear once for returning players (harmless).
- The on-screen word count is `title.trim().split(/[\s-]+/)`. Marketing subtitles inflate it (`Rocket Singh: Salesman of the Year` shows 6 words, though everyone says "Rocket Singh"). Hyphens split words (`Mughal-e-Azam` = 3). `&` counts as a word (`Kapoor & Sons` = 3).

---

## 1. Audit of `bollywood.ts` (517 entries, 515 unique)

### 1.1 Exact in-category duplicates (REMOVE the second copy)

| Keep | Remove | Note |
| --- | --- | --- |
| `Maine Pyaar Kyun Kiya?` (line 234) | `Maine Pyaar Kyun Kiya` (line 516) | Same 2005 film. Consider dropping the `?` on the kept entry. |
| `All the Best: Fun Begins` (line 287) | `All The Best: Fun Begins` (line 522) | Same 2009 film. Shorten kept entry to `All the Best`. |

### 1.2 Near-duplicates and cross-category collisions

| Entry | Problem | Action |
| --- | --- | --- |
| `Chashme Buddoor` (1981) and `Chashme Baddoor` (2013) | Remake with a one-letter spelling difference. Players cannot tell which one they acted. | REMOVE `Chashme Baddoor` (line 526). |
| `Baahubali 2: The Conclusion` | Telugu film. Tollywood already has `Baahubali 2`. Not caught by exact matching. | REMOVE from Bollywood. |
| `Sarkar` | Also in `kollywood.ts` (different film). Shared history key. | Keep both only after moving to ids (section 4), or rename one to `Sarkar (Tamil)`. |
| `Waqt` (1965) and `Waqt: The Race Against Time` (2005) | Same acted word, second film is minor. | REMOVE the 2005 entry. |
| `Daag` (1973) and `Daag: The Fire` (1999) | Same acted word, second film is minor. | REMOVE `Daag: The Fire`. |

Same title, different films, single entry (fine, no action): `Agneepath`, `Don`, `Aankhen`, `Dostana`, `Bade Miyan Chote Miyan`, `Hero`. Note that `Mirzapur` (2026 film) and the `Mirzapur` web series would collide if a TV category is added; see section 4.

### 1.3 Spelling, romanisation and display fixes (FIX)

Rule proposed: use the Wikipedia article spelling (official romanisation, including numerology spellings like `Kinng`, `Newwz`, `Babyy`, `Replayy`, `Singlle`, `Mumbaai`, `Kii`), in plain ASCII, without decorative punctuation (`...`, `!`, `?`, `..!`), and without a marketing subtitle unless people actually say it.

| Current | Proposed | Reason |
| --- | --- | --- |
| `Jis Desh Men Ganga Behti Hai` | `Jis Desh Mein Ganga Behti Hai` | Wikipedia title uses "Mein" [W6]. |
| `Kabhi Khushi Kabhie Gham...` | `Kabhi Khushi Kabhie Gham` | "Kabhie" is the official spelling and is already correct. Wikipedia article and infobox name drop the trailing ellipsis [W5]. |
| `Kaho Naa... Pyaar Hai`, `Koi... Mil Gaya`, `Jaane Tu... Ya Jaane Na`, `R... Rajkumar`, `Kyo Kii... Main Jhuth Nahin Bolta`, `Bbuddah... Hoga Terra Baap`, `Hum Aapke Hain Koun..!` | Same words, no ellipsis or `..!` | Decorative punctuation clutters the big title card. Word count is unaffected. |
| `Brahmastra: Part One: Shiva` | `Brahmastra` | Wikipedia title uses a macron and an en dash (non-ASCII) [W1]. Everyone says "Brahmastra". |
| `Tanhaji: The Unsung Warrior` | `Tanhaji` | Wikipedia lists it as "Tanhaji" [W1]. |
| `Golmaal: Fun Unlimited` | `Golmaal` | Common name, 1 word instead of 3. |
| `Nayak: The Real Hero` | `Nayak` | Common name. |
| `Khamoshi: The Musical` | `Khamoshi` | Common name. |
| `Rocket Singh: Salesman of the Year` | `Rocket Singh` | 6 words shown vs 2 spoken. |
| `M.S. Dhoni: The Untold Story` | `M.S. Dhoni` | Common name. |
| `ABCD: Any Body Can Dance` | `ABCD` | Common name. |
| `All the Best: Fun Begins` | `All the Best` | Common name. |
| `Roti Kapda Aur Makaan` | keep, add alias `Roti Kapada Aur Makaan` | Wikipedia's yearly table spells it "Kapada" [W2]. Both are used; store the other as `aka` (section 4). |

Keep as is (subtitle is how people say it): `Gadar: Ek Prem Katha`, `Toilet: Ek Prem Katha`, `Uri: The Surgical Strike`, `1942: A Love Story`.

### 1.4 Numbered sequels (optional clean-up)

The original research doc (Rule C) says numbered sequels should not sit next to the base title, but the list has 13: `Dhoom 2`, `Don 2`, `Krrish 3`, `Golmaal 3`, `Fukrey 3`, `OMG 2`, `Drishyam 2`, `Gadar 2`, `Stree 2`, `Bhool Bhulaiyaa 2`, `Bhool Bhulaiyaa 3`, `Judwaa 2`, `Aashiqui 2`. The acting is identical to the base film plus a finger count, so these feel like repeats. Suggested rule: at most one numbered sequel per franchise, and only if it is a bigger hit than the original. Suggested REMOVE: `Golmaal 3`, `Krrish 3`, `Fukrey 3`, `Judwaa 2`, `Bhool Bhulaiyaa 3`, `Drishyam 2`, `OMG 2`. Keep `Stree 2` and `Gadar 2` (top-12 all-time Hindi grossers [W1]), `Dhoom 2`, `Don 2`, `Aashiqui 2`, `Bhool Bhulaiyaa 2`.

### 1.5 Too obscure for this audience

Criteria: not a yearly top grosser [W2], not a cult or TV-rerun staple, and not a known "charades stumper" whose literal wording is the joke. Pre-1970 films are kept only if they are landmarks (Awaara, Shree 420, Mother India, Pyaasa, Mughal-e-Azam, Guide, Waqt, Padosan, and similar).

**REMOVE (confident, 59):**

- 1950s-60s: `Baazi`, `Do Bigha Zamin`, `Boot Polish`, `Nagin`, `Chori Chori`, `Naya Daur`, `Kaagaz Ke Phool`, `Gunga Jumna`, `Half Ticket`, `Professor`, `Bandini`, `Taj Mahal`, `Dosti`, `Mera Saaya`, `Brahmachari`
- 1970s: `Do Raaste`, `Sachaa Jhutha`, `Khilona`, `Jugnu`, `Chor Machaye Shor`, `Haath Ki Safai`, `Kunwara Baap`, `Chacha Bhatija`, `Khoon Pasina`, `Jaani Dushman`
- 1990s: `Thanedaar`, `Shola Aur Shabnam`, `Gopi Kishan`, `Ram Jaane`, `Agni Sakshi`, `Saajan Chale Sasural`, `Chhote Sarkar`, `China Gate`, `Dulhe Raja`, `Jaanwar`, `Kachche Dhaage`, `Anari No. 1`, `Daag: The Fire`, `Joru Ka Ghulam`
- 2000s: `Hadh Kar Di Aapne`, `Jodi No. 1`, `Aamdani Atthanni Kharcha Rupaiya`, `Ek Chhotisi Love Story`, `Qayamat: City Under Threat`, `Main Prem Ki Diwani Hoon`, `Waqt: The Race Against Time`, `Ta Ra Rum Pum`, `Chal Mere Bhai`, `Tujhe Meri Kasam`, `Dil Maange More`, `Shaadi No. 1`, `Chain Kulii Ki Main Kulii`, `Aag Hi Aag`, `Chor Police`, `Daal Mein Kaala`, `Kunwara`
- 2010s-20s: `Phas Gaye Re Obama`, `Shor in the City`, `Well Done Abba`

**REVIEW (owner call, 30):** `Bees Saal Baad`, `Caravan` (1971 top grosser [W2] but little recall today), `Guddi`, `Victoria No. 203`, `Tohfa`, `Pushpak` (silent film, a fun irony but obscure), `Hello Brother`, `Duplicate`, `Gupt`, `Makdee`, `Chup Chup Ke`, `Kyaa Kool Hai Hum`, `De Dana Dan`, `Aunty No. 1`, `Teesra Kaun?`, `Gharwali Baharwali`, `Khatta Meetha`, `Do Dooni Chaar`, `Action Replayy`, `Ferrari Ki Sawaari`, `Shuddh Desi Romance`, `Nautanki Saala!`, `Saheb, Biwi Aur Gangster`, `Pataakha`, `Qarib Qarib Singlle`, `Lootcase`, `Chor Nikal Ke Bhaga`, `Doctor G`, `Kathal`, `Monica, O My Darling`.

Keep the famous literal stumpers even though they are old or flops (`Andheri Raat Mein Diya Tere Haath Mein`, `Jal Bin Machhli Nritya Bin Bijli`, `Ghar Mein Ram Gali Mein Shyam`, `Matru Ki Bijlee Ka Mandola`, `Luv Shuv Tey Chicken Khurana`). They are the point of the charades canon [S4].

### 1.6 Single-word titles that are abstract or unmimeable

153 of 515 titles are a single word. Most are fine because the word is concrete (`Dhol`, `Coolie`, `Border`) or the film has an iconic hook (`Sholay`, `Lagaan`, `Don`). The list contradicts its own Rule C (which excludes abstract words like `Fanaa`) by keeping abstract words for famous films. Proposal:

- **REMOVE (abstract word and film not iconic enough to carry it):** `Baazi`, `Tohfa`, `Nikaah`, `Chamatkar`, `Khubsoorat`, `Gupt`, `Paheli`, `Kunwara`, `Pataakha`, `Hichki`, `Laawaris`. Several already appear in 1.5.
- **KEEP, knowingly hard (abstract word, very famous film):** `Anand`, `Aashiqui`, `Ishq`, `Deewana`, `Pardes`, `Raaz`, `Kaminey`, `Kahaani`, `Raazi`, `Raees`, `Andhadhun`, `Chhichhore`, `Tumbbad`, `Lakshya`, `Iqbal`, `Masti`, `Hulchul`, `Maidaan`. With no hints in the app, these rely on "sounds like" and the film's hook, which Indian players already use [S4][S5].

### 1.7 Famous Bollywood films still MISSING

Checked by script against the current list (normalised matching). Sources: Wikipedia top-25 worldwide Hindi grossers and highest-grosser-by-year tables [W1][W2], the 2025 and 2026 Hindi film box-office tables [W3][W4], and IMDb's most-popular Indian film of 2025 as reported by Hindustan Times [S13]. The IMDb India chart itself blocked automated fetches (HTTP 202) [S14], so the "editorial" group below is based on Wikipedia year lists plus judgement and should be spot-checked.

**Add first (box-office verified):**

| Title | Year | Evidence |
| --- | --- | --- |
| Dhurandhar | 2025 | #3 all-time Hindi, top grosser of 2025 [W1][W3] |
| Dhurandhar: The Revenge | 2026 | #2 all-time Hindi, top grosser of 2026 [W1][W4] |
| Chhaava | 2025 | #10 all-time Hindi [W1]; IMDb most popular Indian film of 2025 [S13] |
| Saiyaara | 2025 | #14 all-time Hindi [W1] |
| Border 2 | 2026 | top-25 all-time Hindi [W1][W4] |
| Dunki | 2023 | top-25 all-time Hindi [W1] |
| Tiger 3 | 2023 | top-25 all-time Hindi [W1] |
| Dhoom 3 | 2013 | top grosser of 2013 [W1] (list has Dhoom and Dhoom 2) |
| Sooryavanshi | 2021 | top grosser of 2021 [W1] |
| Mohabbatein | 2000 | top grosser of 2000 [W1] |
| Thugs of Hindostan | 2018 | top-10 Hindi 2018; famous flop, very mimeable (ship, thugs) |
| War 2, Raid 2, Housefull 5, Sikandar, Thamma | 2025 | top-10 Hindi 2025 [W3] |
| Mahavatar Narsimha | 2025 | highest-grossing animated film in India [W3][W16] |
| Bhooth Bangla, Dhamaal 4, Welcome to the Jungle | 2026 | top Hindi grossers 2026 [W4] |
| Sangam (1964), Aradhana (1969), Suhaag (1979), Kranti (1981), Karma (1986), Saajan (1991) | classic | yearly top Indian grossers [W2] |

**Add next (editorial, verify recall):** Silsila, Qurbani, Naseeb, Himmatwala, Masoom, Tridev, Parinda, Khiladi, Mohra, Satya, Sarfarosh, Dhadkan, Kaante, Aitraaz, Omkara, Guru, Golmaal Returns, Raajneeti, Dabangg 2, Singham Returns, Bang Bang!, Dilwale (2015), Neerja, Rustom, Simmba, Raid, Kesari, Bharat, Shershaah, 83, The Kashmir Files, Munjya, Singham Again, Sam Bahadur, Dream Girl 2, Jolly LLB 2, Holiday, Mujhse Dosti Karoge!, Chandni Chowk to China, Jab Harry Met Sejal, Sky Force, Jolly LLB 3.

Net effect if all REMOVE and first-wave ADD items are applied: roughly 515 minus 75 plus 35 = about 475 titles, with far fewer dead rounds.

---

## 2. Audit of British, French, Korean, Japanese lists

### 2.1 Recognisability verdict

| List | Size | Verdict | Why |
| --- | --- | --- | --- |
| British | 35 | MERGE (franchises into Hollywood, rest into World Cinema) | Indian players think of Harry Potter and Bond as "Hollywood". Half the list (Trainspotting, Hot Fuzz, The World's End, Shaun of the Dead, 28 Days Later, Lock Stock, The Favourite, Atonement, Emma, Billy Elliot, The Full Monty, Four Weddings and a Funeral) is niche for this audience. |
| French | 29 | REPLACE (drop the category) | Mostly art-house (The 400 Blows, Breathless, La Haine, Irreversible, A Prophet, Three Colors x3). `Taken` and `Lucy` are English-language films players file under Hollywood. `Incendies` is Canadian, not French. 3 titles are non-ASCII. |
| Korean | 35 | KEEP inside World Cinema, trimmed | K-content is genuinely known: Netflix reported K-drama viewing in India grew over 370% in 2020 [S1]; Squid Game S2 was the most-watched international show in India of all time per Ormax [S6]; Wikipedia notes Indian millennials and Gen Z are most interested in the Korean Wave [W10]. But films like The Admiral, Steel Rain, 1987, The Attorney, Masquerade, The Throne are unknown here. |
| Japanese | 35 | KEEP inside World Cinema, re-weighted to anime | Anime is mainstream now: Demon Slayer: Infinity Castle is the 4th highest-grossing animated film ever in India [W16], closing about 780% above Suzume per Koimoi [S2]; Suzume had a Hindi dub release [W15]; Doraemon has aired in India since 2005 [W17]. The Kurosawa and Kore-eda half of the list (Ikiru, Tokyo Story, Kagemusha, Still Walking, After Life, Nobody Knows) is film-school material. |

Recommendation: replace the four categories with one `World Cinema` category (about 70 titles below). Fewer checkboxes, higher hit rate, and it stays one category, not a mode. Coordinate with the Hollywood agent so franchise titles (Harry Potter, Bond, Paddington, Mr. Bean) land in exactly one place.

### 2.2 Duplicates found

- In-category: `The Handmaiden` appears twice in `korean.ts`.
- Cross-category exact: `Dunkirk` and `1917` (British + Hollywood), `Parasite` (Hollywood + Korean), `Sarkar` (Bollywood + Kollywood, different films).
- Cross-category near: `James Bond Casino Royale` (British) vs `Casino Royale` (Hollywood); `Baahubali 2: The Conclusion` (Bollywood) vs `Baahubali 2` (Tollywood).
- Wrong titles: `James Bond Skyfall` and `James Bond Spectre` are not the film titles (`Skyfall`, `Spectre`). `Ringu` is known here as the US remake `The Ring`. `Les Misérables` is ambiguous (2012 musical is British-American).
- Non-ASCII: `Amélie`, `Léon The Professional`, `Les Misérables`.

### 2.3 Proposed `World Cinema` list (72)

Evidence of reach is noted where sourced; the rest are the most internationally famous titles from each country and should be spot-checked with a playtest.

```ts
export const worldCinemaMovies = [
  // Korean (Parasite: move here, remove from Hollywood)
  "Parasite", "Train to Busan", "Peninsula", "Oldboy", "The Host", "Okja", "Snowpiercer",
  "Miracle in Cell No. 7", "The Man from Nowhere", "Along with the Gods", "Exit",
  "I Saw the Devil", "Memories of Murder", "The Handmaiden", "Extreme Job",
  // Japanese live action and anime
  "Spirited Away", "My Neighbor Totoro", "Howl's Moving Castle", "Princess Mononoke", "Ponyo",
  "Kiki's Delivery Service", "Castle in the Sky", "The Boy and the Heron", "Grave of the Fireflies",
  "Your Name", "Weathering with You", "Suzume", "A Silent Voice", "Akira",
  "Demon Slayer: Mugen Train", "Demon Slayer: Infinity Castle", "Jujutsu Kaisen 0",
  "Dragon Ball Super: Broly", "Stand by Me Doraemon", "Pokemon: The First Movie",
  "Godzilla Minus One", "Seven Samurai", "Battle Royale", "Shoplifters",
  // European
  "Amelie", "The Intouchables", "Leon: The Professional", "Life Is Beautiful", "Cinema Paradiso",
  "Pan's Labyrinth", "The Platform", "Downfall", "Run Lola Run", "The Lives of Others",
  "Das Boot", "The Artist", "Toni Erdmann",
  // Chinese and Hong Kong
  "Crouching Tiger, Hidden Dragon", "Kung Fu Hustle", "Shaolin Soccer", "Ip Man",
  "Enter the Dragon", "Drunken Master", "Police Story", "In the Mood for Love",
  // Other
  "Children of Heaven", "City of God", "A Separation", "Amores Perros", "Roma",
  "Slumdog Millionaire", "Bend It Like Beckham", "The Lunchbox",
  "Crazy Rich Asians", "Everything Everywhere All at Once", "Monsoon Wedding", "Life of Pi",
]
```

Notes: `The Lunchbox` is already in Bollywood; drop it here if the validator's cross-category rule is kept strict. `Everything Everywhere All at Once`, `Crazy Rich Asians`, `Life of Pi` and `Slumdog Millionaire` are English-language or Hollywood-adjacent; keep them in whichever list the Hollywood agent does not use. `Toni Erdmann` and `In the Mood for Love` are the weakest picks and can be swapped for Hollywood-remake originals if the owner wants. Remove `Taken`, `Lucy`, `Snowpiercer`, `Okja` from here if the Hollywood list takes them (they are English-language).

---

## 3. New category ideas

### 3.1 Evaluation

| Category | Realistic size | Recognisability (urban 20-40) | Fits "Movie Generator" framing | Evidence |
| --- | --- | --- | --- | --- |
| Bollywood Songs | 300+ | Very high; songs are how most people remember films | Partial, but stays inside Bollywood; hook steps make it the most actable category | Indian charades guides treat "song" as a standard category with its own opening signal [S4][S5][S7]; song-guessing is a core Indian party-game habit (Antakshari) [W19] |
| Indian TV and Web Series (one category) | 150+ | Very high across ages: Doordarshan classics for 30-40s, OTT for 20-30s | Low as "movies", high as "act it out" | Ramayan rerun drew 77 million viewers on 16 Apr 2020 [W11][S9]; Taarak Mehta and CID are among India's longest-running shows [W12][W13]; Farzi reached 37M viewers, the Ormax all-time record at the time [S8]; Mirzapur S3 30.8M, Panchayat S3 28.2M in 2024 [S6] |
| International TV Series | 80-100 | High among urban 20-35, lower for 35+ | Low | Squid Game S2: 19.6M viewers, most-watched international show in India ever [S6]; Money Heist was Netflix's most-watched non-English series [W14] and India was among its biggest markets [S11] |
| Animated and Kids | 100+ | High, family-friendly; strong with parents of young kids | Good for films (Pixar, Ghibli), weak for cartoons | Mahavatar Narsimha is the highest-grossing animated film in India [W16]; Doraemon aired in India since 2005 [W17]. Overlaps heavily with Hollywood (Disney/Pixar) and World Cinema (anime). |
| Hindi TV serials only | 80-100 | High for 25-40, patchy for 20-25 | Low | Same as TV/Web row. Too small alone; better merged with web series. |

### 3.2 Recommendation: add these two first

1. **Bollywood Songs.** It is the most common Indian variant after movies, has the largest pool, and hook steps make rounds fast. Needs only a label change in the UI (the card currently says "movie"). Avoid song titles that are identical to film titles already in Bollywood (for example "Kuch Kuch Hota Hai", "Om Shanti Om", "Chak De India", "Jai Ho", "Saiyaara") or the validator's cross-category rule will flag them and players will be confused. The starter list below already avoids them.
2. **Indian TV and Web Series** (one category). Merging Doordarshan and cable classics with OTT originals covers the whole 20-40 age band in one checkbox. It is also rich in physical hooks (Shaktimaan's spin, CID's door-breaking, Panchayat's water tank, Mirzapur's carpet).

International TV Series is the natural third category. Animated and Kids is better handled by the Hollywood and World Cinema lists.

Copy note: labels such as "Movie Categories", "Act out the movie shown" and "N movies completed" in `game-setup.tsx` would need to say "title" or "category" once non-movie categories exist. The app name can stay.

### 3.3 Starter list: Bollywood Songs (89)

Chosen for fame and for an actable title or hook step. Titles are the commonly used song name, plain ASCII.

```ts
export const bollywoodSongs = [
  // 1960s-80s
  "Mere Sapno Ki Rani", "Yeh Dosti Hum Nahin Todenge", "Mehbooba Mehbooba", "Dum Maaro Dum",
  "Piya Tu Ab To Aaja", "Ek Chatur Naar", "Pyar Hua Iqrar Hua", "Mere Angne Mein",
  "Rang Barse", "Khaike Paan Banaraswala", "Jumma Chumma De De", "Hawa Hawai",
  "Ek Do Teen", "Tamma Tamma Loge", "I Am a Disco Dancer", "Chalte Chalte",
  "Chura Liya Hai Tumne Jo Dil Ko", "Zindagi Ek Safar Hai Suhana",
  // 1990s
  "Choli Ke Peeche Kya Hai", "Didi Tera Devar Deewana", "Tu Cheez Badi Hai Mast Mast",
  "Chura Ke Dil Mera", "Ole Ole", "Aati Kya Khandala", "Chaiyya Chaiyya", "Tujhe Dekha To",
  "Mehndi Laga Ke Rakhna", "Ghar Aaja Pardesi", "Pardesi Pardesi", "Tip Tip Barsa Paani",
  "Lal Dupatta Malmal Ka", "Sona Kitna Sona Hai", "Ladki Badi Anjaani Hai", "Oh Oh Jaane Jaana",
  "Yeh Kaali Kaali Aankhen", "Chak Dhoom Dhoom",
  // 2000s
  "Bole Chudiyan", "Suraj Hua Maddham", "It's the Time to Disco", "Where's the Party Tonight",
  "Kajra Re", "Dhoom Machale", "Beedi", "Desi Girl", "Mauja Hi Mauja", "Nagada Sang Dhol",
  "Aal Izz Well", "Zoobi Doobi", "Masakali", "Ainvayi Ainvayi", "Tu Meri Adhuri Pyaas Pyaas",
  "Nimbooda", "Chammak Challo", "Sheila Ki Jawani", "Munni Badnaam Hui",
  "Dhinka Chika",
  // 2010s
  "Balam Pichkari", "Badtameez Dil", "Lungi Dance", "Gandi Baat", "Tune Maari Entriyaan",
  "Abhi Toh Party Shuru Hui Hai", "Chittiyaan Kalaiyaan", "Kar Gayi Chull", "London Thumakda",
  "Nashe Si Chadh Gayi", "Swag Se Swagat", "Kala Chashma", "Galti Se Mistake", "Dilbar",
  "Aankh Marey", "Apna Time Aayega", "Tum Hi Ho", "Ghungroo", "Morni Banke", "Hookah Bar",
  // 2020s
  "Jhoome Jo Pathaan", "Zinda Banda", "Chaleya", "What Jhumka", "Tauba Tauba", "Aaj Ki Raat",
  "Jamal Kudu", "Arjan Vailly", "Kesariya", "Raataan Lambiyan", "Dhating Naach",
  "Besharam Rang", "Tere Vaaste",
]
```

All 89 are original Hindi film songs (no dubbed South Indian tracks), and none shares its exact name with a film in `bollywood.ts`.

### 3.4 Starter list: Indian TV and Web Series (93)

```ts
export const indianTvAndWebSeries = [
  // Doordarshan and early cable classics
  "Ramayan", "Mahabharat", "Shaktimaan", "Chandrakanta", "Malgudi Days", "Hum Log",
  "Buniyaad", "Byomkesh Bakshi", "Karamchand", "Vikram Aur Betaal", "Alif Laila", "Surabhi",
  "Chitrahaar", "Rangoli", "Flop Show", "Dekh Bhai Dekh", "Tu Tu Main Main", "Shrimaan Shrimati",
  "Zabaan Sambhalke", "Hum Paanch", "Captain Vyom", "Hip Hip Hurray", "Just Mohabbat",
  // 2000s-2020s TV
  "CID", "Aahat", "Sonpari", "Shaka Laka Boom Boom", "Hatim", "Office Office",
  "Sarabhai vs Sarabhai", "Khichdi", "Baa Bahoo Aur Baby", "Kyunki Saas Bhi Kabhi Bahu Thi",
  "Kahaani Ghar Ghar Kii", "Kasautii Zindagii Kay", "Jassi Jaissi Koi Nahin", "Dill Mill Gayye",
  "Balika Vadhu", "Yeh Rishta Kya Kehlata Hai", "Sasural Simar Ka", "Naagin", "Kumkum Bhagya",
  "Bade Achhe Lagte Hain", "Anupamaa", "Pavitra Rishta", "Devon Ke Dev Mahadev",
  "Taarak Mehta Ka Ooltah Chashmah", "Bhabiji Ghar Par Hain", "Crime Patrol", "Savdhaan India",
  // Reality and unscripted
  "Kaun Banega Crorepati", "Bigg Boss", "Indian Idol", "Roadies", "Khatron Ke Khiladi",
  "Comedy Nights with Kapil", "Dance India Dance", "Sa Re Ga Ma Pa", "Nach Baliye",
  "Shark Tank India",
  // OTT and TVF originals
  "Sacred Games", "Mirzapur", "Panchayat", "The Family Man", "Scam 1992", "Kota Factory",
  "Aspirants", "TVF Pitchers", "Permanent Roommates", "Tripling", "Gullak", "Paatal Lok",
  "Made in Heaven", "Four More Shots Please", "Delhi Crime", "Special Ops", "Asur", "Breathe",
  "Inside Edge", "Criminal Justice", "Aarya", "Rocket Boys", "Farzi", "Jubilee", "Kaala Paani",
  "Heeramandi", "The Railway Men", "Kohrra", "Jamtara", "Bandish Bandits", "Little Things",
  "College Romance", "Maamla Legal Hai",
]
```

`Mirzapur` collides with the 2026 film of the same name [W4][W18] if that film is added to Bollywood. Ormax figures back Mirzapur, Panchayat, Heeramandi and Farzi specifically [S6][S8].

---

## 4. Data model and validation

### 4.1 Should titles carry metadata?

Yes, but minimal, and mostly for data quality rather than new features. The three concrete wins:

1. **Stable ids** fix shared-history collisions (`Sarkar`, `Mirzapur`) and double weighting of titles present in two categories.
2. **`aka`** lets the validator catch alt spellings (`Chashme Buddoor`/`Chashme Baddoor`, `Roti Kapda`/`Roti Kapada`) without fuzzy matching.
3. **`year`** is cheap (the existing `docs/bollywood-charades-movies-research.md` already lists a year for every Bollywood title, so it can be scripted) and enables an optional decade filter later. A decade filter is a filter on the pool, not a difficulty tier or modifier, so it fits the owner's constraints if ever wanted. It is not required.

Skip: language (implied by category), difficulty, hints, genre, posters.

### 4.2 Minimal TypeScript shape

```ts
// lib/movies/types.ts
export type TitleEntry =
  | string // legacy form, still allowed during migration
  | {
      t: string        // display title, plain ASCII
      y?: number       // release year, enables a decade filter
      aka?: string[]   // alternate spellings / official long form, never displayed
      id?: string      // only needed when two different works share a title, e.g. "sarkar-2018-ta"
    }

export type Title = { id: string; t: string; y?: number; aka: string[] }

export const normKey = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim()

export function toTitle(e: TitleEntry): Title {
  if (typeof e === "string") return { id: normKey(e), t: e, aka: [] }
  return { id: e.id ?? normKey(e.t), t: e.t, y: e.y, aka: e.aka ?? [] }
}
```

Default id is the normalised title, so for most entries the id equals what history already stores (after normalisation). Only collisions need an explicit `id`.

### 4.3 Migration path (each step shippable alone)

1. **Now, no runtime change:** add the validator (4.4) and fix the errors it reports (10 today: 2 Bollywood dups, 1 Korean dup, 3 non-ASCII, 4 cross-category).
2. **Pool de-dup:** in `getMoviesByCategories`, build a `Map` keyed by `normKey(title)` so a title in two selected categories is drawn at normal odds. One-line behavioural fix, still string-based.
3. **Accept `TitleEntry`:** change arrays to `TitleEntry[]`, map through `toTitle()` in `index.ts`, and keep passing `title.t` strings to the components. Convert entries to objects only where there is metadata to add.
4. **History by id:** store ids under a new key (for example `charades_completed_v2`). On first load, map each legacy string through `normKey` and write the v2 key; keep reading the old key once. No player loses history.
5. **Optional:** backfill `y` for Bollywood from the research doc with a one-off script; add a decade filter only if the owner asks.

### 4.4 Validation script for CI

Tested against the current repo with Node 24 (native TypeScript type stripping, no new dependency). It imports each `lib/movies/*.ts` leaf file directly, so it needs no build step and is not type-checked by `next build` (it is a `.mjs` file).

```js
// scripts/validate-titles.mjs
// Usage: node scripts/validate-titles.mjs  (Node >= 22.18 or >= 23.6 for native TS type stripping)
// Exits 1 on errors. Warnings never fail the build.
import { readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const DIR = process.env.TITLES_DIR ?? join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "movies")

// Normalised keys allowed in more than one category (reviewed exceptions only).
const CROSS_CATEGORY_ALLOW = new Set([
  // "sarkar", // Hindi (2005) and Tamil (2018) are different films
])

const norm = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim()

function lev(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 3
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    prev = cur
  }
  return prev[b.length]
}

const errors = []
const warnings = []
const seenGlobal = new Map() // key -> [{ file, title }]

const files = readdirSync(DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts")
for (const file of files) {
  const mod = await import(pathToFileURL(join(DIR, file)).href)
  const lists = Object.values(mod).filter(Array.isArray)
  if (lists.length !== 1) { errors.push(`${file}: expected exactly one exported array`); continue }
  const seen = new Map()
  lists[0].forEach((entry, i) => {
    const t = typeof entry === "string" ? entry : entry?.t // supports TitleEntry objects too
    const where = `${file}[${i}] "${t}"`
    if (typeof t !== "string" || t.trim() === "") return errors.push(`${where}: empty or non-string`)
    if (t !== t.trim()) errors.push(`${where}: leading/trailing whitespace`)
    if (/\s{2,}/.test(t)) errors.push(`${where}: double space`)
    if (/[^\x20-\x7E]/.test(t)) errors.push(`${where}: non-ASCII character`)
    const words = t.split(/[\s-]+/).filter(Boolean).length
    if (words > 8) warnings.push(`${where}: ${words} words, consider the common short title`)
    const keys = [t, ...(entry?.aka ?? [])].map(norm)
    for (const k of keys) {
      if (seen.has(k)) errors.push(`${where}: duplicate of "${seen.get(k)}" in same file`)
      else seen.set(k, t)
    }
    const k = norm(t)
    if (!seenGlobal.has(k)) seenGlobal.set(k, [])
    seenGlobal.get(k).push({ file, title: t })
  })
}

for (const [k, hits] of seenGlobal) {
  if (new Set(hits.map((h) => h.file)).size > 1 && !CROSS_CATEGORY_ALLOW.has(k))
    errors.push(`cross-category duplicate "${k}": ${hits.map((h) => h.file).join(", ")}`)
}

// Near-duplicates (typos, alt spellings). Warning only; ignores pairs that differ only by digits (sequels).
const keys = [...seenGlobal.keys()].filter((k) => k.length >= 8)
for (let i = 0; i < keys.length; i++)
  for (let j = i + 1; j < keys.length; j++) {
    const a = keys[i], b = keys[j]
    if (a.replace(/\d/g, "") === b.replace(/\d/g, "")) continue
    if (lev(a, b) <= 2) warnings.push(`near-duplicate: "${a}" ~ "${b}"`)
  }

warnings.forEach((w) => console.warn("WARN ", w))
errors.forEach((e) => console.error("ERROR", e))
console.log(`\n${files.length} files, ${seenGlobal.size} unique titles, ${errors.length} errors, ${warnings.length} warnings`)
process.exit(errors.length ? 1 : 0)
```

Output today (abridged): 8 files, 806 unique titles, 10 errors, 9 warnings. Errors: the 2 Bollywood duplicates, the Korean `The Handmaiden` duplicate, `Amélie`, `Léon The Professional`, `Les Misérables`, and cross-category `sarkar`, `1917`, `dunkirk`, `parasite`. Warnings include `chashme buddoor ~ chashme baddoor` (real problem) and `badhaai ho ~ badhaai do`, `taare zameen par ~ sitaare zameen par` (real, distinct films; fine to ignore).

Wiring (proposed, not applied):

```jsonc
// package.json
"scripts": { "validate:titles": "node scripts/validate-titles.mjs" }
```

```yaml
# .github/workflows/validate-titles.yml
name: validate-titles
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 24 }
      - run: node scripts/validate-titles.mjs
```

---

## 5. Sources

Verification key: F = fetched and checked directly; C = cited inside a fetched Wikipedia page; S = seen only in a search result summary.

Wikipedia

- [W1] F. List of highest-grossing Hindi films: https://en.wikipedia.org/wiki/List_of_highest-grossing_Hindi_films
- [W2] F. List of highest-grossing Indian films (by-year table, 1940s to 2026): https://en.wikipedia.org/wiki/List_of_highest-grossing_Indian_films
- [W3] F. List of Hindi films of 2025 (box office table): https://en.wikipedia.org/wiki/List_of_Hindi_films_of_2025
- [W4] F. List of Hindi films of 2026 (box office table): https://en.wikipedia.org/wiki/List_of_Hindi_films_of_2026
- [W5] F. Kabhi Khushi Kabhie Gham: https://en.wikipedia.org/wiki/Kabhi_Khushi_Kabhie_Gham
- [W6] F. Jis Desh Mein Ganga Behti Hai: https://en.wikipedia.org/wiki/Jis_Desh_Mein_Ganga_Behti_Hai
- [W10] F. Korean Wave: https://en.wikipedia.org/wiki/Korean_Wave
- [W11] F. Ramayan (1987 TV series): https://en.wikipedia.org/wiki/Ramayan_(1987_TV_series)
- [W12] F. Taarak Mehta Ka Ooltah Chashmah: https://en.wikipedia.org/wiki/Taarak_Mehta_Ka_Ooltah_Chashmah
- [W13] F. CID (Indian TV series): https://en.wikipedia.org/wiki/CID_(Indian_TV_series)
- [W14] F. Money Heist: https://en.wikipedia.org/wiki/Money_Heist
- [W15] F. Suzume: https://en.wikipedia.org/wiki/Suzume
- [W16] F. List of highest-grossing animated films in India: https://en.wikipedia.org/wiki/List_of_highest-grossing_animated_films_in_India ; Mahavatar Narsimha: https://en.wikipedia.org/wiki/Mahavatar_Narsimha
- [W17] F. Doraemon: https://en.wikipedia.org/wiki/Doraemon
- [W18] F. Mirzapur (TV series): https://en.wikipedia.org/wiki/Mirzapur_(TV_series)
- [W19] F. Antakshari: https://en.wikipedia.org/wiki/Antakshari
- Also read (F): Train to Busan (India release, censored cut): https://en.wikipedia.org/wiki/Train_to_Busan ; Squid Game: https://en.wikipedia.org/wiki/Squid_Game ; Shaktimaan: https://en.wikipedia.org/wiki/Shaktimaan ; Charades (Indian language signals): https://en.wikipedia.org/wiki/Charades ; Demon Slayer: Infinity Castle (India release 12 Sep 2025): https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba_%E2%80%93_The_Movie:_Infinity_Castle

Other sources

- [S1] F. Netflix, "What India watched in 2020" (K-drama viewing up more than 370%): https://about.netflix.com/news/what-india-watched-2020
- [S2] F (headline). Koimoi, Demon Slayer: Infinity Castle India closing collection, 780% higher than Suzume: https://www.koimoi.com/box-office/demon-slayer-infinity-castle-india-box-office-closing-collection-780-higher-than-suzume-rewrites-history-how/
- [S3] S. The Hindu, Demon Slayer: Infinity Castle breaks box office records in India: https://www.thehindu.com/entertainment/movies/demon-slayer-kimetsu-no-yaiba-infinity-castle-breaks-box-office-records-india-anime-animation/article70056955.ece
- [S4] S. Desi Mauj, Ultimate Bollywood charades guide: https://desimauj.com/blog/ultimate-bollywood-charades-guide-hindi-movie-picks/
- [S5] S. Quora, useful tricks while playing dumb charades: https://www.quora.com/What-are-some-useful-tricks-while-playing-dumb-charades
- [S6] F. Indian Broadcasting World, Ormax: Mirzapur S3, Panchayat S3, Heeramandi most-watched 2024 Hindi shows; Squid Game S2 19.6M, most-watched international show: https://www.indianbroadcastingworld.com/mirzapur-s3-panchayat-s3heeramandi-most-watched-2024-hindi-shows-ormax/
- [S7] S. Chukkimane, Dumb charades rules: https://www.chukkimane.com/dumb-charades/ ; MensXP, film names for dumb charades: https://www.mensxp.com/entertainment/bollywood/155173-film-names-for-dumb-charades.html ; dumbcharadesgame.com long-title list: https://dumbcharadesgame.com/lists/long-title-bollywood-movies-dumb-charades.html
- [S8] F. Ormax Media, "It's a new record" (Farzi, 37M, most-watched Indian SVOD series at the time): https://www.ormaxmedia.com/stories/its-a-new-record.html
- [S9] S. NDTV, Ramayan sets world record: https://www.ndtv.com/entertainment/aired-again-after-33-years-ramayan-sets-world-record-see-doordarshans-tweet-2221443
- [S10] S. Economic Times, India has highest viewership of films on Netflix globally: https://m.economictimes.com/industry/media/entertainment/india-has-highest-viewership-of-films-on-netflix-globally/articleshow/79657637.cms
- [S11] S. Business Insider, Money Heist top TV show in the world (2021): https://www.businessinsider.com/netflixs-money-heist-is-top-tv-show-in-the-world-2021-9
- [S13] C. Hindustan Times, most popular Indian film of 2025 on IMDb is Chhaava (cited in [W1]): https://www.hindustantimes.com/entertainment/bollywood/most-popular-indian-film-of-2025-imdb-chhava-vicky-kaushal-500-profit-beat-sitaare-zameen-par-sikandar-kesari-chapter-101752039210942-amp.html
- [S14] Attempted, blocked (HTTP 202). IMDb Top Rated Indian Movies: https://www.imdb.com/india/top-rated-indian-movies/

Limitations: song and TV starter lists and the "editorial" missing-film list are judgement calls backed by the popularity sources above, not by per-title data. A 20-minute playtest with two friend groups would be the fastest way to validate them.
