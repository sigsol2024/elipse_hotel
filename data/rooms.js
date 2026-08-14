/**
 * Shared room catalogue — single source for homepage, rooms page, and room details.
 * Update this file (not HTML) when names, copy, rates, or booking IDs change.
 *
 * Room photography is NOT listed here. Galleries are discovered from
 * assets/images/hotel/rooms/{SUPERIOR|DELUXE|SUPERDELUXE|EXECUTIVE RM|SUITE}/ via
 * data/room-images.js (or api/room-images.php on PHP hosts).
 */
window.EllipseRooms = {
  /** Rooms page / general catalogue order */
  order: ["suite", "executive", "super-deluxe", "deluxe", "superior"],

  /** Homepage teaser order */
  homeOrder: ["suite", "executive", "deluxe"],

  items: {
    superior: {
      slug: "superior",
      name: "Superior",
      headline: "Thoughtful Essentials",
      provisional: false,
      shortDescription:
        "A composed guest room with the essentials done well — calm finishes, a restful bed, and space to reset after the city day.",
      description:
        "Superior rooms focus on clarity and comfort. Clean lines, considered lighting, and a quiet atmosphere make an easy base for business or leisure stays.",
      tagline: "Calm comfort for everyday travel.",
      priceFrom: "\u20A655,000",
      facts: { size: "", bed: "", guests: "", view: "" },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "Superior rooms focus on clarity and comfort — clean lines, considered lighting, and a quiet atmosphere.",
          "An easy, composed base for business or leisure stays in the city."
        ]
      },
      amenities: [],
      highlights: [
        { icon: "bed", label: "Comfort Bed" },
        { icon: "desk", label: "Work Area" },
        { icon: "wifi", label: "Hi-Speed Wi-Fi" },
        { icon: "shower", label: "Private Bath" },
        { icon: "ac_unit", label: "Climate Control" },
        { icon: "light_mode", label: "Natural Light" }
      ],
      bookingRoomId: "superior",
      bookingUrl: "https://app.stayeazi.com/reservation/ellipse-hotels/superior",
      catalogueLayout: "split-left",
      homeLayout: "image-left"
    },
    deluxe: {
      slug: "deluxe",
      name: "Deluxe",
      headline: "Expanded Perspectives",
      provisional: false,
      shortDescription:
        "Expanded volume and enhanced materiality. The Deluxe offers a broader perspective with elevated seating and curated architectural details.",
      description:
        "A refined retreat balancing comfort and considered design. Features an expanded seating area and enhanced appointments for a truly restful experience.",
      tagline: "Expanded volume and considered materiality.",
      priceFrom: "\u20A660,000",
      facts: { size: "", bed: "", guests: "", view: "" },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "A refined retreat balancing comfort and considered design — expanded seating and a calmer sense of volume.",
          "Elevated materiality and curated details give the Deluxe a broader perspective without excess."
        ]
      },
      amenities: [],
      highlights: [
        { icon: "weekend", label: "Seating Lounge" },
        { icon: "king_bed", label: "Bedroom Comfort" },
        { icon: "desktop_windows", label: "Work Space" },
        { icon: "restaurant", label: "In-Room Dining" },
        { icon: "wifi", label: "Hi-Speed Wi-Fi" },
        { icon: "shower", label: "Private Bath" }
      ],
      bookingRoomId: "deluxe",
      bookingUrl: "https://app.stayeazi.com/reservation/ellipse-hotels/deluxe",
      catalogueLayout: "split-right",
      homeLayout: "image-right"
    },
    "super-deluxe": {
      slug: "super-deluxe",
      name: "Super Deluxe",
      headline: "Elevated Comfort",
      provisional: false,
      shortDescription:
        "A step beyond Deluxe — more generous proportions, richer finishes, and a quieter sense of arrival for longer or more considered stays.",
      description:
        "Super Deluxe rooms extend the Ellipse language of calm materiality with added space and upgraded appointments for guests who want more room to unwind.",
      tagline: "More space. More composure.",
      priceFrom: "\u20A665,000",
      facts: { size: "", bed: "", guests: "", view: "" },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "Super Deluxe rooms extend calm materiality with added space and upgraded appointments.",
          "Designed for guests who want more room to unwind without losing clarity or restraint."
        ]
      },
      amenities: [],
      highlights: [
        { icon: "weekend", label: "Lounge Seating" },
        { icon: "king_bed", label: "Bedroom Comfort" },
        { icon: "desk", label: "Work Area" },
        { icon: "restaurant", label: "In-Room Dining" },
        { icon: "wifi", label: "Hi-Speed Wi-Fi" },
        { icon: "shower", label: "Private Bath" }
      ],
      bookingRoomId: "super-deluxe",
      bookingUrl: "https://app.stayeazi.com/reservation/ellipse-hotels/super-deluxe",
      catalogueLayout: "split-left",
      homeLayout: "image-left"
    },
    executive: {
      slug: "executive",
      name: "Executive Room",
      headline: "Focused Refinement",
      provisional: false,
      shortDescription:
        "A refined executive stay with composed work space, premium comfort, and the quiet confidence of well-considered detail.",
      description:
        "Executive Rooms are shaped for travelers who need rest and focus in equal measure — a composed interior with elevated appointments and a calm atmosphere.",
      tagline: "Composed for work and rest.",
      priceFrom: "\u20A670,000",
      facts: { size: "", bed: "", guests: "", view: "" },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "Executive Rooms balance rest and focus — composed interiors with elevated appointments.",
          "A calm atmosphere for travelers who need clarity as much as comfort."
        ]
      },
      amenities: [],
      highlights: [
        { icon: "desktop_windows", label: "Work Space" },
        { icon: "king_bed", label: "Bedroom Comfort" },
        { icon: "weekend", label: "Seating Area" },
        { icon: "wifi", label: "Hi-Speed Wi-Fi" },
        { icon: "shower", label: "Private Bath" },
        { icon: "ac_unit", label: "Climate Control" }
      ],
      bookingRoomId: "executive-room",
      bookingUrl: "https://app.stayeazi.com/reservation/ellipse-hotels/executive-room",
      catalogueLayout: "split-right",
      homeLayout: "image-right"
    },
    suite: {
      slug: "suite",
      name: "Luxury Suite",
      headline: "Ultimate Refinement",
      provisional: false,
      shortDescription:
        "Our most generous offering. The Suite features a distinct living space, premium appointments, and a profound sense of calm.",
      description:
        "The Suite provides a profound sense of space and tranquility, featuring a separate living area and considered appointments designed to elevate your stay.",
      tagline: "Space, privacy and understated comfort.",
      priceFrom: "\u20A6110,000",
      facts: { size: "", bed: "", guests: "", view: "" },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "The Suite provides space and tranquility, with a separate living area and considered appointments.",
          "A distinct living space and quiet materiality create sanctuary — composed, generous, and ready for rest or focused work."
        ]
      },
      amenities: [],
      highlights: [
        { icon: "weekend", label: "Living Lounge" },
        { icon: "king_bed", label: "Bedroom Comfort" },
        { icon: "countertops", label: "Kitchenette" },
        { icon: "restaurant", label: "Dining Corner" },
        { icon: "wifi", label: "Hi-Speed Wi-Fi" },
        { icon: "shower", label: "Private Bath" }
      ],
      bookingRoomId: "suite",
      bookingUrl: "https://app.stayeazi.com/reservation/ellipse-hotels/suite",
      catalogueLayout: "featured",
      homeLayout: "image-left"
    }
  },

  list() {
    return this.order.map((slug) => this.items[slug]).filter(Boolean);
  },

  homeList() {
    const order = this.homeOrder || this.order;
    return order.map((slug) => this.items[slug]).filter(Boolean);
  },

  get(slug) {
    return this.items[slug] || null;
  },

  facts(room) {
    return this.factEntries(room).map((entry) => entry.value);
  },

  /**
   * Facts for the detail strip / catalogue.
   * Empty values are omitted.
   */
  factEntries(room) {
    if (!room) return [];
    const f = room.facts || {};
    const entries = [
      { key: "size", label: "Size", value: f.size || room.size || "" },
      { key: "bed", label: "Bed", value: f.bed || room.bed || "" },
      { key: "guests", label: "Guests", value: f.guests || room.occupancy || "" },
      { key: "view", label: "View", value: f.view || "" }
    ];
    return entries.filter((entry) => entry.value && String(entry.value).trim());
  }
};
