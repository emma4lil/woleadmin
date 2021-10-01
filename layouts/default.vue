<template>
  <v-app id="wole-app">
    <v-navigation-drawer
      app
      bottom
      expand-on-hover
      mini-variant
      mini-variant-width="50"
      color="deep-purple accent-3"
      clipped
      floating
      permanent
    >
      <v-list>
        <v-list-item
          :to="link"
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn :icon="true" @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app clipped-left flat color="deep-purple accent-4">
      <v-toolbar-title>
        Wole<span class="yellow--text">Dash </span
        ><span class="caption">v1.2.12</span>
      </v-toolbar-title>
      <v-spacer />
      <nav-bar />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div class="d-flex justify-end">
          <v-card width="230">
            <div class="mx-3 py-2">SignalR Server: {{ status }}</div>
            <v-divider></v-divider>
            <v-card-text>
              <div>API: {{ serverUrl }}</div>
              <div>User: {{ rtuser }}</div>
            </v-card-text>
          </v-card>
        </div>

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
      this.status = "disconnected!";
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
        this.status = "Attempting connection...";
        await this.notifconn.start();
        await this.chatConn.start();
        this.status = "Connected!";
      } catch (err) {
        this.status = "Connection failed:" + err;
        console.log(err);
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
      this.$store.commit("chat/push_chats", JSON.parse(payload));
    },
    newChatHandler(payload) {
      this.$store.commit("chat/push_chat", JSON.parse(payload));
    },
    userProfileHandler(payload) {
      this.rtuser = payload;
    },
  },
  data: () => ({
    items: [
      ["mdi-chart-areaspline", "Metrics", "/"],
      ["mdi-wallet-giftcard", "Flyers Management", "/flyers"],
      ["mdi-alpha-t-box", "Trade Management", "/trades"],
      ["mdi-clock-end", "Dispute Resolutions", "/disputes"],
      ["mdi-message-alert", "Flyer Complaints", "/complaints"],
      ["mdi-wallet", "Withdraw Requests", "/withdraws"],
      ["mdi-credit-card-marker-outline", "Payments", "/payments"],
      ["mdi-account-supervisor-circle", "Users", "/users"],
      ["mdi-toolbox", "Settings", "/settingd"],
    ],
    rtuser: "",
    token: "token",
    notifhist: [],
    chathist: [],
    status: "",
    serverUrl: process.env.baseUrl,
  }),
};
</script>