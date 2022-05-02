// Explicitly define the joint table
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class tutorialstags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  tutorialstags.init({
    tutorialtagId: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'tutorials_tags'
  })
  return tutorialstags
}
