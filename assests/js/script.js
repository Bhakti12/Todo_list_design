$(document).ready(function () {
    loadTasks();
    $('#addTask').click(function () {
        let taskText = $('#taskInput').val().trim();
        if (taskText !== "") {
            let createdAt = new Date().toLocaleString();
            addTask(taskText, createdAt, "", false);
            saveTasks();
            $('#taskInput').val("");
        }
    });

    $(document).on('click', '.task-text', function () {
        let parentLi = $(this).closest('li');
        let isCompleted = parentLi.hasClass('completed');

        if (!isCompleted) {
            let completedAt = new Date().toLocaleString();
            parentLi.find('.completed-time').text(`Completed at: ${completedAt}`);
            parentLi.addClass('completed');
        } else {
            parentLi.find('.completed-time').text("");
            parentLi.removeClass('completed');
        }

        saveTasks();
    });

    $(document).on('click', '.delete-btn', function () {
        $(this).closest('li').remove();
        saveTasks();
    });

    $(document).on('click', '.edit-btn', function () {
        let parentLi = $(this).closest('li');
        let taskTextElement = parentLi.find('.task-text');
        let currentText = taskTextElement.text();
        let newText = prompt("Edit your task:", currentText);
        if (newText !== null && newText.trim() !== "") {
            taskTextElement.text(newText);
            saveTasks();
        }
    });

    function addTask(taskText, createdAt, completedAt, isCompleted) {
        let taskItem = `
            <li class="${isCompleted ? 'completed' : ''}">
                <span class="task-text">${taskText}</span>
                <div class="task-time">${createdAt}</div>
                <div class="task-time completed-time">${isCompleted ? `Completed at: ${completedAt}` : ''}</div>
                <div class="task-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </li>
        `;
        $('#taskList').append(taskItem);
    }

    function saveTasks() {
        let tasks = [];
        $('#taskList li').each(function () {
            let taskText = $(this).find('.task-text').text();
            let createdAt = $(this).find('.task-time').first().text().replace("Added on: ", "");
            let completedAt = $(this).find('.completed-time').text().replace("Completed at: ", "");
            let isCompleted = $(this).hasClass('completed');
            tasks.push({ text: taskText, createdAt, completedAt, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => addTask(task.text, task.createdAt, task.completedAt, task.completed));
    }
});
