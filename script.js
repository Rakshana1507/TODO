let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return alert("Please enter a task!");

  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null
  };

  tasks.push(newTask);
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const textDiv = document.createElement("div");
    textDiv.className = "task-text";
    textDiv.innerHTML = `<strong>${task.text}</strong>
      <div class="task-meta">Created: ${task.createdAt}</div>
      ${task.completedAt ? `<div class="task-meta">Completed: ${task.completedAt}</div>` : ""}`;

    const btnDiv = document.createElement("div");
    btnDiv.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle";
    toggleBtn.innerText = task.completed ? "Undo" : "Done";
    toggleBtn.onclick = () => toggleComplete(task.id);

    btnDiv.append(toggleBtn, editBtn, deleteBtn);

    li.append(textDiv, btnDiv);

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit Task", task.text);
  if (newText && newText.trim() !== "") {
    task.text = newText.trim();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toLocaleString() : null;
  renderTasks();
}
