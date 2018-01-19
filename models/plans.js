const knex = require("../db");

// CREATE
function createPlan({ body: { title } }) {
  return knex("plans")
    .returning("*")
    .insert({ title, });
}

// Find all
function findPlans() {
  return knex("plans");
}

// Find one
function findPlan({ params: { id } }) {
  return knex("plans").where("id", id);
}

// Update
function updatePlan({ params: { id }, body: { title, archived } }) {
  return knex("plans")
    .where("id", id)
    .returning("*")
    .update({ title, archived });
}

// Destroy
function destroyPlan({ params: { id } }) {
  return knex("plans")
    .where("id", id)
    .del();
}

module.exports = {
  createPlan,
  findPlans,
  findPlan,
  updatePlan,
  destroyPlan
};
