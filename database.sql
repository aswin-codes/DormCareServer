CREATE DATABASE laundrydb;
\c laundrydb

CREATE TABLE laundry (
  id SERIAL PRIMARY KEY,
  reg_no VARCHAR(255) NOT NULL,
  room_no VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  clothes JSONB
);
