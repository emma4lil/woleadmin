<template>
  <v-row>
    <v-col cols="4">
      <v-card height="200">
        <v-card-title primary-title>
          Withdrawal requests
        </v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr class="blue--text">
                <td>Total withdrawal requests</td>
                <td>{{ metrics?.totalRequestCount.toLocaleString('en-US') }}</td>
              </tr>
              <tr class="yellow--text">
                <td>Pending withdrawals</td>
                <td>{{ metrics?.pendingRequests.toLocaleString('en-US') }}</td>
              </tr>
              <tr class="green--text">
                <td>Successful withdrawals</td>
                <td>{{ metrics?.successfulRequests.toLocaleString('en-US') }}</td>
              </tr>
              <tr class="red--text">
                <td>Rejected withdrawals</td>
                <td>{{ metrics?.rejectedRequest.toLocaleString('en-US') }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card class="yellow--text" height="200">
        <v-card-title primary-title>
          Breakdown (Pending)
        </v-card-title>
        <v-simple-table class="yellow--text" dense>
          <template v-slot:default>
            <tbody>
              <tr class="font-weight-bold">
                <td>Net pending requests</td>
                <td>{{ metrics?.pendingRequests.toLocaleString('en-US') }}</td>
                <td>{{ metrics?.pendingRequestsTotal.toLocaleString('en-US') }} NGN</td>
              </tr>
              <tr v-if="metrics?.pendingCountInNaira">
                <td>NGN</td>
                <td>{{ metrics?.pendingCountInNaira.toLocaleString('en-US') }}</td>
                <td>{{ metrics?.pendingInNaira.toLocaleString('en-US') }} NGN</td>
              </tr>
              <tr v-if="metrics?.pendingCountInUsd">
                <td>USD</td>
                <td>{{ metrics?.pendingCountInUsd.toLocaleString('en-US') }}</td>
                <td>{{ metrics?.pendingInUsd.toLocaleString('en-US') }} USD</td>
              </tr>
              <tr v-if="metrics?.pendingCountInEuro">
                <td>Euro</td>
                <td>{{ metrics?.pendingCountInEuro.toLocaleString('en-US') }}</td>
                <td>{{ metrics?.pendingInEuro.toLocaleString('en-US') }} EURO</td>
              </tr>
              <tr v-if="metrics?.pendingCountInLira">
                <td>Turkish Lira</td>
                <td>{{ metrics?.pendingCountInLira.toLocaleString('en-US') }}</td>
                <td>{{ metrics?.pendingInLira.toLocaleString('en-US') }} LIRA</td>
              </tr>
              <tr v-if="metrics?.pendingCountInUsdt">
                <td>USDT</td>
                <td>{{ metrics?.pendingCountInUsdt.toLocaleString('en-US') }}</td>
                <td>{{ metrics?.pendingInUsdt.toLocaleString('en-US') }} USDT</td>
              </tr>

            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card height="200">
        <v-card-title primary-title>
          Payments Information
        </v-card-title>
        <v-simple-table class="blue--text" dense>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Total Withrawals</td>
                <td>{{ metrics?.totalRequestTele.toLocaleString('en-US') }} Tele</td>
                <td>{{ metrics?.totalRequest.toLocaleString('en-US') }} NGN</td>
              </tr>
              <tr>
                <td>Pending withdrawals</td>
                <td>{{ metrics?.pendingRequestsTele.toLocaleString('en-US') }} Tele</td>
                <td>{{ metrics?.pendingRequestsTotal.toLocaleString('en-US') }} NGN</td>
              </tr>
              <tr>
                <td>Successful withdrawals</td>
                <td>{{ metrics?.successfulRequestsTele.toLocaleString('en-US') }} Tele</td>
                <td>{{ metrics?.successfulRequestsTotal.toLocaleString('en-US') }} NGN</td>
              </tr>
              <tr>
                <td>Rejected withdrawals</td>
                <td>{{ metrics?.rejectedRequestTele.toLocaleString('en-US') }} Tele</td>
                <td>{{ metrics?.rejectedRequestTotal.toLocaleString('en-US') }} NGN</td>
              </tr>

            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <!-- Requests -->
    <v-col cols="12">
      <section class="loop">
        <v-row>
          <v-col cols="6" lg="3" v-for="(req, i) in withdraws" :key="i">
            <request :withdraw="req" />
          </v-col>
        </v-row>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import Request from "~/components/withdrawal/Request.vue";
export default {
  components: { Request },
  data() {
    return {
      withdraws: [],
      metrics: {

      }
    };
  },
  mounted() {
    this.$getWithdraws().then((d) => {
      this.withdraws = d.data.withdrawals;
      this.metrics = d.data.metrics;
    });
  },
};
</script>
