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
}

export default ({ app, $axios }, inject) => {
   var admin = new AdminServices($axios);
   inject('getMetrics', () => admin.getMetrics());
   // flyers
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
}