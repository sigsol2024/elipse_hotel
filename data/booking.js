/**
 * StayEazi booking configuration for Ellipse Hotels.
 */
window.EllipseBooking = {
  /** StayEazi embed widget token (homepage calendar) */
  widgetToken: "SwFxhsKAvxBwoK0G9WMNFiZqHtCkm8s6",

  /** General booking / search URL for "Book Your Stay" CTAs */
  generalBookingUrl: "https://app.stayeazi.com/reservation/ellipse-hotels",

  /** Optional hotel code once known */
  hotelCode: "",

  /**
   * Optional template for room-specific URLs.
   * Room pages use bookingUrl on each room in data/rooms.js.
   */
  roomUrlTemplate: "https://app.stayeazi.com/reservation/ellipse-hotels/{bookingRoomId}",

  getGeneralUrl() {
    const url = (this.generalBookingUrl || "").trim();
    return url || null;
  },

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
    return Boolean(this.widgetToken || this.getGeneralUrl());
  }
};
