/**
 * Lightweight deploy/runtime log — writes to console and window.__ELLIPSE_LOG__
 * Loaded early on main pages so we can see missing scripts/assets in DevTools.
 */
(function () {
  var lines = (window.__ELLIPSE_LOG__ = window.__ELLIPSE_LOG__ || []);

  function push(level, msg, detail) {
    var entry = {
      t: new Date().toISOString(),
      level: level,
      msg: msg,
      detail: detail || null,
      href: location.href
    };
    lines.push(entry);
    var text = "[ellipse] " + msg + (detail ? " | " + detail : "");
    if (level === "error") console.error(text, detail || "");
    else if (level === "warn") console.warn(text, detail || "");
    else console.log(text, detail || "");
  }

  push("info", "boot", navigator.userAgent);

  window.addEventListener("error", function (e) {
    push("error", "window.error", (e && e.message) || String(e));
  });

  window.addEventListener("unhandledrejection", function (e) {
    push("error", "unhandledrejection", String((e && e.reason) || e));
  });

  document.addEventListener("DOMContentLoaded", function () {
    push("info", "dom-ready");
    push(
      "info",
      "chrome",
      window.EllipseChrome ? "EllipseChrome present" : "EllipseChrome missing"
    );
    push(
      "info",
      "rooms-data",
      window.EllipseRooms ? "EllipseRooms present" : "EllipseRooms missing"
    );
    var header = document.getElementById("site-header-root");
    var footer = document.getElementById("site-footer-root");
    push("info", "header-root", header && header.innerHTML ? "filled" : "empty");
    push("info", "footer-root", footer && footer.innerHTML ? "filled" : "empty");
    var homeRooms = document.getElementById("home-rooms");
    if (homeRooms) {
      push("info", "home-rooms", homeRooms.children.length + " child nodes");
    }
    var catalogue = document.getElementById("rooms-catalogue");
    if (catalogue) {
      push("info", "rooms-catalogue", catalogue.children.length + " child nodes");
    }
  });

  window.EllipseLog = {
    lines: lines,
    dump: function () {
      return lines.slice();
    }
  };
})();
