'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranMedia extends Model {
    static associate(models) { }
  };
  VeteranMedia.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, allowNull:false},
    IsProfile: {type: DataTypes.BOOLEAN},
    Comments: {type: DataTypes.STRING(256)},
    Tags: {type: DataTypes.STRING(256)},
    ImageSrc: {type: DataTypes.TEXT('long')},
    SortOrder: {type: DataTypes.INTEGER, primaryKey:true, allowNull:false},
    Height: {type: DataTypes.INTEGER},
    Width: {type: DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'VeteranMedia',
    freezeTableName: true,
    timestamps: false,
  });
  
  return VeteranMedia;
};