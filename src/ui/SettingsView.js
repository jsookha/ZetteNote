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
        <h3>Install App</h3>
        
        <div class="settings-info">
          <p>Install ZetteNote on your device for quick access and offline use.</p>
        </div>

        <button id="install-btn" class="button-primary" style="display: none;">
          Install ZetteNote
        </button>
        
        <div id="install-instructions" style="display: none;">
          <p><small>To install: Look for the install icon in your browser's address bar, or check your browser's menu for "Install" or "Add to Home Screen".</small></p>
        </div>
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

  themeRadios.forEach(r => {
    if (r.value === storedTheme) r.checked = true;
  });

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
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }

  // -------------------------------------------------------
  // 2. Install prompt handling
  // -------------------------------------------------------
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = container.querySelector('#install-btn');
    if (installBtn) {
      installBtn.style.display = 'block';
    }
  });

  const installBtn = container.querySelector('#install-btn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        const instructions = container.querySelector('#install-instructions');
        if (instructions) {
          instructions.style.display = 'block';
        }
        return;
      }
      
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      deferredPrompt = null;
      installBtn.style.display = 'none';
    });
  }

  // Check if already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    const installBtn = container.querySelector('#install-btn');
    if (installBtn) {
      installBtn.textContent = '✓ App Installed';
      installBtn.disabled = true;
      installBtn.style.display = 'block';
    }
  }

  // -------------------------------------------------------
  // 3. Export notes
  // -------------------------------------------------------
  container.querySelector("#export-notes").addEventListener("click", async () => {
    await exportNotes();
  });

  // -------------------------------------------------------
  // 4. Import notes
  // -------------------------------------------------------
  const importBtnElement = container.querySelector("#import-notes");
  const fileInput = container.querySelector("#import-file");

  importBtnElement.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", async (evt) => {
    const file = evt.target.files[0];
    if (file) {
      await importNotes(file, true);
    }
    fileInput.value = '';
  });

  // -------------------------------------------------------
  // 5. Reset app
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
}