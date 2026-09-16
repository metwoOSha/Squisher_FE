# Squisher — frontend

React + TypeScript + Vite frontend for the Squisher link shortener.
Built from the `Squisher.dc.html` design; the NestJS backend lives in `../Squisher`.

## Running

The backend must be up first (it serves the API and the short links):

```bash
cd "../Squisher" && npm run start:dev
```

Then:

```bash
npm run dev
```

The app is on http://localhost:5173.

## Backend connection

The dev server proxies `/api/*` to `http://localhost:3000` (see `vite.config.ts`), so the
app is always same-origin. That keeps the httpOnly `token` / `anonId` cookies working
without any CORS setup on the NestJS side — every request goes out with
`credentials: 'include'`.

Override the target with `VITE_API_URL` (see `.env.example`).

## Structure

- `api/` — `http.ts` fetch wrappers plus one module per resource; `ApiError` carries the status code
- `components/` — one folder per component, `Component.tsx` + `Component.module.css`
- `config/` — API URLs, accent swatches, shared constants
- `helpers/` — pure formatting and validation functions
- `hooks/` — `useAuth`, `useLinks`, and the small UI hooks
- `styles/` — `globals.css` holds every design token and keyframe; `mixins.module.css` holds shared surfaces
- `types/` — shared interfaces
- `utils/Portal.tsx` — `createPortal` wrapper used by the modal and the toast

## Design notes

All colours, radii, fonts, easings and keyframes come from the design and live as CSS
custom properties in `styles/globals.css`. The accent colour is a runtime variable
(`--accent`) driven by the header swatches and persisted to `localStorage`.
