<template>
  <v-row>
    <v-col cols="12">
      <v-card class="elevation-0 grey lighten-5 mt-3">
        <v-card-title primary-title class="grey--text">
          Wallet Metrics
        </v-card-title>
        <div class="d-flex justify-space-between">
          <div class="my-2 ml-2" style="width: 200px;">
            <info-card :count="233" postfix="Tele" title="Daily Profit" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="394.67" postfix="Tele" title="Balance" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="234.94" postfix="Tele" title="In Escrow" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="233.94" postfix="$" title="Balance in USD" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="stats.dailyProfit" postfix="$" title="Tele Ingress" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="193.94" postfix="$" title="Tele Egress" />
          </div>
        </div>
      </v-card>
    </v-col>
    <!-- Payment Table -->
    <v-col>
      <v-card class="elevation-0 grey lighten-5">
        <v-card-title primary-title class="grey--text">
          Payment History
        </v-card-title>
        <v-data-table :headers="headers" :items="payments" :items-per-page="5" class="elevation-15 mx-2"></v-data-table>

        {{payments}}
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import infoCard from "~/components/statistics/info-card.vue";

export default {
  components: { infoCard },
  mounted() {
    this.$getAllPayments().then((d) => {
      this.payments = d.data.payments,
      this.stats = d.data.getStats
    });
  },
  data() {
    return {
      headers: [
        {
          text: "Transaction ID",
          align: "start",
          sortable: false,
          value: "transactionId",
        },
        { text: "Provider", value: "provider" },
        { text: "Currency", value: "currency" },
        { text: "Amount (Currency)", value: "amountInCurrency" },
        { text: "Amount (Tele)", value: "amountInTele" },
        { text: "Email", value: "ownerEmail" },
        { text: "Date", value: "created" },
        { text: "Action", value: "" },
      ],
      payments: [],
      stats: {}

    };
  },
};
</script>
