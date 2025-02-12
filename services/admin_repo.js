import UserManagement from "~/services/UserManagement";
import {UsersFilter} from "~/service_models/UserModels";

class AdminServices {
  constructor(axios) {
    this.axios = axios;
  }

  async getFlyersCollection() {
    const res = await this.axios.$get("api")
    return res
  }

  async getMetrics() {
    const res = await this.axios.$get("/api/admin/get-metrics")
    return res
  }

  async getFlyers() {
    const res = await this.axios.$get("/api/Admin/get-flyers")
    return res
  }

  async togglePublish(id) {
    const res = await this.axios.$get("/api/Flyers/admin/toggle-visibility/" + id)
    return res
  }

  async getTrades() {
    const res = await this.axios.$get("/api/Admin/get-trades")
    return res

  }

  async getComplaints() {
    const res = await this.axios.$get("api/admin/get-violating-flyers")
    return res
  }

  async resolveComplaint(flyerId, isViolating) {
    const res = await this.axios.$get("api/admin/resolve/" + flyerId + "/" + isViolating)
    return res
  }

  async sendChat(tradeId, message) {
    const payload = {
      message,
      tradeId
    }
    const res = await this.axios.$post("api/admin/send-chat", payload)
    return res
  }

  async getTickets() {
    const res = await this.axios.$get("api/admin/get-tickets")
    return res
  }

  async setModerator(tradeId) {
    const res = await this.axios.$get("api/admin/set-moderator/" + tradeId)
    return res
  }

  async getWithdraws() {
    const res = await this.axios.$get("api/admin/get-withdrawals/")
    return res
  }

  async setWithdrawStatus(id, status, reason) {
    let data = {};
    data.id = id;
    data.status = status
    data.reason = reason

    const res = await this.axios.$post("api/admin/set-withdrawal", data)
    return res
  }
  async makeRefund(id) {
    const res = await this.axios.$post("api/admin/make-refund/" + id)
    return res
  }

  async getAllPayments() {
    const res = await this.axios.$get("/api/Admin/get-payments")
    return res
  }

  async createCurrency(currency) {
    const res = await this.axios.$post("/api/Admin/add-currency", currency)
    return res
  }

  async getCurrencies() {
    const res = await this.axios.$get("/api/Wallet/tele-rates")
    return res
  }
  async deleteCurrency(id) {
    const res = await this.axios.$delete("/api/Admin/remove-currency/" + id)
    return res
  }

  async updateCurrency(currency) {
    const res = await this.axios.$put("/api/Admin/update-currency/", currency)
    return res
  }

  async getConfigList() {
    const res = await this.axios.$get("/api/Admin/config-list/")
    return res
  }
  async updateConfigProp(config) {
    const res = await this.axios.$post("/api/Admin/config-update/", config)
    return res
  }

  async getAllUsers() {
    const res = await this.axios.$get("/api/Admin/all-users/")
    return res
  }

  async updateUserInfo(userInfo) {
    const res = await this.axios.$post("/api/user/update-user/", userInfo)
    return res
  }

  async resolveForDispute(user_ids) {
    const res = await this.axios.$post("/api/Admin/resolve-dispute", user_ids)
    return res
  }

  async getChatsForTradeV2(tradeId) {
    const res = await this.axios.$get("api/trade/v2/get-chats/" + tradeId)
    return res
  }

  async getTradeMetrics() {
    const res = await this.axios.$get("api/trade/v2/get-trademetrics")
    return res
  }

  async postNewBankAccount(data) {
    const res = await this.axios.$post("api/banking/create", data)
    return res
  }

  async getAllBankAccounts() {
    const res = await this.axios.$get("api/banking/list-accounts")
    return res
  }

  async toggleActive(id) {
    const res = await this.axios.$put("api/banking/toggle-account/" + id)
    return res
  }

  async deleteAccount(id) {
    const res = await this.axios.$delete("api/banking/delete/" + id)
    return res
  }

  async getDepositClaims(filter) {
    const res = await this.axios.$post("api/banking/filter-claims", filter)
    return res
  }

  async getTeleMetrics() {
      const res = await this.axios.$get("api/admin/get-paystats")
      return res
    }

  async toggleUserStatebyId(userId) {
    const res = await this.axios.$put("api/admin/toggle-active/", { userId: userId })
    return res
  }

  async changeUserRoleAsync(role, userId) {
    const res = await this.axios.$put("api/admin/change-role/", { role: role, userId: userId })
    return res
  }

  async ProcessDeposit(claim) {
    const res = await this.axios.$post("api/banking/process-claim/", claim)
    return res
  }

  async getUserDeepInfo(id){
    const res = await this.axios.$get("api/user/deep-copy/" + id)
    return res
  }

  // Parameters
  async getParameters() {
    const res = await this.axios.$get("api/config/get-parameters")
    return res
  }

  async updateParameters(parameters) {
    const res = await this.axios.$put("api/config/update-parameters", parameters)
    return res
  }

}

export default ({ app, $axios }, inject) => {
  var admin = new AdminServices($axios);
  var userManagement = new UserManagement($axios);

  // User Management
  inject("getUsersV2", (filter) => userManagement.getUsersV2(filter))
  inject("sendInvitationRequests", (payload) => userManagement.sendInvitationRequests(payload))

  inject('getMetrics', () => admin.getMetrics());
  // flyers+
  inject('getFlyers', () => admin.getFlyers())
  inject('toggleFlyerPublishState', (id) => admin.togglePublish(id))
  inject('getComplaints', () => admin.getComplaints())
  inject('resolveComplaint', (flyerId, violated) => admin.resolveComplaint(flyerId, violated))
  // Trades
  inject("getTrades", () => admin.getTrades())
  inject("getTickets", () => admin.getTickets())
  inject("setModerator", (tradeId) => admin.setModerator(tradeId))
  inject("sendChat", (tradeId, message) => admin.sendChat(tradeId, message))
  //Wallet
  inject("getWithdraws", () => admin.getWithdraws())
  inject("setWithdrawStatus", (id, status, reason) => admin.setWithdrawStatus(id, status, reason))
  inject("makeRefund", (id) => admin.makeRefund(id))
  inject("getAllPayments", () => admin.getAllPayments())
  inject("getUserDeepInfo", (id) => admin.getUserDeepInfo(id))
  //Currency
  inject("addCurrency", (currency) => admin.createCurrency(currency))
  inject("getCurrencies", () => admin.getCurrencies())
  inject("updateCurrency", (currency) => admin.updateCurrency(currency))
  inject("deleteCurrency", (id) => admin.deleteCurrency(id))
  //Configuration
  inject("getConfigList", () => admin.getConfigList())
  inject("updateConfigProp", (config) => admin.updateConfigProp(config))
  //User manage
  inject("getAllUsers", () => admin.getAllUsers())
  inject("toggleUserStatebyId", (id) => admin.toggleUserStatebyId(id))
  inject("changeUserRoleAsync", (userId, role) => admin.changeUserRoleAsync(userId, role))
  inject("updateUserInfo", (userInfo) => admin.updateUserInfo(userInfo))
  //Dispute Management
  inject("resolveDisputeFor", (price, dfee) => admin.resolveForDispute(price, dfee))
  inject("getChatsForTradeV2", (tradeId) => admin.getChatsForTradeV2(tradeId))

  //Statistics Management
  inject("getTradeMetrics", () => admin.getTradeMetrics())
  inject("getTeleMetrics", () => admin.getTeleMetrics())

  //Bank Accounts and Deposits
  inject("postNewBankAccount", (data) => admin.postNewBankAccount(data))
  inject("getAllBankAccounts", () => admin.getAllBankAccounts())
  inject("toggleActive", (id) => admin.toggleActive(id))
  inject("deleteAccount", (id) => admin.deleteAccount(id))
  inject("getDepositClaims", (filter) => admin.getDepositClaims(filter))
  inject("processDeposit", (claim) => admin.ProcessDeposit(claim))

  // Parameters
  inject("getParameters", () => admin.getParameters())
  inject("updateParameters", (parameters) => admin.updateParameters(parameters))

}
