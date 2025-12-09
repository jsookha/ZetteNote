//
// Simple Markdown Parser for ZetteNote
// Supports:
//  - Headings (#, ##, ###)
//  - Bold (**text**)
//  - Italic (*text*)
//  - Inline code (`code`)
//  - Code blocks (```)
//  - Bullet lists (- item)
//  - Line breaks
//

export function renderMarkdown(mdText) {
  if (!mdText) return "";

  // Escape HTML to prevent XSS
  let html = mdText
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // CODE BLOCKS (``` ... ```)
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre class="code-block"><code>${code}</code></pre>`;
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

  // BULLET LISTS
  html = html.replace(/^- (.+)$/gm, `<li>$1</li>`);
  html = html.replace(/(<li>.*<\/li>)/gs, `<ul>$1</ul>`);

  // NEWLINES → <br>
  html = html.replace(/\n/g, "<br>");

  return html;
}
