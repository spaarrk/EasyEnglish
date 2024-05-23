'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userProgresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      testId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tests',
          key: 'id',
        },
        allowNull: true,
      },
      vocabularyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vocabularies',
          key: 'id',
        },
        allowNull: true,
      },
      grammarId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grammars',
          key: 'id',
        },
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userProgresses');
  },
};
