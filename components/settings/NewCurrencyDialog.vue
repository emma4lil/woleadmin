<template>
  <v-card>
    <v-card-title primary-title> New Currency </v-card-title>
    <v-card-text>
      <v-text-field
        name="code"
        label="Code"
        v-model="currency.code"
        single-line
        placeholder="999"
      ></v-text-field>
      <v-text-field
        name="name"
        label="Short Name"
        v-model="currency.name"
        single-line
        placeholder="USD"
      ></v-text-field>
      <v-text-field
        name="rate"
        label="Initial Rate"
        v-model="currency.rate"
        single-line
        placeholder="0.00"
      ></v-text-field>
      <v-switch
        :label="`Currency Type: ${currency.type ? 'FIAT' : 'CRYPTO'}`"
        v-model="currency.type"
      ></v-switch>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue" @click="createCurrency()">Save</v-btn>
    </v-card-actions>

    <v-card-text> Data: </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NewCurrencyDialog",
  data() {
    return {
      currency: {
        code: 111,
        name: "USD",
        rate: 0,
        type: true,
      },
    };
  },
  methods: {
    async createCurrency() {
      let md = this.validatedCurrencyModel();
      let c = this.$addCurrency()
      
      //this.$emit("xncdiag");
    },
    validatedCurrencyModel() {
      let md = this.currency;
      md.code = +this.currency.code;
      md.name = this.currency.name.toUpperCase();
      md.rate = +this.currency.rate;
      md.type = this.currency.type ? 1 : 0;
      return md;
    },
  },
  computed: {
    
  },
};
</script>
