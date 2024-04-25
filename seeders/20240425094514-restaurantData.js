'use strict';

const restaurantJSON = require('../public/jsons/restaurant.json'); // Path to JSON file
let restaurantData = restaurantJSON.results.map(restaurant =>({
     id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category:restaurant.category,
      image: restaurant.image,
      location:restaurant.location,
      phone:restaurant.phone,
      google_map:restaurant.google_map,
      rating: restaurant.rating,
      description:restaurant.description,
      createdAt: new Date(),
      updatedAt: new Date()
})
)


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Restaurants', restaurantData);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};