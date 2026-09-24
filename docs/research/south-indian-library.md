# South Indian movies for Dumb Charades: research and proposed library

Scope: replace the current `tollywood.ts` (41) and `kollywood.ts` (40) lists with titles a Hindi-speaking urban group (20s to 40s) will actually recognise and can act out. Same filters as `docs/bollywood-charades-movies-research.md` (Rule A multi-word concrete titles, Rule B strict single-word gate, Rule C no bare numbers, no redundant sequels, no obscure films), plus one extra filter for this category: the film must have reached the Hindi belt.

Research date: 2026-09-24. No files under `lib/` or `components/` were changed.

---

## 1. Sources

Box office (what reached the whole country):

1. List of highest-grossing Indian films, Wikipedia. https://en.wikipedia.org/wiki/List_of_highest-grossing_Indian_films . Of the all-India top 50, 20 are South Indian: Baahubali 2 (#3), Pushpa 2 (#4), RRR (#6), KGF: Chapter 2 (#7), Kalki 2898 AD (#10), Kantara: Chapter 1 (#15), 2.0 (#18), Salaar (#21), Jailer (#22), Baahubali: The Beginning (#23), Leo (#24), Coolie (#30), Ponniyin Selvan: I (#31), The Greatest of All Time (#37), Saaho (#38), Vikram (#39), Kantara (#42), Adipurush (#46, Hindi/Telugu), Devara: Part 1 (#49), Pushpa: The Rise (#50).
2. List of highest-grossing Telugu films, Wikipedia. https://en.wikipedia.org/wiki/List_of_highest-grossing_Telugu_films . Top 10 worldwide: Baahubali 2, Pushpa 2, RRR, Kalki 2898 AD, Salaar, Baahubali: The Beginning, Saaho, Adipurush, Devara, Pushpa. Also lists Hanu-Man (#13), Ala Vaikunthapurramuloo (#16), Magadheera (#32), Gabbar Singh (#34), Vakeel Saab (#42).
3. List of highest-grossing Tamil films, Wikipedia. https://en.wikipedia.org/wiki/List_of_highest-grossing_Tamil_films . Top 10: 2.0, Jailer, Leo, Coolie, Ponniyin Selvan: I, The Greatest of All Time, Vikram, Ponniyin Selvan: II, Amaran, Jana Nayagan. Also Kabali, Bigil, Enthiran, Master, Beast, Dasavathaaram, Vishwaroopam.
4. List of highest-grossing Malayalam films, Wikipedia. https://en.wikipedia.org/wiki/List_of_highest-grossing_Malayalam_films . Top entries: Bethlehem Kudumba Unit, Lokah Chapter 1: Chandra, L2: Empuraan, Manjummel Boys, Drishyam 3, Thudarum, Vaazha II, 2018, The Goat Life, Aavesham. The Manjummel Boys article adds that it was the first Malayalam film past Rs 200 crore: https://en.wikipedia.org/wiki/Manjummel_Boys
5. List of highest-grossing Kannada films, Wikipedia. https://en.wikipedia.org/wiki/List_of_highest-grossing_Kannada_films . Top 10: KGF: Chapter 2, Kantara: Chapter 1, Kantara, Toxic, KGF: Chapter 1, Vikrant Rona, James, Su From So, 777 Charlie, Kurukshetra. The second table ranks films by gross outside Karnataka (KGF 2, Kantara: Chapter 1, Toxic, Vikrant Rona lead), which is a decent proxy for Hindi-belt reach.
6. Pan-Indian film, Wikipedia. https://en.wikipedia.org/wiki/Pan-Indian_film . Defines the multi-language simultaneous release model and credits the Baahubali duology (2015, 2017) with starting it. Also notes Drishyam as the standard example of a film remade across languages.

Hindi dubbing on TV and YouTube (how pre-2015 films reached the north):

7. Goldmines Telefilms, Wikipedia. https://en.wikipedia.org/wiki/Goldmines_Telefilms . Founded 2000 by Manish Shah. Its first dub, the Telugu film Mass, aired in 2007 as "Meri Jung: One Man Army" and got TRPs above 1 on Sony Max. YouTube channel launched 2013 with 32.9 billion views as of Sep 2026. Distributed the Hindi version of Pushpa: The Rise in 2021. Notes also show that TV dubs get generic Hindi titles ("Khatarnak Khiladi" for Mirchi, "DJ: Dangerous Jaanbaaz" for Duvvada Jagannadham, "Dangerous Khiladi 5" for Endukante Premanta).
8. Sarrainodu, Wikipedia. https://en.wikipedia.org/wiki/Sarrainodu . Hindi dub released on YouTube by Goldmines on 28 May 2017 under the same title.
9. K.G.F: Chapter 1, Wikipedia. https://en.wikipedia.org/wiki/K.G.F:_Chapter_1 . Hindi version released the day after Kannada, distributed by Excel Entertainment and AA Films, with a Hindi-only "Gali Gali" song featuring Mouni Roy.

Hindi release titles that differ from the original:

10. Eega, Wikipedia. https://en.wikipedia.org/wiki/Eega . Hindi version titled "Makkhi", released 12 October 2012.
11. Enthiran, Wikipedia. https://en.wikipedia.org/wiki/Enthiran . Title means "Robot"; the Hindi version is "Robot".
12. Sivaji (film), Wikipedia. https://en.wikipedia.org/wiki/Sivaji_(film) . Full title "Sivaji: The Boss", dubbed into Hindi under that name.
13. Indian (1996 film), Wikipedia. https://en.wikipedia.org/wiki/Indian_(1996_film) . Partly reshot in Hindi as "Hindustani", released 23 August 1996.
14. Anniyan, Wikipedia. https://en.wikipedia.org/wiki/Anniyan . Hindi version "Aparichit". It flopped in theatres (Rs 2.1 crore), but Vikram said it brought him recognition "in remote corners" of the country, which matches its long TV run.
15. Kadhalan, Wikipedia. https://en.wikipedia.org/wiki/Kadhalan . Dubbed in Hindi as "Humse Hai Muqabala".

Hindi remakes (films the north knows through a Bollywood version):

16. Category: Hindi remakes of Telugu films. https://en.wikipedia.org/wiki/Category:Hindi_remakes_of_Telugu_films . Includes Kabir Singh, Wanted, Ready, Rowdy Rathore, Simmba, Kick, Tevar, Son of Sardaar, Jersey (2022), HIT: The First Case, Chatrapathi (2023), Judwaa, Baaghi.
17. Category: Hindi remakes of Tamil films. https://en.wikipedia.org/wiki/Category:Hindi_remakes_of_Tamil_films . Includes Ghajini, Holiday, Bholaa, Baby John, Kisi Ka Bhai Kisi Ki Jaan, Laxmii, Force, Gabbar Is Back, Rehnaa Hai Terre Dil Mein, Saathiya, Nayak, Biwi No.1.
18. Category: Hindi remakes of Malayalam films. https://en.wikipedia.org/wiki/Category:Hindi_remakes_of_Malayalam_films . Includes Drishyam, Drishyam 2, Bhool Bhulaiyaa, Hera Pheri, Hungama, Bhagam Bhag, Bodyguard, Garam Masala, Billu Barber, Selfiee (from Driving Licence), Traffic (2016), Mrs. (from The Great Indian Kitchen).
19. Category: Tamil films remade in other languages. https://en.wikipedia.org/wiki/Category:Tamil_films_remade_in_other_languages . Confirms Kaithi, Asuran, Kanchana, Ghajini and Baashha as widely remade source films.

A limit worth stating: there is no public, audited ranking of "most-watched Hindi-dubbed South films". YouTube view counts change daily and are split across re-uploads. I used dubbing evidence only to confirm that a film reached Hindi audiences, never to rank it.

---

## 2. Which South films Hindi-belt groups actually know

Five channels bring a South film into a Hindi-speaking friend group. Ordered from strongest to weakest recognition:

1. Pan-India theatrical releases (2015 onward) with a same-day Hindi version. Baahubali 1 and 2, KGF 1 and 2, RRR, Pushpa 1 and 2, Kantara, Kantara: Chapter 1, Kalki 2898 AD, Salaar, Saaho, 2.0, Jailer, Leo, Vikram, Hanu-Man, Karthikeya 2, Devara. These are safe for anyone in the 20 to 40 range.
2. OTT breakouts in Hindi dub or subtitles, mostly 2020 onward. Manjummel Boys, Premalu, Aavesham, Minnal Murali, Jai Bhim, Maharaja, Sita Ramam, Kaithi, Vikram Vedha, Lucky Baskhar, Amaran, The Great Indian Kitchen, Kumbalangi Nights. Urban groups know these better than TV staples.
3. Older Hindi-dubbed theatrical releases of big-name films. Roja, Bombay, Hindustani (Indian), Humse Hai Muqabala (Kadhalan), Jeans, Robot (Enthiran), Sivaji: The Boss, Makkhi (Eega), Aparichit (Anniyan), Magadheera. The 30 to 40 end of the group knows these well.
4. Hindi TV and YouTube dubs (Goldmines, Sony Max, Dhinchaak). Huge reach, but mostly in tier 2 and 3 towns, and under generic Hindi titles. Film titles from this channel only work in charades when the original title is itself a common word (Mass, Rebel, Temper, Mirchi, Businessman, Spyder, Darling).
5. Hindi remakes. The north knows Wanted, Kabir Singh, Ghajini, Drishyam, Bhool Bhulaiyaa, Hera Pheri, Holiday, Bholaa. Most of these are already in `bollywood.ts`. The originals (Pokiri, Thuppakki, Manichitrathazhu, Ramji Rao Speaking) are not known by name, so they stay out. Exceptions: when the original is famous in its own right (Arjun Reddy, Vikram Vedha, Kaithi, Jersey).

The current lists mostly ignore these channels. Titles such as Thirupachi, Aarambam, Vedalam, Dookudu and Attarintiki Daredi are big hits in their home states but reached the north only as generically renamed TV dubs, so nobody in the room knows the original name.

---

## 3. How titles should be presented

Rule: **print the title Hindi-belt audiences saw on the poster. If the original differs and is also known, add it in parentheses.** The card is only shown to the actor, so the parenthetical costs nothing during play and settles arguments ("they said Makkhi, the card says Eega, does it count?").

Details:

1. Pan-India films released under one title in all languages keep that title: `Baahubali`, `Kantara`, `Jailer`, `Leo`.
2. When a nationally marketed Hindi title differs, use `Hindi Title (Original)`: `Makkhi (Eega)`, `Robot (Enthiran)`, `Hindustani (Indian)`, `Aparichit (Anniyan)`, `Humse Hai Muqabala (Kadhalan)`, `Vishwaroop (Vishwaroopam)`, `Hi Papa (Hi Nanna)`. The same format covers the reverse case where the English title is the known one: `The Goat Life (Aadujeevitham)`.
3. Never use generic TV or YouTube dub titles (Dangerous Khiladi 5, The Return of Rebel, Khatarnak Khiladi). They are interchangeable and nobody remembers which film they belong to. Use the original title if it is a common word, else drop the film.
4. Do not put the English meaning inside the title string. "Eega = fly" is an acting tip, not the answer. Meanings live in the tables in section 6 of this doc only; the app has no hints by design.
5. Drop marketing subtitles unless they separate two films in the list: `Salaar`, `Devara`, `Pushpa 2` (not "Pushpa 2: The Rule"). Keep them where needed: `KGF: Chapter 1`, `KGF: Chapter 2`, `Kantara: Chapter 1`.
6. Do not add the South original of a film the north only knows via its Hindi remake. The remake is already in `bollywood.ts`.
7. ASCII only. `Hanu-Man`, not the stylised form; `Sivaji: The Boss`.

---

## 4. Separate Tollywood and Kollywood toggles, or one South Indian category?

Recommendation: **merge into one "South Indian" category covering Telugu, Tamil, Malayalam and Kannada.**

Reasons:

1. Hindi-speaking players do not sort these films by language. Baahubali was shot in Telugu and Tamil. Kantara and KGF are Kannada, but most players could not name the language. A toggle that asks "Tollywood or Kollywood?" makes the player do homework the game does not need.
2. The recognisable pool per industry is small. After filtering, Tamil gives about 37 titles, Malayalam about 21 and Kannada 14. With the current `getRandomMovie` (uniform random, no history), a 14-title Kannada toggle repeats within a few rounds. A merged pool of about 120 behaves like the other categories.
3. Malayalam and Kannada currently have no home at all, yet they produced several of the most-recognised recent films (KGF, Kantara, Manjummel Boys, Drishyam). Adding two more tiny toggles would clutter `game-setup.tsx`.
4. The industry split is still kept as `//` comment groups in the array, so re-splitting later is a copy-paste job.

Implementation notes for whoever makes the code change (not done here):

- Create `lib/movies/south-indian.ts` exporting `southIndianMovies`, then in `lib/movies/index.ts` replace the `tollywood` and `kollywood` keys with `south` (label "South Indian").
- Other files that mention the old keys: `components/game-setup.tsx`, `app/layout.tsx`, `app/manifest.json`. If selected categories are persisted anywhere, map old `tollywood` or `kollywood` values to `south`.
- Remove `"Baahubali 2: The Conclusion"` from `bollywood.ts`. It is a Telugu film and it would duplicate `Baahubali 2` here.
- Make `getMoviesByCategories` de-duplicate (for example with a `Set`), in case a title lands in two lists later.
- Deliberately left out because the identical string already exists in `bollywood.ts`: `Drishyam` (the Malayalam original; the Hindi remake card plays the same), `Sarkar` (Tamil, clashes with RGV's Sarkar), `Coolie` (Tamil 2025, clashes with the 1983 Coolie), `Kick` and `Baadshah` (Telugu, clash with the Salman and SRK films).

---

## 5. Verdicts on the 81 current titles

Totals: 27 KEEP, 54 DROP. "Keep" can include a title change under the rule in section 3.

### 5.1 `tollywood.ts` (41): 14 keep, 27 drop

| Current title | Verdict | Reason for drop / note |
|---|---|---|
| Baahubali | KEEP | Pan-India, #23 all-India |
| Baahubali 2 | KEEP | #3 all-India |
| RRR | KEEP | #6 all-India; Naatu Naatu step |
| Eega | KEEP | Rename to `Makkhi (Eega)`, the Hindi release title |
| Magadheera | KEEP | Old Hindi-dub staple; horse leap and 100 warriors scene |
| Arjun Reddy | KEEP | Known on its own and via Kabir Singh |
| Rangasthalam | DROP | Never reached the north; one Telugu word with no mime |
| Ala Vaikunthapurramuloo | DROP | Songs are known, but nobody can say or mime the title |
| Pushpa | KEEP | Chin swipe and "jhukega nahi" |
| Pushpa 2 | KEEP | #4 all-India |
| Srimanthudu | DROP | Unknown by name in the north |
| Athadu | DROP | Unknown by name in the north |
| Okkadu | DROP | Hindi groups know the remake, Tevar |
| Pokiri | DROP | Hindi groups know the remake, Wanted (already in Bollywood list) |
| Dookudu | DROP | Unknown by name in the north |
| Sye | DROP | Unknown by name in the north |
| Jalsa | DROP | Unknown by name in the north |
| Gabbar Singh | KEEP | Two Hindi words; Sholay pose gets it instantly |
| Attarintiki Daredi | DROP | Long Telugu phrase, no mime |
| S/O Satyamurthy | DROP | Unknown by name in the north |
| Ninnu Kori | DROP | Unknown by name in the north |
| Geetha Govindam | DROP | Song is known, title is not |
| Fidaa | DROP | Abstract word (Rule C), low recognition |
| Jersey | KEEP | Same title as the 2022 Hindi remake; pull on a jersey |
| Majili | DROP | Unknown by name in the north |
| Sarileru Neekevvaru | DROP | Long Telugu phrase, no mime |
| Akhanda | DROP | Known mostly through memes; abstract word |
| Krack | DROP | Low recognition outside Andhra and Telangana |
| Uppena | DROP | Unknown by name in the north |
| Vakeel Saab | KEEP | Hindi words (lawyer + sir); Pink remake |
| DJ Tillu | DROP | Low recognition; "DJ" slot goes to Duvvada Jagannadham |
| Karthikeya 2 | KEEP | 2022 Hindi-version sleeper hit; Krishna flute + 2 |
| Sita Ramam | KEEP | Hindi dub and OTT hit; Sita + Ram |
| HIT | DROP | Bare acronym; the Hindi remake is the better-known version |
| Jathi Ratnalu | DROP | Unknown by name in the north |
| Colour Photo | DROP | Easy to mime, but a Telugu OTT film nobody up north has seen |
| C/O Kancharapalem | DROP | Unknown by name in the north |
| Pelli Choopulu | DROP | Unknown by name in the north |
| Arjun Suravaram | DROP | Unknown by name in the north |
| Nani's Gang Leader | DROP | Low recognition; odd possessive title |
| Saaho | KEEP | Pan-India, Telugu/Hindi release, #38 all-India |

### 5.2 `kollywood.ts` (40): 13 keep, 27 drop

| Current title | Verdict | Reason for drop / note |
|---|---|---|
| Baasha | DROP | Rajini legend in the South, little recognition in the north; name only |
| Sivaji | KEEP | Rename to `Sivaji: The Boss`, the Hindi title; coin flip, bald look |
| Enthiran | KEEP | Rename to `Robot (Enthiran)`, the Hindi title |
| 2.0 | KEEP | #18 all-India; Robot sequel |
| Vikram | KEEP | #39 all-India |
| Ponniyin Selvan | DROP | Recognised, but no mime hook and a long Tamil title |
| Ponniyin Selvan 2 | DROP | Redundant sequel |
| Kaala | KEEP | Hindi word (black) |
| Thuppakki | DROP | Hindi groups know the remake, Holiday |
| Mersal | DROP | Unknown by name in the north |
| Bigil | DROP | Unknown by name; nobody knows it means whistle |
| Master | KEEP | English word |
| Beast | KEEP | English word |
| Varisu | DROP | Unknown by name in the north |
| Leo | KEEP | English word, #24 all-India |
| Kaithi | KEEP | Sounds like Hindi "qaidi"; LCU origin; remade as Bholaa |
| Viswasam | DROP | Unknown by name in the north |
| Sarkar | DROP | Exact duplicate of RGV's Sarkar in `bollywood.ts` |
| Kabali | KEEP | "Kabali da" poster pose is widely known |
| Petta | DROP | Unknown by name in the north |
| Darbar | KEEP | Hindi word (royal court) |
| Annaatthe | DROP | Unknown by name in the north |
| Valimai | DROP | Unknown by name in the north |
| Thunivu | DROP | Unknown by name in the north |
| Vedalam | DROP | Unknown by name in the north |
| Veeram | DROP | Hindi groups know the remake, Kisi Ka Bhai Kisi Ki Jaan |
| Mankatha | DROP | Unknown by name in the north |
| Aarambam | DROP | Unknown by name in the north |
| Yennai Arindhaal | DROP | Long Tamil phrase, no mime |
| Vettaikaaran | DROP | Unknown by name in the north |
| Ghilli | DROP | Unknown by name in the north |
| Thirupachi | DROP | Unknown by name in the north |
| Pokkiri | DROP | Same story as Pokiri and Wanted; unknown by name |
| Kaththi | DROP | Unknown by name; nobody knows it means knife |
| Theri | DROP | Hindi groups know the remake, Baby John |
| Asuran | KEEP | Hindi-known word (demon); National Award winner |
| Karnan | DROP | Low recognition in the north |
| Soorarai Pottru | DROP | Hindi groups know the remake, Sarfira; title cannot be mimed |
| Jai Bhim | KEEP | Hindi phrase; Prime Video Hindi dub was big |
| 96 | DROP | Bare number (Rule C) |

---

## 6. The new catalog (120 titles)

Tier A: nearly everyone in a Hindi-speaking urban group knows it. Tier B: most of the group knows it, or the title is an everyday Hindi or English word that can be guessed from the mime alone. Rule B from the Bollywood doc says a common-word title plays well even for people who have not seen the film, so Tier B leans on those.

### 6.1 Telugu (48)

| Title | Tier | Why it is in / acting cue |
|---|---|---|
| Baahubali | A | Lifting a Shivling onto the shoulder |
| Baahubali 2 | A | Same pose + 2 fingers; "Why did Kattappa kill Baahubali" |
| RRR | A | Three R hand signs; Naatu Naatu step |
| Pushpa | A | Chin swipe with the back of the hand |
| Pushpa 2 | A | Chin swipe + 2 |
| Kalki 2898 AD | A | Vishnu's tenth avatar on a horse + numbers |
| Salaar | A | Hindi/Urdu for commander; #21 all-India |
| Saaho | A | Prabhas pan-India; bike and sky-diving action |
| Devara | A | Jr NTR pan-India, #49 all-India; sea and boats |
| Makkhi (Eega) | A | Buzzing fly, rubbing front legs |
| Magadheera | A | Leaping horse; fighting 100 soldiers |
| Arjun Reddy | A | Angry doctor, cigarette, "Arjun" archer mime |
| Hanu-Man | A | Hanuman flying pose; 2024 Hindi hit |
| Karthikeya 2 | A | Krishna flute + 2 |
| Sita Ramam | A | Sita + Ram, writing a letter |
| Adipurush | B | Telugu/Hindi bilingual, #46 all-India; Ram drawing a bow |
| Radhe Shyam | B | Radha + Krishna; Prabhas palm reading |
| Liger | B | Lion + tiger mashed together; Telugu/Hindi release |
| Major | B | Salute; Telugu/Hindi 26/11 biopic |
| The Ghazi Attack | B | Telugu/Hindi submarine film; periscope + attack |
| Dasara | B | Dussehra, burning a Ravan effigy |
| Game Changer | B | English words: board game + change |
| The RajaSaab | B | Hindi words: crown + "saab" |
| They Call Him OG | B | English words; "OG" as original gangster |
| Hi Papa (Hi Nanna) | B | Wave hello + dad; Hindi release title "Hi Papa" |
| Kushi | B | Hindi-known word khushi (happy) |
| Lucky Baskhar | B | "Lucky" is English; Netflix hit |
| Tiger Nageswara Rao | B | Tiger roar; pan-India release |
| Gabbar Singh | B | Sholay's Gabbar pose |
| Vakeel Saab | B | Lawyer's gown + "saab" |
| Jersey | B | Pulling on a cricket jersey |
| Shiva | B | Nagarjuna's cycle-chain fight; RGV also made it in Hindi |
| DJ | B | Scratching turntables |
| Businessman | B | English word; Mahesh Babu Hindi-dub staple |
| Temper | B | English word; losing your temper |
| Mirchi | B | Hindi word (chilli) |
| Rebel | B | English word |
| Darling | B | English word |
| Mr. Perfect | B | English words; OK sign |
| Spyder | B | Spider crawling |
| Dhamaka | B | Hindi word (blast) |
| Khaidi No. 150 | B | "Khaidi" sounds like qaidi (prisoner) + 1-5-0 |
| Yamadonga | B | Yamraj with buffalo horns + thief |
| Chatrapathi | B | Chhatrapati Shivaji pose; remade in Hindi in 2023 |
| Mass | B | English word; first Goldmines Hindi TV dub (2007) |
| Legend | B | English word; Balayya meme fame |
| Simha | B | Hindi/Sanskrit for lion |
| Bheeshma | B | Mahabharata Bhishma on a bed of arrows |

### 6.2 Tamil (37)

| Title | Tier | Why it is in / acting cue |
|---|---|---|
| Robot (Enthiran) | A | Robot walk |
| 2.0 | A | Robot walk + "2 point 0" |
| Sivaji: The Boss | A | Flipping a coin; bald "Mottai Boss" |
| Vikram | A | Kamal with a big gun; Vikram-Betaal story |
| Jailer | A | English word; Rajini walking with sunglasses |
| Leo | A | English word (lion) |
| Master | A | English word; teacher at a blackboard |
| Beast | A | English word |
| Kaithi | A | Prisoner in handcuffs (sounds like qaidi) |
| Vikram Vedha | A | Vikram-Betaal: ghost on a king's back |
| Kabali | A | "Kabali da" suit-and-beard pose |
| Jai Bhim | A | Raised fist salute |
| Maharaja | A | Hindi word (king); Netflix hit |
| Hindustani (Indian) | A | Hindi release title; Indian flag |
| Roja | A | Hindi-dub classic; smelling a rose |
| Bombay | A | Hindi-dub classic; city name |
| Aparichit (Anniyan) | A | Hindi release title; three personalities |
| Kaala | B | Hindi word (black) |
| Darbar | B | Hindi word (royal court) |
| Vettaiyan | B | Rajini + Amitabh; "hunter" |
| Asuran | B | Hindi-known word (demon) |
| Amaran | B | Soldier biopic; sounds like "amar" (immortal) |
| The Greatest of All Time | B | English words, one by one |
| Good Bad Ugly | B | English words: thumbs up, thumbs down, face pull |
| Captain Miller | B | English "Captain" salute |
| Sardar | B | Hindi word (chief) |
| Doctor | B | Stethoscope |
| Love Today | B | English words: heart + point at watch |
| Raja Rani | B | Hindi words: king + queen |
| Ratsasan | B | Sounds like rakshas (demon); OTT thriller hit |
| Kanchana | B | Possessed man in a saree; Hindi TV horror-comedy staple, remade as Laxmii |
| Chandramukhi | B | Moon face; "lakalakalaka" |
| Dasavathaaram | B | Ten fingers + avatar (Kamal's 10 roles) |
| Vishwaroop (Vishwaroopam) | B | Hindi release title; Krishna's cosmic form |
| Jeans | B | English word; pulling on jeans |
| Humse Hai Muqabala (Kadhalan) | B | Hindi release title; "Muqabla" dance |
| Pizza | B | English word; slicing a pizza |

### 6.3 Malayalam (21)

| Title | Tier | Why it is in / acting cue |
|---|---|---|
| Manjummel Boys | A | Group of boys; one falls into a cave, rope rescue |
| Premalu | A | "Prem" is love; Hindi-dub theatrical release |
| Aavesham | A | Hindi word aavesh (rage); Ranga's gangster swagger |
| Minnal Murali | A | Lightning superhero pose |
| The Goat Life (Aadujeevitham) | A | Goat + life; #9 Malayalam |
| Lucifer | B | English word; devil horns |
| Marco | B | Marco Polo game; Hindi version did well |
| Lokah Chapter 1: Chandra | B | #2 Malayalam; "Chandra" is moon |
| Premam | B | "Prem" is love |
| Bangalore Days | B | City + days |
| Kumbalangi Nights | B | "Nights" is English |
| Hridayam | B | Hindi-known word hriday (heart) |
| The Great Indian Kitchen | B | English words; remade in Hindi as Mrs. |
| Driving Licence | B | English words; remade in Hindi as Selfiee |
| Traffic | B | English word; remade in Hindi (2016) |
| Mumbai Police | B | City + police salute |
| Jallikattu | B | Bull-taming, a known word |
| Malik | B | Hindi word (owner) |
| Ustad Hotel | B | Hindi words: ustad + hotel |
| Pulimurugan | B | Mohanlal fighting a tiger |
| Kishkindha Kaandam | B | Ramayana monkey kingdom |

### 6.4 Kannada (14)

| Title | Tier | Why it is in / acting cue |
|---|---|---|
| KGF: Chapter 1 | A | Rocky's hammer; gold mine |
| KGF: Chapter 2 | A | #7 all-India; "violence, violence, violence" |
| Kantara | A | Bhoota Kola dance and roar |
| Kantara: Chapter 1 | A | #15 all-India |
| 777 Charlie | B | Three sevens + a dog |
| Toxic | B | English word; #4 Kannada |
| Vikrant Rona | B | Sudeep pan-India 3D release |
| Pailwaan | B | Hindi word pehlwan (wrestler) |
| Kabzaa | B | Hindi word (occupation, grab) |
| Bagheera | B | Jungle Book panther |
| Kurukshetra | B | Mahabharata battlefield; #10 Kannada |
| Kirik Party | B | "Party" is English |
| U Turn | B | Drawing a U-turn in the air |
| Lucia | B | Kannada crowd-funded cult hit; name only, weakest pick |

---

## 7. Ready-to-paste TypeScript

One merged array, as recommended in section 4. ASCII only, no duplicates inside the array, and no exact duplicates of any string in `bollywood.ts`. Count: 48 Telugu + 37 Tamil + 21 Malayalam + 14 Kannada = 120 titles.

```ts
export const southIndianMovies = [
  // --- TELUGU ---
  "Baahubali",
  "Baahubali 2",
  "RRR",
  "Pushpa",
  "Pushpa 2",
  "Kalki 2898 AD",
  "Salaar",
  "Saaho",
  "Devara",
  "Makkhi (Eega)",
  "Magadheera",
  "Arjun Reddy",
  "Hanu-Man",
  "Karthikeya 2",
  "Sita Ramam",
  "Adipurush",
  "Radhe Shyam",
  "Liger",
  "Major",
  "The Ghazi Attack",
  "Dasara",
  "Game Changer",
  "The RajaSaab",
  "They Call Him OG",
  "Hi Papa (Hi Nanna)",
  "Kushi",
  "Lucky Baskhar",
  "Tiger Nageswara Rao",
  "Gabbar Singh",
  "Vakeel Saab",
  "Jersey",
  "Shiva",
  "DJ",
  "Businessman",
  "Temper",
  "Mirchi",
  "Rebel",
  "Darling",
  "Mr. Perfect",
  "Spyder",
  "Dhamaka",
  "Khaidi No. 150",
  "Yamadonga",
  "Chatrapathi",
  "Mass",
  "Legend",
  "Simha",
  "Bheeshma",

  // --- TAMIL ---
  "Robot (Enthiran)",
  "2.0",
  "Sivaji: The Boss",
  "Vikram",
  "Jailer",
  "Leo",
  "Master",
  "Beast",
  "Kaithi",
  "Vikram Vedha",
  "Kabali",
  "Jai Bhim",
  "Maharaja",
  "Hindustani (Indian)",
  "Roja",
  "Bombay",
  "Aparichit (Anniyan)",
  "Kaala",
  "Darbar",
  "Vettaiyan",
  "Asuran",
  "Amaran",
  "The Greatest of All Time",
  "Good Bad Ugly",
  "Captain Miller",
  "Sardar",
  "Doctor",
  "Love Today",
  "Raja Rani",
  "Ratsasan",
  "Kanchana",
  "Chandramukhi",
  "Dasavathaaram",
  "Vishwaroop (Vishwaroopam)",
  "Jeans",
  "Humse Hai Muqabala (Kadhalan)",
  "Pizza",

  // --- MALAYALAM ---
  "Manjummel Boys",
  "Premalu",
  "Aavesham",
  "Minnal Murali",
  "The Goat Life (Aadujeevitham)",
  "Lucifer",
  "Marco",
  "Lokah Chapter 1: Chandra",
  "Premam",
  "Bangalore Days",
  "Kumbalangi Nights",
  "Hridayam",
  "The Great Indian Kitchen",
  "Driving Licence",
  "Traffic",
  "Mumbai Police",
  "Jallikattu",
  "Malik",
  "Ustad Hotel",
  "Pulimurugan",
  "Kishkindha Kaandam",

  // --- KANNADA ---
  "KGF: Chapter 1",
  "KGF: Chapter 2",
  "Kantara",
  "Kantara: Chapter 1",
  "777 Charlie",
  "Toxic",
  "Vikrant Rona",
  "Pailwaan",
  "Kabzaa",
  "Bagheera",
  "Kurukshetra",
  "Kirik Party",
  "U Turn",
  "Lucia",
]
```

If you decide to keep separate toggles after all, split the array at the `// ---` comments into `teluguMovies`, `tamilMovies`, `malayalamMovies` and `kannadaMovies`. I would still not ship Malayalam or Kannada as standalone toggles at 21 and 14 titles.

---

## 8. Open questions and weak spots

- Tier B Telugu word titles (Rebel, Darling, Mr. Perfect, Legend, Simha, Mass) are in because they are guessable words and were Hindi TV staples. Urban players may not know the films. Drop them first if the list feels padded.
- `Lucia`, `Pizza` and `Kirik Party` are the weakest picks for recognition.
- 2025 and 2026 releases (Toxic, The RajaSaab, They Call Him OG, Lokah, Kantara: Chapter 1) have strong grosses but little time in the culture yet. Revisit in a year.
- The Hindi titles `Hi Papa` (Hi Nanna) and `Pehlwaan` (Pailwaan) are from memory, not re-checked against a source in this pass. `Pailwaan` is kept under its original name for that reason.
