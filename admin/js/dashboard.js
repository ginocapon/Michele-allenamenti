/**
 * Ciclo annuale — 4 fasi × A1 B1 A2 B2 (apri + scarica PDF)
 */
(function () {
  "use strict";

  var DATA_URL = (window.fqUrl ? window.fqUrl("/admin/data/macrociclo-2026-2027.json") : "/admin/data/macrociclo-2026-2027.json");

  var FASE_SHORT = {
    "ipertrofia-accumulo": "Accumulo 8–12 rep · deload sett. 13",
    "tensione-forza": "Tensione 6–8 poi forza 4–6 · deload sett. 13",
    "ipertrofia-classica-ii": "Secondo accumulo · deload sett. 13",
    "ricondizionamento": "Mantenimento 10–12 · deload sett. 13"
  };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "className") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (typeof c === "string") node.appendChild(document.createTextNode(c));
      else if (c) node.appendChild(c);
    });
    return node;
  }

  function u(path) {
    return window.fqUrl ? window.fqUrl(path) : path;
  }

  function formatDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  }

  function shortName(sessione) {
    return (sessione.nome || "").replace(/^A1\s*·\s*|^B1\s*·\s*|^A2\s*·\s*|^B2\s*·\s*/i, "");
  }

  function renderDashboard(data, root) {
    root.innerHTML = "";
    root.appendChild(el("h2", { id: "ciclo-title", text: "Ciclo dell’anno" }));
    root.appendChild(el("p", {
      className: "ciclo-lead",
      text: formatDate(data.macrociclo.inizio) + " → " + formatDate(data.macrociclo.fine) + " · 4 fasi · 4 schede a settimana"
    }));

    var timeline = el("div", { className: "admin-timeline" });
    data.fasi.forEach(function (fase, i) {
      var block = el("section", { className: "admin-fase panel-raised", id: fase.id });
      var head = el("div", { className: "admin-fase__head" });
      head.innerHTML =
        "<div><span class=\"admin-fase__num\">Fase " + (i + 1) + "</span>" +
        "<h3>" + fase.nome.replace(/^Fase \d+ · /, "") + "</h3>" +
        "<p class=\"admin-fase__dates\">" + formatDate(fase.inizio) + " – " + formatDate(fase.fine) + " · " + fase.settimane + " settimane</p></div>" +
        "<p class=\"admin-fase__obiettivo\">" + (FASE_SHORT[fase.id] || "") + "</p>";
      block.appendChild(head);

      var grid = el("div", { className: "admin-sessioni-grid" });
      ["a1", "b1", "a2", "b2"].forEach(function (key) {
        var s = fase.sessioni[key];
        if (!s) return;
        var wrap = el("article", { className: "scheda-mini" });
        wrap.appendChild(el("span", { className: "scheda-mini__key", text: key.toUpperCase() }));
        wrap.appendChild(el("strong", { text: shortName(s) }));
        wrap.appendChild(el("p", { text: s.esercizi.length + " esercizi" }));
        var actions = el("div", { className: "scheda-mini__actions" });
        actions.appendChild(el("a", {
          className: "btn btn-ghost",
          href: u("/admin/sessione/?ciclo=" + encodeURIComponent(fase.id) + "&sessione=" + key),
          text: "Apri"
        }));
        actions.appendChild(el("a", {
          className: "btn btn-primary",
          href: u("/admin/sessione/pdf/?ciclo=" + encodeURIComponent(fase.id) + "&sessione=" + key),
          target: "_blank",
          rel: "noopener",
          text: "Scarica PDF"
        }));
        wrap.appendChild(actions);
        grid.appendChild(wrap);
      });
      block.appendChild(grid);
      timeline.appendChild(block);
    });
    root.appendChild(timeline);
  }

  function init() {
    var root = document.getElementById("admin-dashboard");
    if (!root) return;
    fetch(DATA_URL)
      .then(function (r) {
        if (!r.ok) throw new Error("JSON " + r.status);
        return r.json();
      })
      .then(function (data) { renderDashboard(data, root); })
      .catch(function (err) {
        root.innerHTML = "<p>Errore: " + err.message + "</p>";
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
