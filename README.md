# ZetteNote

ZetteNote is a mobile-first, offline-capable, Zettelkasten-inspired study notebook designed for tertiary-level IT and programming students. Built as a Progressive Web App (PWA) using HTML, CSS, and native JavaScript, it allows students to take, organise, search, and link notes efficiently — even when offline.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Motivation](#motivation)  
3. [Key Features](#key-features)  
4. [Architecture & File Structure](#architecture--file-structure)  
5. [Stages of Development](#stages-of-development)  
6. [Installation & Usage](#installation--usage)  
7. [Offline & PWA Capabilities](#offline--pwa-capabilities)  
8. [Future Enhancements](#future-enhancements)  
9. [Contributing](#contributing)  
10. [License](#license)

---

## Project Overview

ZetteNote is inspired by the **Zettelkasten method**, which encourages linking small, atomic notes to form a structured knowledge network. This PWA is designed for students to:

* Take notes quickly and efficiently on mobile devices
* Work offline with local storage using **IndexedDB**
* Link notes and manage tags to explore relationships between topics
* Search notes instantly by title, content, or tags
* Export/import notes to/from JSON for portability

---

## Motivation

Many students struggle with organising notes for programming and IT subjects. ZetteNote:

* Provides a lightweight, offline-first tool for learning
* Encourages structured knowledge building via backlinks and tags
* Offers a mobile-friendly, installable PWA experience
* Focuses on educational value with native JavaScript implementation

---

## Key Features

* **Offline-first storage** with IndexedDB
* **Zettelkasten-style linking** with backlinks and tags
* **Markdown support** with live preview
* **Search functionality** for quick note retrieval
* **Export & import** notes via JSON
* **Mobile-first responsive UI**
* **Dark/light mode toggle**
* **PWA-ready** for homescreen installation

---

## Architecture & File Structure

```
ZetteNote/
├─ index.html           # Main HTML shell
├─ manifest.json        # PWA manifest
├─ service-worker.js    # Offline caching
├─ styles/
│   └─ main.css         # Core CSS styles
└─ src/
    ├─ app.js           # App initialisation
    ├─ router.js        # Hash-based SPA router
    ├─ storage/
    │   └─ db.js        # IndexedDB wrapper
    ├─ ui/
    │   ├─ NoteListView.js
    │   ├─ NoteView.js
    │   ├─ EditorView.js
    │   ├─ SearchView.js
    │   └─ SettingsView.js
    ├─ components/      # Optional reusable UI components
    └─ data/            # Placeholder for JSON import/export
```

**Notes:**

* `app.js` initializes the database and router
* `router.js` dynamically loads views based on URL hash
* `storage/db.js` provides generic CRUD operations for IndexedDB
* `ui/` folder contains all views

---

## Stages of Development

**Stage 0 — Concept & Planning**

* Decided on a PWA for offline use
* Mobile-first design philosophy
* Zettelkasten-inspired note system
* Targeted tertiary IT/programming students

**Stage 1 — Database & UI Planning**

* IndexedDB schema: `notes`, `tags`, `backlinks`
* Wireframes for note list, editor, search, settings
* Routing strategy planned
* Service worker caching strategy outlined

**Stage 2 — Mobile-first Design & Initial Structure**

* Responsive design planning
* Placeholder UI modules
* Routing and initial database wrapper

**Stage 3 — Initial Build**

* Shell: `index.html`, manifest, basic CSS
* IndexedDB CRUD wrapper implemented (`db.js`)
* Router implemented (`router.js`)
* Placeholder views in `ui/`

**Stage 4 — Core Features**

* Note List: view all notes
* Editor: create/edit notes
* Note View: display single note content
* Search: filter notes
* Settings: placeholder for future settings

**Stage 5 — Advanced Features**

* Tags: add/manage tags
* Backlinks: automatically track note references
* Auto-title generation for untitled notes
* Enhanced search indexing
* Note metadata (created_at, updated_at)

**Stage 6 — Offline & Data Portability**

* Service worker caching for offline use
* Export notes as JSON
* Import notes from JSON, handling missing IDs
* Fully functional offline usage tested

**Stage 7 — UI/UX Enhancements**

* Mobile-first responsive design
* Live Markdown preview in editor
* Dark/light mode toggle
* Improved note navigation
* Minor visual polish: buttons, hover states, input styling

---

## Installation & Usage

**Clone the repository:**

```
git clone https://github.com/jsookha/ZetteNote.git
cd ZetteNote
```

**Run locally (simple file server):**

For Python 3.x:

```
python -m http.server 8000
```

Open your browser at `http://localhost:8000`

> Or simply open `index.html` in a browser (offline functionality may be limited without a server).

**PWA Installation**

1. Visit the site in a modern browser (Chrome, Edge, or Firefox).
2. Use the **"Install" prompt** or **Add to Homescreen** option.
3. The app will be available offline and on mobile like a native app.

---

## Offline & PWA Capabilities

* All assets and pages cached via `service-worker.js`
* Core notes stored in IndexedDB for offline access
* Export/import JSON ensures portability and backup
* Works on mobile, tablet, and desktop

---

## Future Enhancements

* Full-featured Markdown library (`marked.js`) for advanced rendering
* Drag-and-drop note organisation
* Tag filtering and note sorting
* Persistent dark/light theme preference
* Collaborative features (sync across devices)

---

## Contributing

* Fork the repository
* Create a new branch: `git checkout -b feature-name`
* Commit changes: `git commit -m "Add feature"`
* Push: `git push origin feature-name`
* Submit a pull request

> Contributions to improve functionality, UI/UX, and documentation are welcome.

---

## License

This project is licensed under the **GNU Affero General Public License (AGPL)** — see `LICENSE` file for details.

---

## Acknowledgements

* Inspired by the **Zettelkasten method**
* Built with **native JavaScript, HTML, CSS**
* Educational purpose for **IT/programming students**

---
