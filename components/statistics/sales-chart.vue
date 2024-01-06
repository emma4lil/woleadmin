<template>
  <v-card class="ma-3" color="" dark max-width="">
    <v-card-text>
      <v-sheet class="d-flex justify-space-between">
        <v-card class="">
          <v-card-title class="subtitle-2">
            Total Users
          </v-card-title>
          <v-card-text class="subtitle-1">
            <p>234434 Users</p>
            <p class="caption">2000 Users in last month</p>
          </v-card-text>
        </v-card>


      </v-sheet>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline show_labels :labels="labels" :value="value" color="white" height="100" padding="24" stroke-linecap="round" smooth>
          <template v-slot:label="item"> {{ item.value }} </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin text-center">Trades for the week</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  name: "sparkline",
  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760],
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }),
};
</script>