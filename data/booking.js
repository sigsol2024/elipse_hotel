/**
 * External booking engine configuration.
 * Fill values when Ellipse Hotels provides engine documentation.
 * Do NOT invent query parameter names — wire them only from official docs.
 */
window.EllipseBooking = {
  /** General booking / search URL for "Book Your Stay" */
  generalBookingUrl: "",

  /** Optional hotel code once known */
  hotelCode: "",

  /**
   * Optional template for room-specific URLs.
   * Leave empty until the engine documents parameters.
   * Example (DO NOT USE until confirmed): "https://engine.example/book?room={bookingRoomId}"
   */
  roomUrlTemplate: "",

  /**
   * Returns the general booking URL, or null if not configured.
   */
  getGeneralUrl() {
    const url = (this.generalBookingUrl || "").trim();
    return url || null;
  },

  /**
   * Resolve a room booking URL from a room record.
   * Priority: room.bookingUrl → template + bookingRoomId → null
   */
  getRoomUrl(room) {
    if (!room) return null;
    const direct = (room.bookingUrl || "").trim();
    if (direct) return direct;

    const id = (room.bookingRoomId || "").trim();
    const template = (this.roomUrlTemplate || "").trim();
    if (id && template && template.includes("{bookingRoomId}")) {
      return template.replace("{bookingRoomId}", encodeURIComponent(id));
    }
    return null;
  },

  isConfigured() {
    return Boolean(this.getGeneralUrl());
  }
};
