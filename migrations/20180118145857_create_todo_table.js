
module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('todos', (table) => {
      table.increments();
      table.string('title', 255).notNull();
      table.text('description').defaultTo('');
      table.timestamps(true, true);
    });
  },
  down(knex, Promise) {
    return knex.schema.dropTable('todos');
  }
}
