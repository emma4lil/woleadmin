<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" width="50%">
        <v-card-title primary-title>
          flyers
        </v-card-title>
        <v-card-text class="d-flex justify-space-between">
          <v-text-field class="mr-2" width="70%" dense name="flierFilter" label="Search by any column..." value="" single-line
            outlined></v-text-field>
          <div style="width: 150px;" class="mr-2">
            <v-select :items='["Active", "Blocked", "In Review"]' v-model="value" label="Status" outlined dense></v-select>
          </div>
          <v-btn height="40" text outlined class="text" color="success">fILTER</v-btn>
        </v-card-text>
      </v-card>

    </v-col>
    <v-col cols="12" lg="12">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col class="" cols="12">
              <v-card elevation="0">
                <v-card-title>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by email,date,id" single-line
                    hide-details></v-text-field>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table dense class="mt-8" :headers="headers" :items="flyers" :search="search"
                  @click:row="rowClicked">
                  <template v-slot:item.created="{ item }">
                    {{ new Date(item.created).toLocaleString() }}
                  </template>

                  <template v-slot:item.action="{ item }">
                    <v-btn @click="seeFlyerDetail()" text x-small color="blue">see more</v-btn>
                    <v-btn :loading="loading" v-if="item.isPublished" @click="toggleFlyerAction(item.id)" text x-small
                      color="red">Hide/Remove</v-btn>
                    <v-btn :loading="loading" v-if="!item.isPublished" @click="toggleFlyerAction(item.id)" text x-small
                      color="green">Show</v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- Dialog 2-->
    <v-col cols="12" lg="6">
      <v-dialog v-model="dialog2" scrollable :overlay="false" max-width="800px" transition="dialog-transition">
        <v-card>
          <v-card-title primary-title> Flyer Information </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <!-- Carousel -->
                <v-carousel height="250" hide-delimiter-background hide-delimiters>
                  <v-carousel-item v-for="(item, i) in info.images" :key="render + i" :src="item.url"
                    reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
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
                  <div v-if="info.tradeInfo">
                    {{ info.tradeInfo.activeTrades }}
                  </div>
                </div>
                <div class="d-flex justify-space-between">
                  <strong>successful Trades: </strong>
                  <div v-if="info.tradeInfo">
                    {{ info.tradeInfo.successfulTrades }}
                  </div>
                </div>
                <div class="d-flex justify-space-between">
                  <strong>Disputed Trades: </strong>
                  <div v-if="info.tradeInfo">
                    {{ info.tradeInfo.disputedTrades }}
                  </div>
                </div>

                <!-- <h3 class="mt-2">Flyer Actions</h3>
                <v-divider></v-divider>
                <v-sheet color="gray" class="pa-2">
                  <v-spacer />
                  <v-btn @click="seeTradeAction()" small color="primary" dark
                    >more</v-btn
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
                </v-sheet> -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>

    <!-- Dialog -->
    <v-col cols="12">
      <v-dialog v-model="dialog" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
          <v-card-title primary-title> Flyer Trades list </v-card-title>

          <v-card-text>
            <v-row>
              <v-col v-for="(item, i) in info.trades" :key="i">
                <v-card flat>
                  <v-card-title primary-title>
                    <span>{{ i + 1 }}</span> --
                    <span class="caption">{{ item.tradeId }}</span>
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
      loading: false,
      dialog: false,
      dialog2: false,
      render: 0,
      search: this.$route.params.id,
      headers: [
        {
          text: "Flyer Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Created", value: "created" },
        { text: "TradeCount", value: "tradeCount" },
        { text: "Email", value: "owner.email" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action" },
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
    this.getFlyers()
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
      this.loading = true
      this.$toggleFlyerPublishState(id).then((d) => {
        this.getFlyers();
        this.loading = false
        // this.render += 1;
        // this.$forceUpdate();
        // this.$router.go()
      });
    },
    seeFlyerDetail() {
      this.dialog2 = true;
    },
    seeTradeAction() {
      this.dialog = true;
    },
    deleteAction() { },
  },
};
</script>
