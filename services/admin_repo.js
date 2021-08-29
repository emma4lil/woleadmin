class AdminServices {
   constructor(axios) {
      this.axios = axios;
   }
   async getMetrics() {
      const res = await this.axios.$get("/api/admin/get-metrics")
      return res
   }

   async getFlyers() {
      const res = await this.axios.$get("/api/Admin/get-flyers")
      return res
   }
}

export default ({ app, $axios }, inject) => {
   var admin = new AdminServices($axios);
   inject('getMetrics', () => admin.getMetrics());
   inject('getFlyers', () => admin.getFlyers())
}