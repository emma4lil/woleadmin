class Authentication {
   constructor(axios) {
      this.axios = axios;
   }
   Login(vm) {
      console.log("Login in now" + vm);
   }
}

export default ({ app, $axios }, inject) => {
   var auth = new Authentication($axios);
   inject('login', loginInfo => auth.Login(loginInfo));
}