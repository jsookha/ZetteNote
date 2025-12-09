import { getAll } from "../storage/idb-helpers.js";

export async function NoteListView(container) {

  // 1. Load notes from IndexedDB
  let notes = await getAll("notes");

  // 2. Sort newest first
  notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // 3. If empty, show message
  if (notes.length === 0) {
    container.innerHTML = `
      <h2>All Notes</h2>
      <p>You have no notes yet.</p>
      <p><a href="#/edit/" class="button-primary">Create your first note</a></p>
    `;
    return;
  }

  // 4. Build list HTML
  let listHtml = `
    <h2>All Notes</h2>
    <div class="note-list">
  `;

  for (const note of notes) {
    const preview = note.content.split("\n")[0].substring(0, 80);

    listHtml += `
      <div class="note-card" data-id="${note.id}">
        <h3>${note.title || "(Untitled note)"}</h3>
        <p class="preview">${preview}</p>
        <div class="meta">
          <span>${note.tags?.join(", ") || ""}</span>
          <span>${new Date(note.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    `;
  }

  listHtml += `</div>`;

  // 5. Render list
  container.innerHTML = listHtml;

  // 6. Add click handlers to cards
  const cards = container.querySelectorAll(".note-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      window.location.hash = `#/note/${id}`;
    });
  });

  // 7. Add "New Note" floating button
  const newBtn = document.createElement("button");
  newBtn.textContent = "+ New Note";
  newBtn.classList.add("floating-button");
  newBtn.onclick = () => {
    window.location.hash = "#/edit/";
  };
  container.appendChild(newBtn);
}
