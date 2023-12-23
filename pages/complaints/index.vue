<template class="grey lighten-4">
  <v-row>
    <v-col cols="12">
      <v-card elevation-1 class="mt-5">
        <v-card-title primary-title>
          Filter
        </v-card-title>
        <v-card-text class="d-flex justify-space-between">
          <v-btn-toggle variants="plain" v-model="toggle_exclusive">
            <v-btn>
              All
            </v-btn>

            <v-btn>
              Resolved
            </v-btn>

            <v-btn>
              Not Resolved
            </v-btn>
          </v-btn-toggle>
          <v-btn color="blue">Fetch</v-btn>
        </v-card-text>
      </v-card>
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
      toggle_exclusive: 0
    };
  },
  async mounted() {
    const d = await this.$getComplaints();
    this.complaints = d.data.complains;
  },
};
</script>