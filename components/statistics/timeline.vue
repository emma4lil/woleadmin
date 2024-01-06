<template>
    <v-card class="mx-auto mt-2"  elevation="1" outlined style="overflow-y: auto; max-height: 680px;">
        <v-card flat>
            <v-card-title class="pa-2">
                <h3 class="text-h6 font-weight-light text-center grow">
                    Activity stream
                </h3>
            </v-card-title>
        </v-card>

        <v-card-text class="py-0">
            <v-timeline align-top dense>
                <v-timeline-item color="pink" small>
                    <v-row class="pt-0">
                        <v-col cols="3">
                            <strong>5pm</strong>
                        </v-col>
                        <v-col>
                            <strong>New Icon</strong>
                            <div class="text-caption">
                                Mobile App
                            </div>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item color="teal lighten-3" small>
                    <v-row class="pt-0">
                        <v-col cols="3">
                            <strong>4pm</strong>
                        </v-col>
                        <v-col>
                            <strong>Design Stand Up</strong>
                            <div class="text-caption mb-2">
                                Hangouts
                            </div>

                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item color="pink" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>12pm</strong>
                        </v-col>
                        <v-col>
                            <strong>Lunch break</strong>
                        </v-col>
                    </v-row>
                </v-timeline-item>
                <v-timeline-item color="pink" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>12pm</strong>
                        </v-col>
                        <v-col>
                            <strong>Lunch break</strong>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item color="pink" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>12pm</strong>
                        </v-col>
                        <v-col>
                            <strong>Lunch break</strong>
                        </v-col>
                    </v-row>
                </v-timeline-item>
                <v-timeline-item color="pink" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>12pm</strong>
                        </v-col>
                        <v-col>
                            <strong>Lunch break</strong>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item color="teal lighten-3" small>
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>9-11am</strong>
                        </v-col>
                        <v-col>
                            <strong>Finish Home Screen</strong>
                            <div class="text-caption">
                                Web App
                            </div>
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "ActivityTimeline"
}
</script>