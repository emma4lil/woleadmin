<template>
  <v-card>
    <div class="
        pa-2
        text-caption
        grey--text
        lighten-3
        d-flex
        flex-column
      ">

      <div>T{{index}}#{{ ticket.id.substring(-1,5) }} - <v-chip x-small>{{ ticket.isResolved ? "Resolved" : "Not Resolved" }}</v-chip></div>
      <div class="blue--text" v-if="ticket.moderator">{{ ticket.moderator }}</div>
      <div v-else class="orange--text">No Moderator</div>
    </div>
    <div class="mx-2 grey--text text-caption">
      Created: {{ new Date(ticket.created).toLocaleString() }}
    </div>
    <v-divider></v-divider>
    <div class="d-flex flex-column text-center font-weight-light">
      <div>{{ ticket.flyerOwner }} - owner</div>
      <div>vs</div>
      <div>
        {{ ticket.consumer }} - <span v-if="ticket.whoIsPaying">buyer</span><span
          v-if="!ticket.whoIsPaying">seller</span>
      </div>
    </div>
    <v-card-actions>
      <v-btn @click="gotoTrades()" class="elevation-0" x-small color="success">see trade</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="setFocus()" class="elevation-0" x-small color="blue">Moderate</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Ticket",
  props: ["index", "ticket"],
  methods: {
    setFocus() {
      this.$emit("moderate");
    },
    gotoTrades() {
      this.$router.push("/trades/" + this.ticket.tradeId);
    },
    setModrator() {

    }
  },
};
</script>
