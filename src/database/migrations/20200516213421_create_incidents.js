exports.up = function (knex) {
  return knex.schema.createTable('incidents', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.string('ong_id').references('ongs.id').onDelete('CASCADE');
    table.timestamps('created_at', 'updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
