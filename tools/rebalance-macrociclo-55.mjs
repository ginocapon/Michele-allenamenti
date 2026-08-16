/**
 * Ribilancia sessioni macrociclo verso ~55% serie gambe+polpacci,
 * azzera i pesi (da definire dopo massimali).
 * Uso: node tools/rebalance-macrociclo-55.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const PATH = join(REPO, "admin/data/macrociclo-2026-2027.json");
const data = JSON.parse(readFileSync(PATH, "utf8"));

function stripKgFromNote(note) {
  if (!note) return null;
  const n = note
    .replace(/\d+\s*→\s*\d+(?:\s*→\s*\d+)?\s*kg/gi, "carichi da definire")
    .replace(/\d+\s*\/\s*\d+\s*kg/gi, "carichi da definire")
    .replace(/@?\s*\d+(?:[.,]\d+)?\s*kg(?:\/manubrio)?/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;])/g, "$1")
    .trim();
  return n || null;
}

function rebalance(sessioni) {
  const s = JSON.parse(JSON.stringify(sessioni));

  s.a1.esercizi = s.a1.esercizi.filter((e) => !/Catch Ball/i.test(e.nome));
  const remA1 = s.a1.esercizi.find((e) => /Rematore/i.test(e.nome));
  if (remA1 && remA1.serie > 3) remA1.serie = 3;
  const alzA1 = s.a1.esercizi.find((e) => /Alzate laterali/i.test(e.nome));
  if (alzA1 && alzA1.serie > 2) alzA1.serie = 2;
  if (!s.a1.esercizi.some((e) => /[Pp]olpacci/i.test(e.nome))) {
    s.a1.esercizi.push({
      nome: "Polpacci in piedi (multipower)",
      gruppo: "Polpacci",
      serie: 4,
      ripetizioni: "12-15",
      peso: "—",
      recupero: "60s",
      rir: "1-2",
      tecnica: null,
      progressione: false,
      note: "Fine A1 — frequenza polpacci alta (stubborn muscle)",
    });
  }
  s.a1.nome = "A1 · Petto* · Schiena · Spalle · Polpacci";

  const remA2 = s.a2.esercizi.find((e) => /Rematore|Trazioni/i.test(e.nome));
  if (remA2 && remA2.serie > 3) remA2.serie = 3;
  if (!s.a2.esercizi.some((e) => /[Pp]olpacci seduto/i.test(e.nome))) {
    const polp = {
      nome: "Polpacci seduto",
      gruppo: "Polpacci",
      serie: 4,
      ripetizioni: "12-15",
      peso: "—",
      recupero: "60s",
      rir: "1-2",
      tecnica: null,
      progressione: false,
      note: "Soleo — complementare ai polpacci in piedi di A1",
    };
    const halo = s.a2.esercizi.findIndex((e) => /Clean Halo/i.test(e.nome));
    if (halo >= 0) s.a2.esercizi.splice(halo, 0, polp);
    else s.a2.esercizi.push(polp);
  }
  s.a2.nome = "A2 · Schiena* · Spalle* · Polpacci";

  const curl = s.b1.esercizi.find((e) => /Leg curl/i.test(e.nome));
  if (curl) curl.serie = 4;
  if (!s.b1.esercizi.some((e) => /rumeno|RDL/i.test(e.nome))) {
    const rdl = {
      nome: "Stacco rumeno con manubri",
      gruppo: "Femorali",
      serie: 4,
      ripetizioni: "8",
      peso: "—",
      recupero: "120s",
      rir: "1-2",
      tecnica: null,
      progressione: false,
      note: "Catena posteriore — bilancia pressa/extension",
    };
    const scott = s.b1.esercizi.findIndex((e) => /Scott/i.test(e.nome));
    if (scott >= 0) s.b1.esercizi.splice(scott, 0, rdl);
    else s.b1.esercizi.push(rdl);
  }
  s.b1.nome = "B1 · Gambe accosciata* · Braccia";

  s.b2.esercizi = s.b2.esercizi.map((e) => {
    if (/Chest press/i.test(e.nome)) {
      return {
        nome: "Hip thrust",
        gruppo: "Glutei",
        serie: 4,
        ripetizioni: "8-10",
        peso: "—",
        recupero: "90s",
        rir: "1-2",
        tecnica: null,
        progressione: false,
        note: "Dominante anca — focus glutei (ex chest press)",
      };
    }
    return e;
  });
  const stacco = s.b2.esercizi.find((e) => /Stacco/i.test(e.nome));
  if (stacco) stacco.serie = 4;
  const hammer = s.b2.esercizi.find((e) => /martello|Hammer/i.test(e.nome));
  if (hammer && hammer.serie > 3) hammer.serie = 3;
  s.b2.nome = "B2 · Gambe anca* · Braccia";

  for (const day of Object.values(s)) {
    for (const ex of day.esercizi) {
      ex.peso = "—";
      ex.note = stripKgFromNote(ex.note);
    }
  }
  return s;
}

function pct(sessioni) {
  const lowerG =
    /gambe|polpacci|glutei|femorali|quadricipiti|catena posteriore|adduttori|abduttori/i;
  let total = 0;
  let lower = 0;
  for (const g of Object.values(sessioni)) {
    for (const e of g.esercizi) {
      const sets = Number(e.serie) || 0;
      total += sets;
      if (
        lowerG.test(e.gruppo || "") ||
        /pressa|extension|squat|leg curl|doktor|stacco|affondo|polpacci|rumeno|hip thrust/i.test(
          e.nome
        )
      ) {
        lower += sets;
      }
    }
  }
  return { total, lower, pct: ((100 * lower) / total).toFixed(1) + "%" };
}

for (const fase of data.fasi) {
  fase.sessioni = rebalance(fase.sessioni);
  console.log(fase.id, pct(fase.sessioni));
}

data.macrociclo.nome = "Macrociclo annuale · Upper/Lower A1–B2";
data.macrociclo.descrizione =
  "Periodizzazione annuale 52 settimane su split A1-B1-A2-B2 (4 sessioni/settimana). **4 fasi macro da ~13 settimane**. Focus ~55% volume serie su gambe+polpacci (priorità lower). Deload = ultima settimana di ogni fase. **Pesi da definire** dopo test massimali.";
data.macrociclo.lineeGuida =
  "4 fasi × ~13 sett. · ~55% serie lower (gambe+polpacci) · Deload sett. 13 · Cambio schema ogni ~3 mesi · Pesi blank fino a 1RM/serie";
delete data.macrociclo.pesoPartenza;

writeFileSync(PATH, JSON.stringify(data, null, 2) + "\n");
console.log("OK →", PATH);
