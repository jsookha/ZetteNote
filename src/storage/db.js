//
// ZetteNote – Database Initialisation and CRUD Functions
// ------------------------------------------------------
// Uses a lightweight helper layer (idb-helpers.js) to keep code readable.
//
// Object Stores:
//   - notes
//   - tags
//   - settings
//

import {
  openDB,
  dbGet,
  dbSet,
  dbDelete,
  dbGetAll,
  dbGetAllByIndex
} from "./idb-helpers.js";

// GLOBAL DB INSTANCE
let db = null;

/**
 * Initialise the ZetteNote database.
 * Must be called before any other DB functions.
 */
export async function initDatabase() {
  db = await openDB("zettenote", 1, (db, oldVersion, newVersion) => {
    console.log("Upgrading database:", oldVersion, "→", newVersion);

    // --- NOTES STORE ---
    if (!db.objectStoreNames.contains("notes")) {
      const notes = db.createObjectStore("notes", {
        keyPath: "id"    // Uses crypto.randomUUID()
      });

      notes.createIndex("by_title", "title", { unique: false });
      notes.createIndex("by_updated", "updatedAt", { unique: false });
    }

    // --- TAGS STORE ---
    if (!db.objectStoreNames.contains("tags")) {
      db.createObjectStore("tags", {
        keyPath: "id"    // Tag name as primary key
      });
    }

    // --- SETTINGS STORE ---
    if (!db.objectStoreNames.contains("settings")) {
      db.createObjectStore("settings", {
        keyPath: "key"   // Setting name as primary key
      });
    }
  });
}

// ---------------------------------------------
// NOTE FUNCTIONS
// ---------------------------------------------

/**
 * Create a new note.
 */
export async function createNote({ title, content, tags = [] }) {
  const now = Date.now();

  const note = {
    id: crypto.randomUUID(),
    title,
    content,
    tags,
    backlinks: [],
    createdAt: now,
    updatedAt: now
  };

  await dbSet(db, "notes", note);
  return note;
}

/**
 * Update an existing note.
 */
export async function updateNote(note) {
  note.updatedAt = Date.now();
  await dbSet(db, "notes", note);
  return note;
}

/**
 * Retrieve one note.
 */
export function getNote(id) {
  return dbGet(db, "notes", id);
}

/**
 * Delete a note.
 */
export function deleteNote(id) {
  return dbDelete(db, "notes", id);
}

/**
 * List all notes (unordered).
 */
export function listNotes() {
  return dbGetAll(db, "notes");
}

/**
 * List notes sorted by "last updated".
 */
export function listNotesByUpdated() {
  return dbGetAllByIndex(db, "notes", "by_updated", IDBKeyRange.lowerBound(0));
}


// ---------------------------------------------
// TAG FUNCTIONS
// ---------------------------------------------

export async function addTag(tagName, colour = "#cccccc") {
  const tag = {
    id: tagName,
    colour,
    usage: 0
  };
  await dbSet(db, "tags", tag);
  return tag;
}

export function getTag(tagName) {
  return dbGet(db, "tags", tagName);
}

export function listTags() {
  return dbGetAll(db, "tags");
}

export function removeTag(tagName) {
  return dbDelete(db, "tags", tagName);
}

export async function incrementTagUsage(tagName) {
  const tag = await getTag(tagName);
  if (tag) {
    tag.usage++;
    await dbSet(db, "tags", tag);
  }
}

export async function decrementTagUsage(tagName) {
  const tag = await getTag(tagName);
  if (tag && tag.usage > 0) {
    tag.usage--;
    await dbSet(db, "tags", tag);
  }
}


// ---------------------------------------------
// SETTINGS FUNCTIONS
// ---------------------------------------------

export function getSetting(key) {
  return dbGet(db, "settings", key);
}

export function setSetting(key, value) {
  return dbSet(db, "settings", { key, value });
}
