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
}

export default ({ app, $axios }, inject) => {
   var admin = new AdminServices($axios);
   inject('getMetrics', () => admin.getMetrics());
   // flyers
   inject('getFlyers', () => admin.getFlyers())
   inject('toggleFlyerPublishState', (id) => admin.togglePublish(id))
   // Trades
   inject("getTrades", () => admin.getTrades())
}