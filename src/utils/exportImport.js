//
// ZetteNote - Export/Import Utility
// Handles backup and restore of notes
//

import { listNotes, createNote, updateNote } from "../storage/db.js";

/**
 * Export all notes to JSON file
 */
export async function exportNotes() {
  try {
    const notes = await listNotes();
    
    if (!notes || notes.length === 0) {
      alert("No notes to export!");
      return;
    }

    // Create export object with metadata
    const exportData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      noteCount: notes.length,
      notes: notes
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `zettenote-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();

    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Export failed:", error);
    alert("Export failed. Please try again.");
    return false;
  }
}

/**
 * Import notes from JSON file
 * @param {File} file - The JSON file to import
 * @param {boolean} mergeMode - If true, merge with existing notes. If false, replace all.
 */
export async function importNotes(file, mergeMode = true) {
  if (!file) return false;

  try {
    const text = await file.text();
    let importData;
    
    try {
      importData = JSON.parse(text);
    } catch (e) {
      alert("Invalid JSON file! Please select a valid ZetteNote backup file.");
      return false;
    }

    // Handle both old format (array) and new format (object with metadata)
    let notesToImport;
    if (Array.isArray(importData)) {
      notesToImport = importData;
    } else if (importData.notes && Array.isArray(importData.notes)) {
      notesToImport = importData.notes;
    } else {
      alert("Invalid backup file format!");
      return false;
    }

    if (notesToImport.length === 0) {
      alert("No notes found in the backup file.");
      return false;
    }

    // Confirm import
    const message = mergeMode 
      ? `Import ${notesToImport.length} notes? (Will merge with existing notes)`
      : `Import ${notesToImport.length} notes? (Will replace all existing notes)`;
    
    if (!confirm(message)) {
      return false;
    }

    // Import notes
    let importedCount = 0;
    for (let note of notesToImport) {
      // Ensure note has required fields
      if (!note.title && !note.content) continue;
      
      // Ensure valid ID
      if (!note.id) {
        note.id = crypto.randomUUID();
      }

      // Ensure timestamps
      if (!note.createdAt) {
        note.createdAt = Date.now();
      }
      if (!note.updatedAt) {
        note.updatedAt = Date.now();
      }

      // Ensure tags array
      if (!note.tags) {
        note.tags = [];
      }

      // Create new note (this will use createNote logic)
      await createNote({
        title: note.title || "Imported Note",
        content: note.content || "",
        tags: note.tags
      });
      
      importedCount++;
    }

    alert(`Successfully imported ${importedCount} notes!`);
    window.location.hash = "#/notes"; // Refresh view
    return true;

  } catch (error) {
    console.error("Import failed:", error);
    alert("Import failed. Please check the file and try again.");
    return false;
  }
}