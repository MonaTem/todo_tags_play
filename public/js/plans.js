function renderTodos(selector) {
  const container = document.querySelector(selector);
  const PLAN_ID = planId();

  if (!PLAN_ID) { return null; }

  fetchTodos(PLAN_ID)
    .then(templateTodos)
    .then((todos) => {
      console.log(todos)
      todos.forEach(todo => container.appendChild(todo))
    });
}

function planId() {
  const PLAN_ID = /^\/plans\/(\d+)\/?/;
  const match = PLAN_ID.exec(window.location.pathname);

  if (!match) { return null; }

  return match[1];
}

function fetchTodos(planId) {
  console.log('fetching')
  return fetch(`/plans/${planId}/todos`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(res => res.json());
}

function templateTodos(todos) {
  return todos.map(todo => createEl(
    'div', {
      className: 'todo-item',
      children: [
        createEl('h3', { text: todo.title }),
        createEl('p', { text: todo.description })
      ]
    }
  ));
}

/*
  createEl is a simple function to assist in creating DOM elements

  @param tagName the name of the tag to create
  @param options an object of class, text, or children
*/
function createEl(tagName, { className = '', text = '', children = []} ) {
  const el = document.createElement(tagName);

  el.appendChild(document.createTextNode(text));
  el.setAttribute('class', className);
  children.forEach(child => el.appendChild(child));

  return el;
}
