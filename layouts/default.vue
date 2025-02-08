<template>
  <v-app class="" id="wole-app">
    <v-navigation-drawer app expand-on-hover mini-variant mini-variant-width="50"
      color="" clipped permanent>
      <v-list>
        <v-list-item :to="link" v-for="([icon, text, link], i) in items" :key="i" link>
          <v-list-item-icon>
            <v-icon color="blue">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="">{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left flat>
      <v-toolbar-title class="">
        Aje-<span class="yellow--text">portal </span><span class="caption">beta-v1.4</span>
      </v-toolbar-title>
      <v-spacer />
      <!-- Quick Notifications -->
      <div class="mx-3">
        <v-icon color="orange">
          mdi-bell
        </v-icon><span class="white--text">3</span>
      </div>
      <!-- Realtime Widget -->
      <div class="d-flex justify-end">
        <v-card height="" width="165" class="elevation-0 accent-2">
          <div class="mx-3 py-2 text-caption">Realtime service <v-icon color="blue">{{ status == 'connected!' ?
            "mdi-signal-cellular-3"
            : "mdi-signal-off" }}</v-icon> {{ connectionAttempts }}</div>
          <h6 class="mx-3 text-caption">{{ serverUrl }}</h6>
        </v-card>
      </div>
      <!-- Profile Widgets -->
      <nav-bar />
    </v-app-bar>
    <v-main app>
      <v-container>
        <!-- {{ $auth.user }} -->
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Footer from "~/components/navigation/Footer.vue";
import NavBar from "~/components/navigation/NavBar.vue";
export default {
  async mounted() {
    const token = this.$auth.strategy.token.get().substring(7);
    this.notifconn = new signalR.HubConnectionBuilder()
      .withUrl(this.serverUrl + "/hubs/push-notifications", {
        accessTokenFactory: () => token,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.notifconn.on("notify", (message) => this.notificationHandler(message));

    this.chatConn = new signalR.HubConnectionBuilder()
      .withUrl(this.serverUrl + "/hubs/chats", {
        accessTokenFactory: () => token,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.chatConn.on("get-offline-chats", (msg) =>
      this.offlineChatHandler(msg)
    );
    this.chatConn.on("new-chat-msg", (msg) => this.newChatHandler(msg));
    this.chatConn.on("user-data", (msg) => this.userProfileHandler(msg));

    this.notifconn.onclose(async () => {
      while (this.connectionAttempts != 0) {
        await this.start()
        this.connectionAttempts--
        // if(this.status == 'connected!'){
        //   this.connectionAttempts == 15
        // }
      }
    });

    await this.start();
  },

  computed: {
    chats() {
      return this.$store.state.chat.chats;
    },
  },

  components: { NavBar, Footer },
  methods: {
    async logout() {
      this.$auth.logout("local");
    },
    async start() {
      try {
        this.status = "connecting...";
        await this.notifconn.start();
        await this.chatConn.start();
        this.status = "connected!";
      } catch (err) {
        this.status = "connection failed:";
      }
    },
    notificationHandler(payload) {
      this.notifhist = JSON.parse(payload);
      console.log(payload);
    },
    userLoginHandler(payload) {
      alert(user + "logged in");
    },
    offlineChatHandler(payload) {
      this.notify = true;
      this.notifMsg = "Offline Messages Retrieved";
      this.$store.commit("chat/push_chats", JSON.parse(payload));
    },
    newChatHandler(payload) {
      this.notify = true;
      this.notifMsg = "New chat mmessage.";
      this.$store.commit("chat/push_chat", JSON.parse(payload));
    },
    userProfileHandler(payload) {
      this.rtuser = payload;
    },
  },
  data: () => ({
    items: [
      ["mdi-chart-areaspline", "Dashboard", "/"],
      ["mdi-note-plus", "Activity Logs", "/activity"],
      ["mdi-wallet-giftcard", "Flyers Management", "/flyers"],
      ["mdi-alpha-t-box", "Trade Management", "/trades"],
      ["mdi-gavel", "Dispute Resolutions", "/disputes"],
      ["mdi-message-alert", "Flyer Complaints", "/complaints"],
      ["mdi-wallet", "Withdraw Requests", "/withdraws"],
      ["mdi-bank", "Deposit claims", "/deposits"],
      ["mdi-credit-card-marker-outline", "Payments", "/payments"],
      ["mdi-account-supervisor-circle", "Users", "/users"],
      ["mdi-toolbox", "Settings", "/settings"],
    ],
    rtuser: "",
    token: "token",
    notifhist: [],
    chathist: [],
    status: "",
    serverUrl: process.env.baseURL,
    notify: false,
    notifMsg: "",
    connectionAttempts: 15
  }),
  publicRuntimeConfig: {
    host: process.env.baseURL || 'hello world!',
  },
};
</script>
