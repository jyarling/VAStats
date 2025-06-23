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

## Persistence

User authentication and settings are saved using a small persistence API
exposed by the Electron preload script. When running in a browser, the
application falls back to `localStorage`.

## Renderer API

The preload script exposes an `electron` object on `window` with the
following methods:

```ts
window.electron.openExternal(url: string): Promise<void>
window.electron.loadState(): any
window.electron.saveState(data: any): void
```

`openExternal` opens a URL in the default browser, while `loadState` and
`saveState` read and write a JSON file in Electron's user data directory.

