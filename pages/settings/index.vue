<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-space-between mt-15">
        <h1>System Configurations</h1>
        <div>
          <v-switch dense inset ripple  label="Auto Save" />
        </div>
      </v-col>
      <v-col cols="12">
        <parameter-section Header="General" :Parameters="getGeneralParameters" />
      </v-col>
      <v-col cols="12">
        <parameter-section Header="Trades" :Parameters="getTradeParameters" />
      </v-col>
      <v-col cols="12">
        <parameter-section Header="Wallets" :Parameters="getWalletParameters" />
      </v-col>
      <v-col cols="12">
        <supported-currency />
      </v-col>
      <v-col cols="12">
        <deposit-settings />
      </v-col>
    </v-row>

  </v-container>
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
      parametersToUpdate: [],
      loading: false,
    };
  },
  methods: {
    updateSettings() {
      this.loading = true;
      this.$updateParameters(this.parameters).then((r) => {
        this.loading = false;
      });
    },
  },
  mounted() {
    this.$getParameters().then((d) => (this.parameters = d));
  },
  computed: {
    getGeneralParameters() {
      return this.parameters.filter((param) => param.tags == 0);
    },
    getTradeParameters() {
      return this.parameters.filter((param) => param.tags == 1);
    },
    getWalletParameters() {
      return this.parameters.filter((param) => param.tags == 3);
    },
  },
};
</script>
