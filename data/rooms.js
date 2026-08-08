/**
 * Shared room catalogue — single source for homepage, rooms page, and room details.
 * Update this file (not HTML) when names, copy, photos, rates, or booking IDs change.
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
      occupancy: "Up to 2 Guests",
      bed: "King Bed",
      size: "",
      priceFrom: null,
      image: "assets/images/home/room-standard.jpg",
      amenities: [],
      amenitiesNote: "Amenity list forthcoming.",
      bookingRoomId: "",
      bookingUrl: "",
      catalogueLayout: "split-left",
      homeLayout: "image-left",
      gallery: [
        { ratio: "16/9", label: "16:9 Hero image", caption: "Room photography" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Room detail" },
        { ratio: "3/2", label: "3/2 Detail", caption: "Room detail" }
      ]
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
      occupancy: "Up to 2 Guests",
      bed: "King Bed",
      size: "",
      priceFrom: null,
      image: "assets/images/home/room-deluxe.jpg",
      amenities: [],
      amenitiesNote: "Amenity list forthcoming.",
      bookingRoomId: "",
      bookingUrl: "",
      catalogueLayout: "split-right",
      homeLayout: "image-right",
      gallery: [
        { ratio: "16/9", label: "16:9 Hero image", caption: "Room photography" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Room detail" },
        { ratio: "3/2", label: "3/2 Detail", caption: "Room detail" }
      ]
    },
    executive: {
      slug: "executive",
      name: "Executive Suite",
      headline: "Ultimate Refinement",
      provisional: true,
      shortDescription:
        "Our most generous offering. The Executive Suite features a distinct living space, premium amenities, and panoramic views of the city.",
      description:
        "Our most expansive offering. The Executive Suite provides a profound sense of space and tranquility, featuring a separate living area and considered appointments designed to elevate your stay.",
      occupancy: "Up to 3 Guests",
      bed: "King Bed",
      size: "",
      priceFrom: null,
      image: "assets/images/home/room-executive.jpg",
      amenities: [],
      amenitiesNote: "Amenity list forthcoming.",
      bookingRoomId: "",
      bookingUrl: "",
      catalogueLayout: "featured",
      homeLayout: "image-left",
      gallery: [
        { ratio: "16/9", label: "16:9 Hero image", caption: "Suite photography" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Suite detail" },
        { ratio: "3/2", label: "3/2 Detail", caption: "Suite detail" }
      ]
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
    if (!slug) return null;
    return this.items[slug] || null;
  },

  facts(room) {
    if (!room) return [];
    return [room.size, room.bed, room.occupancy].filter(
      (part) => part && String(part).trim() && part !== "To be confirmed"
    );
  }
};
