//
// ZetteNote – IndexedDB Helper Functions
// --------------------------------------
// A tiny zero-dependency wrapper to make IndexedDB easier to use.
// Educational: shows the concepts clearly without hiding too much.
//

/**
 * Open (or create) an IndexedDB database.
 *
 * @param {string} name - Database name
 * @param {number} version - Version number
 * @param {function} upgradeCallback - Runs when DB needs to be created/upgraded
 * @returns {Promise<IDBDatabase>}
 */
export function openDB(name, version, upgradeCallback) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      upgradeCallback(db, event.oldVersion, event.newVersion);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Create a transaction and run an operation inside it.
 *
 * @param {IDBDatabase} db
 * @param {string} storeName
 * @param {"readonly"|"readwrite"} mode
 * @param {function} callback
 * @returns {Promise<any>}
 */
function withStore(db, storeName, mode, callback) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);

    const request = callback(store);

    // Handle the request result
    if (request && request.onsuccess !== undefined) {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } else {
      // For operations that don't return a request (like put without returning)
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }
  });
}

/**
 * Get a single record by key.
 */
export function dbGet(db, storeName, key) {
  return withStore(db, storeName, "readonly", (store) => {
    return store.get(key);
  });
}

/**
 * Write/update a record.
 */
export function dbSet(db, storeName, value) {
  return withStore(db, storeName, "readwrite", (store) => {
    return store.put(value);
  });
}

/**
 * Delete a record by key.
 */
export function dbDelete(db, storeName, key) {
  return withStore(db, storeName, "readwrite", (store) => {
    return store.delete(key);
  });
}

/**
 * Get all records in a store.
 */
export function dbGetAll(db, storeName) {
  return withStore(db, storeName, "readonly", (store) => {
    return store.getAll();
  });
}

/**
 * Query an index and return all results that match a value.
 */
export function dbGetAllByIndex(db, storeName, indexName, queryValue) {
  return withStore(db, storeName, "readonly", (store) => {
    const index = store.index(indexName);
    return index.getAll(queryValue);
  });
}