const { Attempt, QuesstionAttempt, UserProgress } = require('../models/models');
const ApiError = require('../error/ApiError');
const { where, Op, col, fn } = require('sequelize');
function findNonNullField(obj) {
  for (let key in obj) {
    if (key !== 'userId' && obj[key] !== null && obj[key] !== undefined) {
      return key;
    }
  }
  return null;
}
class StatisticsController {
  async getDashboard(req, res, next) {
    try {
      const { userId, from, to } = req.body;
      const filterData = {
        createdAt: {
          [Op.between]: [from, to],
        },
      };
      const { count: countAttempts, rows: findAttemptTests } = await Attempt.findAndCountAll({
        where: {
          userId,
          ...filterData,
        },
        include: [
          {
            model: QuesstionAttempt,
            as: 'questionAttempts',
          },
        ],
      });
      const countRightAnswers = findAttemptTests.reduce((total, item) => {
        const rightAttempts = item.questionAttempts.filter((attempt) => attempt.isRight);
        return total + (rightAttempts.length === item.questionAttempts.length ? 1 : 0);
      }, 0);

      const countAll = await UserProgress.findAll({
        attributes: [
          [fn('count', col('testId')), 'testCount'],
          [fn('count', col('vocabularyId')), 'vocabularyCount'],
          [fn('count', col('grammarId')), 'grammarCount'],
        ],
        where: { userId, ...filterData },
        raw: true,
      });

      const attemptsData = await Attempt.findAll({
        attributes: [
          [fn('date_trunc', 'day', col('createdAt')), 'date'],
          [fn('count', col('*')), 'count'],
        ],
        where: { userId, ...filterData },
        group: [fn('date_trunc', 'day', col('createdAt'))],
        raw: true,
      });

      const userProgressData = await UserProgress.findAll({
        attributes: [
          [fn('date_trunc', 'day', col('createdAt')), 'date'],
          [fn('count', col('testId')), 'count'],
        ],
        where: { userId, ...filterData },
        group: [fn('date_trunc', 'day', col('createdAt'))],
        raw: true,
      });

      const firstDataSet = attemptsData.map((item) => ({
        x: item.date,
        y: item.count,
      }));

      const secondDataSet = userProgressData.map((item) => ({
        x: item.date,
        y: item.count,
      }));

      return res.json({
        countRightAnswers,
        countAttempts: findAttemptTests.length,
        ...countAll[0],
        chartData: { firstDataSet, secondDataSet },
      });
    } catch (e) {
      next(e.message);
    }
  }

  async createProgress(req, res, next) {
    try {
      const { userId, testId, vocabularyId, grammarId } = req.body;
      const conditions = { where: { userId } };

      if (testId !== undefined) conditions.where.testId = testId;
      else if (vocabularyId !== undefined) conditions.where.vocabularyId = vocabularyId;
      else if (grammarId !== undefined) conditions.where.grammarId = grammarId;

      const [instance, created] = await UserProgress.findOrCreate({
        ...conditions,
        defaults: req.body,
      });

      if (created) {
        res.json('created');
      } else {
        res.json('exists');
      }
    } catch (e) {
      next(e.message);
    }
  }
}

module.exports = new StatisticsController();
