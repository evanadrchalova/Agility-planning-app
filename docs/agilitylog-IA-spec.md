# AgilityLog — Informační architektura a produkční specifikace

*Výstup z IA workshopu pro design fázi (Sonnet). Květen 2026.*
*Předchozí dokument: `agility-app-brief.md` (product brief). Tento dokument navazuje a rozšiřuje IA, datový model, scénáře a screen inventory.*

> **Poznámka k jazyku:** Microcopy v tomto dokumentu je psaná česky pro srozumitelnost při review, ale **finální appka je EN-only pro MVP**. Sonnet bude microcopy řešit v angličtině. Příklady jsou ilustrativní — jde o tone, ne o doslovný překlad. Pro budoucí překlady je klíčové, aby appka byla od začátku stavěná s **i18n architekturou** (translation keys, ne hardcoded stringy, locale-aware date/number formatting).

---

## 1. Stručný přehled

**AgilityLog** je mobile-first tréninkový deník a plánovací nástroj pro handlery v dog agility. Kombinuje strukturovaný zápis, dlouhodobé plánování s mikrokroky a sofistikovanou analytiku v podobě, která dává běžnému závodníkovi pocit, že pracuje jako profík.

**Klíčové product diferenciátory:**

- **Plánováno vs. realita compare.** Appka jasně ukazuje shodu mezi plánovaným a skutečně provedeným, neutrálně a bez stresu. Jediná appka v segmentu, která to dělá.
- **Hlasový vstup v autě cestou z tréninku.** Handler diktuje analýzu se zamčenou obrazovkou. Killer use case, který odstraní hlavní pain point (zápis večer = zapomenuté detaily).
- **Mikrokroky → Skills loop.** Dlouhodobé cíle se rozpadají na mikrokroky, ty se hází do kalendáře jako bloky, po dokončení automaticky doplňují skill set psa. Vizuálně progress + motivační smyčka.

**Brand voice:** Jemný průvodce, ne bič. Slogan směr: *„Malými krůčky k velkým úspěchům."* Appka motivuje, neztreslí, podporuje vztah handler–pes namísto výkonnostního tlaku.

---

## 2. Cílová skupina

### Primární persona — Závodní handler

- 1–2 psi, závodí pravidelně (víkendové závody přibližně 1× za 14 dní).
- Pevná týdenní kostra: po (pauza po závodě) / út (větší trénink sama, hala) / st (kombinace plavání + procházka + fitko) / čt (střední trénink s trenérem) / pá (fitko + procházka) / víkend (závody nebo intenzivka).
- Kombinuje samostatné tréninky doma a v hale + tréninky s trenérem (typicky 1× týdně).
- Aktuální setup je roztříštěný: Figma na dlouhodobý plán, Google Kalendář na závody, papírový sešit na týdenní plán. Píše večer, polovinu zapomene, není důsledná.
- V autě cestou z tréninku má klid, přemýšlí o tréninku, často diktuje hlasové zprávy → ideální moment pro voice vstup.
- Týdně si jednou sedne a plánuje příští týden.

### Pain points

- Nedůslednost zápisu (večer zapomene polovinu).
- Roztříštěnost mezi 3+ nástroji.
- Žádná analytika ani compare s plánem.
- Postupové zkoušky se počítají v hlavě nebo na papíře.
- Nemá strukturovaný systém pro mikrokroky a skill development.

### Sekundární persona — Rekreační handler (Basic plán)

- Méně časté tréninky, žádné závody.
- Nepotřebuje analytiku závodů, ale chce strukturu pro tréninkový deník a plán.

### Budoucí persona — Trenér s týmem svěřenců

- V2, Trainer plán nad PRO. V architektuře dokumentu zatím jen jako kotva, ne v MVP.

---

## 3. Produkční principy

- **Mobile first.** iOS + Android primární. Desktop/web sekundární — viz sekce „Platformy".
- **Pes jako kontext.** Aplikace nemá globální switcher psa, do psa se vstupuje a všechno je uvnitř něj. Cross-pes funkce (settings, reporty, billing) žijí v drawer „Já".
- **Single-dog primary.** Optimalizace pro 1 psa, multi-dog secondary use case ošetřený overlay v kalendáři (V2 plné cross-pes views).
- **Jemný průvodce.** Default = 1 notifikace denně, vše ostatní opt-in. Žádné deadliny, žádné guilt-tripping, pozitivní framing celebračních momentů.
- **Plán → Kalendář → Záznamy je jedna smyčka.** Plán generuje bloky v kalendáři, bloky předvyplní zápis tréninku, zápisy zpětně potvrdí splnění plánu (s explicitním souhlasem handlera, žádná tichá magie).
- **Offline-first hlasový vstup.** Voice flow musí fungovat offline a se zamčenou obrazovkou.
- **Soft lock po expiraci trialu.** Read-only všechno, paywall na všech přidávacích flow. Žádný downgrade, žádný omezený free režim, který by rozsekal statistiky.
- **Postupové zkoušky = manuální kategorie.** Cross-country komplikace (různé systémy postupovek FCI/UKI/AKC, někde zvlášť jumping, jinde požadavek obedience před startem) řešíme tím, že **strukturu postupovek nemodelujeme**. Handler si ručně píše svou aktuální kategorii volným textem a sám ji aktualizuje, když se posune. Race entry zůstává s otázkou „Splněna postupovka?" pro celebraci, ale nic se neauto-aktualizuje.

---

## 4. Platformy

**MVP = mobile only** (iOS + Android, React Native nebo Flutter — viz Open tech questions).

**V1.5 = desktop / web companion**, primárně pro:
- Týdenní/měsíční plánování (větší kalendář, pohodlnější drag & drop).
- Reporty a větší analytické přehledy.
- Editaci dlouhých textů (custom kolonky, popisy cílů).

**Mimo desktop scope:** Voice flow (zůstává mobile-only), zápis tréninku (možný i na desktop, ale ne primární), závodní zápis (mobile primární — typicky se zapisuje večer na hotelu v telefonu).

**Co znamená pro MVP:** Sonnet designuje **jen mobilní obrazovky**. Desktop layout řešíme později.

---

## 5. Informační architektura

### 5.1 Top-level navigace

```
[Splash / Auth]
   │
   ├─ [Onboarding flow] (první spuštění)
   │
[Dashboard] ←─── home screen
   │
   ├─ Karta psa #1 ──→ [Detail psa]
   ├─ Karta psa #2 ──→ [Detail psa]
   ├─ … (až N psů)
   ├─ [+ Přidat psa]
   │
   └─ Avatar/iniciálka v rohu ──→ [Drawer „Já"]
                                     ├─ Účet & předplatné
                                     ├─ App-level Settings
                                     ├─ Reporty (cross-pes)
                                     ├─ Notifikace
                                     └─ Help / Tutoriál
```

### 5.2 Karta psa (na Dashboardu)

Vizuálně minimalistická. Obsahuje:

- Silueta psa podle plemene + akcentová barva (kruh kolem siluety) + jméno.
- Volitelně fotka (uživatel nahraje, jinak default silueta).
- **Status indicator** — viz sekce stavů psa.
- **Žádná čísla na vnější straně karty** (mikrokroky v procesu jsou až uvnitř, v profilu).

V single-dog režimu se karta roztáhne a pod ní se zobrazí stats summary (poslední trénink, naplnění plánu tento týden, nadcházející závod, 1 mikrokrok v procesu). V multi-dog režimu jsou karty kompaktní a stats jsou až uvnitř psa.

### 5.3 Detail psa — vnitřní struktura

```
[Detail psa]
   │
   ├─ [Header s profilem]
   │     ├─ Silueta + akcentová barva + fotka (volitelná)
   │     ├─ Jméno, věk, plemeno
   │     ├─ Aktuální kategorie (volný text, např. „A2", „Začátečník", „Anglický champion")
   │     ├─ Mikrokroky v procesu (např. 4/6 fáze kladiny, max top 2-3 položky)
   │     ├─ Skills (zvládnuté mikrokroky, kompaktně)
   │     ├─ Status psa (Normal / Plánovaná pauza / Vynucená pauza / Recovery)
   │     └─ ⚙ Edit (per-pes settings)
   │
   ├─ [Tab 1: Záznamy]
   │     ├─ Přepínač: Seznam | Kalendář | Stats
   │     ├─ Seznam — chronologicky, filtry (typ, datum, náročnost)
   │     ├─ Kalendář — měsíční pohled s tečkami na dnech
   │     └─ Stats — grafy náročnosti, balance typů, plnění plánu, počet splněných postupovek za období
   │
   └─ [Tab 2: Plán]
         ├─ Segmented control: Kalendář | Cíle | Todo
         ├─ Kalendář (týdenní/měsíční pohled — viz V2 backlog k 3M a roční)
         │     ├─ Pravý sloupec: knihovna bloků (drag & drop)
         │     ├─ Klik na blok → detail bloku → mikrokroky/cviky uvnitř
         │     └─ Overlay druhého psa (read-only šedé bloky na pozadí)
         │
         ├─ Cíle
         │     ├─ Seznam dlouhodobých cílů (Kladina, Slalom, Kontaktní zóny…)
         │     ├─ Každý cíl má progress bar + mikrokroky uvnitř
         │     └─ Klik na cíl → detail → mikrokroky → drag do kalendáře
         │
         └─ Todo
               └─ Dlouhodobé položky k vyřešení (planning tool, ne dnešní úkoly)
```

### 5.4 Knihovna bloků (Plán → Kalendář)

Bloky drag-and-drop z pravé lišty do kalendáře. Pro MVP fixní knihovna:

- **Pauza** (rest day, neutrální, žádné nag)
- **Malý trénink** (zahrada, krátký)
- **Střední trénink**
- **Velký trénink** (hala, intenzivnější)
- **Fitness** (kondiční / posílení / strečink)
- **Plavání**
- **Procházka**
- **Intenzivka**
- **Závodní den** (PRO)
- **Jiné**

Každý blok je kontejner. Klik na umístěný blok v kalendáři otevře jeho detail, kde uživatel přidává konkrétní obsah — mikrokroky z Cílů (drag z postranní lišty), nebo volné cviky/poznámky.

**Vizuální požadavek (pro Sonnet):** Každý typ bloku potřebuje vlastní ikonu/barvu, aby byly v kalendáři okamžitě rozeznatelné. „Pauza" a „Procházka" se nesmí splést na první pohled.

V2: custom user-defined bloky, sdílení šablon mezi handlery/trenéry.

### 5.5 Stavy psa (state machine)

Pes je vždy v jednom z těchto stavů. Stav se mění **manuálně** v profilu psa (per-pes settings).

| Stav | Trigger | Datumy | Chování appky |
|------|---------|--------|----------------|
| **Normal** | Default | – | Plné funkce, denní check-in, detekce stagnace, atd. |
| **Plánovaná pauza** | Manuál (typicky po sezóně) | od / do (explicitní rozsah) | Žádné nag notifikace, kalendář předvyplní rest template (procházky/fitko, viz níž), automaticky se vrací do Normal po `do` datu — appka se zeptá „Vrací se Kai do tréninku?" |
| **Vynucená pauza** | Manuál (zranění/nemoc) | od (bez konce) | Žádné notifikace kromě billingu, suspendovaná detekce stagnace, jemný UI tón („pes odpočívá, žádný spěch"). Handler ručně přepne na Recovery. |
| **Recovery** | Manuál (po vynucené pauze) | od (bez konce) | Návrat denního check-inu s jemnějšími formulacemi, kalendář navrhuje odlehčené aktivity, suspendovaná detekce přetížení. Handler ručně přepne na Normal. |

**Rest template (pro Plánovanou pauzu i Recovery — built-in default, editovatelný):**

| Den | Default rest template | Default recovery template |
|-----|----------------------|---------------------------|
| Po | Pauza | Pauza |
| Út | Procházka | Procházka |
| St | Fitness | Fitness |
| Čt | Procházka | Procházka |
| Pá | Fitness | Procházka |
| So | Procházka | Fitness |
| Ne | Pauza | Procházka |

Handler může v Settings → per-pes override změnit defaultní rest/recovery template. Po skončení pauzy se týdenní rutina vrací k normálnímu `WeeklyTemplate`.

### 5.6 Globální stavy aplikace

- **First run** — žádný účet, vede do onboardingu.
- **Trial active** — full PRO přístup, počítá zbývající dny, banner v drawer (od 15. dne) a na dashboardu (od 27. dne).
- **Trial expired (soft lock)** — read-only všechno, paywall na přidávacích flow, banner s CTA.
- **Subscriber Basic** — PRO badge u zamčených funkcí, lze upgradovat.
- **Subscriber PRO** — vše odemčeno.
- **Offline** — voice vstup a editace funguje, sync až online, indicator v UI.

---

## 6. Datový model

### 6.1 Entity

**Dog**
- `id`, `name`, `breed`, `age`, `birth_date`
- `current_category` (string, free text — např. „A2", „Začátečník", „Anglický champion"). Manuálně editovatelné.
- `accent_color` (z fixní palety)
- `photo` (volitelně) | siluetu odvozuje appka z `breed`
- `state`: `normal` | `planned_pause` | `forced_pause` | `recovery`
- `state_start_date`, `state_end_date` (end jen u `planned_pause`)
- `weekly_routine_template` (7 slotů, každý N typů bloků — pro Normal stav)
- `rest_template_override` (volitelně, jinak built-in default)
- `recovery_template_override` (volitelně, jinak built-in default)
- `race_custom_columns` (pole, která uživatel přidal k závodnímu zápisu)

**TrainingSession**
- `id`, `dog_id`, `date`, `time`
- `type`: `maly` | `stredni` | `velky` | `fitness` | `plavani` | `prochazka` | `pauza` | `intenzivka` | `zavody` | `jine`
- `difficulty` (1–5)
- `positives` (text, případně z voice transcriptu)
- `to_improve` (text, případně z voice transcriptu)
- `linked_todos` (M:N reference vytvořené z `to_improve`)
- `linked_plan_block_id` (volitelně, vyplní se po explicitní confirmaci handlera — viz scénář 7.2)
- Subtype-specific fields:
  - **Fitness**: `exercise_type`, `repetitions`, `sets` (vše volitelné)
  - **Závody**: → entita Race s 1:N Run

**Race** (subtype TrainingSession, jen PRO)
- `surface`: `pisek` | `trava` | `umelka` | `jine`
- `race_day` (1, 2, 3…)
- `start_time`: `rano` | `odpoledne`
- `qualification_achieved`: bool — pokud true, **trigger pro celebraci**, ale **neaktualizuje** `Dog.current_category` (handler ručně mění kategorii v profilu).
- 1:N Run

**Run** (vnitřek Race)
- `id`, `race_id`, `run_number`, `run_type`: `agility` | `jumping` | `jine`
- `penalty_points`, `disqualified` (bool), `speed_ms`, `placement` (volitelně)
- `positives`, `to_improve`, `note`
- `custom_columns` (rozšířené per uživatel)

**Goal** (Cíl)
- `id`, `dog_id`, `name`, `description`
- `progress_percent` (počítáno z Microsteps)
- `time_frame` (volitelně: `tyden` | `mesic` | `3m` | `rok`) — informativní, V2 můžeme napojit na deadline notifikace
- 1:N Microstep

**Microstep** (Mikrokrok)
- `id`, `goal_id`, `name`, `order`
- `state`: `nenatrenovano` | `v_procesu` | `zvladnuto`
- Po `zvladnuto` → auto-promote do Skill (1:1)

**Skill**
- `id`, `dog_id`, `name`
- `state`: `zvladnuto` | `v_procesu` (po manuálním vrácení do tréninku)
- `microstep_id` (FK)
- `last_verified_date` — **interní pole**, neukazuje se uživateli (kvůli stresu z dlouhého „v procesu"). Slouží pro budoucí logiku „připomenout oprášit po N měsících" (V2).

**PlanBlock** (Plánovaný blok v kalendáři)
- `id`, `dog_id`, `date`, `order_in_day` (víc bloků na den OK)
- `type`: stejný enum jako `TrainingSession.type`
- `microsteps` (M:N — jaké mikrokroky se mají v rámci bloku trénovat)
- `state`: `naplanovano` | `splneno_dle_planu` | `splneno_zmeneno` | `nesplneno`
- `change_reason` (jen pokud `splneno_zmeneno`): `pocasi` | `pes_unaveny` | `cas` | `jiny` + free text
- `linked_session_id` (po splnění odkaz na vytvořenou TrainingSession — vyplní se po explicitním souhlasu handlera)

**Todo**
- `id`, `dog_id`, `text`
- `source`: `manualni` | `trenink` | `zavod` | `plan`
- `state`: `otevreny` | `splneny`

**WeeklyTemplate** (jen pro Normal stav)
- `dog_id`
- 7 slotů (po–ne), každý slot N typů bloků
- Auto-fill kalendáře 4 týdny dopředu

**Achievement**
- `type`: `postupovka_splnena` | `mikrokrok_zvladnut` | `tydenni_plan_splnen`
- `date`, `dog_id`, `related_entity_id`

**Notification**
- `type`, `scheduled_time`, `delivered`, `user_opt_in_setting`

**User & Subscription**
- `User`: id, email, auth provider
- `Subscription`: user_id, plán (`free_trial` | `basic` | `pro`), platnost, payment provider data, `auto_renewal`: bool

### 6.2 Klíčové vztahy

- `Dog 1:N TrainingSession, 1:N Goal, 1:N Skill, 1:N PlanBlock, 1:N Todo`
- `Goal 1:N Microstep`
- `Microstep 1:1 Skill` (vytváří se při `zvladnuto`)
- `TrainingSession 1:1 PlanBlock` (volitelně, když handler potvrdí, že je to splnění plánu)
- `TrainingSession 1:N Todo` (z „co dotrénovat" — handler může poslat do Todo)
- `PlanBlock M:N Microstep`
- `Race 1:N Run` (jen PRO)

### 6.3 Plánováno vs. realita compare (klíčový metric)

Vychází z `PlanBlock.state` agregovaného za období:

- **Splnění plánu (%)** = `(splneno_dle_planu + splneno_zmeneno) / total`
- **Přesnost plánu (%)** = `splneno_dle_planu / total`
- **Adaptivita (%)** = `splneno_zmeneno / total`
- **Vynechanost (%)** = `nesplneno / total`

Zobrazení ve Stats: donut nebo stacked bar, neutrální barvy, framing **„za tento týden jsi se psem pracovala 80 % dnů, z toho 60 % přesně podle plánu, 20 % s úpravou kvůli okolnostem"**. Cílem není 100 %, cílem je důslednost.

Období v pauzách (Plánovaná, Vynucená) i Recovery jsou z této kalkulace **vyloučena** — appka uživatele neměří proti plánu, který schválně dělá lehčí.

---

## 7. Klíčové uživatelské scénáře

### 7.1 První spuštění (Onboarding)

1. **Splash screen** s value prop („Tvůj agility deník, který tě jemně provede k velkým úspěchům").
2. **Sign up** — email / Apple / Google.
3. **Trial info screen** — 1 měsíc plné PRO zdarma, žádný credit card potřeba.
4. **Welcome** — „Pojďme přidat tvého prvního psa."
5. **Add dog wizard:**
   - Step 1: Jméno + plemeno (ovlivní siluetu).
   - Step 2: Akcentová barva (vyber z palety).
   - Step 3: Věk.
   - Step 4: Aktuální kategorie (volný text — „A2", „Začátečník", cokoliv). **Lze přeskočit**, doplníš později. Žádné šablony, žádná struktura — vědomé rozhodnutí kvůli cross-country komplexitě.
   - Step 5: Týdenní rutina template (volitelné, lze přeskočit; ukáže příklad).
6. **„Přidat dalšího psa?"** — Ano (vrátí na step 1 wizard) / Ne, hotovo.
7. **Dashboard** se zobrazí s kartami psů (single-dog mode = karta + stats summary).

### 7.2 Návrat z tréninku v autě (hlasový vstup)

1. Handler dotrénoval, sedá do auta s psem v kleci. Sám, klid, často takhle vyřizuje hlasové zprávy.
2. **Trigger:**
   - **Volba A**: Lock screen widget → tap → spustí voice flow.
   - **Volba B**: „Hey Siri, agility trénink Kai" → spustí voice flow s předvybraným psem (Android: Google Assistant ekvivalent).
3. **Řízený rozhovor:**
   - „Pojďme zapsat trénink. Pro kterého psa?" (pokud Siri intent neobsahoval) → handler řekne jméno.
   - „Jaký byl typ tréninku?" → handler řekne typ.
   - „Jaká byla náročnost na škále 1 až 5?" → handler řekne číslo nebo popisek.
   - „Co se povedlo?" → handler diktuje.
   - „Co je potřeba dotrénovat?" → handler diktuje.
   - „Mám tohle přidat do Todo?" → Ano/Ne.
4. „Uloženo. Měj se hezky." (žádné víc).
5. **Auto-link na PlanBlock** — když handler dorazí domů a otevře appku, **appka se ho explicitně zeptá**: „Splňuje tento zápis plánovaný *Velký trénink* z úterý?" → Ano (přesně) / Ano, ale jiný (handler zvolí důvod změny) / Ne, samostatný zápis. **Žádná tichá magie**, vždy s confirmací.

**Technické požadavky:** offline funkční, lock screen OK, čistě hlasem.

### 7.3 Splnění plánovaného tréninku (denní check-in)

Default 1× denně (čas konfigurovatelný, default 19:00).

**Případ A — den s 1 plánovaným blokem:**
1. Push: „Dnes jsi měla naplánováno: **velký trénink + slalom 6 tyček**. Povedlo se?"
2. Tap → mini sheet:
   - **Ano, jak v plánu** → blok = `splneno_dle_planu`, +1 do týdenního compare.
   - **Ano, ale jinak** → krátký formulář (důvod změny + co jsi dělala místo). Blok = `splneno_zmeneno`.
   - **Neudělala jsem** → blok = `nesplneno`, žádný stres.

**Případ B — den s víc bloky (např. plavání + procházka + fitko):**
1. Push: „Dnes jsi měla naplánováno 3 aktivity s Kaiem. Jak to šlo?"
2. Tap → otevře se sheet se **seznamem všech bloků dne**, u každého rychlá volba (ikonka): ✓ přesně / ↺ jinak / ✗ ne.
3. Pokud handler zvolí „jinak" u některého bloku, expand → krátké zdůvodnění.
4. Tlačítko „Uložit" — všechny bloky se uzavřou najednou.

**Případ C — den bez plánu:**
1. Push (volitelně, opt-in v Settings): „Co jsi dnes dělala s Kaiem? (volitelné)"
2. Tap → quick log nebo skip.

Z mini sheetu lze vždy přejít rovnou do tréninkového zápisu pro detail (text/hlas „co se povedlo" atd.).

### 7.4 Závodní víkend večer na hotelu (závodní zápis, PRO)

1. Po závodním dni handler otevře appku, klikne na psa → Záznamy → + Nový záznam → **Typ: Závody** → otevře se rozšířený formulář:
   - **Hlavička:** Povrch (Umělka default), Závodní den (1.), Čas startu (Ráno/Odp.).
2. **Postupně přidává běhy:**
   - Běh 1: Agility, 5 trestných bodů, ne dq, rychlost 4.2 m/s, „povedl se útok na slalom, ztráta na A-rámu" → odeslat do Todo.
   - Běh 2: Jumping, 0 TB, dq=ne, rychlost 4.5 m/s, …
3. Na konci: **„Byla splněna postupová zkouška?"** → Ano → achievement notifikace (Celebrace! Skvělá práce!). **Aktualizace `Dog.current_category` se neauto-děje** — handler ručně přepíše kategorii v profilu, když se posune (např. „A2" → „A3"). Stats v profilu psa zobrazí počet splněných postupovek za období.
4. Druhý den ráno před startem si může handler na hotelové verandě otevřít pohled „Včerejší závodní den" a doplnit poznámky / hlasem nadiktovat reflexi.

### 7.5 Nedělní plánování příštího týdne

1. Handler otevře pes → Plán → Kalendář (default).
2. Týdenní pohled už **má základ z týdenního template** (po pauza, út velký, …).
3. Handler upravuje:
   - Drag „Závodní den" z knihovny bloků na sobotu (turnaj).
   - V neděli normálně velký trénink → změní na Pauza (pojede se z turnaje pozdě).
   - Klik na „Velký trénink" v úterý → otevře detail bloku → drag mikrokroku „kontaktní zóna — sestupka z A-rámu" z Cílů do bloku.
   - Vidí na pozadí jemně šedé bloky druhého psa → ve čtvrtek je u druhého „trénink s trenérem", takže klubovna bude obsazená, plánuje sebe na klidnější domácí trénink.
4. Týden zůstane uložený. Příští neděli se opakuje, base template stále v platnosti.

### 7.6 Vynucená pauza → Recovery → návrat do normálu

1. **Pondělí — pes se zranil.** Handler v profilu psa změní stav: **Vynucená pauza** (od dnes, bez konce).
2. **Appka:**
   - Dlaždice psa získá indikátor „pauza – zranění".
   - Žádné denní check-in notifikace.
   - Kalendář pro tento týden přepne na rest mode (žádné bloky, jemný banner „Kai odpočívá").
   - Stats kalkulace pozastaví detekci stagnace — období pauzy je z analytiky vyloučeno.
3. **Po 4 týdnech veterinář povolí recovery.** Handler změní stav: **Recovery**.
4. **Appka:**
   - Indikátor „recovery".
   - Denní notifikace se vrátí, ale s jemnějším tónem („Dnes jste plánovala krátkou procházku — jak to šlo?").
   - Kalendář se naplní recovery template (po: pauza / út: procházka / st: fitko / čt: procházka / pá: procházka / so: fitko / ne: procházka).
5. **Po dalších 3 týdnech** handler ručně přepne na **Normal**. Indikátor zmizí, kalendář se vrátí k běžnému `WeeklyTemplate`, statistiky se navrátí k normální kalkulaci.

---

## 8. Screen inventory

### 8.1 Onboarding & Auth

- Splash / Welcome
- Sign up (email)
- Sign in (email)
- Apple / Google login
- Trial info screen
- Add dog wizard (5 kroků, multi-dog: smyčka po Step 5)
- „All set" intro card → Dashboard

### 8.2 Dashboard

- Dashboard — single dog mode (karta + stats summary pod ní)
- Dashboard — multi dog mode (karty)
- Dashboard — empty state (po smazání všech psů — vede do add dog flow)
- Avatar/iniciálka v rohu otevírá Drawer

### 8.3 Drawer „Já"

- Účet (jméno, email, change pass)
- Předplatné (current plan, upgrade, manage, cancel, auto-renewal toggle)
- Reporty cross-pes:
  - Týdenní report (auto-generated, shrnutí všech psů)
  - Měsíční report (auto-generated)
  - Custom report (uživatel si nastaví: období, psi, metriky)
  - Export do PDF (per report)
- App-level Settings:
  - Notifikace per typ (zapnout/vypnout, čas denního check-in)
  - Jazyk (MVP: EN)
  - Default akcentová paleta
- Help / Tutoriál
- Logout

### 8.4 Detail psa

- Detail psa — Header + tabs
- Detail psa — Profil edit (přes ozubko v headeru):
  - Základní info (jméno, plemeno, věk, aktuální kategorie)
  - Akcentová barva
  - Stav psa (Normal / Plánovaná pauza / Vynucená pauza / Recovery) + datumy
  - Custom kolonky závodního zápisu
  - Týdenní rutina template (Normal stav)
  - Override rest template / recovery template (volitelně)
  - Smazat psa

### 8.5 Záznamy tab

- Záznamy — Seznam view (s filtry: typ, datum, náročnost)
- Záznamy — Kalendář view (měsíčně, tečky barevně dle typu)
- Záznamy — Stats view (grafy)
- Detail tréninku (read view)
- Edit tréninku
- Detail závodu (read view)
- Edit závodu

### 8.6 Trénink form

- **Quick form** (default — typ, náročnost, co se povedlo, co dotrénovat, todo Y/N)
- **Fitness form** (rozšířený — typ cvičení, opakování, série; vše volitelné)
- **Závody form** (rozšířený, PRO):
  - Hlavička (povrch, den, čas startu)
  - Run editor (opakovatelný blok)
  - Postupovka Y/N (jen celebrační flag)
- **Auto-link confirmation modal** (po uložení tréninku, pokud existuje match plán dne) — viz scénář 7.2

### 8.7 Plán tab

- Plán — Kalendář view (s knihovnou bloků v pravém sloupci)
- Detail bloku (mikrokroky/cviky uvnitř)
- Plán — Cíle view (seznam cílů)
- Detail cíle (mikrokroky, progress bar)
- Add/edit cíl
- Add/edit mikrokrok
- Plán — Todo view (seznam dlouhodobých položek)

### 8.8 Voice flow

- Voice — listening state (full screen, minimalistický)
- Voice — confirmation card (transkript, edit option)
- Voice — error state (offline OK, mic permission, …)
- Voice — graceful soft-lock degradation (zápis se uloží lokálně, paywall se zobrazí až po dalším otevření appky — viz sekce 10)
- Lock screen widget / Siri intent (platform-specific)

### 8.9 Daily check-in

- Single block sheet (jeden plánovaný blok)
- Multi-block sheet (víc bloků jeden den, list s rychlou volbou per blok)
- Empty plán sheet (volitelný „co jsi dnes dělala")

### 8.10 Sdílení

- Share sheet pro achievement (image card pro postupovku / dokončený mikrokrok / splněný týden)

### 8.11 Stavy a empty states

- Empty state: žádné záznamy v psovi
- Empty state: žádné cíle / mikrokroky
- Empty state: žádné Todo
- Empty state: žádný pes (po smazání všech)
- **Paywall card** (PRO badge → click → upgrade screen)
- **Soft lock state** (read-only banner s upgrade CTA, „+" tlačítka nahrazena paywall kartou)
- **Trial expiring banner** (15 / 7 / 3 / 1 / 0 dnů — viz sekce 10)
- Offline indicator
- **Rest mode banner** (Plánovaná pauza)
- **Forced pause banner** (Vynucená pauza)
- **Recovery banner** (Recovery)

---

## 9. Notifikační systém

### Default zapnuto

- **Denní check-in** — 1× denně, čas konfigurovatelný (default 19:00). „Dnes jsi měla naplánováno X. Povedlo se?" Pokud nic plánováno → opt-in „Co jsi dnes dělala s Kaiem?"
- **Celebrace splněné postupovky** — instant po uložení závodu.
- **Celebrace dokončeného mikrokroku** — instant po označení.
- **Celebrace splněného týdenního plánu** — neděle večer, jen pokud splněno ≥ 80 %.
- **Týdenní recap** — neděle večer, krátké pozitivní shrnutí (formát celebrace, ne nag).
- **Trial expiring** — viz sekce 10 (vždy zapnuto, kvůli billingu).

### Default vypnuto (opt-in v Settings)

- Rest reminder končí (pes je zase „v dosahu" pro tréninky).
- Overload alert (5× náročnost 5 za sebou).
- Stagnation alert (opakovaně nízká náročnost).
- Mikrokrok deadline (jen pokud uživatel zadal datum cíli — V2 napojení na Goal.time_frame).
- Empty-plan check-in (otázka i když nic není plánováno).

### V pauze a Recovery

- V Plánované pauze a Vynucené pauze: **suspendováno vše krom billingu**.
- V Recovery: denní check-in s jemnějším tónem, vše ostatní vypnuto.

### Filozofie microcopy

Pozitivní rámování. Místo „zaostáváš" → „splnila jsi 80 % plánu, krásná stálost". Místo „zapomněla jsi zapsat" → „chceš si přidat dnešní trénink?". Místo „ztrácíš streak" → ticho (žádná notifikace).

---

## 10. Monetizace v UI

### Trial mechanics

- 1 měsíc plný PRO bez credit card, **bez auto-renewal**.
- Banner schedule (pokud je auto-renewal vypnutý — což je defaultně, dokud uživatel nezadá platební metodu):
  - **Den 16** (15 dnů do konce): jemný banner v drawer „Já".
  - **Den 23** (7 dnů): banner se přesune na top dashboardu, jemný.
  - **Den 27** (3 dny): prominent banner na všech obrazovkách, výrazná barva.
  - **Den 29** (1 den): nutkavá výzva s přímým upgrade CTA.
  - **Den 30** (0): hard expirace → soft lock.
- Pokud uživatel uprostřed trialu zadá platební metodu a zapne auto-renewal: banners zmizí, billing si řeší standardní email reminders od payment provideru.

### Po expiraci (Soft lock)

- Vše read-only — uživatel vidí svá data, nemůže přidávat / editovat.
- Banner nahoře v každé obrazovce s CTA „Pokračuj v Basic / PRO".
- Add buttons (FAB, „+") nahradí paywall karta.
- **Voice flow graceful degradation:** Pokud uživatel spustí voice flow po expiraci (typicky během jízdy autem), appka **dořekne flow normálně a zápis uloží lokálně**. Paywall se zobrazí až při dalším otevření appky na obrazovce (nikoliv hlasově). Tím se vyhneme tomu, že by handlerovi v autě se zamčenou obrazovkou hlas oznámil „Trial expired, upgrade to continue".

### PRO badge pattern (v Basic plánu)

- Funkce zamčené pro PRO mají u sebe malou ikonku zámku + zlatý/akcentový tag „PRO".
- Klik na zamčenou funkci → mini paywall popup s vysvětlením + CTA upgradnout.
- **Touchpointy:**
  - Závodní zápis (hlavní)
  - Pokročilá analytika ve Stats (postupová rychlost dle povrchu, výkonnostní křivka v sezóně)
  - Custom kolonky závodního zápisu
  - Custom reporty
  - Export do PDF (zvážit, případně oba plány)

### Pricing structure (per brief)

- **Free trial** — 1 měsíc plné PRO, pak nutný upgrade (žádný freemium).
- **Basic** — Tréninkový deník, todo, plánování, reporty.
- **PRO** — Basic + závodní zápis + pokročilá analytika.
- **Roční sleva** ~20 %.

---

## 11. Otevřené otázky pro design fázi

Témata, kde IA dává směr, ale konkrétní vizuální / microcopy řešení patří do Sonnetova workflow:

- **Microcopy denního check-inu** — přesné formulace pro 4 stavy: nově plánovaný den / splněný den / neplánovaný ale natrénovaný den / plánovaný a neudělaný den. Plus multi-block variant.
- **Konkrétní vizuální podoba siluety psa** — minimalistická SVG knihovna, kolik plemen pokrýt v MVP? Top 20 agility plemen (border kolie, šeltie, pudl, jack russell, parson russell, kelpie…) + univerzální „mix"?
- **Akcentová paleta** — 4–6 odstínů, vše vzájemně ladí, dobře vypadá v dlaždici i na pozadí. Sonnet navrhne paletu.
- **Onboarding tone** — friendly modern. Pro EN trh: tykání-ekvivalent (you, casual but not sloppy).
- **Dashboard single-dog stats summary** — co konkrétně? Návrh: poslední trénink, naplnění plánu tento týden (donut), nadcházející závod, 1 mikrokrok v procesu.
- **Lock screen widget** — iOS / Android specifika, návrh visualu.
- **Voice flow vizuál** — minimalistický, čitelný i v autě (handler kouká chvíli, ne pořád). Jak vizualizovat „appka poslouchá / přepisuje / čeká na odpověď"?
- **Status indicator psa** — konkrétní barvy a tvary pro každý stav: Normal (default), Plánovaná pauza, Vynucená pauza, Recovery, Overload alert.
- **Empty state ilustrace** — ladí se siluetama psů? Vlastní stylová knihovna?
- **Compare visualization** — jak konkrétně zobrazit „splnila jsi 80 %, z toho 60 % přesně, 20 % s úpravou"? Donut chart (3 segmenty)? Stacked bar? Něco originálního?
- **Knihovna bloků v Plánu — vizuální systém.** Každý typ bloku potřebuje vlastní ikonu/barvu, aby byly v kalendáři okamžitě rozeznatelné. „Pauza" a „Procházka" se nesmí splést na první pohled. Návrh: ikonky + jemná tonální variace v rámci akcentové barvy psa.
- **Drag & drop UX na mobile** — long-press? Dedicated edit mode? Fallback na tap-to-add?
- **Aktuální kategorie v profilu psa** — vizuální zpracování volného textu. Velký headline? Chip? Subtle?
- **Skill grid** — list, chip cloud, skill tree?
- **Multi-block daily check-in sheet** — vizuální layout (list s checkboxy? swipeable cards?).

---

## 12. Open tech questions (mimo design scope, ale stojí za to to mít sepsané)

- **Tech stack** — React Native vs. Flutter? React Native má ekosystém + sdílení s případným webem, Flutter má lepší performance.
- **Backend & sync** — vlastní backend (Node + Postgres) vs. Firebase vs. Supabase? Offline-first sync je netriviální.
- **Voice STT** — Whisper (open source, offline-capable) vs. nativní iOS/Android speech-to-text? Trade-off mezi kvalitou a offline funkcí.
- **Platební brána** — RevenueCat (mobilní subscriptions, App Store / Play Store), Stripe (web).
- **i18n architektura** — od day 1 použít react-i18next / Flutter intl. Hardcoded stringy se nevyplatí ani v MVP, retrofit je drahý.
- **Auth** — vlastní email + Apple Sign-In + Google Sign-In. Doporučená cesta: Auth0 / Supabase Auth pro rychlý start.
- **Analytics** — Mixpanel / PostHog / vlastní pro tracking funnelu (onboarding completion, trial → paid conversion, voice flow usage, atd.).

Tahle sekce je pro tým / Evi, ne pro Sonneta.

---

## 13. V2 backlog

Položky, které dávají appce dlouhodobou hodnotu, ale nejsou v MVP:

- **3M a roční pohled v kalendáři** (MVP má jen týden + měsíc).
- **Fulltext search** v Záznamech (MVP má jen filtry + kalendář).
- **Geofence detekce** konce tréninku → automatické spuštění voice flow.
- **Custom user-defined bloky** v knihovně Plánu.
- **Streak counter & celebration animace** (gamifikace, ale opatrně, ať to neskočí do nag módu).
- **Top-level „Kalendář všech psů"** s plánováním cross-pes (multi-dog overlay v MVP je read-only, plné cross-pes editování v V2).
- **Komunitní šablony plánu** — trenér sdílí curriculum, handler si stáhne.
- **Trainer plán** — handler ↔ trenér view, samostatný tier nad PRO.
- **Napojení na výsledkové weby** (per země — komplikované, žádné jednotné API).
- **Video analýza běhů** — upload videa, slow motion, anotace.
- **Překlady** do dalších jazyků (po EN).
- **Sdílení do FB skupin / Insta storiek** (rozšíření MVP achievement share).
- **Obecné poznámky k psovi** (alergie, vet kontakt, krmení).
- **Mentální koučink, nutrition tracker pro handlera**.
- **Apple Watch / wearable companion** — zápis tréninku z hodinek.
- **„Připomenout oprášit skill po N měsících"** — využije interní `Skill.last_verified_date`.
- **Goal.time_frame → mikrokrok deadline notifikace** (opt-in).

---

## 14. Co je explicitně mimo MVP a mimo roadmapu

- Trainer plán v MVP (jen v architektuře, ne UI).
- Komunitní funkce nad rámec basic share.
- Napojení na výsledkové weby.
- Video analýza.
- Překlady (EN-only first).
- Mentální / nutriční tracker.
- Strukturované postupovky (FCI/UKI/AKC templates) — vědomé rozhodnutí kvůli cross-country komplexitě, řešíme volným textem.

---

## 15. Klíčové designové momenty (tip pro Sonnet, kde se rozhoduje)

Pokud Sonnet má omezený čas, tady jsou momenty, které **nejvíc definují dojem z appky**:

1. **Karta psa na Dashboardu** — první kontakt, vizuální identita, „je to moje".
2. **Header detailu psa s aktuální kategorií, mikrokroky a skills** — emocionální moment „vidím, kam jsme se s Kaiem dostali".
3. **Plán → Kalendář s bloky** — central planning experience, každodenní touchpoint. Knihovna bloků s ikonkami je „hero" tohoto screenu.
4. **Denní check-in notifikace + sheet** (single i multi-block) — definuje vztah uživatele s appkou („je to fajn parťák, ne otravný coach").
5. **Compare visualization ve Stats** — moment, kde uživatel vidí svoji důslednost (a justifikuje předplatné).
6. **Voice flow** — killer feature, který uživatele přesvědčí. UX musí být absolutně bezstresové.
7. **Achievement celebration** — emoční vrchol, který zvyšuje retention.

Tyto momenty si zaslouží nejvíc designové pozornosti.

---

*Konec dokumentu. Připraveno pro Sonnet — design fáze: konkrétní wireframes, vizuální identita, microcopy (EN), akcentová paleta, knihovna siluet psů, ikonky pro knihovnu bloků.*
