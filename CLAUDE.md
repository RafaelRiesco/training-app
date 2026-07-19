# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Flask app serving a single-page training dashboard (`templates/index.html`) via `app.py`. `templates/index.html` is now just the HTML skeleton plus a stylesheet `<link>` and a single `<script type="module">` — no inline CSS/JS. There are no other routes, API endpoints, or tests yet. `README.md` is empty.

The frontend is vanilla JS (ES modules, no bundler/framework) under `static/js/`:
- `static/css/dashboard.css` — all styling, lifted verbatim from the old inline `<style>`.
- `static/js/data/*.js` — plain `export const` data modules (exercises, muscles, tests, tracker sessions, test-result/body fields, watch metrics, nutrition defaults). Content, not behavior — not classes.
- `static/js/core/` — shared classes: `Store` (localStorage wrapper), `Repository`/`StaticRepository`/`ApiRepository` (data-access seam — every page fetches its data via `await repository.get()`, so swapping a page onto a real backend later, e.g. a Flask-proxied smartwatch endpoint, means changing only that one repository instance), `CollapsibleList` (shared open/close list behavior used by exercises/muscles/tests), `TabGroup` (shared tab-switching behavior), `PageController` (base class for a page's render lifecycle — `once: true` builds a page a single time, `once: false` rebuilds on every visit), `Router` (switches the active page/nav item and topbar, and activates that page's controller).
- `static/js/main.js` — data, repositories, page controller subclasses (one per page), and event delegation all live here for now; inline `onclick`/`onchange` attributes were replaced with `data-action`/`data-onchange` attributes handled via delegated listeners (required since `<script type="module">` doesn't expose top-level functions on `window`). If this file grows unwieldy, splitting the page controllers into `static/js/pages/*.js` is the natural next step — not done yet since the app doesn't need it at this size.

When adding new functionality, check with the user if the desired structure isn't obvious from the request.

## Environment

- Python >= 3.12, managed with `uv` (dependencies declared in `pyproject.toml`, venv in `.venv/`).

## Commands

- Run the app: `uv run python app.py` (serves on http://127.0.0.1:5000, debug mode on)
- Add a dependency: `uv add <package>`
- Run any command inside the project venv: `uv run <command>`

There are no lint, test, or build tooling configured yet — set these up (and document the commands here) when they're introduced.
