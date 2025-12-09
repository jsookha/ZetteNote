//
// ZetteNote – Main App Initialisation
// ----------------------------------
// Called from index.html
//

import { initDatabase } from "./storage/db.js";
import { router } from "./router.js";

/**
 * Initialise the app
 */
async function initApp() {
  // 1. Initialise IndexedDB
  await initDatabase();

  // 2. Start router
  router();
}

// Run the app
initApp();
