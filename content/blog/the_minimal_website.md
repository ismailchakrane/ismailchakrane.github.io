# The Minimal Website

In this post I’ll give you a birds‑eye view of how I built this blog using **only HTML, CSS, JS, and Markdown**, why I made those choices, and where I drew inspiration.

---

## Why Markdown?

- **Human‑readable**: I can write and edit literally anywhere—a plain text editor, a terminal, even on my phone.  
- **Lightweight**: No complex CMS or database; just `.md` files in a folder.  
- **Portable**: I can open the same file in Git, GitHub, VS Code, Obsidian… anywhere.

---

## How do I integrate Markdown with JavaScript?

1. **Fetch the raw `.md` file** when the user clicks a post link.  
2. **Parse it** on the client side with [Marked.js](https://github.com/markedjs/marked).  
3. **Inject the resulting HTML** directly into `<main>`.  
4. **Generate metadata** (title, summary, date) ahead of time with a Python script and load it once—so the JS only has to sort, filter, and render.

This approach keeps the browser’s job very simple: load text, parse to HTML, and display.

---

## Why a Dark Theme?

- **Low distraction**: A dark background with light text puts the content front‑and‑center.  
- **Eye comfort**: In dim lighting, a bright white page can be harsh; dark UI feels softer.  
- **Aesthetic fit**: It matches the minimalist, hacker‑style vibe of plain‑text blogging.

---

## Inspiration: suckless

I took to heart the idea that software—and web pages—should do **one thing, and do it well**. For a deep dive into the philosophy behind keeping things small and simple, see: [Why the web sucks (and how we can make it better)](https://suckless.org/sucks/web/)

---

By combining **simple Markdown**, a tiny JS router, and a streamlined CSS toolkit, you end up with a blog that’s **fast**, **portable**, and **easy to maintain**—exactly in the spirit of minimal software. 

To see code : [github repo](https://github.com/ismailchakrane/ismailchakrane.github.io)


Have a good day !