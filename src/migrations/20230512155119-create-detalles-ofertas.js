'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('detalles_ofertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      id_oferta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ofertas',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('detalles_ofertas');
  }
};
