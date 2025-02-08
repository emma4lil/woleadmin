<template>
  <v-row class="dashboard-stats">
    <v-col cols="12">
      <v-card class="stats-card" elevation="2" outlined>
        <v-card-text class="d-flex justify-between flex-wrap">
          <div class="stat-item d-flex">
            <v-sheet elevation="1" class="stat-sheet d-flex align-center pa-2">
              <v-icon class="stat-icon pr-2" size="40">mdi-card</v-icon>
              <div class="d-flex flex-column text-center">
                <div class="stat-value">{{ data.noOfFlyers }}</div>
                <div class="text-caption">Flyers</div>
              </div>
            </v-sheet>
          </div>

          <div class="stat-item d-flex">
            <v-sheet elevation="1" class="stat-sheet d-flex align-center pa-2">
              <v-icon class="stat-icon pr-2" size="40">mdi-account-group</v-icon>
              <div class="d-flex flex-column text-center">
                <div class="stat-value">{{ data.noOfUsers }}</div>
                <div class="text-caption">Users</div>
              </div>
            </v-sheet>
          </div>

          <div class="stat-item d-flex">
            <v-sheet elevation="1" class="stat-sheet d-flex align-center pa-2">
              <v-icon class="stat-icon pr-2" size="40">mdi-swap-horizontal</v-icon>
              <div class="d-flex flex-column text-center">
                <div class="stat-value">{{ data.noOfTrades }}</div>
                <div class="text-caption">Trades</div>
              </div>
            </v-sheet>
          </div>

          <div class="stat-item d-flex">
            <v-sheet elevation="1" class="stat-sheet d-flex align-center pa-2">
              <v-icon class="stat-icon pr-2" size="40">mdi-scale-balance</v-icon>
              <div class="d-flex flex-column text-center">
                <div class="stat-value">{{ data.noOfDisputes }}</div>
                <div class="text-caption">Disputes</div>
              </div>
            </v-sheet>
          </div>

          <div class="stat-item d-flex">
            <v-sheet elevation="1" class="stat-sheet d-flex align-center pa-2">
              <v-icon class="stat-icon pr-2" size="40">mdi-email-open-outline</v-icon>
              <div class="d-flex flex-column text-center">
                <div class="stat-value">{{ data.pendingInvites }}</div>
                <div class="text-caption">Pending Invites</div>
              </div>
            </v-sheet>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DashboardStats",
  props: ["data"]
};
</script>

<style scoped>
.dashboard-stats {
  --icon-color: #fc0; /* Adaptive for dark mode */
  --text-color: #fff; /* For dark mode readability */
  --background-color: rgba(0, 0, 0, 0.6); /* Subtle dark card background */
}

.stats-card {
  background-color: var(--background-color);
  color: var(--text-color);
}

.stat-item {
  flex: 1;
  min-width: 120px; /* Mobile responsive adjustments */
  margin: 10px;
}

.stat-sheet {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.stat-icon {
  color: var(--icon-color);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
}

@media (max-width: 600px) {
  .dashboard-stats .stat-item {
    min-width: 100px;
  }
}
</style>
