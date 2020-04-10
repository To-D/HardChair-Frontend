<template>
  <div id="base_application">
    <div class="navbar-container">
      <nav class="navbar navbar-expand-lg bg-white navbar-light" data-sticky="top">
        <div class="container">
          <a class="navbar-brand fade-page">
            <router-link to="/">ArkChair</router-link>
          </a>
          <el-menu mode="horizontal" @select="handleSelect">
            <el-submenu index="2">
              <template slot="title">Conferences</template>
              <el-menu-item index="2-1">Browsing</el-menu-item>
              <el-menu-item index="2-2">Verification</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">My ArkChair</el-menu-item>
            <el-menu-item v-if="loginSeen">
              <loginbtn></loginbtn>
            </el-menu-item>
            <el-menu-item v-if="registerSeen">
              <registerbtn></registerbtn>
            </el-menu-item>
            <el-menu-item v-if="signOutSeen">
              <signoutbtn></signoutbtn>
            </el-menu-item>
          </el-menu>
          <!-- <div class="collapse navbar-collapse justify-content-end">
            <div class="py-2 py-lg-0">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link">
                    <router-link to="conference-application">Conference Application</router-link>
                  </a>
                </li>
                <li class="nav-item" v-if="loginSeen">
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
          </div>-->
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
  components: { loginbtn, registerbtn, signoutbtn },
  data() {
    return {
      loginSeen: false,
      registerSeen: false,
      signOutSeen: false,
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  created() {
    if (this.$store.state.token) {
      this.signOutSeen = true;
    } else {
      this.loginSeen = true;
      this.registerSeen = true;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.navbar {
  border-bottom: 0;
  padding: 0;
}
</style>
