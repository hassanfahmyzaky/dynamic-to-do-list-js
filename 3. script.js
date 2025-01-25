document.addEventListener("DOMContentLoaded", function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        // Get tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // For each task, create a list item and append it to the DOM
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving to Local Storage again
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Check if task text is empty
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const newTask = document.createElement('li');
        newTask.textContent = taskText; // Set the text content of the task

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Add remove button styling class

        // Add event listener to remove the task
        removeButton.addEventListener('click', function() {
            removeTask(newTask, taskText);
        });

        // Append the remove button to the task
        newTask.appendChild(removeButton);

        // Append the task to the task list
        taskList.appendChild(newTask);

        // If save is true, update Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Function to remove a task from the DOM and Local Storage
    function removeTask(taskElement, taskText) {
        // Remove the task element from the list
        taskList.removeChild(taskElement);

        // Update the tasks in Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Allow tasks to be added by pressing "Enter"
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
