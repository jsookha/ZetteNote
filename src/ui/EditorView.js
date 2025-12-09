import { get, put } from "../storage/idb-helpers.js";

export async function EditorView(container, noteId) {

  let note = null;

  // ---------------------------
  // 1. If editing, load note
  // ---------------------------
  if (noteId) {
    note = await get("notes", noteId);
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

    const now = new Date().toISOString();

    // Prepare note object
    const newNote = {
      id: note ? note.id : crypto.randomUUID(),
      title,
      content,
      tags,
      createdAt: note ? note.createdAt : now,
      updatedAt: now
    };

    // Save to IndexedDB
    await put("notes", newNote);

    // Redirect back to the note view or list
    window.location.hash = `#/note/${newNote.id}`;
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
