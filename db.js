const pgp = require('pg-promise')();

const db =pgp('postgres://postgres:aswin@localhost:5432/laundrydb');

module.exports = db;