// Use the MariaDB Node.js Connector
const mariadb = require("mariadb");
const dbConfig = require("./db.config");
// Create a connection pool
const pool = mariadb.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.port,
});

// Expose a method to establish connection with MariaDB SkySQL
// module.exports = Object.freeze({
//   pool: pool
// });
module.exports = {
  pool,
};
