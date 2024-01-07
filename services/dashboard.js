class DashboardServices {
    constructor(axios) {
        this.axios = axios;
    }

    async getDashboardTrends() {
        const res = await this.axios.$get("/api/Dashboard/get-charts")
        return res
    }
}

export default ({ app, $axios }, inject) => {
    var dashboard = new DashboardServices($axios);
    // Get trend data
    inject("getChartTrends", () => dashboard.getDashboardTrends())
}