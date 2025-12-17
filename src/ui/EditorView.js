//
// EditorView.js - Create or edit a note
// Import from db.js instead of idb-helpers.js
//

import { getNote, createNote, updateNote } from "../storage/db.js";

export async function EditorView(container, noteId) {

  let note = null;

  // ---------------------------
  // 1. If editing, load note
  // ---------------------------
  if (noteId) {
    note = await getNote(noteId);
  }

  // ---------------------------
  // 2. Build the UI
  // ---------------------------
  container.innerHTML = `
    <h2>${note ? "Edit Note" : "New Note"}</h2>

    <div class="editor-form">

      <label>Title</label>
      <input type="text" id="note-title" value="${note ? note.title : ""}" />

      <label>Content</label>
      <textarea id="note-content" rows="12">${note ? note.content : ""}</textarea>

      <label>Tags (comma-separated)</label>
      <input type="text" id="note-tags" 
             value="${note ? (note.tags || []).join(", ") : ""}" />

      <div class="editor-buttons">
        <button id="save-note" class="button-primary">Save</button>
        <button id="cancel-note" class="button-secondary">Cancel</button>
      </div>
    </div>
  `;

  // ---------------------------
  // 3. Wire up Save button
  // ----------------------------
  const saveBtn = container.querySelector("#save-note");
  saveBtn.addEventListener("click", async () => {
    const title = container.querySelector("#note-title").value.trim();
    const content = container.querySelector("#note-content").value.trim();
    const tagsText = container.querySelector("#note-tags").value.trim();

    const tags = tagsText.length ? tagsText.split(",").map(t => t.trim()) : [];

    let savedNote;

    if (note) {
      // Update existing note
      note.title = title;
      note.content = content;
      note.tags = tags;
      savedNote = await updateNote(note);
    } else {
      // Create new note
      savedNote = await createNote({ title, content, tags });
    }

    // Redirect to the note view
    window.location.hash = `#/note/${savedNote.id}`;
  });

  // ---------------------------
  // 4. Cancel button → go back
  // ----------------------------
  const cancelBtn = container.querySelector("#cancel-note");
  cancelBtn.addEventListener("click", () => {
    if (noteId) {
      window.location.hash = `#/note/${noteId}`;
    } else {
      window.location.hash = "#/notes";
    }
  });
}