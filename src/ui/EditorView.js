export function EditorView(container, noteId) {
  container.innerHTML = `
    <h2>Edit Note</h2>
    <p>Editing note ID: ${noteId || "(new note)"}</p>
  `;
}
