console.log('Write your code here');

fetch("http://localhost:3000/current-exhibits")
.then(response => response.json())
.then(art => {
    displayArt(art[0]);
})

const displayArt = (art) => {
    document.querySelector("#exhibit-title").textContent = art.title;
    document.querySelector("#exhibit-description").textContent = art.description;
    document.querySelector("#exhibit-image").src = art.image;

    const displayComments = document.querySelector("#comments-section");
    const commentsArr = art.comments;
    commentsArr.forEach(element => {
        const p = document.createElement("p");
        p.textContent = element;
        displayComments.append(p);
    })
    document.querySelector("#comment-form").addEventListener("submit", event => {
        event.preventDefault();
        const comment = document.getElementById("comment-form")["comment-input"].value;
        commentsArr.push(comment);
        const p = document.createElement("p");
        p.textContent = comment;
        displayComments.append(p);
        fetch("http://localhost:3000/current-exhibits/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                comments: commentsArr,
            })
        });
    })
    let tickets = document.querySelector("#tickets-bought").innerHTML.slice(0, -15);
    document.querySelector("#buy-tickets-button").addEventListener("click", event => {
        document.querySelector("#tickets-bought").textContent = `${++tickets} Tickets Bought`;
        fetch("http://localhost:3000/current-exhibits/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                ["tickets_bought"]: tickets,
            })
        });
    });
}