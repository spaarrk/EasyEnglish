'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.createTable('testTypes', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   label: {
    //     type: Sequelize.STRING,
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    // });
    // await queryInterface.addColumn('tests', 'testTypeId', {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: 'testTypes',
    //     key: 'id',
    //   },
    //   allowNull: true,
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.addColumn('tests', 'userId', {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: 'users',
    //     key: 'id',
    //   },
    //   allowNull: true,
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });
    // await queryInterface.sequelize.query(`UPDATE "tests" SET "userId" = 4 WHERE "userId" IS NULL;`);
    // await queryInterface.bulkInsert('testTypes', [
    //   { label: 'DEFAULT', createdAt: new Date(), updatedAt: new Date() },
    //   { label: 'CARDS', createdAt: new Date(), updatedAt: new Date() },
    // ]);
    // const [firstEntry] = await queryInterface.sequelize.query(
    //   `SELECT id FROM "testTypes" WHERE label = 'DEFAULT' LIMIT 1;`
    // );
    // if (firstEntry && firstEntry.length > 0) {
    //   await queryInterface.sequelize.query(
    //     `UPDATE "tests" SET "testTypeId" = ${firstEntry[0].id} WHERE "testTypeId" IS NULL;`
    //   );
    // }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('tests', 'testTypeId');
    // return queryInterface.dropTable('testTypes');
  },
};
