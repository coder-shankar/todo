/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.alterTable('todos', table => {
    table.integer('priority', 0);
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.alterTable('todos', table => {
    table.dropColumn('priority');
  });
}
