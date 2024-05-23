'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.changeColumn('tests', 'description', {
    //   type: Sequelize.TEXT,
    // });
  },

  async down(queryInterface, Sequelize) {
    // return queryInterface.changeColumn('tests', 'description', {
    //   type: Sequelize.STRING,
    // });
  },
};
