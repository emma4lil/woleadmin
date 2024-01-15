<template>
  <v-menu bottom origin="center center" transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mt-1" icon outlined color="yellow accent-1" v-bind="attrs" v-on="on">
        <v-img class="rounded-lg" height="50" width="50" :src="$auth.user.avatarUrl"></v-img>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item @click="Logout()">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          Logout
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon>mdi-clock</v-icon>
          </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "NavDropDown",
  data: () => ({
    
  }),
  methods: {
    Logout() {
      this.$auth.logout();
    }
  }
};
</script>