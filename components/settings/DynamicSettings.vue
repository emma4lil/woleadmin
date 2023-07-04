<template>
  <v-card class="elevation-0">
    <v-card-text>
      <div v-for="(val, key) in settings" :key="key">
        <h4>{{ key }}</h4>
        <div class="d-flex justify-space-between">
          <v-text-field dense filled @change="dirty(key, val)" v-model="settings[key]" id="id" max-width="600"></v-text-field>
          <v-btn v-if="flags[key]" text width="100" class="mt-7" x-small color="success">📝</v-btn>
        </div>
      </div>

    </v-card-text>
    <v-card-actions>
      <v-btn @click="save()" width="200" color="blue">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DynamicSettings",
  props: ["settings"],
  data() {
    return {
      flags: {},
      temp: "temp",
    };
  },
  methods: {
    save() {
      Object.entries(this.flags).forEach(([k, v]) => {
        let p = {}
        p.key = k
        p.value = v
        this.$updateConfigProp(p).then(d => this.$delete(this.flags, k));
      });
      //this.$router.go()
    },
    dirty(key, val) {
      this.$set(this.flags, key, val);
    },
  },
};
</script>
