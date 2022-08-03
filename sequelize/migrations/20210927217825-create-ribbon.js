'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ribbon', {
      RibbonId: {type: Sequelize.INTEGER, primaryKey:true, allowNull:false},
      Name: {type: Sequelize.STRING(120)},
      Image: {type: Sequelize.TEXT('long')},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ribbon');
  }
};