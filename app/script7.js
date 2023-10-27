document.getElementById("submitComment").addEventListener("click", function() {
    const ratingValue = document.getElementById("rating").value;
    const commentValue = document.getElementById("comment").value.trim();

    if (commentValue) {
        const displayComments = document.getElementById("displayComments");
        const newComment = document.createElement("div");
        newComment.innerHTML = `<strong>Rating:</strong> ${ratingValue} <br> <strong>Comment:</strong> ${commentValue} <hr>`;
        displayComments.appendChild(newComment);
    }
});
