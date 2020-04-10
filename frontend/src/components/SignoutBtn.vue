<template>
  <div>
    <router-link to="/"  @click.native = "signOut"><el-menu-item>Sign out</el-menu-item></router-link>
  </div>
</template>

<script>
export default {
  name: "signoutbtn",
  inject:['reload'],
  data() {
    return {};
  },
  methods: {
    signOut(){
      this.$confirm('Are you sure to sign out?','Sign Out', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.$store.commit('logout');
        this.reload();
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong style="color:teal">You have signed out!</strong>',
          center:true
        })
      }).catch((error) => {
        console.log(error);
      })
    }
  }
};
</script>

<style scoped>
</style>
