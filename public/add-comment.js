const form = document.querySelector("form#comment-form")

const urlString = window.location.toString().split("/")
const id = urlString[urlString.length -1]
console.log(id)

const submitForm = (e) => {
    e.preventDefault()
    const text = form.text.value


    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({text, post_id: id}),
        headers:  {
            "Content-type": "application/json"
        }
    }).then(response => {
        console.log(response)
        if(response.ok) {
            document.location.reload()
        } else {
            alert(`${response.statusText}`);
        }
    }).catch(err => console.log(err))
}

form.addEventListener("submit", submitForm)