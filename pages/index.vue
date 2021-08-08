<template>
  <v-row>
    <v-col cols="12" lg="6">
      <sales-chart />
    </v-col>
    <v-col cols="12" lg="6">
      <info-card title="Active Users" :count="12322" />
      <info-card title="Total flyers" count="334" />
    </v-col>

    {{$auth.user}}
  </v-row>
</template>

<script>
import InfoCard from "~/components/statistics/info-card.vue";
import SalesChart from "~/components/statistics/sales-chart.vue";
export default {
  auth: true,
  components: { SalesChart, InfoCard },
  name: "Index",
};
</script>