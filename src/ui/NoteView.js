import { get, remove } from "../storage/idb-helpers.js";

export async function NoteView(container, noteId) {

  if (!noteId) {
    container.innerHTML = "<p>Error: No note ID provided.</p>";
    return;
  }

  // ---------------------------
  // 1. Load note from IndexedDB
  // ---------------------------
  const note = await get("notes", noteId);

  if (!note) {
    container.innerHTML = "<p>Note not found.</p>";
    return;
  }

  // ---------------------------
  // 2. Format tags
  // ---------------------------
  const tagString = (note.tags && note.tags.length)
    ? note.tags.map(t => `<span class="tag">${t}</span>`).join(" ")
    : "<em>No tags</em>";

  // ---------------------------
  // 3. Build viewer UI
  // ---------------------------
  container.innerHTML = `
    <div class="note-view">

      <h2>${note.title}</h2>

      <div class="note-meta">
        <small>Created: ${new Date(note.createdAt).toLocaleString()}</small><br>
        <small>Updated: ${new Date(note.updatedAt).toLocaleString()}</small>
      </div>

      <div class="note-tags">
        ${tagString}
      </div>

      <div class="note-content">
        <p>${note.content.replace(/\n/g, "<br>")}</p>
      </div>

      <div class="note-buttons">
        <button id="edit-note" class="button-primary">Edit</button>
        <button id="delete-note" class="button-danger">Delete</button>
        <button id="back-notes" class="button-secondary">Back</button>
      </div>

    </div>
  `;

  // ---------------------------
  // 4. Edit button
  // ---------------------------
  container.querySelector("#edit-note").addEventListener("click", () => {
    window.location.hash = `#/edit/${noteId}`;
  });

  // ---------------------------
  // 5. Back button
  // ---------------------------
  container.querySelector("#back-notes").addEventListener("click", () => {
    window.location.hash = "#/notes";
  });

  // ---------------------------
  // 6. Delete button
  // ---------------------------
  container.querySelector("#delete-note").addEventListener("click", async () => {
    const ok = confirm("Are you sure you want to delete this note?");
    if (!ok) return;

    await remove("notes", noteId);
    window.location.hash = "#/notes";
  });
}
