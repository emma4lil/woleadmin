<template>
  <v-card outlined class="elevation-1">
    <div class="d-flex justify-space-between pa-4">
      <div class="caption">{{ new Date(info.created).toDateString() }}</div>
      <v-chip x-small rounded-0 v-if="!info.resolved" class="grey--text caption">Not resolved</v-chip>
      <v-chip x-small rounded-0 v-else class="grey--text caption">Resolved</v-chip>
    </div>

    <v-divider></v-divider>
    <v-card-text>
      <v-sheet class="rounded pa-2" color="grey lighten-3">
           <div class="caption grey--text">Reason:</div>
        {{ info.reason }}
      </v-sheet>
    </v-card-text>
    <v-card-text v-if="info.resolved">
      <v-sheet class="rounded pa-2" color="blue lighten-4">
        <div class="caption grey--text">Remark:</div>
        <div class="body-2">{{ info.remark }}</div>
      </v-sheet>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="gotoFlyer()" text x-small color="blue">See Flyer</v-btn>
      <v-btn @click="safe()" text x-small color="green">safe</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!info.resolved" @click="unsafe()" text x-small color="red">unsafe</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Report",
  props: ["info", "index"],
  methods: {
    gotoFlyer() {
      this.$router.push("/flyers/" + this.info.flyerId);
    },
    safe() {
      this.$resolveComplaint(this.info.flyerId, false);
    },
    unsafe() {
      this.$resolveComplaint(this.info.flyerId, true);
    },
  },
};
</script>
