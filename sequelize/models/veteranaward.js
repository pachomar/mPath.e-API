'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranAward extends Model {
    static associate(models) { }
  };
  VeteranAward.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, allowNull:false},
    Award: {type: DataTypes.STRING(256)},
    SortOrder: {type: DataTypes.INTEGER, primaryKey:true, allowNull: false}
  }, {
    sequelize,
    modelName: 'VeteranAward',
    freezeTableName: true,
    timestamps: false,
  });
  
  return VeteranAward;
};