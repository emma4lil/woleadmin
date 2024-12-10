<template>
    <v-card elevation="0">
        <v-row>

            <v-col class="wheat">
                <div class="d-flex flex-wrap">
                    <div v-for="(item, index) in  accounts" :key="index">
                        <v-card outlined class="mx-2 my-2" elevation="1" min-width="150" min-height="200">
                            <v-card-title primary-title class="blue--text">
                                {{ item.bankName ?? "not-set" }} | {{ item.currency }}
                            </v-card-title>

                            <div class="mx-4 blue--text">
                                <p>{{ item.accountName }}</p>
                                <p>{{ item.number }}</p>
                            </div>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="toggleActive(item.id)" text small color="primary">{{ item.isActive ?
                        "Disable" : "Enable" }}</v-btn>
                                <v-btn @click="deleteAccount(item.id)" icon text small color="primary">
                                    <v-icon small color="red">mdi-delete</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn elevation="0" @click="dialog = true" class="mx-2" color="primary">Add Account</v-btn>
            </v-col>

        </v-row>
        <!-- New account dialog -->
        <v-dialog v-model="dialog" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
            <v-card class="rounded-xs">
                <v-card-title primary-title class="primary--text">
                    New Account
                </v-card-title>
                <v-card-text class="mt-2">
                    <v-text-field v-model="payload.bank" outlined name="name" label="Bank" id="id"></v-text-field>
                    <v-text-field v-model="payload.name" outlined name="name" label="Account name"
                        id="id"></v-text-field>
                    <v-text-field v-model="payload.number" outlined name="name" label="Number" id="id"></v-text-field>
                    <v-select item-text="title" item-value="value" outlined :items="currencyMap"
                        v-model="payload.currency" label="Select currency"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :loading="loading" @click="postData()" class="pl-2" color="primary">Save Account</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-card>
</template>

<script>
export default {
    mounted() {
        this.$getAllBankAccounts().then(r => {
            this.accounts = r.data
        })
    },
    name: "Deposit Settings",
    data() {
        return {
            dialog: false,
            loading: false,
            currencyMap: [
                {
                    title: "NAIRA",
                    value: 222
                },
                {
                    title: "EURO",
                    value: 444
                },
                {
                    title: "LIRA",
                    value: 333
                },
                {
                    title: "USD",
                    value: 111
                },
            ],
            accounts: [],
            payload: {
                bank: "",
                name: "",
                number: "",
                currency: 111
            }
        }
    },
    methods: {
        toggleDialog() {
            this.dialog = true
        },
        postData() {
            this.$postNewBankAccount(this.payload).then(
                (d) => {
                    this.dialog = false
                    this.$getAllBankAccounts().then(r => {
                        this.accounts = r.data
                    })
                }
            ).catch(
                err => {
                    alert("Error: Check input!")
                    this.loading = false;
                }
            )
        },
        toggleActive(id) {
            this.$toggleActive(id).then(r => {
                this.$getAllBankAccounts().then(x => {
                    this.accounts = x.data
                })
            })
        },
        deleteAccount(id) {
            this.$deleteAccount(id).then(r => {
                this.$getAllBankAccounts().then(x => {
                    this.accounts = x.data
                })
            })
        }
    }
}
</script>