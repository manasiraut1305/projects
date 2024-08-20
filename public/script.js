// public/script.js
document.getElementById('commentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const response = await fetch('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, comment }),
    });

    const data = await response.json();
    if (data.success) {
        displayComment(name, comment);
    } else {
        alert('Error saving comment');
    }
});

function displayComment(name, comment) {
    const commentsDiv = document.getElementById('comments');
    const newComment = document.createElement('div');
    newComment.innerHTML = `<strong>${name}</strong>: ${comment}`;
    commentsDiv.appendChild(newComment);
}
