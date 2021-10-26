'use strict'
const { passwordHasher } = require('../helpers/index')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                full_name: 'John Doe',
                email: 'user1@mail.com',
                password: passwordHasher('12345678'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                full_name: 'Eren Jaeger',
                email: 'user2@mail.com',
                password: passwordHasher('12345678'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                full_name: 'Uzumaki Naruto',
                email: 'user3@mail.com',
                password: passwordHasher('12345678'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null)
    },
}
