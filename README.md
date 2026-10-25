# METTA FLOW — Quick Reply screen (rebuilt from the original design)

The Quick Reply screen of METTA FLOW, rebuilt as a working web app from the
original design export (`quick-reply.svg`, a Figma export of the real screen) —
layout, texts, colors and images match the original screen. Built on the
[BoardUI](https://www.boardui.com/) foundations installed by its CLI.

**Live preview:** https://jyujue-vibe.github.io/automateme/

**Scope so far: the Quick Reply screen.** The other action panels from the
"CHAT NAVIGATION ACTION PANELS" Figma section (Automate Actions, Notes,
Follow Up, Saved Customer Data, AI Companion, Case Board) come next, one at a
time, into this same repo.

## Run it

```bash
npm install
npm run dev
```

Production build: `npm run build` (for GitHub Pages use
`npm run build -- --base=/automateme/`).

## What's on the screen

- Left icon rail + **Inbox** conversation list (Angelina Jolie selected).
- Chat thread with the **AI Assistant** composer bar.
- **Quick Reply** panel open on the right, with the action rail beside it
  (sparkles button active).

## The workflow (implemented, clickable)

```
entry → quick-reply panel → choose / filter → insert into composer → Send → (repeat)
```

1. **Filter** — category chips (Appointment / Greetings / Package) filter the
   reply cards; clicking the active chip again shows all.
2. **Choose** — clicking a text reply card inserts its full text into the
   composer; **View Detail** on the package card inserts the package summary.
3. **Send** (or Enter) — posts the text as an agent message, clears the
   composer. The flow repeats for the next reply.
4. **Collapse** — the » button collapses the panel to just the action rail;
   the sparkles rail button reopens it.
5. Clicking a conversation moves the selection highlight.

## Fidelity notes

- All texts are the original screen's own texts, transcribed from the design
  export (chat messages, inbox previews, reply cards, RM 8,000–15,000 package).
- Colors are the export's exact fills (agent bubble `#3F5FD6`, page `#FAFAFA`,
  hairlines `#E4E4E7`, online dot `#00A991`, …).
- Avatar/photo images were extracted from the design export itself
  (transparent portrait cutouts rendered over colored circles, the checkup
  photo, the 👋 image) and web-optimized into `src/assets/` (imported by
  `src/data.ts` and inlined into the bundle at build time).

## Stack & the BoardUI route used

- React 19 + Vite + TypeScript + Tailwind CSS v4
- **The real BoardUI CLI was used**: `npx boardui@latest init` installed the
  foundations (`styles/theme.css`, `styles/typography.css`,
  `styles/globals.css`, `utils/cx.ts`) and `npx boardui@latest add button
  input textarea avatar chip badge` installed the source components under
  `components/base/`.
- Adaptations for Vite: the `@/*` alias is wired in `vite.config.ts` +
  `tsconfig.app.json`; Inter loads via Google Fonts in `index.html`.

## Project structure

```
components/base/     BoardUI source components (installed by the CLI)
styles/              BoardUI foundations: theme tokens, typography, globals
utils/               BoardUI utilities (cx, directional icons, …)
src/assets/          Images extracted from the original design export
src/
  App.tsx            Screen composition + workflow state
  data.ts            Conversations, messages, quick replies (original texts)
  components/
    IconRail.tsx           Left icon rail
    Inbox.tsx              Conversation list
    ChatCard.tsx           Chat thread + AI composer
    QuickReplyPanel.tsx    Quick Reply panel + action rail
    Avatar.tsx             Colored-circle cutout avatars
    icons.tsx              Inline SVG icons (logo, platform glyphs, …)
  sample.css           Screen styles (exact design tokens as CSS variables)
```
