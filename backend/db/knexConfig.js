require('dotenv').config({path: '../../.env'});

const knexConfig = require("../knexfile.js");
const knex = require("knex");


module.exports = knex(knexConfig)