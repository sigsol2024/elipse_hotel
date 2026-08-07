(function () {
  function slotHTML(item) {
    if (item.src) {
      return `<div class="media-slot has-image" data-ratio="${item.ratio || "16/9"}">
      <img src="${item.src}" alt="${item.alt || item.caption || ""}" />
    </div>`;
    }
    return `<div class="media-slot" data-ratio="${item.ratio || "16/9"}">
      <div class="media-slot__label"><span>[${item.label || "IMAGE"}]</span><span>${item.caption || ""}</span></div>
    </div>`;
  }

  function init(galleryEl, items) {
    if (!galleryEl || !items || !items.length) return;
    const stage = galleryEl.querySelector("[data-gallery-stage]");
    const thumbs = galleryEl.querySelectorAll("[data-gallery-index]");
    let index = 0;

    function show(i) {
      index = (i + items.length) % items.length;
      if (stage) stage.innerHTML = slotHTML(items[index]);
      thumbs.forEach((t) => {
        const ti = Number(t.getAttribute("data-gallery-index"));
        t.classList.toggle("is-active", ti === index);
      });
    }

    thumbs.forEach((t) => {
      t.addEventListener("click", () => {
        show(Number(t.getAttribute("data-gallery-index")));
      });
    });

    // Swipe on stage
    let startX = 0;
    if (stage) {
      stage.addEventListener(
        "touchstart",
        (e) => {
          startX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );
      stage.addEventListener(
        "touchend",
        (e) => {
          const dx = e.changedTouches[0].screenX - startX;
          if (Math.abs(dx) < 40) return;
          show(index + (dx < 0 ? 1 : -1));
        },
        { passive: true }
      );
    }
  }

  window.EllipseGallery = { init };
})();
