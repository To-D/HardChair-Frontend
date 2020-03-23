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
              @submit.native.prevent
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
                  :clearable="false"
                  :picker-options="dateRangePickerOptions"
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
                  :clearable="false"
                  :picker-options="deadlinePickerOptions"
                  v-model="applicationForm.deadline"
                  type="date"
                  placeholder="Pick submission deadline"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>

              <!-- result announcement date -->
              <el-form-item prop="resultAnnounceDate" label="Result announcement date">
                <el-date-picker :clearable="false" :picker-options="announcementDatePickerOptions" v-model="applicationForm.resultAnnounceDate" type="date" placeholder="Pick result announcement date" style="width: 100%"></el-date-picker>
              </el-form-item>

              <br>

              <!-- submit button -->
              <el-form-item style="width: 100%">
                <el-button
                  native-type="submit"
                  :disabled="isDisabled"
                  type="primary"
                  style="width: 100%"
                  v-on:click="apply(applicationForm)"
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
    //Validators

    //Judgement whether the submit button can work when the from changes
    const isFormReady=(rule,value,callback)=>{
      callback();
      this.changeDisabled();
    }

    // If the deadline or the announcement date has been set, the date range should include it
    const containDDLAndAnnounceDate = (rule,value,callback)=> {
      this.isTimeValid = false;
      if (this.applicationForm.deadline) {
        if(value[0] > this.applicationForm.deadline || value[1] < this.applicationForm.deadline){
          this.applicationForm.time = "";
          callback(new Error("The date range should contain the deadline you have chosen"));
          this.changeDisabled();
          return;
        }
      }
      if(this.applicationForm.resultAnnounceDate){
        if(value[0] > this.applicationForm.resultAnnounceDate || value[1] < this.applicationForm.resultAnnounceDate){
          this.applicationForm.time = "";
          callback(new Error("The date range should contain the result announcement date you have chosen"));
          this.changeDisabled();
          return;
        }
      }
      if(value!=='') {
        this.isTimeValid = true;
      }
      callback();
      this.changeDisabled();
    }

    return {
      isDisabled: true, //Control the function of the submit button
      isTimeValid: false, //Since date range should also contain ddl and announcement date to be valid, so define a boolean value to judge

      //Picker options
      dateRangePickerOptions: {
        disabledDate: (time) => {
          // The date range should start after today
          const oneDayTime = 24*3600*1000;
          return time.getTime() < Date.now() - oneDayTime;
        }
      },

      deadlinePickerOptions:{
        disabledDate: (time) => {
          // 1. If the announcement date has been set, the deadline should before it.
          // 2. If the date range has been set, the deadline should be within it.
          // 3.  If not, make sure it's a date after today
          const oneDayTime = 24*3600*1000;
          if(this.applicationForm.time){
            if(this.applicationForm.resultAnnounceDate){
              let earlier = this.applicationForm.resultAnnounceDate < this.applicationForm.time[1] ? this.applicationForm.resultAnnounceDate:this.applicationForm.time[1];
              return time.getTime() < this.applicationForm.time[0] || time.getTime() > earlier;
            }else{
              return time.getTime() <  this.applicationForm.time[0] ||time.getTime() >  this.applicationForm.time[1];
            }
          }else{
            if(this.applicationForm.resultAnnounceDate){
              return time.getTime() < Date.now() - oneDayTime || time.getTime() > this.applicationForm.resultAnnounceDate;
            }else{
              return time.getTime() < Date.now() - oneDayTime;
            }
          }
        }
      },

      announcementDatePickerOptions:{
        disabledDate: (time) => {
          // 1. If the date range has been set, the deadline and result announcement day should be within it.
          // 2. If the ddl has been set, the result announcement day should equal to or after it.
          // 3.  If not, make sure it's a date after today
          const oneDayTime = 24*3600*1000;
          if(this.applicationForm.time){
            if(this.applicationForm.deadline){
              return time.getTime() < this.applicationForm.deadline || time.getTime() > this.applicationForm.time[1];
            }else{
              return time.getTime() <  this.applicationForm.time[0] ||time.getTime() >  this.applicationForm.time[1];
            }
          }else{
            if(this.applicationForm.deadline){
              return time.getTime() < this.applicationForm.deadline ;
            }else{
              return time.getTime() < Date.now() - oneDayTime;
            }
          }
        }
      },

      applicationForm: {
        nameAbbreviation: "",
        fullName: "",
        location: "",
        time: "",
        deadline: "",
        resultAnnounceDate: "",
      },
      rules: {
        nameAbbreviation: [ { required: true, message: "Short name of conference is required", trigger: "blur"},{ validator:isFormReady,trigger: "change" }],
        fullName: [ { required: true, message: "Full name of conference is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }],
        location:[{ required: true, message: "Location of conference is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }],
        time: [{required: true, message: "Start and end dates of conference are required", trigger: "blur" }, {validator:containDDLAndAnnounceDate,trigger:"blur"}],
        deadline: [{required: true, message: "Submission deadline is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }],
        resultAnnounceDate:[{ required: true, message: "Result announcement date is required", trigger: "blur" },{ validator:isFormReady,trigger: "change" }]
      },
      loading: false
    };
  },
  methods: {
    apply(formName) {
      //In case of some bug, still validate before submit
      this.$refs[formName].validate((valid)=> {
          if (valid) {
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
                  this.$message.success("Your application has been recorded, the admin will audit it.Please wait in patient.")
                  this.$router.replace("/");
                } else {
                  this.$message.error("Application failed. Please sign in first")
                }
              })
              .catch(error => {
                this.loading = false;
                console.log(error);
                this.$message.error("Application failed")
              });
          } else {
            this.$message.error("Wrong submit! Please check the form.")
          }
      });
      },
    changeDisabled(){
      this.isDisabled =(this.applicationForm.nameAbbreviation ==="")||
        (this.applicationForm.fullName ==="")||
        (!this.isTimeValid)||
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
