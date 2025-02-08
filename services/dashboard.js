class DashboardServices {
    constructor(axios) {
        this.axios = axios;
    }

    async getDashboardTrends() {
        const res = await this.axios.$get("/api/Dashboard/get-charts")
        return res
    }

    async getLatestActivityLogs() {
        const res = await this.axios.$get("/api/Dashboard/get-latest-activity")
        return res
    }

    async getActivityLogs(payload) {
        const res = await this.axios.$post("/api/Dashboard/get-activity-logs", payload)
        return res
    }


}

export default ({ app, $axios }, inject) => {
    var dashboard = new DashboardServices($axios);
    // Get trend data
    inject("getChartTrends", () => dashboard.getDashboardTrends())
    inject("getActivityLogs", () => dashboard.getLatestActivityLogs())
    inject("getLogs", (payload) => dashboard.getActivityLogs(payload))
}