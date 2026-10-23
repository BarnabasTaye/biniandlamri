# Lamirot &amp; Biniyam Wedding

A single-page wedding website for the holy matrimony of Lamirot and Biniyam in Addis Ababa, Ethiopia on **Saturday, November 14, 2026**.

Features include a live countdown, order of events with Ethiopian time, venue directions, photo gallery, RSVP form, guestbook, registry details, and a printable keepsake invitation.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The site is served at <http://localhost:3000>.

No API key or environment variables are required.

## Build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Notes

- RSVPs, guestbook wishes, uploaded gallery photos, and the hero portrait are stored in the browser's `localStorage`. They persist on the same device/browser but are not shared between guests. A shared backend is required for multi-device persistence.
- The bridal organizer portal is a local preview and uses the demo passcode `2026`.
- `npm run lint` runs the TypeScript type check.
