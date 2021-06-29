document.querySelectorAll(".deleteButton").forEach(button => {
    button.addEventListener("click", deletePost)
});

async function deletePost(event) {
    let postID = parseInt(event.currentTarget.getAttribute("data-post-id"), 10);
    if (postID) {
        const response = await fetch(`/api/posts/${postID}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload()

        } else {
            const resData = await response.json();
            alert(`${response.statusText}\n
            ${resData.message ? resData.message : ''}`);
        }
    }
};

