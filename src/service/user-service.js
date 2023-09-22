import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';
import DB from './db_service.js';
import { ApiError } from '../exceptions/api-errors.js';

class UserService {
  async registration(email, password) {
    // провеiряем пользователя в баз
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();
    const user = await DB.users_iu(email, hashPassword, activationLink);
    if (user.is_activated) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    try {
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    } catch (e) {
      console.log(e);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    // сохранить токен для пользователя
    await DB.refresh_tokens_iu(user.user_id, tokens.refreshToken, '');
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activateLink) {
    const user = await DB.users_activate(activateLink);
    if (user.user_id == 0) {
      throw ApiError.BadRequest('Ссылка для активации устарела');
    }
  }

  async login(email, password) {
    const user = await DB.users_s(email, null);
    if (user.user_id > 0 && !user.is_activated) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не активирован`);
    }
    if (user.user_id == 0) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не зарегистрирован`);
    }
    const isPassEquals = await bcrypt.compare(password, user.user_password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    // сохранить токен для пользователя
    await DB.refresh_tokens_iu(user.user_id, tokens.refreshToken, '');
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const res = await DB.refresh_tokens_d(refreshToken);
    return res;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    console.log(userData);
    const user = await DB.users_s(userData.email);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    const result = await DB.refresh_tokens_u(refreshToken);
    console.log(result);
    if (result.token_id == 0) {
      throw ApiError.UnauthorizedError();
    }
    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new UserService();
