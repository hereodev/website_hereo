# her.e.otherwise — README

Next.js site (App Router, TypeScript, Tailwind CSS + DaisyUI).

## Tech Stack

- **Framework**: Next.js 14 (App Router, `.tsx`)
- **Auth**: Prisma + bcrypt (manual user management, no OAuth provider)
- **Database**: PostgreSQL via Supabase (accessed through Prisma ORM)
- **ORM**: Prisma (`prisma generate` required before build)
- **Images**: Bunny.net (storage) + Imgix (transformation/optimization)
- **Emails**: SendGrid
- **Deployment**: Vercel
- **Domain**: IONOS (DNS managed via Cloudflare)

## Accounts & Access

To get access to the different services, contact:
- hereotherwise@vuongvan.dev
- info@hereotherwise.site

Services: Vercel, Supabase, Bunny.net, Imgix, SendGrid, IONOS, Cloudflare.

## Environment Variables

All variables are configured in Vercel (Settings → Environment Variables)
or in a `.env.local` file for local development. Ask the contacts above for the values.

Key variables (non-exhaustive):
- `DATABASE_URL` — Supabase/PostgreSQL connection URL
- `AUTH_SECRET` — session secret
- `SENDGRID_API_KEY` — email sending
- `NEXT_PUBLIC_IMGIX_DOMAIN` — Imgix domain
- `BUNNY_API_KEY` / `BUNNY_STORAGE_ZONE` — Bunny.net access

## Local Setup

```bash
npm install
npx prisma generate
npm run dev
```

Project runs on `http://localhost:3000`.

## Deployment

Deployment is automatic via Vercel on every push to `main`.
The build runs `prisma generate && next build` (see `package.json`).

## Watch Out

- The Supabase project can go into **pause** after inactivity — reactivate it from the Supabase dashboard if the DB is unresponsive.
- DNS is on **Cloudflare** even though the domain is registered at **IONOS**.
- Always run `npx prisma generate` before building, otherwise the Prisma client won't be up to date.