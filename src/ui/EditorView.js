//
// EditorView.js - Create or edit a note
// Stage 5 Updates:
// - Automatic tag extraction from content
// - Support for prefilled titles from wikilinks
// - Query parameter handling
//

import { getNote, createNote, updateNote } from "../storage/db.js";
import { extractTags } from "../utils/tags.js";

export async function EditorView(container, noteId, query = {}) {

  let note = null;
  let isNew = false;

  // ---------------------------
  // 1. Determine if editing or creating
  // ---------------------------
  if (noteId && noteId !== "new") {
    // Editing existing note
    note = await getNote(noteId);
    if (!note) {
      container.innerHTML = `
        <div class="editor-form">
          <h2>Note Not Found</h2>
          <p>This note may have been deleted.</p>
          <button onclick="window.location.hash='#/notes'" class="button-secondary">
            Back to Notes
          </button>
        </div>
      `;
      return;
    }
  } else {
    // Creating new note (with optional prefill from query)
    isNew = true;
    note = {
      title: query.title || "",
      content: "",
      tags: []
    };
  }

  // ---------------------------
  // 2. Build the UI
  // ---------------------------
  container.innerHTML = `
    <div class="editor-view">
      <h2>${isNew ? "📝 New Note" : "✏️ Edit Note"}</h2>

      <div class="editor-form">

        <label for="note-title">Title</label>
        <input 
          type="text" 
          id="note-title" 
          placeholder="Enter note title..."
          value="${note.title || ""}" 
          autofocus
        />

        <label for="note-content">Content</label>
        <textarea 
          id="note-content" 
          rows="15" 
          placeholder="Write your note here... Use #tags and [[wikilinks]]"
        >${note.content || ""}</textarea>

        <div class="editor-info">
          <small>
            💡 Tip: Use <code>#tags</code> for categorization and <code>[[Note Title]]</code> for linking
          </small>
        </div>

        <div class="editor-buttons">
          <button id="save-note" class="button-primary">
            ${isNew ? "Create Note" : "Save Changes"}
          </button>
          <button id="cancel-note" class="button-secondary">Cancel</button>
        </div>
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

    // Validate
    if (!title) {
      alert("Please enter a title for your note.");
      return;
    }

    // Extract tags from content automatically
    const extractedTags = extractTags(content);

    let savedNote;

    if (isNew) {
      // Create new note
      savedNote = await createNote({ 
        title, 
        content, 
        tags: extractedTags 
      });
    } else {
      // Update existing note
      note.title = title;
      note.content = content;
      note.tags = extractedTags;
      savedNote = await updateNote(note);
    }

    // Redirect to the note view
    window.location.hash = `#/note/${savedNote.id}`;
  });

  // ---------------------------
  // 4. Cancel button → go back
  // ----------------------------
  const cancelBtn = container.querySelector("#cancel-note");
  cancelBtn.addEventListener("click", () => {
    if (noteId && noteId !== "new") {
      window.location.hash = `#/note/${noteId}`;
    } else {
      window.location.hash = "#/notes";
    }
  });

  // ---------------------------
  // 5. Auto-save indicator (optional enhancement)
  // ----------------------------
  let autoSaveTimeout;
  const contentTextarea = container.querySelector("#note-content");
  
  contentTextarea.addEventListener("input", () => {
    // Clear previous timeout
    clearTimeout(autoSaveTimeout);
    
    // Show "editing..." indicator (optional)
    // You can add this later for better UX
  });
}