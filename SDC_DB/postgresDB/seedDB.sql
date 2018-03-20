DROP DATABASE silverspoon;

CREATE DATABASE silverspoon;

\c silverspoon;

BEGIN;

CREATE TABLE restaurants(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL
);

\copy restaurants (name) FROM '/Users/m.azarshahy/Desktop/SDC/menu-components/SDC_DB/postgresDB/testData/names.csv' DELIMITER ',' CSV;

COMMIT;

BEGIN;

CREATE TABLE items(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  menu VARCHAR(10) NOT NULL,
  price INT NOT NULL,
  res_id INT NOT NULL
);

\copy items (name, menu, price, res_id) FROM '/Users/m.azarshahy/Desktop/SDC/menu-components/SDC_DB/postgresDB/testData/items.csv' DELIMITER ',' CSV;

COMMIT;

BEGIN;

CREATE TABLE tags(
  id SERIAL PRIMARY KEY NOT NULL,
  gluten_free BOOLEAN NOT NULL,
  vegetarian BOOLEAN NOT NULL,
  vegan BOOLEAN NOT NULL,
  items_id INT NOT NULL
);

\copy tags (gluten_free, vegetarian, vegan, items_id) FROM '/Users/m.azarshahy/Desktop/SDC/menu-components/SDC_DB/postgresDB/testData/tags.csv' DELIMITER ',' CSV;

COMMIT;

ALTER TABLE items ADD FOREIGN KEY (res_id) REFERENCES restaurants (id);
ALTER TABLE tags ADD FOREIGN KEY (items_id) REFERENCES items (id);
CREATE INDEX restaurant_index_name on restaurants (name);
CREATE INDEX items_index_menu on items (menu);
CREATE INDEX items_fk on items(res_id);
CREATE INDEX tags_fk on tags(items_id);
