# Mmesoma Victory Nwachukwu — Portfolio

Personal portfolio website for **Mmesoma Victory Nwachukwu** — Data Scientist, AI Expert & Writer.

## Project Structure

```
portfolio/
├── src/
│   ├── assets/
│   │   └── photo.jpg        ← Professional headshot
│   ├── styles.css           ← All CSS (theme variables, layout, animations)
│   └── main.js              ← All JavaScript (theme, typewriter, scroll reveal, filter)
├── index.html               ← Main HTML (all sections)
├── package.json             ← Project config & scripts
├── vite.config.js           ← Vite bundler config
├── vercel.json              ← Vercel deployment config
└── .gitignore               ← Files to exclude from Git
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
Output goes to the `dist/` folder.

### 4. Preview production build
```bash
npm run preview
```

## Deploying to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects the config — click **Deploy**
5. Your site is live!

## Deploying to Netlify

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist/` folder into the deploy area
4. Done!

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks needed
- **Vite** — Fast dev server & build tool

## Sections

1. Hero — Name, animated role typewriter, photo
2. About — Bio, stats, code card
3. Tech Stack — Skills by category
4. Experience — Vertical timeline
5. Projects — Filterable project cards
6. Blog — Medium articles
7. Certifications — Education & credentials
8. Services — What I offer
9. Contact — Form + social links
