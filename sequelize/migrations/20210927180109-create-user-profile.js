'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProfile', {
      UserId: {type: Sequelize.UUID, primaryKey:true, unique:true, allowNull:false}, 
      FirstName: {type: Sequelize.STRING(56)}, 
      MiddleName: {type: Sequelize.STRING(56)}, 
      MaidenName: {type: Sequelize.STRING(56)}, 
      LastName: {type: Sequelize.STRING(56)}, 
      Suffix: {type: Sequelize.STRING(16)},
      Facebook: {type: Sequelize.STRING(126)},
      Instagram: {type: Sequelize.STRING(126)},
      Linkedin: {type: Sequelize.STRING(126)},
      Twitter: {type: Sequelize.STRING(126)},
      SecurityPin: {type: Sequelize.STRING(4)},
      UserImage: {type: Sequelize.TEXT('long')}
    });
    await queryInterface.addConstraint('UserProfile', {
      fields: ['UserId'], type: 'foreign key', references: { table: 'UserLogin', field: 'UserId'}, onDelete: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProfile');
  }
};