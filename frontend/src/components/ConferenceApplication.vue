<template>
  <div id="base_application">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Conference Application</h1>
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
            <el-form
              status-icon
              :model="applicationForm"
              :rules="rules"
              label-position="top"
              v-loading="loading"
              :ref="applicationForm"
            >
              <!-- short name -->
              <el-form-item prop="nameAbbreviation" label="Short name">
                <el-input
                  type="text"
                  v-model="applicationForm.nameAbbreviation"
                  auto-complete="off"
                  id="nameAbbreviation"
                  placeholder="Enter the short name of your conference"
                ></el-input>
              </el-form-item>

              <!--full name -->
              <el-form-item prop="fullName" label="Full name">
                <el-input
                  type="text"
                  v-model="applicationForm.fullName"
                  auto-complete="off"
                  id="fullName"
                  placeholder="Enter the full name of your conference"
                ></el-input>
              </el-form-item>

              <!-- location -->
              <el-form-item prop="location" label="Location">
                <el-input
                  type="text"
                  v-model="applicationForm.location"
                  auto-complete="off"
                  id="location"
                  placeholder="Enter the location of the conference"
                ></el-input>
              </el-form-item>

              <!-- start & end time -->
              <el-form-item prop="time" label="Start and end dates">
                <el-date-picker
                  v-model="applicationForm.time"
                  type="daterange"
                  range-separator="to"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  style="width:100%"
                ></el-date-picker>
              </el-form-item>

              <!-- deadline -->
              <el-form-item prop="deadline" label="Submission deadline">
                <el-date-picker
                  v-model="applicationForm.deadline"
                  type="date"
                  placeholder="Pick submission deadline"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>

              <!-- result announcement date -->
              <el-form-item prop="resultAnnounceDate" label="Result announcement date">
                <el-date-picker v-model="applicationForm.resultAnnounceDate" type="date" placeholder="Pick result announcement date" style="width: 100%"></el-date-picker>
              </el-form-item>

              <br>

              <!-- submit button -->
              <el-form-item style="width: 100%">
                <el-button
                  :disabled="isDisabled"
                  type="primary"
                  style="width: 100%"
                  v-on:click="apply()"
                >Submit application</el-button>
              </el-form-item>
            </el-form>
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
  name: "ConferenceApplication",
  components: { navbar, footerbar },
  data() {
    //Control the "disabled" attribute of the submit button
    const isFormReady=()=>{
      this.changeDisabled();
    }

    return {
      isDisabled: true,
      applicationForm: {
        nameAbbreviation: "",
        fullName: "",
        location: "",
        time: "",
        deadline: "",
        resultAnnounceDate: ""
      },
      rules: {
        nameAbbreviation: [ { required: true, message: "Short name of conference is required", trigger: "blur"},{ validator:isFormReady,trigger: "change" }],
        fullName: [ { required: true, message: "Full name of conference is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }],
        location:[{ required: true, message: "Location of conference is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }],
        time: [{required: true, message: "Start and end dates of conference are required", trigger: "blur" },{validator:isFormReady,trigger: "change" }],
        deadline: [{required: true, message: "Submission deadline is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }],
        resultAnnounceDate:[{ required: true, message: "Result announcement date is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }]
      },
      loading: false
    };
  },
  methods: {
    apply() {
      this.loading = true;
      this.$axios
        .post("/ConferenceApplication", {
          nameAbbreviation: this.applicationForm.nameAbbreviation,
          fullName: this.applicationForm.fullName,
          time: this.applicationForm.time,
          location: this.applicationForm.location,
          deadline: this.applicationForm.deadline,
          resultAnnounceDate: this.applicationForm.resultAnnounceDate
        })
        .then(resp => {
          // 根据后端的返回数据修改
          if (resp.status === 200 && resp.data.hasOwnProperty("id")) {
            this.loading = false;
            this.$message.success("The admin will take care of your application.")
            this.$router.replace("/index");
          } else {
            this.$message.error("Application failed. Please sign in first")
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("Application failed")
        });
    },

    changeDisabled(){
      this.isDisabled =(this.applicationForm.nameAbbreviation ==="")||
        (this.applicationForm.fullName ==="")||
        (this.applicationForm.time ==="")||
        (this.applicationForm.location ==="")||
        (this.applicationForm.deadline ==="") ||
        (this.applicationForm.resultAnnounceDate ==="");
    }
  }
};
</script>

<style scoped>
section {
  padding: 2em;
}
</style>
