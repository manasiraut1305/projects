document.getElementById('commentForm').addEventListener('submit', async (event) => {
    event.preventDefault();


    console.log("cout")
    //innertext - everything in div is taken in
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const prod = document.getElementById('3').innerText;

    const response = await fetch('/submit-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, comment, prod }),
    })

    .then(response => response.json())
    .then(data => {
                // Display the response message
                document.getElementById('responseMessage').textContent = data.message;
                
                // Display the corresponding image
                const imgElement = document.getElementById('responseImage');
                imgElement.src = data.image;
                imgElement.style.display = 'block';
            });
    document.getElementById('commentForm').reset();
});
