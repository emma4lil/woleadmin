<template>
  <v-row>
    <v-col cols="12">
      <v-card class="" elevation="1" outlined>
        <v-card-text class="d-flex justify-center">
          <div class="d-flex">
            <v-sheet color="" width="120" class="d-flex pa-2">
              <div class="mr-3"><v-icon color="primary" size="40">mdi-post</v-icon></div>
              <div class="d-flex flex-column">
                <div>{{ data.noOfFlyers }}</div>
                <div class="text-caption">Flyers</div>
              </div>
            </v-sheet>
            <hr>
          </div>
          <div class="d-flex">
            <v-sheet color="" width="120" class="d-flex pa-2">
              <div class="mr-3"><v-icon color="primary" size="40">mdi-account</v-icon></div>
              <div class="d-flex flex-column">
                <div>{{ data.noOfUsers }}</div>
                <div class="text-caption">Users</div>
              </div>
            </v-sheet>
            <hr>
          </div>
          <div class="d-flex">
            <v-sheet color="" width="120" class="d-flex pa-2">
              <div class="mr-3"><v-icon color="primary" size="40">mdi-one-up</v-icon></div>
              <div class="d-flex flex-column">
                <div>{{ data.noOfTrades }}</div>
                <div class="text-caption">Trades</div>
              </div>
            </v-sheet>
            <hr>
          </div>
          <div class="d-flex">
            <v-sheet color="" width="120" class="d-flex pa-2">
              <div class="mr-3"><v-icon color="primary" size="40">mdi-clipboard-arrow-down</v-icon></div>
              <div class="d-flex flex-column">
                <div>{{ data.noOfDisputes }}</div>
                <div class="text-caption">Disputes</div>
              </div>
            </v-sheet>

          </div>


        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: "DashboardStats",
  props: ['data']
}
</script>

<style scoped>
hr {
  margin-left: 20px;
  margin-right: 20px;
  width: 0.5px;
  height: 52px;
  border: none;
  background-color: rgb(147, 147, 147);
  transform: rotate(0deg);
}
</style>