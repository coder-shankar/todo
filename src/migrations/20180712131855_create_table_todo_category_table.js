/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('todos_categories', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.integer('todo_id').notNull();
    table.integer('category_id').notNull;
    table.foreign('todo_id').references('todos.id');
    table.foreign('category_id').references('categories.id');

  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('todos_categories');
}
