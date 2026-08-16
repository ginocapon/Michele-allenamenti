# SKILL — La Forza Quotidiana · Schede allenamento

> **Repo Michele-allenamenti (questo sito):** clone **admin** della periodizzazione (modello Gino). Default: lavoro in `/admin/`. Non pubblicare log in `/allenamenti/` salvo richiesta. STEP A = base JSON/PDF/figure; STEP B = personalizzazione esercizi/date senza cambiare MACROCICLO → MESOCICLO → MICROCICLO. PDF anonimo; nome solo in campo compilabile.

> **Token:** non caricare questo file intero se non serve. Usa `.cursor/rules/skill-router.mdc` + `docs/SKILL-INDEX.md` e apri solo le sezioni/moduli indicati.
>
> **Moduli:** `SKILL-PERFORMANCE.md` (sessioni/Zepp) · `SKILL-VENERDI.md` (venerdì) · `SKILL-LANDING.md` (hero/UI) · `guardian/skill/SKILL.md` (premortem)
>
> **Quando caricare tutto:** nuovo trimestre da zero, refactor architetturale, audit completo.

---

## PRIORITÀ PERMANENTE — Trasparenza AI (AI Act UE)

**Obbligo non negoziabile** su tutto il sito pubblico. Riferimento: Regolamento (UE) 2024/1689 (AI Act) — obblighi di trasparenza (art. 50); *l’obbligo concreto dipende da come l’IA è utilizzata*.

1. **Ogni pagina pubblica** deve caricare `js/cookie-consent.js` (footer con notice + link `/trasparenza-ai/`).
2. **Ogni immagine generata, abbellita o modificata con IA** (hero cinematici, vignette, hub illustrations, sfondi decorativi, collage/archivio ritoccato):
   - `data-ai="generated"` | `edited` | `illustrative`
   - **marchio visivo sull’immagine:** testo **«Foto AI»** in basso a destra (`.ai-photo-wrap` + `.ai-photo-mark`; `main.js` su pagine esistenti)
   - trafiletto sotto figura: `.ai-media-note` / `.fig-credit` + badge `.ai-badge` + link a `/trasparenza-ai/`
3. **Foto/video documentali reali** (palestra, spogliatoio, mare, Amazfit): niente etichetta IA; restano coperti dal notice footer.
4. **Nuovi contenuti / nuove foto:** se c’è intervento IA → etichetta **prima** del commit. Aggiornare `/trasparenza-ai/` se cambia la prassi.
5. Pagina normativa: `/trasparenza-ai/` · cross-link in Termini e Privacy · sitemap.

Dettaglio operativo e markup: anche `.cursor/rules/ai-trasparenza.mdc`.

---

## 0. Anima del sito — dedicato a Ginevra

**La Forza Quotidiana** è un **lascito per Ginevra**, unica figlia di Gino. Non è bodybuilding da vetrina né coaching commerciale.

### Messaggio centrale (sempre coerente)

- Papà **sempre presente**, alla ricerca di **equilibrio** tra lavoro, famiglia e sport.
- Lo **sport è il mezzo** per trovare la propria strada e misurarsi quotidianamente con avversità e difficoltà.
- Il culturismo amatoriale è **fatto di sacrifici** ed è **molto impegnativo** — va detto senza romanticismi.
- Il sito documenta un percorso **reale**, non perfetto.

### Nome in copy

Usare **Ginevra** esplicitamente in home, chi-sono, dedicatio e intro diario — non solo «mia figlia» generico.

### Due mondi separati (navigazione chiara)

| Sezione | Contenuto | Tono |
|---------|-----------|------|
| **`/diario/`** | Riflessioni, vita, equilibrio, famiglia | Umano, lascito |
| **`/allenamenti/`** | Trimestre, sessioni, dati Amazfit | Disciplina, log |

### 0.1 Estetica riquadri — Panel Relief 3D (obbligatoria)

**Tema scuro attivo.** Ogni riquadro/contenitore del sito pubblico deve usare il sistema **Panel Relief**: bordi ad alto contrasto + rilievo 3D con luce dall’alto.

#### Principio

- Sfondo: gradiente scuro `--panel-bg` (non piatto `#161616`).
- Bordo: **dorato discreto** — luce in alto (`--panel-border-light`), media (`--panel-border-mid`), ombra in basso (`--panel-border-dark`), anello interno `--panel-border-gold` via `::after`.
- Rilievo: `box-shadow` con highlight interno dorato + ombra esterna (`--panel-shadow`).
- Luce: pseudo `::before` con `--panel-highlight` (riflesso superiore ambrato).
- Hover (link-card): `--panel-shadow-hover` + `translateY(-2px)`.
- Spessore bordo: **1.5px** (non 1px piatto).

#### Classi già coperte in `css/styles.css` (non reinventare)

`.card` · `.hub-card` · `.benefit-card` · `.proof-stat` · `.diario-list__link` · `.entry` · `.exercise-card` · `.session-panel` · `.session-card` · `.session-kpis__item` · `.amazfit-card` · `.newsletter-cta` · `.scheda-pdf-promo` · `.photo-mosaic__item` · `.cookie-modal__panel` · `.page-veiled .prose`

Per nuovi componenti futuri: aggiungere la classe `.panel-raised` **oppure** estendere il blocco condiviso in `styles.css` (stesso blocco «Panel relief»).

#### Varianti accent (opzionali)

- `.card--highlight` · `.entry--riflessione` · `.entry--allenamento` · `.session-panel--metabolic` · `.session-kpis__item--accent` → mantengono il rilievo ma con tinta arancio/ambra sui bordi.
- Pagine velate (`.page-veiled`): usare `--panel-bg-glass` + `backdrop-filter`.

#### Regole agente

1. **Non** creare card con `border: 1px solid var(--line)` piatto — usare sempre il sistema Panel Relief.
2. Nuova pagina/sezione → riquadri con classi esistenti (`.card`, `.hub-card`, `.session-panel`, ecc.).
3. Se serve un contenitore nuovo → `.panel-raised` + eventuale modifica accent.
4. Dopo ogni modifica CSS: bump `styles.css?v=N` su **tutte** le pagine (versione corrente: **v=32**).

#### Cometa hero (solo `/` — sopra la foto)

Cometa con **nucleo piccolo** e **scia di polvere stellare rada** (particelle bianche/dorate + scintille). Si muove in **ellissi casuali** che cambiano forma e diametro nella parte alta dell'hero (zona foto). Scia ~30% più lunga, dissoluzione ~20% più lenta.

- Markup: `<canvas class="comet-sky" id="comet-sky">` **dentro** `.hero` (sopra overlay, sotto `.hero__content`)
- Script: `js/comet.js` **solo** in `index.html`
- Canvas ancorato all'hero (`position: absolute`), `mix-blend-mode: screen`
- Rispetta `prefers-reduced-motion`

#### Ritratto autorevolezza — chi-sono e diario

Foto reale Gino **fuori palestra** — stesso markup hero della home: `.hero.hero--portrait` + `.hero__overlay` (sfumatura) + testo in pannello vetro.

- File: `img/chi-sono/gino-affari.webp`
- Pagine: `/chi-sono/` e `/diario/` — `.hero.hero--portrait` come home: foto visibile in alto (volto), titoli bianchi sopra l'immagine con ombra, overlay sfumato; testo lungo sotto nel contenuto
- Upload da mobile: allega in chat → `node tools/copia-ritratto-affari.mjs`
- Tono: autorevolezza — non solo palestra, anche uomo d'affari

---

## 0b. Hub Allenamenti — tre blocchi visivi

La pagina `/allenamenti/` deve essere **immediata**: tre card con illustrazione + testo breve.

| Blocco | Link | Immagine hub | Cosa comunica |
|--------|------|--------------|---------------|
| Trimestre | `/allenamenti/trimestre-…/` | `img/allenamenti/hub/trimestre.webp` | Schede 1–4 di riferimento, programma |
| Sessioni svolte | `/allenamenti/sessioni/` | `img/allenamenti/hub/sessioni.webp` | Log per data, Amazfit, foto |
| Diario | `/diario/` | `img/allenamenti/hub/diario.webp` | Riflessioni separate dai numeri |

**Markup:** `.hub-cards` > `a.hub-card` con `.hub-card__img`, `.hub-card__label`, `h3`, `p`, `.hub-card__cta`.

**Illustrazioni:** generate o aggiornate dall’agente — stile editoriale scuro, accento `#c9783a`, 16:9, **no volti reali**. File fissi in `img/allenamenti/hub/`.

---

## 0c. Diario — navigazione smart

Il diario deve restare **semplice e fruibile**:

- Intro corta: titolo «Pensieri e vita», menzione Ginevra, link ad Allenamenti.
- Elenco **`.diario-list`**: una riga per articolo (data · titolo · excerpt), tap-friendly, niente muri di testo in indice.
- **Non** mischiare log palestra nell’indice diario.

---

Ogni scheda copre **3 mesi** con titolo impattante:

```
Trimestre [Mese] – [Mese] [Anno]
Esempio: Trimestre Giugno – Luglio – Agosto 2026
```

**URL:** `/allenamenti/trimestre-[mese1]-[mese2]-[mese3]-[anno]/`  
**Non** incollare PDF/foto di schede esterne. Tutto **HTML + SVG originali** del sito.

### Sezioni obbligatorie trimestre (ordine)

1. Hero trimestre (periodo, obiettivi, peso corporeo partenza)
2. Intro emotiva + razionale
3. Tre pilastri + organigramma (link a `/allenamenti/sessioni/`)
4. Schede 1–4 con card esercizio (SVG, serie, **peso iniziale**, RIR)
5. Statistiche mensili + regole + disclaimer
6. **Confronto metabolico** (`#confronto-metabolico`) — sessioni Zepp + lettura scientifica
7. **Progressione pesi** (`#progressione-pesi`) — grafici per multi-articolare da `data/exercise-progress.json`
8. **Progressione gruppi** (`#progressione-gruppi`) — stesso archivio, vista per gruppo muscolare

I log sessione **non** vanno nel trimestre — solo in `/allenamenti/sessioni/`.

---

## 2. Card esercizio — template

Ogni esercizio ha una card autonoma:

| Campo | Contenuto |
|-------|-----------|
| **Nome** | Nomenclatura italiana palestra |
| **Muscoli** | Primario (accent) · secondario (muted) |
| **Serie×Rep** | es. 4×8 |
| **Peso iniziale** | es. 22 kg ×2 manubri · stack macchina · 8 kg kettlebell |
| **Recupero** | es. 2' |
| **TUT** | Tempo di esecuzione — es. `4s rientro`, `ecc 4s`, `3-1-2` (eccentrica-pausa-concentrica). Obbligatorio in card trimestre, log sessione e PDF. |
| **RIR** | 0-2 fondamentali · 1-2 accessori |
| **SVG** | Figura **originale** sito — mai foto stock incoerenti |
| **Esecuzione** | 3-5 bullet: setup, movimento, errori da evitare, respirazione |

### Figure SVG (realizzate da zero)

File simboli condivisi: inline `<symbol id="ex-*">` nella pagina trimestre.

| ID simbolo | Esercizi |
|------------|----------|
| `ex-press-inclinata` | Panca inclinata manubri/bilanciere |
| `ex-croci` | Croci ai cavi |
| `ex-lento` | Lento avanti seduto |
| `ex-alzate` | Alzate laterali |
| `ex-lat` | Lat machine |
| `ex-rematore` | Rematore / trazioni |
| `ex-polpacci` | Polpacci in piedi |
| `ex-pressa` | Pressa 45° |
| `ex-legcurl` | Leg curl |
| `ex-rdl` | Stacco rumeno |
| `ex-adduttori` | Adduttori |
| `ex-curl` | Curl Scott / martello |
| `ex-squat` | Squat multipower |
| `ex-catchball` | Catch Ball / kettlebell balistico |
| `ex-halo` | Clean Halo / rotazione kettlebell attorno alla testa |

Muscoli evidenziati: `--muscle-hot` (#c9783a) primario, `--muscle-warm` (#8b7355) secondario.

---

## 3. Monitoraggio cardiaco — METRO fisso

**Obbligatorio** in ogni scheda trimestre e in **ogni log sessione** futuro.  
Fonte dati: **Amazfit** (o equivalente) — solo valori reali, mai inventati.

### Blocco log sessione (`.hr-log`)

```html
<article class="hr-log" data-session="YYYY-MM-DDTHH:MM">
  <header>
    <time datetime="...">17 luglio 2026 · 15:24</time>
    <span class="hr-log__day">Lunedì · Petto/spalle/dorsali</span>
  </header>
  <!-- metriche + zone + effetto -->
</article>
```

### Campi obbligatori per sessione

| Campo | Esempio | Note |
|-------|---------|------|
| `datetime` | 2026-07-16T15:24 | Data e ora inizio |
| `tipo` | Allenamento muscolare | |
| `durata` | 01:09:50 | hh:mm:ss |
| `gruppi` | 21 | Set totali |
| `intervalli_set` | 49:34 | Recupero tra set |
| `fc_media` | 115 bpm | |
| `fc_max` | 152 bpm | |
| `calorie` | 564 kcal | |
| `carico` | 85 | Training load device |
| **Zone FC** | vedi sotto | % + tempo |
| **Effetto** | aerobico / anaerobico | punteggio + etichetta |

### Zone frequenza cardiaca (5 livelli)

| Zona | Range bpm | % | Durata |
|------|-----------|---|--------|
| VO₂ max | 146–163 | | mm:ss |
| Anaerobica | 130–145 | | |
| Aerobica | 114–129 | | |
| Intensiva | 97–113 | | |
| Leggera | 81–96 | | |

Visualizzazione: barre `.hr-zone-bar` con `--pct` CSS.

### Effetto allenamento

| Tipo | Scala | Etichette |
|------|-------|-----------|
| Aerobico | 0–5 | Basso · Medio · Buono · Alto |
| Anaerobico | 0–5 | Basso · Medio · Buono · Alto |

Gauge SVG semicircolare `.hr-effect-gauge`.

### Cronostoria e statistiche mensili

- Sessioni ordinate **cronologicamente** (più recente in alto).
- **Database allenamento:** `data/performance-sessions.json` (ogni sessione) + `data/performance-monthly.json` (medie e grafici).
- **Database sonno mensile:** `data/sleep-monthly.json` — export Zepp «Rapporto mensile sulle tendenze» (Gino invia screenshot a **fine mese**).
- **Skill dedicata:** `SKILL-PERFORMANCE.md` — flusso screenshot Zepp, JSON, grafici, checklist, report mensile integrato.
- **Script:** `node tools/aggiorna-performance.mjs` dopo ogni aggiornamento sessioni.
- Tabella `.month-stats` + grafici `#perf-charts` (JS: `performance-charts.js`) nel trimestre `#statistiche`.
- **Report sonno** nel trimestre: sezione `#report-sonno-[mese]` con tabella + galleria screenshot in `img/allenamenti/amazfit/mensile/YYYY-MM/`.

| Mese | Sessioni | Con export | Durata totale | FC media | Calorie | Carico medio | Gruppi ø |
|------|----------|------------|---------------|----------|---------|--------------|----------|

Calcolare solo da log pubblicati — medie da `performance-monthly.json`. Celle vuote `—` se mese non ancora iniziato.

Sezione `#confronto-metabolico` nel trimestre: tabella comparativa da `performance-sessions.json` (JS: `metabolic-comparison.js`) + analisi testuale con riferimenti scientifici. Confrontare solo sessioni con export Zepp completo (zone + effetto).

### 3d. Cronologia mensile integrata (salute + allenamento)

**Obiettivo:** storico per report mensili futuri — incrociare palestra, sonno e carico (TSB).

**Input Gino a fine mese:**
1. Screenshot Zepp **Rapporto mensile tendenze sonno** (REM, veglia, pisolini, FC sonno, ipopnea, respirazione, umore).
2. (Opzionale) Screenshot **modulo TSB** se non già in ultima sessione del mese.

**Flusso agente:**
1. Aggiornare `data/sleep-monthly.json` — voce mese con medie e `delta_prev_month`.
2. Salvare screenshot in `img/allenamenti/amazfit/mensile/YYYY-MM/` (prefisso `YYYY-MM-sonno-*.png`).
3. Pubblicare sezione `#report-sonno-[mese]` nel trimestre (tabella + galleria + `.metabolic-note` interpretativa).
4. Scrivere **valutazione integrata** seguendo §3e (tabelle riferimento + semaforo + giudizio).
5. Aggiornare **cronologia** in fondo a §3e — una riga sintetica per mese.

**Regola:** non consulenza medica — trend descrittivi da dati device; invito al medico se anomalie persistenti o sintomi (russamento diurno, sonnolenza, dolore toracico).

### 3e. Framework analisi integrata mensile (bibbia operativa)

**Scopo:** ogni fine mese l'agente incrocia allenamento + sonno + TSB usando **range di riferimento da letteratura**, non impressioni. Questa sezione è la fonte unica per interpretare i dati di Gino nei mesi successivi.

#### Limiti del dataset (sempre dichiararli)

| Limite | Implicazione |
|--------|--------------|
| Log palestra da **16/07/2026** | Nessun dato giugno — CTL/TSB Zepp include storia precedente non documentata sul sito |
| **7 sessioni / 12 giorni** a luglio | Frequenza alta ma campione corto — trend mensili > singole sessioni |
| Wearable al polso (Zepp) | FC sonno, REM, WASO, ipopnea ≠ polisonnografia clinica |
| Artefatti device | Sessioni 20/07 e 24/07 — escludere durata/kcal gonfiate dai confronti |
| Età biologica Zepp | Indice algorithmico — utile come trend, non diagnosi |

**Profilo fisso:** Gino Capon, **57 anni**, **10+ anni** palestra amatoriale, trimestre Q3 2026 (ipertrofia natural, Schede 1–4, RIR 0–2 sui multiarticolari). Obiettivo sito: longevità funzionale 40–65, non bodybuilding agonistico.

---

#### Riferimenti scientifici — cosa considerare «normale»

**A. Allenamento forza (adulti / over 50)**

| Parametro | Riferimento | Fonte |
|-----------|-------------|-------|
| Frequenza minima | ≥ **2 sessioni/settimana**, tutti i gruppi muscolari | ACSM Position Stand 2026 (137 review, ~30k partecipanti) |
| Recupero tra sessioni RT | ≥ **48 h** tra stimoli sullo stesso distretto | ACSM Health & Fitness Journal, Stack Your Workouts |
| Sforzo per serie | **~2–3 RIR** sufficienti; cedimento assoluto non obbligatorio | ACSM 2026; Phillips et al. |
| Volume ipertrofia | ~**10 serie/settimana per gruppo** (range flessibile) | ACSM 2026 |
| Intensità over 50 | **40–70% 1RM**, 3×8–12, progressione lenta efficace | PMC8977953; Antioxidants 2019 (sarcopenia, 60% 1RM) |

**B. FC e zone in sessione di forza**

| Parametro | Riferimento Gino (57 aa) | Fonte |
|-----------|--------------------------|-------|
| FC max teorica | ~220 − 57 ≈ **163 bpm** (stima; individuale ±10) | Convenzione Karvonen / AHA |
| FC media sessione RT | **100–120 bpm** compatibile con RT + recuperi; picchi 130–165 su set pesanti | Houston Methodist 2025; PMC5421976 |
| Zona dominante attesa | **Intensiva + aerobica** — in RT il limitante devono essere i **muscoli**, non la FC | Houston Methodist |
| Effetto aerobico device | 2,5–3,7 «Medio–Buono» = contributo cardioaccessorio | PMC5421976 (adulti <60 aa: fino ~82% tempo ≥40% HRR in RT) |

**C. Carico e TSB (CTL / ATL / TSB = CTL − ATL)**

| TSB | Interpretazione generale | Fonte |
|-----|--------------------------|-------|
| **−30 e oltre** | Sovraccarico — rischio stanchezza / infortunio | TrainingPeaks (Friel); Vitruve |
| **−10 a −20** | Zona produttiva di build | Vitruve; TrainingPeaks |
| **−10 a 0** | Carico sostenibile, fatica gestibile | Vitruve |
| **0 a +10** | Recupero in corso / taper leggero | TrainerRoad; Trainingload.ai |
| **+5 a +15** | Freschezza pre-evento (endurance) | Roadman Cycling; masters spesso +12–18 |
| **> +25** | Possibile disadaptation — «fresco ma piatto» | Friel; TrainerRoad |

**Nota masters (55+):** recupero più lento — se **TSB < −10 per >14 giorni** con WASO in aumento → valutare deload (volume −40%, intensità mantenuta).

**D. Sonno (adulto 50–60 aa)**

| Metrica | Range normale / target | Allarme (monitorare) | Fonte |
|---------|------------------------|----------------------|-------|
| REM | **20–25%** sonno totale | <15% persistente | Cleveland Clinic; Sleep Foundation |
| WASO (veglia) | **<10% TST** (~**42 min** su 7h); 2–6 risvegli/notte | **>49 min** o ↑ mese su mese | Berger actigraphy; Sleep Foundation; Meta PSG 2019 |
| FC sonno | **40–60 bpm** (atleti/amatori attivi) | <40 con sintomi o >70 persistente | Sleep Foundation; AHA |
| Ipopnea / AHI | **<5/h** = normale adulto | ≥5/h = ipo OSAS lieve (clinico) | AASM / Cleveland Clinic / Harvard Sleep |
| Respirazione sonno | **10–16 BRPM** | Spike persistenti >18 | Letteratura PSG |
| Pisolini | Individuali; ↑ con carico o sonno frammentato | ↑↑ + WASO ↑ + TSB ↓ | Recovery sportivo |

**E. Qualità esecuzione (radar Zepp)**

| Indicatore | Interpretazione |
|------------|-----------------|
| Consistenza / stabilità alte | Tecnica controllata — riduce rischio infortunio over 50 |
| Speed decay marcato | Atteso con **TUT lungo** (es. pausa 3 sec alzate 27/07) — non confondere con cedimento |

---

#### Matrice semaforo — incrocio mensile

| Pilastro | Verde | Giallo | Rosso |
|----------|-------|--------|-------|
| **Volume/frequenza** | 2–4 sessioni/sett., rotazione schede, TSB ≥ −10 | >4 sessioni/sett. o TSB −10…−20 | TSB < −20 o dolore persistente |
| **Intensità FC** | FC media 100–120, picchi isolati <170 | FC max >165 spesso o sessioni >100 min device | FC max >180 o palpitazioni riferite |
| **Sonno quantità** | 7–9 h, REM 20–25% | WASO 40–60 min o pisolini ↑ | WASO >60 min + stanchezza |
| **Sonno qualità** | FC sonno 45–58, AHI <5 | FC sonno ↑ + WASO ↑ insieme | AHI ≥5 (device) + sintomi |
| **Progressione pesi** | Incrementi lenti, RIR rispettato | Stallo 3+ settimane | Regressione o dolori |

---

#### Checklist agente — fine mese

1. Leggere `performance-monthly.json` + `sleep-monthly.json` + ultimo TSB in `performance-sessions.json`.
2. Escludere sessioni con `duration_corrected` / `calorie_asterisk` dalle medie se distorcono.
3. Confrontare ogni metrica sonno con tabella §3e-D.
4. Confrontare frequenza e TSB con tabella §3e-A/C.
5. Incrociare: **WASO ↑ + TSB ↓** = possibile recupero insufficiente; **FC sonno bassa + TSB bilanciato** = adattamento ok.
6. Scrivere `.metabolic-note` nel trimestre (linguaggio chiaro, disclaimer medico).
7. Aggiornare `sleep-monthly.json` campo `analisi`.
8. Aggiungere riga in **Cronologia mensile** (sotto).
9. Metriche cliniche (AHI, sintomi) → «parlare con medico / sleep specialist».

---

#### Valutazione integrata baseline — luglio 2026

**Contesto:** prima documentazione sistematica. Giugno senza log. **7 sessioni in 12 giorni** (16→27 lug).

**Allenamento — VERDE con note**

- Frequenza superiore al minimo ACSM (2×/sett.) — sostenibile perché **TSB −3 (Bilanciato)**, CTL 34 / ATL 37: build iniziale, non overreaching.
- **FC media 110 bpm** (~68% FCmax stimata) — coerente con RT moderato + recuperi.
- Sessioni chiave: 23/07 FC max **165**, anaerobico **3,6**; 27/07 **82 min**, aerobico **52%**; 21/07 pressa **140 kg**, 30 gruppi.
- Tecnica radar alta su 21, 23, 24, 27 — positivo per età e TUT.
- Artefatti 20/07 e 24/07 — escludere durata device.

**Sonno — VERDE/GIALLO**

- REM **23%** — normale. FC sonno **55 bpm** — ottimo (40–60). Ipopnea **2,2/h** — normale (<5).
- Veglia **49 min** (+13) — **giallo** (limite WASO). Pisolini **+17 min** — **giallo** (compensazione?).
- Diario buonanotte vuoto 31/31 gg — compilare ad agosto.

**Giudizio sintetico:** build ben tolerata a 57 anni con background decennale; recupero cardiaco notturno ok; debolezza = fragmentazione sonno in aumento — monitorare ad agosto con TSB e WASO.

**Azioni suggerite (agosto):** diario Zepp; se WASO ↑ persistente, 3 sessioni/sett. una settimana su due; spegnere orologio post-palestra; continuare progressione lenta ACSM.

---

#### Cronologia mensile (log sintetico)

| Mese | Sessioni | Export | TSB fine mese | Sonno (highlight) | Giudizio |
|------|----------|--------|---------------|-------------------|----------|
| Giu 2026 | 0 log | — | — | — | Pre-documentazione |
| **Lug 2026** | **8** | **7** | **−2 Bilanciato** (31/07) | REM 23% ✓ · FC sonno 55 ✓ · WASO 49 ⚠ · pisolini ↑ | Build sostenibile; monitorare veglia |
| Ago 2026 | — | — | — | — | *Prossimo report fine mese* |

*Aggiornare una riga per mese dopo ogni report integrato §3e.*

---

### Progressione pesi per esercizio (archivio)

**Non** è un report generale — è un **archivio** dei momenti di peso registrati in sessione, con grafico dedicato per ogni multi-articolare principale e vista aggregata per gruppo muscolare.

| File | Ruolo |
|------|-------|
| `data/exercise-progress.json` | Fonte dati: peso, serie, TUT, data, gruppo per esercizio |
| `js/exercise-progress-charts.js` | Grafici nel trimestre `#progressione-pesi` e `#progressione-gruppi` |
| Trimestre `#progressione-pesi` | Grafico per singolo esercizio |
| Trimestre `#progressione-gruppi` | Grafico per gruppo muscolare (Petto, Dorsali, Gambe, …) |

**Esercizi tracciati (Q3 2026):** panca inclinata manubri, lat machine, pressa 45°, Scott, polpacci multipower, stacco omega, squat multipower, alzate laterali seduto.

**Regole archivio:**
- Aggiornare **dopo ogni sessione** in cui Gino comunica i pesi (WhatsApp/chat) — non inventare valori.
- Indicare sempre le **serie primarie** in `serie_label` (es. `prime 6-7 @ 30 + 2× @ 26`).
- Campo `started` per esercizio = prima data in cui quel movimento è stato registrato nell'archivio.
- Campo `started` globale nel JSON = inizio registrazione trimestre.
- **Asse X:** data esecuzione · **Asse Y:** peso primario (kg) + numero serie (barre separate).
- Solo **multi-articolari principali** — no accessori isolati (croci, leg curl, ecc.) salvo promozione esplicita.

**Schema voce `entries[]`:**

```json
{
  "date": "2026-07-27",
  "session_id": "2026-07-27",
  "serie": 10,
  "peso_kg": 30,
  "peso_secondario_kg": 26,
  "serie_label": "prime 6-7 @ 30 + 2× @ 26",
  "tut": "4s rientro",
  "note": "TUT aumentato — rientro 4 sec tra le ripetizioni"
}
```

**Checklist agente — momento di peso:**
1. Ricevi pesi da Gino → aggiungi voce in `exercise-progress.json` per ogni multi-articolare annotato.
2. Aggiorna tabella `.scheda-table` nella pagina sessione (colonne: Esercizio · Serie×Rep · kg · **TUT** · Note).
3. Verifica che i grafici trimestre (`#progressione-pesi`, `#progressione-gruppi`) riflettano i nuovi dati.
4. `node tools/aggiorna-exercise-progress.mjs` per validare il JSON.

### Tempo di esecuzione (TUT) — obbligatorio ovunque

Il **tempo di esecuzione** (TUT = Time Under Tension) va indicato in **tutte** le schede e nei log sessione. Nelle schede usare la dicitura **TUT**; nelle note sessione si può scrivere anche «tempo di esecuzione».

| Dove | Formato | Esempi |
|------|---------|--------|
| Card esercizio trimestre | `· TUT …` nella riga meta | `TUT 4s rientro` · `TUT 3-1-2` · `TUT ecc lenta` |
| Log sessione `.scheda-table` | Colonna **TUT** dedicata | `4s rientro` · `ecc 2s` · `3-1-2` |
| PDF schede A4 | Colonna **TUT** | Abbreviare se serve: `4s/1s` · `sq 3s` |
| `exercise-progress.json` | Campo `tut` per voce | Quando diverso dallo standard |

**Valori tipici Q3 2026:**
- Panca inclinata manubri: `4s rientro` (focus corrente)
- Pressa 45°: `ecc lenta`
- Leg extension: `4s su / 1s giù`
- Multi-articolari standard: `3-1-2` (eccentrica-pausa-concentrica)
- Rematore: `ecc 2s`
- Kettlebell finisher: `esplosivo` o `continuo`
- Adduttori · macchina Doktor PRIMO: `squeeze 3s`

### Confronto metabolico sessioni

Sezione `#confronto-metabolico` nel trimestre: tabella comparativa da `performance-sessions.json` (JS: `metabolic-comparison.js`) + analisi testuale con riferimenti scientifici. Confrontare solo sessioni con export Zepp completo (zone + effetto).

---

## 4. Schede tipo del trimestre (2026-Q3)

**Non legate al giorno del calendario.** Gino fa Scheda N quando può (martedì invece di lunedì, ecc.). Input sessione: **data + scheda N** (+ pesi se cambiano).

| Scheda | Focus |
|--------|-------|
| **1** | Petto, spalle, dorsali (6 es.) + Catch Ball opzionale **in chiusura** |
| **2** | Gambe, bicipiti (6 es.) |
| **3** | Spalle, dorsali (5 es.) + Clean Halo kettlebell **in chiusura** |
| **4** | Gambe, petto, bicipiti (6 es.) |

Schema: **4×8** (salvo 3×8 / 3×8-10). RIR 0-2 multiarticolari.

### Regola kettlebell (obbligatoria)

Qualsiasi esercizio con **kettlebell** (Catch Ball, Clean Halo, futuri) va **sempre per ultimo** nella scheda del giorno — finisher in chiusura, dopo multiarticolari e isolamenti. Non aprire la sessione con kettlebell: il lavoro pesante resta fresco, la FC sale solo alla fine.

### Gerarchia sezione Allenamenti (3 livelli — ordine obbligatorio)

1. **`/allenamenti/`** — Hub motivazionale: titolo energico, galleria foto Gino, link a trimestre e sessioni. Nessun log misto.
2. **`/allenamenti/trimestre-[slug]/`** — Solo riferimento: Schede 1–4 con esercizi, serie, **pesi iniziali concordati**, SVG, statistiche mensili. **Niente** log sessioni inline.
3. **`/allenamenti/sessioni/`** — Elenco per **data** (più recente in alto), **non** per numero scheda.
4. **`/allenamenti/sessioni/YYYY-MM-DD/`** — Pagina sessione (slug = **data**). Se in un’unica uscita Gino fa **più schede** (es. S1+S3), **una sola pagina** con log a blocchi e un export Amazfit. Slug legacy `YYYY-MM-DD-scheda-N` → redirect alla pagina unificata.

Input sessione: **data** (+ schede svolte + pesi). Se stesso giorno = stessa palestra = **un’unica sessione**, non due card.

URL legacy `/allenamenti/YYYY-MM-DD/` → redirect alla pagina sessione canonica.

Riflessioni → `/diario/` (separate). Opzionale: link «Riflessione del giorno» nel footer sessione se esiste articolo stesso giorno.

### Formato pagina sessione (obbligatorio — layout pro v3)

**Riferimento canonico:** `/allenamenti/sessioni/2026-08-04-scheda-2/` — ogni sessione passata e futura segue questa sequenza, queste classi CSS e questo stile visivo.

**URL:** `/allenamenti/sessioni/YYYY-MM-DD/` (canonico) · legacy `/allenamenti/sessioni/YYYY-MM-DD-scheda-N/` → redirect  
**CSS:** `styles.css?v=59` (o versione corrente — tieni tutte le pagine allineate).

#### Struttura HTML (due zone)

1. **`.session-hero`** — banda in testa fuori da `.prose`: breadcrumb, badge Scheda N, data/ora, titolo, sottotitolo, **6 KPI** (`.session-kpis`), link scheda trimestre + sessioni correlate + diario.
2. **`.session-body`** — contenuto in `.wrap.prose.prose--wide`: pannelli `.session-panel`, nav pill `.session-nav`, footer data.

#### Ordine sezioni nel body (non invertire)

| # | Blocco | Classe | Obbligatorio |
|---|--------|--------|--------------|
| 1 | **Modulo TSB SVG** | `.session-panel.session-panel--tsb` | Sì — marker `<!-- TSB-START -->` … `<!-- TSB-END -->` |
| 2 | Nota Gino | `.session-panel` + `.session-note` | Se note disponibili |
| 3 | Figure scheda | `.session-panel` + `#sessione-scheda-figure` | Sì (mount JS) |
| 4 | Log esercizi | `.session-panel` + `.scheda-table` | Se pesi annotati — colonne: Esercizio · Serie×Rep · kg · **TUT** · Note |
| 5 | Galleria foto/video | `.session-panel` + `.collage--scatter` | Se foto/video reali |
| 6 | **Readiness · Zepp** | `.session-panel.session-panel--readiness` | Se export readiness (vedi sotto) |
| 7 | **Metabolico · Amazfit** | `.session-panel.session-panel--metabolic` | Sì |
| 8 | Navigazione | `.session-nav` | Sì |
| 9 | Data aggiornamento | `.session-meta-footer` | Sì |

**Regola:** il modulo TSB SVG va **sempre per primo** nel body (subito dopo l’hero). Gli screenshot Zepp readiness/metabolici **non** sostituiscono il grafico SVG — sono complementari.

#### Sezione readiness (`.session-panel--readiness`)

Quando Gino invia screenshot readiness (HybridCharge, sonno, HRV, modulo TSB Zepp):

```
.session-panel--readiness
├── h2 «Metriche giornata · Zepp»
├── p intro (data + contesto)
├── .amazfit-tsb-hero              ← SEMPRE PRIMA, larghezza piena (fuori dalla griglia)
│   └── figure.phone-shot--landscape + img -tsb.webp
├── .amazfit-gallery               ← screenshot portrait in griglia 2/4 colonne
│   ├── hybridcharge (se c’è)
│   ├── sonno-score
│   ├── sonno-metriche
│   └── readiness-metriche (HRV)
└── .amazfit-data
    ├── .amazfit-card--wide TSB    ← prima card, griglia 6 celle (TSB · CTL · ATL · modulo · carico · orario)
    ├── .amazfit-card Sonno
    └── .amazfit-card HybridCharge
```

**Screenshot TSB (`-tsb.webp`):** blocco `.amazfit-tsb-hero` **sopra** la gallery — **mai** dentro la griglia a 4 colonne (altrimenti resta a metà larghezza e illeggibile). `loading="eager"` + `fetchpriority="high"` sull’immagine TSB.

**Variante agosto 2026 (prima settimana):** se mancano HybridCharge/sonno ma ci sono `stress.webp` + `training-balance.webp` (es. 3 agosto), usare la stessa sezione readiness con gallery adattata — TSB hero solo se esiste `-tsb.webp`.

**Sessioni senza export readiness:** omettere intera sezione §6 — solo modulo TSB SVG + blocco metabolico.

#### Sezione metabolica (`.session-panel--metabolic`)

```
.metabolic-block
├── h2 «Dati metabolici · Amazfit»
├── device + .amazfit-gallery__lead
├── .amazfit-gallery
│   ├── .phone-shot.phone-shot--full  riepilogo   ← prima, larghezza piena
│   ├── fc-grafico
│   ├── zone-effetto
│   ├── tecnica (radar)
│   └── valutazione (se c’è)
├── .amazfit-data (riepilogo · zone · tecnica · muscoli · nota TSB testuale)
├── .metabolic-note
└── .hr-log
```

**Riepilogo sessione:** prima figura della gallery metabolica con `.phone-shot--full` — occupa tutta la riga della griglia.

**TSB screenshot:** **non** ripetere in fondo al metabolico se già in `.amazfit-tsb-hero` (readiness). Nel metabolico resta solo card testuale TSB se serve contesto post-sessione.

Tool retroattivo: `node tools/standardizza-layout-sessioni.mjs`

#### Hero `.session-hero` + KPI `.session-kpis`

```html
<main id="contenuto">
  <header class="session-hero">
    <div class="wrap">
      <nav class="breadcrumb">…</nav>
      <div class="session-hero__top">
        <span class="session-hero__badge">Scheda N</span>
        <time class="session-hero__time" datetime="YYYY-MM-DDTHH:MM">DD mese YYYY · ore HH:MM · giorno</time>
      </div>
      <h1>Gruppi muscolari · aggettivo sessione</h1>
      <p class="session-hero__sub">Una riga di contesto</p>
      <dl class="session-kpis" aria-label="Metriche principali sessione">
        <div class="session-kpis__item session-kpis__item--accent"><dt>Durata</dt><dd>00:50:33</dd></div>
        <!-- FC media, FC max, Calorie, Carico, Gruppi -->
      </dl>
      <p class="session-hero__refs">Scheda di riferimento: … · Riflessione: …</p>
    </div>
  </header>
  <div class="wrap prose prose--wide session-body">…</div>
</main>
```

- **6 KPI fissi** in hero (stessi della `.hr-log` finale).
- Valori mancanti: `—`. Asterisco `*` se sovrastima device.
- **Sfondo velato sessioni:** `<main class="session-page">` + `/img/allenamenti/session-hero-bg.webp` (atleta Technogym). Preload in `<head>`.
- **Sfondo velato altre pagine:** `<main class="page-veiled">` o `<div class="page-veiled">` sotto l'hero + `/img/allenamenti/page-bg-dumbbells.webp`. Hero band su `.allenamenti-hero`, `.trimestre-hero`, `.hero--portrait` (chi-sono, diario). Home: sezioni sotto hero → `.page-veiled-band`.

#### Pannelli e navigazione

- Ogni sezione body → `.session-panel` con `.session-panel__label` (Nota di Gino · Log · Galleria · Tecnica).
- Metabolico → `.session-panel.session-panel--metabolic`.
- Footer → `.session-nav` con pill (prima pill = `.session-nav__primary` «← Tutte le sessioni»).
- Elenco `/allenamenti/sessioni/` → `.session-cards` / `.session-card` (non `.entry`).

#### Modulo TSB (fitness · fatica · riposo) — obbligatorio

Ogni pagina sessione e ogni **Scheda 1–4** nel trimestre includono il **grafico TSB** (CTL/ATL, barre carico, zone) **sempre visibile** come SVG statico in HTML — non solo il giudizio testuale del giorno. Riepilogo trimestrale in `#modulo-tsb`. Dettaglio: `SKILL-PERFORMANCE.md` § Modulo TSB.

Dopo ogni sessione: `node tools/aggiorna-training-load.mjs` (aggiorna JSON + rigenera grafici nelle pagine).

```html
<!-- TSB-START --> … grafico SVG + giudizio giornata … <!-- TSB-END -->
```

Tools: `tools/tsb-render.mjs` · `tools/inietta-tsb-pagine.mjs` · dati: `data/training-load.json`

#### Blocco foto e video (dentro `.session-panel`)

Galleria `.collage.collage--scatter` con una `figure.polaroid` per ogni foto reale della sessione (spogliatoio, palestra, dettagli attrezzi). Se Gino invia anche un **video** (es. l'esecuzione di un esercizio), va aggiunto come elemento in più nella stessa galleria, stesso standard:

```html
<figure class="polaroid polaroid--video">
  <video controls playsinline preload="metadata" width="464" height="832" poster="/img/allenamenti/YYYY-MM-DD/nome-poster.jpg">
    <source src="/img/allenamenti/YYYY-MM-DD/nome-video.mp4" type="video/mp4">
    Il tuo browser non supporta il video. <a href="/img/allenamenti/YYYY-MM-DD/nome-video.mp4">Scarica il video</a>.
  </video>
  <figcaption>Esercizio · dettaglio breve</figcaption>
</figure>
```

- **File:** salvato in `img/allenamenti/YYYY-MM-DD/` come `.mp4` (h264/aac — compatibile browser, niente conversioni extra se già in questo formato).
- **Poster:** frame estratto via `ffmpeg -ss 00:00:02 -i video.mp4 -frames:v 1 -q:v 3 nome-poster.jpg` — evita riquadro nero prima del play.
- **Attributi fissi:** `controls playsinline preload="metadata"` — mai `autoplay`.
- **Aspect ratio:** verticale 9:16 (tipico WhatsApp) via CSS `.polaroid--video video { aspect-ratio: 9/16; }`; adattare se il video è orizzontale.
- Stesso `figcaption` descrittivo delle foto, stesso stile polaroid (rotazione leggera, cornice crema).

#### Immagini raster — WebP obbligatorio (performance)

**Tutte** le foto raster del progetto (`jpg`, `jpeg`, `png`) devono essere in **WebP** per peso e LCP. SVG e `favicon.svg` restano invariati; video `.mp4` no.

| Azione | Tool |
|--------|------|
| Convertire tutto il repo | `node tools/convert-images-webp.mjs` |
| Dry-run (solo elenco) | `node tools/convert-images-webp.mjs --dry-run` |
| Nuova immagine caricata | Convertire subito in WebP e referenziare `.webp` in HTML/CSS/JSON |

**Flusso agente dopo upload foto:**
1. Salvare in `img/…` (anche temporaneamente come jpg/png).
2. Eseguire `node tools/convert-images-webp.mjs` — converte, aggiorna riferimenti in html/css/js/json/md/xml, elimina l’originale raster.
3. Verificare `og:image` e `poster` dei video.

**Parametri:** quality 82, effort 4 (`sharp`). Dipendenza: `npm install` in `tools/`.

**Naming screenshot Zepp:** preferire `.webp` in repo — es. `2026-08-04-scheda-2-riepilogo.webp` (non `.png`).

#### Upload foto da GitHub — cartella temporanea

Gino può caricare screenshot WhatsApp in `allenamenti/foto allenamento {data}/` (o simile). **L’agente** deve:

1. **Identificare** ogni JPEG/PNG (contenuto visivo, non il nome WhatsApp).
2. **Rinominare** con schema SEO fisso (vedi tabella sotto) in `img/allenamenti/amazfit/` o `img/allenamenti/YYYY-MM-DD/`.
3. **Convertire** in WebP (`quality 82`) — `node tools/processa-foto-upload.mjs` oppure `convert-images-webp.mjs`.
4. **Eliminare** la cartella upload e i JPEG originali — **mai** lasciare `WhatsApp Image …` nel repo.
5. **Aggiornare** pagina sessione: gallerie `.amazfit-gallery` + `alt` descrittivi (data, scheda, metriche, «Gino Capon», contesto geo/attività).

**Schema file SEO (slug fissi):**

| Tipo screenshot | Nome file | `alt` include |
|-----------------|-----------|---------------|
| Riepilogo sessione | `{date}-scheda-{n}-riepilogo.webp` | serie, kcal, FC, carico |
| Grafico FC | `{date}-scheda-{n}-fc-grafico.webp` | FC media/max, tipologia scheda |
| Zone + effetto | `{date}-scheda-{n}-zone-effetto.webp` | % zone, aerobico/anaerobico |
| Muscoli + radar | `{date}-scheda-{n}-tecnica.webp` | gruppi muscolari, radar |
| Testo valutazione | `{date}-scheda-{n}-valutazione.webp` | consistenza, stabilità, ritmo |
| HybridCharge panoramica | `{date}-scheda-{n}-hybridcharge.webp` | score, sforzo % |
| Sonno score | `{date}-scheda-{n}-sonno-score.webp` | score, Normale/Medio |
| Sonno metriche | `{date}-scheda-{n}-sonno-metriche.webp` | durata, profondo, REM |
| Metriche readiness | `{date}-scheda-{n}-readiness-metriche.webp` | HRV, carico sforzo |
| TSB modulo | `{date}-scheda-{n}-tsb.webp` | TSB, CTL, ATL |
| Stress | `{date}-scheda-{n}-stress.webp` | % rilassato |
| Training balance | `{date}-scheda-{n}-training-balance.webp` | focus FORZA/resistenza |

`{date}` = `YYYY-MM-DD` · `{n}` = numero scheda trimestre (1–4). Slug minuscolo, trattini, niente spazi né caratteri speciali.

**Alt text SEO:** italiano naturale + metriche chiave + «Gino Capon» + contesto (es. «gambe bicipiti», «culturismo amatoriale», «Amazfit Zepp») — non solo il nome file.

**Tool:** `node tools/processa-foto-upload.mjs [cartella-upload]` — mappa automatica WhatsApp → slug se la cartella segue il pattern `foto allenamento …`.

#### Intestazione (deprecata: `.session-head`)

**Usare `.session-hero` + `.session-kpis`** (vedi sopra). Il vecchio `.session-head` resta solo per retrocompatibilità — non usarlo in pagine nuove.

```html
<!-- DEPRECATO — non usare -->
<header class="session-head">…</header>
```

#### Blocco metabolico `.metabolic-block`

**Principio:** gli **screenshot originali Zepp** sono il cuore visivo della sessione — grafici FC, barre zone, gauge effetto, radar tecnica. Gino li invia ad ogni allenamento; vanno **sempre pubblicati** quando disponibili, non solo le tabelle HTML. Le card con numeri servono a SEO, accessibilità e ricerca; le foto danno **autorità e impatto**.

1. **Titolo fisso:** `Dati metabolici · Amazfit`
2. **Device:** `Amazfit Active 2 NFC · sync app Zepp · Allenamento muscolare`
3. **Intro galleria** `.amazfit-gallery__lead` — una riga che spiega che sono export originali app
4. **Galleria screenshot** `.amazfit-gallery` — griglia 2×2 (mobile) / 4 colonne (desktop). Ordine fisso:
   | # | File | Classe | Contenuto |
   |---|------|--------|-----------|
   | 1 | `-riepilogo.webp` | `.phone-shot--full` | Card riepilogo Zepp — **larghezza piena, prima riga** |
   | 2 | `-fc-grafico.webp` | `.phone-shot` | Grafico linea FC con picchi e valli |
   | 3 | `-zone-effetto.webp` | `.phone-shot` | Barre zone FC + gauge effetto aerobico/anaerobico |
   | 4 | `-tecnica.webp` | `.phone-shot` | Radar valutazione movimento — **obbligatorio** se Gino lo invia |
   | 5 | `-valutazione.webp` | `.phone-shot` | Testo valutazione (se separato da tecnica) |
   Ogni figura: `.phone-shot` + `.phone-shot__frame` + `figcaption` descrittiva.

   **Regola agente (non dimenticare):** quando Gino manda gli screenshot Zepp, sono **sempre 4** (riepilogo, grafico FC, zone+effetto, **radar tecnica**). Se ne manca uno in chat, chiedere; se c’è, **pubblicarlo tutti e 4** — galleria + card testo tecnica + JSON `tecnica`. Non fermarsi a 3/4.
5. **Dati estratti** `.amazfit-data` — griglia 2 colonne (desktop) con `.amazfit-card`:
   - **Riepilogo** — griglia **6 celle fisse** (stesso ordine):
     1. Tempo allenamento (`.amazfit-card__cell--highlight`)
     2. Recupero tra set
     3. FC media · bpm
     4. FC max · bpm
     5. Calorie · kcal
     6. Carico allenamento
   - Badge in header: `N gruppi`
   - **Zone + effetto** — `.hr-zones` + `.hr-effects` nella stessa card
   - **Tecnica testo** — `.amazfit-card--wide` con 5 righe (se radar Zepp)
6. **Analisi sessione** `.metabolic-note` — **obbligatoria** con export completo: 2–3 frasi che interpretano i dati (zona dominante, FC max, coerenza con esercizi/pesi). Non solo numeri — racconto breve.
7. **Sintesi** `.hr-log.hr-log--elevated` — griglia **6 metriche fisse**:
   Durata · FC media · FC max · Calorie · Carico · Gruppi

**Input Gino ad ogni sessione:** invia screenshot Zepp (WhatsApp/chat) — **4 schermate fisse**: riepilogo, grafico FC, zone+effetto, radar tecnica. L’agente li salva in `img/allenamenti/amazfit/`, compila galleria (tutti e 4) + dati + card tecnica + analisi. **Checklist rapida:** `[ ] riepilogo  [ ] fc-grafico  [ ] zone-effetto  [ ] tecnica`

**Layout:** griglia visibile — **mai** scroll orizzontale che taglia i dati a destra. Vedi `SKILL-PERFORMANCE.md`.

Valori mancanti: `—`. Asterisco `*` se sovrastima device. Sessioni senza screenshot: solo `.amazfit-data` + nota «export Zepp non disponibile».

#### Footer (deprecato: `.session-footer`)

**Usare `.session-nav`** (vedi sopra). `.session-footer` con link separati da `·` è deprecato.

**Non** usare stili inline su `.amazfit-card` nella strip — usare classi CSS condivise.

---

## 5. Tono e compliance

- Tono: professionale ma **dilettante autentico** — diario, non coaching commerciale.
- Disclaimer su ogni scheda: non PT, non medico.
- Dati numerici: **solo da log reali** (Amazfit, bilancia, metriche).
- **Privacy/GDPR:** banner cookie conforme Garante 2021, `/privacy/`, `/cookie/`, gate informativo su contenuti (`js/cookie-consent.js`). Email titolare: ginocapon@gmail.com
- **Banner cookie:** `<div role="dialog">` — **mai** `<aside role="dialog">` (conflitto ARIA, fallisce Navigazione agentica Lighthouse).
- **Newsletter + scheda PDF:** Google Apps Script + Gmail (`ginocapon@gmail.com`) + Foglio Google. Setup: `NEWSLETTER-SETUP.md` · script in `newsletter/google-apps-script.gs`

### Navigazione agentica (Lighthouse 13+)

Punteggio frazionario **n/3** (non 0–100). Audit applicabili su sito statico:

| Audit | Requisito |
|-------|-----------|
| Accessibility tree | Contrasto link `.prose a` ≥ 4.5:1 su sfondo scuro; colori `.amazfit-card__*` accessibili; ARIA validi (cookie banner) |
| CLS | ≤ 0.1 (già ok) |
| llms.txt | H1 + blockquote + link Markdown `[testo](url)` — **non** URL nudi |

### Anomalie device (obbligatorio)

Se Amazfit/Zepp gonfia durata (orologio lasciato acceso):

1. Pubblica **durata corretta** dichiarata da Gino (es. ~01:15:00).
2. Conserva in nota i valori grezzi device (durata, intervalli set).
3. **Non inventare** zone FC / effetto se contaminati dall’idle — ometti o marca `non affidabili`.
4. Calorie e carico device: pubblicabili con asterisco *possibile sovrastima*.
5. Attributo HTML: `data-duration-corrected="true"` sul `.hr-log`.

### Esercizi sperimentali

Nuovi movimenti kettlebell (es. Catch Ball, Clean Halo) → card **in chiusura** scheda giorno, tag **Opzionale** o **Finisher**, nota “in prova” se applicabile. **Mai** in apertura sessione. Non promuovere a fisso finché Gino non conferma ripetizione.

---

## 5a. Newsletter e scheda pesi PDF

### Flusso

1. Link **Scarica scheda** da `/allenamenti/` o trimestre → `/allenamenti/newsletter/?from=schede-peso`
2. Iscrizione (consenso privacy) → Google Apps Script + Gmail
3. Redirect `/allenamenti/schede-peso/` — **1 foglio A4 orizzontale** (griglia 2×2)
4. `localStorage` `fq_newsletter_ok` sblocca visite successive (stesso browser)

### Scheda A4

- 4 quadranti (Scheda 1–4) su **un solo foglio** orizzontale
- Colonne: Esercizio · S×R · kg · **TUT** · Note + riga log per quadrante
- Stampa: orizzontale, margini minimi, 100%

### Database iscritti + consenso (GDPR)

- **Email → solo Foglio Google** (mai su GitHub — repo pubblico)
- **Doppio opt-in:** iscrizione → stato `da confermare` → email conferma → click → `confermato`. Newsletter inviata **solo ai confermati**.
- **Disiscrizione un click:** link `?action=unsub` in ogni email → stato `disiscritto`.
- Colonne foglio Iscritti: Data · Nome · Email · Consenso · Origine · **Stato** · **Token**
- Accessi/stampe → foglio **Accessi scheda** (Apps Script `doGet?action=log`)
- Conteggi anonimi → `data/site-stats.json` (sync automatico da GAS)
- Venerdì → `SKILL-VENERDI.md` + workflow GitHub + `riepilogoVenerdi()` Gmail
- **Sync conteggi:** `node tools/sync-newsletter-stats.mjs` ← legge `?action=stats` (solo numeri, zero email)
- CI: `.github/workflows/newsletter-stats-sync.yml` (1°/16° mese + venerdì)

### 5a.2 Promemoria quindicinale + sync iscritti (zero API a pagamento)

**Obiettivo:** ogni ~15 giorni Gino riceve un nudge gentile (email) e l’agente Cursor sa ricordargli il rituale — senza OpenAI, senza Supabase.

| Cosa | Come | Quando |
|------|------|--------|
| **Email a Gino** | Apps Script `promemoriaQuindicinale()` → Gmail | Trigger: **1° e 16°** del mese, ore 09:00 (setup una tantum su script.google.com) |
| **Conteggi sul sito** | GAS `?action=stats` → `tools/sync-newsletter-stats.mjs` | CI 1°/16° + venerdì; oppure manuale |
| **Agente Cursor** | Se `ultimo_controllo` in `site-stats.json` > 15 giorni **oppure** oggi è 1 o 16 del mese → invia il testo sotto | A ogni chat rilevante |

**Setup GAS (una tantum dopo pull):**

1. Incolla `newsletter/google-apps-script.gs` aggiornato su script.google.com
2. **Deploy → Gestisci distribuzioni → Nuova versione**
3. Trigger (icona orologio) → Aggiungi:

| Funzione | Tipo | Giorno | Ora |
|----------|------|--------|-----|
| `promemoriaQuindicinale` | Temporizzato | **1** e **16** del mese | 09:00–10:00 |
| `riepilogoVenerdi` | Temporizzato | Venerdì | 09:00–10:00 |

**Test stats:** apri nel browser  
`https://script.google.com/macros/s/…/exec?action=stats`  
→ JSON con `iscritti_totali`, `accessi_scheda_settimana` (no email).

**Comando locale:**

```bash
node tools/sync-newsletter-stats.mjs
node tools/aggiorna-site-stats.mjs   # aggiorna anche diario/sessioni/età
```

**Testo promemoria agente (copia-incolla se Gino apre Cursor nel giorno 1/16 o dopo 15 gg senza controllo):**

> Gino, è il momento della quindicina — niente fretta, niente guru.  
> Apri il [Foglio iscritti](https://docs.google.com/spreadsheets/d/1i7QgrgJuO_OR076jnl2vN7KLbY_TdPHIrZXfSqjGDxA/edit), guarda i confermati, e dimmi cosa vuoi fare: articolo diario, sessione, newsletter agli iscritti, o solo aggiornare i numeri.  
> Se serve: `node tools/sync-newsletter-stats.mjs` · comando editoriale venerdì · Guardian `node guardian/scripts/guardian.mjs run`.  
> Stiamo costruendo lascito per Ginevra — presente batte perfetto.

**Regola agente:** non inventare conteggi iscritti; usare `data/site-stats.json` dopo sync o chiedere a Gino di aprire il Foglio.

### 5a.0 Premortem Guardian (sistema operativo)

**Obiettivo primario del sito:** acquisire iscritti **newsletter** (PDF scheda gratuita) → audience per prodotti futuri (schede premium, community). Non è un CRM immobiliare.

**Entry point unico:** `node guardian/scripts/guardian.mjs run`

| Risorsa | Path |
|---------|------|
| Sistema | `guardian/` |
| Skill agente | `guardian/skill/SKILL.md` |
| Analisi integrazione | `docs/GUARDIAN-INTEGRATION.md` |
| Cron CI | `.github/workflows/guardian-run.yml` |
| Venerdì | `weekly_strategy` job + issue checklist esistente |

Sequenza: CONTEXT → OBSERVE → VERIFY → … → NEXT CHECK. Autonomia: GREEN report only · YELLOW proposta · RED approvazione umana.

### 5a.1 Contatori home · profilo Gino · età biologica (obbligatorio)

**Profilo fisso** in `data/gino-profile.json`:

| Campo | Valore | Note |
|-------|--------|------|
| `birth_date` | `1969-01-27` | Compleanno **27 gennaio** — età cronologica si aggiorna da sola |
| `training_start_year` | `2016` | Primo anno palestra regolare → 2026 = **10 anni**, 2027 = **11**, ecc. |

**Conteggi dinamici** in `data/site-stats.json` (generato, no email):

| Campo | Fonte |
|-------|--------|
| `chronological_age` | Calcolo da `birth_date` |
| `training_years` | `anno corrente − training_start_year` |
| `diario_articles` | Cartelle `diario/*/index.html` |
| `sessions_documented` | Sessioni in `performance-sessions.json` con `zones` e non `partial` |
| `updated` | Data ultimo aggiornamento script |

**Età biologica** → `data/biological-age.json` via `node tools/aggiorna-bio-age.mjs` (usa stessa età cronologica da `gino-profile.json`).

**Script unico (dopo sessione, articolo diario, o mensile):**

```bash
node tools/aggiorna-site-stats.mjs
```

Esegue anche `aggiorna-bio-age.mjs`. La home legge i numeri con `js/site-stats.js` (`data-site-stat` su `index.html`, `diario/index.html`, `chi-sono/index.html`).

**Checklist agente — quando pubblicare:**

1. Nuova sessione con export Zepp → `aggiorna-performance.mjs` + **`aggiorna-site-stats.mjs`**
2. Nuovo articolo diario → **`aggiorna-site-stats.mjs`**
3. **Fine mese** (con screenshot Zepp / sonno) → **`aggiorna-site-stats.mjs`** + verifica `biological-age.json` e timeline
4. Dopo **27 gennaio** → età cronologica +1 automatica al prossimo run script (non editare `57` a mano in HTML)

**HTML home** — non hardcodare `10+` / `7 articoli`: usare `data-site-stat` o valori fallback aggiornati dallo script.


### File

| Path | Ruolo |
|------|--------|
| `/allenamenti/newsletter/` | Landing + form |
| `/allenamenti/schede-peso/` | Catalogo schede per periodo |
| `/allenamenti/schede-peso/trimestre-…/` | Scheda A4 del periodo |
| `js/newsletter.js` | Submit, gate, demo test |
| `SKILL-VENERDI.md` | Checklist settimanale |

### Promozione

- Box scheda in hub allenamenti + callout nel trimestre
- Sezione newsletter in fondo a `/allenamenti/`

### Nuovo trimestre / nuovo periodo

Per ogni arco temporale creare:

1. **Programma** → `/allenamenti/trimestre-[mesi]-[anno]/` (obiettivo nel titolo, es. *Ipertrofia natural*)
2. **Scheda PDF A4** → `/allenamenti/schede-peso/trimestre-[mesi]-[anno]/`
3. **Voce catalogo** in `/allenamenti/schede-peso/index.html` e sezione hub `/allenamenti/#schede-periodo`
4. **Generare il PDF allegato alla newsletter** (lo faccio io, non l'utente):
   - Dopo il push della pagina scheda: `node tools/genera-pdf-scheda.mjs <slug> scheda-forza-quotidiana-<periodo>.pdf`
   - Produce **A4 orizzontale, 1 pagina** (Puppeteer + Chrome, apre la pagina con `?sub=1` per superare il gate)
   - Committare il PDF nella cartella della scheda
   - Aggiornare in `newsletter/google-apps-script.gs` le variabili `SCHEDA_URL`, `SCHEDA_PDF_URL`, `SCHEDA_PDF_NOME` → poi ricordare all'utente di **ripubblicare** lo script

Ogni scheda deve indicare chiaramente:

| Campo | Esempio Q3 2026 |
|-------|-----------------|
| **Obiettivo / tipo** | Ipertrofia natural |
| **Periodo (date)** | 1 giu – 31 ago 2026 |
| **Badge** | Q3 · 2026 |
| **Focus** | Forza · ricomposizione · articolazioni |

- Aggiornare contenuto scheda PDF (esercizi, pesi iniziali)
- Inviare email agli iscritti quando il trimestre è online

---

## 5b. Editoriale Diario vs Allenamenti

**Pipeline settimanale goliardica (3 articoli venerdì 07:00 CEST):** vedi `SKILL-EDITORIAL.md` — discovery, anti-doppioni, hero fumetto/surreale, newsletter only, zero vendita.

**Separazione netta:**

| Diario `/diario/` | Allenamenti `/allenamenti/` |
|-------------------|----------------------------|
| Solo **riflessioni** e articoli | Log sessioni, trimestre, Amazfit |
| Momenti catartici, foto, racconti, anche scherzosi | Schede 1–4, pesi, dati metabolici |
| **Nessun link** a pagine sessione/trimestre nel corpo articoli | Può linkare riflessioni del giorno |
| Un solo pulsante generico → `/allenamenti/` | — |

Non pubblicare log allenamento sotto `/diario/`. URL legacy → redirect a sessione.

### URL articoli diario (SEO · GEO — BLOCCANTE)

Slug **corto, descrittivo, unico** — niente doppioni semantici con articoli esistenti.

| Regola | Esempio |
|--------|---------|
| Pattern | `/diario/[tema-chiave]-[contesto]-57-anni/` oppure `/diario/[tema-chiave]-57-anni/` se già chiaro |
| Parole | italiano, minuscole, trattini, keyword naturali (no stopword in eccesso) |
| Lunghezza | **3–6 token** dopo `/diario/` — efficacia > verbosità |
| Anti-doppione | Prima di pubblicare: cercare slug e H1 simili in `/diario/`; un angolo nuovo per tema vicino |
| Età | `57-anni` quando rilevante per E-E-A-T (come gli altri articoli) |
| Data | Non obbligatoria nello slug (va in `datePublished` e nel feed) |

**Esempi validi:** `allenare-pensieri-positivi-57-anni` · `mare-sole-e-disconnessione-per-lo-sportivo`  
**Evitare:** URL generiche (`articolo-1`), slug duplicati (`pensieri-positivi` se esiste già tema social), inglesi misti senza motivo.

### Struttura articolo riflessione

1. **Box sintesi GEO** — prime 150 parole, frase dichiarativa auto-contenuta
2. **Apertura scene-based** — giorno reale (sonno, orario palestra, ufficio)
3. **10–15 H2/H3** — spesso come domanda (AEO); primo paragrafo = risposta 40–60 parole
4. **≥ 2500 parole** utili (no riempimento)
5. **FAQ** — min 5 domande + schema `FAQPage`
6. **Takeaway concreti** (3 bullet max)
7. **Chiusura identitaria** + bio autore E-E-A-T

### Voce

| Fare | Evitare |
|------|---------|
| Prima persona onesta, età dichiarata | Motivazione da reel / emoji |
| Sport = struttura di serenità mentale | Promesse estetico-competitive |
| Settimana come unità di equilibrio | “Giornata perfetta” come standard |
| Menzionare palestra senza linkare log | Link a `/allenamenti/sessioni/` o trimestre |
| Pulsante «Vai agli Allenamenti» solo in `diario/index.html` | Log misti nel feed diario |

### SEO minimo articolo

- Title + meta description unici; `og:image` = foto reale della sessione se c’è.
- `BlogPosting` JSON-LD con `datePublished` / `dateModified`.
- Voce in `diario/index.html`, `sitemap.xml`, `llms.txt`.

---

## 8. SEO · GEO · AEO · contenuti (da template operativo)

> Riferimento esteso: `SKILL-SEO-GEO.md`. Regole **bloccanti** per ogni articolo diario.

### Claim consentiti (Forza Quotidiana)

| Dato | Valore verificabile |
|------|---------------------|
| Autore | Gino Capon, 57 anni |
| Allenamento | Da 10+ anni, dilettante autentico |
| Sito | forzaquotidiana.it |
| Target | Uomini 40–65, vita impegnata |
| Obiettivo sito | Diario + allenamento reale, non coaching commerciale |

**Regola d’oro:** niente «miglior PT», percentuali risultati clienti, promesse estetiche. Solo dati e storie verificabili.

### Regole operative sito

1. Leggere il file prima di modificarlo
2. **Mobile-first** (375px)
3. URL pulite — canonical coerente, `sitemap.xml` aggiornata
4. Dominio canonico: `https://forzaquotidiana.it` (apex, no www)
5. Cache-busting CSS/JS: `?v=N` incrementato a ogni modifica
6. WCAG AA — contrasto CTA ≥ 4,5:1
7. No `loading="lazy"` su hero/LCP
8. Commit solo se richiesto; push solo se esplicito

### Title e meta (BLOCCANTE)

| Campo | Target | Max |
|-------|--------|-----|
| `<title>` | ≤60 caratteri | 70 |
| `meta description` | 120–155 caratteri | 160 |

- Title, H1 e meta = **varianti diverse**
- Verificare conteggio caratteri prima di pubblicare

### Standard articolo diario (BLOCCANTE)

| Requisito | Valore |
|-----------|--------|
| **Lunghezza minima** | **≥ 2500 parole** (salvo istruzione diversa esplicita) |
| **H2/H3** | 10–15 sezioni |
| **Box sintesi GEO** | Prime 150 parole — frase dichiarativa auto-contenuta |
| **GEO sezioni** | Prime 2 righe di ogni H2 = frase dichiarativa con fatto |
| **AEO** | H2 spesso in forma di domanda; primo paragrafo = risposta 40–60 parole |
| **FAQ** | Min **5** domande visibili + schema `FAQPage` JSON-LD |
| **Link interni** | Min 3 (es. `/chi-sono/`, `/diario/`, `/allenamenti/`, newsletter) |
| **E-E-A-T** | Bio autore a fine articolo; link `/chi-sono/` |
| **Schema** | `BlogPosting` + `FAQPage` (`@graph`) |
| **Separazione** | **Nessun link** a pagine sessione/trimestre nel corpo (§5b) |

### Checklist ogni nuova pagina

- [ ] Title/meta §8 OK
- [ ] H1 unico
- [ ] Alt text immagini
- [ ] Canonical + OG
- [ ] JSON-LD BlogPosting (+ FAQPage se articolo) + **BreadcrumbList**
- [ ] ≥2500 parole (articoli diario)
- [ ] Box sintesi + FAQ
- [ ] 3+ link interni
- [ ] `sitemap.xml` + `llms.txt`
- [ ] `dateModified` aggiornato
- [ ] **`?v=N` CSS/JS uniforme** su tutte le pagine (attuale: `styles.css?v=35`, `cookie-consent.js?v=2`)

### Igiene tecnica (obbligatoria)

- **Cache-busting coerente:** quando cambi `css/styles.css` o un JS, incrementa `?v=N` **su tutte le pagine insieme** (non lasciare pagine a versioni vecchie). Versione corrente: CSS `v=32`, `newsletter.js v=3`.
- **`404.html`** presente in root (noindex, follow) — mantenere link a Home/Diario/Allenamenti.
- **BreadcrumbList** su ogni pagina interna (Home → sezione → pagina).
- Dominio canonico unico: `https://forzaquotidiana.it` (apex, no www).

### GEO + AEO (sintesi)

**GEO:** ogni sezione inizia con una frase che un motore generativo può citare da sola.  
*Es.: «Gino Capon, 57 anni, allena 4 volte a settimana conciliando lavoro e famiglia — non come influencer, ma come dilettante documentato.»*

**AEO:** H2 = domanda; risposta diretta sotto; FAQ schema allineato al testo visibile.

### Search Console — venerdì

Integrato in `SKILL-VENERDI.md`. URL chiave da ispezionare:

```
https://forzaquotidiana.it/
https://forzaquotidiana.it/chi-sono/
https://forzaquotidiana.it/diario/
https://forzaquotidiana.it/allenamenti/
https://forzaquotidiana.it/allenamenti/trimestre-giugno-luglio-agosto-2026/
https://forzaquotidiana.it/diario/sport-lavoro-famiglia-a-57-anni/
https://forzaquotidiana.it/diario/perche-forza-quotidiana/
https://forzaquotidiana.it/allenamenti/newsletter/
```

### PAGE SCORE (priorità settimanale)

| Etichetta | Azione |
|-----------|--------|
| **SOSTENERE** | Impressioni GSC, 0 click → rifare title/meta + sezione |
| **GEO** | Manca FAQ/box sintesi → aggiungere |
| **AGGIUNGERE** | Keyword gap → 1 articolo (anti-doppioni) |
| **MANTENERE** | Winner → solo `dateModified` |

### Cosa NON copiare (template Righetto)

Claim immobiliari, schema `RealEstateAgent`, cluster zone locali commerciali, Supabase annunci.

---

## 6. Checklist pubblicazione nuovo trimestre

- [ ] URL trimestre creato, vecchio trimestre linkato come "archivio"
- [ ] Zero immagini copiate da PDF esterni
- [ ] SVG verificati per ogni esercizio
- [ ] Almeno 1 log cardiaco se disponibile
- [ ] Tabella statistiche mensili aggiornata
- [ ] `sitemap.xml` + voce Diario + `llms.txt`
- [ ] `og:image` = hero sito o grafica trimestre SVG (non screenshot Amazfit con dati personali sensibili oltre ciò che Gino approva)
- [ ] Scheda pesi PDF aggiornata in `/allenamenti/schede-peso/`
- [ ] Email newsletter agli iscritti (funzione `inviaAggiornamentoATutti` in Apps Script)

### Checklist sessione + articolo (stesso giorno)

- [ ] Layout **pro v3** (riferimento `2026-08-04-scheda-2`): TSB SVG → nota → figure → log → readiness → metabolico
- [ ] Screenshot TSB in `.amazfit-tsb-hero` (larghezza piena) · riepilogo con `.phone-shot--full`
- [ ] `node tools/aggiorna-training-load.mjs` + `node tools/aggiorna-performance.mjs`
- [ ] Log `.hr-log` in pagina sessione dedicata (non nel trimestre)
- [ ] Se c’è riflessione: pagina in `/diario/` **senza link** al log sessione
- [ ] Catch Ball / esercizi nuovi: card opzionale in giorno scheda
- [ ] Statistiche mensili ricalcolate
- [ ] Feed `diario/index.html` (solo riflessioni) + sitemap + llms.txt

---

## 7. Prossimi trimestri (roadmap)

| Trimestre | Periodo | URL slug |
|-----------|---------|----------|
| Q3 2026 | Giu–Lug–Ago | `trimestre-giugno-luglio-agosto-2026` |
| Q4 2026 | Set–Ott–Nov | `trimestre-settembre-ottobre-novembre-2026` |

Ripetere struttura §1–§6 identica; aggiornare solo contenuti e log.

---

## 8. Admin — Periodizzazione e macrociclo

> **Quando caricare:** nuovo macrociclo annuale, modifica fasi, pesi ipotizzati, prototipi admin, rigenerazione `macrociclo-2026-2027.json`.

### 8.1 Area admin (non pubblica)

| Risorsa | Path |
|---------|------|
| Dashboard sessioni | `/admin/` |
| Scheda singola sessione | `/admin/sessione/?ciclo=<id>&sessione=a1\|b1\|a2\|b2` |
| **PDF scheda sessione** | `/admin/sessione/pdf/?ciclo=<id>&sessione=a1` — A4 verticale, sidebar log |
| Teoria + hub schede (anno/periodo/fasi/PDF) | `/admin/prototipi/periodizzazione/` — **unico posto** |
| PDF una fase (A1–B2) | `/admin/prototipi/periodizzazione/fase/?anno=2026-2027&fase=<id>` |
| Hub anni | `admin/data/hub-periodizzazione.json` |
| Dati macrociclo | `admin/data/macrociclo-2026-2027.json` |
| **Blocco 1 dettaglio** (fonte di verità sett. 2026) | `admin/data/blocco-1-fase1.json` |
| **Mappa esercizi** (figure SVG) | `/admin/mappa-esercizi/` |
| Catalogo esercizi + figure | `admin/data/esercizi-catalogo.json` + `admin/img/esercizi-sprite.svg` |
| Sync Blocco 1 → macrociclo | `node tools/sync-blocco1-macrociclo.mjs` |
| Teoria generica (archivio) | `admin/data/mesocicli.json` — vecchie schede/pdf → redirect all’hub |
| Rigenera macrociclo | `node tools/genera-macrociclo.mjs` + `rebalance-macrociclo-55.mjs` |

- `noindex` + `robots.txt` → `Disallow: /admin/`
- **Non** linkare dall’hub pubblico `/allenamenti/`
- Password admin: da implementare in seguito

### 8.2 Gerarchia periodizzazione

```
MACROCICLO  = anno intero (~52 settimane)
MESOCICLO   = fase macro (~12–13 sett. per Gino — modello trimestre)
MICROCICLO  = settimana (4 sessioni A1-B1-A2-B2)
```

**Regola d’oro per Gino Capon (57 anni, natural, ~10 anni palestra):** cambiare schema ogni **2–3 mesi**, non ogni mese. Il trimestre Q3 2026 (12 settimane stessa scheda) è il modello corretto. **4 fasi × ~13 settimane** = anno intero; deload = **ultima settimana** di ogni fase di lavoro (non micro-fasi separate da 4–6 sett.).

### 8.3 Linee guida da fonti americane (sintesi)

| Fonte | Mesociclo ipertrofia | Note |
|-------|---------------------|------|
| **Mike Israetel** (Renaissance Periodization) | 4–8 sett. (+ deload) | Principianti fino a 8–12 sett.; avanzati 3–6 sett. Sweet spot molti: 4–6 sett. accumulo |
| **Eric Helms** (3DMJ) | 4–8 sett. | Deload/diet break ogni 4–8 sett.; progressione graduale |
| **Jeff Nippard** | 4–8 sett. (intermedi) | «Se progredisci, continua 8–12 sett.»; programmi con blocchi da 6–8 sett. |

**Adattamento per Gino:** profilo **intermedio maturo** → mesocicli **12–13 settimane** (come il trimestre documentato), con **deload interno** in settimana 13. Non usare blocchi da 3–6 settimane: troppo brevi per adattamento a 57 anni.

### 8.4 Split settimanale A1–B2 (invariato tutto l’anno)

| Sessione | Origine scheda Q3 | Focus | Progressione (*) |
|----------|-------------------|-------|------------------|
| **A1** | Scheda 1 | Petto · Schiena · Spalle | Panca inclinata manubri |
| **B1** | Scheda 2 | Gambe accosciata · Braccia | Adduttori / pressa |
| **A2** | Scheda 3 | Schiena · Spalle · Petto | Rematore / lento avanti |
| **B2** | Scheda 4 | Gambe anca · Braccia | Stacco omega |

\* = esercizio principale con progressione a carico fisso e schema RIR.

**Finisher kettlebell (regola fissa):** Catch Ball in A1, Clean Halo in A2 — **sempre ultimo esercizio**, mai all’inizio.

### 8.5 Macrociclo 2026–2027 (52 settimane)

**Inizio:** 1 settembre 2026 · **Fine:** 31 agosto 2027 · **Peso partenza:** 67,0 kg

| # | Fase | Durata | Periodo | Obiettivo |
|---|------|--------|---------|-----------|
| 1 | **Ipertrofia accumulo** | **13 sett.** | Set–Nov 2026 | Soft start sett. 1–2 · accumulo 8–12 · deload sett. 13 |
| 2 | **Tensione + Forza** | **13 sett.** | Dic 2026–Mar 2027 | Tensione 1–6 · forza 7–12 · deload 13 |
| 3 | **Ipertrofia II** | **13 sett.** | Mar–Mag 2027 | +2,5 kg fondamentali · volume ↑ sett. 9–12 · deload 13 |
| 4 | **Ricondizionamento** | **13 sett.** | Giu–Ago 2027 | Mantenimento estivo 10–12 rep, RIR 2–3 |

**Totale:** **4 fasi** · 52 settimane · deload incorporato (niente 9 micro-fasi)

Rigenera: `node tools/genera-macrociclo.mjs`

### 8.6 Pesi base (da trimestre Giu–Lug–Ago 2026)

Usare come riferimento per ipotizzare carichi nel macrociclo. Aggiornare da log sessioni reali.

| Sessione | Esercizio | Peso riferimento |
|----------|-----------|------------------|
| B1 | Pressa 45° | 140 / 120 kg |
| B1 | Leg extension | 65 / 55 kg |
| B1 | Adduttori · Doktor PRIMO | 60 → 50 kg |
| B1 | Curl Scott | 35 / 30 kg |
| B1 | Polpacci drop | 140→110→80 kg |
| B2 | Squat multipower | 60 / 55 kg |
| B2 | Stacco omega | 60 kg |
| B2 | Chest press | 70 kg |
| B2 | Leg curl | 45 kg |
| B2 | Polpacci multipower | 80 kg |
| B2 | Curl martello | 18 kg/manubrio |
| A1/A2 | Catch Ball / Clean Halo | 8 kg kettlebell |

### 8.7 Regole modifica mesociclo

1. **Non accorciare** un mesociclo sotto **12 settimane** per Gino senza motivo (infortunio, viaggio lungo).
2. **Deload** = settimana 13 di ogni fase di lavoro (−40% volume) — non saltare.
3. **Stessi esercizi** per tutta la fase; cambia solo serie/reps/RIR/peso.
4. **Progressione:** quando 2 sessioni consecutive al limite superiore reps con RIR target → +2,5–5 kg sul movimento *.
5. **Log reale** resta in `/allenamenti/sessioni/` — l’admin è prototipo/mappa, non sostituisce il log.
6. **PDF stampabile:** margini stampa **8 mm** (non minimi); fascia **Osservazioni** in alto; non tagliare il bordo inferiore.

### 8.8 PDF scheda sessione (palestra)

Ogni sessione A1–B2 ha un **PDF dedicato** (stampabile anche per amici — **anonimo**):

- **Intestazione:** «Scheda allenamento» (niente nome atleta), fase/ciclo, periodo, RIR, riga **Atleta: _______**
- **Pesi:** colonna/target **vuota** (`kg: _______`) — da compilare dopo test massimali
- **Colonna principale:** esercizio + SVG + gruppi muscolari + note tecniche (senza kg fissi)
- **Sidebar destra:** spazi per data/durata/RPE + per ogni esercizio righe **S1–Sn kg/rep** e campo **Note**

**Path:** `/admin/sessione/pdf/?ciclo=<id-fase>&sessione=a1`  
**Dati:** `admin/data/macrociclo-2026-2027.json` + `esercizi-catalogo.json`  
**Ribilancio ~55% lower:** `node tools/rebalance-macrociclo-55.mjs` (dopo `genera-macrociclo.mjs`)

Stampa: **A4 verticale**, margini standard, «Salva come PDF» dal browser.

### 8.9 Checklist nuovo macrociclo admin

- [ ] Aggiornare date e durate in `admin/data/macrociclo-2026-2027.json` (o `tools/genera-macrociclo.mjs` + `rebalance-macrociclo-55.mjs`)
- [ ] Verificare ~55% serie gambe+polpacci
- [ ] Pesi esercizi = `—` fino a massimali
- [ ] PDF sessione anonimo (no nome brand/atleta in stampa)
- [ ] Allineare `periodizzazioneAnnuale` in `admin/data/mesocicli.json`
- [ ] Dashboard `/admin/` mostra tutte le fasi con link A1–B2
- [ ] Aggiornare questa sezione §8 se cambiano le linee guida

### 8.11 Blocco 1 · Ipertrofia accumulo (da 1 settembre 2026)

**Fonte di verità:** `admin/data/blocco-1-fase1.json` — contiene A1–B2 con tempo, recuperi, progressione, priorità, focus tecnico, regole settimana per settimana, diario stampabile.

| Azione | Come |
|--------|------|
| Aprire scheda dettagliata | `/admin/sessione/?ciclo=ipertrofia-accumulo&sessione=a1` (o b1/a2/b2) |
| Mappa figure esercizi | `/admin/mappa-esercizi/` |
| PDF fase completa A1–B2 | Hub → PDF scheda Fase 1 |
| PDF singola sessione | Pulsante «Stampa scheda con spiegazioni» nella pagina sessione |
| Modificare esercizi Blocco 1 | Edita `blocco-1-fase1.json` → `node tools/sync-blocco1-macrociclo.mjs` |
| Nuove figure SVG | Aggiungi symbol in `admin/img/esercizi-sprite.svg` + voce in `esercizi-catalogo.json` |
| Articolo strategia (diario) | `/diario/blocco-1-ipertrofia-accumulo-settembre-2026/` — riflessione, non log |

**Ragionamento schede:** 13 settimane stesso schema → adattamento (1–2) → accumulo (3–6) → intensificazione (7–10) → picco (11–12) → deload (13). A settimana 14 si riparte con Blocco 2 sostituendo ~20–30% esercizi.

### 8.10 Errori da evitare

| Errore | Perché è sbagliato |
|--------|-------------------|
| Cambiare scheda ogni 4 settimane | Troppo frequente per un natural 57 anni che progredisce ancora |
| Saltare il deload | Fatica accumulata maschera i guadagni (Israetel) |
| 9+ micro-fasi in un anno | Troppi cambi schema — confusione e zero adattamento |
| Mesocicli da 3–6 settimane | Troppo brevi vs modello trimestre (12 sett.) |
| Copiare mesocicli da atleti avanzati giovani | Recovery diversa; servono blocchi più lunghi |
| Pubblicare `/admin/` nel sitemap | Area riservata, solo prototipi interni |

