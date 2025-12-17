//
// SettingsView.js - App settings and data management
// Import from db.js instead of idb-helpers.js
//

import { listNotes, createNote, clearAllNotes } from "../storage/db.js";

export function SettingsView(container) {

  container.innerHTML = `
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
      <h3>Data</h3>
      <button id="export-notes" class="button-primary">Export Notes</button>
      <button id="import-notes" class="button-secondary">Import Notes</button>
      <input type="file" id="import-file" accept=".json" style="display:none;">
    </section>

    <section class="settings-section">
      <h3>Reset App</h3>
      <button id="reset-app" class="button-danger">Clear all notes</button>
    </section>
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
    const ok = confirm("Are you sure you want to delete ALL notes?");
    if (!ok) return;

    await clearAllNotes();
    alert("All notes have been deleted.");
    window.location.hash = "#/notes";
  });
}