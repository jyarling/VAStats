# Electron ACARS Viewer

This project provides a minimal Electron application bundled with a React + Vite
front‑end. It serves as a starting point for displaying ACARS information from
Flight Simulator.

## Development

Install dependencies and start the development environment. Running `npm install`
in the project root also installs packages for the React front‑end located in the
`app` directory:

```bash
npm install
npm run dev
```

This command runs the React development server and launches Electron once the
app is available on <http://localhost:5173>.

The root `npm install` triggers a `postinstall` step that installs the React
dependencies in `app`. If you skip that step, run `npm install` inside
`app` manually.

## Building

Create a packaged build with:

```bash
npm run dist
```

The compiled files will be produced using `electron-builder`.


## Renderer API

The preload script exposes a small API under `window.electron`:

- `openExternal(url)` – open a URL in the system browser.
- `saveData(key, value)` – persist JSON data under the given key.
- `loadData(key)` – retrieve previously saved data.

Both `saveData` and `loadData` return promises.
