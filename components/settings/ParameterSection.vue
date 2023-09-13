<template>
  <v-card elevation="0">
    <v-card-title primary-title class="text-h6"> {{ Header }} </v-card-title>
    <v-card-text>
      <v-card
        outlined
        class="my-2"
        v-for="parameter in Parameters"
        :key="parameter.id"
      >
        <div class="d-flex justify-space-between">
          <div class="ma-2">
            <div class="subtitle-1 mt-2">{{ parameter.keyName }}</div>
            <div class="grey--text caption">
              {{ parameter.description }}
            </div>
            <div class="green--text caption" v-if="parameter.temp">M</div>
          </div>
          <div class="mt-5 mr-2">
            <v-switch
              v-if="parameter.type == 0"
              v-model="parameter.value"
            ></v-switch>
            <v-text-field
              v-else
              @input="parameter.temp = parameter.value"
              dense
              solo-inverted
              elevation-0
              name="name"
              id="id"
              v-model="parameter.value"
            ></v-text-field>
          </div>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ParameterSection",
  props: ["Header", "Parameters"],
};
</script>
