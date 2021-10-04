<template>
  <v-card width="300">
    <div class="d-flex mx-3 py-2 justify-space-between">
      <div>Request #1</div>
      <div>
        <v-chip small color="lime">{{ withdraw.status }}</v-chip>
        <v-chip small color="orange">{{ withdraw.type }}</v-chip>
      </div>
    </div>
    <v-divider></v-divider>
    <v-card-text>
      <div class="mb-2">
        <div class="black--text">User Information</div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Requestor:</span
          ><span class="h6 black--text">{{ withdraw.requestor }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Email:</span
          ><span class="h6 black--text">{{ withdraw.email }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Country:</span
          ><span class="h6 black--text">{{ withdraw.country }}</span>
        </div>
      </div>

      <!-- Withdraw information -->

      <div class="mb-2">
        <div class="black--text">Withdraw Information</div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Amount (tele):</span
          ><span class="h6 black--text"
            ><v-btn flat class="elevation-0" x-small color="primary">{{
              withdraw.amount
            }}</v-btn></span
          >
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Currency:</span
          ><span class="h6 black--text">{{ withdraw.currency }}</span>
        </div>
      </div>

      <!-- Trade Information -->
      <div class="mb-2">
        <div class="black--text">Bank Information</div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Account Name:</span
          ><span class="h6 black--text"
            ><v-btn flat class="elevation-0" x-small color="primary">{{
              withdraw.accountName
            }}</v-btn></span
          >
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Account #:</span
          ><span class="h6 black--text">{{ withdraw.account }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Bank Name:</span
          ><span class="h6 black--text">{{ withdraw.bankName }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">IBAN:</span
          ><span class="h6 black--text">{{ withdraw.iban }}</span>
        </div>
      </div>
    </v-card-text>

    <v-card-text
      v-if="withdraw.status !== 'Refunded' && !revealActions"
      class="code"
      v
    >
      <v-sheet
        class="d-flex flex-column justify-center pa-3 rounded-xl"
        color="grey lighten-3"
      >
        <div class="caption">Confirmation Code: {{ otp }}</div>
        <v-progress-linear
          :color="changeColor"
          rounded
          v-model="progress"
        ></v-progress-linear>
        <v-text-field
          color="green"
          name="name"
          label="Enter Code"
          single-line
          small
          v-model="iotp"
        ></v-text-field>
      </v-sheet>
    </v-card-text>
    <v-card-text v-if="revealActions">
      <v-divider></v-divider>
      <v-select
        outlined
        :items="status"
        item-text="text"
        item-value="key"
        v-model="select"
        label="Select payment status"
      ></v-select>
      <v-select
        v-if="select == 4"
        outlined
        :items="reasons"
        label="Reasons"
      ></v-select>
    </v-card-text>

    <v-card-actions v-if="revealActions">
      <v-btn
        class="elevation-0"
        @click="Save()"
        :loading="loading"
        v-if="select !== 0"
        small
        color="blue"
        >Save status</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        @click="Refund()"
        class="elevation-0"
        v-if="select === 4"
        small
        color="yellow"
        >Make Refund</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["withdraw"],
  data() {
    return {
      timeout: 460000,
      progress: 0,
      otp: Math.floor(Math.random() * 1000),
      iotp: "",
      loading: false,
      select: 0,
      status: [
        {
          text: "Pending",
          key: 0,
        },
        {
          text: "Processing",
          key: 1,
        },
        {
          text: "Failed",
          key: 2,
        },
        {
          text: "Success",
          key: 3,
        },
        {
          text: "Rejected",
          key: 4,
        },
      ],
      reasons: [
        "Invalid account details",
        "Account Name Mismatch",
        "Invalid Wallet Address",
      ],
    };
  },

  mounted() {
    this.otp = Math.floor(Math.random() * 1000);
    this.progress = 100;
    setInterval(() => {
      this.otp = Math.floor(Math.random() * 1000);
      this.progress = 100;
    }, this.timeout);
    setInterval(() => {
      this.progress -= 1;
    }, this.timeout / 100);
  },

  computed: {
    revealActions() {
      return this.withdraw.status !== "Refunded" && +this.otp === +this.iotp;
    },
    changeColor() {
      if (this.progress < 30) {
        return "red";
      } else {
        return "blue";
      }
    },
  },

  methods: {
    Save() {
      this.loading = true;
      this.$setWithdrawStatus(this.withdraw.id, this.select)
        .then((d) => {
          this.loading = false;
          this.withdraw.status = this.status[this.select].text;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    Refund() {
      this.$makeRefund(this.withdraw.id).then((d) => {
        if (d.success) {
          alert("Refund was successful!");
        } else {
          alert("Refund failed!");
        }
      });
    },
  },
};
</script>
