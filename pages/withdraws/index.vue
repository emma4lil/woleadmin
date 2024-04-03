<template>
  <v-row>
    <v-col cols="12">
      <div>Withdrawal Requests</div>
      <!-- {{withdraws}} -->
    </v-col>
    <v-col cols="12">
      <v-card height="150">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus esse mollitia dolorem voluptates rerum
          accusamus blanditiis asperiores omnis. Quod facere ipsa odit autem repudiandae ratione nam expedita ut enim
          voluptas!
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <section class="loop">
        <v-row>
          <v-col cols="6" lg="12" v-for="(req, i) in withdraws" :key="i">
            <request :withdraw="req" />
          </v-col>
        </v-row>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import Request from "~/components/withdrawal/Request.vue";
export default {
  components: { Request },
  data() {
    return {
      withdraws: [],
    };
  },
  mounted() {
    this.$getWithdraws().then((d) => {
      this.withdraws = d.data;
    });
  },
};
</script>
