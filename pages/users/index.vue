<template>
  <div>
    <div class="text-h6">Manage users</div>
    <v-text-field v-model="search" box class="mt-5" label="Search by email, name, date, etc..." outlined></v-text-field>

    <v-data-table :headers="headers" :items="users" :search="search" dense multi-sort>

      <template v-slot:item.fullName="{ item }">
        <span class="blue--text font-weight-medium">{{ item.fullName }}</span>
      </template>
      <template v-slot:item.inviteStatuses="{ item }">
        <v-chip class="orange--text" small>{{ item.inviteStatusesDescription }}</v-chip>
      </template>
      <template v-slot:item.lastSeen="{ item }">
        <div class="text-caption" x-small>{{ getLastSeenString(item.lastSeen) }}</div>
      </template>

      <template v-slot:item.isActive="{ item }">
        <div class="">
          <v-btn :loading="statusLoading" color="success" outlined text x-small @click="toggleUserActiveState(item)">{{
              item.isActive ? "Blocked" :
                "Active"
            }}
          </v-btn>
        </div>
      </template>

      <template v-slot:item.createdAt="{ item }">
        {{ new Date(item.createdAt).toDateString() }}
      </template>

      <!-- Menu Dialog -->
      <template v-slot:item.action="{ item }">
        <v-btn color="blue" icon x-small @click="menuClicked(item)">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="openMenu" :overlay="false" max-width="500px" scrollable transition="dialog-transition">
      <v-card>
        <!-- <v-card-title primary-title>
          Profile information
        </v-card-title> -->
        <v-card-text class="my-4">
          <!-- Basic information -->
          <div class=" d-flex justify-space-between">
            <div class="" style="width: 100%;">
              <div class="mx-auto d-flex justify-space-between">
                <div class="overline">{{ currentUser.userRole }}</div>
                <div class="text-caption mr-2 mt-1">last seen: {{ getLastSeenString(currentUser.lastSeen) }}</div>
              </div>
              <h5 class="text-h6">{{ currentUser.fullName }}</h5>
            </div>
            <div>
              <v-img :src="currentUser.avatarUrl" width="120"></v-img>
            </div>
          </div>
        </v-card-text>
        <!-- Property Table -->
        <v-card-text>
          <v-simple-table v-if="currentUser" dense>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>ID</td>
                <td class="text-caption">{{ currentUser.id }}</td>
              </tr>
              <tr>
                <td>Joined</td>
                <td>{{ new Date(currentUser.createdAt).toLocaleDateString() }}</td>
              </tr>
              <tr>
                <td>Active</td>
                <td>
                  <v-btn color="" x-small>{{ currentUser.isActive }}</v-btn>
                </td>
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
                <td>{{ currentUser.isConfirmed ? "Confirmed" : "Not Confirmed" }}</td>
              </tr>

              <tr>
                <td>Phone Number</td>
                <td>{{ currentUser.phoneNumber ?? "Not specified" }}</td>
              </tr>

              <tr class="">
                <td>Invite Count</td>
                <td>{{ currentUser.inviteCount }} Users</td>
              </tr>
              <tr class="">
                <td>Bonus Earned</td>
                <td>{{ currentUser.inviteEarned }} Tele</td>
              </tr>
              <tr class="">
                <td>Invite Rate</td>
                <td>
                  <v-text-field v-model="currentUser.inviteRate" class="mt-3" dense label="" name="rate" outlined
                                single-line suffix="Tele"></v-text-field>
                </td>
              </tr>
              <tr class="">
                <td>Current Invite Status</td>
                <td>
                  <v-select v-model="currentUser.inviteStatuses" :items="inviteStatusItem" class="mt-3" dense
                            outlined></v-select>
                </td>

              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="postingData" class="white--text" color="blue" small @click="postChanges()">Save changes
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
          text: "Invite Status",
          value: "inviteStatuses",

        },
        {
          text: "Status",
          value: "isActive",
        },
        {
          text: "Last Seen",
          value: "lastSeen",
        },
        {
          text: "More",
          value: "action"
        },
      ],
      inviteStatusItem: [
        {
          text: "Normal",
          value: 0
        },
        {
          text: "Requesting",
          value: 1
        },
        {
          text: "Rejected",
          value: 2
        },
        {
          text: "Accepted",
          value: 3
        },
      ],
      isDeactivated: false,
      openMenu: false,
      postingData: false,
      roles: ["Regular", "Staff", "Admin"],
      search: "",
      selectedRole: -1,
      statusLoading: false,
      users: [],
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
    postChanges() {
      this.postingData = true
      this.$updateUserInfo(this.currentUser).then(d => {
        this.postingData = false
        if (d.item1) {
          alert(d.item2)
        }
      })
    },
    changeUserRolesAsync(role, userId) {
      this.$changeUserRoleAsync(role, userId).then((d) => {
          if (d.success) {
            this.$router.go()
          }
        }
      );
    },
    // The function that takes a datetime and returns a last seen string
    getLastSeenString(date) {
      // Get the current datetime
      let now = new Date();

      // Get the time span between the date and the current datetime in milliseconds
      let diff = now - new Date(date);

      // Check the difference and return the appropriate string
      if (diff < 60000) {
        // Less than a minute
        return "Just now";
      } else if (diff < 3600000) {
        // Less than an hour
        return Math.floor(diff / 60000) + " minutes ago";
      } else if (diff < 86400000) {
        // Less than a day
        return Math.floor(diff / 3600000) + " hours ago";
      } else if (diff < 172800000) {
        // Less than two days
        return "Yesterday";
      } else if (diff < 2592000000) {
        // Less than a month
        return Math.floor(diff / 86400000) + " days ago";
      } else if (diff < 31536000000) {
        // Less than a year
        return "Last month";
      } else {
        // More than a year
        return "😶‍🌫️";
      }
    }
  },
};
</script>
