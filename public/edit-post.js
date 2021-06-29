document.querySelectorAll(".edit-post").forEach(button => {
    button.addEventListener("click", postPopup)
});

let editForm = document.querySelector("#editPostForm");
let titleInput = document.querySelector("#postTitle");
let contentInput = document.querySelector("#postContent");
let postIDInput = document.querySelector("#postID");


function postPopup(event) {
    let postTitle = event.currentTarget.getAttribute("data-post-title");
    let postContent = event.currentTarget.getAttribute("data-post-content");
    let postID = event.currentTarget.getAttribute("data-post-id");
    titleInput.value = postTitle;
    contentInput.value = postContent;
    postIDInput.value = postID;
};

async function editFormHandler(event) {
    event.preventDefault()
    let postTitle = titleInput.value.trim();
    let postContent = contentInput.value.trim();
    let postID = parseInt(postIDInput.value.trim(), 10);

    if (postTitle && postContent && postID) {
        const response = await fetch(`/api/posts/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: postTitle,
                content: postContent,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        if (response.ok) {
            document.location.reload()
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n
            ${resData.message ? resData.message : ''}`);
        }
    }
};



editForm.addEventListener("submit", editFormHandler);

