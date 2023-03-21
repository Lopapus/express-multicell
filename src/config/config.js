require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'database_development',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'database_development',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION
  }
};
