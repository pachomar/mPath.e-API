'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VeteranInfo', {
      VeteranId: {type: Sequelize.UUID, primaryKey:true, unique:true, allowNull:false},
      FirstName: {type: Sequelize.STRING(56)}, 
      MiddleName: {type: Sequelize.STRING(56)}, 
      LastName: {type: Sequelize.STRING(56)}, 
      Suffix: {type: Sequelize.STRING(16)}, 
      BirthDay: {type: Sequelize.INTEGER},
      BirthMonth: {type: Sequelize.INTEGER},
      BirthYear: {type: Sequelize.INTEGER},
      City: {type: Sequelize.STRING(56)}, 
      StateCode: {type: Sequelize.STRING(2)}, 
      Country: {type: Sequelize.STRING(56)},
      IsDeceased: {type: Sequelize.BOOLEAN}, 
      DeathDay: {type: Sequelize.INTEGER},
      DeathMonth: {type: Sequelize.INTEGER},
      DeathYear: {type: Sequelize.INTEGER},
      CauseId: {type: Sequelize.INTEGER},
      BurialId: {type: Sequelize.INTEGER},
      BranchId: {type: Sequelize.INTEGER},
      EnlistDay: {type: Sequelize.INTEGER},
      EnlistMonth: {type: Sequelize.INTEGER},
      EnlistYear: {type: Sequelize.INTEGER},
      EntryCity: {type: Sequelize.STRING(56)}, 
      EntryState: {type: Sequelize.STRING(2)}, 
      CompletedDay: {type: Sequelize.INTEGER},
      CompletedMonth: {type: Sequelize.INTEGER},
      CompletedYear: {type: Sequelize.INTEGER},
      TypeId: {type: Sequelize.INTEGER},
      RankId: {type: Sequelize.INTEGER},
      ProctorVerified: {type: Sequelize.BOOLEAN, defaultValue:false, allowNull: false}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VeteranInfo');
  }
};