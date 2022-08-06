<template>
  <v-card color="grey lighten-4" elevation-10 class="pa-2">
    <div primary-title>
      <!-- {{ ticket }} -->
      <div class="pb-2">
        <v-card elevation="0">
          <div class="d-flex justify-space-around pt-2">
            <v-chip outlined small class="subtitle-2">{{
              ticket.flyerOwner
            }}</v-chip>
            vs
            <v-chip outlined small class="subtitle-2">{{
              ticket.consumer
            }}</v-chip>
          </div>
          <p class="px-4 pt-3 caption grey--text">{{ ticket.tradeId }}</p>
          <v-card-text> trade discription goes here </v-card-text>
        </v-card>
      </div>
    </div>
    <v-row>
      <!-- Chat Box -->
      <v-col cols="12" md="6">
        <v-card
          height="500"
          width=""
          outlined
          class="d-flex flex-column justify-end"
        >
          <v-card-text ref="box" class="ma-2 overflow-x-auto">
            <v-sheet
              outlined
              rounded="lg"
              class="pa-2 my-2"
              color="grey lighten-5"
              v-for="(chat, idx) in chats"
              :key="idx"
            >

              <h5 class="subtitle">{{ chat.SenderEmail }}</h5>
              <p>
                {{ chat.Message }}
              </p>
              <div class="d-flex justify-space-between grey--text">
                <h6>{{ new Date(chat.CreatedAt).toLocaleString() }}</h6>
                <h6>sent</h6>
              </div>
            </v-sheet>
          </v-card-text>

          <v-card-actions>
            <v-text-field
              ref="vtf"
              dense
              color="blue"
              append-outer-icon="mdi-send"
              @click:append-outer="send"
              outlined
              filled
              :label="inputBar.title"
              v-model="msg"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- Action Center -->
      <v-col cols="12" md="6">
        <v-card outlined class="">
          <v-card-text> lorem </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- {{ chats }} -->
  </v-card>
</template>

<script>
export default {
  props: ["ticket", "chats"],
  data() {
    return {
      inputBar: {
        title: "Sending...",
        text: "",
      },

      result: "",
      isResolving_btn: false,
      selected_resolvee_price: {},
      selected_resolvee_dfee: {},
      status: "timeline",
      loading_modbtn: false,
      msg: "",
      messages: [],
      //participants: [{ user: this.ticket.flyerOwner, Id: 11 }, { user: this.ticket.consumer, Id: 22 }],
    };
  },
  methods: {
    send() {
      this.status = "sending";
      this.inputBar.title = "Sending message..."
      const mybox = this.$refs.box;
      mybox.scrollTop = mybox.scrollHeight + 100;

      let chat = {};
      chat.Message = this.msg;
      chat.SenderEmail = "Aje";
      chat.RecieverEmail = "";
      chat.TradeId = this.ticket.tradeId;
      chat.InDispute = true;
      chat.IsMedia = false;
      chat.CreatedAt = new Date();

      //this.messages.push(chat);
      this.$store.commit("chat/push_chat", chat);
      this.$sendChat(this.ticket.tradeId, this.msg)
        .then((d) => {
          this.inputBar.title = "Sent";
          this.msg = ""
        })
        .catch((e) => {
          this.inputBar.title = "retry";
        });
    },
    setModerator() {
      this.loading_modbtn = true;
      this.$setModerator(this.ticket.tradeId)
        .then((d) => {
          this.loading_modbtn = false;
          alert(d.success);
        })
        .catch((e) => {
          this.loading_modbtn = false;
          alert(e);
        });
    },
    resolve() {
      this.isResolving_btn = true;
      this.result = "resolving...";
      let user_ids = {
        user_price: this.selected_resolvee_price.Id,
        user_dfee: this.selected_resolvee_dfee.Id,
        disputeId: this.ticket.id,
      };

      this.$resolveDisputeFor(user_ids)
        .then((r) => {
          this.isResolving_btn = false;
          this.result = r.message;
        })
        .catch((e) => {
          this.isResolving_btn = false;
          this.result = "Other Errors!";
        });
    },
  },
  computed: {
    mergeMsg() {
      let externalmsg = this.chats;
    },
    participants() {
      return [
        { user: this.ticket.flyerOwner, Id: this.ticket.flyerOwnerId },
        { user: this.ticket.consumer, Id: this.ticket.consumerId },
      ];
    },
  },
};
</script>

<style scoped>
div.flow {
  overflow: auto;
  height: 385px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(90, 60, 201, 0.74);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
