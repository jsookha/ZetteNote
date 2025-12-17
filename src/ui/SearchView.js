import { dbGetAll } from "../storage/idb-helpers.js";

export async function SearchView(container) {

  // Load all notes (fast for small/medium usage)
  const allNotes = await dbGetAll("notes");

  // Build UI
  container.innerHTML = `
    <h2>Search Notes</h2>

    <input 
      type="text" 
      id="search-input" 
      placeholder="Type to search..."
      class="search-box"
    />

    <div id="search-results"></div>
  `;

  const input = container.querySelector("#search-input");
  const resultsDiv = container.querySelector("#search-results");

  // Function to render results
  function renderResults(filtered) {
    if (!filtered.length) {
      resultsDiv.innerHTML = `<p>No matching notes.</p>`;
      return;
    }

    resultsDiv.innerHTML = filtered.map(note => `
      <div class="search-item" data-id="${note.id}">
        <h3>${note.title}</h3>
        <p class="snippet">${createSnippet(note.content)}</p>
        <div class="tags-small">
          ${(note.tags || []).map(t => `<span class="tag">${t}</span>`).join(" ")}
        </div>
      </div>
    `).join("");
  }

  // Helper for showing a short snippet
  function createSnippet(text) {
    if (!text) return "";
    const clean = text.replace(/\n+/g, " ");
    return clean.length > 80 ? clean.substring(0, 80) + "…" : clean;
  }

  // Live search
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();

    // Simple search: match title, content, or tags
    const filtered = allNotes.filter(note => {
      const titleMatch = note.title.toLowerCase().includes(q);
      const contentMatch = note.content.toLowerCase().includes(q);
      const tagMatch = (note.tags || []).some(t => t.toLowerCase().includes(q));

      return titleMatch || contentMatch || tagMatch;
    });

    renderResults(filtered);
  });

  // Click on result → open note
  resultsDiv.addEventListener("click", (evt) => {
    const item = evt.target.closest(".search-item");
    if (!item) return;
    const id = item.dataset.id;
    window.location.hash = `#/note/${id}`;
  });
}
