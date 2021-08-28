<template>
  <v-row>
    <v-col cols="12" lg="6">
      <sales-chart />
    </v-col>
    <v-col cols="12" lg="6">
      <v-row class="d-flex justify-start">
        <v-col cols="6" lg="4">
          <info-card title="Users" :count="metrics.noOfUsers" />
        </v-col>
        <v-col cols="6" lg="4">
          <info-card title="Flyers" :count="metrics.noOfFlyers" />
        </v-col>
        <v-col cols="6" lg="4">
          <info-card title="Trades" :count="metrics.noOfTrades" />
        </v-col>
        <v-col cols="6" lg="4">
          <info-card title="Daily Trades" :count="metrics.noOfNewTrades" />
        </v-col>
        <v-col cols="6" lg="4">
          <info-card title="Completed Trade" :count="metrics.noOfCompletedTrades" />
        </v-col>
        <v-col cols="6" lg="4">
          <info-card title="Disputed Trades" :count="metrics.noOfDisputes" />
        </v-col>
      </v-row>
    </v-col>
    <br />
    {{ metrics }}
  </v-row>
</template>

<script>
import InfoCard from "~/components/statistics/info-card.vue";
import SalesChart from "~/components/statistics/sales-chart.vue";
export default {
  auth: true,
  components: { SalesChart, InfoCard },
  name: "Index",
  data() {
    return {
      metrics: {
        noOfUsers: "wait...",
      },
    };
  },
  mounted() {
    var r = this.$getMetrics();
    r.then((d) => {
      this.metrics = d.data;
    });
  },
};
</script>