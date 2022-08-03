'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ribbon extends Model {
    static associate(models) { }
  };
  Ribbon.init({
    RibbonId: {type: DataTypes.INTEGER, primaryKey:true, allowNull:false},
    Name: {type: DataTypes.STRING(120)},
    Image: {type: DataTypes.TEXT('long')},
  }, {
    sequelize,
    modelName: 'Ribbon',
    freezeTableName: true,
    timestamps: false,
  });
  
  return Ribbon;
};