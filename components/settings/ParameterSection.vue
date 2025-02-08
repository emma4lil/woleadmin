<template>
  <v-card outlined elevation="0" class="pa-0">

    <div class="d-flex justify-space-between pa-4">
      <div class="pa-0 text-h6">{{ Header }}</div>
      <div v-show="loading" class="pa-0 caption">saving...</div>
    </div>
    <v-card-text>
      <v-card
        flat
        v-show="localParams"
        dense
        class="mb-5 pa-2"
        v-for="(parameter, index) in localParams"
        :key="parameter.id"
      >
        <div class="d-flex justify-space-between align-center">
          <div class="text-truncate">
            <div class="subtitle-2">{{ parameter.keyName }}</div>
            <div class="grey--text caption text-truncate">{{ parameter.description }}</div>
            <div v-if="parameter.temp" class="green--text caption">modified</div>
          </div>
          <div>
            <v-switch
              v-show="parameter.type === 0"
              v-model="parameter.t_value"
              @change="switchChanged(parameter)"
              dense
              inset
            ></v-switch>
            <v-text-field
              v-show="parameter.type !== 0"
              dense
              flat
              solo-inverted
              hide-details
              class="ml-5"
              v-model="parameter.value"
              @change="switchChanged(parameter)"
              @input="parameter.temp = parameter.value"
            ></v-text-field>
            <v-select
              v-show="parameter.type ===  -1"
              flat
              solo-inverted
            >

            </v-select>
          </div>
        </div>
      </v-card>
    </v-card-text>
    <v-card-actions><v-spacer></v-spacer><v-btn @click="saveChanges()" v-show="showSaveButton" text>save</v-btn></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ParameterSection",
  props: {
    Header: String,
    Parameters: Array,
  },
  data() {
    return {
      loading: false,
      showSaveButton: false,
      localParams: [],
      updatesToSend: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.Parameters.forEach((parameter) => {
        if (parameter.type === 0) {
          // Ensure `t_value` is updated correctly
          this.$set(parameter, "t_value", parameter.value === "true");
        }
        this.localParams.push(parameter);
      });
    }, 2000)

  },
  methods: {
    saveChanges(){
      let params = this.localParams
      this.loading = true;
      this.$updateParameters(params).then((r) => {
        this.loading = false;
        this.showSaveButton = false;
      });
    },
    switchChanged(parameter) {
      // Placeholder for switch change logic
      this.showSaveButton = true;
      if (parameter.type !== 0) return;
      let param = this.localParams.find(x => x.id === parameter.id)
      param.value = parameter.t_value === true ? "true" : "false";

    },
  },
};
</script>
