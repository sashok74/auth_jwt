import userService from '../service/user-service.js';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-errors.js';
class userController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errString = 'Ошибка валидации введенных данных';
        const firstError = errors.array()[0];
        if (firstError.param == 'email') {
          errString = `Почтовый адрес содержит ошибки ${firstError.value}`;
        }
        if (firstError.param == 'password') {
          errString = `Длинна пароля должна быть 3 - 15 символов`;
        }
        return next(ApiError.BadRequest(errString, errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      console.log(userData);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAhe: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAhe: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const delete_result = await userService.logout(refreshToken);
      res.clearCookie(refreshToken);
      res.status(200).json('пользователь разлогинился');
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      console.log(activationLink);
      await userService.activate(activationLink);
      return res.redirect(process.env.APP_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      console.log(userData);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAhe: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['Вася', 'Петя']);
    } catch (e) {
      next(e);
    }
  }
}

export default new userController();
