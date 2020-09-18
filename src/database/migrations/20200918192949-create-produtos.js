'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('produtos', { 
       id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
       nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
       preco: {
          type: Sequelize.DECIMAL(10, 4),
          allowNull:false
        },
       validade: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull:false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull:false
        }
      });
     
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('produtos');
  }
};
