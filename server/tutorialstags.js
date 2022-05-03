// Explicitly define the joint table
'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('tutorialstags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tutorial_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tutorials',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      // Create Unique CompoundIndex
      let sql = `CREATE UNIQUE INDEX 'tutorialtagcompoundindex'
              ON public."tutorialstags"
              USING btree
              ('tutorial_id', 'tag_id')
            `
      return queryInterface.sequelize.query(sql, {raw: true})
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tutorialstags')
  }
}
