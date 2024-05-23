const {
  Test,
  Question,
  Answer,
  TestType,
  User,
  UserInformation,
  sTopics,
} = require('../models/models');
const ApiError = require('../error/ApiError');
const { where, Op } = require('sequelize');
const { Sequelize } = require('../db');
class TestController {
  async create(req, res, next) {
    try {
      const { topic, difficulte, level, sTopicId, testTypeId, userId, description, questions } =
        req.body;
      const test = await Test.create({
        topic,
        difficulte,
        level,
        sTopicId,
        testTypeId,
        userId,
        description,
      });
      for (let questionData of questions) {
        const question = await Question.create({
          question: questionData.question,
          testId: test.id,
        });
        for (let answerData of questionData.answers) {
          await Answer.create({
            content: answerData.content,
            isRight: answerData.isRight,
            questionId: question.id,
          });
        }
      }
      return res.json(test);
    } catch (e) {
      next(e.message);
    }
  }
  async getAll(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    const tests = await Test.findAndCountAll({
      where: {
        testTypeId: 1,
      },
      limit,
      offset,
    });
    return res.json(tests);
  }
  async getListTest(req, res, next) {
    try {
      const { filters } = req.body;
      const { testType, topic, ...payload } = filters;
      console.log();
      const testTypeItem = await TestType.findOne({
        where: {
          label: testType || 'DEFAULT',
        },
      });
      const currentTopic = topic
        ? {
            topic: {
              [Op.iLike]: '%' + topic + '%',
            },
          }
        : {};
      const items = await Test.findAndCountAll({
        where: {
          ...payload,
          ...currentTopic,
          testTypeId: testTypeItem.id,
        },
        include: [
          {
            model: User,
            as: 'user',
            include: [
              {
                model: UserInformation,
                as: 'userInformations',
              },
            ],
          },
        ],
      });
      const currentRows = items.rows.map((oneItem) => ({
        id: oneItem.id,
        description: oneItem.description,
        difficulte: oneItem.difficulte,
        level: oneItem.level,
        sTopicId: oneItem.sTopicId,
        testTypeId: oneItem.testTypeId,
        topic: oneItem.topic,
        userId: oneItem.userId,
        createdAt: oneItem.createdAt,
        user: { name: oneItem.user.userName, img: oneItem.user?.userInformations[0]?.img || '' },
      }));

      return res.json({ ...items, rows: currentRows });
    } catch (e) {
      next(e.message);
    }
  }
  async getOne(req, res) {
    const { id } = req.params;
    const testOne = await Test.findOne({ where: { id } });
    return res.json(testOne);
  }
  async getTestWithData(req, res, next) {
    try {
      const { id } = req.params;
      const testOne = await Test.findOne({
        where: { id },
        include: [
          {
            model: sTopics,
            as: 'sTopic',
          },
        ],
      });
      if (testOne) {
        const listQuestion = await Question.findAll({
          where: {
            testId: id,
          },
          include: [
            {
              model: Answer,
              as: 'answers',
            },
          ],
        });
        return res.json({
          ...{ ...testOne.dataValues, sTopic: testOne.dataValues?.sTopic?.content || '' },
          questions: listQuestion.map((oneQ) => oneQ.dataValues),
        });
      }
      next(ApiError.badRequest(`user by id ${id} not found`));
    } catch (e) {
      next(e.message);
    }
  }
}

module.exports = new TestController();
