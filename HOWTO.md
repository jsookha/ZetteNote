# ZetteNote — How-To Guide

Welcome to ZetteNote! This guide will help you get the most out of your note-taking experience, whether you're a programming student, a lecturer, or someone who simply wants to organize their thoughts effectively.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding the Zettelkasten Method](#understanding-the-zettelkasten-method)
3. [Creating Your First Note](#creating-your-first-note)
4. [Formatting with Markdown](#formatting-with-markdown)
5. [Linking Notes Together (Wikilinks)](#linking-notes-together-wikilinks)
6. [Using Tags to Organize](#using-tags-to-organize)
7. [Searching Your Notes](#searching-your-notes)
8. [Understanding Backlinks](#understanding-backlinks)
9. [Managing Your Notes](#managing-your-notes)
10. [Working Offline](#working-offline)
11. [Backup and Restore](#backup-and-restore)
12. [Tips and Best Practices](#tips-and-best-practices)
13. [Frequently Asked Questions](#frequently-asked-questions)

---

## Getting Started

### What is ZetteNote?

ZetteNote is an offline-capable note-taking app designed to help you build a connected knowledge base. Unlike traditional note apps where notes exist in isolation, ZetteNote encourages you to link related ideas together, creating a web of knowledge that mirrors how you actually think.

### Accessing ZetteNote

**On Desktop:**
- Visit the web address where ZetteNote is hosted
- Bookmark it for quick access
- Works in Chrome, Firefox, Edge, and Safari

**On Mobile:**
- Open in Safari (iOS) or Chrome (Android)
- Tap the share button (iOS) or menu (Android)
- Select "Add to Home Screen"
- ZetteNote will appear as an app icon on your home screen

### First Time Setup

No setup required! ZetteNote works immediately:
- No account creation
- No login
- No personal information collected
- All your notes stay on your device

---

## Understanding the Zettelkasten Method

### What is Zettelkasten?

Zettelkasten (German for "slip box") is a note-taking method developed by sociologist Niklas Luhmann. Instead of organizing notes into folders or notebooks, you:

1. **Write atomic notes** - Each note captures one idea
2. **Link related ideas** - Connect notes that relate to each other
3. **Let structure emerge** - Your knowledge network grows organically
4. **Discover connections** - See how different ideas relate

### Why Use This Method?

**For Students:**
- Connect concepts across different subjects
- Build understanding incrementally
- Review material by following connections
- Prepare for exams by exploring related topics

**For Lecturers:**
- Develop course materials iteratively
- Link teaching resources across modules
- Track how concepts build on each other
- Share knowledge structures with colleagues

**For Everyone:**
- Capture ideas as they occur
- Build long-term knowledge, not temporary notes
- Discover unexpected connections
- Think more clearly through writing

---

## Creating Your First Note

### Step 1: Open the Note Editor

- Tap the **➕** button at the bottom of the screen (mobile)
- Or click **"New Note"** in the top menu (desktop)

### Step 2: Add a Title

```
Title: Introduction to Variables
```

**Tips for Good Titles:**
- Be specific: "Python Lists" not "Lists"
- Use noun phrases: "Function Parameters in JavaScript"
- Make it searchable: "How CSS Grid Works"
- Keep it concise: Under 50 characters

### Step 3: Write Your Content

You can write in plain text or use formatting (explained in the next section).

**Plain Text Example:**
```
Variables store data in programming.
In Python, you create a variable like this: x = 10
Variables can change their value during program execution.
```

**Formatted Example (with Markdown):**
```
Variables store data in programming.

In Python, you create a variable like this: `x = 10`

Variables can **change their value** during program execution.

## Types of Variables
- Local variables
- Global variables
- Instance variables
```

### Step 4: Add Tags (Optional but Recommended)

Tags help you categorize and find notes quickly. Just type a hashtag followed by a word:

```
#python #programming #variables #basics
```

Tags can appear anywhere in your note content.

### Step 5: Save Your Note

- Click the **"Create Note"** button
- Your note is automatically saved to your device
- You'll be taken to the note view

---

## Formatting with Markdown

Markdown is a simple way to format text. **You don't have to use it** - plain text works perfectly fine. But if you want formatting, here's how:

### Headings

```markdown
# Large Heading
## Medium Heading
### Small Heading
```

**What you see:**

# Large Heading
## Medium Heading
### Small Heading

---

### Bold and Italic

```markdown
**This text is bold**
*This text is italic*
```

**What you see:**

**This text is bold**  
*This text is italic*

---

### Inline Code

For short code snippets or technical terms:

```markdown
Use the `print()` function to display output.
The variable `x` stores the value.
```

**What you see:**

Use the `print()` function to display output.  
The variable `x` stores the value.

---

### Code Blocks

For multiple lines of code:

````markdown
```
function greet(name) {
  console.log("Hello, " + name);
}
```
````

**What you see:**

```
function greet(name) {
  console.log("Hello, " + name);
}
```

---

### Lists

```markdown
- First item
- Second item
- Third item
```

**What you see:**

- First item
- Second item
- Third item

---

### When to Use Markdown vs Plain Text

**Use Markdown when:**
- Taking programming notes (code needs special formatting)
- Creating structured notes with sections
- Emphasizing important concepts

**Use Plain Text when:**
- Quick capturing of ideas
- Writing conversational notes
- Simplicity is preferred

**Remember:** Both work equally well in ZetteNote!

---

## Linking Notes Together (Wikilinks)

This is where ZetteNote becomes powerful. You can link notes together using double brackets:

### Creating a Link

When writing a note, surround another note's title with `[[double brackets]]`:

```markdown
Today I learned about variables in Python.
This concept is related to [[Data Types]] and [[Functions]].
```

### What Happens When You Click a Link?

**If the note exists:**
- Clicking `[[Data Types]]` opens that note
- You can navigate between related notes easily

**If the note doesn't exist yet:**
- You'll see a message: "Note Not Found"
- Click **"Create 'Data Types'"** to instantly create it
- The title is automatically filled in
- Write your content and save

### Real-World Example: Building a Programming Knowledge Base

**Note 1: Variables**
```markdown
# Variables in Python

Variables store data that can be used later.

Example: `name = "Alice"`

Related concepts:
- [[Data Types]]
- [[Variable Scope]]
- [[Assignment Operators]]
```

**Note 2: Data Types** (created by clicking the link)
```markdown
# Data Types

Python has several built-in data types:
- Integers: `42`
- Strings: `"hello"`
- Floats: `3.14`

Every [[Variables]] must have a data type.
```

### Why This Matters

Instead of organizing notes in folders like:
```
Programming/
  Python/
    Variables.txt
    Data Types.txt
```

You create a **web of knowledge** where:
- Notes link to related concepts
- You discover connections naturally
- Knowledge builds on itself
- Review is easier (just follow links)

---

## Using Tags to Organize

Tags are like keywords that describe your note. They help you:
- Find notes on similar topics
- Filter notes by category
- See themes in your knowledge base

### How to Add Tags

Just type `#` followed by the tag name **anywhere in your note**:

```markdown
Today I learned about CSS Grid layout.

CSS Grid is powerful for creating responsive layouts.

#css #webdev #layout #tutorial
```

### Tag Best Practices

**Be Consistent:**
- Use `#javascript` (small letters) not sometimes `#js` and sometimes `#JavaScript`
- Decide on a tagging convention and stick to it

**Use Multiple Tags:**
- One note can have many tags
- Tag by subject: `#python`
- Tag by type: `#tutorial` `#reference` `#concept`
- Tag by project: `#assignment1` `#thesis`

**Don't Over-Tag:**
- 3-5 tags per note is usually enough
- More tags = harder to filter effectively

### Using Tags to Filter Notes

1. Go to the **All Notes** screen
2. Look at the tag bar (shows all your tags)
3. Click a tag (e.g., `#python`)
4. Only notes with that tag appear
5. Click the tag again to clear the filter

### Example Tag System for Students

**By Subject:**
- `#mathematics` `#programming` `#databases`

**By Topic:**
- `#loops` `#functions` `#arrays` `#algorithms`

**By Status:**
- `#todo` `#review` `#complete` `#exam-prep`

**By Source:**
- `#lecture` `#textbook` `#tutorial` `#practice`

---

## Searching Your Notes

ZetteNote has powerful search that finds notes instantly.

### How to Search

1. Go to **All Notes** screen
2. Type in the search box at the top
3. Results appear as you type
4. Search looks through:
   - Note titles
   - Note content
   - Tags

### Search Tips

**Search by Keyword:**
```
"variable" → finds all notes mentioning variables
```

**Search by Tag:**
```
"python" → finds notes tagged #python or mentioning Python
```

**Search by Partial Match:**
```
"func" → finds "function", "functional", "functions"
```

**Combined Search:**
```
"javascript array" → finds notes about JavaScript arrays
```

### Search Results Show:

- **Title** (highlighted if it matches)
- **Preview** (snippet of content with matches highlighted)
- **Tags** (so you can see context)
- **Date** (when last updated)

---

## Understanding Backlinks

Backlinks are one of the most powerful features in ZetteNote.

### What Are Backlinks?

When Note A links to Note B with `[[Note B]]`, Note B automatically shows:
> "Linked From: Note A"

This is a **backlink** - it shows you which notes reference the current note.

### Example

**Note: Functions**
```markdown
# Functions in Python

Functions are reusable blocks of code.

Example:
```
```
def greet(name):
    print(f"Hello, {name}")
```
```
Related: [[Variables]] [[Parameters]] [[Return Values]]
```

**Note: Parameters**
```markdown
# Parameters

Parameters are inputs to [[Functions]].

---
Linked From:
- Functions in Python  ← This is a backlink!
```

### Why Backlinks Matter

**Discover Context:**
- See where an idea is used
- Understand how concepts connect
- Find related notes you forgot about

**Build Knowledge Networks:**
- See which notes are central (many backlinks)
- Identify isolated notes (no backlinks = orphans)
- Build comprehensive understanding

**Review Efficiently:**
- Start at one concept
- Follow links forward
- Check backlinks to see what led here
- Create a natural review path

### Finding Orphan Notes

Notes with no backlinks might be:
- Standalone ideas worth connecting
- Starting points for new topics
- Forgotten notes to review

To find them:
1. Go to **All Notes**
2. Check the **"Unlinked Notes Only"** checkbox
3. Consider adding links to connect them

---

## Managing Your Notes

### Viewing All Notes

The **All Notes** screen shows all your notes with:
- Title
- Preview (first 100 characters)
- Tags
- Last updated date

### Sorting Options

Click the **"Sort by"** dropdown to organize notes:

**Last Updated** (default)
- Newest notes first
- Good for continuing recent work

**Title A–Z**
- Alphabetical order
- Good for finding specific notes

**Title Z–A**
- Reverse alphabetical
- Sometimes useful for browsing

### Filtering Options

**By Tag:**
- Click any tag in the tag bar
- Only notes with that tag show

**Unlinked Notes Only:**
- Check this box
- See notes with no backlinks
- Useful for finding orphaned notes

### Editing a Note

1. Open the note
2. Click **"Edit"** button
3. Make your changes
4. Click **"Save Changes"**

**What Updates Automatically:**
- Tags (if you added/removed hashtags)
- Links (if you added/removed wikilinks)
- Backlinks (updated in linked notes)
- Last modified date

### Deleting a Note

1. Open the note
2. Click **"Delete"** button
3. Confirm the deletion
4. **Warning:** This cannot be undone!
5. **Tip:** Export your notes regularly (see Backup section)

---

## Working Offline

ZetteNote works **completely offline** after your first visit.

### How It Works

**First Visit:**
- Your browser downloads ZetteNote
- The app is cached on your device
- Notes are stored locally

**After That:**
- Works without internet
- Create, edit, delete notes offline
- Search works offline
- Everything is saved to your device

### Checking Offline Status

**Desktop:**
1. Open browser Developer Tools (F12)
2. Go to Application → Service Workers
3. Look for "Activated and running"

**Mobile:**
- If the app loads, it's working!
- Try airplane mode to test

### Storage Limits

- Notes stored in IndexedDB (browser storage)
- Typical limit: 50MB - 100MB
- Enough for thousands of notes
- If storage fills, browser will warn you

---

## Backup and Restore

**Always backup your notes!** They're stored on your device, so:
- Clearing browser data deletes notes
- Switching devices means no sync
- Device failure means data loss

### Exporting Notes (Backup)

1. Go to **Settings** screen
2. Click **"Export Notes (Backup)"**
3. A JSON file downloads to your device
4. File name includes the date: `zettenote-backup-2025-12-19.json`
5. **Save this file somewhere safe:**
   - Cloud storage (Google Drive, Dropbox, OneDrive)
   - External drive
   - Email to yourself

**When to Export:**
- After important note-taking sessions
- Before clearing browser data
- Weekly (set a reminder!)
- Before switching devices

### Importing Notes (Restore)

1. Go to **Settings** screen
2. Click **"Import Notes (Restore)"**
3. Select your backup JSON file
4. Confirm the import
5. Your notes are restored!

**Import Behaviour:**
- **Merges** with existing notes (doesn't replace)
- Duplicates are created if note titles match
- All tags and links are preserved

### Transferring to Another Device

**Step 1 (Old Device):**
1. Export notes to JSON file
2. Save file to cloud storage or email it

**Step 2 (New Device):**
1. Open ZetteNote
2. Download your JSON backup
3. Import the file
4. All notes appear!

---

## Tips and Best Practices

### Note-Taking Strategies

**Atomic Notes:**
- One idea per note
- Keep notes focused and concise
- Easier to link and reuse

**Good Example:**
```
Title: Python List Comprehensions
Content: List comprehensions create lists in one line...
```

**Not-So-Good Example:**
```
Title: Python Notes
Content: Variables, lists, dictionaries, functions, classes...
```

**Write in Your Own Words:**
- Don't just copy textbook definitions
- Explain concepts as if teaching someone
- Add examples that make sense to you

**Link as You Write:**
- When mentioning a concept, immediately link it: `[[concept]]`
- Don't wait to add links later
- Creates connections while thinking

### Organization Strategies

**Don't Overthink Structure:**
- Start writing notes immediately
- Let organization emerge naturally
- Links create structure automatically

**Use Tags for Categories:**
- Subject tags: `#python` `#java` `#databases`
- Type tags: `#concept` `#example` `#question`
- Status tags: `#todo` `#review` `#mastered`

**Regular Review:**
- Pick a random note
- Follow its links
- Check its backlinks
- Add new connections you discover

### For Programming Students

**Document Code:**
```markdown
# Array Methods in JavaScript

## .map()
Transforms each element

```
```
const doubled = [1, 2, 3].map(x => x * 2);
// Result: [2, 4, 6]
```
```
See also: [[.filter()]] [[.reduce()]] [[Arrow Functions]]

#javascript #arrays #methods
```

**Track Errors:**
```markdown
# TypeError: Cannot Read Property

## What Happened
Got this error when trying to access object property

## Cause
Object was `undefined` before accessing property

## Solution
Check if object exists first using optional chaining: `obj?.property`

#debugging #javascript #errors
```

**Link Related Concepts:**
- `[[Variables]]` → `[[Data Types]]` → `[[Type Conversion]]`
- `[[Functions]]` → `[[Scope]]` → `[[Closures]]`
- `[[Arrays]]` → `[[Loops]]` → `[[Array Methods]]`

### For Lecturers

**Course Planning:**
```markdown
# Lesson 5: Introduction to Loops

## Learning Objectives
- Understand iteration
- Write for loops
- Write while loops

## Prerequisites
Students should understand: [[Variables]] and [[Conditionals]]

## Next Topics
This leads into: [[Arrays]] and [[Functions]]

#course-planning #programming-101 #lesson-plan
```

**Resource Linking:**
```markdown
# Teaching Resources: CSS Flexbox

## Demos
- See [[Flexbox Interactive Demo]]
- Link to [[Student Exercise 3]]

## Common Mistakes
- Students often confuse [[justify-content vs align-items]]

#teaching #css #resources
```

---

## Frequently Asked Questions

### General Questions

**Q: Is my data private?**  
A: Yes! All notes are stored only on your device. Nothing is sent to any server. ZetteNote doesn't collect any data.

**Q: Can I access my notes on multiple devices?**  
A: Not automatically. You'll need to export notes from one device and import them on another. Think of it like saving a document and opening it elsewhere.

**Q: What if I clear my browser data?**  
A: Your notes will be deleted. Always export backups regularly!

**Q: Can I use this for non-programming subjects?**  
A: Absolutely! The Zettelkasten method works for any subject: history, literature, science, language learning, etc.

**Q: Do I need internet to use ZetteNote?**  
A: Only for the first visit. After that, it works completely offline.

---

### Note Management

**Q: How many notes can I create?**  
A: Thousands! Browser storage limits vary but are typically 50-100MB, which is more than enough for extensive note-taking.

**Q: Can I organize notes into folders?**  
A: No, and that's intentional! ZetteNote uses links and tags instead of hierarchical folders. This creates a more flexible, interconnected knowledge base.

**Q: What happens if I link to the wrong note?**  
A: Just edit the note and fix the link. Backlinks update automatically.

**Q: Can I have two notes with the same title?**  
A: Yes, but it's not recommended. Wikilinks use titles, so identical titles can cause confusion. Make titles unique and specific.

---

### Markdown Questions

**Q: Do I have to use Markdown?**  
A: No! Plain text works perfectly. Markdown is optional for those who want formatting.

**Q: What if I don't know Markdown?**  
A: Start with plain text. As you learn, add formatting gradually. The guide above covers all you need.

**Q: Will my code blocks have syntax highlighting?**  
A: Code blocks have a dark background and monospace font, but not language-specific syntax highlighting (this may be added in future versions).

---

### Linking and Backlinks

**Q: What if I link to a note and then rename it?**  
A: The link will break. You'll need to update all links manually. This is a limitation of the current version.

**Q: Can I link to a specific section of a note?**  
A: Not currently. Links point to entire notes, not specific headings or paragraphs.

**Q: Why do some links look red?**  
A: Red links indicate the note doesn't exist yet. Click it to create the note.

**Q: How do I find all notes linking to a specific note?**  
A: Open that note and look at the "Linked From" section at the bottom. These are your backlinks.

---

### Tags

**Q: Can a tag have spaces?**  
A: No. Use hyphens instead: `#data-structures` not `#data structures`

**Q: What if I misspell a tag?**  
A: You'll create a separate tag. Be careful with spelling. You can edit the note to fix it.

**Q: Can I see all my tags?**  
A: Yes! Go to All Notes screen. The tag bar shows all tags used in your notes.

**Q: How do I delete a tag?**  
A: Edit notes containing that tag and remove it. If no notes use it, it disappears from the tag bar.

---

### Technical Questions

**Q: What browsers work best?**  
A: Chrome, Firefox, Edge, and Safari all work well. Mobile browsers work too!

**Q: Can I use this on my iPad?**  
A: Yes! Add it to your home screen for an app-like experience.

**Q: The app isn't loading offline. What do I do?**  
A: Try these steps:
1. Make sure you visited the app at least once with internet
2. Clear browser cache and revisit the site
3. Check if Service Workers are enabled in your browser
4. Try a different browser

**Q: How do I update to the latest version?**  
A: Just refresh the page. The service worker updates automatically.

---

## Getting Help

If you encounter issues or have questions not covered here:

1. **Check the Changelog** (`CHANGELOG.md`) for recent updates
2. **Review this guide** - many answers are here
3. **Export your notes** before troubleshooting
4. **Try a different browser** to isolate the issue
5. **Check browser console** (F12) for error messages

---

## Quick Start Checklist

Ready to start? Here's a quick checklist:

- [ ] Open ZetteNote in your browser
- [ ] Add to home screen (mobile) or bookmark it (desktop)
- [ ] Create your first note
- [ ] Add a tag with `#tag`
- [ ] Create a second note
- [ ] Link them together with `[[Note Title]]`
- [ ] Click the link to navigate
- [ ] Check the backlinks section
- [ ] Export a backup to be safe
- [ ] Start building your knowledge base!

---

## Welcome to the Zettelkasten Journey!

Remember:
- Start small, grow organically
- Don't overthink organization
- Link generously
- Review regularly
- Export backups often
- Enjoy the process of building your knowledge web!

Happy note-taking! 