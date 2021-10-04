<template>
  <v-card min-width="150" height="172" class="mb-2 elevation-0">
    <v-card-title class="text-h6 font-weight-thin grey-text">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div class="text-h2">
        <span>{{ prefix }}</span>
        {{ count }}
        <span class="text-h6">{{ postfix }}</span>
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