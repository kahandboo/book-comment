const titleInput = document.getElementById("bookTitleInput");
const authorInput = document.getElementById("bookAuthorInput");
const commentInput = document.getElementById("bookCommentInput");
const autocompleteList = document.getElementById("autocompleteList");
const button = document.getElementById("addBtn");
const list = document.getElementById("movieList");
const errorInput = document.getElementById("errorInput");

titleInput.addEventListener("keyup", async (e) => {
    const query = titleInput.value.trim();

    if (query.length < 2) {
        autocompleteList.innerHTML = "";
        return;
    }

    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}`);
        const data = await res.json();

        autocompleteList.innerHTML = "";

        const books = data.items?.slice(0, 5) || [];
        books.forEach(book => {
            const title = book.volumeInfo.title || "제목 없음";
            const authors = book.volumeInfo.authors?.join(", ") || "저자 미상";

            const li = document.createElement("li");
            li.textContent = `${title} - ${authors}`;

            li.addEventListener("click", () => {
                titleInput.value = title;
                authorInput.value = authors;
                autocompleteList.innerHTML = "";
            });

            autocompleteList.appendChild(li);
        });
    } catch (err) {
        console.error("책 검색 중 오류 발생:", err);
    }
});

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