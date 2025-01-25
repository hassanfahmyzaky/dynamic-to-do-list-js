// Wait for the DOM to fully load before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the input value

        // Check if the task input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item and remove button
        const newTask = document.createElement('li');
        newTask.textContent = taskText; // Set the text content to the task

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Add styling class

        // Add event listener to the remove button
        removeButton.addEventListener('click', function() {
            taskList.removeChild(newTask); // Remove the task when the button is clicked
        });

        // Append the remove button to the new task
        newTask.appendChild(removeButton);

        // Append the new task to the task list
        taskList.appendChild(newTask);

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Allow tasks to be added by pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
