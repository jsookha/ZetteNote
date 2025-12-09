export function NoteView(container, noteId) {
  container.innerHTML = `
    <h2>View Note</h2>
    <p>Note ID: ${noteId || "(none)"}</p>
  `;
}
