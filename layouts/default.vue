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
        <v-list-item :to="link" v-for="([icon, text, link], i) in items" :key="i" link>
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
    async logout() {
      this.$auth.logout("local");
    },
  },
  data: () => ({
    items: [
      ["mdi-chart-areaspline", "Metrics", "/"],
      ["mdi-wallet-giftcard", "Flyers Management", "/flyers"],
      ["mdi-alpha-t-box", "Trade Management", ""],
      ["mdi-clock-end", "Dispute Resolutions", ""],
      ["mdi-message-alert", "Complaints", ""],
      ["mdi-credit-card-marker-outline", "Payments", ""],
      ["mdi-wallet", "Wallet", ""],
      ["mdi-account-supervisor-circle", "Users", ""],
      ["mdi-toolbox", "Settings", ""],
    ],
  }),
};
</script>