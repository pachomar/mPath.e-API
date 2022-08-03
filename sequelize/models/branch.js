'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) { }
  };
  Branch.init({
    BranchId: {type: DataTypes.INTEGER, primaryKey:true, allowNull:false},
    Name: {type: DataTypes.STRING(120)},
    Image: {type: DataTypes.TEXT},
  }, {
    sequelize,
    modelName: 'Branch',
    freezeTableName: true,
    timestamps: false,
  });
  
  return Branch;
};