<script>
export default {
  name: "PagedController",
  data() {
    return {
      page: 1
    }
  },
  watch: {
    page(val) {
      this.$emit("current-page", this.page)
    }
  }
}
</script>

<template>
  <v-card class="" max-width="200">
    <v-sheet height="38" width="" class="d-flex ma-0 pa-0">
      <v-btn @click="page = page <= 1 ? 1 : page - 1" text>prev</v-btn>
      <v-text-field flat solo-inverted dense v-model="page" class="mx-0 elevation-0">23</v-text-field>
      <v-btn @click="page++" text>next</v-btn>
    </v-sheet>
  </v-card>
</template>
