'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranInfo extends Model {
    static associate(models) { }
  };
  VeteranInfo.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, unique:true, allowNull:false},
    FirstName: {type: DataTypes.STRING(56)}, 
    MiddleName: {type: DataTypes.STRING(56)}, 
    LastName: {type: DataTypes.STRING(56)}, 
    Suffix: {type: DataTypes.STRING(16)}, 
    BirthDay: {type: DataTypes.INTEGER},
    BirthMonth: {type: DataTypes.INTEGER},
    BirthYear: {type: DataTypes.INTEGER},
    City: {type: DataTypes.STRING(56)}, 
    StateCode: {type: DataTypes.STRING(2)}, 
    Country: {type: DataTypes.STRING(56)},
    IsDeceased: {type: DataTypes.BOOLEAN}, 
    DeathDay: {type: DataTypes.INTEGER},
    DeathMonth: {type: DataTypes.INTEGER},
    DeathYear: {type: DataTypes.INTEGER},
    CauseId: {type: DataTypes.INTEGER},
    BurialId: {type: DataTypes.INTEGER},
    BranchId: {type: DataTypes.INTEGER},
    EnlistDay: {type: DataTypes.INTEGER},
    EnlistMonth: {type: DataTypes.INTEGER},
    EnlistYear: {type: DataTypes.INTEGER},
    EntryCity: {type: DataTypes.STRING(56)}, 
    EntryState: {type: DataTypes.STRING(2)}, 
    CompletedDay: {type: DataTypes.INTEGER},
    CompletedMonth: {type: DataTypes.INTEGER},
    CompletedYear: {type: DataTypes.INTEGER},
    TypeId: {type: DataTypes.INTEGER},
    RankId: {type: DataTypes.INTEGER},
    ProctorVerified: {type: DataTypes.BOOLEAN, defaultValue:false, allowNull: false}
  }, {
    sequelize,
    modelName: 'VeteranInfo',
    freezeTableName: true,
    timestamps: false,
  });
  
  return VeteranInfo;
};