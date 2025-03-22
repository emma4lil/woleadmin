export default class BroadcastMessages {
  constructor(axios) {
    this.axios = axios
  }

  async getBroadcastMessages() {
    const result = await this.axios.$get("/api/admin/get-broadcast-messages");
    return result.data;
  }

  async sendBroadcastMessage(payload) {
    const result = await this.axios.$post("/api/admin/send-broadcast-messages", payload);
    return result.data;
  }
}
