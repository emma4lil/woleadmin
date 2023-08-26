<template>
  <v-card width="300">
    <div class="d-flex mx-3 py-2 justify-space-between">
      <div class="caption">
        {{ new Date(withdraw.createdAt).toLocaleString() }}
      </div>
      <div>
        <v-chip class="rounded-sm" x-small color="lime">{{ withdraw.status }}</v-chip>
        <v-chip class="rounded-sm" x-small color="primary"> {{withdraw.currency}}</v-chip>
      </div>
    </div>
    <v-divider></v-divider>

    <v-card-text>
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">User</span
          ><span class="h6 black--text caption">{{ withdraw.requestor }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Email</span
          ><span class="h6 black--text caption">{{ withdraw.email }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Country</span
          ><span class="h6 black--text caption">{{ withdraw.country }}</span>
        </div>
      </div>

      <!-- Withdraw information -->

      <div class="mb-2">

        <v-divider></v-divider>
        <div class="d-flex justify-space-between mt-2">
          <span class="caption grey--text">Amount</span
          ><span class="h6 black--text"
            ><v-btn outlined flat class="elevation-0" x-small color="primary"
              >{{ withdraw.amount }} TELE</v-btn
            ></span
          >
        </div>

        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Local amount</span
          ><span class="black--text caption">{{ withdraw.localAmount }} {{withdraw.currency}}</span>
        </div>
      </div>

      <!-- Bank Information -->
      <div class="mb-2">
        <v-divider></v-divider>
        <div class="d-flex justify-space-between mt-2">
          <span class="caption grey--text">Account Name</span
          ><span class="h6 black--text"
            ><v-btn flat class="elevation-0" x-small color="primary">{{
              withdraw.accountName
            }}</v-btn></span
          >
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Account ##</span
          ><span class="h6 black--text">{{ withdraw.account }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Bank Name:</span
          ><span class="h6 black--text caption">{{ withdraw.bankName }}</span>
        </div>
        <div class="d-flex justify-space-between">
          <span class="caption grey--text">Iban</span
          ><span class="h6 black--text caption">{{ withdraw.iban === '' ? 'N/A' : withdraw.iban }}</span>
        </div>
      </div>
    </v-card-text>

    <v-card-text
      v-if="withdraw.status !== 'Refunded' && !revealActions"
      class="code"
      v
    >
      <v-sheet
        class="d-flex flex-column justify-center pa-3 rounded-sm"
        color="grey lighten-4"
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
        label="Select rejection reason?"
        v-model="reason"
      ></v-select>
    </v-card-text>
    <v-card-actions v-if="revealActions">
      <v-btn
      block
        class="elevation-0"
        @click="Save()"
        :loading="loading"
        v-if="select !== 0"
        color="primary"
        >Save status</v-btn
      >
      <v-spacer></v-spacer>
      <!-- <v-btn
        @click="Refund()"
        class="elevation-0"
        v-if="select === 4"
        small
        color="yellow"
        >Make Refund</v-btn
      > -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["withdraw"],
  data() {
    return {
      timeout: 90000,
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
          text: "Success",
          key: 2,
        },
        {
          text: "Refunded",
          key: 4,
        },
      ],
      reason: "",
      reasons: [
        "Payment did not go through",
        "Invalid account details was provided.",
        "The provided account details does not match.",
        "Invalid wallet address was provided.",
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
      this.$setWithdrawStatus(this.withdraw.id, this.select, this.reason)
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
