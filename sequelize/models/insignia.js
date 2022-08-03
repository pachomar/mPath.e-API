'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Insignia extends Model {
    static associate(models) { }
  };
  Insignia.init({
    RankId: {type: DataTypes.INTEGER, primaryKey:true, allowNull:false},
    BranchId: {type: DataTypes.INTEGER, allowNull:false},
    PaygradeCode: {type: DataTypes.STRING(25)},
    Abbreviation: {type: DataTypes.STRING(15)},
    Insignia: {type: DataTypes.TEXT('long')},
    InsigniaH: {type: DataTypes.INTEGER},
    InsigniaW: {type: DataTypes.INTEGER},
    Insignia2: {type: DataTypes.TEXT('long')},
    Insignia2Type: {type: DataTypes.STRING(50)},
    Insignia2H: {type: DataTypes.INTEGER},
    Insignia2W: {type: DataTypes.INTEGER},
    Insignia3: {type: DataTypes.TEXT('long')},
    Insignia3Type: {type: DataTypes.STRING(50)},
    Insignia3H: {type: DataTypes.INTEGER},
    Insignia3W: {type: DataTypes.INTEGER},
    Insignia4: {type: DataTypes.TEXT('long')},
    Insignia4Type: {type: DataTypes.STRING(50)},
    Insignia4H: {type: DataTypes.INTEGER},
    Insignia4W: {type: DataTypes.INTEGER},
    Insignia5: {type: DataTypes.TEXT('long')},
    Insignia5Type: {type: DataTypes.STRING(50)},
    Insignia5H: {type: DataTypes.INTEGER},
    Insignia5W: {type: DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Insignia',
    freezeTableName: true,
    timestamps: false,
  });
  
  return Insignia;
};