'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserLogin extends Model {
    static associate(models) { }
  };
  UserLogin.init({
    UserId: {type: DataTypes.UUID, primaryKey:true, unique:true, allowNull:false}, 
    UserEmail: {type: DataTypes.STRING(320), unique:true, allowNull: false}, 
    UserName: {type: DataTypes.STRING(32)}, 
    UserPwd: {type: DataTypes.STRING(128), allowNull:false}, 
    UserPhone: {type: DataTypes.STRING(40)}, 
    QuestionId: {type: DataTypes.INTEGER}, 
    QuestionAnswer: {type: DataTypes.STRING(320)}, 
    IsVerified: {type: DataTypes.BOOLEAN, defaultValue:false, allowNull: false}, 
    IsLocked: {type: DataTypes.BOOLEAN, defaultValue:false, allowNull: false}, 
    FailedAttempts: {type: DataTypes.INTEGER, defaultValue:0}, 
    LatestCode: {type: DataTypes.STRING(6)}, 
    TermsAgreement: {type: DataTypes.BOOLEAN, defaultValue:true}
  }, {
    sequelize,
    modelName: 'UserLogin',
    freezeTableName: true,
    timestamps: false,
  });

  return UserLogin;
};