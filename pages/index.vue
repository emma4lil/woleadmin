<template>
  <v-row>
    <v-col cols="12" lg="6">
      <sales-chart />
    </v-col>
    <v-col cols="12" lg="6">
      <div class="d-flex justify-start">
        <info-card class="mx-2" title="Active Users" :count="12322" />
        <info-card class="mx-2" title="Total flyers" count="334" />
      </div>
    </v-col>

    {{ $auth.user }}
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
      metrics: "some"
    };
  },
  mounted () {
      var r = this.$getMetrics()
      r.then(d => {
        this.metrics = d
      })
  }
};
</script>