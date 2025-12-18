//
// ZetteNote - Tag Extraction Utility
// Extract hashtags from note content
// Tags are words prefixed with '#' but not inside code blocks.
//

export function extractTags(rawText) {
  if (!rawText) return [];

  // Remove code blocks to avoid extracting tags from code
  let textWithoutCode = rawText.replace(/```[\s\S]*?```/g, '');
  textWithoutCode = textWithoutCode.replace(/`[^`]+`/g, '');

  // Simple tag matcher: #tag-name
  // Matches: #word, #word-word, #word_word, but not #123
  const matches = textWithoutCode.match(/(^|\s)#([a-zA-Z][a-zA-Z0-9_-]*)/g) || [];

  // Clean them, remove spaces, remove '#'
  const tags = matches
    .map(t => t.trim().replace(/^#/, ""))
    .map(t => t.toLowerCase());

  // Return unique set
  return [...new Set(tags)];
}