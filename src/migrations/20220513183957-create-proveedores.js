'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('proveedores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(3)
      },
      nombre: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      cuit: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true
      },
      lugar: {
        type: Sequelize.STRING(100)
      },
      telefono: {
        type: Sequelize.STRING(15)
      },
      correo: {
        type: Sequelize.STRING(50)
      },
      inscripto: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
    await queryInterface.dropTable('proveedores');
  }
};
