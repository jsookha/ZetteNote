//
// ZetteNote – Router (hash-based)
// -------------------------------
// Maps hash URLs to view rendering functions.
// Stage 5 Update: Added query parameter support
//

import { NoteListView } from "./ui/NoteListView.js";
import { NoteView } from "./ui/NoteView.js";
import { EditorView } from "./ui/EditorView.js";
import { SearchView } from "./ui/SearchView.js";
import { SettingsView } from "./ui/SettingsView.js";
import { resolveLinkView } from "./ui/ResolveLinkView.js";

const routes = {
  "#/": NoteListView,           // default list view by visiting index.html
  "#/notes": NoteListView,
  "#/note": NoteView,           // expects ID param: #/note/123
  "#/edit": EditorView,         // expects ID param: #/edit/123 or #/edit/new
  "#/search": SearchView,
  "#/settings": SettingsView,
  "#/link": resolveLinkView     // NEW: wikilink resolver: #/link/Note%20Title
};

/**
 * Parse the current hash, extract route, param, and query parameters.
 * Examples:
 *   #/notes → { base: "#/notes", param: null, query: {} }
 *   #/note/123 → { base: "#/note", param: "123", query: {} }
 *   #/edit/new?title=Test → { base: "#/edit", param: "new", query: { title: "Test" } }
 */
function parseHash() {
  const hash = window.location.hash || "#/";

  // Split hash and query string
  const [path, queryString] = hash.split("?");
  const parts = path.split("/"); // e.g. ["#", "edit", "new"]

  // Parse query parameters
  const query = {};
  if (queryString) {
    queryString.split("&").forEach(pair => {
      const [key, value] = pair.split("=");
      if (key && value) {
        query[key] = decodeURIComponent(value);
      }
    });
  }

  return {
    base: `#/${parts[1] || ""}`,
    param: parts[2] || null,
    query
  };
}

/**
 * Render the appropriate view inside #app
 */
export function router() {
  const { base, param, query } = parseHash();
  const appDiv = document.getElementById("app");

  // Clear previous content
  appDiv.innerHTML = "";

  // Find view function
  const viewFunc = routes[base];
  
  if (viewFunc) {
    // Call view function with param and query
    viewFunc(appDiv, param, query);
  } else {
    // 404 page
    appDiv.innerHTML = `
      <div class="error-view">
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <button onclick="window.location.hash='#/notes'" class="button-primary">
          Go to Notes
        </button>
      </div>
    `;
  }
}

// Listen to hash changes
window.addEventListener("hashchange", router);
window.addEventListener("load", router); // render initial view