/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("todo", function(table) {
    table.renameColumn('todo_id', 'id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("todo", function(table) {
        table.renameColumn('id', 'todo_id');
      });
};
