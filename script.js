
// declaration of variables

let addText = document.querySelector('.text'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

// declaration of array    
let todoList = [];
// takes out from array, elements in localStorage
if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

// declaration function button click
addButton.addEventListener("click", function(){
    // do not create empty lines
if(!addText.value) return;
// declaration new object with elements
    let newTodo = {
        todo: addText.value,
        checked: false,
        important: false
    };

    //add elements from object to array
        todoList.push(newTodo);
    // function display
        displayMessages();
        // save data, return string JSON format
        localStorage.setItem('todo', JSON.stringify(todoList));
        // clean input after adding some elements
        addText.value = '';
});    

//function iterates array
function displayMessages() {
    let displayMessage = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){

        // creates new elements li inside ul using class todo
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

// click check box display value label
todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML;
    
    todoList.forEach(function(item){
        if (item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });

});

//delete elements from todo list and make elements important in the list

todo.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  todoList.forEach(function (item, i) {
      // ctrl + right mouse button delete elements in list
    if (item.todo === event.target.innerHTML) {
      if (event.ctrlKey || event.metaKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }
      displayMessages();
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});