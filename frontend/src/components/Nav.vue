<template>
  <div id="base_application">
    <div class="navbar-container">
      <nav class="navbar navbar-expand-lg bg-white navbar-light" data-sticky="top">
        <div class="container">
          <a class="navbar-brand fade-page">
            <router-link to="/">ArkChair</router-link>
          </a>
          <el-menu mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title">Conferences</template>
              <router-link to="conference-home"><el-menu-item>Browsing</el-menu-item></router-link>
              <router-link to="conference-application"><el-menu-item>Application</el-menu-item></router-link>
              
            </el-submenu>
            <el-submenu index="2" v-if="signOutSeen">
              <template slot="title">My ArkChair<el-badge is-dot class="mark" /></template>
              <router-link to=""><el-menu-item>My Conference</el-menu-item></router-link>
              <router-link to="verification"><el-menu-item>Verification<el-badge is-dot class="mark" /></el-menu-item></router-link>
              <router-link to=""><el-menu-item>Message<el-badge is-dot class="mark" /></el-menu-item></router-link>
              <signoutbtn></signoutbtn>
            </el-submenu>
            <el-menu-item v-if="loginSeen">
              <loginbtn></loginbtn>
            </el-menu-item>
            <el-menu-item v-if="registerSeen">
              <registerbtn></registerbtn>
            </el-menu-item>
          </el-menu>
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
mark, .mark {
    padding: 0;
    background-color: #ffffff;
}
</style>
