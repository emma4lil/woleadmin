<template>
  <v-container>
    <!-- Page Title -->
    <v-row>
      <v-col>
        <h2 class="text-center">Activity Log</h2>
      </v-col>
    </v-row>

    <!-- Filter Options -->
    <v-row class="my-4">
      <!-- Date Filter -->
      <v-col cols="12" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filters.date"
              label="Select Date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="filters.date" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>

      <!-- Activity Type Filter -->
      <v-col cols="12" md="4">
        <v-select
          v-model="filters.activityType"
          :items="activityTypes"
          label="Activity Type"
          dense
        ></v-select>
      </v-col>

      <!-- User Filter -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="filters.user"
          label="User"
          dense
        ></v-text-field>
      </v-col>

      <!-- Filter Button -->
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="applyFilters">Apply Filters</v-btn>
      </v-col>
    </v-row>

    <!-- Activity Log Table -->
    <v-data-table
      :headers="headers"
      :items="filteredLogs"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Activity Log</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.date="{ item }">
        {{ new Date(item.date).toLocaleString() }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      filters: {
        date: null,
        activityType: null,
        user: '',
      },
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Activity', value: 'activity' },
        { text: 'User', value: 'user' },
      ],
      activityTypes: ['Login', 'Logout', 'Create', 'Update', 'Delete'],
      logs: [
        { date: '2024-12-12T09:30:00', activity: 'Login', user: 'John Doe' },
        { date: '2024-12-12T10:15:00', activity: 'Update', user: 'Jane Smith' },
        { date: '2024-12-12T11:00:00', activity: 'Logout', user: 'John Doe' },
      ],
    };
  },
  computed: {
    filteredLogs() {
      return this.logs.filter((log) => {
        const matchesDate = !this.filters.date ||
          new Date(log.date).toDateString() === new Date(this.filters.date).toDateString();
        const matchesActivityType = !this.filters.activityType || log.activity === this.filters.activityType;
        const matchesUser = !this.filters.user || log.user.toLowerCase().includes(this.filters.user.toLowerCase());

        return matchesDate && matchesActivityType && matchesUser;
      });
    },
  },
  methods: {
    applyFilters() {
      // Logic for applying filters can go here if needed
      console.log('Filters applied:', this.filters);
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
