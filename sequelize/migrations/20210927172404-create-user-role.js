'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserRole', {
      UserId: {type: Sequelize.UUID, primaryKey:true, unique:true, allowNull:false}, 
      IsContributor: {type: Sequelize.BOOLEAN, defaultValue:false, allowNull: false}, 
      IsProctor: {type: Sequelize.BOOLEAN, defaultValue:false, allowNull: false},
      IsAdministrator: {type: Sequelize.BOOLEAN, defaultValue:false, allowNull: false}
    });
    await queryInterface.addConstraint('UserRole', {
      fields: ['UserId'], type: 'foreign key', references: { table: 'UserLogin', field: 'UserId'}, onDelete: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserRole');
  }
};