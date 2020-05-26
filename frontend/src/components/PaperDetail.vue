<template>
  <div id="base_paperview" v-title data-title="ArkChair - Paper View">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">{{paper.title}}</h1>
          </div>
        </div>
      </div>
    </section>

    <div class="contentContainer">
      <div class="container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Paper Info" name="info">
            <section>
              <div class="row">
                <div class="col-xl-8 col-lg-12">
                  <div>
                    <h2>
                      <em class="el-icon-info"></em> Paper Info
                    </h2>
                    <div class="infoitem">
                      <span class="itemlabel">
                        <em class="el-icon-s-opportunity"></em> Title:
                      </span>
                      {{paper.title}}
                    </div>
                    <div class="infoitem">
                      <span class="itemlabel">
                        <em class="el-icon-s-fold"></em> Summary:
                      </span>
                      {{paper.summary}}
                    </div>
                    <div class="infoitem" v-if="paper.topics">
                      <span class="itemlabel">
                        <em class="el-icon-price-tag"></em> Topics:
                      </span>
                      <el-tag :key="index" v-for="(topic,index) in paper.topics">{{topic}}</el-tag>
                    </div>
                    <div class="infoitem">
                      <span class="itemlabel">
                        <em class="el-icon-s-flag"></em> Status:
                      </span>
                      <span
                        v-if="paper.reviewResults && paper.reviewResults.length"
                      >Scores announced</span>
                      <span v-else>Wating for reviewing</span>
                    </div>
                    <div class="infoitem" v-if="paper.createdTime">
                      <span class="itemlabel">
                        <em class="el-icon-s-flag"></em> Created Time:
                      </span>
                      {{paper.createdTime.substring(0,10)}}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane label="This Paper in PDF" name="pdf">
            <section>
              <div class="row">
                <div class="col-xl-8 col-lg-8">
                  <h2>
                    <em class="el-icon-document-copy"></em> This Paper in PDF
                  </h2>

                  <div class="row">
                    <preview class="onPageBtn" v-if="paper.id" :id="paper.id">Preview</preview>

                    <download
                      class="onPageBtn"
                      v-if="paper.id && paper.title"
                      :id="paper.id"
                      :title="paper.title"
                    >Download</download>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane v-if="isPC_MEMBER" label="Paper Review" name="review">
            <section>
              <div class="row">
                <div class="col-xl-6 col-lg-6">
                  <h2>
                    <em class="el-icon-upload2"></em> Paper Review
                  </h2>

                  <el-card v-if="paper.status == -1" shadow="hover">You have reviewed this paper!</el-card>

                  <el-form
                    v-else
                    @submit.native.prevent
                    status-icon
                    :model="reviewForm"
                    :rules="rules"
                    label-position="top"
                    ref="reviewForm"
                  >
                    <!-- score -->
                    <el-form-item prop="score" label="Score" class="is-required">
                      <el-rate
                        v-model="reviewForm.score"
                        show-text
                        id="score"
                        :max="max"
                        :texts="texts"
                        :colors="colors"
                      ></el-rate>
                    </el-form-item>

                    <!-- comment -->
                    <el-form-item prop="comment" label="Comment">
                      <el-input
                        type="textarea"
                        autosize
                        v-model="reviewForm.comment"
                        auto-complete="off"
                        id="comment"
                        placeholder="Your comment on this paper"
                      ></el-input>
                    </el-form-item>

                    <!-- confidence -->
                    <el-form-item prop="confidence" label="Confidence">
                      <el-radio-group v-model="reviewForm.confidence">
                        <el-radio-button label="Very low"></el-radio-button>
                        <el-radio-button label="Low"></el-radio-button>
                        <el-radio-button label="High"></el-radio-button>
                        <el-radio-button label="Very High"></el-radio-button>
                      </el-radio-group>
                    </el-form-item>

                    <br />

                    <!-- submit button -->
                    <el-form-item>
                      <el-button
                        native-type="submit"
                        type="primary"
                        v-on:click="Submit('reviewForm')"
                        :disabled="reviewDisabled"
                      >Submit Review Results</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane v-if="isAUTHOR" label="My Results" name="result">
            <section>
              <div class="row">
                <div class="col-xl-6 col-lg-6">
                  <h2>
                    <em class="el-icon-document-checked"></em> My Results
                  </h2>
                  <div v-if="conferenceStatus !== 'OPEN_RESULT'">
                    <el-card shadow="hover">Result hasn't been announced!</el-card>
                  </div>
                  <el-card
                    v-else
                    shadow="hover"
                    class="box-card"
                    style="margin-top: 1em;"
                    v-for="(result,index) in paper.reviewResults"
                    :key="index"
                  >
                    <p>
                      <span class="itemlabel">
                        <em class="el-icon-s-opportunity"></em> Comment:
                      </span>
                      {{result.comment}}
                    </p>
                    <p>
                      <span class="itemlabel">
                        <em class="el-icon-s-fold"></em> Confidence:
                      </span>
                      {{result.confidence}}
                    </p>
                    <p>
                      <span class="itemlabel">
                        <em class="el-icon-date"></em> Score：
                      </span>
                      {{result.score}}
                    </p>
                  </el-card>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane v-if="isAUTHOR" label="Edit paper" name="submission">
            <section>
              <div class="row">
                <div class="col-xl-6 col-lg-6">
                  <h2>
                    <em class="el-icon-upload2"></em> Edit paper
                  </h2>                  
                  <div v-if="conferenceStatus == 'SUBMIT_ALLOWED'">
                    <contribution
                      v-if="paper.conferenceId"
                      :paper="paper"
                      :topics="paper.nTopics"
                      :conferenceId="paper.conferenceId"
                    ></contribution>
                  </div>
                  <div v-else>
                    <el-card shadow="hover">Papers are being reviewd!</el-card>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>
        </el-tabs>
      </div>  
    </div>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "./Nav";
import footerbar from "./Footer";
import download from "./DownloadPaper";
import preview from "./PreviewPaper";
import contribution from "./SubmitPaper";

export default {
  name: "PaperDetail",
  components: { navbar, footerbar, download, preview, contribution },
  inject: ["reload"],

  data() {
    return {
      // Authorities
      isAUTHOR: false,
      isPC_MEMBER: false,

      // paper
      paper: {},

      activeName:"info",
      conferenceStatus:"",

      // Review form
      reviewForm: {
        score: null,
        comment: "",
        confidence: ""
      },
      rules: {
        score: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("Score is required"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        comment: [{ required: true, trigger: "blur" }],
        confidence: [{ required: true, trigger: "blur" }]
      },
      // el-rate
      texts: [
        " -2 ( reject )",
        " -1 ( week reject )",
        " 1 ( weak accept )",
        " 2 ( accept )"
      ],
      max: 4,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
    };
  },
  methods: {
    Submit(formName) {
      let tmp = this.reviewForm;
      this.$axios
        .post("/SubmitReviewResult", {
          paperId: this.paper.id,
          score: tmp.score,
          comment: tmp.comment,
          confidence: tmp.confidence
        })
        .then(resp => {
          if (resp.status === 200) {            
            this.$message({
              dangerouslyUseHTMLString: true,
              type: "success",
              message: '<strong style="color:teal">Submit success!</strong>',
              center: true
            });
            this.reload();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    reviewDisabled() {
      let tmp = this.reviewForm;
      return !tmp.score || tmp.comment == "" || tmp.confidence == "";
    }
  },
  created() {
    this.$axios
      .post("/PaperAuthority", {
        paperId: this.$route.params.paperID
      })
      .then(resp => {
        if (resp.status === 200 && !resp.data.hasOwnProperty("message")) {
          this.paper = resp.data;
          this.conferenceStatus = this.paper.nTopics[0].tag;
          this.paper.topics = this.paper.topics.split(",");
          switch (this.paper.url) {
            case "AUTHOR":
              this.isAUTHOR = true;
              break;
            case "PC_MEMBER":
              this.isPC_MEMBER = true;
              break;
            case "A&P":
              this.isAUTHOR = true;
              this.isPC_MEMBER = true;
              break;
          }
        } else {
          this.$router.go(-1);
          this.$message({
            dangerouslyUseHTMLString: true,
            type: "error",
            message:
              '<strong style="color:teal">Sorry! Your don\'t have the authority!</strong>',
            center: true
          });
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
  padding: 0.5em;
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
.contentContainer {
  padding: 2em;
}
.onPageBtn {
  margin-left: 12px;
}
el-form-item {
  margin-bottom: 0;
}
.el-tag {
  margin-right: 5px;
}
.input-new-tag {
  width: 103px;
  margin-right: 5px;
  vertical-align: bottom;
}
.checkboxes {
  margin-right: 0;
}
</style>
