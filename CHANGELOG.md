# ZetteNote — Changelog

## [Stage 0] Project Concept & Planning
- **Idea**: Develop a student-focused, offline-capable note-taking PWA inspired by Zettelkasten methodology.
- **Target audience**: Tertiary-level IT/programming students.
- **Offline-first**: IndexedDB used for local storage; app functionality primarily available offline.
- **Cross-platform accessibility**: PWA approach for web, mobile, and tablet access; installable to homescreen.
- **Architecture decisions**:
  - Mobile-first design
  - Minimal dependencies, using native JavaScript
  - File structure outlined for SPA:

```
/root
- index.html
- manifest.json
- service-worker.js
- /src
-- app.js
--  ui/
-- data/
-- components/
-- storage/
```
- **Name**: Decided on **ZetteNote** — referencing Zettelkasten and notes.

---

## [Stage 1] Database & UI Planning
- **Database schema**:
  - IndexedDB object stores:
    - `notes`: { id (PK), title, content, tags, backlinks, created_at, updated_at }
    - `tags`: { id (PK), name }
    - `backlinks`: { id (PK), from_note_id, to_note_id }
  - Generic CRUD helper wrapper designed, zero dependencies.
- **UI wireframes**:
  - Note list
  - Note editor
  - Note view
  - Search view
  - Settings view
- **Routing strategy**:
  - Hash-based routing (#/notes, #/edit/:id, #/search, #/settings)
- **Service worker strategy**:
  - Offline caching plan for core assets and SPA shell.

---

## [Stage 2] Mobile-first Design & Initial Structure
- **Mobile-first design philosophy**
- **Routing system** clarified:
  - Router reads hash, renders appropriate view
- **UI placeholders** identified for each view
- **Database wrapper** finalised for IndexedDB CRUD
- **File templates created** for all modules

---

## [Stage 3] Initial Build
### Stage 3.1 — Project Shell
- Created `index.html` with:
  - Header and navigation menu
  - Root container (`<main id="app">`)
  - Module import (`app.js`)
  - Service worker registration
- Basic CSS file `styles/main.css`
- Manifest file `manifest.json` created
- Initial Git repository setup and successfully pushed to GitHub

### Stage 3.2 — IndexedDB Initialization
- Created `db.js` for IndexedDB management
- Designed **generic CRUD wrapper**
- Used `crypto.randomUUID()` for note IDs
- Implemented object stores (`notes`, `tags`, `backlinks`)
- CRUD helper functions: `getAll`, `get`, `put`, `delete`

### Stage 3.3 — Router & Placeholder Views
- Hash-based router implemented in `router.js`
- Views loaded dynamically into `#app`
- Placeholder UI modules created:
  - `NoteListView.js`, `NoteView.js`, `EditorView.js`, `SearchView.js`, `SettingsView.js`
- Default landing page renders `All Notes`

---

## [Stage 4] Core Features Development
### Stage 4.1 — Note List
- Displays all notes
- Supports click-to-view navigation
- Placeholder content implemented

### Stage 4.2 — Editor
- Create new notes
- Edit existing notes
- Markdown input field
- Save notes to IndexedDB

### Stage 4.3 — Note View
- Displays single note content
- Shows title and metadata
- Placeholder for future backlinks

### Stage 4.4 — Search
- Search notes by title/content
- Displays results dynamically in note list

### Stage 4.5 — Settings
- Placeholder for settings page
- Includes buttons for future features (export/import, theme toggle)

---

## [Stage 5] Note Linking & Advanced Features
### Stage 5.1 — Tags
- Add and manage tags for notes
- Store tags in IndexedDB `tags` object store

### Stage 5.2 — Backlinks
- Automatically track which notes link to others
- Store relationships in `backlinks` object store
- Display backlinks in note view

### Stage 5.3 — Auto-title Inject
- If new note created without a title, automatically assign a placeholder title
- Ensures all notes have unique identifiers

### Stage 5.4 — Search Enhancement
- Search indexes both titles and content
- Dynamic search results update as user types

### Stage 5.5 — Note Metadata
- Store `created_at` and `updated_at` timestamps
- Display metadata in note view

---

## [Stage 6] Offline & Data Portability
- **Service Worker**:
  - Caches core assets for offline-first functionality
- **Export Notes**:
  - Download all notes as JSON file
- **Import Notes**:
  - Upload JSON file to restore notes
  - Auto-generates IDs if missing
  - Alerts on invalid JSON
- Fully functional offline usage tested on desktop and mobile

---

## [Stage 7] UI/UX Polishing & Mobile-first Enhancements
- **Responsive design**:
  - Mobile-first layout, scaling for tablet and desktop
  - Navigation menu and note list adapt to screen size
- **Markdown preview in editor**:
  - Live rendering of basic Markdown: bold, italic, inline code
- **Dark/Light mode toggle**:
  - Switch between dark and light themes
  - CSS implemented with `.dark-mode` class
- **Improved note navigation**:
  - Clickable note items on small screens
  - Visual hover states for interactivity
- **Minor visual enhancements**:
  - Buttons styled with hover states
  - Inputs and textareas full width and rounded
  - Markdown preview pane styled for readability

---

# ✅ Notes
- Project remains lightweight with **zero external dependencies**.
- Fully offline-capable, mobile-friendly, PWA-ready.
- Export/import functionality ensures student data portability.
- Future enhancements planned: full Markdown rendering library, tag filtering, drag-and-drop sorting.

```

---

