<template>
    <v-container>
        <v-card :loading="loading" outlined class="pa-4">
            <v-card-title primary-title>
                Profile Report
            </v-card-title>
            <v-row>
                <v-col cols="12" md="4">
                    <v-img :src="response.avatarUrl"
                        class="rounded-lg" height="150" contain></v-img>
                </v-col>
                <v-col cols="12" md="8" class="d-flex flex-column justify-center">
                    <div class="headline font-weight-bold mb-2">{{ response?.fullName }}</div>
                    <div class="body-1 mb-2">
                        <v-icon small class="mr-1">mdi-email</v-icon>{{ response?.email }}
                    </div>
                    <div class="body-1 mb-2">
                        <v-icon small class="mr-1">mdi-phone</v-icon>{{ response?.phone }}
                    </div>
                    <div class="body-1 mb-2">
                        <v-icon small class="mr-1">mdi-map-marker</v-icon>{{ response?.location }}
                    </div>
                    <div class="body-1 mb-2">
                        <v-icon small class="mr-1">mdi-calendar</v-icon>{{ response?.created }}
                    </div>
                </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
                <v-col cols="12" md="6">
                    <div class="subtitle-1 mb-2">Wallet Balance</div>
                    <div class="font-weight-bold">{{ response?.walletBalance }} Tele</div> <span> {{ response?.walletBonus }} Tele</span>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="subtitle-1 mb-2">Transactions Summary</div>
                    <div class="d-flex align-center">
                        <v-icon small class="mr-1">mdi-plus</v-icon>
                        <div class=" caption mr-3">{{ response?.amountIn?.toFixed(2) }} Tele</div>
                        <v-icon small class="mr-1">mdi-minus</v-icon>
                        <div class=" caption mr-3">{{ response?.amountOut?.toFixed(2) }}</div>
                        <v-icon small class="mr-1">mdi-set-left</v-icon>
                        <div class=" caption">{{ response?.diff?.toFixed(2) }}</div>
                    </div>
                </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
                <v-col cols="12">
                    <div class="subtitle-1 mb-2">Transactions</div>
                    <v-data-table  group-by="domainType" dense :headers="headers.transactions" :items="transactions" :items-per-page="25"
                        class="elevation-1">
                        <template v-slot:item.polarity="{ item }">
                            <v-chip x-small
                                :class="{ 'green': item.polarity === 'credit', 'red': item.polarity === 'debit' }">{{
                        item.polarity }}</v-chip>
                        </template>

                        <template v-slot:item.domainType="{ item }">
                            <v-chip class="rounded-0" :class="{
                        'blue': item.domainType === 'flier',
                        'orange': item.domainType === 'bonus',
                        'purple': item.domainType === 'trade'
                    }" x-small>
                                {{ item.domainType }}
                            </v-chip>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="text-right">
                    <v-btn color="primary">Balance Account</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: ["ownerId"],
    name: "ProfileReport",
    mounted() {
        this.loading = true;
        this.$getUserDeepInfo(this.ownerId).then(d => {
            this.transactions = d.item2.transactions
            this.loading = false
            this.response = d.item2
        })
    },
    data() {
        return {
            response: {},
            loading: false,
            headers: {
                transactions: [
                    {
                        text: 'Created',
                        align: '',
                        sortable: true,
                        value: 'created',
                        groupable: false,
                    },
                    {
                        text: 'Domain Type',
                        align: '',
                        sortable: true,
                        value: 'domainType',
                    },
                    {
                        text: 'Polarity',
                        align: '',
                        sortable: true,
                        value: 'polarity',
                        groupable: false,
                    },
                    {
                        text: 'Amount in Tele',
                        align: '',
                        sortable: true,
                        value: 'amountInTele',
                        groupable: false,
                    },
                    {
                        text: 'Amount in Currency',
                        align: '',
                        sortable: true,
                        value: 'amountInCurrency',
                        groupable: false,
                    },
                    {
                        text: 'Description',
                        align: '',
                        value: 'description',
                        groupable: false,
                    },
                ]
            },
            transactions: [

            ]
        }
    }
}
</script>