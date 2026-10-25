# METTA FLOW — BoardUI Sample (Quick Reply Panel)

A customer-support chat screen rebuilt in the [BoardUI](https://www.boardui.com/)
design language, based on one section of the METTA FLOW Figma file
(**"CHAT NAVIGATION ACTION PANELS"**).

**Scope so far: only ONE panel is built — the Quick Reply Panel — as a
working sample.** The other toolbar panels (Notes, Follow Up, Saved Customer
Data, AI Companion, Case Board) appear as disabled placeholder buttons only.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints. Production build:

```bash
npm run build
npm run preview
```

## The workflow (implemented, clickable)

The Figma section draws the Quick Reply flow as state names; this sample
implements exactly that flow:

```
entry → quick-reply panel → choose / filter → insert into composer → Send → (repeat)
```

1. **Entry** — chat is open, panel closed.
2. Click **Quick Reply** in the chat toolbar → the panel opens over the
   message thread (the composer below stays visible and clickable).
3. **Filter** — search input and category chips
   (All / Greetings / Delivery / Payment / Closing) filter the reply list
   live.
4. **Choose** — clicking a reply inserts its full text into the composer and
   highlights the chosen item.
5. **Send** — posts the text as an agent message, clears the composer,
   closes the panel. The flow then repeats for the next reply.

A live workflow indicator in the chat header tracks the current state:
**Entry → Panel open → Reply chosen → Sent**.

## Stack & the BoardUI route used

- React 19 + Vite + TypeScript + Tailwind CSS v4
- **The real BoardUI CLI was used** (not a lookalike):
  - `npx boardui@latest init` — installed the BoardUI foundations
    (`styles/theme.css`, `styles/typography.css`, `styles/globals.css`,
    `utils/cx.ts`) and dependencies (`react-aria-components`,
    `tailwind-merge`, `@remixicon/react`).
    The CLI warns that BoardUI is tested with Next.js; it completed
    successfully in this Vite project, with two adaptations:
    the `@/*` import alias is wired in `vite.config.ts` + `tsconfig.app.json`,
    and Inter is loaded via Google Fonts in `index.html` (BoardUI's theme
    expects the host app to expose `--font-inter`, which Next.js apps get
    from `next/font`).
  - `npx boardui@latest add button input textarea avatar chip badge` —
    the BoardUI source components used by this sample live under
    `components/base/` and are owned by this project.
- Design follows BoardUI rules (`AGENTS.md`, installed by the CLI):
  semantic color tokens only (no raw palette colors), composite type
  utilities, Remix icons, 16px-radius panels/cards with soft layered
  shadows, and the 150ms scale + blur panel entrance
  (`src/sample.css`, class `qr-panel-enter`).
- Dark mode: the BoardUI token set already carries `.dark` variants, so the
  token structure is dark-mode-ready; a theme toggle is not wired up in
  this sample.

## Project structure

```
components/base/     BoardUI source components (installed by the CLI)
styles/              BoardUI foundations: theme tokens, typography, globals
utils/               BoardUI utilities (cx, directional icons, …)
src/
  App.tsx            Chat screen composition + workflow state machine
  data.ts            Sample conversations, messages, quick replies
  components/
    ConversationSidebar.tsx   Inbox list with search
    ChatToolbar.tsx           Toolbar (Quick Reply works, rest are placeholders)
    QuickReplyPanel.tsx       The sample panel: search, chips, reply list
    WorkflowIndicator.tsx     Live entry → panel → chosen → sent indicator
  sample.css           Font hookup + panel/message entrance animations
```

## Content note

All chat and quick-reply text is plausible generic English support content
written for this sample. The Figma screens' in-screen text was too small to
read, so **no text is copied from Figma** — only the panel structure and the
click-flow (from the printed state names and connectors) were taken from it.
