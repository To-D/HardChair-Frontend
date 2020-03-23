<template>
  <div class="nav-link">
    <router-link to="/" @click.native = "signOut">Sign out</router-link>
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
      this.$confirm('Are you sure to sign out?', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.$store.commit('logout');
        this.reload();
      }).catch((error) => {
        console.log(error);
      })
    }
  }
};
</script>

<style scoped>
</style>
