<template>
  <div>
    <v-card outlined class="elevation-0">
      <div class="d-flex justify-space-between pa-4">
        <div class="pa-0 text-h6">Supported Currencies</div>
        <v-btn disabled outlined icon elevation="0" @click="newcurrencydiag = true" class="mx-2" color="primary">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
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
                <th class="text-left">Type</th>
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
                <td>{{ item.type == 0 ? "fiat" : "crypto" }}</td>
                <td>
                  {{
                    item.direction == 1
                      ? "📈"
                      : item.direction == 0
                      ? "—"
                      : "📉"
                  }}
                </td>
                <td>
                  <v-btn
                    text
                    @click="updateCurrencyAction(item)"
                    x-small
                    color="info"
                    >update</v-btn
                  >
                </td>
                <td>
                  <v-btn
                    text
                    @click="deleteCurrencyAction(item.id)"
                    x-small
                    color="red"
                    >delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>

    <!--New Currency Dialog -->
    <v-dialog
      v-model="newcurrencydiag"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <new-currency-dialog @xncdiag="newcurrencydiag = false" />
    </v-dialog>

    <v-dialog
      v-model="updatecurrencydiag"
      scrollable
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <update-currency-dialog :currency="currentcurrency"/>
    </v-dialog>
  </div>
</template>

<script>
import NewCurrencyDialog from "./NewCurrencyDialog.vue";
import UpdateCurrencyDialog from "./UpdateCurrencyDialog.vue";
export default {
  components: { NewCurrencyDialog, UpdateCurrencyDialog },
  name: "SupportedCurrencyCard",
  data() {
    return {
      currentcurrency: {},
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
  mounted() {
    this.$getCurrencies().then((r) => (this.currencies = r.data.rates));
  },
  methods: {
    deleteCurrencyAction(id) {
      this.$deleteCurrency(id).then((r) => {
        this.$router.go();
      });
    },
    updateCurrencyAction(currency) {
      this.updatecurrencydiag = true;
      this.currentcurrency = currency;

    },
  },
};
</script>+
