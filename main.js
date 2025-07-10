const titleInput = document.getElementById("bookTitleInput");
const authorInput = document.getElementById("bookAuthorInput");
const commentInput = document.getElementById("bookCommentInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("movieList");
const errorInput = document.getElementById("errorInput");


button.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const comment = commentInput.value.trim();

    if (title && comment) {
        const now = new Date();
        const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        
        const commentObj = {
            title,
            author,
            comment,
            date: dateStr
        };

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>📖 ${title}</strong><br>
            <span class="author">✍️ 저자: ${author}</span><br> 
            <div class="comment">💬 ${comment}</div>
            <div class="date">${dateStr}</div>`;
        list.appendChild(li);
        
        let commentList = JSON.parse(localStorage.getItem("commentList")) || [];
        commentList.push(commentObj);
        localStorage.setItem("commentList", JSON.stringify(commentList));

        titleInput.value = "";
        authorInput.value = "";
        commentInput.value = "";
        

        titleInput.style.border = "";
        commentInput.style.border = "";
        authorInput.style.border = "";
        errorInput.style.display = "none";
    } else {
        errorInput.style.display = "block";
        if (!title) titleInput.style.border = "2px solid red";
        if (!comment) commentInput.style.border = "2px solid red"
        if (!author) authorInput.style.border = "2px solid red";
    }
})

window.addEventListener("DOMContentLoaded", () => {
    const savedList = JSON.parse(localStorage.getItem("commentList")) || [];

    savedList.forEach(({ title, comment, date }) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>🎥 ${title}</strong><br>
            💬 ${comment}
            <div class="date">${date}</div>`;
        list.appendChild(li);
    });
});