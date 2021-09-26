<template class="grey lighten-4">
  <v-row>
      <v-col cols="12">
          <div class="text-h3">
              User's flyer reports
          </div>
      </v-col>
    <v-col cols="3" v-for="(report, i) in complaints" :key="i">
      <report :info="report" :index="i + 1" />
    </v-col>
  </v-row>
</template>

<script>
import Report from "~/components/complaint/Report.vue";
export default {
  components: { Report },
  data() {
    return {
      complaints: [],
    };
  },
  async mounted() {
    const d = await this.$getComplaints();
    this.complaints = d.data.complains;
  },
};
</script>