//
// SettingsView.js - App settings and data management
//

import { listNotes, createNote, clearAllNotes } from "../storage/db.js";
import { exportNotes, importNotes } from "../utils/exportImport.js";

export function SettingsView(container) {

  container.innerHTML = `
    <div class="settings-view">
      <h2>Settings</h2>

      <section class="settings-section">
        <h3>Appearance</h3>

        <label>
          <input type="radio" name="theme" value="system">
          Follow system theme
        </label>

        <label>
          <input type="radio" name="theme" value="light">
          Light theme
        </label>

        <label>
          <input type="radio" name="theme" value="dark">
          Dark theme
        </label>
      </section>

      <section class="settings-section">
        <h3>Data Management</h3>
        
        <div class="settings-info">
          <p>Export your notes to create a backup, or import notes from a previous backup.</p>
        </div>

        <div class="settings-buttons">
          <button id="export-notes" class="button-primary">
            Export Notes (Backup)
          </button>
          
          <input type="file" id="import-file" accept=".json" style="display:none;">
          <button id="import-notes" class="button-secondary">
            Import Notes (Restore)
          </button>
        </div>
      </section>

      <section class="settings-section">
        <h3>Danger Zone</h3>
        
        <div class="settings-warning">
          <p>⚠️ This action cannot be undone. Please export your notes first!</p>
        </div>
        
        <button id="reset-app" class="button-danger">Clear All Notes</button>
      </section>
    </div>
  `;

  // -------------------------------------------------------
  // 1. Theme settings
  // -------------------------------------------------------

  const themeRadios = container.querySelectorAll("input[name='theme']");
  const storedTheme = localStorage.getItem("theme") || "system";

  // Pre-select saved theme
  themeRadios.forEach(r => {
    if (r.value === storedTheme) r.checked = true;
  });

  // Apply theme immediately
  applyTheme(storedTheme);

  themeRadios.forEach(radio => {
    radio.addEventListener("change", evt => {
      const selected = evt.target.value;
      localStorage.setItem("theme", selected);
      applyTheme(selected);
    });
  });

  function applyTheme(mode) {
    if (mode === "light") {
      document.documentElement.classList.remove("dark");
    } else if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      // system theme - note: CSS uses 'prefers-color-scheme' not 'prefers-colour-scheme'
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }

  // -------------------------------------------------------
  // 2. Export notes
  // -------------------------------------------------------
  container.querySelector("#export-notes").addEventListener("click", async () => {
    const notes = await listNotes();
    const json = JSON.stringify(notes, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "zetteNotes-export.json";
    a.click();

    URL.revokeObjectURL(url);

    // ** new code added **
    const success = await exportNotes();
    if (success) {
      // Visual feedback could be added here
    }
    // ** end of new code added ** 
  });

  // -------------------------------------------------------
  // 3. Import notes
  // -------------------------------------------------------
  const importBtn = container.querySelector("#import-notes");
  const fileInput = container.querySelector("#import-file");

  importBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", async (evt) => {
    const file = evt.target.files[0];
    if (!file) return;

    try {
      // ** new code added **
      if (file) {
        await importNotes(file, true); // true = merge mode
      }
      // Reset file input
      fileInput.value = '';
      // ** end of new code added ** 

      const text = await file.text();
      const importedNotes = JSON.parse(text);

      if (!Array.isArray(importedNotes)) {
        alert("Invalid file format.");
        return;
      }

      // Save imported notes
      for (const n of importedNotes) {
        // Ensure the note has all required fields
        const noteData = {
          title: n.title || "Untitled",
          content: n.content || "",
          tags: n.tags || []
        };
        
        // If the note has an id, we could check if it exists and update,
        // but for simplicity, we'll create new notes with new IDs
        await createNote(noteData);
      }

      alert("Notes imported successfully!");
      window.location.hash = "#/notes";

    } catch (err) {
      console.error(err);
      alert("Failed to import notes.");
    }
  });

  // -------------------------------------------------------
  // 4. Reset app
  // -------------------------------------------------------
  container.querySelector("#reset-app").addEventListener("click", async () => {
    const ok = confirm("⚠️ Are you ABSOLUTELY sure you want to delete ALL notes? This cannot be undone!\n\nConsider exporting your notes first.");
    if (!ok) return;

    const doubleCheck = confirm("Last chance! Delete everything?");
    if (!doubleCheck) return;

    await clearAllNotes();
    alert("All notes have been deleted.");
    window.location.hash = "#/notes";
  });
  
  // ** original code **
  /*
  container.querySelector("#reset-app").addEventListener("click", async () => {
    const ok = confirm("Are you sure you want to delete ALL notes?");
    if (!ok) return;

    await clearAllNotes();
    alert("All notes have been deleted.");
    window.location.hash = "#/notes";
  });
  */
  // ** end of original code **
}