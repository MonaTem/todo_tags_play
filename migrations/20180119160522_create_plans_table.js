module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('plans', (table) => {
      table.increments();
      table.string('title', 255).notNull();
      table.boolean('archived').notNull().defaultTo(false);
      table.timestamps(true, true);
    });
  },
  down(knex, Promise) {
    return knex.schema.dropTable('plans');
  }
}
