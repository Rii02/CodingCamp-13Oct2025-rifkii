// Database Simulation
let taskDb = [];
let isFiltered = false; // Track filter state

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
        updateFilterButton();
    }
}

// Render Function
function renderTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">
                    No tasks added yet. Start by adding your first task!
                </td>
            </tr>`;
        return;
    }

    tasks.forEach((taskObj, index) => {
        taskList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${taskObj.task}</td>
                <td>${taskObj.date}</td>
                <td>
                    <button class="btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick="deleteTask(${index})">
                        Delete
                    </button>
                </td>
            </tr>`;
    });
}

// Delete Single Task Function
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        taskDb.splice(index, 1);
        
        // Refresh to show all tasks after delete
        isFiltered = false;
        renderTasks(taskDb);
        updateFilterButton();
    }
}

// Delete All Function
function deleteAll() {
    if (taskDb.length === 0) {
        alert("No tasks to delete!");
        return;
    }
    
    if (confirm("Are you sure you want to delete all tasks?")) {
        taskDb = [];
        isFiltered = false;
        renderTasks(taskDb);
        updateFilterButton();
    }
}

// Filter Function
function filter() {
    // Ambil keyword task dan tanggal dari user
    const keyword = prompt("Filter by task (kosongkan jika tidak perlu):");
    const filterDate = prompt("Filter by date (YYYY-MM-DD) (kosongkan jika tidak perlu):");

    // Handle cancel button
    if (keyword === null || filterDate === null) {
        return;
    }

    const keywordLower = keyword.toLowerCase().trim();
    const dateTrim = filterDate.trim();

    // Lakukan filter berdasarkan input
    const filteredTasks = taskDb.filter(taskObj => {
        const matchKeyword = keywordLower === '' || taskObj.task.toLowerCase().includes(keywordLower);
        const matchDate = dateTrim === '' || taskObj.date === dateTrim;
        return matchKeyword && matchDate;
    });

    // Render hasil filter
    renderTasks(filteredTasks);
    isFiltered = true;
    updateFilterButton();
    
    // Info hasil filter
    if (filteredTasks.length === 0) {
        alert("No tasks match your filter criteria.");
    }
}

// Refresh Filter Function
function refreshFilter() {
    isFiltered = false;
    renderTasks(taskDb);
    updateFilterButton();
}

// Update Filter Button Text
function updateFilterButton() {
    const filterBtn = document.getElementById("filter-btn");
    const refreshBtn = document.getElementById("refresh-btn");
    
    if (isFiltered) {
        refreshBtn.style.display = 'inline-block';
    } else {
        refreshBtn.style.display = 'none';
    }
}

// Validation Function
function validateInput(task, date) {
    if (task.trim() === "" || date.trim() === "") {
        alert("Please enter both task and date.");
        return false;
    }
    return true;
}

// Event listener untuk tombol filter
document.getElementById("filter-btn").addEventListener("click", filter);

// Event listener untuk tombol refresh
document.getElementById("refresh-btn").addEventListener("click", refreshFilter);

// Initialize
updateFilterButton();