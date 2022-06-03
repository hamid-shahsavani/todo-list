let todoInput = document.querySelector('#todo-input');
let addTodoBtn = document.querySelector('#todo-add');
let taskList = document.querySelector('#todo-list');
let selectButton = document.querySelector('#todo-select');
let removeTask = document.querySelector('.task-remove');
let completeTask = document.querySelector('.task-complete');

// add localStorage todo to dom

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
todos.forEach((i) => {
  let parent = document.createElement('li');
  parent.classList.add(... ['w-full', 'relative']);
  const tag = `<div class="bg-[#5014B8] transition-colors w-full h-12 rounded-md px-4 flex items-center">
  <p>${i}</p>
  </div>
  <button class="absolute top-3 right-3">
  <img id="todo-remove" src="assets/img/remove.svg" class="h-6 w-6" alt="">
  </button>
  <button class="absolute top-3 right-10">
  <img id="todo-complete" src="assets/img/complete.svg" class="h-6 w-6" alt="">
  </button>`;
  parent.innerHTML = tag;
  taskList.appendChild(parent);
});

// add todo

addTodoBtn.addEventListener('click',(e)=>{
  if(todoInput.value === ''){
    return;
  }
  e.preventDefault();
  let parent = document.createElement('li');
  parent.classList.add(... ['w-full', 'relative']);
  const tag = `<div class="bg-[#5014B8] transition-colors w-full h-12 rounded-md px-4 flex items-center">
  <p>${todoInput.value}</p>
  </div>
  <button class="absolute top-3 right-3">
  <img id="todo-remove" src="assets/img/remove.svg" class="h-6 w-6" alt="">
  </button>
  <button class="absolute top-3 right-10">
  <img id="todo-complete" src="assets/img/complete.svg" class="h-6 w-6" alt="">
  </button>`;
  parent.innerHTML = tag;
  taskList.appendChild(parent);
  saveToLocalStorage(todoInput.value);
  todoInput.value = "";
});

// remove and mark todo

taskList.addEventListener('click',(e) => {
  if(e.target.id === "todo-remove"){
    e.target.parentElement.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.parentElement.children[0].children[0].innerHTML);
  } else if( e.target.id === "todo-complete"){
    e.target.parentElement.parentElement.classList.toggle('!brightness-75');
    e.target.parentElement.parentElement.children[0].children[0].classList.toggle('!blur-[2px]');
  }
});

// filter mark task

selectButton.addEventListener('click',(e) => {
  const tasks = [...taskList.childNodes];
  tasks.forEach((task)=> {
    console.log(task);
    task.classList.remove('hidden');
    task.classList.add('block');
    switch(e.target.value){
      case 'complete':
        if(task.classList.contains('!brightness-75')){
          task.classList.add('hidden');
        }
        break;
      case 'uncomplete':
        if(!task.classList.contains('!brightness-75')){
          task.classList.add('hidden');
        }
        break;
    }
  });
});

// save to local storage 

function saveToLocalStorage(todo) {
  let save = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  save.push(todo);
  localStorage.setItem('todos',JSON.stringify(save));
}

// remove from localStorage 

function removeFromLocalStorage(remove){
  let save = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  let detect = save.filter((i) => i !== remove);
  localStorage.setItem('todos',JSON.stringify(detect));
}