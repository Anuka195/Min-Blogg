const postContainer = document.querySelector("#postContainer");
const errorMessage = document.querySelector("#errorMessage");
const tagFilter = document.querySelector("#tagFilter");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
let allPosts = [];

async function getPosts() {
    try {
        const response = await fetch("https://dummyjson.com/posts?limit=12")

        if (!response.ok) {
            throw new Error("något gick fel")
        }

        const data = await response.json()
        allPosts = data.posts;
        displayPosts(allPosts);
        console.log(data.posts)

    } catch (error) {
        errorMessage.textContent = error.message;
    }

}

getPosts();

function displayPosts(posts) {

    postContainer.innerHTML = "";

    posts.forEach(post => {

        const article = document.createElement("article");

        article.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <a href="post.html?id=${post.id}">Läs mer</a>
            <p>Visningar: ${post.views}</p>
        `;

        postContainer.appendChild(article);
    });

}



/* searchInput.addEventListener("input", () => {
    const search = searchInput.value;

    const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    displayPosts(filteredPosts);
}) */


/* tagFilter.addEventListener("change", () => {
    const selectedTag = tagFilter.value;
    console.log(selectedTag)

    const result = allPosts.filter(post => {
        return post.tags.includes(selectedTag)
    });

    if (selectedTag === "all") {
        displayPosts(allPosts);
    } else {
        displayPosts(result);
    }

});

sortSelect.addEventListener("change", () => {
    const selectedPosts = sortSelect.value;
    const result = [...allPosts];
    console.log(selectedPosts)

    if (selectedPosts === "Ursprunglig") {
        displayPosts(allPosts);
    } else if (selectedPosts === "Flest") {
        result.sort((a, b) => b.views - a.views);
        displayPosts(result);

    }
    else if (selectedPosts === "Minst") {
        result.sort((a, b) => a.views - b.views);
        displayPosts(result);
    }
}); */

function updatePosts() {
    let result = [...allPosts];

    const search = searchInput.value;
    const selectedTag = tagFilter.value;
    const selectedSort = sortSelect.value;

    result = result.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedTag !== "all") {
        result = result.filter(post =>
            post.tags.includes(selectedTag)
        );
    }
 
    if (selectedSort === "Flest") {
    result.sort((a, b) => b.views - a.views);

} else if (selectedSort === "Minst") {
    result.sort((a, b) => a.views - b.views);
}
 displayPosts(result);
}

 
searchInput.addEventListener("input", updatePosts);
tagFilter.addEventListener("change", updatePosts);
sortSelect.addEventListener("change", updatePosts);
    
