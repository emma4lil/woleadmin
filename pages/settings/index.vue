<template>

  <v-row>
    <v-col class="d-flex justify-space-between mt-15">
      <h1>System Settings</h1>
      <v-btn text :loading="loading" @click="updateSettings()" color="primary">Save</v-btn>
    </v-col>
    <v-col cols="12">
      <supported-currency />
    </v-col>
    <v-col>
      <deposit-settings />
    </v-col>
    <v-col cols="12">
      <parameter-section Header="Fliers" :Parameters="getFlierParameters" />
    </v-col>
    <v-col cols="12">
      <parameter-section Header="Trades" :Parameters="getTradeParameters" />
    </v-col>
    <v-col cols="12">
      <parameter-section Header="Wallets" :Parameters="getWalletParameters" />
    </v-col>
    <v-col cols="12">
      <parameter-section Header="Refferal Program" :Parameters="getRefferalParameters" />
    </v-col>
    <v-col cols="12" class="d-flex justify-end mt-15">
      <v-btn block width="200" :loading="loading" @click="updateSettings()" color="primary">Save</v-btn>
    </v-col>
  </v-row>

</template>

<script>
import DepositSettings from "~/components/settings/DepositSettings.vue";
import ParameterSection from "~/components/settings/ParameterSection.vue";
import SetMinimalWithdraw from "~/components/settings/SetMinimalWithdraw.vue";
import SupportedCurrency from "~/components/settings/SupportedCurrency.vue";
export default {
  components: {
    ParameterSection,
    SetMinimalWithdraw,
    SupportedCurrency,
    DepositSettings,
  },
  data() {
    return {
      parameters: [],
      loading: false,
    };
  },
  methods: {
    updateSettings() {
      this.loading = true;
      this.$updateParameters(this.parameters).then((r) => {
        this.loading = false;
        alert("Updated!");
      });
    },
  },
  mounted() {
    this.$getParameters().then((d) => (this.parameters = d?.result));
  },
  computed: {
    getWalletParameters() {
      return this.parameters.filter((param) => param.tags == 3);
    },
    getTradeParameters() {
      return this.parameters.filter((param) => param.tags == 1);
    },
    getRefferalParameters() {
      return this.parameters.filter((param) => param.tags == 6);
    },
    getFlierParameters() {
      return this.parameters.filter((param) => param.tags == 2);
    },
  },
};
</script>
