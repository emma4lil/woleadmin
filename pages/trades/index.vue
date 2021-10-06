<template>
  <v-container class="mt-4" fluid>
    <v-row>
      <v-col>
        <!-- {{trades}} -->
        <v-card flat class="transparent">
          <v-card-title primary-title> Trade overview </v-card-title>

          <v-row class="mb-4">
            <v-col v-for="i in infoCard" :key="i">
              <v-card height="100" class="pa-2 mb-4" flat color="blue">
                <span class="subtitle-1">{{ i }}</span>
                <div>45</div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- Data Table -->
      <v-col cols="12">
        <v-data-table
          dense
          :headers="headers"
          :items="trades"
          :search="search"
          item-key="name"
          class="elevation-1"
          show-group-by
          group-by="statusDesc"
        >
          <template v-slot:top>
            <v-text-field v-model="search" label="Search trades" class="mx-4">
            </v-text-field>
          </template>

          <template v-slot:item.action = "{item}">
            <v-btn x-small color="blue">flyer</v-btn>
            <v-btn v-if="item.TradeStatus === 6" x-small color="blue">Dispute</v-btn>
          </template>
           <template v-slot:item.statusDesc = "{item}">
            <v-chip small>{{item.statusDesc}}</v-chip>
          </template>
        </v-data-table>
        <!-- {{ trades }} -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Trade Identifier ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Trade Status", value: "statusDesc" },
        { text: "Created", value: "created" },
        { text: "flyer owner", value: "producerEmail" },
        { text: "Consumer", value: "consumerEmail" },
        { text: "Agreed Price (Tele)", value: "price" },
        { text: "Quantity", value: "quantity" },
        { text: "Delivery Address", value: "deliveryAddress" },
        { text: "Action", value: "action" },
      ],
      trades: [],
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "Id",
      keys: [
        "Id",
        "Created",
        "FlyerId",
        "Producer",
        "Consumer",
        "CustomerPays",
        "Price",
        "Quantity",
        "TimeOut",
        "TradeStatus",
      ],
      infoCard: ["Total", "Successful", "Disputed", "New"],
      items: [
        {
          Id: "yyy-xxx-zzz",
          Created: "2021-23-3",
          flyerId: "xxx-yyy-zzz",
          Producer: "emma4lil@gmail.com",
          Consumer: "Jue34lil@gmail.com",
          CustomerPays: true,
          Quantity: 0,
          Price: 454, // In tele
          TimeOut: 454, //hrs
          TradeStatus: "Awaiting user acceptance!",
        },
        {
          Id: "aaa-bbb-ccc",
          Created: "2021-23-3",
          flyerId: "xxx-yyy-zzz",
          Producer: {
            Id: "ttt-eee-mmm",
            email: "emma34lil@gmail.com",
          },
          Consumer: {
            Id: "ttt-eee-mmm",
            email: "emma4lil@gmail.com",
          },
          CustomerPays: true,
          Quantity: 0,
          Price: 454, // In tele
          TimeOut: 454, //hrs
          TradeStatus: "Awaiting user acceptance!",
        },
      ],
    };
  },
  async mounted() {
    const d = await this.$getTrades();
    this.trades = d.data;
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>