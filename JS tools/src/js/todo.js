let totalTasks = 3; // initial tasks in HTML
let completedTasks = 0;

counterUpdate();

// append a new todo item to the list
function newTodoItem() {
    const todoList = document.getElementById('todo-list');
    const newItem = document.createElement('li');
    const inputValue = document.getElementById('new-todo').value.trim();

    if (inputValue === '') {
        console.log("Empty todo item, not adding.");
        return;
    }

    newItem.textContent = inputValue;
    todoList.appendChild(newItem);
    document.getElementById('new-todo').value = ''; // clear input field

    totalTasks = totalTasks +1;
}

document.getElementById('add-todo').addEventListener('click', () => {
    newTodoItem();
    counterUpdate();
});

document.getElementById('new-todo').onkeydown = function(event) {
    if (event.key === "Enter") {
        newTodoItem();
        counterUpdate();
    }
}

// Click on a todo item to toggle its completion status
document.getElementById('todo-list').addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        if (event.target.classList.contains('completed')) {
            event.target.classList.remove('completed');
            completedTasks = completedTasks -1;
        }else {
            event.target.classList.add('completed');
            completedTasks = completedTasks + 1;
        }
    }
    counterUpdate();
});

// Checking off moves the item to the bottom

// show a X button on hover to delete the item
//TODO: make all ul li have position relative, and the delete button position absolute to the right
    // also make the delete button exist for all, but hidden, and only show on hover
document.getElementById('todo-list').addEventListener('mouseover', (event) => {
    if (event.target.tagName === 'LI') {
        let deleteBtn = event.target.querySelector('.delete-btn');
        if (!deleteBtn) {
            deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the LI click event
                if (event.target.classList.contains('completed')) {
                    event.target.classList.remove('completed');
                    completedTasks = completedTasks -1;
                }
                event.target.remove();
                totalTasks= totalTasks -1;
                counterUpdate();
            });
            event.target.appendChild(deleteBtn);
        }
        deleteBtn.style.display = 'inline';
    }
});

document.getElementById('todo-list').addEventListener('mouseout', (event) => {
    if (event.target.tagName === 'LI') {
        const deleteBtn = event.target.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.style.display = 'none';
        }
    }
});


// Add a counter for total and completed tasks


// update task counters
function counterUpdate() {
    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    console.log("updated counter!")
};
