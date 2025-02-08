import {UserDetail, UsersFilter} from "~/service_models/UserModels";

export default class UserManagement {
  constructor(axios) {
    this.axios = axios
  }

  async getUsersV2(filter) {
    const result = await this.axios.$post("/api/admin/v2-get-users", filter);
    return result.data;
  }
  // description: Activate refferals for batch of users
  async sendInvitationRequests(payload) {
    const result = await this.axios.$post("/api/user/batch-invite-activation", payload);
    return result.data;
  }
}
