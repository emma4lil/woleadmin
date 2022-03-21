<template>
  <v-card class="elevation-0">
      <v-card-title primary-title>
          Set minimum withdrawal
      </v-card-title>
      <v-card-text>
          <v-text-field
              name="name"
              label="Amount In Tele"
              id="id"
          ></v-text-field>
      </v-card-text>
      <v-card-actions>
          <v-btn block color="primary" dark>Save</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: "SetMinimalWithdraw"
}
</script>