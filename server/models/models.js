const sequelize = require('../db');
const { DataTypes, DATE, ENUM } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const UserInformation = sequelize.define('userInformation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  birthday: { type: DataTypes.DATE, allowNull: true },
  englishLevel: { type: DataTypes.STRING, allowNull: true },
  languages: { type: DataTypes.STRING, allowNull: true },
  funFacts: { type: DataTypes.STRING, allowNull: true },
  about: { type: DataTypes.STRING, allowNull: true },
  img: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
});

const Test = sequelize.define('test', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic: { type: DataTypes.STRING, unique: false },
  difficulte: { type: DataTypes.ENUM, values: ['easy', 'medium', 'hard'], defaultValue: 'easy' },
  level: { type: DataTypes.ENUM, values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], defaultValue: 'A1' },
  description: { type: DataTypes.TEXT, unique: false },
});

const Question = sequelize.define('question', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.STRING, allowNull: false },
});

const Answer = sequelize.define('answer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING },
  isRight: { type: DataTypes.BOOLEAN },
});

const Vocabulary = sequelize.define('vocabulary', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.TEXT, defaultValue: '' },
  content: { type: DataTypes.TEXT, defaultValue: '' },
  img: { type: DataTypes.STRING, defaultValue: '' },
});

const Grammar = sequelize.define('grammar', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic: { type: DataTypes.STRING, unique: true },
});

const Rule = sequelize.define('rule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  topic: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT, allowNull: false },
});

const Attempt = sequelize.define('attempt', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const QuesstionAttempt = sequelize.define('questionAttempt', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  isRight: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const TestType = sequelize.define('testType', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  label: { type: DataTypes.STRING, defaultValue: false },
});

const sTopics = sequelize.define('sTopic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING, defaultValue: false },
});

const UserProgress = sequelize.define('userProgress', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Grammar.hasMany(Rule, { as: 'rules' });
Rule.belongsTo(Grammar);

Test.hasMany(Question);
Question.belongsTo(Test);

// sTopics
sTopics.hasMany(Test);
Test.belongsTo(sTopics);

// type test
TestType.hasMany(Test);
Test.belongsTo(TestType);

Question.hasMany(Answer);
Answer.belongsTo(Question);

User.hasMany(UserInformation);
UserInformation.belongsTo(User);

User.hasMany(Test);
Test.belongsTo(User);

// Attempt - testId
Test.hasMany(Attempt);
Attempt.belongsTo(Test);

// Attempt - userId
User.hasMany(Attempt);
Attempt.belongsTo(User);

// QuestionAttempt - attemptId
Attempt.hasMany(QuesstionAttempt);
QuesstionAttempt.belongsTo(Attempt);

// QuestionAttempt - questionId
Question.hasMany(QuesstionAttempt);
QuesstionAttempt.belongsTo(Question);

// QuestionAttempt - answearId
Answer.hasMany(QuesstionAttempt);
QuesstionAttempt.belongsTo(Answer);

// User progress
User.hasMany(UserProgress);
UserProgress.belongsTo(User);

Test.hasMany(UserProgress);
UserProgress.belongsTo(Test);

Vocabulary.hasMany(UserProgress);
UserProgress.belongsTo(Vocabulary);

Grammar.hasMany(UserProgress);
UserProgress.belongsTo(Grammar);

module.exports = {
  User,
  Test,
  Question,
  Answer,
  Vocabulary,
  Grammar,
  Rule,
  UserInformation,
  Attempt,
  QuesstionAttempt,
  TestType,
  sTopics,
  UserProgress,
};
