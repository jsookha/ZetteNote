// 
// NoteView.js - View a single note
// Stage 5 Updates:
// - Markdown rendering
// - Backlinks display
// - Wikilink support
//

import { getNote, deleteNote, listNotes } from "../storage/db.js";
import { renderMarkdown } from "../utils/markdown.js";

export async function NoteView(container, noteId) {

  if (!noteId) {
    container.innerHTML = "<p>Error: No note ID provided.</p>";
    return;
  }

  // ---------------------------
  // 1. Load note from IndexedDB
  // ---------------------------
  const note = await getNote(noteId);

  if (!note) {
    container.innerHTML = `
      <div class="note-view">
        <h2>Note Not Found</h2>
        <p>This note may have been deleted.</p>
        <button onclick="window.location.hash='#/notes'" class="button-secondary">
          Back to Notes
        </button>
      </div>
    `;
    return;
  }

  // ---------------------------
  // 2. Compute backlinks
  // ---------------------------
  const allNotes = await listNotes();
  const backlinks = allNotes.filter(n => 
    n.id !== noteId && n.content.includes(`[[${note.title}]]`)
  );

  // ---------------------------
  // 3. Format tags
  // ---------------------------
  const tagString = (note.tags && note.tags.length)
    ? note.tags.map(t => `<span class="tag">#${t}</span>`).join(" ")
    : "<em>No tags</em>";

  // ---------------------------
  // 4. Build viewer UI
  // ---------------------------
  container.innerHTML = `
    <div class="note-view">

      <h2>${note.title || "(Untitled Note)"}</h2>

      <div class="note-meta">
        <small>Created: ${new Date(note.createdAt).toLocaleString()}</small><br>
        <small>Updated: ${new Date(note.updatedAt).toLocaleString()}</small>
      </div>

      <div class="note-tags">
        ${tagString}
      </div>

      <div class="note-content">
        ${renderMarkdown(note.content)}
      </div>

      <div class="backlinks">
        <h3>Linked From</h3>
        ${backlinks.length === 0 
          ? "<p><em>No backlinks yet. This note hasn't been referenced by other notes.</em></p>"
          : `<ul class="backlinks-list">
              ${backlinks.map(b => `
                <li>
                  <a href="#/note/${b.id}" class="backlink-item">
                    ${b.title || "(Untitled)"}
                  </a>
                </li>
              `).join("")}
            </ul>`
        }
      </div>

      <div class="note-buttons">
        <button id="edit-note" class="button-primary">Edit</button>
        <button id="delete-note" class="button-danger">Delete</button>
        <button id="back-notes" class="button-secondary">Back</button>
      </div>

    </div>
  `;

  // ---------------------------
  // 5. Edit button
  // ---------------------------
  container.querySelector("#edit-note").addEventListener("click", () => {
    window.location.hash = `#/edit/${noteId}`;
  });

  // ---------------------------
  // 6. Back button
  // ---------------------------
  container.querySelector("#back-notes").addEventListener("click", () => {
    window.location.hash = "#/notes";
  });

  // ---------------------------
  // 7. Delete button
  // ---------------------------
  container.querySelector("#delete-note").addEventListener("click", async () => {
    const ok = confirm(`Are you sure you want to delete "${note.title || 'this note'}"?`);
    if (!ok) return;

    await deleteNote(noteId);
    window.location.hash = "#/notes";
  });
}