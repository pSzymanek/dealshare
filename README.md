# dealshare

Modern Next.js App Router website for the dealshare B2B platform.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- WordPress REST API as blog content source only

## Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set:

```bash
WORDPRESS_API_URL=https://example.com/wp-json/wp/v2
```

If the WordPress API is unavailable or not configured, blog sections render an elegant fallback instead of crashing.

## Structure

- `app/` - routes and metadata
- `components/` - reusable layout and UI components
- `lib/offers.ts` - typed mock offer data
- `lib/categories.ts` - typed mock category data
- `lib/wordpress.ts` - WordPress REST API abstraction
- `public/` - logo, dark logo, sygnet and favicon SVG placeholders
