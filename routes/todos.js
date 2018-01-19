/*
  RESTful todos
*/
const app = require("express").Router();

const {
  createTodo,
  findTodos,
  findTodo,
  updateTodo,
  destroyTodo
} = require("../models/todos");

/*
  http --json \
    GET 'http://localhost:8000/todos'
*/
app.get("/", (req, res) => {
  findTodos(req).then(todos => {
    res.format({
      "text/html": () => res.render("todos/index", { todos }),
      "application/json": () => res.json(todos)
    });
  });
});

app.get("/new", (req, res) => {
  res.render("todos/new");
});

/*
  http --json \
    GET 'http://localhost:8000/todos/1'
*/
app.get("/:id", (req, res) => {
  findTodo(req).then(todos => {
    const todo = todos[0];

    res.format({
      "text/html": () => res.render("todos/show", { todo }),
      "application/json": () => res.json(todo)
    });
  });
});

/*
  http --json \
    POST 'http://localhost:8000/todos' \
    title='A Short Title' description='A short description.'
*/
app.post("/", (req, res) => {
  createTodo(req).then(todos => {
    const todo = todos[0];

    res.format({
      "text/html": () => res.redirect(`/todos/${todo.id}`),
      "application/json": () => res.json(todo)
    });
  });
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

module.exports = app;
