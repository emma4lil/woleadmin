<template>
    <v-card class="mx-auto mt-4" elevation="1" outlined style="overflow-y: auto; min-height: 577px;">
        <v-card flat>
            <v-card-title class="pa-2">
                <h3 class="text-h6 orange--text text-center grow">
                    Activity Timeline
                </h3>
            </v-card-title>
        </v-card>

        <v-card-text class="py-0">

            <v-card v-if="!logs.length" class="text-center" elevation='0'>
                No activity logs
            </v-card>

            <v-card min-height="60" outlined @click="" v-for="log in logs" :key="log.id" class="my-2 px-2">
                <v-row class="pt-0">

                    <v-col>
                        <h5 class="blue--text">{{ log.userId }}</h5>
                        <strong class="orange--text">{{ log.description }}</strong>
                        <div class="text-caption grey--text">
                            <span>{{ new Date(log.timestamp).toLocaleString() }}</span>
                        </div>

                    </v-col>
                </v-row>
            </v-card>


        </v-card-text>

    </v-card>
</template>

<script>
export default {
    name: "ActivityTimeline",
    mounted() {
        this.$getActivityLogs().then(logs => {
            this.logs = logs
        })
    },
    data() {
        return {
            logs: []
        }
    }
}
</script>