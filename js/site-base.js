/**
 * Prefisso sito: '' su dominio root, '/Michele-allenamenti' su GitHub Pages progetto.
 */
(function () {
  "use strict";
  var p = window.location.pathname || "";
  var i = p.indexOf("/admin/");
  var base = "";
  if (i > 0) base = p.slice(0, i);
  else if (/^\/Michele-allenamenti(\/|$)/.test(p)) base = "/Michele-allenamenti";
  window.FQ_BASE = base;
  window.fqUrl = function (path) {
    if (!path) return base || "/";
    if (path.charAt(0) !== "/") path = "/" + path;
    return base + path;
  };
})();
