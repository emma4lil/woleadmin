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
                                <span class="font-weight-bold black--text">10092</span>
                            </div>

                            <div class="font-weight-bold ml-3 indigo grey--text lighten-5 pa-4 rounded-lg">Pending
                                Claims:
                                <span class="font-weight-bold black--text">232</span>
                            </div>

                            <div class="font-weight-bold ml-3 indigo orange--text lighten-5 pa-4 rounded-lg">Disputed
                                Claims:
                                <span class="font-weight-bold orange--text">34</span>
                            </div>


                            <div class="font-weight-bold ml-3 indigo red--text lighten-5 pa-4 rounded-lg">Rejected Claims:
                                <span class="font-weight-bold red--text">98</span>
                            </div>


                            <v-spacer></v-spacer>
                            <div class="font-weight-bold ml-3 green white--text lighten-1 pa-4 rounded-lg">Paid Claims:
                                <span class="font-weight-bold white--text">122</span>
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
                                                :active-picker.sync="activePicker"
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
                                                :active-picker.sync="activePicker"
                                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                                min="1950-01-01" @change="save2"></v-date-picker>
                                        </v-menu>
                                        <v-select outlined class="pr-2" dense item-text="title" item-value="value"
                                            :items="statusFilter" v-model="depositFilter.claimtype"
                                            label="Claim type"></v-select>
                                        <v-btn height="40" color="primary">Filter</v-btn>

                                    </div>

                                </v-card-text>
                            </v-card>
                        </div>
                    </v-card-text>

                </v-card>
            </v-col>
            <!-- Data Table -->
            <v-col cols="12">
                <v-data-table dense :headers="headers" :items="trades" :search="search" item-key="name" class="elevation-10"
                    show-group-bys group-by="statusDesc">
                    <template v-slot:top>
                        <v-text-field outlined v-model="search" label="Search claims" class="mx-4 py-4">
                        </v-text-field>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn :to="`/flyers/${item.flyerId}`" outlined x-small color="wheat">flyer</v-btn>
                        <v-btn v-if="item.TradeStatus === 6" x-small color="blue">Dispute</v-btn>
                    </template>
                    <template v-slot:item.statusDesc="{ item }">
                        <v-chip small>{{ item.statusDesc }}</v-chip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        {{ depositFilter }}
    </v-container>
</template>
  
<script>
export default {
    data() {

        var current = new Date();
        const prior = new Date().setDate(current.getDate() - 30);
        return {
            menu1: false,
            menu2: false,
            headers: [
                {
                    text: "Email",
                    value: "123"
                },
                {
                    text: "Fullname",
                    value: "123"
                },
                {
                    text: "Fullname",
                    value: "123"
                },
                {
                    text: "Fullname",
                    value: "123"
                },

            ],
            deposit_items: {

                items: [
                    {

                    }
                ],
                statistics: {

                }
            },
            depositFilter: {
                startdate: null, // new Date(prior).toDateString(),
                enddate: null, //new Date().toDateString(),
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
    async mounted() {

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
        getfilteredResults(){},
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
    },
};
</script>
  