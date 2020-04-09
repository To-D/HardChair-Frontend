<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Verification">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Conference Verification</h1>
            <p
              class="lead mb-0"
            >After submission, your application will be reviewed by an admin. Thank you for your patience.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div class="text item">
              <el-card shadow="hover" class="box-card" style="margin-top: 1em">
                <div slot="header" class="clearfix">
                  <span>Name of the Conference</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                  >Verify this application.</el-button>
                </div>
                <div>
                  <div>Application by: Summer Shen</div>
                  <div>Short name: LSOT2020</div>
                  <div>Full name: Lungmen Summit of Originum Technology 2020</div>
                  <div>Location: Tomorrow Hall, Lungmen University</div>
                  <div>Starts at: 2020-04-14</div>
                  <div>Ends at: 2020-05-10</div>
                  <div>Submission deadline: 2020-05-01</div>
                  <div>Result announcement at: 2020-05-09</div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-xl-6 col-lg-12">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
          </div>
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
  name: "ConferenceVerification",
  components: { navbar, footerbar },
  data() {
    //Validators
  },
  methods: {},
  created(){
    //this.$axios;
  }
};
</script>

<style scoped>
section {
  padding: 2em;
}
</style>
