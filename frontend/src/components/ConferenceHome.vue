<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Home">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Conference Home</h1>
            <p
              class="lead mb-0"
            >Check out ongoing conferences here.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-8">
            <div v-for="o in 4" :key="o" class="text item">
              <el-card class="box-card" style="margin-top: 1em">
                {{'Conference ' + o }} -
                <router-link to = "/conference-detail/conference.id">View details.</router-link>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-8"></div>
        </div>
      </div>
    </section>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "./Nav";
import footerbar from "./Footer";

export default {
  name: "ConferenceHome",
  components: { navbar, footerbar },
  data() {
    return{}
  },
  methods: {},
  created(){
    // 获取会议列表
    this.$axios
    .get('/ShowConferences',{})
    .then(resp => {
      // 根据后端的返回数据修改
      if (resp.status === 200) {
        console.log(resp.data);
      } else {
        this.$message.error("Request Error.")
      }
    })
  }
};
</script>

<style scoped>
section {
  padding: 2em;
}
</style>
