<template>
  <v-container>
    <v-card>
      <v-card-title>
        User Management
        <v-spacer></v-spacer>
        <PagedController @current-page="fetchUsers" />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-0"
        :search="search"
        item-value="id"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Search</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              label="Search"
              clearable
              hide-details
              solo-inverted
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:item.inviteStatus="{ item }">
          <v-chip small :color="item.inviteStatus === 1 ? 'green' : 'orange'" dark>
            {{ item.inviteStatus === 1 ? 'Accepted' : 'Pending' }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="editUser(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteUser(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {UserDetail, UsersFilter} from "~/service_models/UserModels";
import PagedController from "~/components/shared/PagedController.vue";

export default {
  components: {PagedController},
  data() {
    return {
      search: "",
      headers: [
        { text: "Full Name", value: "fullName" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "Last Seen", value: "lastSeen" },
        { text: "Invite Status", value: "inviteStatus" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [

      ],
    };
  },
  mounted() {
    var vm = new UsersFilter();
    this.$getUsersV2(vm).then(response => {
      this.users = response;
    })
  },
  methods: {
    fetchUsers(d) {
      var vm = new UsersFilter()
      vm.PageNumber = d;

      this.$getUsersV2(vm).then(response => {
        this.users = response;
      })
    },
    addUser() {
      alert("Add User clicked!");
    },
    editUser(user) {
      alert(`Edit User: ${user.fullName}`);
    },
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
      alert("User deleted!");
    },
  },
};
</script>

<style>
.v-data-table {
  margin-top: 20px;
}
</style>
