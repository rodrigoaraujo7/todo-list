// html elements
const inputElement  = document.querySelector('[data-task-input]');
const addTaskButton = document.querySelector('[data-task-button]');

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
}

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid)
        return inputElement.classList.remove('error') 
}

addTaskButton.addEventListener('click', () => handleAddTask()) // add 'error' class
inputElement.addEventListener('change', () => handleInputChange()) // remove 'error' class