<template>
  <div>
    <v-card
      :disabled="loading"
      :loading="loading" outlined class="">

      <v-card-text>
        <v-card class="p-4 orange--text">
          <div class="caption grey--text">{{ response.id }}</div>
          <v-row align="center">
            <!-- User Info Section -->
            <v-col cols="12" md="8" class="d-flex flex-column">
              <div class="text-h6 font-weight-medium mb-2 orange--text">{{ response?.fullName }}</div>
              <v-row dense>
                <v-col cols="12" class="d-flex align-center mb-1">
                  <v-icon small density="compact" class="mr-2" color="orange">mdi-email</v-icon>
                  <span class="text-body-2">{{ response?.email }}</span>
                </v-col>
                <v-col cols="12" class="d-flex align-center mb-1">
                  <v-icon small density="compact" class="mr-2" color="orange">mdi-phone</v-icon>
                  <span class="text-body-2">{{ response?.phone }}</span>
                </v-col>
                <v-col cols="12" class="d-flex align-center mb-1">
                  <v-icon small density="compact" class="mr-2" color="orange">mdi-map-marker</v-icon>
                  <span class="text-body-2">{{ response?.location }}</span>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-icon small density="compact" class="mr-2" color="orange">mdi-calendar</v-icon>
                  <span class="text-body-2">{{ new Date(response?.created).toDateString() }}</span>
                </v-col>
              </v-row>
            </v-col>

            <!-- Avatar Section -->
            <v-col cols="12" md="4" class="d-flex justify-end">
              <v-img :src="response.avatarUrl" class="rounded-lg" height="150" width="150" aspect-ratio="1"></v-img>
            </v-col>
          </v-row>
        </v-card>


        <v-divider class="my-4"></v-divider>

        <v-row>
          <v-col cols="12" md="6">
            <div class="subtitle-1 font-weight-medium mb-2">Wallet Summary</div>
            <div class="text-h6 font-weight-light"><span class="caption">Main balance: </span>
              {{ response?.walletBalance }} Tele
            </div>
            <span class="caption text-secondary"> <span class="caption">Bonus balance: </span> {{
                response?.walletBonus
              }} Tele</span>
          </v-col>
          <v-col cols="12" md="6">
            <div class="subtitle-1 font-weight-medium mb-2">In/Out Summary</div>
            <div class="d-flex flex-column">
              <div class="d-flex">
                <v-icon small density="compact" class="mr-1" color="success">mdi-plus</v-icon>
                <div class="caption font-weight-medium mr-3">{{ response?.amountIn?.toFixed(2) }} Tele</div>
              </div>
              <div class="d-flex">
                <v-icon small density="compact" class="mr-1" color="error">mdi-minus</v-icon>
                <div class="caption font-weight-medium mr-3">{{ response?.amountOut?.toFixed(2) }} Tele</div>
              </div>
              <div class="d-flex">
                <v-icon small density="compact" class="mr-1" color="warning">mdi-set-left</v-icon>
                <div class="caption font-weight-medium">{{ response?.diff?.toFixed(2) }} Tele</div>
              </div>
            </div>
          </v-col>
        </v-row>
        <!--        User settings-->
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="d-flex flex-column" style="width: 50%;">
              <v-card-title>User settings</v-card-title>
              <v-card-text>
                <v-select class="elevation-0" label="Referral status" solo></v-select>
                <v-select class="elevation-0" label="Set User Role" solo></v-select>
              </v-card-text>


            </v-card>

          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>
        <!--Transactions-->
        <v-row>
          <v-col cols="12">
            <div class="subtitle-1 font-weight-medium mb-2">Transactions</div>
            <v-data-table
              dense
              :headers="headers.transactions"
              :items="transactions"
              :items-per-page="5"
              class="elevation-1 rounded-lg"
            >
              <template v-slot:item.polarity="{ item }">
                <v-chip size="x-small" small :color="item.polarity === 'credit' ? 'success' : 'error'"
                        text-color="white">
                  {{ item.polarity }}
                </v-chip>
              </template>

              <template v-slot:item.domainType="{ item }">
                <v-chip size="x-small" small :color="getDomainTypeColor(item.domainType)" text-color="white">
                  {{ item.domainType }}
                </v-chip>
              </template>

              <template v-slot:item.created="{ item }">
                {{ new Date(item.created).toDateString() }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>


        <v-row class="mt-4">
          <v-col cols="12" class="d-flex justify-end">
            <v-btn color="primary" rounded block="false">Balance Account</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

<!--      <PermissionMatrix />-->


    </v-card>
  </div>
</template>

<script>
import PermissionMatrix from "~/components/shared/PermissionMatrix.vue";

export default {
  components: {PermissionMatrix},
  props: ["ownerId"],
  name: "ProfileReport",
  mounted() {
    this.loading = true;
    this.$getUserDeepInfo(this.ownerId).then((d) => {
      this.transactions = d.item2.transactions;
      this.loading = false;
      this.response = d.item2;
    });
  },
  data() {
    return {
      response: {},
      loading: false,
      headers: {
        transactions: [
          {
            text: "Created",
            value: "created",
          },
          {
            text: "Domain Type",
            value: "domainType",
          },
          {
            text: "Polarity",
            value: "polarity",
          },
          {
            text: "Amount in Tele",
            value: "amountInTele",
          },
          {
            text: "Amount in Currency",
            value: "amountInCurrency",
          },
          {
            text: "Description",
            value: "description",
          },
        ],
      },
      transactions: [],
    };
  },
  methods: {
    getDomainTypeColor(domainType) {
      if (domainType === "flier") return "primary";
      if (domainType === "bonus") return "secondary";
      if (domainType === "trade") return "tertiary";
      return "default"; // Fallback color
    },
  },
  watch: {
    ownerId() {
      this.loading = true;
      this.$getUserDeepInfo(this.ownerId).then((d) => {
        this.transactions = d.item2.transactions;
        this.loading = false;
        this.response = d.item2;
      });
    }
  }
};
</script>
