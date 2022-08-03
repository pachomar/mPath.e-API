'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Insignia', {
      RankId: {type: Sequelize.INTEGER, primaryKey:true, allowNull:false},
      BranchId: {type: Sequelize.INTEGER, allowNull:false},
      PaygradeCode: {type: Sequelize.STRING(25)},
      Abbreviation: {type: Sequelize.STRING(15)},
      Insignia: {type: Sequelize.TEXT('long')},
      InsigniaH: {type: Sequelize.INTEGER},
      InsigniaW: {type: Sequelize.INTEGER},
      Insignia2: {type: Sequelize.TEXT('long')},
      Insignia2Type: {type: Sequelize.STRING(50)},      
      Insignia2H: {type: Sequelize.INTEGER},
      Insignia2W: {type: Sequelize.INTEGER},
      Insignia3: {type: Sequelize.TEXT('long')},
      Insignia3Type: {type: Sequelize.STRING(50)},
      Insignia3H: {type: Sequelize.INTEGER},
      Insignia3W: {type: Sequelize.INTEGER},
      Insignia4: {type: Sequelize.TEXT('long')},
      Insignia4Type: {type: Sequelize.STRING(50)},
      Insignia4H: {type: Sequelize.INTEGER},
      Insignia4W: {type: Sequelize.INTEGER},
      Insignia5: {type: Sequelize.TEXT('long')},
      Insignia5Type: {type: Sequelize.STRING(50)},
      Insignia5H: {type: Sequelize.INTEGER},
      Insignia5W: {type: Sequelize.INTEGER}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Insignia');
  }
};