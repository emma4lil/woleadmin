<template>
    <v-card class="mx-auto mt-4" elevation="1" outlined style="overflow-y: auto; max-height: 680px;">
        <v-card flat>
            <v-card-title class="pa-2">
                <h3 class="text-h6 text-center grow">
                    Activity Timeline
                </h3>
            </v-card-title>
        </v-card>

        <v-card-text class="py-0">
            <v-timeline align-top dense>
                <v-timeline-item v-for="log in logs" :key="log.id" color="blue" small>
                    <v-row class="pt-0">

                        <v-col>
                            <div class="text-caption">
                                <span>{{ new Date(log.timestamp).toLocaleString() }}</span>
                            </div>
                            <strong>{{ log.description }}</strong>

                        </v-col>
                    </v-row>
                </v-timeline-item>


            </v-timeline>
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