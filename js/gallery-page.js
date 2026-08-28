(function () {
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function imageKey(src) {
    const clean = decodeURIComponent(String(src || "").split("?")[0]);
    const parts = clean.split("/");
    return (parts[parts.length - 1] || clean).toLowerCase();
  }

  function collectUniqueImages(sections) {
    const seen = Object.create(null);
    const images = [];
    (sections || []).forEach((section) => {
      (section.images || []).forEach((src) => {
        const key = imageKey(src);
        if (!key || seen[key]) return;
        seen[key] = true;
        images.push(src);
      });
    });
    return images;
  }

  /** Varied mosaic spans for visual rhythm (not categories). */
  function tileSpanClass(index) {
    const pattern = index % 10;
    if (pattern === 0) return "gallery-tile--wide";
    if (pattern === 4) return "gallery-tile--tall";
    if (pattern === 7) return "gallery-tile--feature";
    return "";
  }

  function assetUrl(src) {
    if (window.EllipseChrome && typeof window.EllipseChrome.assetUrl === "function") {
      return window.EllipseChrome.assetUrl(src);
    }
    if (!src) return "";
    const p = String(src).trim();
    if (/^https?:\/\//i.test(p) || p.startsWith("/")) return p;
    return "/" + p.replace(/^\/+/, "");
  }

  function init() {
    const catalog = window.EllipseGalleryImages;
    const root = document.getElementById("gallery-root");
    if (!catalog || !root) return;

    const allImages = collectUniqueImages(catalog.sections || []);
    if (!allImages.length) {
      root.innerHTML =
        '<p class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-on-surface-variant">No gallery images available yet.</p>';
      return;
    }

    const tiles = allImages
      .map((src, i) => {
        const span = tileSpanClass(i);
        return `
<button type="button" class="gallery-tile group ${span}" data-gallery-open="${i}" aria-label="Open photo ${i + 1} of ${allImages.length}">
  <img src="${escapeHtml(assetUrl(src))}" alt="Ellipse Hotels gallery photo ${i + 1}" loading="lazy" />
  <span class="gallery-tile__shade" aria-hidden="true"></span>
  <span class="gallery-tile__zoom material-symbols-outlined" aria-hidden="true">zoom_in</span>
</button>`;
      })
      .join("");

    root.innerHTML = `
<section class="gallery-mosaic-wrap reveal">
  <div class="gallery-mosaic max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop" role="list">
    ${tiles}
  </div>
</section>`;

    const modal = document.getElementById("gallery-modal");
    const modalImage = document.getElementById("gallery-modal-image");
    const modalTitle = document.getElementById("gallery-modal-title");
    const modalSection = document.getElementById("gallery-modal-section");
    const modalCount = document.getElementById("gallery-modal-count");
    const library = document.getElementById("gallery-modal-library");
    const prevBtn = modal && modal.querySelector("[data-gallery-prev]");
    const nextBtn = modal && modal.querySelector("[data-gallery-next]");
    let current = 0;
    let lastFocus = null;

    function renderLibrary() {
      if (!library) return;
      library.innerHTML = allImages
        .map((src, i) => {
          return `
<button type="button" class="gallery-modal__thumb${i === current ? " is-active" : ""}" data-gallery-thumb="${i}" aria-label="Photo ${i + 1}" aria-current="${i === current ? "true" : "false"}">
  <img src="${escapeHtml(assetUrl(src))}" alt="" loading="lazy" />
</button>`;
        })
        .join("");
    }

    function show(index) {
      current = (index + allImages.length) % allImages.length;
      const src = allImages[current];
      if (!src || !modalImage) return;

      modalImage.src = assetUrl(src);
      modalImage.alt = "Ellipse Hotels photo " + (current + 1);
      if (modalSection) modalSection.textContent = "Gallery";
      if (modalTitle) modalTitle.textContent = "Photo " + (current + 1);
      if (modalCount) {
        modalCount.textContent = current + 1 + " / " + allImages.length;
      }

      if (library) {
        Array.prototype.forEach.call(
          library.querySelectorAll("[data-gallery-thumb]"),
          function (thumb) {
            const i = Number(thumb.getAttribute("data-gallery-thumb"));
            const active = i === current;
            thumb.classList.toggle("is-active", active);
            thumb.setAttribute("aria-current", active ? "true" : "false");
            if (active) {
              thumb.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
              });
            }
          }
        );
      }
    }

    function openModal(index) {
      if (!modal) return;
      lastFocus = document.activeElement;
      renderLibrary();
      show(index);
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("gallery-modal-open");
      requestAnimationFrame(function () {
        modal.classList.add("is-open");
        const closeBtn = modal.querySelector("[data-gallery-close]");
        if (closeBtn) closeBtn.focus();
      });
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("gallery-modal-open");
      setTimeout(function () {
        modal.hidden = true;
        if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      }, 220);
    }

    root.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-gallery-open]");
      if (!btn) return;
      openModal(Number(btn.getAttribute("data-gallery-open")));
    });

    if (modal) {
      modal.addEventListener("click", function (event) {
        if (event.target.closest("[data-gallery-close]")) {
          closeModal();
          return;
        }
        const thumb = event.target.closest("[data-gallery-thumb]");
        if (thumb) {
          show(Number(thumb.getAttribute("data-gallery-thumb")));
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        show(current - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        show(current + 1);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (!modal || modal.hidden) return;
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });

    if (window.EllipseChrome && window.EllipseChrome.refreshReveals) {
      window.EllipseChrome.refreshReveals();
    } else {
      root.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("active");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
