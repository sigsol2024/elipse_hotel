(function () {
  function apply() {
    const img = window.EllipseImages;
    if (!img) return;

    document.querySelectorAll("[data-image]").forEach((el) => {
      const key = el.getAttribute("data-image");
      const src = img[key];
      if (!src) return;
      const altKey = key + "Alt";
      const alt = img[altKey] || "Ellipse Hotels";
      el.classList.add("has-image");
      const label = el.querySelector(".media-slot__label");
      if (label) label.remove();
      let image = el.querySelector("img");
      if (!image) {
        image = document.createElement("img");
        el.appendChild(image);
      }
      image.src = src;
      image.alt = alt;
      image.loading = el.getAttribute("data-eager") != null ? "eager" : "lazy";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
