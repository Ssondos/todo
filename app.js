const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const fileroption = document.querySelector('.todo-filter');


todobutton.addEventListener("click",addtodo);
todolist.addEventListener("click",deletcheck);
fileroption.addEventListener("click",filtertodo );
document.addEventListener("DOMContentLoaded", gettodos);


function addtodo(event){
    event.preventDefault();
    //todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
   
   
   //create li
    const newtodo = document.createElement('li');
    newtodo.innerText = todoinput.value;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
   
   
    //ADD TODO TO LOCALSTORGE
   savelocaltodos(todoinput.value); 
   
    //check button
    const check = document.createElement('button');
    check.classList.add("check-btn");
    check.innerHTML = '<i class="fas fa-check"></i>';
    tododiv.appendChild(check);
   
    //delet button
    const trash = document.createElement('button');
    trash.classList.add("trash-btn");
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    tododiv.appendChild(trash);
    //add tododiv l todolist
    todolist.appendChild(tododiv);
    //clear
    todoinput.value="";
   }
   function deletcheck(e) {
       const item =e.target;
       //deleeet
       if(item.classList[0] === 'trash-btn'){
           const todo = item.parentElement;
           todo.classList.add("fall");
           removeLocalTodos(todo);
           todo.addEventListener('transitionend', function(){
               todo.remove();
           })
       }
       //check
       if(item.classList[0] === 'check-btn'){
           const todo = item.parentElement;
          todo.classList.toggle('completed');
       }
   }
   function filtertodo (e){
       const todos = todolist.childNodes;
       todos.forEach(function(todo) {
           switch(e.target.value) {
               case "all":
               todo.style.display ="flex";
               break;
               case "completed":
                   if (todo.classList.contains ("completed")) {
                       todo.style.display = "flex";
                   } else{
                       todo.style.display ="none";
                   }
               break;
               case "uncompleted":
                   if (todo.classList.contains ("completed")){
                       todo.style.display ="none";
                   }else{
                       todo.style.display ="flex";
                   }
   
           }
       })
   }
   
   function savelocaltodos(todo){
       let todos;
       if(localStorage.getItem("todos") === null){
           todos = [];
       }else {
           todos = JSON.parse(localStorage.getItem("todos"));
       }
       todos.push(todo);
       localStorage.setItem("todos",JSON.stringify(todos));
   }
   function gettodos(){
       let todos;
       if(localStorage.getItem("todos") === null){
           todos = [];
       }else {
           todos = JSON.parse(localStorage.getItem("todos"));
       }
      todos.forEach(function(todo){
          //todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
   
   
   //create li
    const newtodo = document.createElement('li');
    newtodo.innerText = todo;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
   
   
    //ADD TODO TO LOCALSTORGE
   savelocaltodos(todoinput.value); 
   
    //check button
    const check = document.createElement('button');
    check.classList.add("check-btn");
    check.innerHTML = '<i class="fas fa-check"></i>';
    tododiv.appendChild(check);
   
    //delet button
    const trash = document.createElement('button');
    trash.classList.add("trash-btn");
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    tododiv.appendChild(trash);
    //add tododiv l todolist
    todolist.appendChild(tododiv);
      });
   }
   function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


 
