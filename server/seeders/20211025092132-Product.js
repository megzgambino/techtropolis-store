'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        "id": 1,
        "name": "KBDFans kbd67 lite",
        "image_url": "https://i.ytimg.com/vi/QosGGSoY58U/maxresdefault.jpg",
        "price": 1500000,
        "quantity": 3,
        "UserId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "id": 2,
        "name": "Samsung Monitor 24 inch",
        "image_url": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/23/2d514e24-b438-4068-bcc3-2bb3f5c39011.jpg",
        "price": 2300000,
        "quantity": 3,
        "UserId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "id": 3,
        "name": "Razer DeathAdder",
        "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2721271/razer_razer-deathadder-essential-gaming-mouse--6400-dpi-_full05.jpg",
        "price": 1500000,
        "quantity": 3,
        "UserId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null)
  }
};
