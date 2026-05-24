# Malreddy Sree Cheritha — Portfolio

> *Exploring problems. Engineering solutions.*

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222222?style=flat-square&logo=github)](https://pages.github.com)

---

## Overview

Personal portfolio website for **Malreddy Sree Cheritha**, a third-year B.Tech Data Science student at Sphoorthy Engineering College (Class of 2027).

Built with zero frameworks, zero dependencies — pure HTML, CSS, and Vanilla JavaScript. Features two hand-crafted animated themes inspired by coastal environments, deployed via GitHub Pages.

**Live at:** `https://your-username.github.io/ocean-portfolio`

---

## Features

- **Two animated themes** — On Shore (light) and Deep Sea (dark), toggled with a floating button
- **On Shore** — warm caustic light shimmer, foam wave animation, drifting shell silhouettes, palm shadows
- **Deep Sea** — bioluminescent rising particles, glowing wave crest, twinkling stars, drifting fish, swaying kelp
- **Floating dot navigation** — scroll-spy dots on the right edge with tooltip labels
- **Theme persistence** — remembers last used theme via `localStorage`
- **Scroll-triggered animations** — sections fade in as you scroll
- **Fully responsive** — adapts cleanly to tablet and mobile
- **No build step** — open `index.html` and it works

---

## Project Structure

```
ocean-portfolio/
│
├── index.html              # Single-page application, all sections
│
├── css/
│   ├── base.css            # Reset, typography, shared components
│   ├── theme.css           # CSS variables for both themes + component theming
│   ├── nav.css             # Dot navigation + theme toggle button
│   ├── hero.css            # Hero section (merged into sections.css)
│   ├── sections.css        # All section layouts (hero, about, education, skills, projects, resume, contact)
│   └── animations.css      # Scroll fade-up keyframes
│
├── js/
│   ├── theme.js            # Theme toggle logic + localStorage
│   ├── canvas.js           # Canvas animation engine (On Shore + Deep Sea)
│   ├── nav.js              # Dot nav scroll-spy + IntersectionObserver fade-up
│   └── main.js             # General init, smooth scroll
│
└── assets/
    ├── resume.pdf          # Downloadable resume (add your file here)
    ├── images/
    │   └── profile.jpg     # Profile photo (add your photo here)
    └── icons/              # Optional SVG icons
```

---

## Getting Started

### Run locally

```bash
# Clone the repository
git clone https://github.com/your-username/ocean-portfolio.git

# Open in VS Code
cd ocean-portfolio
code .
```

Then open `index.html` with **Live Server** (VS Code extension by Ritwick Dey) — click **Go Live** in the bottom right. The site opens at `http://127.0.0.1:5500`.

Alternatively, double-click `index.html` to open directly in any browser.

---

## Deploying to GitHub Pages

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/your-username/ocean-portfolio.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under *Source* → **Deploy from a branch**
4. Branch: `main` · Folder: `/ (root)`
5. Click **Save**

Your site will be live at `https://your-username.github.io/ocean-portfolio` within 60 seconds.

### Step 3 — Push updates

```bash
git add .
git commit -m "describe your changes"
git push
```

GitHub Pages redeploys automatically within ~30 seconds.

---

## Personalisation

### Replace placeholder content in `index.html`

| Placeholder | Replace with |
|---|---|
| `YOUR_USERNAME` | Your GitHub username |
| `your@email.com` | Your email address |
| LinkedIn URL | Your LinkedIn profile URL |

### Add your profile photo

Drop your photo into `assets/images/profile.jpg`, then in `index.html` find the avatar div and replace:

```html
<!-- Before -->
<span class="hero__avatar-initials">MSC</span>

<!-- After -->
<img src="assets/images/profile.jpg" alt="Cheritha" />
```

### Add a new project

In `index.html`, find the projects grid and copy this block:

```html
<div class="project-card">
  <div class="project-card__header">
    <span class="project-card__number">03</span>
    <a class="project-card__link" href="YOUR_GITHUB_URL" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </a>
  </div>
  <h3 class="project-card__name">Project Name</h3>
  <p class="project-card__desc">Short description of what the project does and what makes it interesting.</p>
  <div class="project-card__tags">
    <span class="pill pill--sm">Python</span>
    <span class="pill pill--sm">ML</span>
  </div>
</div>
```

### Change theme colours

All colour tokens live in `css/theme.css` under `[data-theme="onshore"]` and `[data-theme="deepsea"]`. Change any value and it propagates across the entire site instantly.

---

## Tech Stack

| | |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 — custom properties, grid, flexbox, keyframe animations |
| Logic | Vanilla JavaScript (ES6+), Canvas API |
| Fonts | Google Fonts — Cormorant Garamond, DM Mono, Jost |
| Hosting | GitHub Pages |
| Dev tooling | VS Code + Live Server |

---

## Contact

**Malreddy Sree Cheritha**
B.Tech Data Science · Sphoorthy Engineering College · Class of 2027 · Hyderabad, India

Open to internships across tech, data, and beyond.
