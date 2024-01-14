<template>
    <v-container fluid>
        <v-card>
            <v-card-title>Activity Logs <v-btn class="ml-3" show="!show" @click="show = true" color="">Show
                    calender</v-btn></v-card-title>
            <v-card-text>
                <!-- Date Range Picker -->

                <v-expand-transition>
                    <div show="show">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-date-picker v-model="payload.startDate" label="Start Date"></v-date-picker>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-date-picker v-model="payload.endDate" label="End Date"></v-date-picker>
                            </v-col>
                        </v-row>

                    </div>
                </v-expand-transition>

                <v-row>
                    <v-col>

                        <div class="d-flex justify-space-between">

                            <!-- Domain Filter -->
                            <v-text-field v-model="payload.userId" name="name" label="User Email" id="id"
                                outlined></v-text-field>
                            <v-select v-model="payload.domain" :items="filter.domains" label="Select Domain"
                                outlined></v-select>
                            <v-select v-model="payload.actionId" :items="filter.actions[payload.domain]"
                                label="Select Actions" outlined></v-select>
                        </div>


                        <v-btn :loading="loading" @click="getLogsFromServer()" block color="primary" dark>Fetch</v-btn>

                    </v-col>
                </v-row>

                <!-- Activity Logs List -->
                <v-list>
                    <v-list-item-group v-if="logs.length">
                        <v-list-item v-for="(log, index) in logs" :key="index">
                            <v-list-item-content>
                                <v-list-item-title>{{ log.description }}</v-list-item-title>
                                <v-list-item-subtitle>{{ log.timestamp }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    <v-list-item v-else>
                        <v-list-item-content class="text--center">No activity logs available.</v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
            {{ show }}
        </v-card>
    </v-container>
</template>
  
<script>

export default {
    data() {
        return {
            show: false,
            loading: false,
            logs: [

            ],
            filter: {
                domains: [
                    {
                        text: "All",
                        value: 0
                    },
                    {
                        text: "Flyers",
                        value: 1
                    },
                    {
                        text: "Wallet",
                        value: 2
                    }
                ],
                actions: {
                    1:
                        [{ text: "All", value: 0 }, { text: "Create", value: 1 }, { text: "Update", value: 2 }]
                    ,
                    2:
                        [{ text: "All", value: 0 }, { text: "Deposit", value: 1 }, { text: "Credit", value: 2 }]
                }
            },
            payload: {
                startDate: new Date(new Date().setDate(new Date().getDate() - 7))
                    .toLocaleDateString(),
                endDate: new Date().toLocaleDateString(),
                domain: 0,
                actionId: 0,
                userId: ""
            }
        };
    },
    computed: {

    },
    mounted() {
        this.getLogsFromServer()
    },
    methods: {
        getLogsFromServer() {
            this.loading = true
            this.$getLogs(this.payload).then(logs => {
                this.show = false
                this.logs = logs
                this.loading = false
            })
        }
    }
};
</script>