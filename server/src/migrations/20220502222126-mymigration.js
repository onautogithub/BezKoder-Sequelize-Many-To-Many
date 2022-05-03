'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    // Add altering commands here.

    await queryInterface.createTable('tutorialstags', {
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
    })
  },

  async down (queryInterface, Sequelize) {
    // Add reverting commands here.
    await queryInterface.dropTable('tutorialstags')
  }
}
