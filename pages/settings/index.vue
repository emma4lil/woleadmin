<template>
  <div>
    <v-row>
      <v-col>
        <h3>Aje Configurations</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels accordion multiple class="elevation-0">
          <v-expansion-panel>
            <v-expansion-panel-header>
              Manage Aje Currencies
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <supported-currency />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- Minimum Currency -->
          <!-- <v-expansion-panel>
            <v-expansion-panel-header>
               Withdrawal Settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <set-minimal-withdraw />
            </v-expansion-panel-content>
          </v-expansion-panel> -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              Deposit Settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <deposit-settings />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              System Configurations
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
import DepositSettings from "~/components/settings/DepositSettings.vue";
export default {
  components: { SupportedCurrency, SetMinimalWithdraw, DynamicSettings, DepositSettings },
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
