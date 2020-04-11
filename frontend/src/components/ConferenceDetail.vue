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
            <div>
              <h2>
                <i class="el-icon-info"></i> Conference Info
              </h2>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-user-solid"></i> Application by:
                </span>
                {{conference.owner}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-chat-dot-round"></i> Short name:
                </span>
                {{conference.nameAbbreviation}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-chat-line-round"></i> Full name:
                </span>
                {{conference.fullName}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-location"></i> Location:
                </span>
                {{conference.location}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-video-play"></i> Starts at:
                </span>
                {{conference.startTime.substring(0,10)}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-video-pause"></i> Ends at:
                </span>
                {{conference.endTime.substring(0,10)}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-date"></i> Submission deadline:
                </span>
                {{conference.deadline.substring(0,10)}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-medal-1"></i> Result announcement at:
                </span>
                {{conference.resultAnnounceDate.substring(0,10)}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-s-flag"></i> Status:
                </span>
                {{parseStatus(conference.status)}}
              </div>
            </div>
            <br />
            <div>
              <el-button>Start accepting papers</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-8">
            <div>
              <h2>
                <i class="el-icon-document"></i> Paper submission
              </h2>
              <el-form
                @submit.native.prevent
                status-icon
                :model="paperForm"
                :rules="rules"
                label-position="top"
                v-loading="loading"
                :ref="paperForm"
              >
                <!-- short name -->
                <el-form-item prop="title" label="Title">
                  <el-input
                    type="text"
                    v-model="paperForm.title"
                    auto-complete="off"
                    id="title"
                    placeholder="Title of your paper"
                  ></el-input>
                </el-form-item>

                <!--full name -->
                <el-form-item prop="summary" label="Summary">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="paperForm.summary"
                    auto-complete="off"
                    id="summary"
                    placeholder="Summary of your paper"
                  ></el-input>
                </el-form-item>

                <br />

                <!-- submit button -->
                <el-form-item style="width: 100%">
                  <el-button
                    native-type="submit"
                    :disabled="isDisabled"
                    type="primary"
                    style="width: 100%"
                    v-on:click="apply(paperForm)"
                  >Submit paper</el-button>
                </el-form-item>
              </el-form>
            </div>
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
  name: "ConferenceDetail",
  components: { navbar, footerbar },
  
  data() {
    //Validators

    //Judgement whether the submit button can work when the from changes
    const isFormReady = (rule, value, callback) => {
      callback();
      this.changeDisabled();
    };

    return {
      isDisabled: true, //Control the function of the submit button
      authority: [],
      conference: null,

      paperForm: {
        title: "",
        summary: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Title of paper is required",
            trigger: "blur"
          },
          { validator: isFormReady, trigger: "change" }
        ],
        summary: [
          {
            required: true,
            message: "Summary of paper is required",
            trigger: "blur"
          },
          { validator: isFormReady, trigger: "change" }
        ]
      },
      loading: false
    };
  },
  methods: {
    apply(formName) {
      //In case of some bug, still validate before submit
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post("/SubmitPaper", {
              title: this.paperForm.title,
              summary: this.paperForm.summary,
            })
            .then(resp => {
              // 根据后端的返回数据修改
              if (resp.status === 200 && resp.data.hasOwnProperty("id")) {
                this.loading = false;
                this.$message({
                  type: "success",
                  center: true,
                  dangerouslyUseHTMLString: true,
                  message:
                    "<strong style='color:teal'>Submission successful!</strong>"
                });
                this.$router.replace("/");
              } else {
                this.$message.error("Submission failed. Please sign in first");
              }
            })
            .catch(error => {
              this.loading = false;
              console.log(error);
              this.$message.error("Submission failed");
            });
        } else {
          this.$message.error("Wrong submit! Please check the form.");
        }
      });
    },
    changeDisabled() {
      this.isDisabled =
        this.paperForm.title === "" ||
        this.paperForm.summary === "";
    },
    parseStatus(status) {
      switch (status) {
        case "CHECKED":
          return "Approved by admin";
          break;
        case "SUBMIT_ALLOWED":
          return "Accepting papers";
          break;
        default:
          return "Currently unknown";
          break;
      }
    },
    handleChange(val) {
      // console.log(val);
    }
    // parseDate(timestamp) {
    //   if (timestamp = "") {
    //     return "N/A";
    //   } else {
    //     return timestamp.substring(0, 10);
    //   }
    // },
  },
  created() {
    //获取会议信息
    this.$axios
      .post("/ConferenceDetails", {
        id: this.$route.params.conferenceID
      })
      .then(resp => {
        if (resp.status === 200) {
          console.log(this.$route.params.conferenceID);
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
.itemlabel,
h2 {
  color: #3755be;
  font-weight: bold;
}
.infoitem {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
