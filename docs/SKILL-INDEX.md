# SKILL-INDEX — mappa sezioni (token minimo)

Usa questo indice con `.cursor/rules/skill-router.mdc`. Leggi **solo** le righe indicate di `SKILL.md` con `Read` + `offset`/`limit`.

## File modulari (preferire al monolite)

| File | Righe ca. | Quando |
|------|-----------|--------|
| `SKILL-EDITORIAL.md` | ~150 | 3 articoli/settimana, goliardia, autopilot cron, skin |
| `docs/EDITORIAL-AUTOPILOT-SETUP.md` | ~80 | Secret OpenAI, workflow venerdì, troubleshooting |
| `SKILL-PERFORMANCE.md` | 264 | Sessioni, TSB, Zepp, JSON performance |
| `SKILL-VENERDI.md` | 126 | Checklist venerdì, Sheet iscritti |
| `SKILL-LANDING.md` | 263 | Hero, palette, conversione landing |
| `guardian/skill/SKILL.md` | 62 | Premortem, salute sito, cron |
| `docs/GUARDIAN-INTEGRATION.md` | 197 | Architettura Guardian |

## `SKILL.md` — sezioni per riga (aggiornare se il file cambia molto)

| Sezione | Righe | Contenuto |
|---------|-------|-----------|
| Trasparenza AI | 9–23 | AI Act — vedi anche `.cursor/rules/ai-trasparenza.mdc` |
| §0 Anima + Panel Relief | 25–96 | Brand Ginevra, estetica 3D |
| §0b Hub allenamenti | 98–112 | Tre blocchi hub |
| §0c Diario | 114–147 | Navigazione diario |
| §2 Card esercizio | 149–189 | Template card |
| §3 Cardiaco / mensile | 191–479 | HR log, zone, analisi mensile |
| §4 Trimestre + sessione layout | 481–763 | **Layout pro v3**, galleria Zepp |
| §5 Tono / anomalie | 765–798 | Compliance, device |
| §5a Newsletter + Guardian | 800–920 | Funnel PDF, site-stats, §5a.0 Guardian |
| §5b Editoriale diario | 922–977 | URL, voce, SEO articolo |
| §8 SEO/GEO/AEO | 979–1087 | Title, sitemap, GSC |
| §6 Checklist trimestre | 1089–1112 | Pubblicazione Q |
| §7 Roadmap | 1114–1123 | Trimestri futuri |
| §8 Admin periodizzazione | 1125–1278 | Macrociclo, PDF palestra |

## Stima risparmio token

| Approccio | Righe tipiche |
|-----------|---------------|
| SKILL.md intero | ~1.278 |
| Sessione (PERFORMANCE + §4) | ~320 |
| Diario (§0c + §5b) | ~90 |
| Newsletter (§5a + VENERDI) | ~220 |
| Guardian only | ~62 + report |
