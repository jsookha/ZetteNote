# ZetteNote — Changelog

All notable changes to the ZetteNote project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows semantic versioning principles.

---

## [Unreleased]

### Future Enhancements Under Consideration
- Graph visualization of note connections using p5.js
- Timeline view of notes by creation/modification date
- Color-coding system based on tags or subjects
- Subject connection mapping for interdisciplinary knowledge
- Advanced SVG icon set (custom-designed)

---

## [0.5.0] - 2025-12-19

### Added
- **PWA Install Instructions**: Added installation guidance in Settings view
  - Automatic detection of install capability
  - Manual fallback instructions for different browsers
  - Visual indicator when app is already installed

### Changed
- **SettingsView Refactored**: Removed duplicate export/import logic
  - Export and import now properly use utility functions from `exportImport.js`
  - Fixed bug causing duplicate note imports
  - Improved error handling and user feedback

### Fixed
- Duplicate note creation during import process
- Export/import code duplication in Settings view

---

## [0.4.0] - 2025-12-18

### Added - Stage 6: Offline Capabilities & Data Portability

#### Service Worker Enhancements
- Enhanced offline-first caching strategy
- Caches all core app assets for offline use
- Network fallback with graceful degradation
- Automatic cache versioning and cleanup

#### Export Functionality
- Export all notes as timestamped JSON backup file
- Export includes metadata (version, export date, note count)
- Error handling for empty note collections

#### Import Functionality  
- Import notes from JSON backup files
- Merge mode: preserves existing notes while importing
- Automatic ID generation for imported notes without IDs
- Validation for file format and structure
- User confirmation before import
- Comprehensive error messages for invalid files

#### New Files
- `src/utils/exportImport.js` - Centralized export/import logic

### Changed
- Updated `service-worker.js` with comprehensive asset caching
- Modified `SettingsView.js` to use new export/import utilities
- Enhanced Settings UI with better visual hierarchy
- Improved danger zone warnings for destructive actions

### Technical Notes
- App fully functional offline after initial load
- Notes stored in IndexedDB persist across sessions
- Service worker caches update automatically on new versions

---

## [0.3.0] - 2025-12-18

### Added - Stage 5: Zettelkasten Features & Advanced Functionality

#### Stage 5.1: Markdown Rendering
- Custom markdown parser (`src/utils/markdown.js`)
- Support for headings (H1, H2, H3)
- Bold (`**text**`) and italic (`*text*`) formatting
- Inline code (`` `code` ``) with custom styling
- Code blocks (` ```code``` `) with dark theme
- Bullet lists with proper formatting
- HTML escaping for XSS prevention

#### Stage 5.2: Wikilinks & Backlinks
- Wikilink syntax (`[[Note Title]]`) for note linking
- Automatic clickable link generation
- Bidirectional backlink computation
- "Linked From" section in note view showing all backlinks
- Link resolver for missing notes

#### Stage 5.3: Missing Note Creation
- Automatic detection of non-existent linked notes
- One-click note creation from wikilinks
- Pre-filled title when creating from wikilink
- Visual distinction for missing links
- Query parameter support in router for title prefilling

#### Stage 5.4: Tag System & Filtering
- Automatic hashtag extraction from note content (`#tag`)
- Tag cloud display in note list view
- Click-to-filter by tag
- Tag persistence in IndexedDB
- Visual active state for selected tags

#### Stage 5.5: Enhanced Search & Sorting
- Real-time search across titles, content, and tags
- Search term highlighting in results
- Multiple sort options:
  - Last Updated (default)
  - Title A–Z
  - Title Z–A
- Orphan note detection (notes with no backlinks)
- "Unlinked Notes Only" filter
- Results counter with context

#### New Files
- `src/utils/markdown.js` - Markdown parser
- `src/utils/tags.js` - Tag extraction utility
- `src/ui/ResolveLinkView.js` - Wikilink resolver

### Changed
- **Router**: Added query parameter parsing for prefilled forms
- **NoteView**: Integrated markdown rendering and backlink display
- **EditorView**: Automatic tag extraction on save, query parameter support
- **NoteListView**: Complete redesign with search, sort, and filter capabilities
- **CSS**: Extensive additions for markdown rendering, wikilinks, backlinks, search UI

### Technical Architecture
- Proper separation of concerns: `idb-helpers.js` → `db.js` → UI views
- All UI views import from `db.js` (never directly from `idb-helpers.js`)
- Custom markdown parser (educational, no dependencies)
- Tag extraction excludes code blocks to prevent false positives

---

## [0.2.0] - 2025-12-17

### Added
- **Icon Set**: Custom icon collection added to `icons/` directory
- Icons properly referenced in `manifest.json`
- Icon sizes: 192x192 and 512x512 for PWA compliance

### Fixed
- **Critical Bug**: Corrected import statements across all UI view files
- Fixed `idb-helpers.js` promise resolution causing `notes.sort is not a function` error
- Updated all views to properly import from `db.js` instead of `idb-helpers.js`

### Changed
- **Design System Overhaul**:
  - Implemented Nordic color palette (Lighthouse, Homeopathic Lavender, Lavender Pillow, Orchid Hue, Kiss a Frog, Nordic Noir)
  - Changed font stack: Inter for UI, Fira Mono for code/notes
  - Mobile-first responsive design with desktop breakpoints
  - Bottom navigation for mobile, top navigation for desktop
  - CSS custom properties for consistent theming

### Technical Notes
- Fixed `withStore` function in `idb-helpers.js` to properly handle IDBRequest objects
- Resolved architectural confusion between helper layer and application layer

---

## [0.1.0] - 2025-12-12

### Fixed
- Major refactoring to address code reference issues
- Database helper functions properly exported
- Module import paths corrected

---

## [0.0.4] - 2025-12-09 to 2025-12-11

### Added - Stage 4: Core Feature Development

#### Note List (Stage 4.1)
- Display all notes in reverse chronological order
- Card-based layout with preview snippets
- Click-to-view navigation
- Metadata display (tags, last updated)
- Empty state for new users

#### Note Editor (Stage 4.2)
- Create new notes with title and content
- Edit existing notes
- Tag input (comma-separated)
- Auto-save functionality
- Cancel with confirmation

#### Note Viewer (Stage 4.3)
- Single note display with full content
- Metadata section (created, updated timestamps)
- Tag display
- Edit and delete actions
- Back navigation

#### Search View (Stage 4.4)
- Real-time search as user types
- Search across titles and content
- Result snippets with context
- Click to open note

#### Settings View (Stage 4.5)
- Theme toggle (Light/Dark/System)
- Export notes placeholder
- Import notes placeholder
- Clear all notes with confirmation

---

## [0.0.3] - 2025-12-09

### Added - Stage 3: Initial Build

#### Project Shell (Stage 3.1)
- Created `index.html` with semantic HTML structure
- Header with navigation menu
- Main content container (`#app`)
- Module script imports
- Service worker registration
- Created `styles/main.css` with basic reset and layout
- Created `manifest.json` for PWA configuration
- Initialized Git repository
- First commit and push to GitHub

#### IndexedDB Setup (Stage 3.2)
- Created `src/storage/db.js` with database initialization
- Implemented three object stores:
  - `notes`: Primary note storage
  - `tags`: Tag management
  - `settings`: App configuration
- Generic CRUD wrapper functions:
  - `dbGet`, `dbSet`, `dbDelete`, `dbGetAll`, `dbGetAllByIndex`
- Created `src/storage/idb-helpers.js` as low-level IndexedDB wrapper
- UUID-based note IDs using `crypto.randomUUID()`

#### Router & Views (Stage 3.3)
- Created `src/router.js` with hash-based routing
- Dynamic view loading system
- Created placeholder UI modules:
  - `src/ui/NoteListView.js`
  - `src/ui/NoteView.js`
  - `src/ui/EditorView.js`
  - `src/ui/SearchView.js`
  - `src/ui/SettingsView.js`
- Default route lands on "All Notes" view

---

## [0.0.2] - 2025-12-09

### Added - Stage 2: Mobile-First Design & Structure

#### Architecture Decisions
- Confirmed mobile-first design philosophy
- Defined hash-based routing strategy (#/notes, #/edit/:id, etc.)
- Planned view rendering system
- Outlined database wrapper architecture

#### File Structure Planning
- Organized module structure:
  - `/src/storage/` for database layer
  - `/src/ui/` for view components
  - `/src/utils/` for utilities (planned)
- Created placeholder files for all modules

---

## [0.0.1] - 2025-12-07 to 2025-12-08

### Added - Stage 0 & 1: Concept & Planning

#### Project Concept (Stage 0)
- Defined target audience: Tertiary IT/programming students
- Chose Zettelkasten methodology as inspiration
- Decided on Progressive Web App approach
- Offline-first architecture using IndexedDB
- Zero external dependencies philosophy
- Named the project: **ZetteNote**

#### Database & UI Planning (Stage 1)
- Designed IndexedDB schema:
  - Notes: id, title, content, tags, backlinks, timestamps
  - Tags: id, name, usage count
  - Settings: key-value pairs
- Created UI wireframes for five main views
- Planned service worker caching strategy
- Documented CRUD operations

#### Key Design Decisions
- Mobile-first, responsive design
- Single Page Application (SPA) architecture
- Hash-based routing (no server required)
- Educational focus: custom implementations over libraries
- Cross-platform: web, mobile, tablet support

---

## Project Metadata

**Repository**: https://github.com/jsookha/ZetteNote  
**Live Demo**: https://jsookha.github.io/ZetteNote/  
**License**: AGPL-3.0  
**Built With**: Vanilla JavaScript, IndexedDB, CSS3, HTML5  
**Dependencies**: None (by design)

---

## Development Philosophy

ZetteNote is built with an educational-first approach:
- **Custom implementations** over external libraries
- **Clear, documented code** for learning
- **Progressive enhancement** from core to advanced features
- **Mobile-first** design thinking
- **Offline-first** architecture
- **Privacy-focused**: all data stored locally

---

## Acknowledgements

Inspired by the Zettelkasten method and tools like Obsidian, Roam Research, and Logseq, but built from scratch for educational purposes and student-focused use cases.