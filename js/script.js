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
        taskInput.value = '';
        dateInput.value = '';
        renderTasks(taskDb);
    }
}

// Render Function
function renderTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<li>No Tasks Found</li>';
        return;
    }

    tasks.forEach((taskObj, index) => {
        taskList.innerHTML += `
            <li>${taskObj.task} - ${taskObj.date}</li>`;
    });
}

// Delete Function
function deleteAll() {
    taskDb = [];
    renderTasks(taskDb);
}

//  Filter Function
function filter() {
    // Ambil keyword task dan tanggal dari user
    const keyword = prompt("Filter by task (kosongkan jika tidak perlu):")?.toLowerCase().trim();
    const filterDate = prompt("Filter by date (YYYY-MM-DD) (kosongkan jika tidak perlu):")?.trim();

    // Lakukan filter berdasarkan input
    const filteredTasks = taskDb.filter(taskObj => {
        const matchKeyword = keyword === '' || taskObj.task.toLowerCase().includes(keyword);
        const matchDate = filterDate === '' || taskObj.date === filterDate;
        return matchKeyword && matchDate;
    });

    // Render hasil filter
    renderTasks(filteredTasks);
}

// Validation Function
function validateInput(task, date) {
    if (task.trim() === "" || date.trim() === "") {
        alert("Please enter both task and date.");
        return false;
    }
    return true;
}

// 🪄 Event listener untuk tombol filter
document.getElementById("filter-btn").addEventListener("click", filter);
