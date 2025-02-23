let selectedColor = "";
document.addEventListener("DOMContentLoaded", loadNotes);

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

    let note = {
        id: Date.now(),
        title: title,
        content: content,
        color: selectedColor,
        time: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    };

    saveNoteToLocalStorage(note);
    displayNote(note);

    // Hide input and clear fields
    document.getElementById("noteInputCard").classList.add("hidden");
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";

    checkEmptyMessage();
});

function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(displayNote);
    checkEmptyMessage();
}

function displayNote(note) {
    let noteCard = document.createElement("div");
    noteCard.classList.add("note-card");
    noteCard.style.backgroundColor = note.color;
    noteCard.setAttribute("data-id", note.id); 

    noteCard.innerHTML = `
        <h5>${note.title}</h5>
        <p>${note.content}</p>
        <p class="small">${note.time}</p>
        <span class="edit-btn">✏️</span>
        <span class="delete-btn">🗑️</span>
    `;

    noteCard.querySelector(".delete-btn").addEventListener("click", function () {
        removeNoteFromLocalStorage(note.id);
        noteCard.remove();
        checkEmptyMessage();
    });

    noteCard.querySelector(".edit-btn").addEventListener("click", function () {
        document.getElementById("noteTitle").value = note.title;
        document.getElementById("noteContent").value = note.content;
        document.getElementById("noteInputCard").classList.remove("hidden");
        removeNoteFromLocalStorage(note.id);
        noteCard.remove();
        checkEmptyMessage();
    });

    document.getElementById("notesContainer").appendChild(noteCard);
}

function removeNoteFromLocalStorage(noteId) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function checkEmptyMessage() {
    let container = document.getElementById("notesContainer");
    let emptyMessage = document.getElementById("emptyMessage");
    emptyMessage.style.display = container.children.length === 0 ? "block" : "none";
}
