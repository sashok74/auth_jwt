export class TokenDto {
  tokenId;
  userId;
  rToken;
  deviceMame;
  timeAdd;
  constructor(token) {
    tokenId = token.token_id;
    userId = token.user_id;
    rToken = token.r_token;
    deviceMame = token.device_name;
    timeAdd = token.time_add;
  }
}
