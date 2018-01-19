const app = require("express").Router();
const knex = require("../db");

/*
  RESTful todos
*/

/*
  http --json \
    GET 'http://localhost:8000/todos'
*/
/*
app.get("/", (req, res) => {
  findTodos(req).then(todos => res.json(todos));
});
*/


app.get("/", (req, res) => {
  findTodos(req).then(todos => {
    res.format({
      'text/html': () =>  res.render('todos/index', { todos }),
      'application/json': () => res.json(todos)
    })
  });
});

app.get("/new", (req, res) => {
});

/*
  http --json \
    GET 'http://localhost:8000/todos/1'
*/
app.get("/:id", (req, res) => {
  findTodo(req).then(todos => res.json(todos[0]));
});

/*
  http --json \
    POST 'http://localhost:8000/todos' \
    title='A Short Title' description='A short description.'
*/
app.post("/", (req, res) => {
  createTodo(req).then(todos => res.json(todos[0]));
});

/*
  http --json \
    PATCH 'http://localhost:8000/todos/1' \
    title='COOOL!' description='WOOT!'
*/
app.patch("/:id", (req, res) => {
  updateTodo(req).then(todos => res.json(todos[0]));
});

/*
  http --json \
    DELETE 'http://localhost:8000/todos/1'
*/
app.delete("/:id", (req, res) => {
  destroyTodo(req).then(() => res.sendStatus(204));
});

/********** HELPER FUNCTIONS ************/

// CREATE A todo
function createTodo({ body: { title, description } }) {
  return knex("todos")
    .returning("*")
    .insert({ title, description });
}

// Find all
function findTodos() {
  return knex('todos');
}

// Find one
function findTodo({params: { id }}) {
  return knex('todos').where('id', id);
}

// Update
function updateTodo({
  params: { id },
  body: { title, description },
}) {
  return knex('todos')
    .where('id', id)
    .returning('*')
    .update({title, description});
}

// Destroy
function destroyTodo({params: { id }}) {
  return knex('todos')
    .where('id', id)
    .del();
}

module.exports = app;
