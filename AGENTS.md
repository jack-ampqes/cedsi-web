# AGENTS.md

Guidance for AI agents working in this repository.

## Project

CEDSI marketing site. Next.js 16 (App Router) + TypeScript + Tailwind + shadcn/ui,
with framer-motion for animation. Page sections live in `components/`, capability
page copy in `lib/capabilities.ts`, capability routes under `app/capabilities/`.

## Commands

- `npm run dev` - local dev server
- `npm run check` - lint + typecheck (run before finishing a change)
- `npm run build` - production build

## Writing style

**Never use em dashes (—) or en dashes (–) in site copy, headings, metadata, alt
text, commit messages, or any other prose.** This includes the HTML entities
`&mdash;` and `&ndash;`. Rewrite the sentence instead:

- Use a comma for an aside or appositive.
- Use a colon when introducing a list or an explanation.
- Use parentheses for a true parenthetical.
- Split into two sentences when the clauses stand on their own.
- Use a hyphen only where it belongs, in compound modifiers like `long-term`
  and `UL-certified`.

Examples:

```
Bad:  Clear documentation supports maintenance—keeping operators informed.
Good: Clear documentation supports maintenance, keeping operators informed.

Bad:  We serve four industries — automotive, chemical, pharma, and water.
Good: We serve four industries: automotive, chemical, pharma, and water.
```

Before finishing any change that touches copy, check for strays:

```
grep -rn "—\|&mdash;\|–\|&ndash;" --include="*.tsx" --include="*.ts" \
  --include="*.css" --include="*.md" . --exclude-dir=node_modules \
  --exclude-dir=.next --exclude=AGENTS.md
```

(`--exclude=AGENTS.md` skips this file, whose examples above contain the
characters on purpose. Any other hit is a real one and must be rewritten.)

Other copy conventions:

- Keep marketing prose plain and concrete. No filler superlatives.
- External links open in a new tab with `target="_blank" rel="noopener noreferrer"`.
