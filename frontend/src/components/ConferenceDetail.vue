<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Detail">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">{{conference.nameAbbreviation}}</h1>
            <p class="lead mb-0">{{conference.fullName}}</p>
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
                <div>{{conference.nameAbbreviation}}</div>
              </el-collapse-item>
              <el-collapse-item title="Full name" name="2">
                <div>{{conference.fullName}}</div>
              </el-collapse-item>
              <el-collapse-item title="Location" name="3">
                <div>{{conference.location}}</div>
              </el-collapse-item>
              <el-collapse-item title="Start and end dates" name="4">
                <div>{{conference.startTime}}</div>
                <div>{{conference.endTime}}</div>
              </el-collapse-item>
              <el-collapse-item title="Submission deadline" name="5">
                <div>{{conference.deadline}}</div>
              </el-collapse-item>
              <el-collapse-item title="Result announcement date" name="6">
                <div>{{conference.resultAnnounceDate}}</div>
              </el-collapse-item>

              <el-collapse-item title="Status" name="7">
                <div>{{conference.status}}</div>
              </el-collapse-item>

              <el-collapse-item title="Owner" name="8">
                <div>{{conference.owner}}</div>
              </el-collapse-item>
              <el-collapse-item title="Submit your paper" name="8">
                <el-form
                  @submit.native.prevent
                  status-icon
                  :model="loginForm"
                  :rules="rules"
                  class="login_container"
                  label-position="left"
                  label-width="0px"
                  v-loading="loading"
                >
                  <!-- <el-form-item prop="username" size="medium">
                    <el-input
                      size="medium"
                      type="text"
                      v-model="loginForm.username"
                      auto-complete="off"
                      placeholder="Username"
                    ></el-input>
                  </el-form-item>

                  <el-form-item prop="password" size="medium">
                    <el-input
                      size="medium"
                      type="password"
                      v-model="loginForm.password"
                      auto-complete="off"
                      placeholder="Password"
                    ></el-input>
                  </el-form-item>

                  <el-form-item size="medium">
                    <el-button
                      native-type="submit"
                      :disabled="isDisabled"
                      size="medium"
                      type="primary"
                      style="width:100% "
                      v-on:click="login"
                    >Submit</el-button>
                  </el-form-item> -->
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="row"></div>
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
      activeNames: ["1", "2", "3", "4", "5", "6", "7", "8"],
      authority: [],
      conference: null
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  },
  created() {
    //获取会议信息
    this.$axios
      .post("/ConferenceDetails", {
        id: this.$route.params.conferenceID
      })
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp.data);
          this.authority = resp.data[0];
          this.conference = resp.data[1];
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
section {
  padding: 2em;
}
</style>
