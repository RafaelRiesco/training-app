# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Flask app serving a single-page training dashboard (`templates/index.html`) via `app.py`. The dashboard's CSS/JS is currently all inline in that template; `static/css` and `static/js` exist but are empty, reserved for when that inline code gets extracted. There are no other routes, API endpoints, or tests yet. `README.md` is empty.

When adding new functionality, check with the user if the desired structure isn't obvious from the request.

## Environment

- Python >= 3.12, managed with `uv` (dependencies declared in `pyproject.toml`, venv in `.venv/`).

## Commands

- Run the app: `uv run python app.py` (serves on http://127.0.0.1:5000, debug mode on)
- Add a dependency: `uv add <package>`
- Run any command inside the project venv: `uv run <command>`

There are no lint, test, or build tooling configured yet — set these up (and document the commands here) when they're introduced.
