<template>
  <v-card shaped width="33%" height="184" class="mb-2">
    <v-card-title class="text-h6 font-weight-thin grey-text"> {{title}} </v-card-title>
    <v-card-text>
        <div class="text-h2">
            {{count}}
        </div>
    </v-card-text>
   
  </v-card>
</template>

<script>
export default {
  name: "Info-Card",
   props: ["count", "title"],
};
</script>