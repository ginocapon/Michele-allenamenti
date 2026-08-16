#!/usr/bin/env node
/**
 * Checklist SKILL §8.9 — macrociclo amico
 * Uso: node tools/verifica-macrociclo.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const macro = JSON.parse(readFileSync(join(REPO, "admin/data/macrociclo-2026-2027.json"), "utf8"));
const blocco = JSON.parse(readFileSync(join(REPO, "admin/data/blocco-1-fase1.json"), "utf8"));
const catalogo = JSON.parse(readFileSync(join(REPO, "admin/data/esercizi-catalogo.json"), "utf8"));
const hub = JSON.parse(readFileSync(join(REPO, "admin/data/hub-periodizzazione.json"), "utf8"));
const meso = JSON.parse(readFileSync(join(REPO, "admin/data/mesocicli.json"), "utf8"));

const errors = [];
const ok = [];

function fail(msg) {
  errors.push(msg);
}
function pass(msg) {
  ok.push(msg);
}

function lookupCat(nome) {
  if (catalogo[nome]) return catalogo[nome];
  const n = (nome || "").toLowerCase();
  for (const key of Object.keys(catalogo)) {
    if (key.toLowerCase() === n) return catalogo[key];
  }
  return null;
}

function isLower(ex) {
  return /gambe|polpacci|glutei|femorali|quadricipiti|catena posteriore|adduttori|abduttori/i.test(
    ex.gruppo || ""
  ) || /pressa|extension|squat|leg curl|doktor|stacco|affondo|polpacci|rumeno|hip thrust|trap bar/i.test(
    ex.nome || ""
  );
}

function isKb(nome) {
  return /halo|catch ball|kettlebell/i.test(nome || "");
}

if (macro.fasi.length !== 4) fail("Attese 4 fasi, trovate " + macro.fasi.length);
else pass("4 fasi macro");

macro.fasi.forEach((f, i) => {
  if (f.settimane < 12) fail(f.id + " ha " + f.settimane + " sett. (<12)");
  else pass(f.id + " · " + f.settimane + " sett.");
  ["a1", "b1", "a2", "b2"].forEach((k) => {
    if (!f.sessioni[k]) fail(f.id + " manca sessione " + k);
  });
  let total = 0;
  let lower = 0;
  for (const s of Object.values(f.sessioni)) {
    for (const ex of s.esercizi) {
      const sets = Number(ex.serie) || 0;
      total += sets;
      if (isLower(ex)) lower += sets;
      if (ex.peso && ex.peso !== "—" && ex.peso !== "-") {
        fail(f.id + " " + ex.nome + " ha peso non blank: " + ex.peso);
      }
      const cat = lookupCat(ex.nome);
      const fig = ex.figura || cat?.figura;
      if (!fig) fail(f.id + " " + ex.nome + " senza figura");
      if (/\d+\s*kg/i.test(ex.note || "") && !/da definire/i.test(ex.note || "")) {
        fail(f.id + " " + ex.nome + " nota con kg esempio: " + ex.note);
      }
    }
    const last = s.esercizi[s.esercizi.length - 1];
    const kb = s.esercizi.filter((e) => isKb(e.nome));
    if (kb.length && !isKb(last.nome)) {
      fail(f.id + " " + s.nome + ": kettlebell non è ultimo");
    }
  }
  const pct = (100 * lower) / total;
  if (pct < 50 || pct > 62) fail(f.id + " lower " + pct.toFixed(1) + "% (atteso ~55%)");
  else pass(f.id + " lower " + pct.toFixed(1) + "% (" + lower + "/" + total + ")");
});

["a1", "b1", "a2", "b2"].forEach((k) => {
  blocco.sessioni[k].esercizi.forEach((ex) => {
    if (!ex.figura && !lookupCat(ex.nome)?.figura) fail("blocco " + k + " " + ex.nome + " senza figura");
  });
  const last = blocco.sessioni[k].esercizi.at(-1);
  const kb = blocco.sessioni[k].esercizi.filter((e) => isKb(e.nome));
  if (kb.length && !isKb(last.nome)) fail("blocco " + k + ": kettlebell non ultimo");
});
pass("Blocco 1 A1–B2 con figure");

if (!hub.anni?.length) fail("hub-periodizzazione.json senza anni");
else pass("hub anni: " + hub.anni.map((a) => a.id).join(", "));

const deloadOk = (meso.periodizzazioneAnnuale || []).every((p) => p.deload === true);
if (!deloadOk) fail("mesocicli.periodizzazioneAnnuale: deload non true su tutte le fasi");
else pass("periodizzazioneAnnuale · deload su 4 fasi");

console.log(ok.map((x) => "OK  " + x).join("\n"));
if (errors.length) {
  console.error(errors.map((x) => "ERR " + x).join("\n"));
  process.exit(1);
}
console.log("CHECKLIST §8.9 SUPERATA");
