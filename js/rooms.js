(function () {
  function mediaSlot(ratio, label, caption, src, alt) {
    if (src) {
      return `<div class="media-slot has-image" data-ratio="${ratio}">
      <img src="${src}" alt="${alt || caption || ""}" loading="lazy" />
    </div>`;
    }
    return `<div class="media-slot" data-ratio="${ratio}">
      <div class="media-slot__label"><span>[${label}]</span><span>${caption || ""}</span></div>
    </div>`;
  }

  function roomBookingHref(room) {
    if (!window.EllipseBooking || !room) return null;
    return window.EllipseBooking.getRoomUrl(room);
  }

  function bookButton(room, className, label) {
    const href = roomBookingHref(room);
    const text = label || "Book This Room";
    if (!href) {
      return `<a class="${className} is-disabled" href="#book" aria-disabled="true" title="Room booking link pending configuration">${text}</a>`;
    }
    return `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  }

  function priceLine(room) {
    if (room.priceFrom == null || room.priceFrom === "") return "";
    return `<p class="room-price">From ${room.priceFrom}</p>`;
  }

  function provisionalBadge(room) {
    if (!room.provisional) return "";
    return `<span class="placeholder-note">Provisional category</span>`;
  }

  function roomImages(slug) {
    const map = (window.EllipseImages && window.EllipseImages.rooms) || {};
    return map[slug] || [];
  }

  function renderHomePreview(root) {
    if (!root || !window.EllipseRooms) return;
    const rooms = window.EllipseRooms.list();
    root.innerHTML = rooms
      .map((room, index) => {
        const reverse = index % 2 === 1 ? " room-preview--reverse" : "";
        const imgs = roomImages(room.slug);
        const src = imgs[0] || "";
        return `
<article class="room-preview${reverse} reveal">
  <div class="room-preview__media">
    ${mediaSlot("4/5", "4:5 ROOM IMAGE", room.name, src, room.name + " at Ellipse Hotels")}
  </div>
  <div class="room-preview__body">
    <p class="eyebrow">Stay</p>
    <h3 class="headline">${room.name}</h3>
    ${provisionalBadge(room)}
    <p class="lede" style="margin-top:1rem">${room.shortDescription}</p>
    <p style="margin:1rem 0;color:var(--ink-muted);font-size:0.95rem">Occupancy: ${room.occupancy}</p>
    ${priceLine(room)}
    <div class="room-preview__actions">
      <a class="btn btn-secondary" href="room-details.html?room=${room.slug}">View Room</a>
      ${bookButton(room, "btn btn-primary", "Book Now")}
    </div>
  </div>
</article>`;
      })
      .join("");
  }

  function renderCatalogue(root) {
    if (!root || !window.EllipseRooms) return;
    const rooms = window.EllipseRooms.list();
    const feature = rooms.filter((r) => r.featureLayout === "feature");
    const pairs = rooms.filter((r) => r.featureLayout === "pair");
    const full = rooms.filter((r) => r.featureLayout === "full");

    let html = "";

    feature.forEach((room) => {
      const imgs = roomImages(room.slug);
      html += `
<article class="room-feature reveal">
  <div class="room-feature__media">${mediaSlot("16/9", "16:9 FEATURE IMAGE", room.name, imgs[0], room.name)}</div>
  <div class="room-feature__body">
    <p class="eyebrow">Featured</p>
    <h2 class="headline">${room.name}</h2>
    ${provisionalBadge(room)}
    <p class="lede" style="margin-top:1rem">${room.shortDescription}</p>
    <ul class="room-facts">
      <li><span>Occupancy</span> ${room.occupancy}</li>
      <li><span>Bed</span> ${room.bed}</li>
      <li><span>Size</span> ${room.size}</li>
    </ul>
    ${priceLine(room)}
    <div class="room-preview__actions">
      <a class="btn btn-secondary" href="room-details.html?room=${room.slug}">View Details</a>
      ${bookButton(room, "btn btn-primary", "Book Now")}
    </div>
  </div>
</article>`;
    });

    if (pairs.length) {
      html += `<div class="room-pair">`;
      pairs.forEach((room) => {
        const imgs = roomImages(room.slug);
        html += `
<article class="room-pair__item reveal">
  ${mediaSlot("4/5", "4:5 ROOM IMAGE", room.name, imgs[0], room.name)}
  <div class="room-pair__body">
    <h2 class="subhead">${room.name}</h2>
    ${provisionalBadge(room)}
    <p>${room.shortDescription}</p>
    <p class="muted">Occupancy: ${room.occupancy}</p>
    <div class="room-preview__actions">
      <a class="btn btn-ghost" href="room-details.html?room=${room.slug}">View Details</a>
      ${bookButton(room, "btn btn-primary", "Book Now")}
    </div>
  </div>
</article>`;
      });
      html += `</div>`;
    }

    full.forEach((room) => {
      const imgs = roomImages(room.slug);
      html += `
<article class="room-full reveal">
  <div class="room-full__media">${mediaSlot("16/9", "16:9 FEATURE IMAGE", room.name, imgs[0], room.name)}</div>
  <div class="room-full__body container">
    <div>
      <p class="eyebrow">Suite</p>
      <h2 class="headline">${room.name}</h2>
      ${provisionalBadge(room)}
    </div>
    <div>
      <p class="lede">${room.shortDescription}</p>
      <ul class="room-facts">
        <li><span>Occupancy</span> ${room.occupancy}</li>
        <li><span>Bed</span> ${room.bed}</li>
        <li><span>Size</span> ${room.size}</li>
      </ul>
      <div class="room-preview__actions">
        <a class="btn btn-secondary" href="room-details.html?room=${room.slug}">View Details</a>
        ${bookButton(room, "btn btn-primary", "Book Now")}
      </div>
    </div>
  </div>
</article>`;
    });

    root.innerHTML = html;
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
    const gallery = (imgs.length
      ? imgs.map((src, i) => ({
          ratio: i === 0 ? "16/9" : i % 2 === 0 ? "3/2" : "4/5",
          label: "PHOTO",
          caption: room.name,
          src,
          alt: `${room.name} — photo ${i + 1}`
        }))
      : room.gallery) || [];
    const hero = gallery[0] || { ratio: "16/9", label: "16:9 HERO", caption: room.name };
    const thumbs = gallery.slice(1);

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
      <h1 class="headline">${room.name}</h1>
      ${provisionalBadge(room)}
      ${priceLine(room) || `<p class="muted" style="margin-top:0.75rem">Rate on request <span class="placeholder-note">Price not published</span></p>`}
      <p style="margin-top:1.25rem">${room.shortDescription}</p>
      <ul class="room-facts">
        <li><span>Occupancy</span> ${room.occupancy}</li>
        <li><span>Bed</span> ${room.bed}</li>
        <li><span>Size</span> ${room.size}</li>
      </ul>
      <div class="room-preview__actions" style="margin-top:1.5rem;flex-direction:column;align-items:stretch">
        ${bookButton(room, "btn btn-primary", "Book This Room")}
        <a class="btn btn-secondary" href="rooms.html">All Rooms</a>
      </div>
    </aside>
  </div>
</section>

<section class="section">
  <div class="container room-detail-copy">
    <div>
      <h2 class="subhead">About this room</h2>
      <p class="lede">${room.description}</p>
    </div>
    <div>
      <h2 class="subhead">Amenities</h2>
      ${
        room.amenities && room.amenities.length
          ? `<ul class="amenity-list">${room.amenities.map((a) => `<li>${a}</li>`).join("")}</ul>`
          : `<p class="muted">${room.amenitiesNote || "Amenity list forthcoming."}</p><span class="placeholder-note">To be confirmed</span>`
      }
      <h2 class="subhead" style="margin-top:2.5rem">Policies</h2>
      <p class="muted">Check-in, check-out and cancellation details will appear here once hotel policies are supplied.</p>
      <span class="placeholder-note">Policy placeholder</span>
    </div>
  </div>
</section>

<div class="booking-bar-mobile">
  ${bookButton(room, "btn btn-primary", "Book This Room")}
  <a class="btn btn-secondary" href="rooms.html">Rooms</a>
</div>`;

    // Store gallery data for gallery.js
    root.dataset.gallery = JSON.stringify(gallery);

    if (window.EllipseGallery) {
      window.EllipseGallery.init(root.querySelector("[data-gallery]"), gallery);
    }
  }

  function init() {
    const home = document.getElementById("home-rooms");
    const catalogue = document.getElementById("rooms-catalogue");
    if (home) renderHomePreview(home);
    if (catalogue) renderCatalogue(catalogue);
    if (document.getElementById("room-detail-root")) renderDetail();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.EllipseRoomsUI = { mediaSlot, bookButton, roomBookingHref };
})();
