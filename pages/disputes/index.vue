<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title primary-title>
          Dispute Resolutions
        </v-card-title>
      </v-card>
    </v-col>
    <v-col class="lighten-4" cols="5">
      <v-row>
        <v-col cols="6" v-for="(ticket, i) in tickets" :key="i">
          <ticket v-on:moderate="setTicket(ticket)" :index="i" :ticket="ticket" />
        </v-col>
      </v-row>
    </v-col>
    <v-col class="parent" cols="7">
      <chatbox v-if="currentTicket" :ticket="currentTicket" :chats="chats" class="sticky" />
    </v-col>

    <!-- {{$store.state.chat.chats}} -->
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
      chats: []
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
    async getChatsForTradeV2() {
      let chats = []
      if (this.currentTicket != null) {
        this.$getChatsForTradeV2(this.currentTicket.tradeId).then(r => {
          this.chats = r.data
        })
      }

    }
  },
  computed: {
    getChatsForTrade() {
      const chats = this.$store.state.chat.chats;
      let id = "";
      if (this.currentTicket != null) {
        id = this.currentTicket.tradeId;
      }
      let filtered = chats.filter((el) => el.TradeId == id);
      console.log(this.currentTicket);
      return filtered;
    },

  },
  watch: {
    currentTicket(nv, ov) {

      this.getChatsForTradeV2()

    }
  }
}
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
