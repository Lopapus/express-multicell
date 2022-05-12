const Sequelize = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// With URI:
// const sequelize = new Sequelize('mysql2://user:password@hostname:port/database')
const sequelize = new Sequelize(config);

const status = async () => {
  const response = {};
  response.config = config;

  try {
    await sequelize.authenticate();
    response.ok = true;
    response.status = 'connected';
    response.message = 'Base de datos conectada';
  } catch (error) {
    response.ok = false;
    if (error instanceof Sequelize.ConnectionRefusedError) {
      response.status = 'disconnected';
      response.message = 'Base de datos desconectada';
    } else {
      response.status = 'error';
      response.message = error;
    }
  }
  return response;
};

const verify = () => {
  return async (_, res, next) => {
    const response = await status();
    if (response.ok) {
      return next();
    }
    return res.status(500).json({ msg: response.message });
  };
};

module.exports = { sequelize, status, verify };
