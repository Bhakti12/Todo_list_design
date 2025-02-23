let selectedColor = "";

document.getElementById("addNotebtn").addEventListener("click", function () {
    let palette = document.getElementById("colorPalette");
    palette.classList.toggle("hidden");
});

document.querySelectorAll(".color-circle").forEach(circle => {
    circle.addEventListener("click", function () {
        selectedColor = this.style.backgroundColor;
        let noteInputCard = document.getElementById("noteInputCard");
        noteInputCard.classList.remove("hidden");
        noteInputCard.style.backgroundColor = selectedColor;
    });
});

document.getElementById("saveNoteBtn").addEventListener("click", function () {
    let title = document.getElementById("noteTitle").value.trim();
    let content = document.getElementById("noteContent").value.trim();
    if (title === "" || content === "") {
        alert("Please enter a title and content.");
        return;
    }

    let noteCard = document.createElement("div");
    noteCard.classList.add("note-card");
    noteCard.style.backgroundColor = selectedColor;
    noteCard.innerHTML = `
        <h5>${title}</h5>
        <p>${content}</p>
        <p class="small">${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}</p>
        <span class="edit-btn">✏️</span>
        <span class="delete-btn">🗑️</span>
    `;

    noteCard.querySelector(".delete-btn").addEventListener("click", function () {
        noteCard.remove();
        checkEmptyMessage();
    });

    noteCard.querySelector(".edit-btn").addEventListener("click", function () {
        document.getElementById("noteTitle").value = title;
        document.getElementById("noteContent").value = content;
        document.getElementById("noteInputCard").classList.remove("hidden");
        noteCard.remove();
        checkEmptyMessage();
    });

    document.getElementById("notesContainer").appendChild(noteCard);
    document.getElementById("noteInputCard").classList.add("hidden");

    // Clear input fields
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";

    checkEmptyMessage();
});

function checkEmptyMessage() {
    let container = document.getElementById("notesContainer");
    let emptyMessage = document.getElementById("emptyMessage");
    emptyMessage.style.display = container.children.length === 0 ? "block" : "none";
}
