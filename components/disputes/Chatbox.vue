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
          <v-card-text>
            <v-btn
              :loading="loading_modbtn"
              @click="setModerator"
              elevation="0"
              block
              color="primary"
              dark
              >Moderate this</v-btn
            >
          </v-card-text>
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
              <h5 v-if="!chat.isAdminChat" class="subtitle">{{ chat.senderEmail }}</h5>
              <h5 v-else class="font-weight-bold blue--text">Aje</h5>
              <p>
                {{ chat.message }}
              </p>
              <div class="d-flex justify-space-between grey--text">
                <h6>{{ new Date(chat.createdAt).toLocaleString() }}</h6>
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
          <div class="blue pa-4 white--text mb-4">Resolve Dispute Actions</div>
          <v-card-text>
            <v-select
              outlined
              :items="participants"
              item-text="user"
              item-value="Id"
              v-model="selected_resolvee_price"
              label="Who gets the trade cost?"
            ></v-select>
            <v-select
              outlined
              :items="participants"
              item-text="user"
              item-value="Id"
              v-model="selected_resolvee_dfee"
              label="Who gets the delivery fee?"
            ></v-select>
            <v-btn
              :loading="isResolving_btn"
              @click="resolve"
              elevation="0"
              block
              color="blue"
              dark
              >Resolve</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- {{ chats }} -->
    <v-snackbar
      :color="snackBar.color"
      @timeout="3000"
      v-model="snackBar.showSnackBar"
    >
      {{ snackBar.message }}
    </v-snackbar>
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
      snackBar: {
        message: "",
        showSnackBar: false,
        color: "info",
      },

      result: "",
      isResolving_btn: false,
      selected_resolvee_price: "",
      selected_resolvee_dfee: "",
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
      this.inputBar.title = "Sending message...";
      const mybox = this.$refs.box;
      mybox.scrollTop = mybox.scrollHeight + 100;

      let chat = {}
      chat.message = this.msg
      chat.isAdminChat = true
      chat.createdAt = new Date().toLocaleString()


      this.$sendChat(this.ticket.tradeId, this.msg)
        .then((d) => {
          this.chats.push(chat)
          this.inputBar.title = "Sent";
          this.msg = "";
        })
        .catch((e) => {
          this.inputBar.title = "retry";
        });
    },
    async setModerator() {
      this.loading_modbtn = true;
      this.$setModerator(this.ticket.tradeId)
        .then((d) => {
          this.loading_modbtn = false;
          this.snackBar = {
            message: d.message,
            color: "purple",
            showSnackBar: true,
          };
          //this.$router.go()
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
        user_price: this.selected_resolvee_price,
        user_dfee: this.selected_resolvee_dfee,
        disputeId: this.ticket.id,
      };

      this.$resolveDisputeFor(user_ids)
        .then((r) => {
          this.snackBar = {
            message: r.message,
            color: "blue",
            showSnackBar: true,
          };
          this.isResolving_btn = false;
          this.result = r.message;
        })
        .catch((e) => {
          this.isResolving_btn = false;
          this.result = "Other Errors!";
          this.snackBar = {
            message: e.message,
            color: "red",
            showSnackBar: true,
          };
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
