export class UserDto {
  email;
  userId;
  //userPassword;
  isActivated;
  //activateLink;
  timeAdd;
  constructor(user) {
    this.email = user.email;
    this.userId = user.user_id;
    //this.userPassword = user.user_password;
    this.isActivated = user.is_activated;
    //this.activateLink = user.activate_link;
    this.timeAdd = user.time_add;
  }
}
