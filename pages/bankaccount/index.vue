<template>
    <v-container class="mt-4" fluid>
        <v-row>
            <v-col>
                <!-- {{Claims}} -->
                <v-card elevation="10" class="pa-4 outlined flat">
                    <v-card-title class="font-weight-bold">Deposit claims</v-card-title>

                    <v-card-text class="pl-0" v-if="true">
                        <div class="d-flex">
                            <div class="font-weight-bold ml-3 indigo grey--text lighten-5 pa-4 rounded-lg">Total Claims:
                                <span class="font-weight-bold black--text">{{ deposit_items?.items?.totalClaims }}</span>
                            </div>

                            <div class="font-weight-bold ml-3 indigo grey--text lighten-5 pa-4 rounded-lg">Pending
                                Claims:
                                <span class="font-weight-bold black--text">{{ deposit_items?.items?.pendingClaims }}</span>
                            </div>

                            <div class="font-weight-bold ml-3 indigo orange--text lighten-5 pa-4 rounded-lg">Processing
                                Claims:
                                <span class="font-weight-bold orange--text">{{ deposit_items?.items?.proccessingClaims
                                }}</span>
                            </div>


                            <div class="font-weight-bold ml-3 indigo red--text lighten-5 pa-4 rounded-lg">Rejected Claims:
                                <span class="font-weight-bold red--text">{{ deposit_items?.items?.rejectedClaims }}</span>
                            </div>


                            <v-spacer></v-spacer>
                            <div class="font-weight-bold ml-3 green white--text lighten-1 pa-4 rounded-lg">Paid Claims:
                                <span class="font-weight-bold white--text">{{ deposit_items?.items?.acceptedClaims }}</span>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-text class="pl-0">
                        <div class="d-flex flex-column">
                            <v-card outlined class="font-weight-bold  ml-3 pa-4 rounded-lg">Deposit filter<br>
                                <v-card-text>
                                    <div class="d-flex justify-space-between">
                                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field class="pr-2" dense outlined v-model="depositFilter.startdate"
                                                    label="Start date" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="depositFilter.startdate"
                                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                                min="1950-01-01" @change="save1"></v-date-picker>
                                        </v-menu>

                                        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field class="pr-2" dense outlined v-model="depositFilter.enddate"
                                                    label="End date" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="depositFilter.enddate"
                                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                                min="1950-01-01" @change="save2"></v-date-picker>
                                        </v-menu>
                                        <v-select outlined class="pr-2" dense item-text="title" item-value="value"
                                            :items="statusFilter" v-model="depositFilter.claimtype"
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
                    :items="deposit_items?.items?.claims" :search="search" item-key="claim.id" class="elevation-10"
                    show-group-bys group-by="statusDesc">
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
                        <v-img class="my-1 rounded-sm" lazy-src="https://picsum.photos/id/11/10/6" max-height="70"
                            max-width="70" :src="item.attachmentUrl"></v-img>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn :to="`/flyers/${item.flyerId}`" outlined x-small color="wheat">flyer</v-btn>
                        <v-btn v-if="item.TradeStatus === 6" x-small color="blue">Dispute</v-btn>
                    </template>

                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-card outlined elevation="0" class="ma-2">
                                <v-card-title primary-title>
                                    Actions
                                </v-card-title>
                                <v-card-text>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ducimus blanditiis
                                        inventore corrupti eligendi voluptatibus aperiam, dolorem laboriosam perferendis
                                        iste autem rerum fugit ratione accusamus pariatur fuga laudantium suscipit officia.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ducimus blanditiis
                                        inventore corrupti eligendi voluptatibus aperiam, dolorem laboriosam perferendis
                                        iste autem rerum fugit ratione accusamus pariatur fuga laudantium suscipit officia.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ducimus blanditiis
                                        inventore corrupti eligendi voluptatibus aperiam, dolorem laboriosam perferendis
                                        iste autem rerum fugit ratione accusamus pariatur fuga laudantium suscipit officia.
                                    </p>
                                </v-card-text>
                                <v-card-text>
                                    <div class="d-flex justify-space-between">
                                        <v-text-field class="ml-3" outlined label="Bank Name"
                                            v-model="value"></v-text-field>
                                        <v-text-field class="ml-3" outlined label="Bank Account"
                                            v-model="value"></v-text-field>
                                        <v-text-field class="ml-3" outlined label="Refrence" v-model="value"></v-text-field>
                                        <v-select class="ml-3" outlined :items="[1, 2, 4]" v-model="value"
                                            label="Change status"></v-select>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <v-btn block color="primary">Save</v-btn>
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
        <!-- {{ deposit_items.items.claims }} -->
    </v-container>
</template>
  
<script>
import ResolveDepositsClaim from '~/components/deposits/ResolveDepositsClaim.vue';
export default {
    components: { ResolveDepositsClaim },
    async mounted() {
        this.$getDepositClaims(this.depositFilter).then(r => {
            this.deposit_items.items = r.item2
        });
    },
    data() {
        var current = new Date();
        const prior = new Date().setDate(current.getDate() - 30);
        return {
            menu1: false,
            menu2: false,
            expanded: [],
            headers: [
                {
                    text: "Email",
                    value: "email"
                },
                {
                    text: "Fullname",
                    value: "fullName"
                },
                {
                    text: "Bank Name",
                    value: "claim.bankName"
                },
                {
                    text: "Account Number",
                    value: "claim.accountNumber"
                },
                {
                    text: "Amount",
                    value: "claim.amount"
                },
                {
                    text: "Status",
                    value: "claimStatus"
                },
                {
                    text: "Attachment",
                    value: "claim.attachmentUrl"
                },
                {
                    text: "Staff",
                    value: "claimHandler"
                },
                {
                    text: "Remarks",
                    value: "claim.remark"
                }

            ],
            fetching_deposits: false,
            deposit_items: {

                items: [
                    {

                    }
                ],
                statistics: {

                }
            },
            depositFilter: {
                startdate: this.parseDate(new Date(prior).toLocaleDateString()),
                enddate: this.parseDate(new Date().toLocaleDateString()),
                claimtype: 0
            },
            statusFilter: [
                {
                    title: "All",
                    value: -1
                },
                {
                    title: "Pending",
                    value: 0
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
            this.fetching_deposits = true
            this.$getDepositClaims(this.depositFilter).then(r => {
                this.deposit_items.items = r.item2
                this.fetching_deposits = false
            });
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
            this.$refs.menu1.save(date)
        },
        save2(date) {
            this.$refs.menu2.save(date)
        },
        parseDate(date) {
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month}-${day}`
        },
        getColor(status) {
            if (status == "Pending") return "orange lighthen-4"
            if (status == "Success") return "green"
            if (status == "Cancelled") return "Red"
            if (status == "Processing") return "blue"
        },
    },
};
</script>
  