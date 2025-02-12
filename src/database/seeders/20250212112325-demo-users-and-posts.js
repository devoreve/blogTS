'use strict';

const bcrypt = require('bcrypt');
const {faker} = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        email: faker.internet.email(),
        password: await bcrypt.hash("password123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", users, {});

    const insertedUsers = await queryInterface.sequelize.query(
        `SELECT id FROM Users;`,
        { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = [];
    for (let i = 0; i < 20; i++) {
      const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      posts.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        userId: randomUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
