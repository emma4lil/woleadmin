 <template>
  <div>
    <v-data-table dense :headers="headers" :items="users">
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
      <template v-slot:item.action="{ item }">
        <div class="mt-5" style="width: 120px;">
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
      search: "search something",
      headers: [
        {
          text: "Email",
          value: "email",
          align: "start",
        },
        {
          text: "Fullname",
          value: "fullName",
          align: "start",
        },
        {
          text: "No of flyers",
          value: "noOfFlyers",
          align: "start",
        },
        {
          text: "No of Trades",
          value: "noOfTrades",
          align: "start",
        },
        {
          text: "User Role",
          value: "userRole",
          align: "start",
        },
        {
          text: "Is Active",
          value: "isActive",
          align: "end",
        },
        {
          text: "Change Role",
          value: "action",
          align: "start",
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
