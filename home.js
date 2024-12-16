document.addEventListener("DOMContentLoaded", async function() {
    const articlesDiv = document.getElementById("articles");

    // Fetch articles from backend
    const response = await fetch("https://it-back.onrender.com/allarticle");
    const data = await response.json();

    // Display each article
    data.article.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.innerHTML = `
            <h2><a href="article.html?id=${article._id}">${article.title}</a></h2>
        `;
        articlesDiv.appendChild(articleElement);
    });

    // Upload button functionality
    const uploadBtn = document.getElementById("uploadBtn");
    uploadBtn.addEventListener("click", () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "login.html";  // Redirect to login if not logged in
        } else {
            window.location.href = "upload.html";  // Go to upload page if logged in
        }
    });
});


function searchArticles() {
    const searchText = document.getElementById('searchBar').value.toLowerCase();
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchText) || 
        article.description.toLowerCase().includes(searchText)
    );

    const articlesContainer = document.getElementById('articles-container');
    articlesContainer.innerHTML = '';

    filteredArticles.forEach(article => {
        const articleItem = document.createElement('div');
        articleItem.classList.add('articles');
        
        articleItem.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
        `;
        
        articlesContainer.appendChild(articleItem);
    });
}


