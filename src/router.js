//
// ZetteNote – Router (hash-based)
// -------------------------------
// Maps hash URLs to view rendering functions.
//

import { NoteListView } from "./ui/NoteListView.js";
import { NoteView } from "./ui/NoteView.js";
import { EditorView } from "./ui/EditorView.js";
import { SearchView } from "./ui/SearchView.js";
import { SettingsView } from "./ui/SettingsView.js";

const routes = {
  "#/": NoteListView,       // default list view by visiting index.html
  "#/notes": NoteListView,
  "#/note": NoteView,       // expects ID param: #/note/123
  "#/edit": EditorView,     // expects ID param: #/edit/123
  "#/search": SearchView,
  "#/settings": SettingsView
};

/**
 * Parse the current hash, extract route and optional param.
 */
function parseHash() {
  const hash = window.location.hash || "#/";
  const parts = hash.split("/"); // e.g. "#/edit/123" → ["#", "edit", "123"]
  return {
    base: `#/${parts[1] || ""}`,
    param: parts[2] || null
  };
}

/**
 * Render the appropriate view inside #app
 */
export function router() {
  const { base, param } = parseHash();
  const appDiv = document.getElementById("app");

  // Clear previous content
  appDiv.innerHTML = "";

  // Find view
  const viewFunc = routes[base];
  if (viewFunc) {
    viewFunc(appDiv, param);
  } else {
    appDiv.innerHTML = "<h2>404 - Page not found</h2>";
  }
}

// Listen to hash changes
window.addEventListener("hashchange", router);
window.addEventListener("load", router); // render initial view
