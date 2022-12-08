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
}

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if(currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('completed')
        }
    }
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if(currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }
}

const handleInputChange = () => { // remove input error tag
    const inputIsValid = validateInput();

    if(inputIsValid)
        return inputElement.classList.remove('error') 
}

addTaskButton.addEventListener('click', () => handleAddTask()) // add 'error' class
inputElement.addEventListener('change', () => handleInputChange()) // remove 'error' class