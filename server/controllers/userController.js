const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserInformation } = require('../models/models');

const generateJwt = (id, userName, role) => {
  return jwt.sign({ id: id, userName, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    const { userName, lastName, email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Неккоректнй email или password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      userName,
      lastName,
      email,
      role,
      password: hashPassword,
    });
    // console.log('doshel');
    const token = generateJwt(user.id, user.userName, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { userName, password } = req.body;
    // console.log('userName = ', userName);
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return next(ApiError.internal('Пользователь с таким userName не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    console.log('user = ', user);
    const token = generateJwt(user.id, user.userName, user.role);
    // const useInformation = await UserInformation.findOne({ where: {} });
    return res.json({ token });
  }
  async check(req, res, next) {
    // console.log('req = ', req);
    const token = generateJwt(req.user.id, req.user.userName, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
