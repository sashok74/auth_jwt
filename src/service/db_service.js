import { executeQuery } from '../modules/database.js';
//import { UserDto } from '../dtos/user-dto.js';

class DB {
  async users_s(email, activationLink) {
    const sql = 'select user_id, email, user_password, is_activated, activate_link, time_add from users_s(?, ?)';
    const res = await executeQuery(sql, [email, activationLink]);
    return res[0];
  }
  async users_activate(activationLink) {
    const sql = 'select user_id, email, user_password, is_activated, activate_link, time_add from users_activate(?)';
    const res = await executeQuery(sql, [activationLink]);
    return res[0];
  }
  async users_iu(email, password, activationLink) {
    const sql = 'select user_id, email, user_password, is_activated, activate_link, time_add from users_iu(?, ?, ?)';
    const res = await executeQuery(sql, [email, password, activationLink]);
    return res[0];
  }
  async refresh_tokens_s(userId, deviceName) {
    const sql = 'select token_id, user_id, r_token, device_name, time_add from refresh_tokens_s(?, ?)';
    const res = await executeQuery(sql, [userId, deviceName]);
    return res[0];
  }

  async refresh_tokens_iu(userId, rToken, deviceName) {
    const sql = 'select token_id, user_id, r_token, device_name, time_add from refresh_tokens_iu(?, ?, ?)';
    const res = await executeQuery(sql, [userId, rToken, deviceName]);
    return res[0];
  }

  async refresh_tokens_u(rTokenOld, rTokenNew) {
    const sql = 'select token_id, user_id, r_token, device_name from refresh_tokens_u(?, ?)';
    const user = await executeQuery(sql, [rTokenOld, rTokenNew]);
    return user[0];
  }

  async refresh_tokens_d(rToken) {
    const sql = 'select delete_result from refresh_tokens_d(?)';
    const res = await executeQuery(sql, [rToken]);
    return res[0];
  }
}

export default new DB();
