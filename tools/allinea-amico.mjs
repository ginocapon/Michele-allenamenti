#!/usr/bin/env node
/**
 * Allinea macrociclo amico: figure da catalogo, pesi blank, note senza kg esempio.
 * Uso: node tools/allinea-amico.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const MACRO = join(REPO, "admin/data/macrociclo-2026-2027.json");
const BLOCCO = join(REPO, "admin/data/blocco-1-fase1.json");
const CATALOGO = join(REPO, "admin/data/esercizi-catalogo.json");
const HUB = join(REPO, "admin/data/hub-periodizzazione.json");
const MESO = join(REPO, "admin/data/mesocicli.json");
const FIGURE = join(REPO, "admin/data/figure-schede-fase1.json");

const catalogo = JSON.parse(readFileSync(CATALOGO, "utf8"));
const macro = JSON.parse(readFileSync(MACRO, "utf8"));
const blocco = JSON.parse(readFileSync(BLOCCO, "utf8"));
const hub = JSON.parse(readFileSync(HUB, "utf8"));
const meso = JSON.parse(readFileSync(MESO, "utf8"));

function lookupCat(nome) {
  if (!nome) return null;
  if (catalogo[nome]) return { key: nome, ...catalogo[nome] };
  const n = nome.toLowerCase().replace(/\s+/g, " ").trim();
  for (const key of Object.keys(catalogo)) {
    if (key.toLowerCase() === n) return { key, ...catalogo[key] };
  }
  return null;
}

function stripKg(note) {
  if (!note) return null;
  const n = String(note)
    .replace(/palestra Arturo/gi, "palestra")
    .replace(/Multipower Technogym/gi, "Multipower")
    .replace(/\d+\s*→\s*\d+(?:\s*→\s*\d+)?\s*kg/gi, "carichi da definire")
    .replace(/\d+\s*\/\s*\d+\s*kg/gi, "carichi da definire")
    .replace(/@?\s*\d+(?:[.,]\d+)?\s*kg(?:\/manubrio)?/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;])/g, "$1")
    .replace(/·\s*·/g, "·")
    .trim();
  return n || null;
}

function isKettlebell(nome) {
  return /halo|catch ball|kettlebell/i.test(nome || "");
}

const missing = [];

function stampFigura(ex) {
  const cat = lookupCat(ex.nome);
  if (!cat) {
    missing.push(ex.nome);
    return ex;
  }
  ex.figura = ex.figura || cat.figura;
  return ex;
}

function blankPeso(ex) {
  ex.peso = "—";
  if (ex.note) ex.note = stripKg(ex.note);
  return stampFigura(ex);
}

for (const fase of macro.fasi) {
  for (const key of ["a1", "b1", "a2", "b2"]) {
    const s = fase.sessioni[key];
    if (!s) continue;
    s.esercizi = s.esercizi.map(blankPeso);
    const kbIdx = s.esercizi.findIndex((e) => isKettlebell(e.nome));
    if (kbIdx >= 0 && kbIdx !== s.esercizi.length - 1) {
      const [kb] = s.esercizi.splice(kbIdx, 1);
      s.esercizi.push(kb);
    }
  }
}

macro.macrociclo.nome = "Macrociclo annuale amico · Upper/Lower A1–B2";
macro.macrociclo.descrizione =
  "Clone del modello Gino (4 fasi × ~13 settimane, split A1–B1–A2–B2). STEP A: stessa architettura, pesi da compilare a penna dopo i massimali. STEP B: si personalizzano solo esercizi/date/focus senza cambiare MACROCICLO → MESOCICLO → MICROCICLO. Deload = sett. 13 di ogni fase (−40% volume). Finisher kettlebell solo in chiusura A2.";
macro.macrociclo.lineeGuida =
  "4 fasi × ~13 sett. · ~55% serie lower · Deload sett. 13 · Stessi esercizi per tutta la fase · Pesi blank · PDF anonimo";
macro.macrociclo.profilo = {
  nomeStampa: "",
  notaNome: "Il nome atleta va SOLO nel campo compilabile del PDF (Atleta: _______). Il PDF resta anonimo.",
  eta: null,
  anniPalestra: null,
  livello: null,
  obiettivoAnno: null,
  giorniSettimana: 4,
  attrezzaturaBase:
    "modello Gino: multipower, manubri, cavi, leg machines, kettlebell (finisher A2). Da confermare in STEP B.",
  limitiInfortuni: null,
  dataInizio: macro.macrociclo.inizio,
  preferenzaMeseCambioFase: "fine novembre / fine febbraio / fine maggio / fine agosto (13 sett.)",
  prioritaMuscolari: null,
  kettlebellFinisher: "sì in A2 (Halo / Clean Halo), sempre ultimo esercizio; A1 senza Catch Ball (rebalance 55%)",
  toneImmagini: "SVG tecnico (admin/img/esercizi-sprite.svg) — nessuna illustrazione IA in STEP A",
};

delete macro.macrociclo.pesoPartenza;

for (const key of ["a1", "b1", "a2", "b2"]) {
  const s = blocco.sessioni[key];
  s.esercizi = s.esercizi.map((ex) => {
    const cat = lookupCat(ex.nome);
    if (!cat) missing.push("blocco:" + ex.nome);
    else ex.figura = ex.figura || cat.figura;
    if (ex.note) ex.note = stripKg(ex.note);
    if (ex.progressione) ex.progressione = stripKg(ex.progressione) || ex.progressione;
    return ex;
  });
  const kbIdx = s.esercizi.findIndex((e) => isKettlebell(e.nome));
  if (kbIdx >= 0 && kbIdx !== s.esercizi.length - 1) {
    const [kb] = s.esercizi.splice(kbIdx, 1);
    s.esercizi.push(kb);
  }
}

blocco.schedaIntro =
  "4 allenamenti/settimana (A1–B1–A2–B2). Schema tipo: Lun A1 · Mar B1 · Gio A2 · Sab B2. Pesi da compilare a penna. Gli esercizi con * progrediscono quando completi il tetto rep col RIR target per 2 sedute di fila. Halo in A2 è sempre l’ultimo esercizio.";

hub.anni = [
  {
    id: "2026-2027",
    label: "2026 – 2027 · base amico",
    macrocicloUrl: "/admin/data/macrociclo-2026-2027.json",
    periodi: [
      {
        id: "set26-ago27",
        label: "Settembre 2026 → Agosto 2027",
        descrizione:
          "STEP A: clone del macrociclo Gino (4×13 sett., A1–B2, deload sett. 13, ~55% lower). Pesi vuoti. Personalizzazione esercizi/date = STEP B.",
      },
    ],
  },
];
hub._nota =
  "Repo amico: un solo anno in hub. Non inventare dati clinici. STEP B aggiorna solo JSON + catalogo/figure.";
hub.profilo = macro.macrociclo.profilo;

if (meso.periodizzazioneAnnuale) {
  meso.periodizzazioneAnnuale.forEach((p) => {
    p.deload = true;
  });
}

const figureRows = [];
for (const key of ["a1", "b1", "a2", "b2"]) {
  const s = blocco.sessioni[key];
  s.esercizi.forEach((ex) => {
    const cat = lookupCat(ex.nome) || {};
    figureRows.push({
      sessione: key.toUpperCase(),
      idEsercizio: ex.figura || cat.figura || "",
      nome: ex.nome,
      pathSvgSymbol: "/admin/img/esercizi-sprite.svg#" + (ex.figura || cat.figura || ""),
      pathImgWebp: null,
      briefVisuale: cat.setup || ex.note || "",
      stile: "SVG tecnico",
      dataAi: null,
    });
  });
}

writeFileSync(MACRO, JSON.stringify(macro, null, 2) + "\n");
writeFileSync(BLOCCO, JSON.stringify(blocco, null, 2) + "\n");
writeFileSync(HUB, JSON.stringify(hub, null, 2) + "\n");
writeFileSync(MESO, JSON.stringify(meso, null, 2) + "\n");
writeFileSync(FIGURE, JSON.stringify({ generatedFrom: "blocco-1-fase1.json", stile: "SVG tecnico", rows: figureRows }, null, 2) + "\n");

if (missing.length) {
  console.error("Figure/catalogo mancanti:", [...new Set(missing)]);
  process.exit(1);
}
console.log("OK allinea-amico · figure Fase 1:", figureRows.length);
