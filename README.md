# Ellipse Hotels — Website

Static multi-page hospitality site for Ellipse Hotels (Lagos).

## Pages

- `index.html` — Home
- `about.html` — About
- `rooms.html` — Rooms catalogue
- `room-details.html?room=deluxe` — Room detail (data-driven)
- `facilities.html` — Facilities (placeholder chapters)
- `contact.html` — Contact
- `terms.html` — Terms & Conditions (policy shells)

## Design system

- Brand notes: `assets/brand/NOTES.md`
- Logo lockups: `assets/brand/*.svg`
- Tokens: `css/tokens.css`
- Type: **Outfit** + **Cormorant Garamond** (selected after logo analysis)

## Booking engine

Configure in `data/booking.js` and per-room fields in `data/rooms.js`.

| CTA | Source |
|-----|--------|
| Book Your Stay | `EllipseBooking.generalBookingUrl` |
| Book This Room | `room.bookingUrl` or `roomUrlTemplate` + `bookingRoomId` |

Do not invent query parameter names until the engine’s docs are available.

## Shared chrome

`js/site-chrome.js` injects header and footer on every page.

## Local preview

Open `index.html` in a browser, or serve the folder with any static server.
