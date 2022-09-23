<template>
  <v-row>
    <v-col cols="12">
      <v-card class="elevation-0 grey lighten-5 mt-3">
        <v-card-title primary-title class="grey--text">
          Wallet Metrics
        </v-card-title>
        <!-- {{ tstats }} -->
        <div class="d-flex justify-space-between">
          <div class="my-2 ml-2" style="width: 200px;">
            <info-card
              :count="tstats.totalTxCharge"
              postfix="Tele"
              title="Total Tx Charge"
            />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="stats.walletBalance" postfix="Tele" title="In Wallets" />
          </div>
          <div class="my-2 ml-2">
            <info-card
              :count="tstats.amountInEscrowHolding"
              postfix="Tele"
              title="In Escrow"
            />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="tstats.amountInEscrowPaid" postfix="$" title="Escrow Pay Outs" />
          </div>
          <div class="my-2 ml-2">
            <info-card
              :count="tstats.amountInEscrowRefunded"
              postfix="$"
              title="Escrow Refunds"
            />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="tstats.totalDepositAmount" postfix="$" title="Tele Deposited" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="tstats.totalWithdrawAmount" postfix="$" title="Tele Withdrawn" />
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-sheet class="mx-5 pa-3 rounded" color="blue lighten-5">
        <div class="mb-2">Payments in Tele</div>
        <div class="white mb-2 pa-2 rounded">
          <div class="h6">Daily Payments</div>
          <span class="text-caption"
            >USD: <span>{{ tstats.dailyAmountInUSD }}</span></span
          >
          &#124;
          <span class="text-caption"
            >EURO: <span>{{ tstats.dailyAmountInEURO }}</span></span
          >
          &#124;
          <span class="text-caption"
            >NGN: <span>{{ tstats.dailyAmountInNGN }}</span></span
          >
          &#124;
          <span class="text-caption"
            >LIRA: <span>{{ tstats.dailyAmountInTRY }}</span></span
          >
          &#124;
          <span class="text-caption"
            >USDT: <span>{{ tstats.dailyAmountInUSDT }}</span></span
          >
        </div>
        <div class="white pa-2 rounded">
          <div class="h6">Payments Summary</div>
          <span class="text-caption"
            >USD: <span>{{ tstats.dailyAmountInUSD }}</span></span
          >
          &#124;
          <span class="text-caption"
            >EURO: <span>{{ tstats.dailyAmountInEURO }}</span></span
          >
          &#124;
          <span class="text-caption"
            >NGN: <span>{{ tstats.dailyAmountInNGN }}</span></span
          >
          &#124;
          <span class="text-caption"
            >LIRA: <span>{{ tstats.dailyAmountInTRY }}</span></span
          >
          &#124;
          <span class="text-caption"
            >USDT: <span>{{ tstats.dailyAmountInUSDT }}</span></span
          >
        </div>
      </v-sheet>
    </v-col>
    <v-col cols="12">
      <v-sheet class="mx-5 pa-3 rounded" color="blue lighten-5">
        <div class="mb-2">Withrawals in Tele</div>
        <div class="white mb-2 pa-2 rounded">
          <div class="h6">Daily Withrawals</div>
          <span class="text-caption"
            >USD: <span>{{ tstats.withdrawDailyAmountInUSD }}</span></span
          >
          &#124;
          <span class="text-caption"
            >EURO: <span>{{ tstats.withdrawDailyAmountInEURO }}</span></span
          >
          &#124;
          <span class="text-caption"
            >NGN: <span>{{ tstats.withdrawDailyAmountInNGN }}</span></span
          >
          &#124;
          <span class="text-caption"
            >LIRA: <span>{{ tstats.withdrawDailyAmountInTRY }}</span></span
          >
          &#124;
          <span class="text-caption"
            >USDT: <span>{{ tstats.withdrawDailyAmountInUSDT }}</span></span
          >
        </div>
        <div class="white pa-2 rounded">
          <div class="h6">Total Withrawals</div>
          <span class="text-caption"
            >USD: <span>{{ tstats.amountWithdrawUSD }}</span></span
          >
          &#124;
          <span class="text-caption"
            >EURO: <span>{{ tstats.amountWithdrawEURO }}</span></span
          >
          &#124;
          <span class="text-caption"
            >NGN: <span>{{ tstats.amountWithdrawNGN }}</span></span
          >
          &#124;
          <span class="text-caption"
            >LIRA: <span>{{ tstats.amountWithdrawTRY }}</span></span
          >
          &#124;
          <span class="text-caption"
            >USDT: <span>{{ tstats.amountWithdrawUSDT }}</span></span
          >
        </div>
      </v-sheet>
    </v-col>

    <!-- Payment Table -->
    <v-col>
      <v-card class="elevation-0 grey lighten-5">
        <v-card-title primary-title class="grey--text">
          Payment History
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="payments"
          :items-per-page="5"
          class="elevation-15 mx-2"
        ></v-data-table>


      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import infoCard from "~/components/statistics/info-card.vue";

export default {
  components: { infoCard },
  mounted() {
    this.$getTeleMetrics().then((d) => {
      this.tstats = d;
    });
    this.$getAllPayments().then((d) => {
      (this.payments = d.data.payments), (this.stats = d.data.getStats);
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
      stats: {},
      tstats: {},
    };
  },
};
</script>
