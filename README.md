# Allenamenti amico — macrociclo (STEP A)

Clone del sistema admin di periodizzazione (modello Gino: 4 fasi × ~13 settimane, split A1–B1–A2–B2). **Default: solo `/admin/`.** Niente log pubblico, niente sitemap admin.

Dati anagrafici/clinici dell’amico **non inventati** (campi vuoti). Il PDF resta anonimo; il nome si scrive a penna su **Atleta: _______**.

## Brief (10 righe)

1. **Macrociclo** 1 set 2026 → 31 ago 2027 · 52 settimane · 4 sessioni/sett. (target).
2. **Fase 1** Ipertrofia accumulo · 1 set–30 nov 2026 · 13 sett. · soft start 1–2 · accumulo 8–12 · **deload 13 (−40% vol.)**.
3. **Fase 2** Tensione + forza · dic 2026–feb 2027 · 13 sett. · 6–8 poi 4–6 · **deload 13**.
4. **Fase 3** Ipertrofia II · mar–mag 2027 · 13 sett. · volume ↑ 9–12 · **deload 13**.
5. **Fase 4** Ricondizionamento · giu–ago 2027 · 13 sett. · 10–12 rep, RIR alto · **deload 13**.
6. **Microciclo** fisso tutto l’anno: **A1** upper petto · **B1** lower ginocchio · **A2** upper schiena · **B2** lower anca.
7. Stessi esercizi per tutta la fase; cambiano serie/reps/RIR/peso (pesi **vuoti** fino ai massimali).
8. **Kettlebell** solo in **chiusura A2** (Halo / Clean Halo), mai in apertura. A1 senza Catch Ball (rebalance ~55% lower).
9. Figure: **SVG tecnici** (`esercizi-sprite.svg`), non cartoon Ken, non foto IA.
10. STEP B: si aggiornano solo JSON + catalogo/figure quando arrivano obiettivo, attrezzi, limiti, date.

## URL da aprire (locale: `python3 -m http.server 8080` dalla root)

- Dashboard: http://127.0.0.1:8080/admin/
- Hub: http://127.0.0.1:8080/admin/prototipi/periodizzazione/
- PDF A1: http://127.0.0.1:8080/admin/sessione/pdf/?ciclo=ipertrofia-accumulo&sessione=a1
- PDF B1: http://127.0.0.1:8080/admin/sessione/pdf/?ciclo=ipertrofia-accumulo&sessione=b1
- PDF A2: http://127.0.0.1:8080/admin/sessione/pdf/?ciclo=ipertrofia-accumulo&sessione=a2
- PDF B2: http://127.0.0.1:8080/admin/sessione/pdf/?ciclo=ipertrofia-accumulo&sessione=b2
- Mappa esercizi: http://127.0.0.1:8080/admin/mappa-esercizi/
- GitHub Pages (dopo deploy): `https://ginocapon.github.io/Michele-allenamenti/admin/`

## Stampa per l’amico

- Aprire l’URL PDF della sessione (A1/B1/A2/B2) nel browser.
- Stampa → A4 verticale, margini 8 mm, «Salva come PDF» o carta; non tagliare il bordo inferiore.
- Compilare a penna: Atleta, kg, righe S1–Sn, Note per esercizio, Osservazioni in alto.

## Tool

```bash
node tools/allinea-amico.mjs
node tools/sync-blocco1-macrociclo.mjs
node tools/verifica-macrociclo.mjs
```
