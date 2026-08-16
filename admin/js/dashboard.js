/**
 * Admin dashboard — macrociclo e sessioni a vista
 */
(function () {
  "use strict";

  var DATA_URL = (window.fqUrl ? window.fqUrl("/admin/data/macrociclo-2026-2027.json") : "/admin/data/macrociclo-2026-2027.json");

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

  function formatDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
  }

  function sessionSummary(sessione) {
    var prog = sessione.esercizi.filter(function (e) { return e.progressione; });
    var main = prog.length ? prog[0] : sessione.esercizi[0];
    var peso = (!main.peso || main.peso === "—" || main.peso === "-") ? "kg TBD" : main.peso;
    return main ? main.nome + " · " + peso + " · " + main.serie + "×" + main.ripetizioni : "";
  }

  function renderDashboard(data, root) {
    root.innerHTML = "";
    var m = data.macrociclo;

    var hero = el("div", { className: "admin-macrociclo-head" });
    var pesoLine = m.pesoPartenza != null ? " · Peso corporeo rif. " + m.pesoPartenza + " kg" : " · Pesi esercizi da definire";
    hero.innerHTML = "<h2>" + m.nome + "</h2><p>" + formatDate(m.inizio) + " → " + formatDate(m.fine) + " · <strong>" + m.frequenza + "</strong>" + pesoLine + "</p><p class=\"admin-macrociclo-desc\">" + m.descrizione + "</p>";
    root.appendChild(hero);

    var timeline = el("div", { className: "admin-timeline" });
    data.fasi.forEach(function (fase, i) {
      var block = el("section", { className: "admin-fase", id: fase.id });
      var head = el("div", { className: "admin-fase__head" });
      head.innerHTML = "<div><span class=\"admin-fase__num\">Fase " + (i + 1) + "</span><h3>" + fase.nome + "</h3><p class=\"admin-fase__dates\">" + formatDate(fase.inizio) + " – " + formatDate(fase.fine) + " · " + fase.settimane + " sett. · RIR " + fase.rir + "</p></div><p class=\"admin-fase__obiettivo\">" + fase.obiettivo + "</p>";
      block.appendChild(head);

      var grid = el("div", { className: "admin-sessioni-grid" });
      ["a1", "b1", "a2", "b2"].forEach(function (key) {
        var s = fase.sessioni[key];
        if (!s) return;
        var wrap = el("div", { className: "admin-sessione-card-wrap" });
        var link = el("a", {
          className: "admin-sessione-card",
          href: (window.fqUrl ? window.fqUrl("/admin/sessione/?ciclo=") : "/admin/sessione/?ciclo=") + encodeURIComponent(fase.id) + "&sessione=" + key
        });
        link.innerHTML = "<span class=\"admin-sessione-card__key\">" + key.toUpperCase() + "</span><strong>" + s.nome + "</strong><p>" + s.esercizi.length + " esercizi</p><p class=\"admin-sessione-card__main\">" + sessionSummary(s) + "</p><span class=\"admin-sessione-card__cta\">Apri scheda →</span>";
        wrap.appendChild(link);
        wrap.appendChild(el("a", {
          className: "admin-sessione-card-pdf",
          href: (window.fqUrl ? window.fqUrl("/admin/sessione/pdf/?ciclo=") : "/admin/sessione/pdf/?ciclo=") + encodeURIComponent(fase.id) + "&sessione=" + key,
          target: "_blank",
          rel: "noopener",
          text: "PDF"
        }));
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
      .then(function (r) { return r.json(); })
      .then(function (data) { renderDashboard(data, root); })
      .catch(function (err) {
        root.innerHTML = "<p>Errore: " + err.message + "</p>";
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
