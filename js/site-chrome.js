(function () {
  const ADDRESS =
    "Shola, 31 Sola Adewumi St, Oshodi, Bucknor, Ejigbo 100261, Lagos";
  const ADDRESS_SHORT = ADDRESS;
  const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS);

  const SOCIAL = [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/61592485867726/"
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/ellipsehotel/"
    },
    {
      id: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/"
    }
  ];

  function socialIcon(id) {
    if (id === "facebook") {
      return `<svg class="ellipse-social__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.18 2.09 16.02 2 14.79 2 11.7 2 9.5 3.88 9.5 7.15V9.5H7v4h2.5V22h4.5v-8.5z"/></svg>`;
    }
    if (id === "instagram") {
      return `<svg class="ellipse-social__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>`;
    }
    if (id === "tiktok") {
      return `<svg class="ellipse-social__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.6 5.82A4.27 4.27 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>`;
    }
    return "";
  }

  function socialLinks() {
    return `
<nav class="ellipse-social" aria-label="Social media">
  ${SOCIAL.map(
    (item) => `
  <a class="ellipse-social__link" href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
    ${socialIcon(item.id)}
  </a>`
  ).join("")}
</nav>`;
  }

    const NAV = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "about", label: "About", href: "about.html" },
    { id: "rooms", label: "Rooms", href: "rooms.html" },
    { id: "facilities", label: "Facilities", href: "facilities.html" },
    { id: "gallery", label: "Gallery", href: "gallery.html" },
    { id: "contact", label: "Contact", href: "contact.html" }
  ];

  function bookingGeneralHref() {
    if (window.EllipseBooking && typeof window.EllipseBooking.getGeneralUrl === "function") {
      const url = window.EllipseBooking.getGeneralUrl();
      if (url) return url;
    }
    return "index.html#book";
  }

  function bookingAttrs(href) {
    if (!href || href === "#book") {
      return 'href="rooms.html"';
    }
    if (/^https?:\/\//i.test(href)) {
      return `href="${href}" target="_blank" rel="noopener noreferrer"`;
    }
    return `href="${href}"`;
  }

  function navLinkClass(page, item) {
    const base =
      "font-label-caps text-label-caps uppercase hover:opacity-80 transition-opacity";
    if (page === item.id) {
      return `${base} text-deep-navy border-b border-accent-gold pb-1`;
    }
    return `${base} text-on-surface-variant hover:text-deep-navy transition-colors`;
  }

  function navLinks(page) {
    return NAV.map((item) => {
      const current = page === item.id ? ' aria-current="page"' : "";
      return `<a class="${navLinkClass(page, item)}" href="${item.href}"${current}>${item.label}</a>`;
    }).join("\n");
  }

  function renderHeader(page) {
    const bookHref = bookingGeneralHref();
    return `
<a class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-3 focus:py-2" href="#main">Skip to content</a>
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-surface/95 backdrop-blur-md border-b border-surface-variant" id="site-header" aria-label="Primary">
  <div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 md:py-5 max-w-container-max mx-auto">
    <a class="ellipse-logo ellipse-logo--header shrink-0 hover:opacity-80 transition-opacity" href="index.html" aria-label="Ellipse Hotels home">
      <img src="assets/brand/logo-on-light.png" alt="Ellipse Hotels" width="200" height="68" />
    </a>
    <div class="hidden lg:flex items-center space-x-8">
      ${navLinks(page)}
    </div>
    <a class="hidden lg:inline-flex items-center justify-center px-6 py-3 bg-deep-navy text-on-secondary font-label-caps text-label-caps uppercase tracking-widest hover:bg-deep-navy/90 transition-colors h-12" ${bookingAttrs(bookHref)}>
      Book Your Stay
    </a>
    <button class="lg:hidden inline-flex items-center justify-center text-deep-navy p-1 -mr-1" type="button" aria-label="Open menu" data-menu-open>
      <span class="material-symbols-outlined text-[1.875rem] leading-none" aria-hidden="true">menu</span>
    </button>
  </div>
</nav>
<div class="ellipse-mobile-nav" id="mobile-nav" hidden>
  <div class="ellipse-mobile-nav__top">
    <a class="ellipse-logo ellipse-logo--header" href="index.html" aria-label="Ellipse Hotels home">
      <img src="assets/brand/logo-on-light.png" alt="Ellipse Hotels" width="180" height="61" />
    </a>
    <button class="inline-flex items-center justify-center text-deep-navy p-1 -mr-1" type="button" aria-label="Close menu" data-menu-close>
      <span class="material-symbols-outlined text-[1.875rem] leading-none" aria-hidden="true">close</span>
    </button>
  </div>
  <div class="ellipse-mobile-nav__body">
    <nav aria-label="Mobile navigation">
      ${NAV.map((item) => {
        const current = page === item.id ? ' aria-current="page"' : "";
        return `<a href="${item.href}"${current}>${item.label}</a>`;
      }).join("")}
    </nav>
    <div class="ellipse-mobile-nav__divider" aria-hidden="true"></div>
    <div class="ellipse-mobile-nav__aside">
      <div class="ellipse-mobile-nav__media">
        <img src="assets/images/home/_DSC8362.jpg" alt="" />
      </div>
      <a class="ellipse-mobile-nav__cta inline-flex items-center justify-center px-5 py-3.5 bg-deep-navy text-white font-label-caps text-label-caps uppercase tracking-widest" ${bookingAttrs(bookHref)}>
        Book Your Stay
      </a>
    </div>
  </div>
</div>`;
  }

  function renderFooter() {
    const bookHref = bookingGeneralHref();
    return `
<footer class="bg-deep-navy text-white py-12 md:py-section-gap border-t border-white/10">
  <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter">
    <div class="md:col-span-4">
      <a class="ellipse-logo ellipse-logo--footer inline-block mb-5 md:mb-6 hover:opacity-90 transition-opacity" href="index.html" aria-label="Ellipse Hotels home">
        <img src="assets/brand/logo-on-dark.png" alt="Ellipse Hotels" width="200" height="68" />
      </a>
      <p class="font-body-md text-body-md text-white/70 max-w-sm mb-5 md:mb-6">
        ${ADDRESS}
      </p>
      ${socialLinks()}
      <a class="inline-flex items-center justify-center px-5 py-3 border border-white/30 text-white font-label-caps text-label-caps uppercase tracking-widest hover:bg-white hover:text-deep-navy transition-colors mt-5 md:mt-6" ${bookingAttrs(bookHref)}>
        Book Your Stay
      </a>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-4 md:mb-6">Explore</h4>
      <ul class="space-y-3 md:space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="index.html">Home</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="about.html">About Us</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="rooms.html">Rooms &amp; Suites</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="facilities.html">Facilities</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="gallery.html">Gallery</a></li>
      </ul>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-4 md:mb-6">Contact</h4>
      <ul class="space-y-3 md:space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="contact.html">Get in Touch</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Location</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="terms.html">Terms</a></li>
      </ul>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-4 md:mb-6">Reservations</h4>
      <ul class="space-y-3 md:space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" ${bookingAttrs(bookHref)}>Book a Room</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="rooms.html">Rooms &amp; Suites</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="contact.html">Enquire</a></li>
      </ul>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-4 md:mb-6">Visit</h4>
      <ul class="space-y-3 md:space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Get Directions</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="md:col-span-12 mt-6 md:mt-12 pt-5 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
      <p class="font-body-md text-body-md text-white/50">
        © Ellipse Hotels. Quiet Hospitality in Lagos.
      </p>
      <div class="flex gap-6">
        <a class="font-body-md text-sm text-white/50 hover:text-white transition-colors" href="terms.html">Terms of Service</a>
        <a class="font-body-md text-sm text-white/50 hover:text-white transition-colors" href="contact.html">Privacy &amp; Contact</a>
      </div>
    </div>
  </div>
</footer>
<div id="book" hidden></div>`;
  }

  function renderScrollTop() {
    return `
<button type="button" id="scroll-to-top" class="ellipse-scroll-top" aria-label="Back to top" hidden>
  <span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
</button>`;
  }

  function initChrome() {
    const page = document.body.getAttribute("data-page") || "home";

    const headerRoot = document.getElementById("site-header-root");
    const footerRoot = document.getElementById("site-footer-root");
    if (headerRoot) headerRoot.innerHTML = renderHeader(page);
    if (footerRoot) footerRoot.innerHTML = renderFooter();

    // Shared scroll-to-top (all pages)
    let scrollTopBtn = document.getElementById("scroll-to-top");
    if (!scrollTopBtn) {
      document.body.insertAdjacentHTML("beforeend", renderScrollTop());
      scrollTopBtn = document.getElementById("scroll-to-top");
    }

    function updateScrollTop() {
      if (!scrollTopBtn) return;
      const doc = document.documentElement;
      const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const midReached = window.scrollY >= scrollable * 0.5;
      if (midReached) {
        scrollTopBtn.hidden = false;
        requestAnimationFrame(() => scrollTopBtn.classList.add("is-visible"));
      } else {
        scrollTopBtn.classList.remove("is-visible");
        setTimeout(() => {
          if (!scrollTopBtn.classList.contains("is-visible")) {
            scrollTopBtn.hidden = true;
          }
        }, 280);
      }
    }

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      window.addEventListener("scroll", updateScrollTop, { passive: true });
      updateScrollTop();
    }

    const mobile = document.getElementById("mobile-nav");

    document.querySelectorAll("[data-menu-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!mobile) return;
        mobile.hidden = false;
        requestAnimationFrame(() => mobile.classList.add("is-open"));
        document.body.style.overflow = "hidden";
      });
    });

    document.querySelectorAll("[data-menu-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!mobile) return;
        mobile.classList.remove("is-open");
        document.body.style.overflow = "";
        setTimeout(() => {
          if (!mobile.classList.contains("is-open")) mobile.hidden = true;
        }, 400);
      });
    });

    // Reveal early while scrolling: activate ~1 viewport ahead and warm images
    // so sections (esp. photos) aren't blank when they enter view.
    function warmRevealMedia(el) {
      el.querySelectorAll("img").forEach((img) => {
        if (img.getAttribute("loading") === "lazy") {
          img.setAttribute("loading", "eager");
        }
        try {
          if (typeof img.decode === "function" && !img.complete) {
            img.decode().catch(function () {});
          }
        } catch (err) {}
      });
    }

    function activateReveal(el) {
      if (!el || el.classList.contains("active")) return;
      warmRevealMedia(el);
      el.classList.add("active");
    }

    function reveal() {
      const triggerAt = window.innerHeight * 2;
      document.querySelectorAll(".reveal:not(.active)").forEach((el) => {
        if (el.getBoundingClientRect().top < triggerAt) {
          activateReveal(el);
        }
      });
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            activateReveal(entry.target);
            io.unobserve(entry.target);
          });
        },
        {
          // Start fade + image load a full screen before the section is visible
          root: null,
          rootMargin: "25% 0px 110% 0px",
          threshold: 0.01
        }
      );
      function observeReveals() {
        document.querySelectorAll(".reveal:not(.active)").forEach((el) => {
          io.observe(el);
        });
        reveal();
      }
      observeReveals();
      window.addEventListener("scroll", reveal, { passive: true });
      window.addEventListener("resize", reveal, { passive: true });
      window.EllipseChrome = window.EllipseChrome || {};
      window.EllipseChrome.refreshReveals = observeReveals;
    } else {
      window.addEventListener("scroll", reveal, { passive: true });
      window.addEventListener("resize", reveal, { passive: true });
      reveal();
      window.EllipseChrome = window.EllipseChrome || {};
      window.EllipseChrome.refreshReveals = reveal;
    }

    // Soft notice when booking not configured
    document.addEventListener("click", (e) => {
      const link = e.target.closest && e.target.closest('a[href="#book"]');
      if (!link) return;
      if (window.EllipseBooking && window.EllipseBooking.isConfigured()) return;
      e.preventDefault();
      const existing = document.getElementById("booking-pending-note");
      if (existing) {
        existing.focus();
        return;
      }
      const note = document.createElement("div");
      note.id = "booking-pending-note";
      note.setAttribute("role", "status");
      note.tabIndex = -1;
      note.className =
        "fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] max-w-[min(92vw,28rem)] bg-deep-navy text-white px-4 py-3 text-sm leading-snug shadow-xl";
      note.textContent =
        "Online booking will open here once the hotel’s booking engine is connected.";
      document.body.appendChild(note);
      note.focus();
      setTimeout(() => note.remove(), 4200);
    });
  }

  function ensurePageLoader() {
    if (document.getElementById("ellipse-page-loader")) return;
    const el = document.createElement("div");
    el.id = "ellipse-page-loader";
    el.className = "ellipse-page-loader";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<div class="ellipse-page-loader__ring" aria-hidden="true">' +
      [0, 1, 2, 3, 4, 5, 6, 7]
        .map((i) => `<span style="--i:${i}"></span>`)
        .join("") +
      "</div>";
    if (document.body) {
      document.body.insertBefore(el, document.body.firstChild);
    }
  }

  function hidePageLoader() {
    const root = document.documentElement;
    const loader = document.getElementById("ellipse-page-loader");
    root.classList.remove("ellipse-loading");
    root.classList.add("ellipse-loaded");
    if (loader) {
      loader.classList.add("is-done");
      window.setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 280);
    }
    // Content may already be in view — reveal immediately after overlay clears
    window.requestAnimationFrame(function () {
      if (window.EllipseChrome && typeof window.EllipseChrome.refreshReveals === "function") {
        window.EllipseChrome.refreshReveals();
      }
    });
  }

  function initPageLoader() {
    ensurePageLoader();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hidePageLoader();
      return;
    }

    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      window.setTimeout(hidePageLoader, 60);
    }

    // Don't wait for every image (window.load) — that left a long white screen.
    // Show the page as soon as the DOM is ready, with a short polish delay.
    if (document.readyState === "interactive" || document.readyState === "complete") {
      window.setTimeout(finish, 160);
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        function () {
          window.setTimeout(finish, 160);
        },
        { once: true }
      );
    }
    // Safety net
    window.setTimeout(finish, 1400);
  }

  if (document.body) {
    initPageLoader();
  } else {
    document.addEventListener("DOMContentLoaded", initPageLoader);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChrome);
  } else {
    initChrome();
  }

  window.EllipseChrome = Object.assign(window.EllipseChrome || {}, {
    mapsUrl: MAPS_URL,
    address: ADDRESS,
    addressShort: ADDRESS_SHORT,
    bookingGeneralHref
  });
})();
