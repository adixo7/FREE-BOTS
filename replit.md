# Guild Glory - React App

## Overview
A React + Vite + TypeScript frontend application with a neon dark theme. It features a login screen and a guild bot launcher interface (Guild Glory).

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Icons**: lucide-react
- **Fonts**: Montserrat, JetBrains Mono (Google Fonts)
- **Animation**: motion

## Project Structure
```
/
├── index.html          # Entry HTML
├── src/
│   ├── main.tsx        # React entry point
│   ├── App.tsx         # Main app component (login + dashboard)
│   └── index.css       # Global styles + Tailwind
├── vite.config.ts      # Vite configuration
├── package.json
└── tsconfig.json
```

## Development
- Run: `npm run dev` (starts on 0.0.0.0:5000)
- Build: `npm run build`
- Lint: `npm run lint`

## Replit Configuration
- Frontend served on port 5000 with `allowedHosts: true` for proxy compatibility
- Deployment configured as static site (build: `npm run build`, publicDir: `dist`)
