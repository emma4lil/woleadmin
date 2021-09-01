<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h2">Flyers Management</div>
    </v-col>
    <v-col cols="12" lg="6">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col class="" cols="12">
              <v-card elevation="0">
                <v-card-title>
                  <div class="text-h3 grey--text">
                    <span>{{ flyers.length }}</span> Total Flyers
                  </div>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search by email,date,id"
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
      </v-card>
    </v-col>
    <v-col cols="12" lg="6">
      <v-row>
        <v-col cols="12">
          <!-- Carousel -->
          <v-carousel height="250" hide-delimiter-background hide-delimiters>
            <v-carousel-item
              v-for="(item, i) in info.images"
              :key="render + i"
              :src="item.url"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="">
          <!-- Flyer Detail -->
          <h3>Flyer Information</h3>
          <v-divider></v-divider>
          <p>
            {{ info.description }}
          </p>
          <div class="d-flex justify-space-between">
            <strong>Price:</strong>
            <div>{{ info.price }} Teles</div>
          </div>

          <!-- Location info -->
          <h3>Location and Gps</h3>
          <v-divider></v-divider>
          <div class="caption">
            <div class="d-flex justify-space-between">
              <strong>lat:</strong>
              <div>{{ info.lat }}</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>long:</strong>
              <div>{{ info.long }}</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>Country:</strong>
              <div>{{ info.country }}</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>State:</strong>
              <div>{{ info.state }}</div>
            </div>
            <div class="d-flex justify-space-between">
              <strong>Province: </strong>
              <div>{{ info.province }}t</div>
            </div>
          </div>
          <!-- Owner Info -->
          <h3 class="mt-2">Ownership Information</h3>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between">
            <strong>Posted by: </strong>
            <div>{{ info.fullName }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <strong>Email: </strong>
            <div v-if="info.owner">{{ info.owner.email }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <strong>joined: </strong>
            <div v-if="info.owner">{{ info.owner.joined }}</div>
          </div>

          <!-- trade details -->
          <h3 class="mt-2">Trade Information</h3>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between">
            <strong>Active Trades</strong>
            <div v-if="info.tradeInfo">{{ info.tradeInfo.activeTrades }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <strong>successful Trades: </strong>
            <div v-if="info.tradeInfo">
              {{ info.tradeInfo.successfulTrades }}
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <strong>Disputed Trades: </strong>
            <div v-if="info.tradeInfo">{{ info.tradeInfo.disputedTrades }}</div>
          </div>

          <h3 class="mt-2">Flyer Actions</h3>
          <v-divider></v-divider>
          <v-sheet color="gray" class="pa-2">
            <v-spacer />
            <v-btn @click="seeTradeAction()" small color="primary" dark
              >See Trades</v-btn
            >
            <v-btn
              @click="toggleFlyerAction(info.id)"
              v-if="info.isPublished"
              small
              color="green"
              dark
              >Unpublish</v-btn
            >
            <v-btn
              @click="toggleFlyerAction(info.id)"
              v-else
              small
              color="red"
              dark
              >Publish</v-btn
            >
            <v-btn small dark>Delete</v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>

    <!-- Dialog -->
    <v-col cols="12">
      <v-dialog
        v-model="dialog"
        scrollable
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title> Flyer Trades list </v-card-title>

          <v-card-text>
            <v-row>
              <v-col v-for="(item, i) in info.trades" :key="i">
                <v-card flat>
                  <v-card-title primary-title>
                    <span>{{i + 1}}</span> -- <span class="caption">{{ item.tradeId }}</span>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      render: 0,
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
    toggleFlyerAction(id) {
      this.$toggleFlyerPublishState(id).then((d) => {
        this.getFlyers();
        this.render += 1;
        // this.$forceUpdate();
        // this.$router.go()
      });
    },
    seeTradeAction() {
      this.dialog = true;
    },
    deleteAction() {},
  },
};
</script>