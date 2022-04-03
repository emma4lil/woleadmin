 <template>
  <div>
    <v-data-table :headers="headers" :items="users">
      <template v-slot:item.isActive="{ item }">
        <v-btn small text color="success">{{ item.isActive ? "Deactivate" : "Activate" }}</v-btn>
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
      users: [],
      search: "search something",
      headers: [
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
          text: "ACtivate / Deactivate",
          value: "isActive",
          align: "start",
        },
       
      ],
    };
  },
  methods: {},
};
</script>