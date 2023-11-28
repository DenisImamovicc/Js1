const finishedTodoListEl = document.querySelector("#finishedTodoList");
const unfinishedTodoListEl = document.querySelector("#unfinishedTodoList");
const formCreateTodoEl = document.querySelector("#formCreateTodo");
const inputNewTodoTitleEl = document.querySelector("#inputNewTodoTitle");

// List of todos
const todos = [
  { id: 1, title: "Learn basic JavaScript", completed: true },
  { id: 2, title: "Learn Array Methods", completed: false },
  { id: 3, title: "Take over the world", completed: false },
];

formCreateTodoEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoTitle = inputNewTodoTitleEl.value;

  if (newTodoTitle === "" || checkDupes(newTodoTitle)) {
    return alert("Lazy boy!,you can't have nothing todo.*whipped noises*");
  }

  const newTodo = {
    title: newTodoTitle,
    completed: false,
  };

  todos.push(newTodo);

  renderTodos();

  inputNewTodoTitleEl.value = "";
});

unfinishedTodoListEl.addEventListener("click", (e) => toggleTodoCompletion(e.target));
unfinishedTodoListEl.addEventListener("click", (e) =>
  e.target.id === "deleteBtn" ? removeTodo(e.target.parentElement) : ""
);

finishedTodoListEl.addEventListener("click", (e) => toggleTodoCompletion(e.target));
finishedTodoListEl.addEventListener("click", (e) =>
  e.target.id === "deleteBtn" ? removeTodo(e.target.parentElement) : ""
);

const handleClassnameAssign = (el, classname) => {
  return el.classList[1]
    ? el.classList.remove(classname)
    : el.classList.add(classname);
};

const checkDupes = (inputTitle) => {
  return todos.find((todo) => {
    if (inputTitle === todo.title) {
      return true;
    } else {
      return false;
    }
  });
};

const removeTodo = (todo) => {
  const chosenTitle = todo.childNodes[0].textContent.trim();
  todos.find((todo, index) => {
    if (todo.title === chosenTitle) {
      return todos.splice(index, 1);
    }
  });
  console.log(todos);
  todo.remove();
  renderTodos();
};

const toggleTodoCompletion = (chosenTodo) => {
  const chosenTodoTitle = chosenTodo.childNodes[0].textContent.trim();
  todos.find((todo) => {
    if (todo.title === chosenTodoTitle) {
      handleClassnameAssign(chosenTodo, "completed");
      return (todo.completed = !todo.completed);
    }
  });
  renderTodos();
};

const renderTodos = () => {
  unfinishedTodoListEl.innerText = "";
  finishedTodoListEl.innerText = "";

  const sortedTodos = sortTodosAlphabetically(todos);

  sortedTodos.forEach((todo) => {
    const completedTodo = todo.completed ? "completed" : "";

    if (completedTodo) {
      finishedTodoListEl.innerHTML += `
			<li class="list-group-item ${completedTodo}" id="todo">
				${todo.title}
        <button class="" id="deleteBtn">🚮</button>
			</li>
		`;
    } else {
      unfinishedTodoListEl.innerHTML += `
			<li class="list-group-item ${completedTodo}" id="todo">
				${todo.title}
        <button class="" id="deleteBtn">🚮</button>
			</li>
		`;
    }
  });
};

const sortTodosAlphabetically = (todolist) => {
  return todolist.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else if (a.title < b.title) {
      return 1;
    } else {
      return 0;
    }
  });
};

renderTodos();
