'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("UserLogin", {
      UserId: {type: Sequelize.UUID, primaryKey:true, unique:true, allowNull:false}, 
      UserEmail: {type: Sequelize.STRING(320), unique:true, allowNull: false}, 
      UserName: {type: Sequelize.STRING(32)}, 
      UserPwd: {type: Sequelize.STRING(128), allowNull:false}, 
      UserPhone: {type: Sequelize.STRING(40)}, 
      QuestionId: {type: Sequelize.INTEGER}, 
      QuestionAnswer: {type: Sequelize.STRING(320)}, 
      IsVerified: {type: Sequelize.BOOLEAN, defaultValue:false, allowNull: false}, 
      IsLocked: {type: Sequelize.BOOLEAN, defaultValue:false, allowNull: false}, 
      FailedAttempts: {type: Sequelize.INTEGER, defaultValue:0}, 
      LatestCode: {type: Sequelize.STRING(6)}, 
      TermsAgreement: {type: Sequelize.BOOLEAN, defaultValue:true}
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("UserLogin");
  }
};