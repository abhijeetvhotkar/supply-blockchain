"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Tea",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Milk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Coffee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cereal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sugar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
