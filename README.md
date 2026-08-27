# CEDSI website

Marketing site for Controls and Electrical Design Services, Inc., built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/Radix UI primitives.

## Requirements

- Node.js `20.19+`, `22.13+`, or `24+` (Node 24 LTS recommended)
- npm `12.0.2+`

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The development server binds to `http://127.0.0.1:3000` and uses Webpack polling for reliable file watching. Use `npm run dev:clean` if the Next.js cache needs to be rebuilt.

If npm 12 reports `EALLOWREMOTE` or `EALLOWSCRIPTS`, a user-level npm security allowlist is blocking registry packages or lifecycle scripts. Review that policy with `npm config get allow-remote` and `npm config get allow-scripts`; the repository does not override user security settings.

## Contact form

The contact form sends email through the Resend HTTP API. Configure these values in `.env.local` for development and in the deployment environment for production:

- `RESEND_API_KEY`: Resend API key.
- `CONTACT_FROM_EMAIL`: sender on a domain verified by Resend.
- `CONTACT_TO_EMAIL`: optional recipient; defaults to `sales@cedsi.com`.

Without the required Resend settings, the form returns a clear unavailable message rather than reporting a false success.

## Quality checks

```bash
npm run check
npm run build
```

`npm run check` runs ESLint and Next-aware TypeScript validation. Production builds use Webpack to stay consistent with the project’s development watcher configuration.
