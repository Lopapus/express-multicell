const Sequelize = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// With URI:
// const sequelize = new Sequelize('mysql2://user:password@hostname:port/database')
const sequelize = new Sequelize(config);

const status = async () => {
  try {
    await sequelize.authenticate();
    return 'Database connected!!';
  } catch (error) {
    if (error instanceof Sequelize.ConnectionRefusedError) {
      return 'Not connection BD';
    }
    return error;
  }
};

module.exports = { sequelize, status };
