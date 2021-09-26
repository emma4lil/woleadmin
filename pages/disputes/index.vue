<template>
  <v-row>
    <v-col cols="12">
      <div>Trade Dispute Resolution</div>
      <!-- {{ getChatsForTrade }} -->
    </v-col>
    <v-col class="lighten-4" cols="6">
      <v-row>
        <v-col cols="4" v-for="(ticket, i) in tickets" :key="i">
          <ticket
            v-on:moderate="setTicket(ticket)"
            :index="i"
            :ticket="ticket"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col class="parent" cols="6">
      <chatbox v-if="currentTicket" :ticket="currentTicket" :chats="getChatsForTrade" class="sticky" />
    </v-col>
    <!-- {{ currentTicket }} -->
  </v-row>
</template>

<script>
import Chatbox from "~/components/disputes/Chatbox.vue";
import Ticket from "~/components/disputes/Ticket.vue";
export default {
  data() {
    return {
      tickets: [],
      currentTicket: null,
    };
  },
  components: { Ticket, Chatbox },
  async mounted() {
    this.$getTickets().then((d) => {
      this.tickets = d.data.tickets;
    });
  },
  methods: {
    setTicket(ticket) {
      this.currentTicket = ticket;
    },
  },
  computed: {
    getChatsForTrade() {
      const chats = this.$store.state.chat.chats;
      let id = ""
      if (this.currentTicket != null) {
        id = this.currentTicket.tradeId;
      }
      const filtered = chats.filter((el) => el.TradeId == id);
      return filtered;
    },
  },
};
</script>
<style>
.parent {
  position: relative;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>
