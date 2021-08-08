<template>
  <v-row>
    <v-col class="blue" cols="12" lg="6">
      <div style="height: 97vh;" class="d-flex align-center justify-center">
        <v-card flat color="transparent" class="text-lg-center text-h4">
          Welcome to Wole-App Control Panel
        </v-card>
      </div>
    </v-col>
    <v-col class="" cols="12" lg="6">
      <div
        v-if="!$auth.user"
        style="height: 97vh;"
        class="d-flex flex-column align-center justify-center"
      >
        <div class="text-h4">SignIn</div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="login.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="login.password"
            :counter="10"
            :rules="pwdRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
           :loading="loading"
            outlined
            :disabled="!valid"
            color="blue"
            class="mr-4"
            @click="userLogin"
          >
            login
          </v-btn>
          <v-btn x-small text color="error" class="mr-4" @click="reset">
            forgot password
          </v-btn>
          <v-btn text color="error" class="mr-4" @click="reset">
            Register
          </v-btn>
        </v-form>
      </div>
      <!-- Else logout -->
      <div
        v-else
        style="height: 97vh;"
        class="d-flex flex-column align-center justify-center"
      >
        <div class="d-flex">
          <h2>See you later! {{username}}..😊</h2>
          <v-btn @click="logout" flat text color="success">logout!</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "blank",
  auth: "false",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      username: "Anonymouse",
      loading: false
    };
  },
  methods: {
    async userLogin() {
      try {
          this.loading = true
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        this.loading = false
        if(response.success){
            this.username = response.data.userId
        }
        console.log(response);
      } catch (err) {
        console.log(err);
        this.loading = false
        alert(err)
      }
    },
    async logout(){
        this.$auth.logout();
    }
  },
  mounted () {
      this.username = this.$auth.user?.email
  }
};
</script>