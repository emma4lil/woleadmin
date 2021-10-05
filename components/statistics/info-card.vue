<template>
  <v-card min-width="150" height="" class="mb-2 blue lighten-4 elevation-15">
    <v-card-title class="text-h6 font-weight-thin grey-text">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div class="text-h4">
        <span>{{ prefix }}</span>
        {{ count }}
        <span class="caption">{{ postfix }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Info-Card",
  props: ["count", "title","prefix","postfix"],
};
</script>