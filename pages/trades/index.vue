<template>
  <v-container class="mt-4" fluid>
    <v-row>
      <v-col>
        <!-- {{trades}} -->

        <v-card width="">
          <v-sparkline
            :value="tradeStats.values"
            :labels="tradeStats.dates"
            label-size="2"
            line-width="1"
            color="green"
            padding="20"
            stroke-linecap="round"

          >
          </v-sparkline>
        </v-card>

        <v-card class="pa-4">
          <div class="text-h4 mb-3 font-weight-thin">Trade Statistics</div>
          <v-divider></v-divider>
          <v-card-text v-if="tradeStats">
            <div class="d-flex">
              <div
                class="
                  font-weight-bold
                  ml-3
                  indigo
                  grey--text
                  lighten-5
                  pa-4
                  rounded-lg
                "
              >
                Total Trades:
                <span class="font-weight-bold black--text">{{
                  tradeStats.totalTrades
                }}</span>
              </div>
              <div
                class="
                  font-weight-bold
                  ml-3
                  indigo
                  grey--text
                  lighten-5
                  pa-4
                  rounded-lg
                "
              >
                Disputed Trades:
                <span class="font-weight-bold black--text">{{
                  tradeStats.inDisputeCount
                }}</span>
              </div>
              <div
                class="
                  font-weight-bold
                  ml-3
                  indigo
                  grey--text
                  lighten-5
                  pa-4
                  rounded-lg
                "
              >
                Successful Trades:
                <span class="font-weight-bold black--text">{{
                  tradeStats.successfulCount
                }}</span>
              </div>
              <div
                class="
                  font-weight-bold
                  ml-3
                  indigo
                  grey--text
                  lighten-5
                  pa-4
                  rounded-lg
                "
              >
                Resolved Trades:
                <span class="font-weight-bold black--text">{{
                  tradeStats.tradeResolvedCount
                }}</span>
              </div>
              <!-- <div class="font-weight-bold ml-3 indigo grey--text lighten-5 pa-4 rounded-lg">Trades in Progress:
                <span class="font-weight-bold black--text">{{tradeStats.inProgress}}</span>
              </div> -->
              <v-spacer></v-spacer>
              <div
                class="
                  font-weight-bold
                  ml-3
                  green
                  white--text
                  lighten-1
                  pa-4
                  rounded-lg
                "
              >
                Trades in Progress:
                <span class="font-weight-bold white--text">{{
                  tradeStats.inProgress
                }}</span>
              </div>
            </div>
          </v-card-text>
          <!-- {{tradeStats}} -->
          <v-card-text>
            <div class="d-flex">
              <div
                class="font-weight-thin ml-3 indigo lighten-5 pa-4 rounded-lg"
              >
                Delivery Fees<br /><span class="font-weight-bold black--text"
                  ><span>{{  parseFloat(tradeStats.dailyDeliveryPrice).toFixed(2) }}</span> /
                  {{  parseFloat(tradeStats.deliveryPrice).toFixed(2) }} TELE</span
                >
              </div>
              <div
                class="
                  font-weight-thin
                  ml-3
                  indigo
                  grey--text
                  lighten-5
                  pa-4
                  rounded-lg
                "
              >
                Agreed Price <br />
                <span class="font-weight-bold black--text"
                  ><span>{{  parseFloat(tradeStats.dailyPrice).toFixed(2) }} </span> /
                  {{  parseFloat(tradeStats.price).toFixed(2)}} TELE</span
                >
              </div>
              <div
                class="font-weight-thin ml-3 indigo lighten-5 pa-4 rounded-lg"
              >
                Transaction Fees <br />
                <span class="font-weight-bold black--text"
                  ><span>{{  parseFloat(tradeStats.dailyTransactionFees).toFixed(2) }} / </span
                  >{{  parseFloat(tradeStats.transactionFees).toFixed(2) }} TELE</span
                >
              </div>

              <v-spacer></v-spacer>
              <!-- <div class="font-weight-bold ml-3 green white--text lighten-1 pa-4 rounded-lg">Trades in Progress:
                <span class="font-weight-bold white--text">{{tradeStats.inProgress}}</span>
              </div> -->
            </div>
          </v-card-text>
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
          class="elevation-3"
          show-group-bys
          group-by="statusDesc"
        >
          <template v-slot:top>
            <v-text-field v-model="search" label="Search trades" class="mx-4">
            </v-text-field>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn
              :to="`/flyers/${item.flyerId}`"
              outlined
              x-small
              color="wheat"
              >flyer</v-btn
            >
            <v-btn v-if="item.TradeStatus === 6" x-small color="blue"
              >Dispute</v-btn
            >
          </template>
          <template v-slot:item.statusDesc="{ item }">
            <v-chip small>{{ item.statusDesc }}</v-chip>
          </template>
        </v-data-table>
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
        { text: "Price (Tele)", value: "price" },
        { text: "Delivery Fee", value: "deliveryFee" },
        { text: "Escrow Status", value: "escrowStatus" },
        { text: "Quantity", value: "quantity" },
        { text: "Delivery Address", value: "deliveryAddress" },
        { text: "Action", value: "action" },
      ],
      trades: [],
      tradeStats: {},
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
    const t = await this.$getTradeMetrics();
    this.trades = d.data;
    this.tradeStats = t;
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
