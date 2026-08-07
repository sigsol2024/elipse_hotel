/**
 * Room catalogue — provisional categories until Ellipse Hotels supplies final data.
 * Update this file (not HTML) when names, photos, prices, amenities, or booking IDs arrive.
 */
window.EllipseRooms = {
  order: ["standard", "deluxe", "executive", "suite"],

  items: {
    standard: {
      slug: "standard",
      name: "Standard Room",
      provisional: true,
      shortDescription:
        "A calm, well-proportioned room for restful stays. Final details to be confirmed.",
      description:
        "Thoughtfully arranged for comfort and clarity. Occupancy, bed configuration, size and amenity lists will be published once confirmed by the hotel.",
      occupancy: "To be confirmed",
      bed: "To be confirmed",
      size: "To be confirmed",
      priceFrom: null,
      amenities: [],
      amenitiesNote: "Amenity list forthcoming.",
      bookingRoomId: "",
      bookingUrl: "",
      gallery: [
        { ratio: "16/9", label: "16:9 Hero image", caption: "Room photography placeholder" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Replace with room photo" },
        { ratio: "3/2", label: "3:2 Detail", caption: "Replace with room photo" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Replace with room photo" }
      ],
      featureLayout: "feature"
    },
    deluxe: {
      slug: "deluxe",
      name: "Deluxe Room",
      provisional: true,
      shortDescription:
        "Additional space and a quieter sense of finish. Specifications to be confirmed.",
      description:
        "Designed for guests who want a little more room to settle. Exact furnishings, views and inclusions will be updated when hotel photography and specs are available.",
      occupancy: "To be confirmed",
      bed: "To be confirmed",
      size: "To be confirmed",
      priceFrom: null,
      amenities: [],
      amenitiesNote: "Amenity list forthcoming.",
      bookingRoomId: "",
      bookingUrl: "",
      gallery: [
        { ratio: "16/9", label: "16:9 Hero image", caption: "Room photography placeholder" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Replace with room photo" },
        { ratio: "3/2", label: "3:2 Detail", caption: "Replace with room photo" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Replace with room photo" }
      ],
      featureLayout: "pair"
    },
    executive: {
      slug: "executive",
      name: "Executive Room",
      provisional: true,
      shortDescription:
        "Balanced for rest and focused work. Final configuration forthcoming.",
      description:
        "A composed setting for guests who move between rest and productivity. Work surface, seating and technical details will be confirmed by the hotel.",
      occupancy: "To be confirmed",
      bed: "To be confirmed",
      size: "To be confirmed",
      priceFrom: null,
      amenities: [],
      amenitiesNote: "Amenity list forthcoming.",
      bookingRoomId: "",
      bookingUrl: "",
      gallery: [
        { ratio: "16/9", label: "16:9 Hero image", caption: "Room photography placeholder" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Replace with room photo" },
        { ratio: "3/2", label: "3:2 Detail", caption: "Replace with room photo" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Replace with room photo" }
      ],
      featureLayout: "pair"
    },
    suite: {
      slug: "suite",
      name: "Suite",
      provisional: true,
      shortDescription:
        "Our most spacious category. Layout and appointments to be confirmed.",
      description:
        "A more expansive stay with room to gather and unwind. Suite composition, pricing and photography will replace these placeholders when supplied.",
      occupancy: "To be confirmed",
      bed: "To be confirmed",
      size: "To be confirmed",
      priceFrom: null,
      amenities: [],
      amenitiesNote: "Amenity list forthcoming.",
      bookingRoomId: "",
      bookingUrl: "",
      gallery: [
        { ratio: "16/9", label: "16:9 Hero image", caption: "Room photography placeholder" },
        { ratio: "4/5", label: "4:5 Detail", caption: "Replace with room photo" },
        { ratio: "3/2", label: "3:2 Detail", caption: "Replace with room photo" },
        { ratio: "16/9", label: "16:9 Living area", caption: "Replace with suite photo" }
      ],
      featureLayout: "full"
    }
  },

  list() {
    return this.order.map((slug) => this.items[slug]).filter(Boolean);
  },

  get(slug) {
    if (!slug) return null;
    return this.items[slug] || null;
  }
};
