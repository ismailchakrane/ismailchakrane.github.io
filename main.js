let allBlogs = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/blog-metadata.json");
    if (!response.ok) throw new Error("Failed to load blog metadata");
    allBlogs = await response.json();
  } catch (err) {
    console.error("Error loading blog metadata for search:", err);
  }

  function handleRoute() {
    const hash = window.location.hash;
    if (hash === "" || hash === "#/" || hash === "#/blog") {
      loadBlogContent();
    } else if (hash.startsWith("#/blog/")) {
      const blogFile = hash.replace("#/blog/", "");
      loadMarkdownContent(`/content/blog/${blogFile}`);
    } else {
      const mainSection = document.querySelector("main");
      mainSection.innerHTML = "<p>Page not found :)</p>";
    }
  }

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
  initSearch();
});

async function loadMarkdownContent(route) {
  try {
    const response = await fetch(route);
    if (!response.ok) throw new Error("Failed to load content");
    const markdown = await response.text();
    const htmlContent = marked.parse(markdown);
    const mainSection = document.querySelector("main");
    mainSection.innerHTML = htmlContent;
  } catch (error) {
    console.error("Error loading Markdown content:", error);
  }
}

function formatDate(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  const h = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  return `${d}-${m}-${y} - ${h}:${min}:${s}`;
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function loadBlogContent() {
  try {
    const blogs = allBlogs.slice().sort((a, b) => new Date(b.modified) - new Date(a.modified));
    const mainSection = document.querySelector("main");
    mainSection.innerHTML = "";
    blogs.forEach((blog) => {
      const blogContainer = document.createElement("div");
      const blogLink = document.createElement("a");
      blogLink.href = `#/blog/${blog.name}`;
      const modifiedDate = new Date(blog.modified);
      const formattedDate = formatDate(modifiedDate);
      const title = capitalizeFirstLetter(blog.title);
      blogLink.innerHTML = `
        <h2>${title}</h2>
        <h3>Modified on: ${formattedDate}</h3>
        <p>${blog.summary.trim() + "..." || ""}</p>
      `;
      blogLink.style.textDecoration = "none";
      blogLink.style.color = "inherit";
      blogContainer.appendChild(blogLink);
      const hr = document.createElement("hr");
      blogContainer.appendChild(hr);
      mainSection.appendChild(blogContainer);
    });
  } catch (error) {
    console.error("Error loading blog content:", error);
  }
}

function initSearch() {
  const searchInput = document.querySelector(".search-container input");
  if (!searchInput) return;
  const searchResults = document.createElement("div");
  searchResults.classList.add("search-results");
  const searchContainer = document.querySelector(".search-container");
  searchContainer.appendChild(searchResults);
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();
    if (!query) {
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
      return;
    }
    const matches = allBlogs.filter(blog =>
      blog.title.toLowerCase().includes(query)
    );
    if (matches.length === 0) {
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
      return;
    }
    searchResults.style.display = "block";
    searchResults.innerHTML = "";
    matches.forEach((blog) => {
      const link = document.createElement("a");
      link.href = `#/blog/${blog.name}`;
      link.textContent = capitalizeFirstLetter(blog.title);
      searchResults.appendChild(link);
    });
  });
}