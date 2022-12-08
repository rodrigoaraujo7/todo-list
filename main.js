// html elements
const inputElement   = document.querySelector('[data-task-input]');
const addTaskButton  = document.querySelector('[data-task-button]');
const tasksContainer = document.querySelector('[data-tasks-container]'); 

// (* !IMPORTANT -> beginner method to return true or false in a function *)
// const validateInput = () => {
//     if(inputElement.value.trim().length > 0) {
//         return true
//     } else {
//         return false
//     }
// }

// automatically this return true or false in a unique line
const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();
    // console.log(inputIsValid)

    if(!inputIsValid) // if validateInput return FALSE
        return inputElement.classList.add('error') // break the code

    // if validateInput return TRUE
    const taskItemContainer = document.createElement('div'); // creating new HTML elements
    taskItemContainer.classList.add('task-item');
        // (* children elements *)

        // paragraph with content
        const taskContent     = document.createElement('p');
        taskContent.innerText = inputElement.value; // receives the input content

        taskContent.addEventListener('click', () => handleClick(taskContent));
        
        // delete icon
        const deleteItem = document.createElement('i'); // font-awesome icon
        deleteItem.classList.add('fa-solid');
        deleteItem.classList.add('fa-delete-left');

        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer); // container

    inputElement.value = ''; // removing the input content after add a new task

    updateLocalStorage(); // run local storage
}

// complete task function
const handleClick = (taskContent) => {
    // items of the list inside the <div class="tasks-container"></div>
    const tasks = tasksContainer.childNodes;

    for(const task of tasks) { // for each item
        // verify the clicked item
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if(currentTaskIsBeingClicked) { // toggle the 'completed' class
            task.firstChild.classList.toggle('completed')
        }
    }

    updateLocalStorage(); // run local storage
}

// delete task function
const handleDeleteClick = (taskItemContainer, taskContent) => {
    // items of the list inside the <div class="tasks-container"></div>
    const tasks = tasksContainer.childNodes;

    for(const task of tasks) { // for each item
        // verify the clicked item
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if(currentTaskIsBeingClicked) { // remove then
            taskItemContainer.remove();
        }
    }

    updateLocalStorage(); // run local storage
}

const handleInputChange = () => { // remove input error tag
    const inputIsValid = validateInput();

    if(inputIsValid)
        return inputElement.classList.remove('error') 
}

addTaskButton.addEventListener('click', () => handleAddTask()) // add 'error' class
inputElement.addEventListener('change', () => handleInputChange()) // remove 'error' class

// (* Local Storage *)
const updateLocalStorage = () => {
    const tasks            = tasksContainer.childNodes;

    const localStorageTasks = [... tasks].map(task => {
        const content     = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return {description: content.innerText, isCompleted: isCompleted}
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}