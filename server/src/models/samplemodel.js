/*
This is just an example model you can leverage to create your models/tables for your project.
Important note:
Only use lower cases and plural for your models (e.g. below: classrooms is the model)

OR Create or Generate Sequelize Models and Migrations

You can use Sequelize-CLI to generate a new Sequelize model.

The following is a command example to create the models for `classrooms`, `students`, `lecturers`, `courses`,
and `studentcourses`.

sequelize model:create --name classrooms --attributes class_name:string
sequelize model:create --name students --attributes classroom_id:integer,student_name:string
sequelize model:create --name lecturers --attributes lecturer_name:string
sequelize model:create --name courses --attributes lecturer_id:integer,course_name:string
sequelize model:create --name studentscourses --attributes student_id:integer,course_id:integer

Edit your models to indicate the associations. Here's an example:

  class classrooms extends Model {
    static associate(models) {
      classrooms.hasMany(models.students, {
        foreignKey: 'classroom_id',
        as: 'students',
      });
    }
  };
*/

'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class classrooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      classrooms.hasMany(models.students, {
        foreignKey: 'classroom_id',
        as: 'students'
      })
    }
  }
  classrooms.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    class_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classrooms'
  })
  return classrooms
}
