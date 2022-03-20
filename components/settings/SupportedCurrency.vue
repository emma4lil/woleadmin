<template>
  <div>
    <v-card class="elevation-0">
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn @click="newcurrencydiag = true" color="blue"
              >New Currency</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Code</th>
                <th class="text-left">Rate</th>
                <th class="text-left">Previous</th>
                <th class="text-left">Direction</th>
                <th class="text-left">Update</th>
                <th class="text-left">Delete</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currencies" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.rate }}</td>
                <td>{{ item.prevRate }}</td>
                <td>{{ item.direction == 1 ? "🟩Up" : "❤️Down" }}</td>
                <td><v-btn text @click="updateCurrencyAction(item)" x-small color="info">update</v-btn></td>
                <td><v-btn text @click="deleteCurrencyAction(item.id)" x-small color="red">delete</v-btn></td>
                
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <!-- Dialog -->
    <v-dialog
      v-model="newcurrencydiag"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <new-currency-dialog @xncdiag="newcurrencydiag = false" />
    </v-dialog>
  </div>
</template>

<script>
import NewCurrencyDialog from "./NewCurrencyDialog.vue";
export default {
  components: { NewCurrencyDialog },
  name: "SupportedCurrencyCard",
  data() {
    return {
      newcurrencydiag: false,
      updatecurrencydiag: false,
      currencies: [
        {
          name: "USD",
          rate: 0.19,
          direction: -1,
          prev: 0.08,
          code: 111,
        },
        {
          name: "NGN",
          rate: 10.19,
          direction: 1,
          prev: 0.08,
          code: 222,
        },
      ],
    };
  },
  mounted () {
    this.$getCurrencies().then(r => this.currencies = r.data.rates)
  },
  methods: {
    deleteCurrencyAction(id){
      this.$deleteCurrency(id).then(r => {
        this.$router.go()
      })
    },
    updateCurrencyAction(currency){
      this.$updateCurrency(currency).then(r => console.log(r))
    }
  }

};
</script>