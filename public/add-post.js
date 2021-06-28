const form = document.querySelector("section form#new-post")

const submitForm = (e) => {
    e.preventDefault()

    const title = form.title.value
    const content = form.content.value

    console.log(title, content)
    fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({title: title, content: content}),
        headers:  {
            "Content-type": "application/json"
        }
    }).then(response => {
        console.log(response)
        if(response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert(`${response.statusText}`);
        }
    }).catch(err => console.log(err))
}

form.addEventListener("submit", submitForm)