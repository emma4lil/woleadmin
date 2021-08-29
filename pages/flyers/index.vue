<template>
  <v-row>
    <v-col class="" cols="12">
      <v-card>
        <v-card-title>
          <div class="text-h2">Flyers</div>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          class="mt-8"
          :headers="headers"
          :items="flyers"
          :search="search"
          @click:row="rowClicked"
        ></v-data-table>
      </v-card>
    </v-col>
    <v-col class="blue" cols="6">
      <div>flyers actions and controls</div>
      <div>{{ flyers }}</div>
      <div>{{info}}</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Flyer Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Created", value: "created" },
        { text: "OwnerId", value: "owner.id" },
        { text: "Email", value: "owner.email" },
        { text: "TradeCount", value: "tradeCount" },
        { text: "Description", value: "description" },
      
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
      info: "info",
      flyers: [],
    };
  },
  mounted () {
      this.getFlyers()
  },
  methods: {
    rowClicked(arg1, arg2) {
      this.info = arg1;
    },
    getFlyers() {
      this.$getFlyers().then((d) => {
        this.flyers = d.data;
      });
    },
  },
};
</script>