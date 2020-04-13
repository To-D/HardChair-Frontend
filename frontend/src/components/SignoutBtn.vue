<template>
  <div>
    <router-link to="" @click.native="signOut">
      <el-menu-item>
        <i class="el-icon-circle-close"></i>Sign out
      </el-menu-item>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "signoutbtn",
  data() {
    return {};
  },
  methods: {
    signOut() {
      this.$confirm("Are you sure to sign out?", "Sign Out", {
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      })
        .then(() => {
          this.$store.commit("logout");
          this.$router.push('/login');
          this.$message({
            dangerouslyUseHTMLString: true,
            message: '<strong style="color:teal">You have signed out!</strong>',
            center: true
          });
        })
        .catch(error => {
          //console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
