let tasks = [];

function displayTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.classList = 'tasksContainer';
    tasksContainer.innerHTML = '';
    if (tasks.length == 0) {
        tasksContainer.innerHTML = `<h3>No tasks are available...</h3>`;
    }
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        const completedStatus = task.completed ? 'Completed' : 'Uncompleted';
        taskItem.innerHTML = `
      <h2>${task.title}</h2>
      <p><strong>Deadline:</strong> ${task.deadline}</p>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Status:</strong> ${completedStatus}</p>
      <button onclick="editTask(${task.id})">Edit</button>
      <button style="margin-top:10px;"  onclick="deleteTask(${task.id})">Delete</button>
    `;
        tasksContainer.appendChild(taskItem);
    });
}

document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const titleInput = document.getElementById('titleInput').value;
    const deadlineInput = document.getElementById('deadlineInput').value;
    const descriptionInput = document.getElementById('descriptionInput').value;
    const completedInput = document.getElementById('completedInput').checked;

    const newTask = {
        id: tasks.length + 1,
        title: titleInput,
        deadline: deadlineInput,
        description: descriptionInput,
        completed: completedInput
    };
    tasks.push(newTask);
    displayTasks();
    document.getElementById('titleInput').value = '';
    document.getElementById('deadlineInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('completedInput').checked = false;
});

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

function editTask(taskId) {
    let taskName = prompt('Which property you want to change : ').toLowerCase();
    if (taskName === 'status') {
        let property = tasks[taskId - 1].completed;
        if (property) {
            tasks[taskId - 1].completed = false;
        }
        else {
            tasks[taskId - 1].completed = true;
        }
        displayTasks();
        return;
    }
    let property;
    if (taskName === 'deadline') {
        property = prompt('Enter date in yyyy/mm/dd : ');
    } else {
        property = prompt(`Enter new value of ${taskName} : `);
    }
    if (taskName === 'id') {
        tasks[taskId - 1].id = property;
    } else if (taskName === 'title') {
        tasks[taskId - 1].title = property;
    } else if (taskName === 'deadline') {
        tasks[taskId - 1].deadline = property;
    } else if (taskName === 'description') {
        tasks[taskId - 1].description = property;
    }
    displayTasks();
}

function searchTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchInput));
    displayFilteredTasks(filteredTasks);
}

function filterTasks() {
    const filterSelect = document.getElementById('filterSelect');
    const filterValue = filterSelect.value;

    let filteredTasks = [];
    if (filterValue === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filterValue === 'uncompleted') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }
    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(filteredTasks) {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.classList = 'tasksContainer';
    tasksContainer.innerHTML = '';
    if (tasks.length == 0) {
        tasksContainer.innerHTML = `<h3>No tasks are available...</h3>`;
    }
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        const completedStatus = task.completed ? 'Completed' : 'Uncompleted';
        taskItem.innerHTML = `
      <h2>${task.title}</h2>
      <p><strong>Deadline:</strong> ${task.deadline}</p>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Status:</strong> ${completedStatus}</p>
      <button onclick="editTask(${task.id})">Edit</button>
      <button style="margin-top:10px;" onclick="deleteTask(${task.id})">Delete</button>
    `;
        tasksContainer.appendChild(taskItem);
    });
}

displayTasks();
