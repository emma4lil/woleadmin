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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus, blanditiis. Qui enim quisquam sit, fuga hic dolores
              rerum dignissimos perferendis consectetur libero. Similique
              repudiandae iure aliquam, veniam tempora illo minus.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SupportedCurrency from "~/components/settings/SupportedCurrency.vue";
export default {
  components: { SupportedCurrency },
};
</script>