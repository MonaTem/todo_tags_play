
module.exports = {
  up(knex, Promise) {
    return knex.schema.table("todos", table => {
      table
        .integer("plan_id")
        .references("plans.id")
        .notNull()
        .onDelete("cascade")
        .index(); // Adds a db index for fast lookups
    });
  },
  down(knex, Promise) {
    return knex.schema.table("todos", table => table.dropColumn("plan_id"));
  }
};
