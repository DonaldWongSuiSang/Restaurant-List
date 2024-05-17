'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Restaurants', 'UserId', {
      type: Sequelize.INTEGER,
      reference: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Restaurants', 'UserId')
  }
}
