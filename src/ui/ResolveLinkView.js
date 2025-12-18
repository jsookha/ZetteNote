//
// ZetteNote - Resolve Wikilink View
// Handles [[Note Title]] resolution
// If found: redirect to note
// If not found: offer to create
//

import { listNotes } from "../storage/db.js";

export async function resolveLinkView(container, encodedTitle) {
  if (!encodedTitle) {
    container.innerHTML = `
      <h2>Error</h2>
      <p>No note title provided.</p>
      <button onclick="window.location.hash='#/notes'" class="button-secondary">
        Back to Notes
      </button>
    `;
    return;
  }

  const title = decodeURIComponent(encodedTitle);

  // Show loading state
  container.innerHTML = `
    <div class="loading-screen">
      <p>Looking for note: <strong>${title}</strong>...</p>
    </div>
  `;

  // Look for a note by title (case-insensitive)
  const notes = await listNotes();
  const match = notes.find(
    n => n.title.toLowerCase() === title.toLowerCase()
  );

  if (match) {
    // Redirect to actual note
    window.location.hash = `#/note/${match.id}`;
    return;
  }

  // No match → show a "missing note" placeholder
  container.innerHTML = `
    <div class="missing-note-view">
      <h2>📝 Note Not Found</h2>
      <p>No note titled <strong>"${title}"</strong> exists yet.</p>
      <p>Would you like to create it?</p>

      <div class="note-buttons">
        <button id="create-note-btn" class="button-primary">
          Create "${title}"
        </button>
        <button onclick="window.location.hash='#/notes'" class="button-secondary">
          Back to Notes
        </button>
      </div>
    </div>
  `;

  // Handle creation
  container.querySelector("#create-note-btn").addEventListener("click", () => {
    window.location.hash = `#/edit/new?title=${encodedTitle}`;
  });
}