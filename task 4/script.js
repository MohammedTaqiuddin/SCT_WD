let tasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  if (!title) return alert("Task title is required");

  tasks.push({ title, date, time, completed: false });
  renderTasks();
  clearForm();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const taskDetails = document.createElement("div");
    taskDetails.className = "task-details";
    taskDetails.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.date || ""} ${task.time || ""}
    `;

    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.innerHTML = `
      <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Done'}</button>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;

    li.appendChild(taskDetails);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  const newTitle = prompt("Edit task title:", task.title);
  if (newTitle !== null) task.title = newTitle;

  const newDate = prompt("Edit date (YYYY-MM-DD):", task.date);
  if (newDate !== null) task.date = newDate;

  const newTime = prompt("Edit time (HH:MM):", task.time);
  if (newTime !== null) task.time = newTime;

  renderTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";
}
