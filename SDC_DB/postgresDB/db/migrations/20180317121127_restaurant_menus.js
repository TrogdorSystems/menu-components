exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('restaurants', (table) => {
      table.increments('id').primary();
      table.string('name', 50);
      table.index('name');
    }),
    knex.schema.createTable('menus', (table) => {
      table.increments('id').primary();
      table.integer('res_id').references('restaurants.id');
      table.integer('items_id').references('items.id');
    }),
    knex.schema.createTable('items', (table) => {
      table.increments('id').primary();
      table.string('name', 50);
      table.string('menu', 10);
      table.integer('price');
      table.boolean('gluten_free');
      table.boolean('vegetarian');
      table.boolean('vegan');
      table.index(['name', 'menu']);
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('menus'),
    knex.schema.dropTable('restaurants'),
    knex.schema.dropTable('items'),
  ]);
