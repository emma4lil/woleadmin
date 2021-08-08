<template>
  <v-card class="" color="deep-orange" dark max-width="">
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="white"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item"> ${{ item.value }} </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">Trades for the week.</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn block text> Goto Trades </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {},
  name: "sparkline",
  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
};
</script>