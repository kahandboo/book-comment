const titleInput = document.getElementById("movieTitleInput");
const commentInput = document.getElementById("movieCommentInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("movieList");
const errorInput = document.getElementById("errorInput");


button.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const comment = commentInput.value.trim();

    if (title && comment) {
        const now = new Date();
        const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        
        const commentObj = {
            title,
            comment,
            date: dateStr
        };

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>🎥 ${title}</strong><br>
            💬 ${comment}
            <div class="date">${dateStr}</div>`;
        list.appendChild(li);
        
        let commentList = JSON.parse(localStorage.getItem("commentList")) || [];
        commentList.push(commentObj);
        localStorage.setItem("commentList", JSON.stringify(commentList));

        titleInput.value = "";
        commentInput.value = "";

        titleInput.style.border = "";
        commentInput.style.border = "";
        errorInput.style.display = "none";
    } else {
        errorInput.style.display = "block";
        if (!title) titleInput.style.border = "2px solid red";
        if (!comment) commentInput.style.border = "2px solid red"
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