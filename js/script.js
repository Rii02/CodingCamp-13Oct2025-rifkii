// Database Simulation
let taskDb = [];

// Add Function
function addTask() {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("todo-date");

    if (validateInput(taskInput.value, dateInput.value)) {
        const newTask = {
            task: taskInput.value,
            date: dateInput.value,
        }
        taskDb.push(newTask);
        
        renderTasks();
    }
}

// Render Function
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    taskDb.forEach((taskObj, index) => {
        taskList.innerHTML += `
            <li>${taskObj.task} - ${taskObj.date}</li>`;
        
    }); 

}

// Delete Function
function deleteAll() {
    taskDb = [];
    renderTasks();
}

// Filter Function
function filter() {}

// Validation Function
function validateInput(task, date) {
    if (task.trim() === "" || date.trim() === "") {
        alert("Please enter both task and date.");
        return false;
    }
    return true;
}

