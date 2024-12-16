const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("id");

document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch(`https://it-back.onrender.com/allarticle/${articleId}`);
    const article = await response.json();

    const articleDiv = document.getElementById("article");
    articleDiv.innerHTML = `<h2>${article.title}</h2>`;
    article.steps.forEach(step => {
        articleDiv.innerHTML += `<p>${step.text}</p>`;
        if (step.image) {
            articleDiv.innerHTML += `<img src="https://it-back.onrender.com/${step.image}" alt="Step Image">`;
        }
    });
});
