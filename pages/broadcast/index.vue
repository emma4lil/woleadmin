<script>
export default {
  name: "index",
  data() {
    return {
      messageToSend: {
        heading: "",
        content: ""
      },
      loading: false,
      recentMessage: []
    }
  },
  mounted() {
    this.$getBroadcastMessages().then((response) => {
      this.recentMessage = response
      console.log(response)
    })
  },
  methods: {
    sendMessage() {
      this.loading = true
      this.$sendBroadcastMessage(this.messageToSend).then((response) => {
        this.loading = false
        this.$getBroadcastMessages().then((recents) => {
          this.recentMessage = recents;
        })
      })
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" class="mt-5">

        <div CLASS="red--text">ANY MESSAGE SENT HERE IS SENT TO ACTIVE USERS IN PRODUCTION, SO BECAREFUL OF THE CONTENT!</div>
    </v-col>
    <v-row>
<!--      Message editor-->
      <v-col cols="8">
        <v-card>
          <v-card-title>
            Send a broadcast message to all Aje users
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="messageToSend.heading" label="Header" outlined></v-text-field>
            <v-textarea v-model="messageToSend.content" outlined label="Message content"></v-textarea>
            <v-btn :loading="loading" @click="sendMessage">Send</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
<!--      View Recent Messages-->
      <v-col cols="4">
        <v-card>
          <v-card-title>Recent Messages</v-card-title>
          <v-card-text>
            <v-sheet v-for="message in recentMessage" :key="message.id" outlined class="pa-2 mb-2">
              <h5>{{message.heading}}</h5>
              <p class="subtitle-2">{{message.content}}</p>
              <div class="text-caption grey--text">{{ Date(message.createdAt).toLocaleString()}} <v-btn icon><v-icon @click="messageToSend = message" x-small>mdi-pencil</v-icon></v-btn></div>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>
