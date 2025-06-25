const taskInput = document.querySelector(".task-input input"),
    taskBox = document.querySelector(".task-box"),
    clearBtn = document.querySelector(".clear-btn"),
    filterButtons = document.querySelectorAll(".filters span");

let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

function showTodo(filter = "all") {
    let li = "";
    todos.forEach((todo, id) => {
        if (filter === "all" || filter === todo.status) {
            li += `
            <li class="task">
                <label for="task-${id}">
                    <input type="checkbox" id="task-${id}" ${todo.status === "completed" ? "checked" : ""} onchange="updateStatus(${id})">
                    <p class="${todo.status === "completed" ? "completed" : ""}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i class="fa-solid fa-ellipsis"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id})"><i class="fa-solid fa-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="fa-regular fa-trash-can"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
        }
    });
    taskBox.innerHTML = li || "<p class='empty'>No tasks to show</p>";
}

// دالة لتحديث حالة المهمة
function updateStatus(id) {
    todos[id].status = todos[id].status === "pending" ? "completed" : "pending";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

// دالة لإضافة مهمة جديدة
taskInput.addEventListener("keyup", (e) => {
    let userTask = taskInput.value.trim();
    if (e.key === "Enter" && userTask) {
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

// دالة لحذف مهمة
function deleteTask(id) {
    todos.splice(id, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

// دالة لتعديل مهمة
function editTask(id) {
    let newTask = prompt("Edit your task:", todos[id].name);
    if (newTask) {
        todos[id].name = newTask.trim();
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
}

// دالة لحذف جميع المهام
clearBtn.addEventListener("click", () => {
    todos = [];
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
});

// إضافة وظائف التصفية
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".filters .active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

// عرض المهام عند تحميل الصفحة
showTodo();
