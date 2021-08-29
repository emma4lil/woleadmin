<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col class="" cols="12">
              <v-card>
                <v-card-title>
                  <div class="text-h3 grey--text">Flyers</div>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search by column"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  dense
                  class="mt-8"
                  :headers="headers"
                  :items="flyers"
                  :search="search"
                  @click:row="rowClicked"
                ></v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn small color="primary" dark>See Trades</v-btn>
          <v-btn small color="green" dark>Unpublish</v-btn>
          <v-btn small color="red" dark>Publish</v-btn>
          <v-btn small dark>Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6">
      <v-row> 
        <v-col cols="">
          <v-carousel hide-delimiter-background hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="">
          <!-- Simple Table -->
          <h3>Desription</h3>
          <v-divider></v-divider>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
            distinctio aperiam illo mollitia excepturi repellat ratione, nobis
            neque quae eligendi culpa consequatur similique ducimus, quidem
            nostrum, nulla suscipit sint tenetur?
          </p>
          <h3>Location and Gps</h3>
          <v-divider></v-divider>
          <div class="caption">
            <div class="d-flex justify-space-between">
              <strong>lat:</strong>
              <div>3.4.4433</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>long:</strong>
              <div>3.4.4433</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>Country:</strong>
              <div>Nigeria</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>State:</strong>
              <div>Rivers</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>Province: </strong>
              <div>Port Harcourt</div>
            </div>
          </div>
          <!-- Owner Info -->
          <h3 class="mt-2">Ownership Information</h3>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between">
            <strong>Posted by: </strong>
            <div>Emmanuel harry</div>
          </div>
          <div class="d-flex justify-space-between">
            <strong>Email: </strong>
            <div>emma4lil@gmail.com</div>
          </div>
          <div class="d-flex justify-space-between">
            <strong>joined: </strong>
            <div>2042-08-09</div>
          </div>

          {{ info }}
        </v-col>
      </v-row>
    </v-col>

    <!-- <v-col class="blue" cols="6">
      <div>flyers actions and controls</div>
      <div>{{ flyers }}</div>
      <div>{{ info }}</div>
    </v-col> -->
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Flyer Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Created", value: "created" },
        { text: "OwnerId", value: "owner.id" },
        { text: "Email", value: "owner.email" },
        { text: "TradeCount", value: "tradeCount" },
        { text: "Description", value: "description" },
      ],
      info: [],
      flyers: [],
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  mounted() {
    this.getFlyers();
  },
  methods: {
    rowClicked(arg1, arg2) {
      this.info = arg1;
    },
    getFlyers() {
      this.$getFlyers().then((d) => {
        this.flyers = d.data;
      });
    },
    toggleflyerAction() {},
    seeTradeAction() {},
    deleteAction() {},
  },
};
</script>