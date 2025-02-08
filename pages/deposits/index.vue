<template>
  <v-container class="mt-4" fluid>
    <v-row>
      <v-col>
        <!-- {{Claims}} -->

        <v-card elevation="10" class="pa-4 outlined flat">
          <v-card-title class="font-weight-bold">Deposit claims</v-card-title>

          <v-card-text class="pl-0" v-if="true">
            <div class="d-flex">
              <div class="font-weight-bold ml-3 indigo grey--text lighten-5 pa-4 rounded-lg">
                Total Claims:
                <span class="font-weight-bold black--text">{{
                  deposit_items?.items?.totalClaims
                }}</span>
              </div>

              <div class="font-weight-bold ml-3 indigo grey--text lighten-5 pa-4 rounded-lg">
                Pending Claims:
                <span class="font-weight-bold black--text">{{
                  deposit_items?.items?.pendingClaims
                }}</span>
              </div>

              <div class="font-weight-bold ml-3 indigo orange--text lighten-5 pa-4 rounded-lg">
                Processing Claims:
                <span class="font-weight-bold orange--text">{{
                  deposit_items?.items?.proccessingClaims
                }}</span>
              </div>

              <div class="font-weight-bold ml-3 indigo red--text lighten-5 pa-4 rounded-lg">
                Rejected Claims:
                <span class="font-weight-bold red--text">{{
                  deposit_items?.items?.rejectedClaims
                }}</span>
              </div>

              <v-spacer></v-spacer>
              <div class="font-weight-bold ml-3 green white--text lighten-1 pa-4 rounded-lg">
                Paid Claims:
                <span class="font-weight-bold white--text">{{
                  deposit_items?.items?.acceptedClaims
                }}</span>
              </div>
            </div>
          </v-card-text>

          <v-card-text class="pl-0">
            <div class="d-flex flex-column">
              <v-card outlined class="font-weight-bold ml-3 pa-4 rounded-lg">Deposit filter<br />
                <v-card-text>
                  <div class="d-flex justify-space-between">
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                      offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field class="pr-2" dense outlined v-model="depositFilter.startDate" label="Start date"
                          readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="depositFilter.startDate" :max="new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                          .toISOString()
                          .substring(0, 10)
                        " min="1950-01-01" @change="save1"></v-date-picker>
                    </v-menu>

                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition"
                      offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field class="pr-2" dense outlined v-model="depositFilter.endDate" label="End date"
                          readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="depositFilter.endDate" :max="new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                          .toISOString()
                          .substring(0, 10)
                        " min="1950-01-01" @change="save2"></v-date-picker>
                    </v-menu>
                    <v-select outlined class="pr-2" dense :items="statusFilter" v-model="depositFilter.claimType"
                      label="Claim type"></v-select>
                    <v-btn :loading="fetching_deposits" @click="getfilteredResults()" height="40"
                      color="primary">Filter</v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Data Table -->
      <v-col cols="12">
        <v-data-table :expanded.sync="expanded" single-expand show-expand dense :headers="headers"
          :items="deposit_items?.items?.claims" :search="search" item-key="claim.id" class="elevation-10" show-group-bys
          group-by="statusDesc">
          <template v-slot:item.claim.createdAt="{ item }">
            <div class="primary--text">
              {{ new Date(item.claim.createdAt).toLocaleString() }}
            </div>
          </template>
          <template v-slot:top>
            <v-text-field outlined v-model="search" label="Search claims" class="mx-4 py-4">
            </v-text-field>
          </template>

          <template v-slot:item.claimStatus="{ item }">
            <v-chip small class="rounded-sm" :color="getColor(item.claimStatus)">
              {{ item.claimStatus }}
            </v-chip>
          </template>

          <template v-slot:item.claim.attachmentUrl="{ item }">
            <v-img @click="showImage(item.attachmentUrl)" class="my-1 rounded-sm"
              lazy-src="https://picsum.photos/id/11/10/6" max-height="40" max-width="40"
              :src="item.attachmentUrl"></v-img>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn :to="`/flyers/${item.flyerId}`" outlined x-small color="wheat">flyer</v-btn>
            <v-btn v-if="item.TradeStatus === 6" x-small color="blue">Dispute</v-btn>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-card outlined elevation="0" class="ma-2">
                <v-card-title primary-title> Enter details </v-card-title>
                <v-card elevation="0" outlined class="ml-4" width="400">
                  <v-simple-table dense width="400">
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td>Depositor</td>
                          <td>{{ item.fullName }}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{{ item.email }}</td>
                        </tr>
                        <tr>
                          <td>Claim Status</td>
                          <td>
                            <v-chip color="yellow" x-small>{{
                              item.claimStatus
                            }}</v-chip>
                          </td>
                        </tr>
                        <tr>
                          <td>Handler</td>
                          <td>{{ item.claim.adminId }}</td>
                        </tr>
                        <tr>
                          <td>Tele</td>
                          <td>
                            {{ item.claim.amountInTeleEarned }}
                          </td>
                        </tr>
                        <tr>
                          <td>Tele Rate</td>
                          <td>
                            {{ item.claim.teleRate }}
                          </td>
                        </tr>
                        <tr>
                          <td>Currency</td>
                          <td>
                            {{ item.Currency }}
                          </td>
                        </tr>
                        <tr>
                          <td>Created</td>
                          <td>
                            {{
                              new Date(item.claim.createdAt).toLocaleString()
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>

                <v-card-text>
                  <div class="d-flex justify-space-between">
                    <v-text-field class="ml-3" outlined label="Bank Name" v-model="item.claim.bankName"></v-text-field>
                    <v-text-field class="ml-3" outlined label="Bank Account"
                      v-model="item.claim.accountNumber"></v-text-field>
                    <v-text-field class="ml-3" outlined label="Refrence" v-model="item.claim.referenceId"></v-text-field>
                    <v-select class="ml-3" outlined :items="currencies" v-model="item.claim.paidInCurrency"
                      label="Paid In Currency"></v-select>
                    <v-select class="ml-3" outlined :items="claimStatus" v-model="item.claim.status"
                      label="Change status"></v-select>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn @click="setClaimInfo(item)" block color="primary">Save</v-btn>
                </v-card-text>
              </v-card>
            </td>
          </template>

          <template v-slot:item.statusDesc="{ item }">
            <v-chip small>{{ item.statusDesc }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
      <v-col>
        <resolve-deposits-claim />
      </v-col>
    </v-row>
    <v-dialog v-model="imageDialog.show" :overlay="false" scrollable transition="dialog-transition">
      <v-card>
        <v-card-title primary-title> Attachment viewer </v-card-title>
        <v-card-text>
          <v-img aspect-ratio="16/9" min-height="800" :src="imageDialog.srcLink"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ResolveDepositsClaim from "~/components/deposits/ResolveDepositsClaim.vue";
export default {
  components: { ResolveDepositsClaim },
  async mounted() {
    this.$getDepositClaims(this.depositFilter).then((r) => {
      this.deposit_items.items = r.item2;
    });
  },
  data() {
    var current = new Date();
    const prior = new Date().setDate(current.getDate() - 30);
    return {
      imageDialog: {
        zoom: 0,
        show: false,
        srcLink: "",
      },
      menu1: false,
      menu2: false,
      expanded: [],
      headers: [
        {
          text: "Requested On",
          value: "claim.createdAt",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Fullname",
          value: "fullName",
        },
        {
          text: "Amount",
          value: "claim.amount",
        },
        {
          text: "Status",
          value: "claimStatus",
        },
        {
          text: "Attachment",
          value: "claim.attachmentUrl",
        },
      ],
      fetching_deposits: false,
      deposit_items: {
        items: [{}],
        statistics: {},
      },
      depositFilter: {
        startDate: new Date(prior).toLocaleDateString(),
        endDate: new Date().toLocaleDateString(),
        claimType: 0,
      },
      claimInfo: {
        bankName: "",
        bankAccount: "",
        refrence: "",
        status: 0,
      },
      currencies: [
        {
          text: "NGN",
          value: 222,
        },
        {
          text: "USD",
          value: 111,
        },
        {
          text: "EURO",
          value: 444,
        },
      ],
      claimStatus: [
        {
          text: "Pending",
          value: 0,
        },
        {
          text: "Processing",
          value: 1,
        },
        {
          text: "Success",
          value: 2,
        },
        {
          text: "Rejected",
          value: 3,
        },
        {
          text: "Refunded",
          value: 4,
        },
      ],
      statusFilter: [
        {
          text: "All",
          value: -1,
        },
        {
          text: "Pending",
          value: 0,
        },
        {
          text: "Processing",
          value: 1,
        },
        {
          text: "Success",
          value: 2,
        },
        {
          text: "Rejected",
          value: 3,
        },
        {
          text: "Refunded",
          value: 4,
        },
      ],
      search: "",
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
    };
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
    async getfilteredResults() {
      this.fetching_deposits = true;
      this.$getDepositClaims(this.depositFilter).then((r) => {
        this.deposit_items.items = r.item2;
        this.fetching_deposits = false;
      });
    },

    async setClaimInfo(claim) {
      this.$processDeposit(claim).then((r) => {
        alert(r.item2)
        this.$getDepositClaims(this.depositFilter).then((r) => {
          this.deposit_items.items = r.item2;
        });
      });
    },

    showImage(link) {
      this.imageDialog.show = true;
      this.imageDialog.srcLink = link;
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    save1(date) {
      this.$refs.menu1.save(date);
    },
    save2(date) {
      this.$refs.menu2.save(date);
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month}-${day}`;
    },
    getColor(status) {
      if (status == "Pending") return "primary";
      if (status == "Success") return "green";
      if (status == "Cancelled") return "Red";
      if (status == "Processing") return "blue";
    },
  },
};
</script>
