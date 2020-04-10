<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Detail">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Lungmen Summit of Originum Technology 2020</h1>
            <p class="lead mb-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-8">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="Short name" name="1">
                <div>LSOT2020</div>
              </el-collapse-item>
              <el-collapse-item title="Full name" name="2">
                <div>Lungmen Summit of Originum Technology 2020</div>
              </el-collapse-item>
              <el-collapse-item title="Location" name="3">
                <div>Tomorrow Hall, Lungmen University</div>
              </el-collapse-item>
              <el-collapse-item title="Start and end dates" name="4">
                <div>Starts at 2020-04-14</div>
                <div>Ends at 2020-05-10</div>
              </el-collapse-item>
              <el-collapse-item title="Submission deadline" name="5">
                <div>2020-05-01</div>
              </el-collapse-item>
              <el-collapse-item title="Result announcement date" name="6">
                <div>2020-05-09</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="row">
          
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
  name: "ConferenceDetail",
  components: { navbar, footerbar },
  data() {
    return {
      activeNames: ['1'],
      authority:[],
      conference:null
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  created(){
    //获取会议信息
    this.$axios
    .post('/ConferenceDetails',{
      id: this.$route.params.conferenceID
      })
    .then(resp =>{
      if(resp.status === 200){
        //console.log(resp.data);
        this.authority = resp.data[0];
        this.conferences = resp.data[1];
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
};
</script>

<style scoped>
section {
  padding: 2em;
}
</style>
