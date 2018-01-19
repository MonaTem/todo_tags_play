const knex = require("../db");

// CREATE A todo
function createTodo({ body: { title, description } }) {
  return knex("todos")
    .returning("*")
    .insert({ title, description });
}

// Find all
function findTodos() {
  return knex("todos");
}

// Find one
function findTodo({ params: { id } }) {
  return knex("todos").where("id", id);
}

// Update
function updateTodo({ params: { id }, body: { title, description } }) {
  return knex("todos")
    .where("id", id)
    .returning("*")
    .update({ title, description });
}

// Destroy
function destroyTodo({ params: { id } }) {
  return knex("todos")
    .where("id", id)
    .del();
}

module.exports = {
  createTodo,
  findTodos,
  findTodo,
  updateTodo,
  destroyTodo
};
