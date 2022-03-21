<template>
  <v-card>
    <v-card-title primary-title> Enter new rate: </v-card-title>
    <v-card-text>
      <div>{{ currency.name }}</div>
      <v-text-field
        v-model="val"
        name="rate"
        label="new rate"
        id="id"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="save()" text small color="blue">save</v-btn>
      <v-spacer></v-spacer>
      <v-btn text small color="blue">close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["currency"],
  name: "UpdateCurrencyDialog",
  data() {
    return { val: 0.0 };
  },
  methods: {
    save() {
      let payload = {};
      (payload.id = this.currency.id), (payload.rate = this.val);
      this.$updateCurrency(payload).then((r) => this.$router.go());
    },
  },
};
</script>