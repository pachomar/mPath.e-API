'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MOSCode extends Model {
    static associate(models) { }
  };
  MOSCode.init({
    MOSCodeId: { type: DataTypes.INTEGER, primaryKey:true, allowNull:false },
    BranchId: { type: DataTypes.INTEGER, allowNull:false },
    Code: { type: DataTypes.STRING(25), allowNull:false },
    Name: { type: DataTypes.STRING(250), allowNull:false },
  }, {
    sequelize,
    modelName: 'MOSCode',
    freezeTableName: true,
    timestamps: false,
  });
  
  return MOSCode;
};