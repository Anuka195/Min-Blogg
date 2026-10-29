const postContainer = document.querySelector("#postContainer")
const errorMessage = document.querySelector("#errorMessage")
const commentsContainer = document.querySelector("#commentsContainer")
const commentForm = document.querySelector("#commentForm")
const commentInput = document.querySelector("#commentInput")
const editForm = document.querySelector("#editForm")
const editTitle = document.querySelector("#editTitle")
const editBody = document.querySelector("#editBody")
const saveButton = document.querySelector("#saveButton")
const deleteButton = document.querySelector("#deleteButton")
const commentsSection = document.querySelector("#commentsSection")


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getPosts() {
    try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);


        if (!response.ok) {
            throw new Error("något gick fel")
        }

        const data = await response.json()
        postContainer.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.body}</p>
`;

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
getPosts();

async function getComments() {
    try {
        const response = await fetch(`https://dummyjson.com/posts/${id}/comments`);

        if (!response.ok) {
            throw new Error("Något gick fel");
        }

        const data = await response.json();

        data.comments.forEach(comment => {
            const p = document.createElement("p");

            p.textContent = comment.body;

            commentsContainer.appendChild(p);
        });

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

getComments();

commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const comment = commentInput.value;

    const newComment = {
        body: comment,
        postId: Number(id),
        userId: 5
    };

    try {
        const response = await fetch("https://dummyjson.com/comments/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        });

        if (!response.ok) {
            throw new Error("Något gick fel");
        }

        const data = await response.json();

        const p = document.createElement("p");
        p.textContent = data.body;

        commentsContainer.appendChild(p);

        commentInput.value = "";

    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTitle = editTitle.value;
    const newBody = editBody.value;

    const updatedPost = {
        title: newTitle,
        body: newBody
    };

    try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        });

        if (!response.ok) {
            throw new Error("Något gick fel när blogginlägget skulle uppdateras");
        }

        const data = await response.json();

        console.log(data);
        postContainer.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>`;

    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

deleteButton.addEventListener("click", async (e) => {
    try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Något gick fel")
        }
        const data = await response.json();

        console.log(data);
        commentsSection.remove();
        commentsContainer.remove();
        commentForm.remove();
        editForm.remove();
        deleteButton.remove();

        postContainer.remove();

        const p = document.createElement("p");
        p.textContent = "Blogginlägget har tagits bort";

        document.body.appendChild(p);

    } catch (error) {
        errorMessage.textContent = error.message;
    }
});