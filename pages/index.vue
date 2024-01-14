<template>
  <v-row>
    <v-col cols="8">
      <DashboardStats class="mt-1" :data="metrics" />
      <v-row>
        <v-col  cols="6">
          <SalesChart :data="ChartData?.users" />
        </v-col>
        <v-col cols="6">
          <SalesChart :data="ChartData?.trades" />
        </v-col>
        <v-col cols="6">
          <SalesChart :data="ChartData?.fliers" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4">
      <ActivityTimeline />
    </v-col>
  </v-row>
</template>

<script>
import DashboardStats from "~/components/statistics/dashboard-stats.vue";
import ActivityTimeline from "~/components/statistics/timeline.vue";
import InfoCard from "~/components/statistics/info-card.vue";
import SalesChart from "~/components/statistics/sales-chart.vue";
export default {
  auth: false,
  components: { SalesChart, InfoCard, DashboardStats, ActivityTimeline },
  name: "Index",
  data() {
    return {
      metrics: {
        noOfUsers: "wait...",
      },
      refreshing: false,
      ChartData: {
        users: {},
        trades: {}
      }
    };
  },
  mounted() {
    var r = this.$getMetrics();
    r.then((d) => {
      this.metrics = d.data;
    });
    var k = setInterval(() => this.refresh(), 20000)

    // Trend data

    var t = this.$getChartTrends();
    t.then(d => {
      this.ChartData = d
    })
  },
  methods: {
    refresh() {
      this.refreshing = true
      var r = this.$getMetrics();
      r.then((d) => {
        this.metrics = d.data;
        this.refreshing = false
      });
    },
  },
};
</script>
