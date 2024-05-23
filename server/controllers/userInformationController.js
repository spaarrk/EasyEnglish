const { UserInformation, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
class userInformationController {
  async create(req, res, next) {
    try {
      const userInfo = await UserInformation.create({
        userId: req.body.userId,
      });
      return res.json(userInfo);
    } catch (e) {
      next(ApiError.badRequest('произошла ошибка = ', e));
    }
  }
  async update(req, res, next) {
    try {
      const userMain = await User.findOne({
        where: {
          id: +req.body.userId,
        },
      });
      const userInfo = await UserInformation.findOne({
        where: {
          userId: req.body.userId,
        },
      });
      if (userInfo === null) {
        const creatUserInfo = await UserInformation.create(req.body);
        return res.json({
          ...creatUserInfo.dataValues,
          name: userMain.userName,
          lastName: userMain.lastName,
          email: userMain.email,
        });
      }
      await userInfo.update({ ...userInfo, ...req.body });
      return res.json({
        ...userInfo.dataValues,
        name: userMain.userName,
        lastName: userMain.lastName,
        email: userMain.email,
      });
    } catch (e) {
      next(e.message);
    }
  }

  async updateImg(req, res) {
    try {
      const { img } = req.files;
      const { userId } = req.body;
      // console.log('img = ', img, 'userId = ', userId);
      const userInfo = await UserInformation.findOne({
        where: {
          userId: userId,
        },
      });
      if (userInfo !== null) {
        let fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        await userInfo.update({
          img: fileName,
        });
        // console.log('вщзвращаем = ', userInfo);
        return res.json({ img: userInfo.dataValues.img });
      }
    } catch (e) {
      next(ApiError.badRequest('произошла ошибка'));
    }
  }

  async getInformation(req, res) {
    const { id } = req.params;
    // console.log('id= ', id);
    if (id !== 'undefined' && id && id !== undefined) {
      const userMain = await User.findOne({
        where: {
          id: +id,
        },
      });
      // console.log('userMain = ', userMain);
      // console.log('req = ', typeof +id);
      if (userMain !== null) {
        const userInfros = await UserInformation.findOne({
          where: {
            userId: +id,
          },
        });
        if (userInfros !== null) {
          const retData = {
            ...userInfros.dataValues,
            id: userMain.id,
            name: userMain.userName,
            lastName: userMain.lastName,
            email: userMain.email,
          };
          // console.log('retData = ', retData);
          return res.json(retData);
        } else {
          return res.json({
            id: userMain.id,
            name: userMain.userName,
            lastName: userMain.lastName,
            email: userMain.email,
          });
        }
      } else {
        return res.json({ error: 'User Doesnt exist' });
      }
    }
  }
}

module.exports = new userInformationController();
