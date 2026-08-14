/**
 * StayEazi booking widget loader.
 * Looks for .stayeazi-booking-widget[data-widget-token] and loads each token once.
 */
(function () {
  function loadWidgetScript(token) {
    var scriptId = "stayeazi-widget-script-" + token;
    if (document.getElementById(scriptId)) return;

    var script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://app.stayeazi.com/widget/load/" + encodeURIComponent(token);
    script.async = true;
    document.head.appendChild(script);
  }

  function initStayEaziWidgets() {
    var containers = document.querySelectorAll(".stayeazi-booking-widget[data-widget-token]");
    containers.forEach(function (container) {
      var token = container.getAttribute("data-widget-token");
      if (!token) return;
      loadWidgetScript(token);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStayEaziWidgets);
  } else {
    initStayEaziWidgets();
  }

  window.EllipseStayEazi = {
    refresh: initStayEaziWidgets
  };
})();
