const apiKey = '4e8c83cda9bf412ea9641981e560e810';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles; // Return the fetched articles
    } catch (error) {
        console.error("Error fetching random news", error);
        return []; // Return an empty array if there's an error
    }
}

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles; // Return the fetched articles
    } catch (error) {
        console.error("Error fetching news by query", error);
        return []; // Return an empty array if there's an error
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    if (articles.length === 0) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "No articles available.";
        blogContainer.appendChild(errorMessage);
    } else {
        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
            const title = document.createElement("h2");
            const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
            title.textContent = truncatedTitle;
            const description = document.createElement("p");
            const truncatedDes = article.description && article.description.length > 80 ? article.description.slice(0, 80) + "...." : article.description;
            description.textContent = truncatedDes;
            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            blogContainer.appendChild(blogCard);
        });
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim(); // Use .value to get the input value
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
