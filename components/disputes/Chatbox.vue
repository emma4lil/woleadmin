<template>
  <v-card height="" width="">
    <v-card-title class="mx-0">Resolve dispute for: {{ ticket.flyerOwner }} vs {{ ticket.consumer }}</v-card-title>
    <v-card-text class="mx-0">
      {{ participants }}
    </v-card-text>
    <v-divider></v-divider>
    <v-row>
      <v-col class="" cols="5">
        <v-card-text>
          <v-sheet class="rounded pa-2" height="400" color="grey lighten-4">
            <div ref="box" class="flow parent pb-5">
              <div class="
                  fixed
                  d-flex
                  justify-center
                  blue-grey
                  lighten-5
                  px-1
                  grey--text
                  rounded
                ">
                <!-- <div>Producer</div> -->
                <div class="caption">
                  <div>{{ status }}</div>
                </div>
                <!-- <div>Consumer</div> -->
              </div>
              <div class="d-flex pr-2" v-bind:class="[msg.SenderEmail === 'You' ? 'justify-end' : '']"
                v-for="(msg, i) in chats" :key="i">
                <v-sheet max-width="150" min-width="80" class="rounded-md pa-1 my-1 caption"
                  :class="[msg.SenderEmail === 'You' ? 'grey lighten-3' : '']" color="white lighten-4">
                  <div class="h6">
                    <span class="text-caption grey--text">{{
                        msg.SenderEmail
                    }}</span>
                  </div>
                  <v-divider></v-divider>
                  <div class="text-caption">{{ msg.Message }}</div>
                  <div class="d-flex justify-end">
                    <div class="caption grey--text">today</div>
                  </div>
                </v-sheet>
              </div>
            </div>
          </v-sheet>
        </v-card-text>

        <v-card-actions>
          <v-text-field outlined append-icon="mdi-send-circle" @click:append="send()" width="40" name="chat"
            label="Message" class="mx-2" v-model="msg" @focus="status = 'typing...'" @change="status = 'timeline'">
          </v-text-field>
          <!-- <v-btn @click="send()" icon color="blue">
            <v-icon size="40">mdi-send-circle</v-icon>
          </v-btn> -->
        </v-card-actions>
      </v-col>
      <v-col class="" cols="5">
        <!-- Particpants -->
        <v-card-text>
          <v-select return-object item-text="user" item-value="id" :items="participants"
            v-model="selected_resolvee_price" label="Resolve price for">
          </v-select>
          <v-select return-object item-text="user" item-value="id" :items="participants"
            v-model="selected_resolvee_dfee" label="Resolve fee for">
          </v-select>

          <span class="text-caption">{{result}}</span>
          <v-btn :loading="isResolving_btn" @click="resolve()" class="my-2" block color="primary" dark>Resolve</v-btn>
          <!-- <v-btn small class="my-2" block color="primary" dark>Close ticket</v-btn> -->
        </v-card-text>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="setModerator()" :loading="loading_modbtn" class="elevation-0" small color="success">Set Moderator
      </v-btn>
    </v-card-actions>
    {{ ticket }}
    price: {{ selected_resolvee_price }}
    fdee: {{ selected_resolvee_dfee }}
  </v-card>
</template>

<script>
export default {
  props: ["ticket", "chats"],
  data() {
    return {
      result: "" ,
      isResolving_btn: false,
      selected_resolvee_price: { user: this.ticket.flyerOwner, Id: 11 },
      selected_resolvee_dfee: { user: this.ticket.consumer, Id: 12 },
      status: "timeline",
      loading_modbtn: false,
      msg: "",
      messages: [],
      //participants: [{ user: this.ticket.flyerOwner, Id: 11 }, { user: this.ticket.consumer, Id: 22 }],
    };
  },
  methods: {
    send() {
      let chat = {};
      this.status = "sending";
      const mybox = this.$refs.box;
      mybox.scrollTop = mybox.scrollHeight;

      chat.Message = this.msg;
      chat.SenderEmail = "You";
      chat.RecieverEmail = "";
      chat.TradeId = this.ticket.tradeId;
      chat.InDispute = true;
      chat.IsMedia = false;
      chat.CreatedAt = "today";

      this.messages.push(this.msg);
      this.$store.commit("chat/push_chat", chat);
      this.$sendChat(this.ticket.tradeId, this.msg)
        .then((d) => {
          this.status = "sent";
        })
        .catch((e) => {
          this.status = "retry";
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
      this.result = "resolving..."
      let user_ids = {
        user_price: this.selected_resolvee_price.Id,
        user_dfee: this.selected_resolvee_dfee.Id,
        disputeId: this.ticket.id
      }

      this.$resolveDisputeFor(user_ids)
        .then((r) => {
          this.isResolving_btn = false
          this.result = "Dispute Resolved!"
        })
        .catch((e) => {
          this.isResolving_btn = false
          this.result = "Failed to resolve dispute!"
        })
    }
  },
  computed: {
    mergeMsg() {
      let externalmsg = this.chats;
    },
    participants () {
      return [{ user: this.ticket.flyerOwner, Id: this.ticket.flyerOwner.Id }, { user: this.ticket.consumer, Id:  this.ticket.consumer.id }]
    }
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
