<template>
  <div id="base_application">
    <div class="navbar-container">
      <nav class="navbar navbar-expand-lg bg-white navbar-light" data-sticky="top">
        <div class="container">
          <!--logo -->
          <a class="navbar-brand fade-page">
            <router-link to="/">ArkChair</router-link>
          </a>

          <el-menu mode="horizontal" @select="handleSelect" style="border-bottom:0;">
            <!-- Conference opration -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-collection"></i>Conferences
              </template>
              <router-link to="conference-home">
                <el-menu-item>
                  <i class="el-icon-menu"></i>Browsing
                </el-menu-item>
              </router-link>
              <router-link to="conference-application" v-if="isNormalUser">
                <el-menu-item>
                  <i class="el-icon-edit-outline"></i>Application
                </el-menu-item>
              </router-link>
            </el-submenu>

            <!-- login and register button -->
            <el-menu-item v-if="beforeLogin">
              <loginbtn></loginbtn>
            </el-menu-item>
            <el-menu-item v-if="beforeLogin">
              <registerbtn></registerbtn>
            </el-menu-item>

            <!-- Personal info -->
            <el-submenu index="2" v-if="afterLogin">
              <template slot="title">
                <i class="el-icon-user-solid"></i> ArkChair
                <el-badge is-dot class="mark" />
              </template>
              <router-link to="my-ark-chair" v-if="isNormalUser">
                <el-menu-item>
                  <i class="el-icon-s-order"></i>My Conferences
                </el-menu-item>
              </router-link>
              <router-link to="verification" v-if="isADMIN">
                <el-menu-item>
                  <i class="el-icon-s-claim"></i>Verification
                  <el-badge is-dot class="mark" />
                </el-menu-item>
              </router-link>
              <router-link to="message-inbox" v-if="isNormalUser">
                <el-menu-item>
                  <i class="el-icon-message"></i>Messages
                  <el-badge is-dot class="mark" />
                </el-menu-item>
              </router-link>
              <signoutbtn></signoutbtn>
            </el-submenu>
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
      beforeLogin: true,
      afterLogin: false,
      isNormalUser: true,
      isADMIN: false,
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  created() {
    // User has login
    if (this.$store.state.token) {
      this.beforeLogin = false;
      this.afterLogin = true;
      // Present user is an admin
      if (this.$store.state.userType === "ADMIN") {
        this.isNormalUser = false;
        this.isADMIN = true;
      }
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
mark,
.mark {
  padding: 0;
  background-color: transparent;
}
</style>
