# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Artist portfolio website for Bitte Brun (bittebrun.se) — a Swedish artist. The site showcases paintings in a gallery, displays news/exhibitions, and includes biography and contact pages. Admins can upload images, manage gallery order, and publish news.

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build (also runs `next-sitemap` via postbuild)
- `npm run lint` — ESLint
- `npx tsx scripts/createUser.ts` — Create admin user from env variables

No test framework is configured.

## Architecture

**Next.js 14 App Router** with TypeScript, using the `src/` directory structure.

### Path alias

`@/*` maps to `src/*` (e.g., `import Image from "@/models/Image"`)

### Key directories

- `src/app/` — Pages and API routes (App Router)
- `src/app/components/` — React components, organized by feature (`gallery/`, `news/`)
- `src/lib/` — Shared utilities (DB connections, auth config, data fetching)
- `src/models/` — Mongoose schemas (Image, News, User)
- `src/types.ts` — Shared TypeScript types

### Pages (Swedish URL paths)

`/` (home), `/galleri`, `/galleri/[id]`, `/nyheter` (news), `/nyheter/[id]`, `/biografi`, `/kontakt`, `/login`

### Data flow pattern

Server components fetch data via helpers in `src/lib/` (e.g., `getImages()`, `getNews()`), serialize with `JSON.parse(JSON.stringify(...))`, check admin status via `getServerSession`, then pass data + `isAdmin` flag to client components. Client components (`GalleryClient`, `NewsClient`) conditionally render admin or public views.

### Authentication

- NextAuth.js with Credentials provider and JWT sessions
- Two admin accounts defined by `ADMIN_EMAIL` / `ADMIN_EMAIL_TWO` env vars
- Admin check: compare session email against allowed admin emails
- `middleware.ts` protects `/admin/*` routes (redirects to `/login`)
- Auth config lives in `src/lib/authOptions.ts`

### External services

- **MongoDB** via Mongoose — data storage (dual connection: Mongoose for app, native client for NextAuth adapter)
- **Cloudinary** — image hosting/CDN. Images store `public_id` for cleanup on delete.
- **Google Maps** — contact page map

### Styling

Tailwind CSS 4 with custom font CSS variables: `--font-alex-brush` (logo), `--font-lora` (body), `--font-roboto` (pricing), `--font-nunito` (nav), `--font-playfair-display` (headers). Fonts loaded via `next/font/google` in root layout.

### Gallery features

- Drag-and-drop reordering with `@dnd-kit` (admin only)
- Image metadata: title, description, size, price, sold status, techniques
- Upload via Cloudinary, form parsing with `formidable`

## Environment Variables

Required in `.env.local`: `MONGODB_URI`, `CLOUDINARY_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_EMAIL_TWO`, `ADMIN_PASSWORD_TWO`

## ESLint

`@typescript-eslint/no-explicit-any` is disabled.
