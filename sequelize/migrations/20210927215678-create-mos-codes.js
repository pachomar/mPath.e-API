'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MOSCode', {
      MOSCodeId: { type: Sequelize.INTEGER, primaryKey:true, allowNull:false },
      BranchId: { type: Sequelize.INTEGER, allowNull:false },
      Code: {type: Sequelize.STRING(25), allowNull:false},
      Name: {type: Sequelize.STRING(250), allowNull:false},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MOSCode');
  }
};