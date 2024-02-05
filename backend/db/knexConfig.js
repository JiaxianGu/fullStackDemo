require("dotenv").config({ path: "../../.env" });
const knexConfig = require("../knexfile.js");
const knex = require("knex");

if (process.env.NODE_ENV === "development") {
    module.exports = knex(knexConfig.development);
} else if (process.env.NODE_ENV === "production") {
    module.exports = knex(knexConfig.production);
}
