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
          <div class="col-xl-6 col-lg-8">
            <div v-for="o in 4" :key="o" class="text item">
              <el-card class="box-card" style="margin-top: 1em">
                {{'Conference ' + o }} -
                <router-link to>Verify this application.</router-link>
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
  name: "ConferenceVerification",
  components: { navbar, footerbar },
  data() {
    //Validators
  },
  methods: {}
};
</script>

<style scoped>
section {
  padding: 2em;
}
</style>
