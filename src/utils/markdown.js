//
// ZetteNote - Simple Markdown Parser
// Supports:
//  - Headings (#, ##, ###)
//  - Bold (**text**)
//  - Italic (*text*)
//  - Inline code (`code`)
//  - Code blocks (```)
//  - Bullet lists (- item)
//  - Wikilinks ([[Title]]) - Stage 5.2
//  - Line breaks
//

export function renderMarkdown(mdText) {
  if (!mdText) return "";

  // Escape HTML to prevent XSS
  let html = mdText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // CODE BLOCKS (``` ... ```)
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre class="code-block"><code>${code.trim()}</code></pre>`;
  });

  // INLINE CODE (`code`)
  html = html.replace(/`([^`]+)`/g, `<code class="inline-code">$1</code>`);

  // BOLD (**text**)
  html = html.replace(/\*\*(.+?)\*\*/g, `<strong>$1</strong>`);

  // ITALIC (*text*)
  html = html.replace(/\*(.+?)\*/g, `<em>$1</em>`);

  // HEADINGS (# ...)
  html = html.replace(/^### (.+)$/gm, `<h3>$1</h3>`);
  html = html.replace(/^## (.+)$/gm, `<h2>$1</h2>`);
  html = html.replace(/^# (.+)$/gm, `<h1>$1</h1>`);

  // BULLET LISTS (- item)
  html = html.replace(/^- (.+)$/gm, `<li>$1</li>`);
  
  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li>.*?<\/li>\n?)+/gs, (match) => {
    return `<ul>${match}</ul>`;
  });

  // WIKILINKS ([[Title]]) - Stage 5.2 addition
  html = html.replace(/\[\[([^\]]+)\]\]/g, (match, title) => {
    const encoded = encodeURIComponent(title.trim());
    return `<a href="#/link/${encoded}" class="wikilink" data-note-title="${title.trim()}">${match}</a>`;
  });

  // NEWLINES → <br>
  html = html.replace(/\n/g, "<br>");

  return html;
}