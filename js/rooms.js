(function () {
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Room galleries: folder-discovered list from EllipseRoomImages (not hardcoded URLs). */
  function roomImages(slug) {
    const catalog = window.EllipseRoomImages;
    const list =
      (catalog && catalog.bySlug && catalog.bySlug[slug]) ||
      [];
    return list.slice();
  }

  function roomImage(room) {
    const slug = room && room.slug;
    const images = roomImages(slug);
    if (images.length) return images[0];
    return fallbackRoomImage();
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
    return `href="${escapeHtml(href)}"`;
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
        // Always zigzag on the homepage: left, right, left…
        const imageLeft = index % 2 === 0;
        const viewLabel = room.slug === "suite" ? "View Suite" : "View Room";
        const media = `
        <div class="md:col-span-7 group ${imageLeft ? "" : "md:col-start-6 order-1 md:order-2"}">
          <div class="aspect-[16/9] bg-surface-container overflow-hidden">
            <img class="w-full h-full object-cover hover-zoom" alt="${escapeHtml(room.name)}" src="${escapeHtml(src)}" loading="eager" decoding="async" />
          </div>
        </div>`;
        const body = `
        <div class="md:col-span-4 ${imageLeft ? "md:col-start-9" : "md:col-start-1 order-2 md:order-1"} flex flex-col justify-center mt-8 md:mt-0">
          <h3 class="font-headline-md text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] text-deep-navy mb-3 font-light tracking-tight leading-snug">${escapeHtml(room.name)}</h3>
          ${
            room.headline
              ? `<p class="font-label-caps text-label-caps text-accent-gold mb-4 uppercase tracking-widest">${escapeHtml(room.headline)}</p>`
              : ""
          }
          <p class="font-body-md text-body-md text-on-surface-variant mb-6">${escapeHtml(room.shortDescription)}</p>
          ${priceBlock(room, "font-title-lg text-[0.95rem] md:text-[1rem] text-deep-navy mb-8")}
          <div class="flex items-center gap-6">
            <a class="inline-flex items-center text-deep-navy font-label-caps text-label-caps uppercase tracking-widest hover:opacity-80 transition-opacity group" href="room-details.html?room=${escapeHtml(room.slug)}">
              ${escapeHtml(viewLabel)}
              <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </a>
          </div>
        </div>`;

        return `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center ${index < rooms.length - 1 ? "mb-14 md:mb-24" : ""} reveal">
        ${imageLeft ? media + body : body + media}
      </div>`;
      })
      .join("");
  }

  function renderHighlights(room) {
    const items = Array.isArray(room.highlights)
      ? room.highlights.filter((item) => item && item.label).slice(0, 6)
      : [];
    if (!items.length) return "";

    return `
  <div class="room-highlights grid grid-cols-3 gap-x-4 gap-y-4 w-full max-w-md mb-8" role="list">
    ${items
      .map(
        (item) => `
    <div class="flex flex-col items-start text-left" role="listitem">
      <span class="material-symbols-outlined text-accent-gold text-[1.125rem] mb-1.5" aria-hidden="true">${escapeHtml(item.icon || "check")}</span>
      <span class="font-label-caps text-[8px] md:text-[9px] text-deep-navy uppercase tracking-wider leading-snug">${escapeHtml(item.label)}</span>
    </div>`
      )
      .join("")}
  </div>`;
  }

  function viewDetailsButton(room) {
    return `<a class="inline-flex items-center justify-center bg-deep-navy text-white font-label-caps text-label-caps uppercase tracking-widest px-8 h-14 hover:bg-deep-navy/90 transition-colors" href="room-details.html?room=${escapeHtml(room.slug)}">View Details</a>`;
  }

  function renderFeatured(room) {
    const src = roomImage(room);
    const facts = factsLine(room);
    return `
<article class="flex flex-col gap-12 reveal">
  <div class="w-full aspect-video md:aspect-[21/9] bg-surface-container relative overflow-hidden group">
    <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" alt="${escapeHtml(room.name)}" src="${escapeHtml(src)}" loading="lazy" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
    <div class="col-span-1 md:col-span-8 pr-0 md:pr-12">
      <h2 class="font-headline-md text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] text-deep-navy mb-3 font-light tracking-tight leading-snug">${escapeHtml(room.name)}</h2>
      ${
        room.headline
          ? `<p class="font-label-caps text-label-caps text-accent-gold mb-4 uppercase tracking-widest">${escapeHtml(room.headline)}</p>`
          : ""
      }
      ${facts ? `<p class="font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest uppercase">${escapeHtml(facts)}</p>` : ""}
      <p class="font-body-md text-body-md text-on-surface-variant max-w-3xl mb-8">${escapeHtml(room.description || room.shortDescription)}</p>
      ${renderHighlights(room)}
      <div class="flex items-start">
        ${viewDetailsButton(room)}
      </div>
    </div>
    <div class="col-span-1 md:col-span-4 flex flex-col mt-8 md:mt-0 items-start md:items-end justify-center md:pt-2">
      ${priceBlock(room, "font-title-lg text-[0.95rem] md:text-[1rem] lg:text-title-lg text-deep-navy")}
    </div>
  </div>
</article>`;
  }

  function renderSplit(room, imageRight) {
    const src = roomImage(room);
    const facts = factsLine(room);
    const text = `
<div class="col-span-1 md:col-span-5 ${imageRight ? "md:col-start-1 order-2 md:order-1" : "md:col-start-8 order-2"} flex flex-col justify-center">
  <h2 class="font-headline-md text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] text-deep-navy mb-3 font-light tracking-tight leading-snug">${escapeHtml(room.name)}</h2>
  ${
    room.headline
      ? `<p class="font-label-caps text-label-caps text-accent-gold mb-4 uppercase tracking-widest">${escapeHtml(room.headline)}</p>`
      : ""
  }
  ${facts ? `<p class="font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest uppercase">${escapeHtml(facts)}</p>` : ""}
  <p class="font-body-md text-body-md text-on-surface-variant mb-8">${escapeHtml(room.description || room.shortDescription)}</p>
  ${priceBlock(room, "font-title-lg text-[0.95rem] md:text-[1rem] lg:text-title-lg text-deep-navy mb-8")}
  ${renderHighlights(room)}
  <div class="flex items-start">
    ${viewDetailsButton(room)}
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
      .map((room) => {
        const layout = room.catalogueLayout || "split-left";
        if (layout === "featured") return renderFeatured(room);
        if (layout === "split-right") return renderSplit(room, true);
        return renderSplit(room, false);
      })
      .join("");
  }

  function fallbackRoomImage() {
    return (window.EllipseImages && window.EllipseImages.roomsHero) || "";
  }

  function detailGallery(room) {
    return roomImages(room && room.slug);
  }

  function detailHeroSrc(room, gallery) {
    if (gallery && gallery[0]) return gallery[0];
    return roomImage(room);
  }

  function rateLabel(room, compact) {
    if (room.priceFrom != null && room.priceFrom !== "") {
      if (compact) {
        return `${escapeHtml(String(room.priceFrom))} <span class="text-sm font-normal text-white/70">/ night</span>`;
      }
      return `From ${escapeHtml(String(room.priceFrom))} / night`;
    }
    return compact ? "Rate on request" : "Rate on request";
  }

  function setRoomSeo(room) {
    document.title = `${room.name} | Ellipse Hotels Lagos`;
    const meta =
      document.getElementById("room-meta-description") ||
      document.querySelector('meta[name="description"]');
    if (meta) {
      const desc =
        room.tagline ||
        room.shortDescription ||
        room.description ||
        `${room.name} at Ellipse Hotels, Lagos.`;
      meta.setAttribute("content", desc);
    }
  }

  function renderNotFound(root) {
    document.title = "Room Not Found | Ellipse Hotels Lagos";
    document.body.classList.remove("has-mobile-book-bar");
    root.innerHTML = `
<section class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24 md:py-32 text-center reveal active">
  <p class="font-label-caps text-label-caps text-accent-gold uppercase tracking-widest mb-4">Rooms &amp; Suites</p>
  <h1 class="font-headline-md text-[2rem] md:text-[2.75rem] text-deep-navy mb-6 font-light tracking-tight">Room not found</h1>
  <p class="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-10">
    This room is unavailable or the link is incorrect. Explore our full catalogue of rooms and suites.
  </p>
  <a class="inline-flex items-center justify-center bg-deep-navy text-white font-label-caps text-label-caps uppercase tracking-widest px-10 h-14 hover:bg-deep-navy/90 transition-colors" href="rooms.html">View All Rooms</a>
</section>`;
  }

  function renderFactsStrip(room) {
    const entries =
      window.EllipseRooms && window.EllipseRooms.factEntries
        ? window.EllipseRooms.factEntries(room)
        : [];
    if (!entries.length) return "";

    const cells = entries
      .map((entry, index) => {
        const divider =
          index < entries.length - 1
            ? `<div class="hidden md:block w-px h-12 bg-accent-gold/30 self-center" aria-hidden="true"></div>`
            : "";
        return `
      <div class="text-center min-w-[7rem] flex-1">
        <p class="font-label-caps text-label-caps text-accent-gold mb-2 uppercase tracking-widest">${escapeHtml(entry.label)}</p>
        <p class="font-body-lg text-body-lg text-deep-navy">${escapeHtml(entry.value)}</p>
      </div>
      ${divider}`;
      })
      .join("");

    return `
<div class="flex flex-wrap justify-center items-center gap-8 md:gap-10 border-y border-accent-gold/30 py-5 md:py-6 reveal">
  ${cells}
</div>`;
  }

  function renderExperience(room) {
    const exp = room.experience || {};
    const title = exp.title || "Your space in Lagos.";
    const paragraphs = Array.isArray(exp.paragraphs)
      ? exp.paragraphs.filter((p) => p && String(p).trim())
      : [];
    const copy =
      paragraphs.length > 0
        ? paragraphs
        : [room.description, room.shortDescription].filter(Boolean);
    const gallery = roomImages(room.slug);
    const imageSrc = gallery[1] || gallery[0] || fallbackRoomImage();
    if (!copy.length && !imageSrc) return "";
    const paras = copy
      .map(
        (p, i) =>
          `<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed${i < copy.length - 1 ? " mb-6" : ""}">${escapeHtml(p)}</p>`
      )
      .join("");

    return `
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 md:pt-8 pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center reveal">
  <div class="order-2 md:order-1">
    <h2 class="font-headline-md text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] text-deep-navy mb-8 font-light tracking-tight">${escapeHtml(title)}</h2>
    ${paras}
  </div>
  <div class="order-1 md:order-2 h-[320px] md:h-[500px] bg-surface-container overflow-hidden group">
    <img class="w-full h-full object-cover room-detail-zoom" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(room.name)}" loading="lazy" />
  </div>
</section>`;
  }

  function renderAmenities(room) {
    const amenities = Array.isArray(room.amenities) ? room.amenities : [];
    const highlights = Array.isArray(room.highlights) ? room.highlights : [];
    // Detail pages use amenities when set; otherwise fall back to the same
    // highlights shown on the rooms catalogue.
    const source = amenities.length ? amenities : highlights;
    const items = source.filter((a) => a && (a.label || typeof a === "string"));
    if (!items.length) return "";

    const cells = items
      .map((a) => {
        const label = typeof a === "string" ? a : a.label;
        const icon = typeof a === "string" ? "check" : a.icon || "check";
        return `
      <div class="flex flex-col items-center text-center">
        <span class="material-symbols-outlined text-accent-gold text-3xl mb-4" aria-hidden="true">${escapeHtml(icon)}</span>
        <span class="font-body-md text-deep-navy tracking-wide uppercase text-sm">${escapeHtml(label)}</span>
      </div>`;
      })
      .join("");

    return `
<section class="bg-surface-container-low w-full py-20 md:py-24 mt-4 md:mt-6 reveal">
  <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
    <h3 class="font-headline-md text-[1.75rem] md:text-[2.25rem] text-deep-navy mb-12 md:mb-16 text-center font-light tracking-tight">Amenities</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
      ${cells}
    </div>
  </div>
</section>`;
  }

  function renderGallery(room, gallery) {
    const images = (gallery || []).filter(Boolean);
    if (!images.length) return "";

    if (images.length === 1) {
      return `
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 reveal">
  <div class="h-[320px] md:h-[560px] overflow-hidden group bg-surface-container">
    <img class="w-full h-full object-cover room-detail-zoom" src="${escapeHtml(images[0])}" alt="${escapeHtml(room.name)}" loading="lazy" />
  </div>
</section>`;
    }

    if (images.length === 2) {
      return `
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 reveal">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
    ${images
      .map(
        (src) => `
    <div class="h-[280px] md:h-[480px] overflow-hidden group bg-surface-container">
      <img class="w-full h-full object-cover room-detail-zoom" src="${escapeHtml(src)}" alt="${escapeHtml(room.name)}" loading="lazy" />
    </div>`
      )
      .join("")}
  </div>
</section>`;
    }

    const primary = images[0];
    const secondary = images[1];
    const mosaicExtras = images.slice(2, 4);
    const remaining = images.slice(4);

    const remainingGrid = remaining.length
      ? `<div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
    ${remaining
      .map(
        (src) => `
    <div class="aspect-[4/3] overflow-hidden group bg-surface-container">
      <img class="w-full h-full object-cover room-detail-zoom" src="${escapeHtml(src)}" alt="${escapeHtml(room.name)}" loading="lazy" />
    </div>`
      )
      .join("")}
  </div>`
      : "";

    return `
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24 reveal">
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:h-[600px]">
    <div class="md:col-span-7 h-[320px] md:h-full overflow-hidden group bg-surface-container">
      <img class="w-full h-full object-cover room-detail-zoom" src="${escapeHtml(primary)}" alt="${escapeHtml(room.name)}" loading="lazy" />
    </div>
    <div class="md:col-span-5 flex flex-col gap-6 md:gap-8 h-auto md:h-full">
      <div class="h-[280px] md:flex-1 overflow-hidden group bg-surface-container">
        <img class="w-full h-full object-cover room-detail-zoom" src="${escapeHtml(secondary)}" alt="${escapeHtml(room.name)}" loading="lazy" />
      </div>
      ${
        mosaicExtras.length
          ? `<div class="grid grid-cols-2 gap-6 md:gap-8 ${mosaicExtras.length === 1 ? "md:grid-cols-1" : ""}">
        ${mosaicExtras
          .map(
            (src) => `
        <div class="h-[160px] md:h-[180px] overflow-hidden group bg-surface-container">
          <img class="w-full h-full object-cover room-detail-zoom" src="${escapeHtml(src)}" alt="${escapeHtml(room.name)}" loading="lazy" />
        </div>`
          )
          .join("")}
      </div>`
          : ""
      }
    </div>
  </div>
  ${remainingGrid}
</section>`;
  }

  function renderRelated(room) {
    const others = window.EllipseRooms.list().filter((r) => r.slug !== room.slug);
    if (!others.length) return "";

    const cards = others
      .map((r) => {
        const src = roomImage(r) || fallbackRoomImage();
        return `
<a class="group block" href="room-details.html?room=${escapeHtml(r.slug)}">
  <div class="w-full h-[240px] md:h-[300px] bg-surface-container mb-6 overflow-hidden">
    <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${escapeHtml(src)}" alt="${escapeHtml(r.name)}" loading="lazy" />
  </div>
  <h4 class="font-headline-md text-2xl text-deep-navy mb-2 group-hover:text-accent-gold transition-colors">${escapeHtml(r.name)}</h4>
  <p class="font-body-md text-on-surface-variant mb-4">${escapeHtml(r.tagline || r.shortDescription || "")}</p>
  <span class="font-label-caps text-label-caps text-deep-navy uppercase tracking-widest border-b border-deep-navy pb-1 group-hover:opacity-70 transition-opacity">View Details</span>
</a>`;
      })
      .join("");

    return `
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-24 reveal">
  <h3 class="font-headline-md text-[1.75rem] md:text-[2.25rem] text-deep-navy mb-12 text-center font-light tracking-tight">More Accommodations</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
    ${cards}
  </div>
</section>`;
  }

  function renderDetail() {
    const root = document.getElementById("room-detail-root");
    if (!root || !window.EllipseRooms) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("room");
    if (!slug) {
      renderNotFound(root);
      return;
    }

    const room = window.EllipseRooms.get(slug);
    if (!room) {
      renderNotFound(root);
      return;
    }

    setRoomSeo(room);
    document.body.classList.add("has-mobile-book-bar");

    const gallery = detailGallery(room);
    const heroSrc = detailHeroSrc(room, gallery);
    const bookCta = bookLink(
      room,
      "inline-flex items-center justify-center bg-accent-gold text-deep-navy px-12 py-5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-white transition-colors border border-transparent hover:border-accent-gold w-full md:w-auto",
      "Check Availability"
    );
    const mobileBook = bookLink(
      room,
      "inline-flex items-center justify-center bg-accent-gold text-deep-navy px-6 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-white transition-colors shrink-0",
      "Book"
    );

    root.innerHTML = `
<section class="room-detail-hero w-full h-[55vh] md:h-[80vh] relative overflow-hidden group">
  <div class="room-detail-hero__media absolute inset-0">
    <img class="w-full h-full object-cover" src="${escapeHtml(heroSrc)}" alt="${escapeHtml(room.name)}" />
  </div>
  <div class="absolute inset-0 bg-deep-navy/35" aria-hidden="true"></div>
  <div class="absolute inset-0 flex items-end">
    <div class="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-10 md:pb-14 reveal active">
      <p class="font-label-caps text-label-caps text-accent-gold uppercase tracking-widest mb-3">Rooms &amp; Suites</p>
      <h1 class="font-headline-md text-[2.25rem] md:text-[3.5rem] lg:text-[4rem] text-white font-light tracking-tight leading-none mb-4 md:mb-5">${escapeHtml(room.name)}</h1>
      ${
        room.tagline
          ? `<p class="font-headline-md text-[1.1rem] md:text-[1.35rem] text-white/95 italic font-light leading-relaxed mb-3 md:mb-4 max-w-3xl">${escapeHtml(room.tagline)}</p>`
          : ""
      }
      ${
        room.shortDescription
          ? `<p class="font-body-md text-body-md md:text-body-lg text-white/80 leading-relaxed max-w-3xl">${escapeHtml(room.shortDescription)}</p>`
          : ""
      }
    </div>
  </div>
</section>

<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-2 md:pt-4 pb-4 md:pb-6">
  ${renderFactsStrip(room)}
</section>

${renderExperience(room)}
${renderAmenities(room)}
${renderGallery(room, gallery)}

<section class="bg-deep-navy w-full py-20 md:py-24 reveal">
  <div class="max-w-3xl mx-auto px-margin-mobile text-center">
    <h3 class="font-headline-md text-[1.75rem] md:text-[2.5rem] text-white mb-4 font-light tracking-tight">Experience the ${escapeHtml(room.name)}</h3>
    <p class="font-title-lg text-accent-gold mb-10 md:mb-12">${rateLabel(room, false)}</p>
    ${bookCta}
  </div>
</section>

${renderRelated(room)}

<div class="room-detail-mobile-bar lg:hidden bg-deep-navy border-t border-accent-gold/30 p-4 flex justify-between items-center gap-4 shadow-2xl">
  <div class="min-w-0">
    <p class="font-label-caps text-[10px] text-accent-gold uppercase tracking-widest truncate">${escapeHtml(room.name)}</p>
    <p class="font-title-lg text-lg text-white leading-tight">${rateLabel(room, true)}</p>
  </div>
  ${mobileBook}
</div>`;

    activateReveals(root);
  }

  function activateReveals(scope) {
    const root = scope || document;
    if (window.EllipseChrome && typeof window.EllipseChrome.refreshReveals === "function") {
      window.EllipseChrome.refreshReveals();
      return;
    }
    root.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("active");
    });
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
