<template>
  <v-card :to="to" min-width="150" height="" class="white--text  mb-2 blue elevation-15">
    <v-card-title class="text-h6 font-weight-thin grey-text">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div class="text-h4 white-text">
        <span>{{ prefix }}</span>
        <span class="white--text">{{ parseFloat(count).toFixed(2) }}</span>
        <span class="caption">{{ postfix }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Info-Card",
  props: ["count", "title","prefix","postfix" , "to"],
};
</script>
