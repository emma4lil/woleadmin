 <template>
  <div>
    <v-card class="mb-5">
      <v-card-text>
        <v-text-field outlined box label="Search by column" v-model="search"></v-text-field>
      </v-card-text>
    </v-card>
    <v-data-table :search="search" multi-sort dense :headers="headers" :items="users">
      <template v-slot:item.fullName="{ item }">
        <span class="black--text font-weight-medium">{{item.fullName}}</span>
      </template>
      <template v-slot:item.isActive="{ item }">
        <div class="">
          <v-btn
            @click="toggleUserActiveState(item)"
            small
            text
            color="success"
            >{{ item.isActive ? "Deactivate" : "Activate" }}</v-btn
          >
        </div>
      </template>
      <template v-slot:item.createdAt="{ item }">
          {{new Date(item.createdAt).toDateString()}}
      </template>

      <template v-slot:item.action="{ item }">
        <div class="" style="width: 120px;">
          <v-select
            @change="changeUserRolesAsync($event, item.id)"
            dense
            outlined
            :items="roles"
            label="Assign Role"
          ></v-select>
        </div>
      </template>
    </v-data-table>
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
      roles: ["Regular", "Staff", "Admin"],
      selectedRole: -1,
      isDeactivated: false,
      users: [],
      search: "",
      headers: [
        {
          text: "Joined At",
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
          align: "",
        },
        {
          text: "No of flyers",
          value: "noOfFlyers",

        },
        {
          text: "No of Trades",
          value: "noOfTrades",

        },
        {
          text: "User Role",
          value: "userRole",

        },
        {
          text: "Is Active",
          value: "isActive",
          align: "end",
        },
        {
          text: "Change Role",
          value: "action",
          align: "end",
        },
      ],
    };
  },
  methods: {
    toggleUserActiveState(item) {
      this.$toggleUserStatebyId(item.id).then((d) => {
        if(d.success) { item.isActive = !item.isActive}
      });
    },
    postChanges() {},
    changeUserRolesAsync(role, userId) {
      this.$changeUserRoleAsync(role, userId).then((d) => {
        if(d.success) {
          this.$router.go()
        }
      }
      );
    },
  },
};
</script>
