'use strict'

const restaurantJSON = require('../public/jsons/restaurant.json') // Path to JSON file
const bcrypt = require('bcryptjs')
const { query } = require('express')

const restaurantData = restaurantJSON.results.map(restaurant => {
  let userId = 1
  if (restaurant.id > 3) {
    userId = 2
  }
  return ({
    id: restaurant.id,
    name: restaurant.name,
    name_en: restaurant.name_en,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.google_map,
    rating: restaurant.rating,
    description: restaurant.description,
    createdAt: new Date(),
    updatedAt: new Date(),
    UserId: userId
  })
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash('12345678', salt)

      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          name: 'user1',
          email: 'user1@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'user2',
          email: 'user2@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { transaction }
      )
      await queryInterface.bulkInsert('Restaurants', restaurantData, { transaction })
      await transaction.commit()
    } catch (error) {
      if (transaction) await transaction.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null)
  }
}
