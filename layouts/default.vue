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
        <v-list-item v-for="([icon, text], i) in items" :key="i" link>
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
          <v-btn @click="logout" block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app clipped-left flat color="deep-purple accent-4">
      <v-toolbar-title>
        Wole<span class="yellow--text">DASH</span>
      </v-toolbar-title>
      <nav-bar />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Footer from "~/components/navigation/Footer.vue";
import NavBar from "~/components/navigation/NavBar.vue";
export default {
  components: { NavBar, Footer },
  methods: {
    async logout () {
      this.$auth.logout("local")
    }
  },
  data: () => ({
    items: [
      ["mdi-status", "Statistics"],
      ["mdi-account-supervisor-circle", "User"],
      ["mdi-trader-circle", "Trader"],
      ["mdi-credit-card-marker-outline", "Payment"],
      ["mdi-wallet", "Wallet"],
      ["mdi-clock-start", "Disputed"],
      ["mdi-wallet-giftcard", "Flyers"],
      ["mdi-message-alert", "Messages"],
      ["mdi-settings", "Settings"],
    ],
  }),
};
</script>