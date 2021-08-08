<template>
  <v-menu bottom origin="center center" transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon outlined color="yellow accent-1" v-bind="attrs" v-on="on">
        EH
      </v-btn>
    </template>

    <v-list>
      <v-list-item to="auth/login">
        <v-list-item-icon>
          <v-icon>mdi-clock</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          Login
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
    items: [
      { title: "Login", action: "/login" },
      { title: "Logout" },
      { title: "configuration" },
      { title: "Setting" },
    ],
  }),
};
</script>