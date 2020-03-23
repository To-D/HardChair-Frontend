<template>
  <div id="base_application">
    <div class="navbar-container">
      <nav class="navbar navbar-expand-lg bg-white navbar-light" data-sticky="top">
        <div class="container">
          <a class="navbar-brand fade-page">
            <router-link to="/">ArkChair</router-link>
          </a>

          <div class="collapse navbar-collapse justify-content-end">
            <div class="py-2 py-lg-0">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link">
                    <router-link to="ConferenceApplication">Conference Application</router-link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">News</a>
                </li>
                <li>
                  <a class="nav-link">FAQ</a>
                </li>
                <li class="nav-item" v-if ="loginSeen" >
                  <loginbtn></loginbtn>
                </li>
                <li class="nav-item" v-if="registerSeen">
                  <registerbtn></registerbtn>
                </li>
                <li class="nav-item" v-if="signOutSeen">
                  <signoutbtn></signoutbtn>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import loginbtn from "./LoginBtn";
import registerbtn from "./RegisterBtn";
import signoutbtn from "./SignoutBtn";

export default {
  name: "navbar",
  components: {loginbtn, registerbtn, signoutbtn},
  data(){
    return{
      loginSeen:false,
      registerSeen:false,
      signOutSeen:false
    }
  },
  created() {
    if(this.$store.state.token){
      this.signOutSeen = true;
    }else {
      this.loginSeen = true;
      this.registerSeen = true
    }
  }

}
</script>

<style scoped>
</style>
