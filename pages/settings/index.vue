<template>
  <div>
    <v-row>
      <v-col>
        <h3>Aje Configurations</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels class="elevation-0">
          <v-expansion-panel>
            <v-expansion-panel-header>
              Supported Currencies
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <supported-currency />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- Minimum Currency -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              Minimum Withdrawal amount
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <set-minimal-withdraw />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              System properties
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <dynamic-settings :settings="configs"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DynamicSettings from "~/components/settings/DynamicSettings.vue";
import SetMinimalWithdraw from "~/components/settings/SetMinimalWithdraw.vue";
import SupportedCurrency from "~/components/settings/SupportedCurrency.vue";
export default {
  components: { SupportedCurrency, SetMinimalWithdraw, DynamicSettings },
  data() {
    return {
      configs: {}
    };
  },
  mounted() {
    this.$getConfigList().then((d) => (this.configs = d));
  },
};
</script>