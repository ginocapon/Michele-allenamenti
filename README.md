# Hub allenamenti — Michele

Sito statico personale (HTML, CSS, JavaScript). Nessun framework, nessun backend, nessun database. I contenuti vivono in tre file JSON pubblici.

## Struttura

```
.
├── index.html                 Home: profilo atleta
├── allenamenti/
│   └── index.html             Ciclo attivo + settimana tipo + link schede
├── schede/
│   ├── scheda-1.html          Push
│   ├── scheda-2.html          Pull
│   └── scheda-3.html          Gambe
├── data/
│   ├── profilo.json
│   ├── ciclo-attivo.json
│   └── schede.json
├── css/stile.css
├── js/core.js, home.js, allenamenti.js, scheda.js
├── assets/favicon.svg
└── .nojekyll                  Serve a GitHub Pages (niente Jekyll)
```

Percorsi relativi: il sito funziona sia in root di dominio sia in un project site tipo `https://USERNAME.github.io/Michele-allenamenti/`.

## Anteprima in locale

`fetch` non parte da `file://`. Serve un server HTTP:

```bash
npx --yes serve .
```

Poi apri l’indirizzo che stampa il comando (di solito `http://localhost:3000`).

## Pubblicare su GitHub Pages

1. Push su `main`.
2. Repo → **Settings** → **Pages**.
3. **Build and deployment**: Source = *Deploy from a branch*.
4. Branch `main`, cartella `/ (root)`.
5. Salva. Dopo uno o due minuti il sito è su:

   `https://USERNAME.github.io/NOME-REPO/`

Se usi un dominio custom, in Pages inserisci il dominio: i link relativi restano validi.

## Aggiornare i dati

Modifica solo i JSON, poi push:

- `data/profilo.json` — nome, età, altezza, peso, livello, obiettivo, attrezzatura, limitazioni, durata seduta.
- `data/ciclo-attivo.json` — settimane, fase, split, date, settimana tipo.
- `data/schede.json` — esercizi, serie, ripetizioni, recupero, RPE, note.

Le pagine HTML non vanno toccate se cambi solo i numeri. Per una quarta scheda: aggiungi l’oggetto in `schede.json` e copia `schede/scheda-1.html` impostando `data-scheda` sull’id nuovo.

## Stampa / PDF

Su ogni scheda c’è **Stampa / Salva PDF**. In Chrome: Destinazione → *Salva come PDF*. Il CSS `@media print` nasconde menu e pulsanti.

## Privacy

Nel repo non ci sono email, telefono o cognome. Tieni fuori anche file `.env` e esportazioni da app (Zepp, Strong, ecc.).

## Licenza d’uso

Uso personale. Non è un consiglio medico: se compare dolore, fermati e fatti vedere da qualcuno del mestiere.
