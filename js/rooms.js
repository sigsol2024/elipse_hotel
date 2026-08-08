(function () {
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function roomImage(room) {
    if (room && room.image) return room.image;
    const map = (window.EllipseImages && window.EllipseImages.rooms) || {};
    const list = map[room && room.slug] || [];
    return list[0] || "";
  }

  function roomImages(slug) {
    const room = window.EllipseRooms && window.EllipseRooms.get(slug);
    const primary = room && room.image ? [room.image] : [];
    const map = (window.EllipseImages && window.EllipseImages.rooms) || {};
    const extras = map[slug] || [];
    const merged = primary.concat(extras.filter((src) => src && src !== primary[0]));
    return merged;
  }

  function roomBookingHref(room) {
    if (window.EllipseBooking && room) {
      const roomUrl = window.EllipseBooking.getRoomUrl(room);
      if (roomUrl) return roomUrl;
      if (window.EllipseBooking.getGeneralUrl) {
        const general = window.EllipseBooking.getGeneralUrl();
        if (general) return general;
      }
    }
    return null;
  }

  function bookAttrs(href) {
    if (!href) {
      return 'href="#book" aria-disabled="true" title="Booking engine URL pending configuration"';
    }
    return `href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"`;
  }

  function bookLink(room, className, label) {
    const href = roomBookingHref(room);
    return `<a class="${className}" ${bookAttrs(href)}>${escapeHtml(label || "Book Now")}</a>`;
  }

  function factsLine(room) {
    const facts =
      (window.EllipseRooms && window.EllipseRooms.facts
        ? window.EllipseRooms.facts(room)
        : []) || [];
    return facts.join(" · ");
  }

  function priceBlock(room, className) {
    if (room.priceFrom == null || room.priceFrom === "") return "";
    return `<p class="${className}">From ${escapeHtml(String(room.priceFrom))} <span class="font-body-md text-body-md text-on-surface-variant font-normal">/ night</span></p>`;
  }

  function mediaSlot(ratio, label, caption, src, alt) {
    if (src) {
      return `<div class="media-slot has-image" data-ratio="${ratio}">
      <img src="${escapeHtml(src)}" alt="${escapeHtml(alt || caption || "")}" loading="lazy" />
    </div>`;
    }
    return `<div class="media-slot" data-ratio="${ratio}">
      <div class="media-slot__label"><span>[${escapeHtml(label)}]</span><span>${escapeHtml(caption || "")}</span></div>
    </div>`;
  }

  function renderHomePreview(root) {
    if (!root || !window.EllipseRooms) return;
    const rooms = window.EllipseRooms.homeList
      ? window.EllipseRooms.homeList()
      : window.EllipseRooms.list();

    root.innerHTML = rooms
      .map((room, index) => {
        const src = roomImage(room);
        const imageLeft = room.homeLayout !== "image-right";
        const viewLabel = room.slug === "executive" ? "View Suite" : "View Room";
        const media = `
        <div class="md:col-span-7 group ${imageLeft ? "" : "md:col-start-6 order-1 md:order-2"}">
          <div class="aspect-[16/9] bg-surface-container overflow-hidden">
            <img class="w-full h-full object-cover hover-zoom" alt="${escapeHtml(room.name)}" src="${escapeHtml(src)}" loading="lazy" />
          </div>
        </div>`;
        const body = `
        <div class="md:col-span-4 ${imageLeft ? "md:col-start-9" : "md:col-start-1 order-2 md:order-1"} flex flex-col justify-center mt-8 md:mt-0">
          <p class="font-label-caps text-label-caps text-accent-gold mb-2 uppercase tracking-widest">${escapeHtml(room.name)}</p>
          <h3 class="font-headline-md text-[1.35rem] md:text-[1.5rem] lg:text-headline-md text-deep-navy mb-4 leading-snug">${escapeHtml(room.headline || room.name)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant mb-8">${escapeHtml(room.shortDescription)}</p>
          <div class="flex items-center gap-6">
            <a class="inline-flex items-center text-deep-navy font-label-caps text-label-caps uppercase tracking-widest hover:opacity-80 transition-opacity group" href="room-details.html?room=${escapeHtml(room.slug)}">
              ${escapeHtml(viewLabel)}
              <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </a>
            ${bookLink(room, "font-label-caps text-label-caps text-accent-gold uppercase tracking-widest border-b border-accent-gold hover:opacity-80 transition-opacity", "Book Now")}
          </div>
        </div>`;

        return `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center ${index < rooms.length - 1 ? "mb-24" : ""} reveal">
        ${imageLeft ? media + body : body + media}
      </div>`;
      })
      .join("");
  }

  function renderFeatured(room, index) {
    const src = roomImage(room);
    const facts = factsLine(room);
    const num = String(index + 1).padStart(2, "0");
    return `
<article class="flex flex-col gap-12 reveal">
  <div class="w-full aspect-video md:aspect-[21/9] bg-surface-container relative overflow-hidden group">
    <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" alt="${escapeHtml(room.name)}" src="${escapeHtml(src)}" loading="lazy" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
    <div class="col-span-1 md:col-span-8 pr-0 md:pr-12">
      <span class="block font-label-caps text-label-caps text-accent-gold mb-4">${num}</span>
      <h2 class="font-headline-md text-[1.35rem] md:text-[1.5rem] lg:text-headline-md text-deep-navy mb-4 leading-snug">${escapeHtml(room.name)}</h2>
      ${facts ? `<p class="font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest uppercase">${escapeHtml(facts)}</p>` : ""}
      <p class="font-body-md text-body-md text-on-surface-variant max-w-3xl">${escapeHtml(room.description || room.shortDescription)}</p>
    </div>
    <div class="col-span-1 md:col-span-4 flex flex-col mt-8 md:mt-0 items-start md:items-end justify-center md:pt-10">
      ${priceBlock(room, "font-title-lg text-[0.95rem] md:text-[1rem] lg:text-title-lg text-deep-navy mb-6")}
      <div class="flex flex-col sm:flex-row gap-6 items-center w-full md:w-auto md:justify-end">
        <a class="font-label-caps text-label-caps text-deep-navy hover:opacity-70 transition-opacity border-b border-deep-navy pb-1" href="room-details.html?room=${escapeHtml(room.slug)}">View Details</a>
        ${bookLink(room, "inline-flex items-center justify-center bg-deep-navy text-white font-label-caps text-label-caps px-8 h-14 hover:opacity-80 transition-opacity w-full sm:w-auto", "Check Availability")}
      </div>
    </div>
  </div>
</article>`;
  }

  function renderSplit(room, index, imageRight) {
    const src = roomImage(room);
    const facts = factsLine(room);
    const num = String(index + 1).padStart(2, "0");
    const text = `
<div class="col-span-1 md:col-span-5 ${imageRight ? "md:col-start-1 order-2 md:order-1" : "md:col-start-8 order-2"} flex flex-col justify-center">
  <span class="block font-label-caps text-label-caps text-accent-gold mb-4">${num}</span>
  <h2 class="font-headline-md text-[1.35rem] md:text-[1.5rem] lg:text-headline-md text-deep-navy mb-4 leading-snug">${escapeHtml(room.name)}</h2>
  ${facts ? `<p class="font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest uppercase">${escapeHtml(facts)}</p>` : ""}
  <p class="font-body-md text-body-md text-on-surface-variant mb-8">${escapeHtml(room.description || room.shortDescription)}</p>
  ${priceBlock(room, "font-title-lg text-[0.95rem] md:text-[1rem] lg:text-title-lg text-deep-navy mb-8")}
  <div class="flex flex-wrap items-center gap-8">
    <a class="font-label-caps text-label-caps text-deep-navy hover:opacity-70 transition-opacity border-b border-deep-navy pb-1" href="room-details.html?room=${escapeHtml(room.slug)}">View Details</a>
    ${bookLink(room, "inline-flex items-center justify-center bg-deep-navy text-white font-label-caps text-label-caps px-8 h-14 hover:opacity-80 transition-opacity", "Check Availability")}
  </div>
</div>`;
    const media = `
<div class="col-span-1 md:col-span-6 ${imageRight ? "md:col-start-7 order-1 md:order-2" : "order-1"} mb-8 md:mb-0">
  <div class="w-full ${imageRight ? "aspect-[4/5] md:aspect-square" : "aspect-[4/3]"} bg-surface-container relative overflow-hidden group">
    <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" alt="${escapeHtml(room.name)}" src="${escapeHtml(src)}" loading="lazy" />
  </div>
</div>`;

    return `
<article class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center reveal">
  ${imageRight ? text + media : media + text}
</article>`;
  }

  function renderCatalogue(root) {
    if (!root || !window.EllipseRooms) return;
    const rooms = window.EllipseRooms.list();
    root.innerHTML = rooms
      .map((room, index) => {
        const layout = room.catalogueLayout || "split-left";
        if (layout === "featured") return renderFeatured(room, index);
        if (layout === "split-right") return renderSplit(room, index, true);
        return renderSplit(room, index, false);
      })
      .join("");
  }

  function renderDetail() {
    const root = document.getElementById("room-detail-root");
    if (!root || !window.EllipseRooms) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("room") || "standard";
    const room = window.EllipseRooms.get(slug) || window.EllipseRooms.get("standard");
    if (!room) {
      root.innerHTML = `<p class="container section">Room not found. <a href="rooms.html">View all rooms</a></p>`;
      return;
    }

    document.title = `${room.name} | Ellipse Hotels`;
    document.body.classList.add("has-booking-bar");

    const imgs = roomImages(room.slug);
    const gallery =
      (imgs.length
        ? imgs.map((src, i) => ({
            ratio: i === 0 ? "16/9" : i % 2 === 0 ? "3/2" : "4/5",
            label: "PHOTO",
            caption: room.name,
            src,
            alt: `${room.name} — photo ${i + 1}`
          }))
        : room.gallery) || [];
    const hero = gallery[0] || { ratio: "16/9", label: "16:9 HERO", caption: room.name };
    const facts = factsLine(room);

    root.innerHTML = `
<section class="room-detail-hero">
  <div class="container room-detail-hero__grid">
    <div>
      <div class="gallery" data-gallery>
        <div class="gallery__stage" data-gallery-stage>
          ${mediaSlot(hero.ratio, hero.label, hero.caption, hero.src, hero.alt)}
        </div>
        <div class="gallery__thumbs" data-gallery-thumbs>
          ${gallery
            .map(
              (g, i) =>
                `<button type="button" class="gallery__thumb${i === 0 ? " is-active" : ""}" data-gallery-index="${i}" aria-label="View image ${i + 1}">
                  ${mediaSlot(g.ratio === "16/9" ? "3/2" : g.ratio, g.label, "", g.src, g.alt || "")}
                </button>`
            )
            .join("")}
        </div>
      </div>
    </div>
    <aside class="booking-sticky room-detail-panel">
      <p class="eyebrow">Rooms &amp; Suites</p>
      <h1 class="headline">${escapeHtml(room.name)}</h1>
      ${room.headline ? `<p class="muted" style="margin-top:0.35rem">${escapeHtml(room.headline)}</p>` : ""}
      ${
        priceBlock(room, "room-price") ||
        `<p class="muted" style="margin-top:0.75rem">Rate on request</p>`
      }
      <p style="margin-top:1.25rem">${escapeHtml(room.shortDescription)}</p>
      ${
        facts
          ? `<ul class="room-facts">${window.EllipseRooms
              .facts(room)
              .map((f) => `<li>${escapeHtml(f)}</li>`)
              .join("")}</ul>`
          : ""
      }
      <div class="room-preview__actions" style="margin-top:1.5rem;flex-direction:column;align-items:stretch">
        ${bookLink(room, "btn btn-primary", "Book This Room")}
        <a class="btn btn-secondary" href="rooms.html">All Rooms</a>
      </div>
    </aside>
  </div>
</section>

<section class="section">
  <div class="container room-detail-copy">
    <div>
      <h2 class="subhead">About this room</h2>
      <p class="lede">${escapeHtml(room.description)}</p>
    </div>
    <div>
      <h2 class="subhead">Amenities</h2>
      ${
        room.amenities && room.amenities.length
          ? `<ul class="amenity-list">${room.amenities.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`
          : `<p class="muted">${escapeHtml(room.amenitiesNote || "Amenity list forthcoming.")}</p>`
      }
    </div>
  </div>
</section>

<div class="booking-bar-mobile">
  ${bookLink(room, "btn btn-primary", "Book This Room")}
  <a class="btn btn-secondary" href="rooms.html">Rooms</a>
</div>`;

    root.dataset.gallery = JSON.stringify(gallery);
    if (window.EllipseGallery) {
      window.EllipseGallery.init(root.querySelector("[data-gallery]"), gallery);
    }
  }

  function activateReveals(scope) {
    const root = scope || document;
    root.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("active");
    });
    if (window.EllipseChrome && typeof window.EllipseChrome.refreshReveals === "function") {
      window.EllipseChrome.refreshReveals();
    }
  }

  function init() {
    try {
      const home = document.getElementById("home-rooms");
      const catalogue = document.getElementById("rooms-catalogue");
      if (!window.EllipseRooms) {
        console.error("EllipseRooms data missing — check data/rooms.js");
        if (catalogue) {
          catalogue.innerHTML =
            '<p class="text-on-surface-variant text-center">Rooms could not be loaded.</p>';
        }
        return;
      }
      if (home) {
        renderHomePreview(home);
        activateReveals(home);
      }
      if (catalogue) {
        renderCatalogue(catalogue);
        activateReveals(catalogue);
      }
      if (document.getElementById("room-detail-root")) renderDetail();
    } catch (err) {
      console.error("Rooms UI failed:", err);
      const catalogue = document.getElementById("rooms-catalogue");
      if (catalogue) {
        catalogue.innerHTML =
          '<p class="text-on-surface-variant text-center">Rooms could not be loaded.</p>';
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.EllipseRoomsUI = {
    mediaSlot,
    bookLink,
    roomBookingHref,
    roomImage,
    factsLine
  };
})();
