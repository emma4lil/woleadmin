export class UsersFilter {
   PageNumber = 1;
   PageSize = 25;
}

export class UserDetail {
  Id = "";
  FullName = "";
  Email = "";
  PhoneNumber = 0;
  LastSeen = "";
  InviteStatus = 0;
  InviteStatusDescription = "";
  CreatedAt = new Date();

  constructor(id, fullName, email, phone, lastSeen, createdAt, desc) {
    this.Id = id;
    this.FullName = fullName;
    this.Email = email;
    this.PhoneNumber = phone;
    this.LastSeen = lastSeen;
    this.CreatedAt = createdAt;
    this.InviteStatusDescription = desc;
  }

  static fromJSON(json) {
    return new UserDetail(
      json["FullName"],
      json["Email"],
      json["Phone"],
      json["LastSeen"],
      json["InviteStatus"],
      json["CreatedAt"],
    )
  }
}
