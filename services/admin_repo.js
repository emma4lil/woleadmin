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

  async setWithdrawStatus(id, status) {
    const res = await this.axios.$post("api/admin/set-withdrawals/" + id + "/" + status)
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

  async getTeleMetrics() {
    const res = await this.axios.$get("api/admin/get-paystats")
    return res
  }

  async toggleUserStatebyId(userId) {
    const res = await this.axios.$put("api/admin/toggle-active/" , {userId: userId} )
    return res
  }

  async changeUserRoleAsync(role, userId) {
    const res = await this.axios.$put("api/admin/change-role/", {role: role, userId: userId})
    return res
  }
}
 
export default ({ app, $axios }, inject) => {
  var admin = new AdminServices($axios);
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
  inject("setWithdrawStatus", (id, status) => admin.setWithdrawStatus(id, status))
  inject("makeRefund", (id) => admin.makeRefund(id))
  inject("getAllPayments", () => admin.getAllPayments())
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
  //Dispute Management
  inject("resolveDisputeFor", (price, dfee) => admin.resolveForDispute(price, dfee))
  inject("getChatsForTradeV2", (tradeId) => admin.getChatsForTradeV2(tradeId))

  //Statistics Management
  inject("getTradeMetrics", () => admin.getTradeMetrics())

  //Bank Accounts and Deposits
  inject("postNewBankAccount", (data) => admin.postNewBankAccount(data))
  inject("getAllBankAccounts", () => admin.getAllBankAccounts())
  inject("toggleActive", (id) => admin.toggleActive(id))
  inject("deleteAccount", (id) => admin.deleteAccount(id))

}
