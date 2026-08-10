/**
 * Shared room catalogue — single source for homepage, rooms page, and room details.
 * Update this file (not HTML) when names, copy, rates, or booking IDs change.
 *
 * Room photography is NOT listed here. Galleries are discovered from
 * assets/images/hotel/{Standard Room|Deluxe Room|Executive Suite}/ via
 * data/room-images.js (or api/room-images.php on PHP hosts).
 */
window.EllipseRooms = {
  /** Rooms page / general catalogue order */
  order: ["executive", "deluxe", "standard"],

  /** Homepage teaser order */
  homeOrder: ["standard", "deluxe", "executive"],

  items: {
    standard: {
      slug: "standard",
      name: "Standard Room",
      headline: "Intelligent Comfort",
      provisional: true,
      shortDescription:
        "A focused, intelligent space designed for the practical traveler. Featuring essential comforts, fine linens, and a dedicated work area bathed in natural light.",
      description:
        "Essential comfort executed with precision. An intimate space designed purely for rest, stripping away the unnecessary to focus on quality sleep and clarity.",
      tagline: "Intelligent comfort for the practical traveler.",
      priceFrom: null,
      facts: {
        size: "",
        bed: "",
        guests: "",
        view: ""
      },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "Essential comfort executed with precision. An intimate space designed purely for rest, stripping away the unnecessary to focus on quality sleep and clarity.",
          "A focused, intelligent room for the practical traveler — fine linens and a dedicated work area bathed in natural light."
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
      bookingRoomId: "",
      bookingUrl: "",
      catalogueLayout: "split-left",
      homeLayout: "image-left"
    },
    deluxe: {
      slug: "deluxe",
      name: "Deluxe Room",
      headline: "Expanded Perspectives",
      provisional: true,
      shortDescription:
        "Expanded volume and enhanced materiality. The Deluxe offers a broader perspective with elevated seating arrangements and curated architectural details.",
      description:
        "A refined retreat balancing comfort and considered design. Features an expanded seating area and enhanced amenities for a truly restful experience.",
      tagline: "Expanded volume and considered materiality.",
      priceFrom: null,
      facts: {
        size: "",
        bed: "",
        guests: "",
        view: ""
      },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "A refined retreat balancing comfort and considered design — expanded seating and a calmer sense of volume for a truly restful stay.",
          "Elevated materiality and curated architectural details give the Deluxe a broader perspective without excess."
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
      bookingRoomId: "",
      bookingUrl: "",
      catalogueLayout: "split-right",
      homeLayout: "image-right"
    },
    executive: {
      slug: "executive",
      name: "Executive Suite",
      headline: "Ultimate Refinement",
      provisional: true,
      shortDescription:
        "Our most generous offering. The Executive Suite features a distinct living space, premium appointments, and a profound sense of calm.",
      description:
        "Our most expansive offering. The Executive Suite provides a profound sense of space and tranquility, featuring a separate living area and considered appointments designed to elevate your stay.",
      tagline: "Space, privacy and understated comfort in the heart of Lagos.",
      priceFrom: null,
      facts: {
        size: "",
        bed: "",
        guests: "",
        view: ""
      },
      experience: {
        title: "Your space in Lagos.",
        paragraphs: [
          "Our most expansive offering. The Executive Suite provides a profound sense of space and tranquility, featuring a separate living area and considered appointments designed to elevate your stay.",
          "A distinct living space and quiet materiality create sanctuary — composed, generous, and ready for both rest and focused work."
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
      bookingRoomId: "",
      bookingUrl: "",
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
