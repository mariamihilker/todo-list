//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Eventlisteners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click',addTodo); 
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions

//Add todo
function addTodo(e) {
    e.preventDefault();

    //add div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //create li
    const newTodo = document.createElement('li')
    if(todoInput.value != 0) {
        //get input value
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        //add local storage
        saveLocalTodos(todoInput.value)
        //checkButton
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);
        
        //remove Button
        const trashdButton = document.createElement('button')
        trashdButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashdButton.classList.add('trash-btn')
        todoDiv.appendChild(trashdButton);

        //add item in ul
        todoList.appendChild(todoDiv)
        todoInput.value = '';
}
}

//delete and check item

function deleteCheck(e) {
    let item = e.target;

    //delete
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
        
    }
    //checkark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}


function filterTodo(e) {
    const todos = todoList.children;
    
    Array.prototype.forEach.call(todos, todo => {
        console.log(e.target.value)
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
            if(todo.classList.contains('completed')) {
                todo.style.display = 'flex'
            } else {
                todo.style.display = 'none'
            }
            break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none'
                }
            break;    
        }
    });

}

//save local todos

function saveLocalTodos(todo) {
    //check -- if we have already todos
    let todos;
    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

//Get todos from local storage

function getTodos() {
    
    let todos;
    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {
        
    //add div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //create li
    const newTodo = document.createElement('li')
    if(todo != 0) {
        //get input value
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);

        //checkButton
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);
        
        //remove Button
        const trashdButton = document.createElement('button')
        trashdButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashdButton.classList.add('trash-btn')
        todoDiv.appendChild(trashdButton);

        //add item in ul
        todoList.appendChild(todoDiv)
    }
})
}

//delete from local storage

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    console.log(todos.indexOf(todo.children[0].innerText))
    todos.splice(todos.indexOf(todoIndex) , 1)
    localStorage.setItem('todos',JSON.stringify(todos))
  
    

}