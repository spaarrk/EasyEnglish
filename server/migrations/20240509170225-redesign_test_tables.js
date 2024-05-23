'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.sequelize.transaction(async (transaction) => {
    //   await queryInterface.createTable(
    //     'sTopics',
    //     {
    //       id: {
    //         type: Sequelize.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true,
    //       },
    //       content: {
    //         type: Sequelize.STRING,
    //         allowNull: false,
    //       },
    //       createdAt: {
    //         allowNull: false,
    //         type: Sequelize.DATE,
    //       },
    //       updatedAt: {
    //         allowNull: false,
    //         type: Sequelize.DATE,
    //       },
    //     },
    //     { transaction }
    //   );
    //   await queryInterface.bulkInsert(
    //     'sTopics',
    //     [
    //       { content: 'Articles', createdAt: new Date(), updatedAt: new Date() },
    //       { content: 'Verb', createdAt: new Date(), updatedAt: new Date() },
    //       { content: 'Pronunciation', createdAt: new Date(), updatedAt: new Date() },
    //     ],
    //     { transaction }
    //   );
    //   await queryInterface.addColumn(
    //     'tests',
    //     'sTopicId',
    //     {
    //       type: Sequelize.INTEGER,
    //       references: {
    //         model: 'sTopics',
    //         key: 'id',
    //       },
    //       allowNull: true,
    //       onUpdate: 'CASCADE',
    //       onDelete: 'SET NULL',
    //     },
    //     { transaction }
    //   );
    //   const [firstEntry] = await queryInterface.sequelize.query(
    //     `SELECT id FROM "sTopics" WHERE content = 'Articles' LIMIT 1;`,
    //     { transaction }
    //   );
    //   if (firstEntry && firstEntry.length > 0) {
    //     await queryInterface.sequelize.query(
    //       `UPDATE "tests" SET "sTopicId" = ${firstEntry[0].id} WHERE "sTopicId" IS NULL;`,
    //       { transaction }
    //     );
    //   }
    //   await queryInterface.addColumn(
    //     'tests',
    //     'description',
    //     {
    //       type: Sequelize.STRING,
    //       allowNull: true,
    //       onUpdate: 'CASCADE',
    //       onDelete: 'SET NULL',
    //     },
    //     { transaction }
    //   );
    //   await queryInterface.sequelize.query(
    //     `
    //     UPDATE tests SET description = 'test description'
    //   `,
    //     { transaction }
    //   );
    // });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.sequelize.transaction(async (transaction) => {
    //   await queryInterface.removeColumn('tests', 'description', { transaction });
    //   await queryInterface.removeColumn('tests', 'sTopicId', { transaction });
    //   await queryInterface.dropTable('sTopics', { transaction });
    // });
  },
};
