// CV Download Handler
const cvButton = document.querySelector('.download-btn');
cvButton.addEventListener('click', (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = './content/Ismail-Chakrane-CV.pdf';
    link.download = 'Ismail-Chakrane-CV.pdf';
    link.click();
});

document.addEventListener("DOMContentLoaded", () => {
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

    async function loadBlogContent() {
        try {
            const response = await fetch("/blog-metadata.json");
            if (!response.ok) throw new Error("Failed to load blog metadata");

            const files = await response.json();
            files.sort((a, b) => new Date(b.created) - new Date(a.created));

            const mainSection = document.querySelector("main");
            mainSection.innerHTML = "";

            files.forEach((file) => {
                const blogContainer = document.createElement("div");

                // Add blog title and snippet
                const blogLink = document.createElement("a");
                blogLink.href = `#/blog/${file.name}`;
                blogLink.innerHTML = `
                    <h2>${file.name.replace(".md", "")}</h2>
                    <h3>Created on: ${new Date(file.created).toLocaleDateString()}</h3>
                    <p>${file.snippet}</p>
                `;
                blogLink.style.textDecoration = "none";
                blogLink.style.color = "inherit";
                blogContainer.appendChild(blogLink);

                // Add horizontal rule
                const hr = document.createElement("hr");
                blogContainer.appendChild(hr);

                mainSection.appendChild(blogContainer);
            });
        } catch (error) {
            console.error("Error loading blog content:", error);
        }
    }

    function handleRoute() {
        const hash = window.location.hash;

        if (!hash || hash === "#/") {
            loadMarkdownContent("content/whoami.md");
        } else if (hash === "#/whoami") {
            loadMarkdownContent("content/whoami.md");
        } else if (hash === "#/blog") {
            loadBlogContent();
        } else if (hash.startsWith("#/blog/")) {
            const blogFile = hash.replace("#/blog/", "");
            loadMarkdownContent(`/content/blog/${blogFile}`);
        } else {
            const mainSection = document.querySelector("main");
            mainSection.innerHTML = "<p>Page not found</p>";
        }
    }

    window.addEventListener("hashchange", handleRoute);

    handleRoute();
});
