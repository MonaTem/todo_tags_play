function handleSubmit(selector, todosCon) {
  const form = document.querySelector(selector);
  const container = document.querySelector(todosCon);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    createAndAppend(form, container);
  });
}

function createAndAppend(form, container) {
  const newTodo = entriesToObject(extractFormEntries(form));

  createTodo(planId(), newTodo)
    .then(todo => templateTodos([todo])[0])
    .then(todo => container.appendChild(todo))
    .then(() => form.reset())
}

function createTodo(plan_id, data) {
  return fetch(`/plans/${plan_id}/todos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function entriesToObject(entries) {
  const obj = {};

  for (let [key, value] of entries) {
    obj[key] = value;
  }

  return obj;
}

function extractFormEntries(form) {
  return new FormData(form).entries();
}




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
