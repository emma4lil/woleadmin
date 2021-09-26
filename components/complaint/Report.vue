<template>
  <v-card class="elevation-1">
    <div class="d-flex justify-space-between pa-4">
      <div class="text-h6">#{{ index }}</div>
      <div v-if="!info.resolved" class="grey--text caption">Not resolved</div>
      <div v-else class="grey--text caption">Resolved</div>
    </div>

    <div class="mx-4 caption">{{ info.created }}</div>
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
