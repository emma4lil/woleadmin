<template>
  <v-container fluid>
    <!-- Page Title -->
    <v-row align="center">
      <v-col>
        <div class="text-h5 font-weight-medium">User Management</div>
      </v-col>
    </v-row>

    <!-- Search Bar -->
    <v-row>
      <v-col>
        <div class="d-flex">
          <div style="width: 70%;">
            <v-text-field
              v-model="search"
              class="my-3"
              label="Search by email, name, date, etc..."
              solo
              clearable
              append-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>
        </div>

      </v-col>
    </v-row>


    <!-- Data Table -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="filteredUsers"
      :search="search"
      show-select
      dense
      outlined
      class="elevation-1 rounded-lg"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Actions</v-toolbar-title>
          <v-spacer></v-spacer>
          <div style="width: 20%;" class="mr-2 mt-6">
            <v-select dense label="Filter Invite Statues" solo :items="['All','Requesting', 'Granted','Rejected', 'Normal']" v-model="selectedFilter"/>
          </div>
          <div class="d-flex mt-6">
            <div v-if="selected.length > 0" style="width: 10%;" class="mr-2">
              <v-text-field placeholder="5" dense solo v-model="invite.rate" label="Rate"/>
            </div>
            <div v-if="selected.length > 0" style="width: 20%;" class="mr-2">
              <v-select dense label="Set Status" solo :items="inviteStatues" :item-text="inviteStatues.text" :item-value="inviteStatues.value" v-model="invite.status"/>
            </div>
          </div>

          <v-btn :loading="invite.isSending" v-if="selected.length > 0" color="primary" @click="sendInvitesActivationRequest">
            Execute for {{ selected.length }} users
          </v-btn>
        </v-toolbar>
      </template>
      <!-- Custom Slots -->
      <template v-slot:item.fullName="{ item }">
        <span class="blue--text text-body-1 font-weight-bold">{{ item.fullName }}</span>
      </template>

      <template v-slot:item.inviteStatuses="{ item }">
        <v-chip class="ma-1" color="orange lighten-4" text-color="orange darken-2" small>
          {{ item.inviteStatusesDescription }}
        </v-chip>
      </template>

      <template v-slot:item.lastSeen="{ item }">
        <div class="text-caption grey--text">{{ getLastSeenString(item.lastSeen) }}</div>
      </template>

      <template v-slot:item.isActive="{ item }">
        <v-btn
          :loading="statusLoading"
          color="primary"
          outlined
          small
          class="mx-1"
          @click="toggleUserActiveState(item)"
        >
          {{ item.isActive ? "Deactivate" : "Activate" }}
        </v-btn>
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ new Date(item.createdAt).toDateString() }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn icon small @click="menuClicked(item)">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- User Details Dialog -->
    <v-dialog v-model="openMenu" max-width="500px" scrollable>
      <v-card>
        <v-card-title class="font-weight-medium text-h6">User Details</v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="8">
              <div class="text-subtitle-1 font-weight-bold">{{ currentUser.fullName }}</div>
              <div class="text-caption grey--text">Role: {{ currentUser.userRole }}</div>
              <div class="text-caption grey--text">Last seen: {{ getLastSeenString(currentUser.lastSeen) }}</div>
            </v-col>
            <v-col cols="4">
              <v-img :src="currentUser.avatarUrl" class="rounded-circle" width="80"></v-img>
            </v-col>
          </v-row>
          <v-divider class="my-4"></v-divider>
          <v-simple-table dense>
            <tbody>
            <tr>
              <td class="text-caption font-weight-medium">ID</td>
              <td class="text-body-2">{{ currentUser.id }}</td>
            </tr>
            <tr>
              <td class="text-caption font-weight-medium">Joined</td>
              <td class="text-body-2">{{ new Date(currentUser.createdAt).toLocaleDateString() }}</td>
            </tr>
            <tr>
              <td class="text-caption font-weight-medium">Active</td>
              <td>
                <v-btn :color="currentUser.isActive ? 'success' : 'error'" small>
                  {{ currentUser.isActive ? "Active" : "Inactive" }}
                </v-btn>
              </td>
            </tr>
            <tr>
              <td class="text-caption font-weight-medium">Phone</td>
              <td class="text-body-2">{{ currentUser.phoneNumber || "Not specified" }}</td>
            </tr>
            <tr>
              <td class="text-caption font-weight-medium">Invite Count</td>
              <td class="text-body-2">{{ currentUser.inviteCount }} Users</td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" small :loading="postingData" @click="postChanges">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Profile Report-->
    <v-dialog v-model="showProfileReport" :overlay="false" max-width="1000px"
              transition="dialog-transition">
      <ProfileReport :ownerId="currentUser.id"/>
    </v-dialog>
  </v-container>
</template>

<script>
import ProfileReport from "~/components/shared/ProfileReport.vue";

export default {
  name: "Users",
  components: {ProfileReport},
  data() {
    return {
      search: "",
      selectedFilter: "All",
      users: [],
      selected: [],
      currentUser: {},
      inviteStatues: [
        { text: "Normal", value: 0 },
        { text: "Reject", value: 2 },
        { text: "Grant", value: 3 }
      ],
      invite: {
        rate: 5,
        selected: [],
        isSending: false,
        status: 0
      },
      headers: [
        {text: "Joined", value: "createdAt", sortable: true},
        {text: "Email", value: "email", align: "start", sortable: true},
        {text: "Fullname", value: "fullName"},
        {text: "Invite Status", value: "inviteStatuses", sortable: true},
        {text: "Status", value: "isActive"},
        {text: "Last Seen", value: "lastSeen"},
        {text: "Action", value: "action"},
      ],
      openMenu: false,
      showProfileReport: false,
      statusLoading: false,
      postingData: false,
    };
  },
  mounted() {
    this.$getAllUsers().then((response) => {
      this.users = response.data;
    });
  },
  computed: {
    // Filter users based on search query
    filteredUsers() {
      if (this.selectedFilter === "All") return this.users;
      return this.users.filter((user) => {
        return (
          user.inviteStatusesDescription.toLowerCase().includes(this.selectedFilter.toLowerCase())
        );
      });
    },
  },
  methods: {
    sendInvitesActivationRequest() {
      this.invite.isSending = true;
      this.invite.selected = this.selected.map((user) => user.id);

      this.$sendInvitationRequests(this.invite).then((response) => {
        if (response) {
          console.log(response)
          this.invite.isSending = false;

        }
        this.invite.isSending = false;
        alert("Invitation requests sent successfully!, Reload page to see changes");
      });
    },
    toggleUserActiveState(item) {
      this.statusLoading = true;
      this.$toggleUserStatebyId(item.id).then((response) => {
        if (response.success) {
          item.isActive = !item.isActive;
          this.statusLoading = false;
        }
      });
    },
    menuClicked(user) {
      this.currentUser = {}
      this.currentUser = user;
      this.showProfileReport = true;
    },
    postChanges() {
      this.postingData = true;
      this.$updateUserInfo(this.currentUser).then((response) => {
        this.postingData = false;
        if (response.success) {
          alert("Changes saved successfully!");
        }
      });
    },
    getLastSeenString(date) {
      const now = new Date();
      const diff = now - new Date(date);

      if (diff < 60000) return "Just now";
      if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
      if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
      if (diff < 172800000) return "Yesterday";
      if (diff < 2592000000) return `${Math.floor(diff / 86400000)} days ago`;
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
