<template>
  <div>
    <div class="text-h6">Manage users</div>
    <v-text-field class="mt-5" outlined box label="Search by email, name, date, etc..." v-model="search"></v-text-field>

    <v-data-table :search="search" multi-sort dense :headers="headers" :items="users">

      <template v-slot:item.fullName="{ item }">
        <span class="blue--text font-weight-medium">{{ item.fullName }}</span>
      </template>

      <template v-slot:item.isActive="{ item }">
        <div class="">
          <v-btn :loading="statusLoading" outlined @click="toggleUserActiveState(item)" x-small text color="success">{{
            item.isActive ? "Blocked" :
            "Active" }}</v-btn>
        </div>
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ new Date(item.createdAt).toDateString() }}
      </template>

      <!-- Menu Dialog -->
      <template v-slot:item.action="{ item }">
        <v-btn @click="menuClicked(item)" x-small icon color="blue"><v-icon>mdi-menu</v-icon></v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="openMenu" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
      <v-card class="mx-auto">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{ currentUser.userRole }}</div>
            <v-list-item-title class="headline mb-1">{{ currentUser.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey">
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td class="caption">{{ currentUser.id }}</td>
                </tr>
                <tr>
                  <td>Active</td>
                  <td>{{ currentUser.isActive }}</td>
                </tr>
                <tr>
                  <td>Number of Flyers</td>
                  <td>{{ currentUser.noOfFlyers }}</td>
                </tr>
                <tr>
                  <td>Number of Trades</td>
                  <td>{{ currentUser.noOfTrades }}</td>
                </tr>
                <tr>
                  <td>Confirmed</td>
                  <td>{{ currentUser.isConfirmed }}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>{{ currentUser.createdAt }}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{{ currentUser.phoneNumber }}</td>
                </tr>
                <tr>
                  <td>Invite Rate</td>
                  <td>{{ currentUser.inviteRate }}</td>
                </tr>
                <tr>
                  <td>Can Invite</td>
                  <td>{{ currentUser.canInvite }}</td>
                </tr>
                <tr>
                  <td>Invite Count</td>
                  <td>{{ currentUser.inviteCount }}</td>
                </tr>
                <tr>
                  <td>Invite Earned</td>
                  <td>{{ currentUser.inviteEarned }}</td>
                </tr>
                <tr>
                  <td>Requesting For Referral</td>
                  <td>{{ currentUser.isRequestingForReferral }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="deep-purple accent-4">Block</v-btn>
          <v-btn text color="deep-purple accent-4">Allow Invites</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon color="deep-purple accent-4">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  name: "Users",
  mounted() {
    this.$getAllUsers().then((d) => {
      this.users = d.data;
    });
  },
  data() {
    return {
      currentUser: {},
      statusLoading: false,
      openMenu: false,
      roles: ["Regular", "Staff", "Admin"],
      selectedRole: -1,
      isDeactivated: false,
      users: [],
      search: "",
      headers: [
        {
          text: "Joined",
          value: "createdAt",
          sortable: true
        },
        {
          text: "Email",
          value: "email",
          align: "start",
          sortable: true
        },
        {
          text: "Fullname",
          value: "fullName",
        },
        {
          text: "Fliers",
          value: "noOfFlyers",

        },
        {
          text: "Trades",
          value: "noOfTrades",

        },
        {
          text: "Role",
          value: "userRole",

        },
        {
          text: "Status",
          value: "isActive",
        },
        {
          text: "More",
          value: "action"
        },
      ],
    };
  },
  methods: {
    toggleUserActiveState(item) {
      this.statusLoading = true
      this.$toggleUserStatebyId(item.id).then((d) => {
        if (d.success) {
          item.isActive = !item.isActive;
          this.statusLoading = false
        }
      });
    },
    menuClicked(current) {
      this.currentUser = current
      this.openMenu = true
    },
    postChanges() { },
    changeUserRolesAsync(role, userId) {
      this.$changeUserRoleAsync(role, userId).then((d) => {
        if (d.success) {
          this.$router.go()
        }
      }
      );
    },
  },
};
</script>
