//
// NoteListView.js - List all notes with advanced features
// Stage 5 Updates:
// - Real-time search
// - Sorting options
// - Tag filtering
// - Orphan note detection
// - Search highlighting
//

import { listNotes } from "../storage/db.js";

export async function NoteListView(container) {

  // Fetch all notes
  let notes = await listNotes();

  // Gather all unique tags
  const allTags = [...new Set(notes.flatMap(n => n.tags || []))].sort();

  // State management
  let sortBy = "updated";
  let filterTag = null;
  let showOrphans = false;
  let searchTerm = "";

  // Highlight helper function
  function highlight(text, term) {
    if (!term || !text) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Main render function
  function renderList() {
    let filtered = [...notes];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(n => {
        const titleMatch = n.title?.toLowerCase().includes(term);
        const contentMatch = n.content?.toLowerCase().includes(term);
        const tagsMatch = n.tags?.some(tag => tag.toLowerCase().includes(term));
        return titleMatch || contentMatch || tagsMatch;
      });
    }

    // Apply tag filter
    if (filterTag) {
      filtered = filtered.filter(n => 
        n.tags && n.tags.includes(filterTag)
      );
    }

    // Apply orphan filter
    if (showOrphans) {
      filtered = filtered.filter(n => {
        const backlinks = notes.filter(other =>
          other.id !== n.id && other.content.includes(`[[${n.title}]]`)
        );
        return backlinks.length === 0;
      });
    }

    // Apply sorting
    if (sortBy === "title-asc") {
      filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "title-desc") {
      filtered.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    } else {
      // Default: updated (newest first)
      filtered.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    }

    // Build HTML
    container.innerHTML = `
      <div class="note-list-view">
        <h2>📚 All Notes</h2>

        <!-- Search Bar -->
        <div class="search-bar">
          <input 
            type="text" 
            id="search-input" 
            placeholder="🔍 Search notes..."
            value="${searchTerm}"
          />
        </div>

        <!-- Tools -->
        <div class="tools">
          <label>
            Sort by:
            <select id="sort-select">
              <option value="updated" ${sortBy === "updated" ? "selected" : ""}>Last Updated</option>
              <option value="title-asc" ${sortBy === "title-asc" ? "selected" : ""}>Title A–Z</option>
              <option value="title-desc" ${sortBy === "title-desc" ? "selected" : ""}>Title Z–A</option>
            </select>
          </label>

          <label>
            <input type="checkbox" id="orphans-toggle" ${showOrphans ? "checked" : ""}>
            Unlinked Notes Only
          </label>
        </div>

        <!-- Tag Filter Bar -->
        ${allTags.length > 0 ? `
          <div class="tag-bar">
            <strong>Filter by tag:</strong>
            ${allTags.map(t => `
              <span 
                class="tag ${filterTag === t ? "active" : ""}" 
                data-tag="${t}"
                role="button"
                tabindex="0"
              >
                #${t}
              </span>
            `).join("")}
            ${filterTag ? `
              <button class="clear-filter" id="clear-filter">Clear filter</button>
            ` : ""}
          </div>
        ` : ""}

        <!-- Results Info -->
        <div class="results-info">
          <small>
            Showing ${filtered.length} of ${notes.length} note${notes.length !== 1 ? "s" : ""}
            ${searchTerm ? ` matching "<strong>${searchTerm}</strong>"` : ""}
            ${filterTag ? ` with tag <strong>#${filterTag}</strong>` : ""}
            ${showOrphans ? " (unlinked only)" : ""}
          </small>
        </div>

        <!-- Note List -->
        ${filtered.length === 0 ? `
          <div class="empty-state">
            <p>📭 No notes found.</p>
            ${notes.length === 0 ? `
              <p>Create your first note to get started!</p>
              <button onclick="window.location.hash='#/edit/new'" class="button-primary">
                Create First Note
              </button>
            ` : `
              <button onclick="window.location.hash='#/edit/new'" class="button-secondary">
                Create New Note
              </button>
            `}
          </div>
        ` : `
          <div class="note-list">
            ${filtered.map(n => {
              const preview = (n.content || "").split("\n")[0].substring(0, 100);
              const tagsList = (n.tags || []).slice(0, 3).map(t => `<span class="tag-mini">#${t}</span>`).join(" ");
              
              return `
                <div class="note-card" data-id="${n.id}">
                  <h3>${highlight(n.title || "(Untitled)", searchTerm)}</h3>
                  <p class="preview">${highlight(preview, searchTerm)}${preview.length >= 100 ? "..." : ""}</p>
                  <div class="meta">
                    <span class="tags-display">${tagsList || ""}</span>
                    <span class="date">${new Date(n.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `}
      </div>
    `;

    // Wire up event handlers
    
    // Search input
    const searchInput = container.querySelector("#search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderList();
      });
    }

    // Sort select
    const sortSelect = container.querySelector("#sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        sortBy = e.target.value;
        renderList();
      });
    }

    // Orphans toggle
    const orphansToggle = container.querySelector("#orphans-toggle");
    if (orphansToggle) {
      orphansToggle.addEventListener("change", (e) => {
        showOrphans = e.target.checked;
        renderList();
      });
    }

    // Tag filter
    const tagElements = container.querySelectorAll(".tag[data-tag]");
    tagElements.forEach(tag => {
      tag.addEventListener("click", () => {
        const selectedTag = tag.dataset.tag;
        filterTag = filterTag === selectedTag ? null : selectedTag;
        renderList();
      });
    });

    // Clear filter button
    const clearFilterBtn = container.querySelector("#clear-filter");
    if (clearFilterBtn) {
      clearFilterBtn.addEventListener("click", () => {
        filterTag = null;
        renderList();
      });
    }

    // Note card clicks
    const noteCards = container.querySelectorAll(".note-card");
    noteCards.forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        window.location.hash = `#/note/${id}`;
      });
    });
  }

  // Initial render
  renderList();
}