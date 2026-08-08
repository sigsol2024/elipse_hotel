(function () {
  const ADDRESS =
    "31 Sola Adewumi Street, Shola, Oshodi, Bucknor, Ejigbo, Lagos, Nigeria";
  const ADDRESS_SHORT = "31 Sola Adewumi Street, Lagos, Nigeria.";
  const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS);

  const NAV = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "about", label: "About", href: "about.html" },
    { id: "rooms", label: "Rooms", href: "rooms.html" },
    { id: "facilities", label: "Facilities", href: "facilities.html" },
    { id: "contact", label: "Contact", href: "contact.html" }
  ];

  function bookingGeneralHref() {
    const url =
      window.EllipseBooking && window.EllipseBooking.getGeneralUrl
        ? window.EllipseBooking.getGeneralUrl()
        : null;
    return url || "#book";
  }

  function bookingAttrs(href) {
    if (href === "#book") {
      return 'href="#book" aria-disabled="true" title="Booking engine URL pending configuration"';
    }
    return `href="${href}" target="_blank" rel="noopener noreferrer"`;
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
    <button class="lg:hidden text-deep-navy" type="button" aria-label="Open menu" data-menu-open>
      <span class="material-symbols-outlined text-2xl" aria-hidden="true">menu</span>
    </button>
  </div>
</nav>
<div class="ellipse-mobile-nav" id="mobile-nav" hidden>
  <div class="ellipse-mobile-nav__top">
    <a class="ellipse-logo ellipse-logo--header" href="index.html" aria-label="Ellipse Hotels home">
      <img src="assets/brand/logo-on-light.png" alt="Ellipse Hotels" width="180" height="61" />
    </a>
    <button class="text-deep-navy" type="button" aria-label="Close menu" data-menu-close>
      <span class="material-symbols-outlined text-2xl" aria-hidden="true">close</span>
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
        <img src="assets/images/home/experience-main.jpg" alt="" />
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
<footer class="bg-deep-navy text-white py-section-gap border-t border-white/10">
  <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-gutter">
    <div class="md:col-span-4">
      <a class="ellipse-logo ellipse-logo--footer inline-block mb-6 hover:opacity-90 transition-opacity" href="index.html" aria-label="Ellipse Hotels home">
        <img src="assets/brand/logo-on-dark.png" alt="Ellipse Hotels" width="200" height="68" />
      </a>
      <p class="font-body-md text-body-md text-white/70 max-w-xs mb-6">
        ${ADDRESS.replace(/, /g, ",<br/>")}
      </p>
      <a class="inline-flex items-center justify-center px-5 py-3 border border-white/30 text-white font-label-caps text-label-caps uppercase tracking-widest hover:bg-white hover:text-deep-navy transition-colors" ${bookingAttrs(bookHref)}>
        Book Your Stay
      </a>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-6">Explore</h4>
      <ul class="space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="index.html">Home</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="about.html">About Us</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="rooms.html">Rooms &amp; Suites</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="facilities.html">Facilities</a></li>
      </ul>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-6">Contact</h4>
      <ul class="space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="contact.html">Get in Touch</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Location</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="terms.html">Terms</a></li>
      </ul>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-6">Reservations</h4>
      <ul class="space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" ${bookingAttrs(bookHref)}>Book a Room</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="rooms.html">Rooms &amp; Suites</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="contact.html">Enquire</a></li>
      </ul>
    </div>
    <div class="md:col-span-2">
      <h4 class="font-label-caps text-label-caps uppercase tracking-widest text-white mb-6">Visit</h4>
      <ul class="space-y-4">
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="${MAPS_URL}" target="_blank" rel="noopener noreferrer">Get Directions</a></li>
        <li><a class="font-body-md text-white/70 hover:text-accent-gold transition-colors" href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="md:col-span-12 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
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

    // Reveal on scroll (re-query each time so dynamically injected rooms appear)
    function reveal() {
      const windowHeight = window.innerHeight;
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < windowHeight - 100) {
          el.classList.add("active");
        }
      });
    }
    window.addEventListener("scroll", reveal, { passive: true });
    reveal();
    window.EllipseChrome = window.EllipseChrome || {};
    window.EllipseChrome.refreshReveals = reveal;

    // Soft notice when booking not configured
    document.addEventListener("click", (e) => {
      const link = e.target.closest && e.target.closest('a[href="#book"]');
      if (!link) return;
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
