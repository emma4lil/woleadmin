<template>
  <v-card @click="isBar = !isBar" class="ma-0 pa-0" color="" max-width="">
    <v-card-text>
      <v-sheet color="" class="d-flex justify-space-between">
        <v-card elevation="0" class="">
          <v-card-title class="subtitle-2">
            {{ data?.title }} Statistics
          </v-card-title>
          <v-card-text class="subtitle-1">
            <p class="ma-0">{{ data?.total }} {{ data?.title }}s so far</p>
            <p class="caption mt-1">{{ data?.prevTotal }} {{ data?.title }}s in last month</p>
          </v-card-text>
        </v-card>
        <v-card elevation="0" class="">
          <v-card-title class="subtitle-2">
            This week so far
          </v-card-title>
          <v-card-text class="subtitle-1">
            <span>{{ data?.weekTotal ?? 0 }} </span>Trades
            <p class="green--text">4.23%</p>
          </v-card-text>
        </v-card>

      </v-sheet>
      <v-sheet color="">
        <v-sparkline auto-draw :type="chartType" show_labels :gradient="gradients" :labels="data?.labels"
          :value="data?.values" height="155" padding="24" stroke-linecap="round">
          <template class="subtitle-2" v-slot:label="item">
            {{ item?.value }} ({{ data.values[item.index] }})
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <div class="text-h4 font-weight-thin text-center">{{ data?.currentTotal }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['data'],
  components: {},
  name: "sparkline",
  data: () => ({
    isBar: true,
    gradients: ['#00c6ff', '#F0F', '#FF0'],
  }),
  computed: {
    chartType() {
      return this.isBar ? "bar" : 'trend'
    }
  }
};
</script>