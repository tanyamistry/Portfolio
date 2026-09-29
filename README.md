# Tanya Mistry — a data playground

A responsive portfolio built with React, TypeScript, Vite, and React Three Fiber. The custom 3D workspace is built from geometry and a local canvas texture, so it doesn't depend on a remote model or texture service.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static hosting provider.

## Content and design

- `src/components/playground/`: the hero, interactive workspace, profile, project details, experience, and contact sections.
- `src/App.css`: responsive layouts and visual styling.
- `src/index.css`: design tokens, typography, and motion preferences.
- `public/Tanya_Mistry_Resume.pdf`: the supplied resume, linked from navigation and content.

The project previews are custom illustrations of the projects, not live dashboards. Project details and experience are based on the supplied resume. The 3D scene loads separately from the main page, pauses when offscreen or in a hidden tab, and falls back to a CSS illustration if WebGL is unavailable. The motion control and reduced-motion preference disable continuous animation. Google Fonts have system-font fallbacks.

Project dialogs support Escape, focus containment, and focus restoration. The skill tabs support arrow keys, Home, and End. Navigation, project links, email, and the resume remain available on mobile.
