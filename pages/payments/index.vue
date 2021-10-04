<template>
  <v-row>
    <v-col cols="12">
      <v-card class="elevation-0 grey lighten-5">
        <v-card-title class="caption my-3">Teles</v-card-title>
        <v-divider></v-divider>

        <div class="d-flex justify-space-between">
          <div class="my-2 ml-2" style="width: 200px;">
            <info-card :count="233" postfix="Tele" title="Daily Profit" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="394.67" postfix="Tele" title="Balance" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="234.94" postfix="Tele" title="In Escrow" />
          </div>
          <div class="my-2 ml-2">
            <info-card :count="233.94" postfix="$" title="Balance in USD" />
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import infoCard from "~/components/statistics/info-card.vue";

export default {
  components: { infoCard },
  data() {
    return {};
  },
};
</script>InfoCard