'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class tutorials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      tutorials.belongsToMany(models.tags, {
        through: 'tutorialstags',
        as: 'tags',
        foreignKey: 'tutorial_id'
      })
    }
  }
  tutorials.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tutorials'
  })
  return tutorials
}
