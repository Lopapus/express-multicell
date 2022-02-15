'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(2)
      },
      usuario: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      clave_maestra: {
        allowNull: false,
        type: Sequelize.STRING(8)
      },
      rol: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      estado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
