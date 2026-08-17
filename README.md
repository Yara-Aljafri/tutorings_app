# Riyad

A Phoenix 1.8 app that is, for now, only its shell: a gradient top bar and a
four-tab bottom bar, with an empty page between them. The screens go in that
empty space.

```bash
mix setup            # fetch deps and build assets
mix phx.server       # http://localhost:4000
```

There is no database and no content module — the app boots with nothing else
installed.

## The shell

`lib/ielts_web/components/layouts.ex` holds it all:

- **The navbar** — back, assistant, and account buttons on a gradient bar. It
  is edge-to-edge and square-shouldered on a phone, and becomes a centred,
  rounded card from the `sm` breakpoint up.
- **The footer** — the four tabs, in order: Home, Activities, Payment,
  Progress. Full-width and docked to the bottom edge on a phone, a centred
  floating bar on a tablet or laptop. The active tab gets a solid icon, the
  accent colour, and a bar along its top edge.

Both bars stay in view while the page between them scrolls, and both cap their
width so the shell doesn't stretch thin on a wide screen.

The tokens the shell is built from — the accent, the page ground, the shadow,
the font — are the `@theme` block at the bottom of `assets/css/app.css`.
Icons are [heroicons](https://heroicons.com), rendered by the `<.icon>`
component from `core_components.ex`.

## The pages

Every tab is a route into `IeltsWeb.PageLive`, which renders the shell and
nothing else:

| Path          | Tab        |
| ------------- | ---------- |
| `/`           | Home       |
| `/activities` | Activities |
| `/payment`    | Payment    |
| `/progress`   | Progress   |

To build a screen, give its tab its own LiveView and wrap the content in
`<Layouts.app flash={@flash} active_tab={:home}>`.

```bash
mix test             # the shell test
mix precommit        # compile with warnings as errors, format, test
```

## The mobile app

`mobile/` is an Expo (React Native) client from the app's earlier IELTS
incarnation. Those screens and the JSON API behind them are gone from the web
app, so it now renders only its own bundled copy of the content in
`mobile/src/content.ts`.

```bash
cd mobile && npm install && npx expo start
cd mobile && npx tsc --noEmit    # typecheck
```
