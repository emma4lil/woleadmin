<template>
  <v-row>
    <v-col cols="9">
      <DashboardStats :data="metrics" />
      <v-row>
        <v-col>
          <SalesChart />
        </v-col>
        <v-col>
          <SalesChart />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <SalesChart />
        </v-col>
        <v-col>
          <SalesChart />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3">
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
      refreshing: false
    };
  },
  mounted() {
    var r = this.$getMetrics();
    r.then((d) => {
      this.metrics = d.data;
    });
    var k = setInterval(() => this.refresh(), 20000)
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
