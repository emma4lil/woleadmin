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
                            <div class="font-weight-bold  ml-3 indigo lighten-5 pa-4 rounded-lg">Deposits Statistics<br>
                                <!-- <v-data-table headers="headers" items="items" hide-actions class="elevation-1" select-all
                                    pagination.sync="pagination" item-key="id" loading="true" search="search">

                                </v-data-table> -->
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn elevation="0" small color="primary">Configure Deposits</v-btn>
                    </v-card-actions>
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
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
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
  