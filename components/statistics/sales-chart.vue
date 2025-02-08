<template>
  <v-card
    @click="isBar = !isBar"
    class="ma-0 pa-0"
    elevation="0"
    :color="cardColor"
    max-width="600"
  >
    <v-card-text>
      <v-sheet :color="sheetColor" class="d-flex justify-space-between align-center rounded">
        <!-- Left Section -->
        <div>
          <v-card-title class="subtitle-1 font-weight-medium">
            {{ data?.title }} Statistics
          </v-card-title>
          <v-card-text class="body-2">
            <p class="ma-0">{{ data?.total }} {{ data?.title }}s so far</p>
            <p class="caption mt-1 grey--text">
              {{ data?.prevTotal }} {{ data?.title }}s last month
            </p>
          </v-card-text>
        </div>

        <!-- Right Section -->
        <div class="text-right">
          <v-card-title class="subtitle-1 font-weight-medium">
            This Week
          </v-card-title>
          <v-card-text class="body-2">
            <span class="font-weight-medium">{{ data?.weekTotal ?? 0 }} </span>{{ data?.title }}s
            <p :class="trendClass">{{ trendPercentage }}%</p>
          </v-card-text>
        </div>
      </v-sheet>

      <!-- Sparkline Section -->
      <v-sheet :color="sheetColor" class="sparkline-container rounded">
        <v-sparkline
          auto-draw
          :type="chartType"
          :gradient="gradients"
          :labels="data?.labels"
          :value="data?.values"
          height="140"
          stroke-linecap="round"
          padding="16"
        >
          <template v-slot:label="{ value, index }">
            <span class="caption">{{ value }} ({{ data.values[index] }})</span>
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['data'],
  name: "SparklineCard",
  data: () => ({
    isBar: true,
    gradients: ['#00c6ff', '#F0F', '#FF0'], // Material You primary colors
  }),
  computed: {
    chartType() {
      return this.isBar ? "bar" : "trend";
    },
    trendPercentage() {
      if (this.data?.prevTotal && this.data?.weekTotal) {
        return (((this.data.weekTotal - this.data.prevTotal) / this.data.prevTotal) * 100).toFixed(2);
      }
      return "0.00";
    },
    trendClass() {
      const trend = parseFloat(this.trendPercentage);
      return trend >= 0 ? "green--text text--accent-4" : "red--text text--darken-2";
    },
    cardColor() {
      return this.$vuetify.theme.dark ? "#121212" : "white";
    },
    sheetColor() {
      return this.$vuetify.theme.dark ? "#1E1E1E" : "#F5F5F5";
    },
  },
};
</script>

<style scoped>
.card-container {
  border-radius: 16px;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.card-container:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.sparkline-container {
  padding: 12px;
  border-radius: 12px;
}

.subtitle-1 {
  color: var(--v-theme-primary, #00c6ff); /* Adapted for Material You colors */
}

.caption {
  color: rgba(0, 0, 0, 0.6);
}

.text-center {
  margin-top: 16px;
  color: var(--v-theme-primary, #f0f);
}

.green--text {
  color: #4caf50 !important;
}

.red--text {
  color: #f44336 !important;
}
</style>
